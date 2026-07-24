from collections import defaultdict, deque
from nacl.exceptions import BadSignatureError
from nacl.signing import VerifyKey
from fastapi import FastAPI, Request, HTTPException
import subprocess
import re
import os
import sys
import json
import time
import atexit
from typing import Any
import uuid
from fastapi import FastAPI, Request
from pydantic import BaseModel
import httpx
import asyncio
import uvicorn
from contextlib import asynccontextmanager
from google import genai
from google.genai import types
from gemini_truyenkieu import chat_voi_cu_nguyen_du, chat_voi_cu_nguyen_du_memory
from datetime import datetime
from config import HISTORY_CHAT_MAX_LEN,TELEGRAM_BOT_TOKEN, TELEGRAM_API_URL, PORT, TELEGRAM_BOT_CHATID, TELEGRAM_BOT_USERNAME, GEMINI_APIKEY, DISCORD_PUBKEY, DISCORD_APPID, DISCORD_TOKEN,  TELEGRAM_API_ID, TELEGRAM_API_HASH, REPLY_ON_TAG_BOT_USERNAME

import config
import domain_handlers
import domain_handlers.ngoc_ddd

import bot_telegram
import bot_discord

import my_telethon
import telegram_types
import knowledgebase
import knowledgebase.dbcontext

import knowledgebase.orchestrationcontext 

from knowledgebase.orchestrationcontext import set_dir_program, skills_decision
from knowledgebase.gemini_search import is_search_requested, is_search_needed, search_with_gemini, SEARCH_TOOL_DEF
import jira_helper
from gemma4 import read_file_content, transcribe_audio

DIR_PROGRAM=os.path.dirname(os.path.abspath(__file__))

set_dir_program(DIR_PROGRAM)

# --- CẤU HÌNH ---

# Biến toàn cục để quản lý tiến trình tunnel và gemma4 local server
tunnel_process = None
gemma4_process = None
webhook_base_url = None

# --- LỊCH SỬ CHAT ---
# Sử dụng defaultdict để tự động tạo deque cho chat_id mới
# deque với maxlen=10 sẽ tự động xóa tin nhắn cũ nhất khi đầy
# chat_history = defaultdict(lambda: deque(maxlen=HISTORY_CHAT_MAX_LEN))

# Buffer cho media group (nhiều ảnh gửi cùng lúc)
# {media_group_id: {"files": [path1, path2], "text": "caption", "chat_id": 123, "processed": False}}
media_group_buffer = {}
media_group_lock = asyncio.Lock()

# --- HÀM GỬI TIN NHẮN (ASYNC) ---


async def wait_for_server_ready(url: str, timeout: int = 30):
    """Đợi cho đến khi server local thực sự phản hồi trước khi đăng ký webhook"""
    async with httpx.AsyncClient() as client:
        start_time = asyncio.get_event_loop().time()
        while True:
            await asyncio.sleep(1)
            try:
                # Kiểm tra thử xem port 8088 đã mở chưa
                response = await client.get(f"http://localhost:{PORT}")
                if response.status_code == 200:
                    print(f"Server đã sẵn sàng trên port {PORT}!")
                    return True
            except httpx.ConnectError:
                pass

            if (asyncio.get_event_loop().time() - start_time) > timeout:
                print("Quá thời gian chờ server khởi động.")
                return False

"""
# 1. Tải về file cài đặt (Phiên bản cho Linux 64-bit thông dụng)
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb

# 2. Cài đặt
sudo dpkg -i cloudflared.deb

# 3. Kiểm tra xem cài được chưa
cloudflared --version


cloudflared tunnel --url http://localhost:8088

"""


import shutil

async def cloudflare_tunel_get_baseurl():
    global tunnel_process
    global webhook_base_url

    cloudflared_cmd = shutil.which("cloudflared")
    if not cloudflared_cmd:
        local_bin = os.path.join(DIR_PROGRAM, "cloudflared")
        if os.path.exists(local_bin):
            cloudflared_cmd = local_bin
    if not cloudflared_cmd:
        cloudflared_cmd = "cloudflared"

    retry_count = 0
    while True:
        retry_count += 1
        print(f"[Cloudflare Tunnel] Đang khởi tạo Cloudflare Tunnel (Lần thử {retry_count})...")

        # Discard previous tunnel process if present
        if tunnel_process:
            try:
                tunnel_process.terminate()
                tunnel_process.wait(timeout=2)
            except Exception:
                pass
            tunnel_process = None

        try:
            tunnel_process = subprocess.Popen(
                [cloudflared_cmd, "tunnel", "--url", f"http://localhost:{PORT}", "--no-autoupdate"],
                stderr=subprocess.PIPE,
                text=True
            )
        except Exception as e:
            print(f"[!] Lỗi khi khởi tạo cloudflared process (Lần thử {retry_count}): {e}")
            await asyncio.sleep(3)
            continue

        await asyncio.sleep(1.0)
        webhook_base_url = None

        for _ in range(300):
            if not tunnel_process or not tunnel_process.stderr:
                break
            line = tunnel_process.stderr.readline()
            if "https://" in line and ".trycloudflare.com" in line:
                match = re.search(r"https://[a-z0-9-]+\.trycloudflare\.com", line)
                if match:
                    webhook_base_url = match.group(0)
                    print(f"[+] [Cloudflare Tunnel] Lấy thành công URL: {webhook_base_url}")
                    return webhook_base_url
            await asyncio.sleep(0.1)

        print(f"[-] [Cloudflare Tunnel] Lần thử {retry_count} chưa lấy được URL trycloudflare. Đang khởi động lại tunnel...")
        await asyncio.sleep(2)

async def jira_register_webhook(base_url):
    full_url = f"{base_url}/webhook-jira"
    jira_helper.create_or_update_webhook("chatbot-jira", full_url)

async def zalo_oa_register_webhook(base_url):
    full_url = f"{base_url}/webhook-zalo-oa"
    pass

async def verify_public_url_accessible(base_url: str, timeout_sec: int = 90) -> bool:
    """
    Kiểm tra tên miền public HTTPS Cloudflare xem DNS đã lan truyền trên Internet
    và phản hồi Status 200 OK hay chưa trước khi gọi Telegram setWebhook (tránh spam API Telegram).
    """
    health_url = f"{base_url}/health"
    print(f"[*] [DNS Verification] Đang kiểm tra tên miền public {health_url}...")
    start_time = asyncio.get_event_loop().time()
    
    async with httpx.AsyncClient(verify=False) as client:
        attempt = 0
        while True:
            attempt += 1
            try:
                resp = await client.get(health_url, timeout=5.0)
                if resp.status_code == 200:
                    print(f"[+] [DNS Verification] Tên miền public {base_url} đã lan truyền DNS thành công (Status 200 OK từ Internet) (Lần {attempt})!")
                    return True
            except Exception as ex:
                print(f"[-] [DNS Verification] Tên miền public chưa lan truyền DNS xong (Lần {attempt}): {ex}. Chờ 3s...")
            
            if (asyncio.get_event_loop().time() - start_time) > timeout_sec:
                print("[-] [DNS Verification] Quá thời gian chờ DNS lan truyền công khai.")
                return False
                
            await asyncio.sleep(3)

async def background_tunnel_and_webhook():
    while True:
        try:
            # 1. BƯỚC 1: Lấy subdomain HTTPS free từ Cloudflare (retry đến khi lấy được)
            base_url = await cloudflare_tunel_get_baseurl()
            if not base_url:
                print("[-] Không lấy được Cloudflare Subdomain. Thử lại sau 3s...")
                await asyncio.sleep(3)
                continue

            print(f"[+] [Bước 1] Đã lấy thành công Cloudflare Subdomain: {base_url}")
            await asyncio.sleep(3)

            # 2. BƯỚC 2: Kiểm tra Web Server (localhost:{PORT}) sẵn sàng
            print(f"[*] [Bước 2] Đang kiểm tra Web Server trên port {PORT}...")
            server_ready = await wait_for_server_ready(base_url)
            if not server_ready:
                print("[-] Web Server chưa sẵn sàng. Tái khởi động quy trình sau 3s...")
                await asyncio.sleep(3)
                continue

            print(f"[+] [Bước 2] Web Server local đã sẵn sàng trên port {PORT}!")
            await asyncio.sleep(3)

            # 3. BƯỚC 3: Kiểm tra Public HTTPS Domain đã lan truyền DNS thành công trên Internet
            print(f"[*] [Bước 3] Đang chờ Cloudflare DNS lan truyền cho tên miền public HTTPS {base_url}...")
            public_ready = await verify_public_url_accessible(base_url, timeout_sec=90)
            if not public_ready:
                print("[-] Tên miền public Cloudflare chưa lan truyền DNS xong. Tái khởi tạo Cloudflare Tunnel...")
                await asyncio.sleep(3)
                continue

            print(f"[+] [Bước 3] Tên miền public {base_url} đã lan truyền DNS và sẵn sàng nhận request từ Internet!")
            await asyncio.sleep(3)

            # 4. BƯỚC 4: Đăng ký Telegram Webhook (Lúc này Telegram chắc chắn sẽ phân giải DNS thành công ngay từ lần đầu)
            full_url = f"{base_url}/webhook"
            print(f"[*] [Bước 4] Bắt đầu đăng ký Telegram Webhook: {full_url}")

            telegram_success = False
            for attempt in range(1, 10):
                try:
                    await bot_telegram.register_webhook(base_url)
                    telegram_success = True
                    print(f"[+] [Bước 4] Đăng ký Telegram Webhook THÀNH CÔNG trên {base_url}!")
                    break
                except Exception as ex_tg:
                    print(f"[-] [Bước 4] Đăng ký Telegram Webhook thử lần {attempt} chưa thành công ({ex_tg}). Chờ 3s...")
                    await asyncio.sleep(3)

            if not telegram_success:
                print("[!] Đăng ký Telegram Webhook chưa thành công. Tái khởi tạo quy trình...")
                await asyncio.sleep(3)
                continue

            # 5. BƯỚC 5: Đăng ký các dịch vụ bổ sung (Jira, Zalo OA) & Thông báo hoạt động
            await jira_register_webhook(base_url)
            await zalo_oa_register_webhook(base_url)

            if TELEGRAM_BOT_CHATID is not None and TELEGRAM_BOT_CHATID != "" and TELEGRAM_BOT_CHATID != 0:
                await asyncio.sleep(2)
                await bot_telegram.send_telegram_message(TELEGRAM_BOT_CHATID, f"🚀 Chatbot Webhook is live: {base_url}")

            # Đăng ký thành công hoàn toàn 100% -> kết thúc vòng lặp
            print(f"[🎉 HOÀN TẤT QUY TRÌNH] Đã đăng ký thành công 100% Telegram Webhook trên {base_url}")
            break

        except Exception as e:
            print(f"[!] Lỗi trong background_tunnel_and_webhook: {e}. Thử lại quy trình sau 3s...")
            await asyncio.sleep(3)



async def ensure_gemma4_local_server_running():
    global gemma4_process
    gemma4_url = getattr(config, "GEMMA4_LOCAL_URL", "http://localhost:8000")
    health_url = f"{gemma4_url}/health"

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(health_url, timeout=2.0)
            if resp.status_code == 200 and resp.json().get("ready") is True:
                print(f"[Gemma4] Local API server is already running and ready on {gemma4_url}")
                return True
        except Exception:
            pass

    print(f"[Gemma4] Starting Gemma4 local server on port 8000 (pre-downloading & pre-loading models into GPU VRAM)...")
    gemma4_script = os.path.join(DIR_PROGRAM, "gemma4", "program.py")
    gemma4_process = subprocess.Popen(
        [sys.executable, gemma4_script],
        cwd=DIR_PROGRAM
    )

    async with httpx.AsyncClient() as client:
        start_t = time.time()
        while time.time() - start_t < 450:
            await asyncio.sleep(2)
            try:
                resp = await client.get(health_url, timeout=2.0)
                if resp.status_code == 200 and resp.json().get("ready") is True:
                    print(f"[Gemma4] Local API server started and models are 100% pre-loaded!")
                    return True
            except Exception:
                pass

    print("[Gemma4] Warning: Local Gemma4 server startup check timed out.")
    return False


def kill_ports():
    print(f"Đang giải phóng tiến trình gemma4 (port 8000) và program (port {PORT})...")
    try:
        subprocess.run("fuser -k -9 8000/tcp", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception as e:
        print(f"Lỗi kill port 8000: {e}")

    try:
        subprocess.run(f"fuser -k -9 {PORT}/tcp", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception as e:
        print(f"Lỗi kill port {PORT}: {e}")

atexit.register(kill_ports)


@asynccontextmanager
async def lifespan(app: FastAPI):
    if getattr(config, "USE_GEMMA4_LOCAL", True):
        asyncio.create_task(ensure_gemma4_local_server_running())

    if TELEGRAM_BOT_TOKEN is None or TELEGRAM_BOT_TOKEN != "":
        print("Server đang khởi động, bắt đầu đăng ký Webhook...")
        asyncio.create_task(background_tunnel_and_webhook())

    if TELEGRAM_API_ID is not None and TELEGRAM_API_ID != "" and TELEGRAM_API_HASH is not None and TELEGRAM_API_HASH != "":
        # https://my.telegram.org/apps  nếu muốn nhận tất cả tin nhắn từ các nhóm mà bạn tham gia
        asyncio.create_task(my_telethon.run_until_disconnected())

    yield  # Sau từ khóa yield là nơi server đang chạy

    # --- Chạy khi SERVER TẮT ---
    print("Shutting down...")
    # --- TẮT SERVER ---
    print("Đang đóng Tunnel...")
    if tunnel_process:
        try:
            tunnel_process.terminate()
            tunnel_process.wait(timeout=2)
        except Exception:
            pass
    if gemma4_process:
        print("Đang đóng Gemma4 Local Server...")
        try:
            gemma4_process.terminate()
            gemma4_process.wait(timeout=2)
        except Exception:
            pass

    kill_ports()
    print("Server đã tắt hoàn toàn.")


app = FastAPI(lifespan=lifespan)

@app.get("/")
@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "Bot is running!"}

# Whitelist: Chỉ trả lời các ID này
ALLOWED_IDS = []  # [987654321, -100123456789]

async def process_chat_history_and_received_msg(user_text: str, chat_id,listFilePath:list[str]  =None,currentmsg=None):

    if user_text is None or user_text == "":
        return ""
        
    clean_message = user_text.replace(TELEGRAM_BOT_USERNAME, "").strip()

    # Lấy lịch sử cho chat_id này
    # history = list(chat_history[chat_id])

    # Gọi AI với lịch sử
    reply_text, history1 = chat_voi_cu_nguyen_du_memory(clean_message, history=[],listPathFiles=listFilePath)

    # # Cập nhật lịch sử
    # chat_history[chat_id].append(
    #     {"role": "user", "parts": [clean_message]})
    # chat_history[chat_id].append({"role": "model", "parts": [reply_text]})

    return reply_text


# --- WEBHOOK ENDPOINT ---
# 
# Đang gửi Webhook tới Telegram: https://testing-sonic-profiles-deserve.trycloudflare.com/webhook-jira

@app.post("/webhook-jira")
async def handle_jira(request: Request):
    print("Đang nhận Webhook từ Jira...")
    jiradata=await request.json()
    # print(jiradata)
    # knowledgebase.dbcontext.db_jira.insert(jiradata)
    # todo: cần thao tác xử lý gì cần dùng dbcontext.py để lưu vào db, ở skills/jira cần lưu chat_id và jira url để sau có thể update và kiểm tra trạng thái rồi gửi message lên nhóm chát 
    pass

@app.post("/webhook-zalo-oa")
async def handle_zalo_oa(request: Request):
    print("Đang nhận Zalo từ Jira...")
    # print(await request.json())
    # todo: tất cả các loại chát khác, zalo, discord, whatsapp ... cần convert về dạng message của telegram, dùng để hỗ trợ cho zalo group chat tương tự telegram chat bot 
    pass


async def gemma4_process_chat_history_and_current_msg(orchestration_message: telegram_types.OrchestrationMessage):
    """
    Xử lý gọi API Gemma4 local cho tin nhắn Telegram:
    1. Kiểm tra bot_telegram tag/mention trong current message (nếu có config REPLY_ON_TAG_BOT_USERNAME thì chỉ reply khi được tag/mention).
    2. Lưu orchestration_message vào DB.
    3. Lấy 20 tin nhắn gần nhất từ DB cho chat_id.
    4. Trích xuất links, audio, image, text chat, reply, quote từ 20 tin nhắn.
    5. Gọi local Gemma4 API (port 8000 /v1beta/models/gemma-4-e4b-it:generateContent).
    6. Trả lời người dùng bằng bot_telegram.send_telegram_message (nâng cấp reply_to_message_id, format tag người được trả lời, gửi kèm text/ảnh/audio/files nếu có).
    """
    if not orchestration_message or not orchestration_message.chat_id:
        return

    chat_id = orchestration_message.chat_id
    user_text = orchestration_message.text or ""
    bot_username = TELEGRAM_BOT_USERNAME or ""
    bot_username_clean = bot_username.replace("@", "").strip().lower()

    # 1. KIỂM TRA BOT CÓ ĐƯỢC TAG / MENTION TRONG MESSAGE HIỆN TẠI KHÔNG HOẶC LÀ CHAT PRIVATE 1-1
    is_private_chat = False
    if orchestration_message.message and orchestration_message.message.message and orchestration_message.message.message.chat:
        chat_type = orchestration_message.message.message.chat.type
        if chat_type == "private":
            is_private_chat = True

    try:
        if int(chat_id) > 0:
            is_private_chat = True
    except (ValueError, TypeError):
        pass

    is_mentioned = False
    if not bot_username_clean:
        is_mentioned = True
    else:
        if bot_username_clean in user_text.lower():
            is_mentioned = True
        if orchestration_message.message:
            mentions = orchestration_message.message.get_users_mention()
            for m in mentions:
                u_name = (m.get("username") or "").lower()
                if u_name == bot_username_clean:
                    is_mentioned = True
                    break

    reply_on_tag = getattr(config, "REPLY_ON_TAG_BOT_USERNAME", True)
    if reply_on_tag and not is_mentioned and not is_private_chat:
        print(f"[Gemma4 Process] Skipping message: Bot ({TELEGRAM_BOT_USERNAME}) is not tagged/mentioned and chat is not private 1-1.")
        return


    # 2. LƯU ORCHESTRATION_MESSAGE VÀO DB
    try:
        knowledgebase.dbcontext.db_orchestration_all_message.insert(orchestration_message.model_dump_json(by_alias=True))
    except Exception as ex_db:
        print(f"[Gemma4 Process] Warning inserting DB: {ex_db}")

    # 3. LẤY 20 MESSAGE GẦN NHẤT
    history_limit = getattr(config, "HISTORY_CHAT_MAX_LEN", 20)
    db_msgs = knowledgebase.orchestrationcontext.get_list_current_orchestration_messages(str(chat_id))
    recent_msgs = db_msgs[-history_limit:] if len(db_msgs) > history_limit else db_msgs

    # 4. CHUẨN BỊ BỐ CỤC LỊCH SỬ CHAT VÀ CONTEXT DÀNH CHO GEMMA4
    gemma4_url = getattr(config, "GEMMA4_LOCAL_URL", "http://localhost:8000")
    accumulated_file_uris = []
    url_pattern = r'https?://[^\s<>"]+|www\.[^\s<>"]+'
    history_formatted_str = []

    for idx, rec in enumerate(recent_msgs):
        msg_obj = rec.get("json", {}) if isinstance(rec, dict) and "json" in rec else rec
        if isinstance(msg_obj, str):
            try:
                msg_obj = json.loads(msg_obj)
            except:
                msg_obj = {}

        msg_text = msg_obj.get("text", "") or ""
        msg_files = msg_obj.get("files", []) or []
        update_info = msg_obj.get("message", {}) or {}
        msg_info = update_info.get("message") or update_info.get("edited_message") or {}
        
        from_user = msg_info.get("from_user") or msg_info.get("from") or {}
        sender_id = from_user.get("id")
        sender_name = f"{from_user.get('first_name', '')} {from_user.get('last_name', '')}".strip() or from_user.get("username") or "User"
        sender_username = from_user.get("username")
        msg_id = msg_info.get("message_id")

        reply_to = msg_info.get("reply_to_message")
        reply_info_str = ""
        if reply_to:
            r_sender = reply_to.get("from_user") or reply_to.get("from") or {}
            r_name = r_sender.get("first_name") or r_sender.get("username") or "someone"
            r_text = reply_to.get("text") or reply_to.get("caption") or ""
            reply_info_str = f" [Replying to {r_name} (Msg ID {reply_to.get('message_id')}): \"{r_text[:60]}\"]"

        msg_str = f"Message #{idx+1} [ID:{msg_id}] from {sender_name} (@{sender_username or 'none'}, UserID:{sender_id}){reply_info_str}:\n{msg_text}"
        
        # Check URLs in this message
        urls = re.findall(url_pattern, msg_text)
        for u in set(urls):
            fetch_res, mime_type, res_type = knowledgebase.orchestrationcontext.fetch_url_content(u)
            if res_type == "text" and fetch_res:
                msg_str += f"\n[Link Content from {u}]:\n{fetch_res[:1000]}"
            elif res_type == "file" and fetch_res:
                if fetch_res not in msg_files:
                    msg_files.append(fetch_res)

        # Parse attached files (documents, audio, images)
        if msg_files:
            async with httpx.AsyncClient() as client:
                for fpath in msg_files:
                    if os.path.exists(fpath):
                        ext = os.path.splitext(fpath)[1].lower()
                        # Extract document content (PDF, DOCX, TXT, CSV, XLSX, PPTX)
                        if ext in [".txt", ".pdf", ".docx", ".doc", ".pptx", ".ppt", ".xlsx", ".xls", ".csv"]:
                            try:
                                file_text = read_file_content(fpath)
                                if file_text and not file_text.startswith("Lỗi:"):
                                    msg_str += f"\n[Nội dung file tài liệu ({os.path.basename(fpath)})]:\n{file_text[:3000]}"
                            except Exception as ex_f:
                                print(f"[File Parse Error] {fpath}: {ex_f}")

                        # Extract audio transcription (voice, mp3, wav, ogg, m4a, opus)
                        elif ext in [".mp3", ".wav", ".ogg", ".m4a", ".aac", ".flac", ".opus"]:
                            try:
                                audio_text = transcribe_audio(fpath)
                                if audio_text and not audio_text.startswith("Lỗi:"):
                                    msg_str += f"\n[Nội dung Audio/Voice ({os.path.basename(fpath)})]:\n{audio_text}"
                            except Exception as ex_a:
                                print(f"[Audio STT Error] {fpath}: {ex_a}")

                        # Upload file to Gemma4 files endpoint (images, vision, multimodal)
                        try:
                            import mimetypes
                            mime_guess, _ = mimetypes.guess_type(fpath)
                            mime = mime_guess or "application/octet-stream"
                            with open(fpath, "rb") as f_data:
                                files_upload = {"file": (os.path.basename(fpath), f_data, mime)}
                                r_up = await client.post(f"{gemma4_url}/v1beta/files", files=files_upload, timeout=15.0)
                                if r_up.status_code == 200:
                                    f_meta = r_up.json()
                                    accumulated_file_uris.append({"uri": f_meta["name"], "mime_type": f_meta["mimeType"]})
                        except Exception as ex_up:
                            print(f"[Gemma4 File Upload] Error uploading {fpath}: {ex_up}")

        history_formatted_str.append(msg_str)

    full_conversation_history_text = "\n\n".join(history_formatted_str)

    chat_type_desc = "Trò chuyện cá nhân 1-1 (Private Chat)" if is_private_chat else "Nhóm chat Telegram (Group Chat)"

    # Build Quoted Message Block if user replied to/quoted a previous message
    quoted_msg_block = ""
    if orchestration_message.message and orchestration_message.message.message and orchestration_message.message.message.reply_to_message:
        r_msg = orchestration_message.message.message.reply_to_message
        r_user = r_msg.from_user or getattr(r_msg, "from_", None)
        r_name = f"{r_user.first_name or ''} {r_user.last_name or ''}".strip() if r_user else "someone"
        r_text = r_msg.text or r_msg.caption or ""
        quoted_msg_block = f"### TIN NHẮN ĐƯỢC QUOTE / REPLY (QUOTED MESSAGE [ID:{r_msg.message_id}]) từ {r_name}:\n\"{r_text}\"\n\n"

    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    # 5. SOẠN PROMPT VÀ GỌI GEMMA4 LOCAL API
    system_instruction_text = (
        f"Bạn là một trợ lý AI đa năng thông minh hỗ trợ Telegram. Thời gian hiện tại: {now}\n"
        "Dưới đây là lịch sử cuộc trò chuyện 20 tin nhắn gần nhất (bao gồm nội dung văn bản, đường link, hình ảnh, audio, tin nhắn reply, quote...).\n"
        f"Loại hình trò chuyện hiện tại: {chat_type_desc}.\n\n"
        "Quy tắc ưu tiên xử lý và trả lời:\n"
        "1. ƯU TIÊN HÀNG ĐẦU - Tin nhắn hiện tại (CURRENT MESSAGE) & Tin nhắn được Quote (QUOTED MESSAGE):\n"
        "   - Nhiệm vụ trọng tâm của bạn là giải quyết đúng câu hỏi/yêu cầu nằm trong TIN NHẮN HIỆN TẠI (CURRENT MESSAGE).\n"
        "   - Đối với MỌI câu hỏi mới, thắc mắc lập trình (ví dụ: Java, C#, EF DbContext, Spring Data JPA, Hibernate, SQL...), yêu cầu viết code, xin tài liệu, đọc link hay xem file: BẮT BUỘC TRẢ LỜI ĐẦY ĐỦ, chi tiết và hữu ích.\n"
        "   - Nếu người dùng có reply/quote một tin nhắn trước đó (QUOTED MESSAGE): Hãy ĐẶC BIỆT ƯU TIÊN đọc nội dung tin nhắn được quote đó để xử lý đúng ý định của người dùng!\n"
        "   - Lịch sử 20 tin nhắn gần nhất là ngữ cảnh phụ hỗ trợ bạn nắm được mạch trò chuyện.\n\n"
        "2. Xử lý Đường link (URL) & File đính kèm (Ảnh, Audio, Tài liệu):\n"
        "   - Các đường link (URL) đã được tự động cào nội dung đính kèm dưới nhãn `[Link Content from <URL>]: ...`.\n"
        "   - Các file tài liệu (PDF, Word, Excel, CSV, PPTX, TXT...) đã được tự động trích xuất dưới nhãn `[Nội dung file tài liệu (...)]`.\n"
        "   - Các âm thanh/voice đã được tự động chuyển thành văn bản (STT) đính kèm dưới nhãn `[Nội dung Audio/Voice (...)]`.\n"
        "   - Đọc kỹ các thông tin đính kèm này để giải quyết yêu cầu trong tin nhắn hiện tại.\n\n"
        "3. Kiểm tra tin nhắn lặp lại (Chỉ bỏ qua khi trùng lặp hoàn toàn):\n"
        "   - CHỈ VÀ CHỈ KHI câu hỏi hiện tại trùng lặp Y HỆT với một câu hỏi đã được bạn trả lời chính xác ở ngay 1-2 tin nhắn vừa xong trong lịch sử 20 tin nhắn: Hãy trả về duy nhất cụm từ `[NO_REPLY]` (không kèm văn bản nào khác).\n"
        "   - Đối với MỌI trường hợp câu hỏi mới hay thắc mắc chưa được giải quyết: BẮT BUỘC trả lời đầy đủ.\n\n"
        "4. Tagging & Phân loại trò chuyện:\n"
        "   - Trò chuyện cá nhân 1-1 (Private Chat): Trả lời trực tiếp, tự nhiên, KHÔNG tag @username.\n"
        "   - Nhóm chat (Group Chat): Phân tích ngữ cảnh để tag đúng @username của người cần trả lời khi cần.\n\n"
        "5. Trả lời ngắn gọn, rõ ràng, thân thiện và hữu ích bằng tiếng Việt."
    )
    parts_payload = [
        {"text": f"### LỊCH SỬ 20 TIN NHẮN GẦN NHẤT:\n{full_conversation_history_text}\n\n{quoted_msg_block}### TIN NHẮN HIỆN TẠI (CURRENT MESSAGE - ƯU TIÊN XỬ LÝ):\n{user_text}"}
    ]

    for file_item in accumulated_file_uris:
        parts_payload.append({
            "file_data": {
                "file_uri": file_item["uri"],
                "mime_type": file_item["mime_type"]
            }
        })

    gen_request_body = {
        "contents": [
            {
                "role": "user",
                "parts": parts_payload
            }
        ],
        "system_instruction": {
            "role": "system",
            "parts": [{"text": system_instruction_text}]
        },
        "tools": [
            {
                "function_declarations": [SEARCH_TOOL_DEF]
            }
        ],
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 1024
        }
    }

    # Pre-check is_search_needed không còn bắt buộc vì đã chuyển sang tự động đánh giá qua Tool Call trong Gemma4 API
    # if is_search_needed(user_text, full_conversation_history_text) and not accumulated_file_uris:
    #     try:
    #         print(f"[Gemini Search] Triggering Google Search tool for query: {user_text[:60]}")
    #         search_prompt = f"{quoted_msg_block}### TIN NHẮN HIỆN TẠI (YÊU CẦU TÌM KIẾM):\n{user_text}"
    #         search_reply = search_with_gemini(search_prompt, full_conversation_history_text, is_private_chat)
    #         if search_reply and not search_reply.startswith("Lỗi"):
    #             final_reply_text = search_reply.strip()
    #             sent_res = await bot_telegram.send_telegram_message(
    #                 chat_id=chat_id,
    #                 text=final_reply_text,
    #                 files=None,
    #                 reply_to_message_id=reply_msg_id,
    #                 parse_mode="HTML"
    #             )
    #             print(f"[Gemini Search] Reply sent to chat {chat_id}: {final_reply_text[:80]}...")
    #             return sent_res
    #     except Exception as ex_search:
    #         print(f"[Gemini Search] Error during web search: {ex_search}")

    try:
        async with httpx.AsyncClient() as client:
            print(f"[Gemma4 Process] Calling Gemma4 API at {gemma4_url}/v1beta/models/gemma-4-e4b-it:generateContent ...")
            resp = await client.post(
                f"{gemma4_url}/v1beta/models/gemma-4-e4b-it:generateContent",
                json=gen_request_body,
                timeout=120.0
            )
            resp.raise_for_status()
            resp_data = resp.json()

            reply_text = ""
            if resp_data.get("candidates"):
                candidate = resp_data["candidates"][0]
                c_parts = candidate.get("content", {}).get("parts", [])
                for p in c_parts:
                    if p.get("function_call"):
                        fcall = p["function_call"]
                        if fcall.get("name") == "search_with_gemini":
                            print(f"[Gemma4 API Tool Call] Function call search_with_gemini triggered: {fcall.get('args')}")
                            query_param = fcall.get("args", {}).get("query") or user_text
                            search_prompt = f"{quoted_msg_block}### TIN NHẮN HIỆN TẠI (YÊU CẦU TÌM KIẾM):\n{query_param}"
                            search_reply = search_with_gemini(search_prompt, full_conversation_history_text, is_private_chat)
                            if search_reply and not search_reply.startswith("Lỗi"):
                                reply_text = search_reply.strip()
                    elif p.get("text"):
                        reply_text += p["text"]

            if not reply_text:
                reply_text = "Em đã nhận thông tin nhưng không sinh được câu trả lời."

            # 6. GỬI LẠI MESSAGE CHO NGƯỜI DÙNG BẰNG BOT_TELEGRAM
            current_msg_info = orchestration_message.message.message if orchestration_message.message else None
            reply_msg_id = current_msg_info.message_id if current_msg_info else None

            final_reply_text = reply_text.strip()

            if final_reply_text == "[NO_REPLY]" or "[NO_REPLY]" in final_reply_text:
                print(f"[Gemma4 Process] Request already answered in 20 messages context. Skipping reply to chat {chat_id}.")
                return {"status": "skipped", "reason": "Already answered in context"}


            sent_res = await bot_telegram.send_telegram_message(
                chat_id=chat_id,
                text=final_reply_text,
                files=None,
                reply_to_message_id=reply_msg_id,
                parse_mode="HTML"
            )
            print(f"[Gemma4 Process] Reply sent to chat {chat_id}: {final_reply_text[:80]}...")

            if sent_res:
                try:
                    # Save bot's reply to DB so history context includes the bot's answers per chat_id across restarts
                    bot_reply_orch = telegram_types.OrchestrationMessage()
                    bot_reply_orch.msg_id = str(uuid.uuid4())
                    bot_reply_orch.chat_id = str(chat_id)
                    bot_reply_orch.text = final_reply_text
                    
                    msg_id_val = getattr(sent_res, "message_id", None) or (sent_res.get("result", {}).get("message_id") if isinstance(sent_res, dict) else int(time.time()))
                    bot_msg_dict = {
                        "message_id": msg_id_val,
                        "date": int(time.time()),
                        "chat": {"id": int(chat_id) if str(chat_id).lstrip('-').isdigit() else chat_id},
                        "from": {"id": 0, "first_name": "Assistant Bot", "username": TELEGRAM_BOT_USERNAME},
                        "text": final_reply_text
                    }
                    bot_reply_orch.message = telegram_types.TelegramUpdate(update_id=0, message=telegram_types.Message.model_validate(bot_msg_dict))
                    knowledgebase.dbcontext.db_orchestration_all_message.insert(bot_reply_orch.model_dump_json(by_alias=True))
                except Exception as ex_save_bot:
                    print(f"[Gemma4 Process] Warning saving bot reply to DB: {ex_save_bot}")

            return sent_res

    except Exception as ex_gemma:
        print(f"[Gemma4 Process] Error calling Gemma4 API or sending reply: {ex_gemma}")
        import traceback
        traceback.print_exc()
        err_reply = "Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại sau."
        try:
            await bot_telegram.send_telegram_message(
                chat_id=chat_id,
                text=err_reply,
                reply_to_message_id=orchestration_message.message.message.message_id if orchestration_message.message and orchestration_message.message.message else None
            )
        except Exception as ex_send:
            print(f"[Gemma4 Process] Error sending generic error message to Telegram: {ex_send}")

@app.post("/webhook")
async def handle_webhook(request: Request):
    try:
        
        # Lấy toàn bộ dữ liệu JSON thô từ Telegram
        data = await request.json()

        msg_id_guid = knowledgebase.dbcontext.sqllite_all_message.insert(data)
        update = telegram_types.TelegramUpdate.model_validate(data)

        knowledgebase.orchestrationcontext.summarychat.enqueue_update(update)

        print(update)

        if not update.message:
            if update.edited_message:
                update.message=update.edited_message
                pass
        # 1. Kiểm tra xem có phải là tin nhắn mới không
        if not update.message:
            return {"status": "ignored", "reason": "Not a new message"}

        # --- KIỂM TRA THỜI GIAN ---
        current_time = time.time()  # Thời gian hiện tại của server
        # Thời gian tin nhắn được gửi (Unix timestamp)
        message_time = update.message.date

        # Tính độ trễ (giây)
        time_diff = current_time - message_time

        # if time_diff > 60*60*60:
        #     print(f"Bỏ qua tin nhắn cũ ({int(time_diff)} giây trước)")
        #     return {"status": "ignored", "reason": "Message too old"}

        chat_id = update.message.chat.id
        user_text = update.message.text

        if update.message.caption:
            user_text=f"{user_text}\n\nCaption: {update.message.caption}"

        if update.message.reply_to_message:
            user_text=f"{user_text}\n\nReply to: {update.message.reply_to_message.text}"

        media_group_id = update.message.media_group_id

        # 2. Kiểm tra Whitelist (Bảo mật)
        if len(ALLOWED_IDS) > 0 and chat_id not in ALLOWED_IDS:
            print(f"Blocked ID: {chat_id}")
            return {"status": "ignored", "reason": "Unauthorized"}

        # 3. Xử lý file đính kèm
        listFilePath=[]
        media_files = []
        db_file_rec=[]
        if update.message.photo:
            # Lấy ảnh chất lượng cao nhất (cuối cùng trong list)
            media_files.append((update.message.photo[-1].file_id, None))
        
        if update.message.document:
            media_files.append((update.message.document.file_id, update.message.document.file_name))
            
        if update.message.video:
            media_files.append((update.message.video.file_id, update.message.video.file_name))
            
        if update.message.voice:
            media_files.append((update.message.voice.file_id, None))
            
        if update.message.audio:
            media_files.append((update.message.audio.file_id, update.message.audio.file_name))
            
        if update.message.animation:
            media_files.append((update.message.animation.file_id, update.message.animation.file_name))

        for file_id, custom_name in media_files:
            fpath=await bot_telegram.download_telegram_file(file_id, chat_id, custom_name, sub_dir=media_group_id)
            if fpath:
                listFilePath.append(fpath)
                db_file_rec.append({"msg_id":msg_id_guid,"chat_id":chat_id, "file_id": file_id, "file_path": fpath})

        if len(db_file_rec) > 0:
            knowledgebase.dbcontext.sqllite_all_message_file.insert(db_file_rec)
        print(f"Nhận tin từ {chat_id}: {user_text}")

        # 4. Xử lý Media Group logic (Buffering)
        if media_group_id:
            async with media_group_lock:
                if media_group_id not in media_group_buffer:
                    media_group_buffer[media_group_id] = {
                        "files": [],
                        "text": None,
                        "chat_id": chat_id,
                        "processed": False
                    }
                
                if user_text:
                    if media_group_buffer[media_group_id]["text"]:
                        temp_gtext=f"{media_group_buffer[media_group_id]["text"]}"
                    else:
                        temp_gtext=None

                    if temp_gtext:
                        media_group_buffer[media_group_id]["text"] = f"{temp_gtext}\n\n{user_text}"
                    else:
                        media_group_buffer[media_group_id]["text"] = user_text
                
                if listFilePath:
                    media_group_buffer[media_group_id]["files"].extend(listFilePath)
            
            # Đợi một chút để gom các tin nhắn khác trong album
            await asyncio.sleep(2)
            
            async with media_group_lock:
                # Chỉ xử lý nếu chưa được xử lý bởi request khác (cùng album)
                if media_group_buffer[media_group_id]["processed"]:
                    return {"status": "ok", "reason": "Handled by another request in group"}
                
                # Đánh dấu đã xử lý
                media_group_buffer[media_group_id]["processed"] = True
                
                # Lấy dữ liệu đã gom
                final_user_text = media_group_buffer[media_group_id]["text"]
                final_file_paths = media_group_buffer[media_group_id]["files"]

                user_text=final_user_text
                listFilePath=final_file_paths
                
            # # 5. Xử lý Logic AI cho Media Group
            # if final_user_text or final_file_paths:
            #     if REPLY_ON_TAG_BOT_USERNAME is not None and REPLY_ON_TAG_BOT_USERNAME:
            #         if (final_user_text and TELEGRAM_BOT_USERNAME in final_user_text):
            #             reply_text = await process_chat_history_and_received_msg(final_user_text or "", chat_id, final_file_paths,update)
            #             await bot_telegram.send_telegram_message(chat_id, reply_text)
            #     else:
            #         reply_text = await process_chat_history_and_received_msg(final_user_text or "", chat_id, final_file_paths,update)
            #         await bot_telegram.send_telegram_message(chat_id, reply_text)
                    
            # return {"status": "ok"}
        
        # # 4. Xử lý Logic (Tin nhắn đơn lẻ)
        # if user_text or listFilePath:
        #     telegram_response=None
        #     # 2. Kiểm tra nếu tin nhắn có chứa nội dung và có tag tên bot
        #     if REPLY_ON_TAG_BOT_USERNAME is not None and REPLY_ON_TAG_BOT_USERNAME:
        #         if user_text and TELEGRAM_BOT_USERNAME in user_text:
        #             reply_text = await process_chat_history_and_received_msg(user_text or "", chat_id, listFilePath,update)
        #             telegram_response = await bot_telegram.send_telegram_message(chat_id, reply_text)
        #     else:
        #         reply_text = await process_chat_history_and_received_msg(user_text or "", chat_id, listFilePath,update)
        #         telegram_response = await bot_telegram.send_telegram_message(chat_id, reply_text)   

        #     if telegram_response:
        #         #.model_dump_json(by_alias=True)
        #         sqllite_all_message.insert(telegram_response.json())
        #         summarychat.enqueue_update(telegram_response)

        orchestration_message=telegram_types.OrchestrationMessage()
        orchestration_message.message=update
        orchestration_message.msg_id=msg_id_guid
        orchestration_message.files=listFilePath
        orchestration_message.files_type= []
        for f in listFilePath:
            # if f.endswith(".jpg") or f.endswith(".jpeg") or f.endswith(".png") or f.endswith(".gif") or f.endswith(".webp"):
            #     orchestration_message.files_type.append("image")
            # elif f.endswith(".mp4") or f.endswith(".avi") or f.endswith(".mov") or f.endswith(".mkv"):
            #     orchestration_message.files_type.append("video")
            # elif f.endswith(".mp3") or f.endswith(".wav") or f.endswith(".aac") or f.endswith(".flac"):
            #     orchestration_message.files_type.append("audio")
            # elif f.endswith(".pdf") or f.endswith(".doc") or f.endswith(".docx") or f.endswith(".txt"):
            #     orchestration_message.files_type.append("document")
            # else:                
            #     orchestration_message.files_type.append("file")
            orchestration_message.files_type.append("file")
            
        orchestration_message.text=user_text
        orchestration_message.chat_id=str(chat_id)
        orchestration_message.webhook_base_url=webhook_base_url

        # if config.CONFIG_NAME=="config_ngoc":
        #     await domain_handlers.ngoc_ddd.handle(orchestration_message)
        #     # return  {"status": "ok"}
        #     pass
        
        # if REPLY_ON_TAG_BOT_USERNAME is not None and REPLY_ON_TAG_BOT_USERNAME :
        #     if orchestration_message.text and TELEGRAM_BOT_USERNAME in orchestration_message.text:
        #         await skills_decision(orchestration_message)

        await gemma4_process_chat_history_and_current_msg(orchestration_message)

        return {"status": "ok"}
    except Exception as ex:
        print(f"Lỗi khi xử lý tin nhắn: {ex}")
        import traceback
        traceback.print_exc()
        try:
            if 'chat_id' in locals() and chat_id:
                await bot_telegram.send_telegram_message(
                    chat_id=chat_id,
                    text="Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại sau."
                )
        except Exception as send_ex:
            print(f"Lỗi khi gửi thông báo lỗi tới Telegram: {send_ex}")
        return {"status": "ok"}
# Đoạn này để chạy trực tiếp bằng python main.py (hoặc dùng lệnh uvicorn ở ngoài)


if __name__ == "__main__":
    uvicorn.run("program:app", host="0.0.0.0", port=PORT, reload=False)

    # đăng ký bot callback  https://api.telegram.org/bot<TOKEN_CUA_BAN>/setWebhook?url=<LINK_NGROK>/webhook

# @app.post("/discord")
# async def discord_interactions(request: Request):
#     # 1. Bắt buộc phải xác thực chữ ký (Discord yêu cầu)
#     signature = request.headers.get("X-Signature-Ed25519")
#     timestamp = request.headers.get("X-Signature-Timestamp")
#     body = await request.body()
#     print(f"DISCORD body: {body}")
#     body_decode = body.decode()
#     verify_key = VerifyKey(bytes.fromhex(DISCORD_PUBKEY))
#     try:
#         verify_key.verify(
#             timestamp.encode() + body,
#             bytes.fromhex(signature))
#         # verify_key.verify(f"{timestamp}".encode() + body, bytes.fromhex(signature))
#     except Exception as ex:
#         print(f"DISCORD: fail ping pong: {ex}")
#         raise HTTPException(
#             status_code=401, detail="Invalid request signature")

#     print(f"DISCORD: {timestamp} {signature} {body_decode}")
#     # 2. Xử lý gói tin PING từ Discord (Để lưu được URL)
#     data = await request.json()
#     print(f"DISCORD JSON : {data}")

#     if data.get("type") == 1:
#         return {"type": 1}  # Trả về PING thành công

#     # 3. Xử lý tin nhắn chat của bạn ở đây...
#     # 2. Xử lý khi có người dùng tương tác (Slash Command hoặc Mention)
#     if data.get("type") == 2:  # Type 2 là Application Command (ví dụ lệnh /)
#         command_data = data.get("data", {})
#         # Lấy chat_id (channel_id trong discord)
#         chat_id = data.get("channel", {}).get("id")
#         user_input = ""

#         # Lấy nội dung người dùng nhập (nếu dùng Slash Command)
#         options = command_data.get("options", [])
#         if options:
#             user_input = options[0].get("value", "")
#         if user_input == "":
#             return {"type": 6}

#         bot_reply = await process_chat_history_and_received_msg(user_input, chat_id)

#         # Trả về kết quả cho Discord
#         return {
#             "type": 4,
#             "data": {
#                 "content": f"{bot_reply}",
#                 "tts": False  # Text-to-speech
#             }
#         }

#     return {"status": "ok"}
