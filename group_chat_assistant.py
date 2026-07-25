import re
import json
import requests
from typing import List, Dict, Optional

# ==========================================
# CẤU HÌNH HỆ THỐNG
# ==========================================
OLLAMA_ENDPOINT = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma2:9b"  # Hoặc qwen2.5:7b, gemma4... tùy mô hình GGUF bạn load
MAX_RETRIES = 2

# Giả lập Knowledge Base nội bộ (Có thể thay bằng RAG Vector DB)
KNOWLEDGE_BASE = """
- Quy trình deploy staging: Cần tạo PR trên branch 'staging', chờ CI pass và ít nhất 1 lead approve.
- Thông tin VPN: Server vpn.company.internal, cổng UDP 1194. Cần cấp quyền qua IT Support (anh Nam).
- Thời gian họp daily: 09:15 sáng mỗi ngày trên Google Meet.
"""

# ==========================================
# STEP 1: CONTEXT & HISTORY PRUNING (LỌC RÁC)
# ==========================================
def prune_group_messages(raw_messages: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """
    Lọc bỏ tin nhắn rác (ok, cám ơn, sticker, emoji) và nén hội thoại 
    để tiết kiệm context window cho mô hình 4-bit.
    """
    cleaned_messages = []
    # Danh sách các từ ngắn/rác thường thấy trong nhóm chat
    junk_patterns = re.compile(r'^(ok|okk|oke|cảm ơn|cam on|thanks|thx|tks|👍|❤️|😂|hihi|hehe|da|vung)$', re.IGNORECASE)

    for msg in raw_messages:
        text = msg.get("text", "").strip()
        
        # Bỏ qua tin nhắn quá ngắn hoặc nằm trong danh sách rác
        if not text or junk_patterns.match(text):
            continue
            
        cleaned_messages.append({
            "timestamp": msg.get("timestamp", ""),
            "sender": msg.get("sender", "Unknown"),
            "text": text
        })
    
    # Chỉ giữ lại tối đa 8-10 tin nhắn có giá trị gần nhất
    return cleaned_messages[-10:]


# ==========================================
# STEP 2 & 3: PROMPT ASSEMBLY (BUILD SYSTEM & USER PROMPT)
# ==========================================
def build_system_prompt() -> str:
    """System Prompt ngắn gọn, kỷ luật cao cho mô hình nhỏ."""
    return """Bạn là Trợ lý Công việc (Work Assistant) trong nhóm chat nội bộ.

[QUY TẮC BẮT BUỘC]
1. TRẢ LỜI NGẮN GỌN & ĐÚNG TRỌNG TÂM: Ưu tiên gạch đầu dòng (bullet points).
2. CHỈ DÙNG THÔNG TIN TRONG CONTEXT: Dựa vào <knowledge_base> và <group_context> được cung cấp.
3. KHÔNG BỊA ĐẶT / KHÔNG ẢO GIÁC: Nếu thông tin không có trong context, trả lời rõ: "Em chưa có thông tin về vấn đề này trong hệ thống."
4. XÁC ĐỊNH NGƯỜI DÙNG: Xung xưng phù hợp dựa trên <current_speaker>."""


def build_user_prompt(
    speaker_name: str, 
    speaker_role: str, 
    user_query: str, 
    cleaned_history: List[Dict[str, str]], 
    knowledge: str
) -> str:
    """Đóng gói ngữ cảnh vào cấu trúc thẻ XML chuẩn mực."""
    
    # Format lịch sử chat đã qua xử lý
    formatted_history = "\n".join([
        f"[{m['timestamp']}] {m['sender']}: {m['text']}" 
        for m in cleaned_history
    ])

    user_prompt = f"""<knowledge_base>
{knowledge.strip()}
</knowledge_base>

<group_context>
{formatted_history}
</group_context>

<current_speaker>
Tên: {speaker_name}
Vai trò: {speaker_role}
</current_speaker>

<instructions>
Dựa vào <knowledge_base> và <group_context> ở trên, hãy trả lời yêu cầu của người dùng trong thẻ <question>.
Nếu <group_context> mâu thuẫn với <knowledge_base>, ưu tiên dữ liệu trong <knowledge_base>.
</instructions>

<question>
{user_query}
</question>"""

    return user_prompt


# ==========================================
# STEP 4: INFERENCE & VALIDATION RETRY LOOP
# ==========================================
def call_llm(system_prompt: str, user_prompt: str, temperature: float = 0.1) -> str:
    """Gửi request tới Ollama / Local Engine với temperature thấp."""
    payload = {
        "model": MODEL_NAME,
        "prompt": f"<system>\n{system_prompt}\n</system>\n\n{user_prompt}",
        "stream": False,
        "options": {
            "temperature": temperature,
            "top_p": 0.9,
            "num_ctx": 4096  # Tối ưu KV Cache trên RTX 3060
        }
    }
    
    try:
        response = requests.post(OLLAMA_ENDPOINT, json=payload, timeout=30)
        response.raise_for_status()
        return response.json().get("response", "").strip()
    except Exception as e:
        return f"[Lỗi kết nối Local LLM: {str(e)}]"


def validate_and_correct_response(response_text: str) -> bool:
    """
    Kiểm tra sơ bộ đầu ra để phát hiện hallucination hoặc câu trả lời đi quá xa.
    Trả về True nếu hợp lệ, False nếu cần Retry.
    """
    # Nếu câu trả lời quá dài (vượt quá mức cần thiết cho nhóm chat)
    if len(response_text.split()) > 300:
        return False
        
    # Phát hiện các từ khóa nghi vấn bịa đặt / xin lỗi không cần thiết
    invalid_keywords = ["Tôi là mô hình ngôn ngữ lớn", "As an AI", "Tôi không thể truy cập internet"]
    for kw in invalid_keywords:
        if kw.lower() in response_text.lower():
            return False
            
    return True


def run_pipeline(
    speaker_name: str, 
    speaker_role: str, 
    user_query: str, 
    raw_chat_history: List[Dict[str, str]]
) -> str:
    """Vòng lặp điều phối chính (Orchestrator Loop)."""
    
    # Bước 1: Lọc rác
    cleaned_history = prune_group_messages(raw_chat_history)
    
    # Bước 2 & 3: Xây dựng Prompt
    system_p = build_system_prompt()
    user_p = build_user_prompt(speaker_name, speaker_role, user_query, cleaned_history, KNOWLEDGE_BASE)
    
    # Bước 4: Inference + Validation Retry Loop
    for attempt in range(MAX_RETRIES):
        response = call_llm(system_p, user_p, temperature=0.1)
        
        # Validate kết quả
        if validate_and_correct_response(response):
            return response
            
        # Nếu thất bại, Inject thêm thông báo yêu cầu sửa lỗi ở lượt thử tiếp theo
        user_p += f"\n\n[LƯU Ý LẦN THỬ {attempt + 1}]: Trả lời trước của bạn chưa đạt yêu cầu (quá dài hoặc không bám sát context). Hãy trả lời ngắn gọn hơn và chỉ dựa vào dữ liệu được cấp."

    return "Em chưa thể xử lý yêu cầu này lúc này. Anh/chị vui lòng thử lại câu hỏi cụ thể hơn nhé."


# ==========================================
# CHẠY THỬ NGHỆM (DEMO)
# ==========================================
if __name__ == "__main__":
    # 1. Giả lập tin nhắn thô từ Group Chat (Có lẫn rác)
    raw_group_history = [
        {"timestamp": "09:00", "sender": "Minh (Dev)", "text": "Mọi người ơi cho hỏi quy trình deploy staging thế nào nhỉ?"},
        {"timestamp": "09:01", "sender": "Nam (Lead)", "text": "ok"},
        {"timestamp": "09:02", "sender": "Hoa (Tester)", "text": "👍"},
        {"timestamp": "09:03", "sender": "Nam (Lead)", "text": "Tạo PR qua branch staging rồi bảo anh duyệt nhé."},
        {"timestamp": "09:05", "sender": "Minh (Dev)", "text": "cảm ơn anh"},
        {"timestamp": "09:10", "sender": "Lan (HR)", "text": "Lịch họp daily hôm nay vẫn 9h15 đúng ko mọi người?"},
        {"timestamp": "09:11", "sender": "Nam (Lead)", "text": "Đúng rồi em."}
    ]

    # 2. Người dùng tag Bot hỏi đáp
    current_user_name = "Minh (Dev)"
    current_user_role = "Software Engineer"
    query = "@Bot tóm tắt lại giúp mình quy trình deploy staging với?"

    print("--- ĐANG XỬ LÝ PIPELINE ---")
    final_output = run_pipeline(
        speaker_name=current_user_name,
        speaker_role=current_user_role,
        user_query=query,
        raw_chat_history=raw_group_history
    )
    
    print("\n--- KẾT QUẢ TRẢ LỜI CỦA BOT ---")
    print(final_output)