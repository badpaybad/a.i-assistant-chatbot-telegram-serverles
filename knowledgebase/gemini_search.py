import re
try:
    from google import genai
    from google.genai import types
except ImportError:
    genai = None
    types = None

import config

SEARCH_TOOL_DEF = {
    "name": "search_with_gemini",
    "description": (
        "Sử dụng công cụ Google Search để tra cứu thông tin thực tế, tin tức thời sự mới nhất, "
        "thời tiết, giá cả, kết quả thể thao, sự kiện hoặc kiến thức cần thông tin cập nhật từ Internet."
    ),
    "parameters": {
        "query": "string"
    }
}

def is_search_requested(text: str) -> bool:
    """
    Kiểm tra xem người dùng có yêu cầu tìm kiếm thông tin trên internet/web hay không (từ khóa nhanh).
    """
    if not text:
        return False
    search_keywords = [
        "tìm kiếm", "search", "tra cứu", "tin tức", "thời sự", "mới nhất", 
        "trên mạng", "trên google", "trên internet", "hôm nay", "thời tiết", 
        "giá vàng", "chứng khoán", "tỷ giá", "tin mới", "google"
    ]
    text_lower = text.lower()
    return any(kw in text_lower for kw in search_keywords)

def is_search_needed(current_text: str, history_context_text: str = "") -> bool:
    """
    Khai báo tool search_with_gemini và tự động đánh giá dựa vào context (20 message gần nhất) 
    và current message để xem có cần dùng Google Search hay không.
    """
    if not current_text and not history_context_text:
        return False
        
    # 1. Quick check qua các từ khóa kích hoạt tìm kiếm ở current message
    if is_search_requested(current_text):
        return True
        
    # 2. Phân tích ngữ cảnh kết hợp (history_context + current_text)
    combined_text = f"{history_context_text}\n{current_text}".lower()
    search_triggers = [
        "tìm kiếm", "search", "tra cứu", "tin tức", "thời sự", "mới nhất", 
        "trên mạng", "trên google", "trên internet", "thời tiết", "giá vàng", 
        "chứng khoán", "tỷ giá", "tin mới", "google", "hôm nay", "vừa xong",
        "mới đây", "cập nhật", "kết quả", "bóng đá", "tỷ số", "giá cả"
    ]
    
    question_words = ["ở đâu", "khi nào", "bao nhiêu", "ai là", "mới nhất", "hôm nay", "thế nào", "là gì", "như thế nào", "mấy giờ", "ngày nào"]
    is_question = any(qw in current_text.lower() for qw in question_words) or current_text.strip().endswith("?")
    
    if is_question and any(trigger in combined_text for trigger in search_triggers):
        print(f"[Gemini Search Evaluator] Combined context trigger matched for query: '{current_text[:40]}'")
        return True
        
    # 3. Phân tích sâu qua Gemini LLM Tool Decision dựa trên context (nếu có API KEY và là câu hỏi)
    try:
        api_key = getattr(config, "GEMINI_APIKEY", None)
        if genai and api_key and is_question and len(current_text.strip()) > 5:
            client = genai.Client(api_key=api_key)
            model_name = getattr(config, "GEMINI_MODEL", "gemini-2.5-flash")
            
            eval_prompt = (
                f"Bạn là bộ đánh giá Tool Call.\n"
                f"Khai báo Tool:\n"
                f"- Tên: {SEARCH_TOOL_DEF['name']}\n"
                f"- Mô tả: {SEARCH_TOOL_DEF['description']}\n\n"
                f"### Ngữ cảnh hội thoại (Context 20 tin nhắn gần nhất):\n{history_context_text[-1500:] if history_context_text else 'Không có'}\n\n"
                f"### Tin nhắn hiện tại (Current Message):\n{current_text}\n\n"
                f"Dựa trên Tin nhắn hiện tại và Ngữ cảnh hội thoại, người dùng có đang yêu cầu hoặc cần trợ lý sử dụng Google Search để tìm kiếm/tra cứu thông tin thực tế/thời sự mới nhất từ Internet hay không?\n"
                f"Trả lời DUY NHẤT một từ: 'YES' nếu cần sử dụng tool search, 'NO' nếu không cần."
            )
            
            resp = client.models.generate_content(
                model=model_name,
                contents=eval_prompt,
                config=types.GenerateContentConfig(temperature=0.0, max_output_tokens=10)
            )
            if resp and resp.text and "YES" in resp.text.strip().upper():
                print(f"[Gemini Search Evaluator] LLM Tool Decision: YES for query: '{current_text[:50]}'")
                return True
    except Exception as e:
        print(f"[Gemini Search Evaluator] Error during LLM evaluation: {e}")

    return False

def search_with_gemini(prompt_text: str, history_context_text: str = "", is_private_chat: bool = False) -> str:
    """
    Sử dụng Gemini API (gemini-2.5-flash) với công cụ Google Search grounding
    để tìm kiếm thông tin mới nhất trên internet và trả lời cho người dùng.
    (Tham chiếu theo mô hình gemini_truyenkieu.py)
    """
    try:
        api_key = getattr(config, "GEMINI_APIKEY", None)
        model_name = getattr(config, "GEMINI_MODEL", "gemini-2.5-flash")
        if not api_key:
            return "Lỗi: Chưa cấu hình GEMINI_APIKEY trong hệ thống."

        client = genai.Client(api_key=api_key)
        google_search_tool = types.Tool(google_search=types.GoogleSearch())

        chat_type_desc = "Trò chuyện cá nhân 1-1 (Private Chat)" if is_private_chat else "Nhóm chat Telegram (Group Chat)"
        
        system_instruction = (
            "Bạn là một trợ lý AI thông minh tích hợp công cụ Google Search để tìm kiếm thông tin thực tế trên Internet.\n"
            f"Loại hình trò chuyện hiện tại: {chat_type_desc}.\n\n"
            "Quy tắc khi trả lời:\n"
            "1. Sử dụng công cụ Google Search để tìm kiếm các thông tin thời sự, tin tức mới nhất, sự kiện, giá cả hoặc dữ liệu trên mạng.\n"
            "2. Tổng hợp kết quả tìm kiếm và trả lời chính xác, ngắn gọn, trung thực bằng tiếng Việt.\n"
            "3. Nếu là Trò chuyện cá nhân 1-1: Trả lời trực tiếp, tự nhiên, KHÔNG tag @username.\n"
            "4. Nếu là Nhóm chat: Phân tích ngữ cảnh để tag đúng @username của người cần trả lời khi cần."
        )

        full_contents = []
        if history_context_text:
            full_contents.append(f"### LỊCH SỬ CHAT VÀ NGỮ CẢNH:\n{history_context_text}\n\n")
        
        full_contents.append(f"### YÊU CẦU TÌM KIẾM CỦA NGƯỜI DÙNG:\n{prompt_text}")

        response = client.models.generate_content(
            model=model_name,
            contents="".join(full_contents),
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                tools=[google_search_tool],
                temperature=0.7
            )
        )

        if response and response.text:
            return response.text.strip()
        return "Không tìm thấy thông tin phù hợp trên internet."
    except Exception as e:
        print(f"[-] Error in search_with_gemini: {e}")
        return f"Lỗi khi tìm kiếm trên Internet với Gemini API: {str(e)}"
