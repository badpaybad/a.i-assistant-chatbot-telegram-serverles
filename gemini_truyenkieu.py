from google import genai
from google.genai import types
import httpx
import re
import os
import uuid
from urllib.parse import urlparse


from config import GEMINI_APIKEY, GEMINI_MODEL

DOWNLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "downloads")
if not os.path.exists(DOWNLOAD_DIR):
    os.makedirs(DOWNLOAD_DIR)


# Định nghĩa phong cách của Nguyễn Du qua System Instruction
system_instruction = """
Bạn là một thi sĩ bậc thầy, mô phỏng phong cách sáng tác của Nguyễn Du trong Truyện Kiều. 
Nhiệm vụ của bạn là trả lời mọi câu hỏi của người dùng bằng thể thơ Lục Bát (câu 6 chữ, câu 8 chữ).

Yêu cầu về phong cách:
1. Ngôn ngữ: Sử dụng từ Hán Việt cổ, tao nhã (ví dụ: xuân huyên, tri kỷ, đoạn trường, phong trần).
2. Nội dung: Thấm đẫm triết lý nhân sinh, đôi khi có chút u buồn nhưng đầy lòng trắc ẩn.
3. Cấu trúc: Luôn tuân thủ đúng luật bằng trắc và hiệp vần của thơ lục bát.
   - Chữ thứ 6 của câu lục vần với chữ thứ 6 của câu bát.
   - Chữ thứ 8 của câu bát vần với chữ thứ 6 của câu lục tiếp theo.

Ví dụ: 
Người dùng hỏi: "Chào bạn, hôm nay bạn thế nào?"
Trả lời:
"Lòng này như nước chảy xuôi,
Gặp người tri kỷ, bồi hồi xiết bao.
Trời xanh mây trắng trên cao,
Chữ tâm kia mới thấm vào lòng nhau."
"""
# Khởi tạo client cấp thấp với API Key của bạn
clientGemini = genai.Client(api_key=GEMINI_APIKEY)


def get_stock_price(symbol: str):
    """Lấy giá cổ phiếu hiện tại của một công ty.

    Args:
        symbol: Mã chứng khoán của công ty (ví dụ: 'AAPL' cho Apple, 'VNM' cho Vinamilk).
    """
    # Trong thực tế, bạn sẽ gọi API chứng khoán ở đây
    print(f"--- Đang kiểm tra giá cho mã: {symbol} ---")
    return {"symbol": symbol, "price": 150.0, "currency": "USD"}

def fetch_url_content(url: str):
    """Lấy nội dung văn bản hoặc tải file từ một đường dẫn URL. 
    Nếu là văn bản (HTML, JSON, etc.), trả về nội dung văn bản.
    Nếu là file (Image, PDF, etc.), tải về và trả về đường dẫn file.

    Args:
        url: Đường dẫn URL đầy đủ cần xử lý.
    Returns:
        Một tuple chứa (nội dung hoặc đường dẫn file, mime_type).
    """
    print(f"--- Đang tải nội dung từ URL: {url} ---")
    try:
        with httpx.Client(timeout=15.0, follow_redirects=True) as clientSub:
            response = clientSub.get(url)
            response.raise_for_status()
            
            content_type = response.headers.get("Content-Type", "").lower()
            mime_type = content_type.split(";")[0].strip()

            # Kiểm tra nếu là text-based content
            text_types = ["text/", "application/json", "application/javascript", "application/xml"]
            is_text = any(t in mime_type for t in text_types)

            if is_text:
                html_content = response.text
                # Xử lý nội dung HTML để lấy văn bản thuần
                text_content = re.sub(r'<(script|style).*?</\1>', '', html_content, flags=re.DOTALL)
                text_content = re.sub(r'<[^>]+>', ' ', text_content)
                text_content = re.sub(r'\s+', ' ', text_content).strip()
                return text_content,mime_type, "text"
            else:
                # Tải file binary
                parsed_url = urlparse(url)
                filename = os.path.basename(parsed_url.path)
                if not filename:
                    filename = str(uuid.uuid4())
                
                # Tránh các ký tự lạ trong filename
                filename = re.sub(r'[^\w\.\-]', '_', filename)
                
                # Đảm bảo filename có extension nếu mime_type gợi ý
                if "." not in filename:
                    if "image/jpeg" in mime_type: filename += ".jpg"
                    elif "image/png" in mime_type: filename += ".png"
                    elif "application/pdf" in mime_type: filename += ".pdf"
                
                file_path = os.path.join(DOWNLOAD_DIR, f"{uuid.uuid4().hex[:8]}_{filename}")
                with open(file_path, "wb") as f:
                    f.write(response.content)
                
                print(f"--- Đã tải file về: {file_path} ---")
                return file_path,mime_type, "file"

    except Exception as e:
        print(f"Không thể lấy nội dung từ URL {url}. Lỗi: {str(e)}")
        return "", "text/plain","text"


# Khai báo công cụ Google Search
tools = [
    # Công cụ Google Search (grounding)
    # Tạm tắt vì không dùng chung được với Function Calling trong phiên bản này
    # types.Tool(
    #     google_search=types.GoogleSearch()
    # ),
    # Công cụ do người dùng định nghĩa (hàm Python)
    fetch_url_content
]

tools_google = [
    # Công cụ Google Search (grounding)
    # Tạm tắt vì không dùng chung được với Function Calling trong phiên bản này
    types.Tool(
        google_search=types.GoogleSearch()
    ),
    # Công cụ do người dùng định nghĩa (hàm Python)
    # fetch_url_content
]

# Cấu hình sinh nội dung
generation_config = types.GenerateContentConfig(
    temperature=0.7,  # Độ sáng tạo vừa phải để giữ đúng vần luật,
    system_instruction=system_instruction,
    tools=tools,
    # tool_config=types.ToolConfig(
    #     function_calling_config=types.FunctionCallingConfig(
    #         mode="AUTO"
    #     ),
    #     #
    #     # retrieval_config={
    #     #     "lat_lng": {"latitude": 21.0285, "longitude": 105.8542},  # Hà Nội
    #     #     "language_code": "vi"
    #     # }
    # ),

)


def chat_voi_cu_nguyen_du_memory(user_input, history: list = None,listPathFiles:list=None):
    if user_input is None or user_input == "":
        return ""
    if history is None:
        history = []

    # 1. Chuyển đổi lịch sử cũ sang định dạng Content của SDK
    full_contents = []
    for c in history:
        # Đảm bảo c["parts"] là list các string, ta lấy phần tử đầu tiên
        # Lưu ý: Code này giả định history chỉ chứa text. 
        text_content = c["parts"][0]

        # Tạo đối tượng Content đúng chuẩn
        full_contents.append(
            types.Content(
                role=c["role"],
                # Đúng cú pháp SDK mới
                parts=[types.Part.from_text(text=text_content)]
            )
        )

    # Thêm tin nhắn mới của người dùng
    user_parts = [types.Part.from_text(text=user_input)]

    # Xử lý file đính kèm nếu có
    if listPathFiles and len(listPathFiles) > 0:
        print(f"--- Đang upload {len(listPathFiles)} file lên Gemini... ---")
        for path in listPathFiles:
            try:
                # Upload file lên Gemini
                uploaded_file = clientGemini.files.upload(file=path)
                print(f"Đã upload file: {uploaded_file.uri}")
                
                # Thêm vào parts dưới dạng URI
                user_parts.append(
                    types.Part.from_uri(
                        file_uri=uploaded_file.uri,
                        mime_type=uploaded_file.mime_type
                    )
                )
            except Exception as e:
                print(f"Lỗi khi upload file '{path}': {e}")

    full_contents.append(
        types.Content(
            role="user",
            parts=user_parts
        )
    )
    
    # Xác định config dựa trên user_input
    if re.search(r'https?://\S+', user_input):
        dynamic_tools = [fetch_url_content]
    else:
        dynamic_tools = [types.Tool(google_search=types.GoogleSearch())]

    dynamic_config = types.GenerateContentConfig(
        temperature=0.7,
        system_instruction=system_instruction,
        tools=dynamic_tools,
    )

    # 2. Loop & Gọi API (Xử lý Function Calling)
    while True:
        print("--- Đang gọi Gemini API... ---")
        response = clientGemini.models.generate_content(
            model=GEMINI_MODEL,
            config=dynamic_config,
            contents=full_contents,
        )

        # Kiểm tra xem Gemini có muốn gọi tool không
        if response.function_calls:
            # Thêm phản hồi của model (chứa function call request) vào ngữ cảnh
            full_contents.append(response.candidates[0].content)

            # Danh sách parts chứa kết quả của TẤT CẢ các tool calls trong turn này
            tool_response_parts = []

            for call in response.function_calls:
                func_name = call.name
                func_args = call.args
                print(f"--- Gemini yêu cầu gọi hàm: {func_name} | Args: {func_args} ---")

                # Xử lý các hàm cụ thể
                api_result = {}
                if func_name == "fetch_url_content":
                    url = func_args.get("url")
                    if url:
                        content_or_path, mime_type ,type_content = fetch_url_content(url)
                        api_result = {
                            "content": content_or_path,
                            "type": mime_type,
                            "type_content": type_content
                        }
                    else:
                        api_result = {"error": "Missing URL parameter"}
                else:
                    api_result = {"error": f"Function {func_name} not found"}

                # Nếu kết quả là file, upload lên Gemini và thêm URI vào parts
                if api_result.get("type_content") == "file":
                    path = api_result["content"]
                    try:
                        uploaded_file = clientGemini.files.upload(file=path)
                        print(f"Agent tools call -> Đã upload file: {uploaded_file.uri}")
                        
                        tool_response_parts.append(
                            types.Part.from_uri(
                                file_uri=uploaded_file.uri,
                                mime_type=uploaded_file.mime_type
                            )
                        )
                    except Exception as e:
                        print(f"Lỗi khi upload file '{path}': {e}")
               
                # Thêm phản hồi thực thi tool
                tool_response_parts.append(
                    types.Part.from_function_response(
                        name=func_name,
                        response=api_result
                    )
                )

            if len(tool_response_parts)>0:
              # Thêm kết quả thực thi tool (tất cả các tool calls) vào ngữ cảnh một lần duy nhất
              full_contents.append(
                  types.Content(
                      role="tool",
                      parts=tool_response_parts
                  )
              )
            
            # Tiếp tục vòng lặp để gửi kết quả tool lại cho Gemini xử lý
            continue
        
        # Nếu không có function calls, tức là đã có câu trả lời cuối cùng
        bot_reply = response.text
        break

    # print(f"response: {response.text}")
    
    # # 4. Cập nhật lịch sử (để dùng cho lần gọi tiếp theo)
    # history.append({"role": "user", "parts": [user_input]})
    # history.append({"role": "model", "parts": [bot_reply]})
    print(f"bot_reply history length: {len(history)}")
    # print(bot_reply)
    return bot_reply, history


def chat_voi_cu_nguyen_du(user_input, history: list = None):

    return chat_voi_cu_nguyen_du_memory(user_input, [])

    # response = client.models.generate_content(
    #     model=GEMINI_MODEL,  # Hoặc gemini-1.5-flash
    #     config=types.GenerateContentConfig(
    #         tools=tools,
    #         system_instruction=system_instruction,
    #         temperature=0.7,  # Độ sáng tạo vừa phải để giữ đúng vần luật
    #     ),
    #     contents=[user_input]
    # )

    # bot_reply = response.text
    # # print(f"bot_reply: {len(history)}")
    # print(bot_reply)
    # return bot_reply, history
