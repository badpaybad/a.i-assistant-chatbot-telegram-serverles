"""
myassitant/file_worker.py
Worker thread xử lý bất đồng bộ:
  1. Download file từ Telegram → lưu vào myassitant/files/<group_id>/
  2. Dùng gemma4/files.py đọc nội dung file (PDF, DOCX, txt, ảnh, audio...)
  3. Gọi local Gemma4 API để tóm tắt nội dung
  4. Crawl URL nếu message có link
  5. Cập nhật file_of_message.description
  6. Update message_of_group.is_processed = 1 khi xong tất cả file của message đó
"""
import os
import sys
import re
import json
import time
import mimetypes
import threading
import httpx
import asyncio
from typing import Optional

_DIR = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.dirname(_DIR)
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

from myassitant import db
from myassitant.config import (
    TELEGRAM_BOT_TOKEN,
    GEMMA4_LOCAL_URL,
    GEMMA4_GENERATE_URL,
    DIR_FILES,
)

# Max ký tự đưa vào Gemma4 để tóm tắt
MAX_CONTENT_CHARS = 8000


# ─── Download file từ Telegram ────────────────────────────────────────────────

def _download_telegram_file(file_id: str, group_id: str, file_name: str = None) -> Optional[str]:  # type: ignore[return]
    """
    Download file từ Telegram API. Trả về local path hoặc None.
    """
    import requests  # dùng requests sync để đơn giản trong thread

    try:
        # Bước 1: Lấy file_path
        r = requests.get(
            f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile",
            params={"file_id": file_id}, timeout=10
        )
        data = r.json()
        if not data.get("ok"):
            print(f"[FileWorker] getFile failed for {file_id}: {data}")
            return None
        file_path = data["result"].get("file_path")
        if not file_path:
            return None

        # Bước 2: Download
        download_url = f"https://api.telegram.org/file/bot{TELEGRAM_BOT_TOKEN}/{file_path}"
        r2 = requests.get(download_url, timeout=60)
        r2.raise_for_status()

        # Xác định tên file
        if not file_name:
            file_name = os.path.basename(file_path)

        # Thư mục lưu: files/<group_id>/
        save_dir = os.path.join(DIR_FILES, str(group_id))
        os.makedirs(save_dir, exist_ok=True)
        local_path = os.path.join(save_dir, file_name)

        with open(local_path, "wb") as f:
            f.write(r2.content)

        print(f"[FileWorker] Downloaded {file_id} → {local_path}")
        return local_path

    except Exception as e:
        print(f"[FileWorker] Download error for {file_id}: {e}")
        return None


# ─── Crawl URL ────────────────────────────────────────────────────────────────

def _crawl_url(url: str) -> str:
    """Crawl nội dung URL, trả về text. Dùng httpx sync."""
    try:
        headers = {"User-Agent": "Mozilla/5.0 (compatible; myassitant-bot/1.0)"}
        with httpx.Client(timeout=15, headers=headers, follow_redirects=True) as client:
            resp = client.get(url)
            content_type = resp.headers.get("content-type", "")
            if "html" in content_type:
                # Basic HTML → text (xóa tags)
                text = re.sub(r"<[^>]+>", " ", resp.text)
                text = re.sub(r"\s+", " ", text).strip()
                return text[:MAX_CONTENT_CHARS]
            elif "json" in content_type:
                return resp.text[:MAX_CONTENT_CHARS]
            else:
                return resp.text[:MAX_CONTENT_CHARS]
    except Exception as e:
        return f"[Lỗi crawl URL {url}: {e}]"


# ─── Gọi Gemma4 để tóm tắt ────────────────────────────────────────────────────

def _summarize_with_gemma4(content: str, context: str = "file") -> str:
    """
    Gọi local Gemma4 API để tóm tắt nội dung.
    Trả về chuỗi tóm tắt hoặc chuỗi lỗi.
    """
    if not content or not content.strip():
        return ""

    prompt = (
        f"Hãy tóm tắt ngắn gọn nội dung sau đây (trong ngữ cảnh là {context} trong tin nhắn Telegram). "
        f"Chỉ trả về phần tóm tắt, không giải thích thêm:\n\n{content[:MAX_CONTENT_CHARS]}"
    )

    request_body = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.3, "maxOutputTokens": 512},
    }

    try:
        with httpx.Client(timeout=60) as client:
            resp = client.post(GEMMA4_GENERATE_URL, json=request_body)
            resp.raise_for_status()
            data = resp.json()
            candidates = data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                text = " ".join(p.get("text", "") for p in parts if p.get("text"))
                return text.strip()
    except Exception as e:
        print(f"[FileWorker] Gemma4 summarize error: {e}")

    return ""


def _read_file_content_local(file_path: str) -> str:
    """Đọc nội dung file dùng gemma4/files.py."""
    try:
        from gemma4.files import read_file_content
        return read_file_content(file_path)
    except Exception as e:
        return f"[Lỗi đọc file: {e}]"


def _transcribe_audio_local(file_path: str) -> str:
    """Transcribe audio dùng gemma4/stt.py."""
    try:
        from gemma4.stt import transcribe_audio
        return transcribe_audio(file_path)
    except Exception as e:
        return f"[Lỗi transcribe audio: {e}]"


# ─── Xử lý một file record ────────────────────────────────────────────────────

def _process_file_record(file_record: dict):
    """
    Xử lý một bản ghi file_of_message:
    - Download (nếu có file_id)
    - Đọc nội dung / crawl URL
    - Tóm tắt bằng Gemma4
    - Cập nhật DB
    """
    file_db_id = file_record["id"]
    group_id = file_record["group_id"]
    file_id = file_record.get("file_id")
    file_type = file_record.get("file_type", "document")
    url = file_record.get("url")

    local_path = file_record.get("local_path")
    description = ""

    if file_type == "url" and url:
        # Crawl URL
        print(f"[FileWorker] Crawling URL: {url}")
        content = _crawl_url(url)
        description = _summarize_with_gemma4(content, context=f"đường link {url}")
        db.update_file_description(file_db_id, None, description or content[:500])

    elif file_id:
        # Download file nếu chưa có local_path
        if not local_path or not os.path.exists(local_path):
            ext_map = {
                "photo": ".jpg",
                "audio": ".mp3",
                "voice": ".ogg",
                "video": ".mp4",
                "document": "",
            }
            ext = ext_map.get(file_type, "")
            file_name = f"{file_id}{ext}"
            local_path = _download_telegram_file(file_id, group_id, file_name)

        if not local_path:
            print(f"[FileWorker] Failed to download file_id={file_id}")
            db.update_file_description(file_db_id, None, "[Download thất bại]")
            return

        # Đọc nội dung dựa theo loại file
        ext = os.path.splitext(local_path)[1].lower()
        content = ""

        if file_type in ("voice",) or ext in (".ogg", ".mp3", ".wav", ".m4a", ".aac", ".flac", ".opus"):
            content = _transcribe_audio_local(local_path)
            description = content[:1000] if content else "[Không transcribe được audio]"
        elif file_type == "photo" or ext in (".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"):
            # Với ảnh: dùng Gemma4 vision (gọi qua API multimodal)
            description = _describe_image_via_api(local_path) or "[Ảnh không mô tả được]"
        elif ext in (".txt", ".pdf", ".docx", ".doc", ".pptx", ".ppt", ".xlsx", ".xls", ".csv", ".json"):
            content = _read_file_content_local(local_path)
            description = _summarize_with_gemma4(content, context=f"file {os.path.basename(local_path)}")
            if not description:
                description = content[:500]
        else:
            # Fallback: thử đọc như text
            try:
                with open(local_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read(MAX_CONTENT_CHARS)
                description = _summarize_with_gemma4(content, context="file text")
            except Exception:
                description = "[Không đọc được nội dung file]"

        db.update_file_description(file_db_id, local_path, description)
        print(f"[FileWorker] Processed file {local_path}: {description[:80]}...")


def _describe_image_via_api(image_path: str) -> str:
    """Gửi ảnh lên Gemma4 API để mô tả."""
    try:
        import base64
        with open(image_path, "rb") as f:
            img_data = base64.b64encode(f.read()).decode()
        mime_type, _ = mimetypes.guess_type(image_path)
        mime_type = mime_type or "image/jpeg"

        request_body = {
            "contents": [{
                "role": "user",
                "parts": [
                    {"inline_data": {"mime_type": mime_type, "data": img_data}},
                    {"text": "Mô tả ngắn gọn nội dung của ảnh này bằng tiếng Việt."}
                ]
            }],
            "generationConfig": {"temperature": 0.3, "maxOutputTokens": 256},
        }
        with httpx.Client(timeout=60) as client:
            resp = client.post(GEMMA4_GENERATE_URL, json=request_body)
            resp.raise_for_status()
            data = resp.json()
            parts = data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
            return " ".join(p.get("text", "") for p in parts if p.get("text")).strip()
    except Exception as e:
        return f"[Lỗi mô tả ảnh: {e}]"


# ─── Main worker loop ─────────────────────────────────────────────────────────


def run_file_worker(stop_event: threading.Event = None, sleep_sec: float = 3.0):
    """
    Worker chạy liên tục trong thread riêng.
    Poll DB lấy message chưa processed, xử lý file/url rồi đánh dấu processed.
    """
    print("[FileWorker] Started.")
    while True:
        if stop_event and stop_event.is_set():
            print("[FileWorker] Stopping.")
            break

        try:
            # Lấy các message chưa xử lý
            unprocessed = db.get_unprocessed_messages()

            for msg in unprocessed:
                msg_db_id = msg["id"]
                files = db.get_files_of_message(msg_db_id)

                all_done = True
                for file_rec in files:
                    # Chỉ xử lý nếu chưa có description
                    if file_rec.get("description") is None:
                        try:
                            _process_file_record(file_rec)
                        except Exception as e:
                            print(f"[FileWorker] Error processing file {file_rec['id']}: {e}")
                            all_done = False

                # Nếu không có file nào pending → đánh dấu processed
                if all_done:
                    db.update_message_processed(msg_db_id)

        except Exception as e:
            print(f"[FileWorker] Loop error: {e}")

        time.sleep(sleep_sec)
