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
import httpx
from typing import Optional, List, Dict, Any

_DIR = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.dirname(_DIR)
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

from myassitant import db
from myassitant.config import GEMINI_APIKEY, GEMINI_MODEL

MAX_CONTENT_CHARS = 6000

# ═══════════════════════════════════════════════════════════════════════════════
# Tool Definitions (JSON schema cho Gemma4 function calling)
# ═══════════════════════════════════════════════════════════════════════════════

TOOL_DEFINITIONS = [
    {
        "name": "search_google",
        "description": (
            "Tìm kiếm thông tin trên Google thông qua Gemini API. "
            "Dùng khi cần thông tin thời gian thực: tin tức, thời tiết, tỷ giá, "
            "sự kiện mới nhất hoặc khi người dùng yêu cầu tìm kiếm Google."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Từ khóa hoặc câu hỏi cần tìm kiếm"}
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
]


# ═══════════════════════════════════════════════════════════════════════════════
# Tool Implementations
# ═══════════════════════════════════════════════════════════════════════════════

def search_google(query: str) -> str:
    """Tìm kiếm qua Gemini API + Google Search."""
    try:
        # Dùng Google Generative AI với search grounding
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_APIKEY)

        model = genai.GenerativeModel(
            model_name=GEMINI_MODEL,
            tools=[{"google_search": {}}]
        )
        response = model.generate_content(
            f"Tìm kiếm và trả lời ngắn gọn: {query}",
        )
        return response.text.strip() if response.text else "[Không tìm được kết quả]"
    except Exception as e:
        # Fallback: dùng Gemini API không có search
        try:
            import google.generativeai as genai
            genai.configure(api_key=GEMINI_APIKEY)
            model = genai.GenerativeModel(model_name=GEMINI_MODEL)
            response = model.generate_content(f"Trả lời ngắn gọn câu hỏi sau (có thể bạn không có thông tin thời gian thực): {query}")
            return response.text.strip()
        except Exception as e2:
            return f"[Lỗi tìm kiếm: {e2}]"


def crawl_url(url: str) -> str:
    """Crawl nội dung URL."""
    try:
        headers = {"User-Agent": "Mozilla/5.0 (compatible; myassitant-bot/1.0)"}
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
            return search_google(args.get("query", ""))

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

        else:
            return f"[Tool không tồn tại: {tool_name}]"

    except Exception as e:
        return f"[Lỗi thực thi tool {tool_name}: {e}]"
