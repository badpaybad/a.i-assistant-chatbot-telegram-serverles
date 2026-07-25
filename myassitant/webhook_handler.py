"""
myassitant/webhook_handler.py
FastAPI app nhận Telegram webhook update và lưu vào SQLite.

- Khi bot được thêm vào nhóm → lưu group_chat
- Khi nhận message → lưu message_of_group
- Detect is_chatbot_reply: 0=không cần reply, 1=cần reply (bot được tag/gọi tên)
- Nếu message có file → tạo bản ghi file_of_message với is_processed=0
- Nếu message có URL → tạo bản ghi file_of_message loại "url"
"""
import re
import json
import os
import sys
import httpx
import asyncio
from datetime import datetime, timezone
from typing import Optional, Dict, Any, List

from fastapi import FastAPI, Request, HTTPException

# Adjust path để import myassitant package
_DIR = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.dirname(_DIR)
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

from myassitant import db
from myassitant.config import (
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_BOT_USERNAME,
    REPLY_ON_TAG_BOT_USERNAME,
    DIR_FILES,
)

# Tạo FastAPI app riêng (sẽ được mount hoặc chạy độc lập)
app = FastAPI(title="myassitant Webhook Handler")

URL_PATTERN = re.compile(r'https?://[^\s<>"]+|www\.[^\s<>"]+')

# ─── Helpers ──────────────────────────────────────────────────────────────────

def _bot_username_clean() -> str:
    return (TELEGRAM_BOT_USERNAME or "").replace("@", "").strip().lower()


def _is_bot_mentioned(text: str, entities: list = None, bot_username: str = "") -> bool:
    """Kiểm tra message có tag/mention bot không."""
    if not bot_username:
        return True
    text_lower = (text or "").lower()
    if bot_username.lower() in text_lower:
        return True
    # Kiểm tra qua entities (mention)
    if entities:
        for e in entities:
            if e.get("type") in ("mention", "text_mention"):
                # text mention offset/length
                offset = e.get("offset", 0)
                length = e.get("length", 0)
                mentioned = text[offset:offset + length].replace("@", "").lower()
                if mentioned == bot_username.lower():
                    return True
    return False


def _extract_chat_info(chat: dict) -> tuple:
    """Trả về (group_id, title, chat_type)."""
    chat_id = str(chat.get("id", ""))
    title = chat.get("title") or chat.get("username") or chat.get("first_name") or "Unknown"
    chat_type = chat.get("type", "private")
    return chat_id, title, chat_type


def _extract_user_info(from_user: dict) -> tuple:
    """Trả về (user_id, username, full_name)."""
    if not from_user:
        return None, None, None
    user_id = str(from_user.get("id", ""))
    username = from_user.get("username")
    first = from_user.get("first_name") or ""
    last = from_user.get("last_name") or ""
    full_name = f"{first} {last}".strip() or username or user_id
    return user_id, username, full_name


def _parse_message_date(message: dict) -> str:
    """Parse unix timestamp sang ISO-8601."""
    ts = message.get("date")
    if ts:
        return datetime.fromtimestamp(ts, tz=timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")
    return datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S")


async def _get_telegram_file_path(file_id: str) -> Optional[str]:
    """Gọi Telegram API để lấy file_path."""
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile"
    async with httpx.AsyncClient() as client:
        resp = await client.get(url, params={"file_id": file_id}, timeout=10.0)
        data = resp.json()
        if data.get("ok"):
            return data["result"].get("file_path")
    return None


def _extract_files_from_message(message: dict) -> List[Dict]:
    """
    Trích xuất danh sách file đính kèm từ message Telegram.
    Trả về list of dicts: {file_id, file_type, mime_type}
    """
    files = []

    # Photo (ảnh) - lấy ảnh chất lượng cao nhất
    if message.get("photo"):
        photo_list = message["photo"]
        best = max(photo_list, key=lambda p: p.get("file_size", 0))
        files.append({"file_id": best["file_id"], "file_type": "photo", "mime_type": "image/jpeg"})

    # Document
    if message.get("document"):
        doc = message["document"]
        files.append({
            "file_id": doc["file_id"],
            "file_type": "document",
            "mime_type": doc.get("mime_type", "application/octet-stream"),
            "file_name": doc.get("file_name"),
        })

    # Audio
    if message.get("audio"):
        a = message["audio"]
        files.append({"file_id": a["file_id"], "file_type": "audio", "mime_type": a.get("mime_type", "audio/mpeg")})

    # Voice note
    if message.get("voice"):
        v = message["voice"]
        files.append({"file_id": v["file_id"], "file_type": "voice", "mime_type": v.get("mime_type", "audio/ogg")})

    # Video
    if message.get("video"):
        vid = message["video"]
        files.append({"file_id": vid["file_id"], "file_type": "video", "mime_type": vid.get("mime_type", "video/mp4")})

    # Sticker (bỏ qua, không xử lý)

    return files


def _extract_urls_from_message(message: dict) -> List[str]:
    """Trích xuất tất cả URL từ text và caption."""
    text = message.get("text") or message.get("caption") or ""
    urls = URL_PATTERN.findall(text)
    # Cũng kiểm tra entities kiểu url/text_link
    entities = message.get("entities") or message.get("caption_entities") or []
    for e in entities:
        if e.get("type") == "text_link":
            url = e.get("url")
            if url:
                urls.append(url)
    return list(set(urls))


# ─── Xử lý message ────────────────────────────────────────────────────────────

async def process_telegram_update(update: dict):
    """Xử lý một Telegram update và lưu vào DB."""
    # Hỗ trợ: message, edited_message, channel_post, my_chat_member
    message = (
        update.get("message")
        or update.get("edited_message")
        or update.get("channel_post")
    )

    # Xử lý sự kiện bot được add vào nhóm / bị kick
    my_chat_member = update.get("my_chat_member")
    if my_chat_member:
        await _handle_my_chat_member(my_chat_member)
        return

    if not message:
        return

    # ── Thông tin chat ──
    chat = message.get("chat", {})
    if not chat:
        return

    group_id, title, chat_type = _extract_chat_info(chat)

    # ── Upsert group_chat ──
    db.upsert_group_chat(group_id, title, chat_type)

    # ── Thông tin người gửi ──
    from_user = message.get("from") or {}
    user_id, username, full_name = _extract_user_info(from_user)

    # Bỏ qua message từ chính bot
    bot_clean = _bot_username_clean()
    if bot_clean and username and username.lower() == bot_clean:
        return

    # ── Nội dung text ──
    text = message.get("text") or message.get("caption") or ""
    message_id = message.get("message_id")
    created_at = _parse_message_date(message)

    # ── reply_to_message_id ──
    reply_to = message.get("reply_to_message")
    reply_to_message_id = reply_to.get("message_id") if reply_to else None

    # ── Phát hiện bot có được tag/mention không ──
    entities = message.get("entities") or message.get("caption_entities") or []
    is_mentioned = _is_bot_mentioned(text, entities, bot_clean)

    # Nếu người dùng quote/reply lại tin nhắn của bot → coi như mention bot
    if reply_to:
        reply_from = reply_to.get("from") or {}
        r_user = reply_from.get("username", "").replace("@", "").strip().lower()
        if bot_clean and r_user == bot_clean:
            is_mentioned = True

    # Chat private 1-1 luôn coi là được mention
    if chat_type == "private":
        is_mentioned = True
    # chat_id dương = private
    try:
        if int(group_id) > 0:
            is_mentioned = True
    except (ValueError, TypeError):
        pass


    # is_chatbot_reply: 0 = không cần reply, 1 = cần reply
    if REPLY_ON_TAG_BOT_USERNAME:
        is_chatbot_reply = 1 if is_mentioned else 0
    else:
        is_chatbot_reply = 1  # Luôn reply nếu không cần tag

    # ── Lưu message vào DB ──
    raw_json = json.dumps(update, ensure_ascii=False)
    msg_db_id = db.insert_message(
        group_id=group_id,
        message_id=message_id,
        from_user_id=user_id,
        from_username=username,
        from_full_name=full_name,
        text=text,
        created_at=created_at,
        is_chatbot_reply=is_chatbot_reply,
        reply_to_message_id=reply_to_message_id,
        raw_json=raw_json,
    )

    if msg_db_id is None:
        # Message đã tồn tại (duplicate webhook), bỏ qua
        return

    # ── Xử lý file đính kèm ──
    files = _extract_files_from_message(message)
    for f in files:
        db.insert_file(
            message_id_fk=msg_db_id,
            group_id=group_id,
            file_id=f["file_id"],
            file_type=f["file_type"],
        )

    # ── Xử lý URL trong message ──
    urls = _extract_urls_from_message(message)
    for url in urls:
        db.insert_file(
            message_id_fk=msg_db_id,
            group_id=group_id,
            file_id=None,
            file_type="url",
            url=url,
        )

    # Nếu message không có file và không có URL → đánh dấu processed luôn
    if not files and not urls:
        db.update_message_processed(msg_db_id)

    print(f"[Webhook] Saved msg#{message_id} from @{username} in group {group_id} | is_chatbot_reply={is_chatbot_reply}")


async def _handle_my_chat_member(my_chat_member: dict):
    """Xử lý khi bot được add vào nhóm hoặc bị kick."""
    chat = my_chat_member.get("chat", {})
    if not chat:
        return
    group_id, title, chat_type = _extract_chat_info(chat)
    new_status = my_chat_member.get("new_chat_member", {}).get("status", "")

    if new_status in ("member", "administrator"):
        db.upsert_group_chat(group_id, title, chat_type)
        print(f"[Webhook] Bot added to group {group_id} ({title})")
    elif new_status in ("kicked", "left"):
        db.set_group_active(group_id, 0)
        print(f"[Webhook] Bot removed from group {group_id}")


# ─── FastAPI Endpoints ────────────────────────────────────────────────────────

@app.get("/")
@app.get("/health")
async def health():
    return {"status": "ok", "service": "myassitant-webhook"}


@app.post("/webhook")
async def telegram_webhook(request: Request):
    """Nhận Telegram update qua webhook."""
    try:
        update = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON")

    # Xử lý bất đồng bộ để không block response 200 OK cho Telegram
    asyncio.create_task(process_telegram_update(update))
    return {"ok": True}


@app.get("/groups")
async def list_groups():
    """API debug: Liệt kê tất cả nhóm đang active."""
    return db.get_all_active_groups()
