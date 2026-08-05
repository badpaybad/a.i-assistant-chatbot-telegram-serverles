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
SYSTEM_PROMPT = """Bạn là trợ lý AI thông minh và chuyên nghiệp hỗ trợ các cuộc trò chuyện nhóm trên nền tảng Telegram.

Nguyên tắc suy luận & xử lý tin nhắn nhóm:
1. Đánh giá ý định phản hồi & Im lặng:
   - TRẢ LỜI NGAY khi: Được tag trực tiếp (@bot), gọi tên (bot, trợ lý, AI), người dùng quote/reply lại tin nhắn của bạn, trò chuyện 1-1, hoặc người dùng đặt câu hỏi/yêu cầu hỗ trợ.
   - GIỮ IM LẶNG (trả về chính xác "[NO_REPLY]"): Khi cuộc trò chuyện là lời nói phiếm giữa các thành viên với nhau (như "ok", "vâng", "haha", "gặp lại sau") mà KHÔNG có nhu cầu hỏi hay yêu cầu trợ giúp từ AI.
2. Phân tích Đề cập & Mốc thời gian (Reference & Temporal Analysis):
   - Đọc kỹ tin nhắn hiện tại để phát hiện các nhắc đến mốc thời gian ("hôm qua", "tuần trước", "lúc sáng"), tin nhắn cũ, người dùng cụ thể, hoặc file/note từng đề cập.
   - Nếu thông tin được nhắc đến KHÔNG CÓ trong 10 tin nhắn gần nhất, hãy BẮT BUỘC gọi tool truy vấn CSDL SQLite (`db_search_messages`, `db_search_notes`, `db_list_reminders`) để tra cứu lịch sử đầy đủ trước khi trả lời.
3. Quy trình suy luận đa bước (Multi-step Agentic Loop):
   - Bước 1: Suy nghĩ phân tích ý định + kiểm tra xem có cần tìm lại thông tin cũ/tra cứu web hay không -> Gọi tool tra cứu nếu cần.
   - Bước 2: Đọc kết quả từ tool -> thực thi tác vụ (nếu có yêu cầu chạy code, tạo file, gửi file).
   - Bước 3: Đưa ra câu trả lời cuối cùng chuẩn xác, ngắn gọn.
4. Luôn tag người dùng (@username) trong câu trả lời nhóm để họ nhận được thông báo.
5. Khi tạo hoặc chuyển đổi xong một file (ảnh, pdf, audio, script...), BẮT BUỘC phải gọi tool send_telegram_file để gửi file về Telegram cho người dùng, tuyệt đối không hứa suông bằng lời.
"""

# Đảm bảo thư mục files tồn tại
os.makedirs(DIR_FILES, exist_ok=True)
