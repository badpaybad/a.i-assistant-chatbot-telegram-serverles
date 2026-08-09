#!/usr/bin/env python3
"""
initpc.py - Master Process Supervisor & Auto Setup
Chạy với quyền root: sudo python3 initpc.py
"""
import os
import sys
import time
import re
import signal
import shutil
import asyncio
import subprocess
import secrets
import string
import json

# Tự động chuyển sang Python trong virtualenv của dự án để nạp đủ các thư viện (httpx, fastapi...)
project_dir = os.path.dirname(os.path.abspath(__file__))
venv_python = os.path.join(project_dir, "venv", "bin", "python")
if os.path.exists(venv_python) and os.path.realpath(sys.executable) != os.path.realpath(venv_python):
    print(f"[*] Tự động chuyên hướng sang Virtualenv Python: {venv_python}")
    os.execv(venv_python, [venv_python] + sys.argv)

from config import TELEGRAM_OWNER_USERID
import bot_telegram

processes: list[subprocess.Popen] = []

NGINX_LISTEN_PORT     = 8080
TELEGRAM_WEBHOOK_PORT = 8090
RUSTDESK_WEB_PORT     = 21118
RUSTDESK_HBBS_PORT    = 21115
RUSTDESK_HBBR_PORT    = 21117
GEMMA4_API_PORT       = 8000

PROXY_ROUTES = [
    {"path": "/webhook/", "target_port": TELEGRAM_WEBHOOK_PORT, "name": "Telegram Webhook", "websocket": False},
    {"path": "/rustdesk/", "target_port": RUSTDESK_WEB_PORT, "name": "RustDesk Web Client Console", "websocket": True},
    {"path": "/hbbs/", "target_port": 21119, "name": "RustDesk HBBS Signal (WebSocket)", "websocket": True},
    {"path": "/hbbr/", "target_port": RUSTDESK_WEB_PORT, "name": "RustDesk HBBR Relay (WebSocket)", "websocket": True},
    {"path": "/gemma4/", "target_port": GEMMA4_API_PORT, "name": "Gemma4 Local API", "websocket": False},
]

def auto_install_dependencies():
    """Tự động cài đặt Nginx, Cloudflared, RustDesk Server & Client nếu thiếu."""
    print("[*] [Auto-Setup] Đang kiểm tra môi trường & cài đặt phụ thuộc...")

    if not shutil.which("nginx"):
        print("[!] Đang cài đặt Nginx...")
        subprocess.run(["apt-get", "update", "-y"], check=True)
        subprocess.run(["apt-get", "install", "-y", "nginx"], check=True)

    if not shutil.which("cloudflared") and not os.path.exists("./cloudflared"):
        print("[!] Đang tải và cài đặt cloudflared...")
        url = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb"
        subprocess.run(["curl", "-L", "-o", "cloudflared.deb", url], check=True)
        subprocess.run(["dpkg", "-i", "cloudflared.deb"], check=True)
        if os.path.exists("cloudflared.deb"):
            os.remove("cloudflared.deb")

    if not shutil.which("rustdesk"):
        print("[!] Đang tải và cài đặt RustDesk Client...")
        client_url = "https://github.com/rustdesk/rustdesk/releases/download/1.3.8/rustdesk-1.3.8-x86_64.deb"
        try:
            subprocess.run(["curl", "-L", "-o", "rustdesk_client.deb", client_url], check=True)
            subprocess.run(["apt-get", "install", "-y", "./rustdesk_client.deb"], check=True)
            if os.path.exists("rustdesk_client.deb"):
                os.remove("rustdesk_client.deb")
        except Exception as e:
            print(f"[!] Lỗi khi cài đặt RustDesk Client: {e}")

    # Kiểm tra & Tải RustDesk Server binaries (hbbs & hbbr)
    if not os.path.exists("./hbbs") or not os.path.exists("./hbbr"):
        print("[!] Không tìm thấy RustDesk Server (hbbs/hbbr). Đang tự động tải về...")
        rustdesk_url = "https://github.com/rustdesk/rustdesk-server/releases/download/1.1.12/rustdesk-server-linux-amd64.zip"
        try:
            subprocess.run(["curl", "-L", "-o", "rustdesk-server.zip", rustdesk_url], check=True)
            subprocess.run(["unzip", "-o", "rustdesk-server.zip"], check=True)
            if os.path.exists("amd64/hbbs"):
                shutil.copy("amd64/hbbs", "./hbbs")
                shutil.copy("amd64/hbbr", "./hbbr")
            os.chmod("./hbbs", 0o755)
            os.chmod("./hbbr", 0o755)
            if os.path.exists("rustdesk-server.zip"):
                os.remove("rustdesk-server.zip")
            print("[+] Đã tải RustDesk Server (hbbs/hbbr) thành công!")
        except Exception as e:
            print(f"[!] Lỗi khi cài đặt RustDesk Server: {e}")

    try:
        print("[*] Tự động đồng bộ mã nguồn mới nhất của dự án (git pull)...")
        subprocess.run(["git", "pull"], check=False)
    except Exception:
        pass

def auto_config_home_rustdesk_client() -> tuple[str, str, str]:
    """
    Tự động cấu hình RustDesk Client trên PC nhà trỏ vào 127.0.0.1,
    tự sinh mật khẩu cố định bảo mật và trả về (Host_ID, Password, Public_Key).
    """
    print("[*] [Auto-Config] Đang tự động cấu hình RustDesk Client trên máy PC nhà...")
    
    rustdesk_key = ""
    if os.path.exists("id_ed25519.pub"):
        with open("id_ed25519.pub", "r") as kf:
            rustdesk_key = kf.read().strip()

    toml_content = f"""rendezvous_server = '127.0.0.1'
relay_server = '127.0.0.1'
api_server = 'http://127.0.0.1:21118'
key = '{rustdesk_key}'

[options]
custom-rendezvous-server = '127.0.0.1'
relay-server = '127.0.0.1'
api-server = 'http://127.0.0.1:21118'
key = '{rustdesk_key}'
"""
    # Ghi config trỏ 127.0.0.1 cho cả root và tất cả user home directories
    config_dirs = ["/root/.config/rustdesk"]
    if os.path.exists("/home"):
        for user_home in os.listdir("/home"):
            hpath = os.path.join("/home", user_home, ".config", "rustdesk")
            config_dirs.append(hpath)

    for cdir in config_dirs:
        try:
            os.makedirs(cdir, exist_ok=True)
            conf_file = os.path.join(cdir, "RustDesk2.toml")
            with open(conf_file, "w", encoding="utf-8") as f:
                f.write(toml_content)
            print(f"[+] Đã ghi cấu hình RustDesk Client (127.0.0.1) tại: {conf_file}")
        except Exception:
            pass

    # Đảm bảo RustDesk Client Service (systemd) luôn được bật và chạy trên PC local
    try:
        subprocess.run(["systemctl", "enable", "--now", "rustdesk"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("[+] Đã tự động kích hoạt RustDesk System Service (systemctl enable --now rustdesk).")
    except Exception as e:
        print(f"[!] Không thể kích hoạt rustdesk service: {e}")

    # Ép RustDesk Client kết nối về Server Local 127.0.0.1 qua CLI
    if shutil.which("rustdesk"):
        try:
            cfg_dict = {
                "id_server": "127.0.0.1",
                "relay_server": "127.0.0.1",
                "api_server": "http://127.0.0.1:21118",
                "key": rustdesk_key
            }
            cfg_json = json.dumps(cfg_dict)
            subprocess.run(["rustdesk", "--config", cfg_json], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=5)
            subprocess.run(["systemctl", "restart", "rustdesk"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=5)
            print("[+] Đã tự động ép RustDesk Client kết nối về Server Local (127.0.0.1).")
        except Exception as e:
            print(f"[!] Không thể áp dụng CLI config cho RustDesk: {e}")

    rustdesk_pass = "".join(secrets.choice(string.ascii_letters + string.digits) for _ in range(10))
    if shutil.which("rustdesk"):
        try:
            subprocess.run(["rustdesk", "--password", rustdesk_pass], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=3)
            print(f"[+] Đã tự động đặt mật khẩu RustDesk Client local: {rustdesk_pass}")
        except Exception:
            pass

    rustdesk_host_id = "Không lấy được ID"
    if shutil.which("rustdesk"):
        try:
            res = subprocess.run(["rustdesk", "--get-id"], stdout=subprocess.PIPE, text=True, timeout=3)
            if res.returncode == 0 and res.stdout.strip():
                rustdesk_host_id = res.stdout.strip()
        except Exception:
            pass

    return rustdesk_host_id, rustdesk_pass, rustdesk_key

def generate_nginx_config(nginx_port: int, routes: list[dict], output_path: str = "nginx_tunnel.conf"):
    """Tự động tạo file nginx_tunnel.conf với WebSocket & Proxy Headers"""
    locations_str = ""
    for route in routes:
        path = route['path'].rstrip("/")
        ws = """
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";""" if route.get("websocket") else ""

        locations_str += f"""
    location {path}/ {{
        proxy_pass http://127.0.0.1:{route['target_port']}/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;{ws}
    }}

    location {path} {{
        proxy_pass http://127.0.0.1:{route['target_port']}/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;{ws}
    }}
"""

    server_block = f"""server {{
    listen {nginx_port};
    server_name localhost;
    {locations_str}
    location /health {{
        return 200 'OK';
        add_header Content-Type text/plain;
    }}

    # RustDesk Mobile Client Signal WebSocket
    location /ws/id {{
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://127.0.0.1:21119/;
    }}

    # RustDesk Mobile Client Relay WebSocket
    location /ws/relay {{
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://127.0.0.1:21118/;
    }}

    location / {{
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://127.0.0.1:21119/;
    }}
}}
"""
    conf_content = f"""events {{ worker_connections 1024; }}
http {{
    log_format custom '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" "$http_user_agent" '
                      'Upgrade: "$http_upgrade" Sec-Protocol: "$http_sec_websocket_protocol" Args: "$args"';
    access_log /var/log/nginx/access.log custom;
    {server_block}
}}
"""
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(conf_content)
    print(f"[+] Đã sinh cấu hình Nginx local thành công tại {output_path}")

    # Tự động cập nhật trực tiếp vào thư mục hệ thống /etc/nginx/conf.d/tunnel.conf
    sys_conf_dir = "/etc/nginx/conf.d"
    if os.path.exists(sys_conf_dir):
        sys_conf_file = os.path.join(sys_conf_dir, "tunnel.conf")
        try:
            with open(sys_conf_file, "w", encoding="utf-8") as sf:
                sf.write(server_block)
            print(f"[+] Đã tự động cập nhật cấu hình Nginx hệ thống OS tại: {sys_conf_file}")
        except Exception as e:
            print(f"[!] Không thể ghi file {sys_conf_file}: {e}")

def cleanup_all_processes(signum=None, frame=None):
    """Giải phóng port và tắt tất cả tiến trình con"""
    print("\n[*] [Shutdown] Đang dừng toàn bộ Subprocesses...")
    for proc in processes:
        if proc and proc.poll() is None:
            try:
                proc.terminate()
                proc.wait(timeout=2)
            except Exception:
                try:
                    proc.kill()
                except Exception:
                    pass

    for port in [NGINX_LISTEN_PORT, TELEGRAM_WEBHOOK_PORT, RUSTDESK_WEB_PORT, RUSTDESK_HBBS_PORT, RUSTDESK_HBBR_PORT, GEMMA4_API_PORT]:
        subprocess.run(f"fuser -k {port}/tcp >/dev/null 2>&1", shell=True)

    print("[+] Đã dọn dẹp sạch sẽ tất cả tiến trình.")
    if signum is not None:
        sys.exit(0)

def start_or_reload_nginx(conf_path: str) -> subprocess.Popen:
    """Tự động kiểm tra cú pháp và nạp/reload Nginx trên local PC (Systemd service hoặc standalone)."""
    print("[*] [Nginx] Đang kiểm tra & tự động cập nhật cấu hình Nginx local PC...")
    
    # 1. Thử reload Nginx System Service nếu đang chạy và config OS hợp lệ
    test_res = subprocess.run(["nginx", "-t"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if "syntax is ok" in test_res.stderr:
        reload_res = subprocess.run(["nginx", "-s", "reload"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if reload_res.returncode == 0:
            print("[+] [Nginx System] Đã tự động reload Nginx system service (/etc/nginx/conf.d/tunnel.conf) thành công!")
            return None

    # 2. Fallback sang Nginx standalone local
    test_standalone = subprocess.run(["nginx", "-t", "-c", conf_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if "syntax is ok" not in test_standalone.stderr and test_standalone.returncode != 0:
        print(f"[!] [Nginx Error] Cấu hình Nginx lỗi cú pháp:\n{test_standalone.stderr}")
        raise RuntimeError("Nginx config test failed")

    reload_res = subprocess.run(["nginx", "-s", "reload", "-c", conf_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if reload_res.returncode == 0:
        print("[+] [Nginx Standalone] Đã tự động reload Nginx standalone thành công (Hot Reload).")
        return None
    else:
        subprocess.run(f"fuser -k {NGINX_LISTEN_PORT}/tcp >/dev/null 2>&1", shell=True)
        time.sleep(0.5)
        proc = subprocess.Popen(["nginx", "-c", conf_path])
        print(f"[+] [Nginx Standalone] Đã khởi chạy tiến trình Nginx local thành công với config {conf_path}.")
        return proc

async def main():
    signal.signal(signal.SIGINT, cleanup_all_processes)
    signal.signal(signal.SIGTERM, cleanup_all_processes)

    auto_install_dependencies()

    conf_path = os.path.abspath("nginx_tunnel.conf")
    generate_nginx_config(NGINX_LISTEN_PORT, PROXY_ROUTES, conf_path)
    nginx_proc = start_or_reload_nginx(conf_path)
    if nginx_proc:
        processes.append(nginx_proc)

    hbbs_bin = shutil.which("hbbs") or ("./hbbs" if os.path.exists("./hbbs") else None)
    hbbr_bin = shutil.which("hbbr") or ("./hbbr" if os.path.exists("./hbbr") else None)
    if hbbs_bin and hbbr_bin:
        proc_hbbs = subprocess.Popen([hbbs_bin, "-r", "127.0.0.1:21117"])
        proc_hbbr = subprocess.Popen([hbbr_bin])
        processes.extend([proc_hbbs, proc_hbbr])
        print("[+] Đã khởi chạy RustDesk HBBS & HBBR Servers")
        time.sleep(1)

    rustdesk_host_id, rustdesk_pass, rustdesk_key = auto_config_home_rustdesk_client()

    myassitant_script = os.path.join(os.path.dirname(__file__), "myassitant", "main.py")
    if os.path.exists(myassitant_script):
        my_env = {**os.environ, "SKIP_TUNNEL": "1"}
        proc_app = subprocess.Popen([sys.executable, myassitant_script], env=my_env)
        processes.append(proc_app)
        print("[+] Đã khởi chạy Telegram Webhook App (myassitant/main.py)")

    cloudflared_cmd = shutil.which("cloudflared") or "./cloudflared"
    cf_proc = subprocess.Popen(
        [cloudflared_cmd, "tunnel", "--url", f"http://localhost:{NGINX_LISTEN_PORT}", "--no-autoupdate"],
        stderr=subprocess.PIPE,
        text=True
    )
    processes.append(cf_proc)

    public_url = None
    print("[*] Đang chờ lấy Subdomain Cloudflare Tunnel...")
    while True:
        line = cf_proc.stderr.readline()
        if not line:
            break
        if "https://" in line and ".trycloudflare.com" in line:
            match = re.search(r"https://[a-z0-9-]+\.trycloudflare\.com", line)
            if match:
                public_url = match.group(0)
                print(f"[🎉 TUNNEL LIVE] Public Domain: {public_url}")
                break

    if public_url:
        await register_telegram_webhook(public_url)
        await send_tunnel_info_to_owner(public_url, PROXY_ROUTES, rustdesk_host_id, rustdesk_pass, rustdesk_key)

    while True:
        await asyncio.sleep(1)

async def register_telegram_webhook(base_url: str):
    from config import TELEGRAM_BOT_TOKEN
    import httpx
    webhook_url = f"{base_url}/webhook/"
    api_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/setWebhook"
    
    print(f"[*] [Webhook Master] Đang chờ Subdomain ({base_url}) sẵn sàng kết nối...")
    async with httpx.AsyncClient(timeout=10, verify=False) as client:
        # 1. Chờ DNS & Nginx Proxy sẵn sàng
        for attempt in range(1, 15):
            try:
                resp = await client.get(f"{base_url}/health")
                if resp.status_code == 200:
                    print(f"[+] [Webhook Master] Subdomain {base_url}/health đã thông suốt (lần {attempt})!")
                    break
            except Exception:
                pass
            await asyncio.sleep(2)

        # 2. Tiến hành đăng ký Telegram Webhook với Retry
        for attempt in range(1, 6):
            try:
                resp = await client.post(api_url, json={"url": webhook_url})
                data = resp.json()
                if data.get("ok"):
                    print(f"[+] [Webhook Master] ĐÃ ĐĂNG KÝ THÀNH CÔNG Webhook Telegram về Subdomain duy nhất: {webhook_url}")
                    return True
                else:
                    print(f"[!] [Webhook Master] Đăng ký Webhook thất bại (lần {attempt}): {data}")
            except Exception as e:
                print(f"[!] [Webhook Master] Lỗi kết nối khi đăng ký Webhook (lần {attempt}): {e}")
            await asyncio.sleep(3)
    return False

async def send_tunnel_info_to_owner(base_url: str, routes: list[dict], host_id: str, host_pass: str, key: str):
    owner_id = TELEGRAM_OWNER_USERID # '730806080' (@badpaybad)
    
    route_details = ""
    for idx, r in enumerate(routes, 1):
        route_details += f"{idx}. <code>{base_url}{r['path']}</code> ➡️ <code>127.0.0.1:{r['target_port']}</code> ({r['name']})\n"

    clean_domain = base_url.replace("https://", "").replace("http://", "").strip()

    msg = f"""🚀 <b>SYSTEM INITPC & TUNNEL PROXY ONLINE</b>

🔗 <b>Public Subdomain (Nginx):</b> <code>{base_url}</code>

🖥️ <b>THÔNG TIN RUSTDESK REMOTE DESKTOP PC NHÀ (HOME PC):</b>
• 🌐 <b>Remote qua Trình duyệt Web (Web Client Console):</b> 
  👉 <code>{base_url}/rustdesk/</code>

• 🆔 <b>RustDesk Host ID (Máy Nhà):</b> <code>{host_id}</code>
• 🔒 <b>RustDesk Password (Máy Nhà):</b> <code>{host_pass}</code>

• 📱 <b>Thông số Cấu hình App RustDesk Client (Cho thiết bị ngoài):</b>
  - <b>ID Server / Hostname:</b> <code>{clean_domain}</code>
  - <b>Relay Server:</b> <code>{clean_domain}</code>
  - <b>Public Key:</b> <code>{key}</code>

🔀 <b>Nginx Path Routing Rules:</b>
{route_details}
✅ Status: Master Supervisor <code>initpc.py</code> is running all subprocesses cleanly."""

    if owner_id:
        await bot_telegram.send_telegram_message(chat_id=owner_id, text=msg, parse_mode="HTML")
        print(f"[+] Đã gửi trọn bộ ID & Mật khẩu RustDesk tới Telegram @badpaybad ({owner_id})")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        cleanup_all_processes()
