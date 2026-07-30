"""
myassitant/main.py
Entry point cho hệ thống myassitant Group Chat AI Bot.

Khởi động các luồng/process độc lập:
  0. gemma4/program.py      — Local Gemma4 API server  (subprocess, port 8000)
  1. file_worker.py         — Download & summarize file (subprocess)
  2. Webhook server         — FastAPI port 8090         (thread)
  3. Cloudflare Tunnel      — HTTPS URL + Telegram wh   (thread)
  4. Agent Manager          — Spawn GroupChatAgent      (thread)
  5. GroupChatAgent ×N      — AI Agent per group        (thread per group)

Khi shutdown:
  - Set _stop_event → tất cả thread dừng vòng lập
  - SIGTERM gemma4 subprocess
  - SIGTERM file_worker subprocess
  - SIGTERM cloudflared process
  - fuser -k 8000/tcp và 8090/tcp → giải phóng port hoàn toàn
"""
import os
import sys
import time
import threading
import subprocess
import re
import signal
import shutil

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
from myassitant.agent import GroupChatAgent

import httpx

# Port của gemma4 local server
GEMMA4_PORT = 8000

# ─── Global state ─────────────────────────────────────────────────────────────

_stop_event = threading.Event()
_active_agents: dict[str, GroupChatAgent] = {}
_agents_lock = threading.Lock()
_tunnel_process = None
_gemma4_process = None         # subprocess gemma4/program.py
_file_worker_process = None    # subprocess myassitant/file_worker.py


# ─── Giải phóng port (force kill process chiếm port) ─────────────────────────

def _free_port(port: int):
    """
    Giải phóng port bằng cách kill tất cả process đang dùng port đó.
    Dùng fuser (Linux) nếu có, fallback sang ss + kill.
    """
    print(f"[Shutdown] Giải phóng port {port}...")
    try:
        if shutil.which("fuser"):
            subprocess.run(
                ["fuser", "-k", f"{port}/tcp"],
                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=5
            )
            print(f"[Shutdown] fuser -k {port}/tcp done.")
            return
    except Exception:
        pass

    # Fallback: lấy PID qua ss / lsof
    try:
        result = subprocess.run(
            ["ss", "-tlnp", f"sport = :{port}"],
            stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, timeout=5
        )
        out = result.stdout.decode()
        # Tìm pid từ output: pid=12345,
        pids = re.findall(r"pid=(\d+)", out)
        for pid in pids:
            try:
                os.kill(int(pid), signal.SIGTERM)
                print(f"[Shutdown] Killed PID {pid} (port {port})")
            except Exception:
                pass
    except Exception as e:
        print(f"[Shutdown] Không giải phóng được port {port}: {e}")


def _kill_process(proc: subprocess.Popen, name: str):
    """Terminate + wait cho một subprocess, fallback SIGKILL nếu không dừng."""
    if proc is None:
        return
    try:
        if proc.poll() is None:
            print(f"[Shutdown] Stopping {name} (PID={proc.pid})...")
            proc.terminate()
            try:
                proc.wait(timeout=5)
                print(f"[Shutdown] {name} stopped.")
            except subprocess.TimeoutExpired:
                proc.kill()
                proc.wait(timeout=3)
                print(f"[Shutdown] {name} force-killed.")
    except Exception as e:
        print(f"[Shutdown] Error stopping {name}: {e}")


# ─── Gemma4 Server ────────────────────────────────────────────────────────────

def _wait_gemma4_ready(timeout_sec: int = 120) -> bool:
    """Chờ local Gemma4 API sẵn sàng (health check)."""
    url = f"http://localhost:{GEMMA4_PORT}/health"
    start = time.time()
    attempt = 0
    while time.time() - start < timeout_sec:
        attempt += 1
        try:
            with httpx.Client(timeout=3) as client:
                resp = client.get(url)
                if resp.status_code == 200:
                    print(f"[Gemma4] Ready! (attempt {attempt}, {time.time()-start:.1f}s)")
                    return True
        except Exception:
            pass
        time.sleep(2)
    print(f"[Gemma4] Không sẵn sàng sau {timeout_sec}s!")
    return False


def start_gemma4() -> subprocess.Popen:
    """
    Khởi động gemma4/program.py như một subprocess độc lập.
    Trả về Popen object.
    """
    global _gemma4_process
    gemma4_script = os.path.join(_ROOT, "gemma4", "program.py")
    python_exec = sys.executable

    print(f"[Gemma4] Khởi động: {python_exec} {gemma4_script}")
    try:
        _gemma4_process = subprocess.Popen(
            [python_exec, gemma4_script],
            cwd=_ROOT,
            stdout=sys.stdout,   # pipe output ra màn hình chung
            stderr=sys.stderr,
            env={**os.environ},  # dùng chung env (CUDA, PATH...)
        )
        print(f"[Gemma4] Process started (PID={_gemma4_process.pid})")
        return _gemma4_process
    except Exception as e:
        print(f"[Gemma4] Không khởi động được: {e}")
        return None


def run_gemma4_monitor_thread():
    """
    Thread giám sát gemma4 process:
    - Nếu process chết bất ngờ → restart
    - Nếu _stop_event set → dừng
    """
    global _gemma4_process
    print("[Gemma4Monitor] Started.")
    while not _stop_event.is_set():
        if _gemma4_process and _gemma4_process.poll() is not None:
            rc = _gemma4_process.returncode
            print(f"[Gemma4Monitor] Process died (rc={rc}). Restarting in 5s...")
            time.sleep(5)
            if not _stop_event.is_set():
                start_gemma4()
                _wait_gemma4_ready(timeout_sec=120)
        time.sleep(5)
    print("[Gemma4Monitor] Stopped.")


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


def _register_telegram_webhook(base_url: str) -> bool:
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
        time.sleep(5)
    return False


def run_tunnel_and_webhook_thread():
    """Thread khởi tạo tunnel và đăng ký webhook."""
    print("[TunnelThread] Started.")
    while not _stop_event.is_set():
        base_url = _start_cloudflare_tunnel()
        if not base_url:
            time.sleep(5)
            continue

        if not _verify_url_reachable(base_url, timeout_sec=90):
            print("[TunnelThread] URL không accessible. Thử lại...")
            time.sleep(3)
            continue

        if _register_telegram_webhook(base_url):
            print(f"[TunnelThread] Hoàn tất! Webhook live tại {base_url}/webhook")
            while not _stop_event.is_set():
                if _tunnel_process and _tunnel_process.poll() is not None:
                    print("[TunnelThread] Tunnel process died. Restarting...")
                    break
                time.sleep(5)
        else:
            print("[TunnelThread] Đăng ký webhook thất bại. Thử lại...")
            time.sleep(3)


# ─── File Worker Process ─────────────────────────────────────────────────────

def start_file_worker() -> subprocess.Popen:
    """
    Khởi động file_worker.py dạng process độc lập.
    Trả về Popen object hoặc None nếu lỗi.
    """
    global _file_worker_process
    fw_script = os.path.join(_DIR, "file_worker.py")
    python_exec = sys.executable

    print(f"[FileWorker] Khởi động: {python_exec} {fw_script}")
    try:
        _file_worker_process = subprocess.Popen(
            [python_exec, fw_script],
            cwd=_ROOT,
            stdout=sys.stdout,
            stderr=sys.stderr,
            env={**os.environ},
        )
        print(f"[FileWorker] Process started (PID={_file_worker_process.pid})")
        return _file_worker_process
    except Exception as e:
        print(f"[FileWorker] Không khởi động được: {e}")
        return None


def run_file_worker_monitor_thread():
    """
    Thread giám sát file_worker process:
    - Nếu process chết bất ngờ → restart
    - Nếu _stop_event set → dừng
    """
    global _file_worker_process
    print("[FileWorkerMonitor] Started.")
    while not _stop_event.is_set():
        if _file_worker_process and _file_worker_process.poll() is not None:
            rc = _file_worker_process.returncode
            print(f"[FileWorkerMonitor] Process died (rc={rc}). Restarting in 3s...")
            time.sleep(3)
            if not _stop_event.is_set():
                start_file_worker()
        time.sleep(3)
    print("[FileWorkerMonitor] Stopped.")


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
                        agent = GroupChatAgent(gid)
                        agent.start()
                        _active_agents[gid] = agent
                        print(f"[AgentManager] Spawned agent for group {gid} ({g.get('title')})")

                inactive = [gid for gid, a in _active_agents.items() if not a.is_alive()]
                for gid in inactive:
                    del _active_agents[gid]

        except Exception as e:
            print(f"[AgentManager] Error: {e}")

        time.sleep(10)

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


# ─── Shutdown sạch ───────────────────────────────────────────────────────────

def _shutdown():
    """Dừng tất cả resources, giải phóng port sạch sẽ."""
    print("\n[Main] === BẮT ĐẦU SHUTDOWN ===")
    _stop_event.set()

    # 1. Dừng gemma4 subprocess
    _kill_process(_gemma4_process, "gemma4/program.py")

    # 2. Dừng file_worker subprocess
    _kill_process(_file_worker_process, "file_worker.py")

    # 3. Dừng cloudflared tunnel
    _kill_process(_tunnel_process, "cloudflared")

    # 4. Dừng tất cả AI agents
    with _agents_lock:
        for agent in _active_agents.values():
            agent.stop()

    # 5. Giải phóng port (force kill nếu vẫn còn process giữ port)
    time.sleep(1)  # chờ process terminate trước
    _free_port(MYASSITANT_PORT)
    _free_port(GEMMA4_PORT)

    print("[Main] === SHUTDOWN HOÀN TẤT ===")


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  myassitant — Telegram Group AI Chatbot")
    print(f"  Webhook Port: {MYASSITANT_PORT}")
    print(f"  Gemma4 Port:  {GEMMA4_PORT}")
    print("=" * 60)

    # Xử lý SIGINT / SIGTERM → shutdown sạch
    def _signal_handler(sig, frame):
        print(f"\n[Main] Nhận tín hiệu {sig}. Đang shutdown...")
        _shutdown()
        sys.exit(0)

    signal.signal(signal.SIGINT, _signal_handler)
    signal.signal(signal.SIGTERM, _signal_handler)

    # ── Bước 0: Khởi động Gemma4 local server ─────────────────────────────────
    # Kiểm tra xem gemma4 đã chạy chưa (có thể đã start bên ngoài)
    gemma4_already_running = False
    try:
        with httpx.Client(timeout=2) as c:
            r = c.get(f"http://localhost:{GEMMA4_PORT}/health")
            if r.status_code == 200:
                gemma4_already_running = True
                print(f"[Gemma4] Đã chạy sẵn tại port {GEMMA4_PORT}. Bỏ qua start.")
    except Exception:
        pass

    if not gemma4_already_running:
        start_gemma4()
        print(f"[Gemma4] Chờ sẵn sàng (tối đa 120s)...")
        if not _wait_gemma4_ready(timeout_sec=120):
            print("[Gemma4] CẢNH BÁO: Gemma4 chưa sẵn sàng. Tiếp tục nhưng có thể lỗi.")
        # Thread giám sát tự động restart gemma4 nếu bị crash
        t_gemma4 = threading.Thread(
            target=run_gemma4_monitor_thread,
            name="gemma4-monitor",
            daemon=True
        )
        t_gemma4.start()

    # ── Thread 1: Webhook Server ───────────────────────────────────────────────
    t_server = threading.Thread(
        target=run_webhook_server_thread,
        name="webhook-server",
        daemon=True
    )
    t_server.start()
    time.sleep(1)

    # ── Thread 2: Cloudflare Tunnel + Telegram Webhook ─────────────────────────
    t_tunnel = threading.Thread(
        target=run_tunnel_and_webhook_thread,
        name="tunnel-webhook",
        daemon=True
    )
    t_tunnel.start()

    # ── Process 2: File/Link Processing Worker (subprocess độc lập) ──────────
    start_file_worker()
    t_fw_monitor = threading.Thread(
        target=run_file_worker_monitor_thread,
        name="file-worker-monitor",
        daemon=True
    )
    t_fw_monitor.start()

    # ── Thread 3: Agent Manager ────────────────────────────────────────────────
    t_manager = threading.Thread(
        target=run_agent_manager_thread,
        name="agent-manager",
        daemon=True
    )
    t_manager.start()

    print("[Main] Tất cả processes/threads đã khởi động.")
    print("[Main] Nhấn Ctrl+C để dừng.")

    # Keep main thread alive
    try:
        while not _stop_event.is_set():
            time.sleep(1)
    except KeyboardInterrupt:
        _shutdown()

    print("[Main] myassitant đã dừng.")




if __name__ == "__main__":
    main()
