"""
myassitant/main.py
Entry point cho hệ thống myassitant Group Chat AI Bot.

Khởi động các luồng độc lập:
  1. Webhook server (FastAPI port 8090) + Cloudflare Tunnel
  2. File/link processing worker
  3. Agent manager (watch DB → spawn GroupChatAgent threads)
  4. GroupChatAgent per group (spawned by agent manager)
"""
import os
import sys
import time
import threading
import subprocess
import re
import asyncio
import signal

_DIR = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.dirname(_DIR)
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

# Khởi tạo DB trước tiên
from myassitant import db
db.init_db()

from myassitant.config import (
    MYASSITANT_PORT,
    TELEGRAM_BOT_TOKEN,
    AGENT_SLEEP_INTERVAL,
)
from myassitant.file_worker import run_file_worker
from myassitant.agent import GroupChatAgent

import httpx
import shutil

# ─── Global state ─────────────────────────────────────────────────────────────

_stop_event = threading.Event()
_active_agents: dict[str, GroupChatAgent] = {}   # group_id → agent
_agents_lock = threading.Lock()
_tunnel_process = None


# ─── Cloudflare Tunnel ────────────────────────────────────────────────────────

def _start_cloudflare_tunnel() -> str:
    """Khởi động cloudflared và trả về HTTPS URL. Blocking cho đến khi lấy được URL."""
    global _tunnel_process

    cloudflared_cmd = shutil.which("cloudflared")
    if not cloudflared_cmd:
        local_bin = os.path.join(_ROOT, "cloudflared")
        if os.path.exists(local_bin):
            cloudflared_cmd = local_bin
    if not cloudflared_cmd:
        cloudflared_cmd = "cloudflared"

    retry = 0
    while not _stop_event.is_set():
        retry += 1
        print(f"[Tunnel] Khởi tạo Cloudflare Tunnel lần {retry}...")

        if _tunnel_process:
            try:
                _tunnel_process.terminate()
                _tunnel_process.wait(timeout=3)
            except Exception:
                pass
            _tunnel_process = None

        try:
            _tunnel_process = subprocess.Popen(
                [cloudflared_cmd, "tunnel", "--url", f"http://localhost:{MYASSITANT_PORT}", "--no-autoupdate"],
                stderr=subprocess.PIPE,
                text=True,
            )
        except Exception as e:
            print(f"[Tunnel] Lỗi khởi tạo: {e}. Thử lại sau 3s...")
            time.sleep(3)
            continue

        time.sleep(1)
        # Đọc stderr để lấy URL
        for _ in range(300):
            if _stop_event.is_set():
                return ""
            line = _tunnel_process.stderr.readline()
            if "https://" in line and ".trycloudflare.com" in line:
                match = re.search(r"https://[a-z0-9-]+\.trycloudflare\.com", line)
                if match:
                    url = match.group(0)
                    print(f"[Tunnel] Lấy được URL: {url}")
                    return url
            time.sleep(0.1)

        print(f"[Tunnel] Lần {retry} không lấy được URL. Thử lại...")
        time.sleep(2)

    return ""


def _register_telegram_webhook(base_url: str):
    """Đăng ký Telegram webhook."""
    webhook_url = f"{base_url}/webhook"
    api_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/setWebhook"
    for attempt in range(1, 6):
        try:
            with httpx.Client(timeout=10) as client:
                resp = client.post(api_url, json={"url": webhook_url})
                data = resp.json()
                if data.get("ok"):
                    print(f"[Webhook] Đăng ký thành công: {webhook_url}")
                    return True
                else:
                    print(f"[Webhook] Thất bại lần {attempt}: {data}")
        except Exception as e:
            print(f"[Webhook] Lỗi lần {attempt}: {e}")
        time.sleep(3)
    return False


def _verify_url_reachable(base_url: str, timeout_sec: int = 60) -> bool:
    """Kiểm tra URL công khai đã accessible chưa."""
    health_url = f"{base_url}/health"
    start = time.time()
    attempt = 0
    while time.time() - start < timeout_sec:
        attempt += 1
        try:
            with httpx.Client(timeout=5, verify=False) as client:
                resp = client.get(health_url)
                if resp.status_code == 200:
                    print(f"[Tunnel] URL accessible lần {attempt}: {health_url}")
                    return True
        except Exception as ex:
            print(f"[Tunnel] Chờ DNS lần {attempt}: {ex}")
        time.sleep(3)
    return False


def run_tunnel_and_webhook_thread():
    """Thread khởi tạo tunnel và đăng ký webhook."""
    print("[TunnelThread] Started.")
    while not _stop_event.is_set():
        base_url = _start_cloudflare_tunnel()
        if not base_url:
            time.sleep(5)
            continue

        # Chờ URL accessible
        if not _verify_url_reachable(base_url, timeout_sec=90):
            print("[TunnelThread] URL không accessible. Thử lại...")
            time.sleep(3)
            continue

        # Đăng ký webhook
        if _register_telegram_webhook(base_url):
            print(f"[TunnelThread] Hoàn tất! Webhook live tại {base_url}/webhook")
            # Giữ tunnel alive — chỉ restart nếu process chết
            while not _stop_event.is_set():
                if _tunnel_process and _tunnel_process.poll() is not None:
                    print("[TunnelThread] Tunnel process died. Restarting...")
                    break
                time.sleep(5)
        else:
            print("[TunnelThread] Đăng ký webhook thất bại. Thử lại...")
            time.sleep(3)


# ─── File Worker Thread ────────────────────────────────────────────────────────

def run_file_worker_thread():
    """Thread xử lý file/link download + summarize."""
    print("[FileWorkerThread] Started.")
    run_file_worker(stop_event=_stop_event, sleep_sec=3.0)


# ─── Agent Manager Thread ─────────────────────────────────────────────────────

def run_agent_manager_thread():
    """
    Thread quản lý GroupChatAgent.
    Poll DB để phát hiện nhóm mới → spawn agent.
    """
    print("[AgentManager] Started.")
    while not _stop_event.is_set():
        try:
            active_groups = db.get_all_active_groups()
            with _agents_lock:
                for g in active_groups:
                    gid = g["group_id"]
                    if gid not in _active_agents or not _active_agents[gid].is_alive():
                        # Spawn agent mới
                        agent = GroupChatAgent(gid)
                        agent.start()
                        _active_agents[gid] = agent
                        print(f"[AgentManager] Spawned agent for group {gid} ({g.get('title')})")

                # Dọn agent cho nhóm đã inactive
                inactive = [gid for gid, a in _active_agents.items() if not a.is_alive()]
                for gid in inactive:
                    del _active_agents[gid]

        except Exception as e:
            print(f"[AgentManager] Error: {e}")

        time.sleep(10)  # Check mỗi 10 giây

    # Dừng tất cả agents khi shutdown
    with _agents_lock:
        for agent in _active_agents.values():
            agent.stop()


# ─── Webhook Server Thread ────────────────────────────────────────────────────

def run_webhook_server_thread():
    """Thread chạy FastAPI webhook server (uvicorn)."""
    import uvicorn
    from myassitant.webhook_handler import app

    print(f"[WebhookServer] Starting on port {MYASSITANT_PORT}...")
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=MYASSITANT_PORT,
        log_level="warning",
    )


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  myassitant — Telegram Group AI Chatbot")
    print(f"  Port: {MYASSITANT_PORT}")
    print("=" * 60)

    # Xử lý SIGINT / SIGTERM để dừng sạch
    def _signal_handler(sig, frame):
        print("\n[Main] Nhận tín hiệu dừng. Đang shutdown...")
        _stop_event.set()
        sys.exit(0)

    signal.signal(signal.SIGINT, _signal_handler)
    signal.signal(signal.SIGTERM, _signal_handler)

    threads = []

    # Thread 1: Webhook Server (uvicorn)
    t_server = threading.Thread(
        target=run_webhook_server_thread,
        name="webhook-server",
        daemon=True
    )
    t_server.start()
    threads.append(t_server)
    time.sleep(1)  # Chờ server khởi động

    # Thread 2: Cloudflare Tunnel + Telegram Webhook Registration
    t_tunnel = threading.Thread(
        target=run_tunnel_and_webhook_thread,
        name="tunnel-webhook",
        daemon=True
    )
    t_tunnel.start()
    threads.append(t_tunnel)

    # Thread 3: File/Link Processing Worker
    t_file = threading.Thread(
        target=run_file_worker_thread,
        name="file-worker",
        daemon=True
    )
    t_file.start()
    threads.append(t_file)

    # Thread 4: Agent Manager (spawn GroupChatAgent per group)
    t_manager = threading.Thread(
        target=run_agent_manager_thread,
        name="agent-manager",
        daemon=True
    )
    t_manager.start()
    threads.append(t_manager)

    print("[Main] Tất cả threads đã khởi động.")
    print("[Main] Nhấn Ctrl+C để dừng.")

    # Keep main thread alive
    try:
        while not _stop_event.is_set():
            time.sleep(1)
    except KeyboardInterrupt:
        _stop_event.set()

    print("[Main] Đang dừng tất cả threads...")
    if _tunnel_process:
        try:
            _tunnel_process.terminate()
        except Exception:
            pass

    print("[Main] myassitant đã dừng.")


if __name__ == "__main__":
    main()
