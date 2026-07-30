"""
myassitant/config.py
Config riêng cho hệ thống myassitant group chatbot.
Import các biến chung từ config gốc của project.
"""
import os
import sys

# Thêm thư mục gốc vào path
_DIR_MYASSITANT = os.path.dirname(os.path.abspath(__file__))
_DIR_ROOT = os.path.dirname(_DIR_MYASSITANT)
if _DIR_ROOT not in sys.path:
    sys.path.insert(0, _DIR_ROOT)

# Import từ config gốc
try:
    from config import (
        TELEGRAM_BOT_TOKEN,
        TELEGRAM_BOT_USERNAME,
        TELEGRAM_API_URL,
        GEMINI_APIKEY,
        GEMINI_MODEL,
        GEMMA4_LOCAL_URL,
        REPLY_ON_TAG_BOT_USERNAME,
    )
except ImportError as e:
    print(f"[myassitant/config] Warning: {e}")
    TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
    TELEGRAM_BOT_USERNAME = os.getenv("TELEGRAM_BOT_USERNAME", "")
    TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}"
    GEMINI_APIKEY = os.getenv("GEMINI_APIKEY", "")
    GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    GEMMA4_LOCAL_URL = "http://localhost:8000"
    REPLY_ON_TAG_BOT_USERNAME = True

# ── Đường dẫn ──────────────────────────────────────────────────────────────
DIR_ROOT        = _DIR_ROOT
DIR_MYASSITANT  = _DIR_MYASSITANT
DIR_FILES       = os.path.join(DIR_MYASSITANT, "files")        # lưu file download từ Telegram
DB_PATH         = os.path.join(DIR_MYASSITANT, "myassitant.db")

# ── Server myassitant ───────────────────────────────────────────────────────
MYASSITANT_PORT = 8090          # FastAPI port riêng

# ── AI Agent ────────────────────────────────────────────────────────────────
HISTORY_CONTEXT_LIMIT   = 10   # Số message gần nhất để làm context
AGENT_MAX_LOOP          = 3    # Agentic loop tối đa
AGENT_SLEEP_INTERVAL    = 2    # Giây nghỉ giữa các vòng polling
REMINDER_CHECK_INTERVAL = 30   # Giây kiểm tra reminder

# ── Gemma4 Local API ────────────────────────────────────────────────────────
GEMMA4_GENERATE_URL = f"{GEMMA4_LOCAL_URL}/v1beta/models/gemma-4-e4b-it:generateContent"
GEMMA4_MODEL_NAME   = "gemma-4-e4b-it"

# ── System prompt chatbot ────────────────────────────────────────────────────
SYSTEM_PROMPT = """Bạn là trợ lý AI chuyên nghiệp hỗ trợ các cuộc trò chuyện nhóm trên nền tảng Telegram.

Nguyên tắc hoạt động:
- Chỉ trả lời khi được tag trực tiếp hoặc được gọi tên trong tin nhắn mới nhất.
- Luôn tag người dùng (@username) trong câu trả lời để họ nhận được thông báo.
- Đọc và hiểu ngữ cảnh từ lịch sử tin nhắn trước khi trả lời.
- Trung thực, không bịa đặt thông tin. Nếu không biết, hãy nói thẳng.
- Nếu người dùng yêu cầu tìm kiếm thông tin thời gian thực (tin tức, thời tiết, tỷ giá...), hãy dùng công cụ tìm kiếm.
- Suy nghĩ kỹ lưỡng và rà soát lại trước khi đưa ra câu trả lời cuối cùng.
- Trả lời bằng ngôn ngữ mà người dùng đang dùng (Tiếng Việt hoặc Tiếng Anh).
- Khi trả lời trong nhóm, hãy ngắn gọn, súc tích và đúng trọng tâm.
- Nếu message có file đính kèm (PDF, ảnh, audio...), tóm tắt nội dung file đó trước khi trả lời.
- Lịch sử chát chỉ mang tính tham khảo để hiểu ngữ cảnh để trả lời tin nhắn mới nhất (cần trả lời, hoặc tin nhắn được quote / reply và nếu có file theo tin nhắn thì dùng file đi theo , các file ở lịch sử trước đó dùng để tham khảo)
- Cần phân tích xem nếu cần dùng tool_calls để lấy thêm thông tin nếu cần
"""

# Đảm bảo thư mục files tồn tại
os.makedirs(DIR_FILES, exist_ok=True)
