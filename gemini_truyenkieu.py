from google import genai
from google.genai import types
import httpx
import re


from config import GEMINI_APIKEY, GEMINI_MODEL


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
    """Lấy nội dung văn bản chính từ một đường dẫn URL (trang web). Dùng công cụ này khi người dùng gửi một đường link và yêu cầu đọc, tóm tắt hoặc phân tích nội dung của link đó.

    Args:
        url: Đường dẫn URL đầy đủ của trang web cần lấy nội dung (ví dụ: https://example.com).
    """
    print(f"--- Đang tải nội dung từ URL: {url} ---")
    try:
        # Sử dụng httpx để lấy nội dung HTML
        # verify=False để bỏ qua lỗi SSL nếu có (tùy chọn, có thể bỏ nếu muốn bảo mật hơn)
        with httpx.Client(timeout=15.0, follow_redirects=True) as clientSub:
            response = clientSub.get(url)
            response.raise_for_status()
            html_content = response.text

        # Xử lý nội dung HTML để lấy văn bản thuần
        # 1. Loại bỏ script và style
        text_content = re.sub(r'<(script|style).*?</\1>', '', html_content, flags=re.DOTALL)
        # 2. Loại bỏ các thẻ HTML còn lại
        text_content = re.sub(r'<[^>]+>', ' ', text_content)
        # 3. Chuẩn hóa khoảng trắng (loại bỏ khoảng trắng thừa)
        text_content = re.sub(r'\s+', ' ', text_content).strip()

        # Giới hạn độ dài trả về để tránh quá tải token (ví dụ 10000 ký tự)
        return text_content[:20000] 

    except Exception as e:
        print( f"Không thể lấy nội dung từ URL {url}. Lỗi: {str(e)}")
        return ""


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

            for call in response.function_calls:
                func_name = call.name
                func_args = call.args
                print(f"--- Gemini yêu cầu gọi hàm: {func_name} | Args: {func_args} ---")

                # Xử lý các hàm cụ thể
                api_result = {}
                if func_name == "fetch_url_content":
                    url = func_args.get("url")
                    if url:
                        content = fetch_url_content(url)
                        api_result = {"content": content}
                    else:
                        api_result = {"error": "Missing URL parameter"}
                else:
                    api_result = {"error": f"Function {func_name} not found"}

                # Thêm kết quả thực thi tool vào ngữ cảnh
                full_contents.append(
                    types.Content(
                        role="tool",
                        parts=[
                            types.Part.from_function_response(
                                name=func_name,
                                response=api_result
                            )
                        ]
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
