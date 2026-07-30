"""
myassitant/agent_tools.py
Tool definitions và implementations cho AI Agent chatbot.

Tools:
  - search_google(query)          : Gemini API + Google Search
  - crawl_url(url)                : Crawl nội dung URL
  - read_file(file_path)          : Đọc nội dung file
  - db_save_note(...)             : Lưu ghi chú
  - db_search_notes(...)          : Tìm kiếm ghi chú
  - db_search_messages(...)       : Tìm trong lịch sử chat
  - db_set_reminder(...)          : Đặt nhắc nhở
  - db_delete_reminder(...)       : Xóa nhắc nhở
  - db_list_reminders(...)        : Xem danh sách nhắc nhở
"""
import os
import sys
import re
import json
import time
import subprocess
import mimetypes
import httpx
from typing import Optional, List, Dict, Any

from google import genai
from google.genai import types

_DIR = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.dirname(_DIR)
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

from myassitant import db
from myassitant.config import GEMINI_APIKEY, GEMINI_MODEL, GEMMA4_GENERATE_URL

MAX_CONTENT_CHARS = 6000
TEMP_DIR = os.path.join(_ROOT, "temp")
VENV_PYTHON = os.path.join(_ROOT, "venv", "bin", "python3")
if not os.path.exists(VENV_PYTHON):
    VENV_PYTHON = sys.executable


def map_mime_type(mime_type: Optional[str]) -> str:
    """Ánh xạ mime_type không được Gemini hỗ trợ sang mime_type hợp lệ (như text/plain)."""
    if not mime_type:
        return "text/plain"
    unsupported_types = ["application/json", "application/javascript", "application/xml", "text/html", "text/css"]
    if any(t in mime_type.lower() for t in unsupported_types):
        return "text/plain"
    return mime_type


# ═══════════════════════════════════════════════════════════════════════════════
# Tool Definitions (JSON schema cho Gemma4 function calling)
# ═══════════════════════════════════════════════════════════════════════════════

TOOL_DEFINITIONS = [
    {
        "name": "search_google",
        "description": (
            "Tìm kiếm thông tin trên Google thông qua Gemini API. "
            "Dùng khi cần thông tin thời gian thực: tin tức, thời tiết, tỷ giá, "
            "sự kiện mới nhất, hoặc khi cần tìm kiếm/đối chiếu thông tin từ một file đính kèm. hoặc do người dùng chỉ định cần tìm trên google"
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Từ khóa hoặc câu hỏi cần tìm kiếm"},
                "file_path": {"type": "string", "description": "Đường dẫn file (ảnh, PDF, video, text...) nếu muốn đính kèm để tìm kiếm cùng từ khóa"}
            },
            "required": ["query"]
        }
    },
    {
        "name": "crawl_url",
        "description": (
            "Crawl và đọc nội dung từ một URL. "
            "Dùng khi người dùng yêu cầu đọc hoặc phân tích nội dung một trang web."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "url": {"type": "string", "description": "URL cần crawl nội dung"}
            },
            "required": ["url"]
        }
    },
    {
        "name": "read_file",
        "description": (
            "Đọc nội dung file đã được download (PDF, ảnh, audio, DOCX, TXT, JSON...). "
            "Dùng khi cần xử lý file người dùng đã gửi."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "file_path": {"type": "string", "description": "Đường dẫn tuyệt đối đến file cần đọc"}
            },
            "required": ["file_path"]
        }
    },
    {
        "name": "db_save_note",
        "description": (
            "Lưu ghi chú vào cơ sở dữ liệu theo yêu cầu của người dùng. "
            "Dùng khi người dùng muốn chatbot nhớ/ghi lại một thông tin nào đó."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "content": {"type": "string", "description": "Nội dung ghi chú cần lưu"},
                "tags": {"type": "string", "description": "Các tag phân loại, cách nhau bằng dấu phẩy (ví dụ: công việc,quan trọng)"}
            },
            "required": ["content"]
        }
    },
    {
        "name": "db_search_notes",
        "description": (
            "Tìm kiếm trong các ghi chú đã lưu trước đó. "
            "Dùng khi người dùng muốn tìm lại thông tin đã yêu cầu chatbot ghi nhớ."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Từ khóa tìm kiếm trong ghi chú"}
            },
            "required": ["query"]
        }
    },
    {
        "name": "db_search_messages",
        "description": (
            "Tìm kiếm trong lịch sử tin nhắn của nhóm chat. "
            "Dùng khi người dùng muốn tìm lại tin nhắn cũ theo từ khóa hoặc thời gian."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Từ khóa cần tìm trong lịch sử tin nhắn"},
                "from_date": {"type": "string", "description": "Ngày bắt đầu (YYYY-MM-DD), tùy chọn"},
                "to_date": {"type": "string", "description": "Ngày kết thúc (YYYY-MM-DD), tùy chọn"}
            },
            "required": ["query"]
        }
    },
    {
        "name": "db_set_reminder",
        "description": (
            "Đặt nhắc nhở tự động. "
            "Dùng khi người dùng muốn được nhắc nhở về điều gì đó vào một thời điểm cụ thể."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "message": {"type": "string", "description": "Nội dung nhắc nhở"},
                "remind_at": {"type": "string", "description": "Thời điểm nhắc nhở (ISO-8601 hoặc YYYY-MM-DD HH:MM)"}
            },
            "required": ["message", "remind_at"]
        }
    },
    {
        "name": "db_delete_reminder",
        "description": "Xóa một nhắc nhở theo ID.",
        "parameters": {
            "type": "object",
            "properties": {
                "reminder_id": {"type": "integer", "description": "ID của nhắc nhở cần xóa"}
            },
            "required": ["reminder_id"]
        }
    },
    {
        "name": "db_list_reminders",
        "description": "Xem danh sách tất cả các nhắc nhở đang hoạt động trong nhóm.",
        "parameters": {
            "type": "object",
            "properties": {}
        }
    },
    {
        "name": "execute_python_code",
        "description": (
            "Sinh và thực thi mã nguồn Python bằng local Gemma4 để giải quyết bài toán/yêu cầu. "
            "Tự động chạy trong venv, đọc kết quả console log (stdout/stderr) và tự sửa lỗi (tối đa 5 lần) đến khi thành công."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "requirement": {"type": "string", "description": "Mô tả chi tiết bài toán/yêu cầu cần viết và chạy code Python"},
                "code": {"type": "string", "description": "Mã nguồn Python ban đầu (tùy chọn)"}
            },
            "required": ["requirement"]
        }
    },
    {
        "name": "execute_bash_script",
        "description": (
            "Sinh và thực thi lệnh / script Bash Shell bằng local Gemma4 để xử lý công việc. "
            "Chạy trong thư mục temp (không quyền sudo), đọc console log và tự sửa lỗi (tối đa 5 lần) đến khi thành công."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "requirement": {"type": "string", "description": "Mô tả chi tiết tác vụ bash shell cần sinh và thực thi"},
                "script": {"type": "string", "description": "Script / lệnh bash shell ban đầu (tùy chọn)"}
            },
            "required": ["requirement"]
        }
    },
    {
        "name": "send_telegram_file",
        "description": (
            "Gửi một file (kèm lời nhắn/caption tùy chọn) tới nhóm Telegram hiện tại. "
            "Hỗ trợ tất cả loại file: văn bản (.txt), PDF (.pdf), Word (.docx), ảnh (.png, .jpg), "
            "âm thanh (.mp3, .ogg), JSON (.json), mã nguồn Python (.py), Bash script (.sh)... "
            "Nếu truyền content, tool sẽ tự động tạo/lưu nội dung đó thành file rồi gửi."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "file_path": {"type": "string", "description": "Đường dẫn file cần gửi (hoặc tên file muốn tạo và gửi)"},
                "caption": {"type": "string", "description": "Lời nhắn / mô tả đính kèm file khi gửi trên Telegram (tùy chọn)"},
                "content": {"type": "string", "description": "Nội dung văn bản/mã nguồn nếu muốn tạo file mới trước khi gửi (tùy chọn)"}
            },
            "required": ["file_path"]
        }
    },
]


# ═══════════════════════════════════════════════════════════════════════════════
# Tool Implementations
# ═══════════════════════════════════════════════════════════════════════════════

def search_google(query: str, file_path: Optional[str] = None) -> str:
    """Tìm kiếm qua Gemini API + Google Search (hỗ trợ gửi kèm file tương tự gemini_truyenkieu.py)."""
    try:
        client = genai.Client(api_key=GEMINI_APIKEY)
        user_parts = [types.Part.from_text(text=f"Tìm kiếm và trả lời ngắn gọn: {query}")]

        if file_path and os.path.exists(file_path):
            print(f"[AgentTools] Uploading file for Google Search: {file_path}")
            mime_type_guess, _ = mimetypes.guess_type(file_path)
            upload_mime_type = map_mime_type(mime_type_guess)

            uploaded_file = client.files.upload(
                file=file_path,
                config=types.UploadFileConfig(mime_type=upload_mime_type)
            )

            # Vòng lặp kiểm tra trạng thái file
            while True:
                file_info = client.files.get(name=uploaded_file.name)
                state = file_info.state.name
                if state == "ACTIVE":
                    print(f"[AgentTools] Uploaded file ready (ACTIVE): {uploaded_file.name}")
                    break
                elif state == "FAILED":
                    print(f"[AgentTools] Uploaded file state FAILED")
                    break
                time.sleep(2)

            if file_info.state.name == "ACTIVE":
                user_parts.append(
                    types.Part.from_uri(
                        file_uri=uploaded_file.uri,
                        mime_type=uploaded_file.mime_type
                    )
                )

        contents = [
            types.Content(
                role="user",
                parts=user_parts
            )
        ]

        google_search_tool = types.Tool(
            google_search=types.GoogleSearch()
        )

        dynamic_config = types.GenerateContentConfig(
            tools=[google_search_tool]
        )

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            config=dynamic_config,
            contents=contents
        )

        return response.text.strip() if response.text else "[Không tìm được kết quả]"

    except Exception as e:
        print(f"[AgentTools] Search google error: {e}")
        return f"[Lỗi tìm kiếm: {e}]"


def crawl_url(url: str) -> str:
    """Crawl và trích xuất văn bản từ URL bằng Playwright (hỗ trợ JS rendering) + BeautifulSoup, fallback httpx."""
    if not url or not str(url).strip():
        return "[Lỗi: URL không được để trống]"

    # Cách 1: Thử dùng Playwright (render JS)
    try:
        from playwright.sync_api import sync_playwright
        from bs4 import BeautifulSoup

        print(f"[AgentTools] Crawling với Playwright: {url}")
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
            page.goto(url, wait_until="domcontentloaded", timeout=25000)
            try:
                page.wait_for_load_state("networkidle", timeout=5000)
            except Exception:
                pass

            html_content = page.content()
            page_title = page.title()
            browser.close()

        soup = BeautifulSoup(html_content, "html.parser")
        for tag in soup(["script", "style", "noscript", "header", "footer", "nav", "svg", "iframe"]):
            tag.decompose()

        text = soup.get_text(separator="\n")
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        cleaned_text = "\n".join(lines)

        if cleaned_text:
            result = f"📌 Tiêu đề: {page_title}\n\n{cleaned_text}"
            return result[:MAX_CONTENT_CHARS]

    except Exception as e:
        print(f"[AgentTools] Playwright crawl error cho {url}: {e}, fallback sang httpx")

    # Cách 2: Fallback httpx (nếu Playwright lỗi)
    try:
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        with httpx.Client(timeout=15, headers=headers, follow_redirects=True) as client:
            resp = client.get(url)
            content_type = resp.headers.get("content-type", "")
            if "html" in content_type:
                text = re.sub(r"<[^>]+>", " ", resp.text)
                text = re.sub(r"\s+", " ", text).strip()
                return text[:MAX_CONTENT_CHARS]
            else:
                return resp.text[:MAX_CONTENT_CHARS]
    except Exception as e:
        return f"[Lỗi crawl {url}: {e}]"


def read_file(file_path: str) -> str:
    """Đọc nội dung file."""
    if not file_path or not str(file_path).strip():
        return "[Lỗi: file_path không được để trống hoặc rỗng]"
    try:
        # 1. Kiểm tra cache trong DB xem file đã được file_worker xử lý/tóm tắt chưa
        cached_desc = db.get_file_description_by_path(file_path)
        if cached_desc and cached_desc.strip():
            print(f"[AgentTools] Dùng nội dung cache đã tóm tắt sẵn cho: {file_path}")
            return cached_desc[:MAX_CONTENT_CHARS]

        # 2. Nếu chưa có cache, đọc nội dung file
        from gemma4.files import read_file_content
        content = read_file_content(file_path)
        return content[:MAX_CONTENT_CHARS]
    except Exception as e:
        return f"[Lỗi đọc file {file_path}: {e}]"


def db_save_note(group_id: str, user_id: Optional[str], content: str, tags: str = "") -> str:
    """Lưu ghi chú vào DB."""
    tag_list = [t.strip() for t in tags.split(",") if t.strip()] if tags else []
    note_id = db.save_note(group_id, user_id, content, tag_list)
    return f"✅ Đã lưu ghi chú #{note_id}: {content[:100]}"


def db_search_notes(group_id: str, query: str) -> str:
    """Tìm kiếm ghi chú."""
    results = db.search_notes(group_id, query)
    if not results:
        return f"Không tìm thấy ghi chú nào chứa '{query}'."
    lines = [f"📝 Tìm thấy {len(results)} ghi chú:"]
    for n in results:
        lines.append(f"  #{n['id']} [{n['created_at']}]: {n['content'][:100]}")
    return "\n".join(lines)


def db_search_messages(group_id: str, query: str, from_date: str = None, to_date: str = None) -> str:
    """Tìm kiếm trong lịch sử chat."""
    results = db.search_messages(group_id, query, from_date, to_date)
    if not results:
        return f"Không tìm thấy tin nhắn nào chứa '{query}'."
    lines = [f"🔍 Tìm thấy {len(results)} tin nhắn:"]
    for m in results:
        sender = m.get("from_full_name") or m.get("from_username") or "?"
        lines.append(f"  [{m['created_at']}] @{sender}: {(m.get('text') or '')[:100]}")
    return "\n".join(lines)


def db_set_reminder(group_id: str, user_id: Optional[str], username: Optional[str],
                    message: str, remind_at: str) -> str:
    """Đặt nhắc nhở."""
    try:
        # Chuẩn hóa remind_at
        from datetime import datetime
        # Thử nhiều format
        for fmt in ("%Y-%m-%dT%H:%M:%S", "%Y-%m-%d %H:%M", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d"):
            try:
                dt = datetime.strptime(remind_at.strip(), fmt)
                remind_at_iso = dt.strftime("%Y-%m-%dT%H:%M:%S")
                break
            except ValueError:
                continue
        else:
            return f"[Lỗi] Định dạng thời gian không hợp lệ: {remind_at}. Dùng YYYY-MM-DD HH:MM"

        rid = db.save_reminder(group_id, user_id, username, message, remind_at_iso)
        return f"⏰ Đã đặt nhắc nhở #{rid}: '{message}' vào lúc {remind_at_iso}"
    except Exception as e:
        return f"[Lỗi đặt reminder: {e}]"


def db_delete_reminder(reminder_id: int) -> str:
    """Xóa nhắc nhở."""
    db.delete_reminder(reminder_id)
    return f"🗑️ Đã xóa nhắc nhở #{reminder_id}."


def db_list_reminders(group_id: str, user_id: Optional[str] = None) -> str:
    """Liệt kê nhắc nhở."""
    results = db.list_reminders(group_id, user_id)
    if not results:
        return "Không có nhắc nhở nào đang hoạt động."
    lines = [f"⏰ Danh sách {len(results)} nhắc nhở:"]
    for r in results:
        lines.append(f"  #{r['id']} [{r['remind_at']}] @{r.get('username','?')}: {r['message'][:80]}")
    return "\n".join(lines)


# ═══════════════════════════════════════════════════════════════════════════════
# Code Execution Agents (Python & Bash Shell với local Gemma4 loop 5 lần)
# ═══════════════════════════════════════════════════════════════════════════════

def _call_local_gemma4_simple(user_prompt: str, system_prompt: str = "") -> str:
    """Gọi Gemma4 API local để suy nghĩ/sinh/sửa code."""
    payload = {
        "contents": [{"role": "user", "parts": [{"text": user_prompt}]}],
        "generationConfig": {"temperature": 0.2, "maxOutputTokens": 1024},
    }
    if system_prompt:
        payload["system_instruction"] = {"role": "system", "parts": [{"text": system_prompt}]}

    try:
        with httpx.Client(timeout=60) as client:
            resp = client.post(GEMMA4_GENERATE_URL, json=payload)
            resp.raise_for_status()
            data = resp.json()
            parts = data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
            return " ".join(p.get("text", "") for p in parts if p.get("text")).strip()
    except Exception as e:
        print(f"[AgentTools] Local Gemma4 call error: {e}")
        return ""


def _extract_clean_code(text: str, language: str = "python") -> str:
    """Trích xuất code sạch từ response markdown nếu có ```."""
    if not text:
        return ""
    pattern = rf"```(?:{language}|bash|sh)?\n?(.*?)```"
    match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
    if match:
        return match.group(1).strip()
    lines = text.split("\n")
    cleaned = [line for line in lines if not line.strip().startswith("```")]
    return "\n".join(cleaned).strip()


def execute_python_code(requirement: str, code: str = "") -> str:
    """
    Sinh và thực thi code Python dựa trên yêu cầu người dùng.
    Thực thi trong venv, đọc console log stdout/stderr.
    Nếu lỗi, tự động gọi local Gemma4 để suy nghĩ và sửa lỗi (tối đa 5 lần).
    """
    os.makedirs(TEMP_DIR, exist_ok=True)
    current_code = code.strip() if code else ""
    history_logs = []

    system_prompt = (
        "Bạn là chuyên gia lập trình Python. Nhiệm vụ của bạn là sinh mã nguồn Python hoàn chỉnh để giải quyết bài toán. "
        "CHỈ trả về duy nhất mã nguồn Python trong khối ```python ... ```, không kèm theo lời giải thích thừa."
    )

    for loop_i in range(1, 6):
        print(f"[CodeAgent:Python] Loop {loop_i}/5...")

        # Bước 1: Suy nghĩ sinh code mới hoặc sửa lỗi từ log trước
        if not current_code or loop_i > 1:
            if loop_i == 1:
                prompt = f"Hãy viết mã nguồn Python hoàn chỉnh để thực hiện yêu cầu sau:\n{requirement}"
            else:
                last_log = history_logs[-1]
                prompt = (
                    f"Mã nguồn Python trước đó gặp lỗi khi thực thi.\n"
                    f"Yêu cầu ban đầu: {requirement}\n\n"
                    f"Code cũ:\n```python\n{last_log['code']}\n```\n\n"
                    f"Lỗi / Output từ console:\n{last_log['error']}\n\n"
                    f"Hãy suy nghĩ, phân tích nguyên nhân lỗi và sửa lại mã nguồn Python hoàn chỉnh để chạy thành công."
                )
            generated = _call_local_gemma4_simple(prompt, system_prompt)
            current_code = _extract_clean_code(generated, "python")

        if not current_code:
            return f"[Lỗi: Không sinh được code Python cho yêu cầu: {requirement}]"

        # Bước 2: Thực thi code trong TEMP_DIR với VENV_PYTHON
        script_file = os.path.join(TEMP_DIR, f"temp_run_{loop_i}.py")
        try:
            with open(script_file, "w", encoding="utf-8") as f:
                f.write(current_code)

            process = subprocess.run(
                [VENV_PYTHON, script_file],
                cwd=TEMP_DIR,
                capture_output=True,
                text=True,
                timeout=60
            )

            stdout = process.stdout.strip()
            stderr = process.stderr.strip()
            returncode = process.returncode

            print(f"[CodeAgent:Python] Loop {loop_i} exit_code={returncode}")

            # Bước 3: Đọc kết quả từ console log / standard output
            if returncode == 0:
                result_msg = (
                    f"✅ Thực thi Python thành công (Vòng {loop_i}/5):\n"
                    f"--- CODE ---\n{current_code}\n\n"
                    f"--- KẾT QUẢ (STDOUT) ---\n{stdout if stdout else '(Không có output)'}"
                )
                return result_msg
            else:
                error_output = f"Return Code: {returncode}\nSTDERR:\n{stderr}\nSTDOUT:\n{stdout}"
                history_logs.append({"code": current_code, "error": error_output})
                current_code = ""

        except subprocess.TimeoutExpired:
            error_output = "Lỗi: Quá thời gian thực thi (Timeout 60s)"
            history_logs.append({"code": current_code, "error": error_output})
            current_code = ""
        except Exception as e:
            error_output = f"Lỗi thực thi: {e}"
            history_logs.append({"code": current_code, "error": error_output})
            current_code = ""

    last_err = history_logs[-1] if history_logs else {}
    return (
        f"❌ Đã thử 5 lần nhưng không thể thực thi thành công code Python.\n"
        f"--- CODE CUỐI CÙNG ---\n{last_err.get('code', '')}\n\n"
        f"--- LỖI CUỐI CÙNG ---\n{last_err.get('error', '')}"
    )


def execute_bash_script(requirement: str, script: str = "") -> str:
    """
    Sinh và thực thi script/lệnh Bash shell.
    Chạy trong folder /work/a.i-assistant-chatbot-telegram-serverles/temp, tuyệt đối không dùng sudo.
    Đọc console log, tự sửa lỗi tối đa 5 lần.
    """
    os.makedirs(TEMP_DIR, exist_ok=True)
    current_script = script.strip() if script else ""
    history_logs = []

    system_prompt = (
        "Bạn là chuyên gia Bash Shell. Nhiệm vụ của bạn là sinh lệnh / script bash shell để thực thi trên Linux. "
        "LƯU Ý QUAN TRỌNG: Không được sử dụng quyền sudo hoặc các lệnh yêu cầu root/mật khẩu. "
        "CHỈ trả về duy nhất script bash trong khối ```bash ... ```, không kèm theo lời giải thích thừa."
    )

    for loop_i in range(1, 6):
        print(f"[CodeAgent:Bash] Loop {loop_i}/5...")

        # Phân tích an toàn: Từ chối lệnh sudo
        if current_script and re.search(r"\bsudo\b", current_script):
            return "❌ Không cho phép thực thi lệnh yêu cầu quyền sudo!"

        # Bước 1: Suy nghĩ sinh script mới hoặc sửa lỗi
        if not current_script or loop_i > 1:
            if loop_i == 1:
                prompt = (
                    f"Hãy viết script Bash Shell để thực hiện yêu cầu sau "
                    f"(chạy trong thư mục làm việc, không dùng sudo):\n{requirement}"
                )
            else:
                last_log = history_logs[-1]
                prompt = (
                    f"Script Bash Shell trước đó gặp lỗi khi thực thi.\n"
                    f"Yêu cầu ban đầu: {requirement}\n\n"
                    f"Script cũ:\n```bash\n{last_log['script']}\n```\n\n"
                    f"Lỗi / Output từ console:\n{last_log['error']}\n\n"
                    f"Hãy suy nghĩ, phân tích nguyên nhân lỗi và sửa lại script Bash Shell (không dùng sudo) để chạy thành công."
                )
            generated = _call_local_gemma4_simple(prompt, system_prompt)
            current_script = _extract_clean_code(generated, "bash")

        if not current_script:
            return f"[Lỗi: Không sinh được script Bash cho yêu cầu: {requirement}]"

        if re.search(r"\bsudo\b", current_script):
            current_script = re.sub(r"\bsudo\b\s*", "", current_script)

        # Bước 2: Thực thi script trong TEMP_DIR
        script_file = os.path.join(TEMP_DIR, f"temp_run_{loop_i}.sh")
        try:
            with open(script_file, "w", encoding="utf-8") as f:
                f.write(current_script)

            os.chmod(script_file, 0o755)

            process = subprocess.run(
                ["/bin/bash", script_file],
                cwd=TEMP_DIR,
                capture_output=True,
                text=True,
                timeout=60
            )

            stdout = process.stdout.strip()
            stderr = process.stderr.strip()
            returncode = process.returncode

            print(f"[CodeAgent:Bash] Loop {loop_i} exit_code={returncode}")

            # Bước 3: Đọc kết quả từ console log / standard output
            if returncode == 0:
                result_msg = (
                    f"✅ Thực thi Bash Shell thành công (Vòng {loop_i}/5):\n"
                    f"--- SCRIPT ---\n{current_script}\n\n"
                    f"--- KẾT QUẢ (STDOUT) ---\n{stdout if stdout else '(Không có output)'}"
                )
                return result_msg
            else:
                error_output = f"Return Code: {returncode}\nSTDERR:\n{stderr}\nSTDOUT:\n{stdout}"
                history_logs.append({"script": current_script, "error": error_output})
                current_script = ""

        except subprocess.TimeoutExpired:
            error_output = "Lỗi: Quá thời gian thực thi (Timeout 60s)"
            history_logs.append({"script": current_script, "error": error_output})
            current_script = ""
        except Exception as e:
            error_output = f"Lỗi thực thi: {e}"
            history_logs.append({"script": current_script, "error": error_output})
            current_script = ""

    last_err = history_logs[-1] if history_logs else {}
    return (
        f"❌ Đã thử 5 lần nhưng không thể thực thi thành công script Bash.\n"
        f"--- SCRIPT CUỐI CÙNG ---\n{last_err.get('script', '')}\n\n"
        f"--- LỖI CUỐI CÙNG ---\n{last_err.get('error', '')}"
    )


def send_telegram_file(group_id: str, file_path: str, caption: str = "", content: Optional[str] = None) -> str:
    """
    Gửi file tới nhóm Telegram qua Telegram Bot API (sendDocument).
    Hỗ trợ tất cả loại file: text, pdf, image, audio, docx, json, code py, sh...
    Nếu content được cung cấp, tự động ghi ra file tại file_path trước khi gửi.
    """
    try:
        from myassitant.config import TELEGRAM_BOT_TOKEN
        if not TELEGRAM_BOT_TOKEN:
            return "[Lỗi: Chưa cấu hình TELEGRAM_BOT_TOKEN]"

        if not file_path or not str(file_path).strip():
            return "[Lỗi: file_path không được để trống]"

        target_path = file_path.strip()
        if not os.path.isabs(target_path):
            os.makedirs(TEMP_DIR, exist_ok=True)
            target_path = os.path.join(TEMP_DIR, os.path.basename(target_path))

        # Nếu truyền content, tạo/ghi file
        if content is not None and content.strip():
            os.makedirs(os.path.dirname(target_path), exist_ok=True)
            with open(target_path, "w", encoding="utf-8") as f:
                f.write(content)

        if not os.path.exists(target_path):
            return f"[Lỗi: Không tìm thấy file tại đường dẫn: {target_path}]"

        filename = os.path.basename(target_path)
        mime_type_guess, _ = mimetypes.guess_type(target_path)
        mime_type = mime_type_guess or "application/octet-stream"

        send_doc_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendDocument"

        data = {"chat_id": group_id}
        if caption and caption.strip():
            data["caption"] = caption[:1024]

        print(f"[AgentTools] Sending file '{filename}' ({mime_type}) to Telegram chat {group_id}...")

        with open(target_path, "rb") as f_stream:
            files = {
                "document": (filename, f_stream, mime_type)
            }
            with httpx.Client(timeout=60) as client:
                resp = client.post(send_doc_url, data=data, files=files)
                res_data = resp.json()
                if resp.status_code == 200 and res_data.get("ok"):
                    return f"✅ Đã gửi thành công file '{filename}' tới nhóm Telegram."
                else:
                    err_msg = res_data.get("description") or resp.text
                    return f"[Lỗi gửi file Telegram: {err_msg}]"

    except Exception as e:
        print(f"[AgentTools] send_telegram_file exception: {e}")
        return f"[Lỗi gửi file qua Telegram: {e}]"


# ═══════════════════════════════════════════════════════════════════════════════
# Tool Dispatcher
# ═══════════════════════════════════════════════════════════════════════════════

def execute_tool(
    tool_name: str,
    args: Dict[str, Any],
    group_id: str,
    user_id: Optional[str] = None,
    username: Optional[str] = None,
) -> str:
    """
    Thực thi tool theo tên. Trả về string kết quả.
    """
    print(f"[AgentTools] Executing tool: {tool_name} | args: {args}")

    try:
        if tool_name == "search_google":
            return search_google(args.get("query", ""), args.get("file_path"))

        elif tool_name == "crawl_url":
            return crawl_url(args.get("url", ""))

        elif tool_name == "read_file":
            return read_file(args.get("file_path", ""))

        elif tool_name == "db_save_note":
            return db_save_note(group_id, user_id, args.get("content", ""), args.get("tags", ""))

        elif tool_name == "db_search_notes":
            return db_search_notes(group_id, args.get("query", ""))

        elif tool_name == "db_search_messages":
            return db_search_messages(
                group_id,
                args.get("query", ""),
                args.get("from_date"),
                args.get("to_date"),
            )

        elif tool_name == "db_set_reminder":
            return db_set_reminder(
                group_id, user_id, username,
                args.get("message", ""),
                args.get("remind_at", ""),
            )

        elif tool_name == "db_delete_reminder":
            return db_delete_reminder(int(args.get("reminder_id", 0)))

        elif tool_name == "db_list_reminders":
            return db_list_reminders(group_id, user_id)

        elif tool_name == "execute_python_code":
            req = args.get("requirement") or args.get("code") or ""
            code = args.get("code") or ""
            return execute_python_code(requirement=req, code=code)

        elif tool_name == "execute_bash_script":
            req = args.get("requirement") or args.get("script") or ""
            script = args.get("script") or ""
            return execute_bash_script(requirement=req, script=script)

        elif tool_name == "send_telegram_file":
            return send_telegram_file(
                group_id=group_id,
                file_path=args.get("file_path", ""),
                caption=args.get("caption", ""),
                content=args.get("content")
            )

        else:
            return f"[Tool không tồn tại: {tool_name}]"

    except Exception as e:
        return f"[Lỗi thực thi tool {tool_name}: {e}]"
