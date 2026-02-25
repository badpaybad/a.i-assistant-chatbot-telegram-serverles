from collections import defaultdict, deque
from nacl.exceptions import BadSignatureError
from nacl.signing import VerifyKey
from fastapi import FastAPI, Request, HTTPException
import subprocess
import re
import os
import uuid
import time
from typing import Any
from fastapi import FastAPI, Request
from pydantic import BaseModel
import httpx
import asyncio
import uvicorn
from contextlib import asynccontextmanager
from google import genai
from google.genai import types
from gemini_truyenkieu import chat_voi_cu_nguyen_du, chat_voi_cu_nguyen_du_memory

from config import HISTORY_CHAT_MAX_LEN,TELEGRAM_BOT_TOKEN, TELEGRAM_API_URL, PORT, TELEGRAM_BOT_CHATID, TELEGRAM_BOT_USERNAME, GEMINI_APIKEY,GEMINI_MODEL, DISCORD_PUBKEY, DISCORD_APPID, DISCORD_TOKEN,  TELEGRAM_API_ID, TELEGRAM_API_HASH, REPLY_ON_TAG_BOT_USERNAME

import bot_telegram
import bot_discord

import my_telethon
import telegram_types
import mimetypes
import httpx
from urllib.parse import urlparse

from summarychat import db_summary_chat
DOWNLOAD_DIR="downloads"
# Khởi tạo client cấp thấp với API Key của bạn
clientGemini = genai.Client(api_key=GEMINI_APIKEY)


def map_mime_type(mime_type: str) -> str:
    """Ánh xạ mime_type không được Gemini hỗ trợ sang mime_type hợp lệ (như text/plain)."""
    if not mime_type:
        return "text/plain"
    unsupported_types = ["application/json", "application/javascript", "application/xml", "text/html", "text/css"]
    if any(t in mime_type.lower() for t in unsupported_types):
        return "text/plain"
    return mime_type

def fetch_url_content(url: str):
    """Lấy nội dung văn bản hoặc tải file từ một đường dẫn URL. 
    Nếu là văn bản (HTML, JSON, etc.), trả về nội dung văn bản.
    Nếu là file (Image, PDF, etc.), tải về và trả về đường dẫn file.

    Args:
        url: Đường dẫn URL đầy đủ cần xử lý.
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

            if mime_type=="":
                mime_type="text/plain"

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
                
                print(f"fetch_url_content --- Đã tải file về: {file_path} ---")
                return file_path,mime_type, "file"

    except Exception as e:
        print(f"Không thể lấy nội dung từ URL {url}. Lỗi: {str(e)}")
        return "", "text/plain","text"

def get_summary_chat(chat_id:str):
    return db_summary_chat.search_json(chat_id, chat_id)

system_instruction="""
# ROLE
Bạn là Hệ điều hành Kỹ năng (Skill OS). Nhiệm vụ của bạn là điều phối yêu cầu của người dùng vào đúng Sub-folder chức năng trong thư mục `/skills`.

# SKILL INVENTORY
1. [Folder: /skills/cli]
   - Chức năng: Chạy các lệnh bash shell trên hệ điều hành Ubuntu.
2. [Folder: /skills/http]
   - Chức năng: Thực hiện các yêu cầu HTTP, fetch nội dung từ URL.
3. [Folder: /skills/common_question_answer]
   - Chức năng: Trả lời các câu hỏi thông thường, kiến thức chung khi không cần dùng skill chuyên biệt.

# CONTEXT GUIDELINES
Bạn sẽ được cung cấp:
- [Summarized History]: Tóm tắt các cuộc trò chuyện cũ để hiểu ngữ cảnh dài hạn.
- [Recent Messages]: 10 tin nhắn gần nhất trong phiên chat hiện tại.
- [Current Message]: Tin nhắn mới nhất của người dùng cần xử lý.

# DECISION LOGIC
1. Phân tích [Summarized History] và [Recent Messages] để hiểu luồng trò chuyện.
2. Phân tích [Current Message] để xác định ý định (Intent).
3. Nếu người dùng muốn thực thi lệnh hệ thống, bash script -> `skills/cli`.
4. Nếu người dùng muốn lấy dữ liệu từ website (URL) -> `skills/http`.
5. Mọi trường hợp khác hoặc hỏi đáp thông thường -> `skills/common_question_answer`.

# OUTPUT FORMAT (JSON ONLY)
Bạn PHẢI trả về JSON theo cấu trúc sau:
{
  "target_folder": "skills/...",
  "reasoning": "Giải thích ngắn gọn tại sao chọn folder này",
  "intent": "Mô tả ý định cốt lõi của người dùng"
}
"""

# Khai báo công cụ Google Search
google_search_tool = types.Tool(
    google_search=types.GoogleSearch()
)
# Cấu hình sinh nội dung
generation_config = types.GenerateContentConfig(
    temperature=0.7,  # Độ sáng tạo vừa phải để giữ đúng vần luật,
    system_instruction=system_instruction,
    tools= [google_search_tool],
    tool_config=types.ToolConfig(
        function_calling_config=types.FunctionCallingConfig(
            mode="AUTO"
        )
    )
)

chat_buffers = {} # dict: chat_id -> list of (update_obj, formatted_string)
def chat_with_knowledgebase(message: telegram_types.OrchestrationMessage):

    chat_id = message.chat_id
    if chat_id not in chat_buffers:
        chat_buffers[chat_id] = []
    
    chat_buffers[chat_id].append(message)

    list_summary_chat = get_summary_chat(chat_id)

    # 1. Chuyển đổi lịch sử cũ sang định dạng Content của SDK
    full_contents = []
    
    # Thêm tin nhắn mới của người dùng
    user_parts = []
    
    # 1. Format Summarized History
    summary_text = ""
    if list_summary_chat:
        summary_text = "### [Summarized History]\n"
        for item in list_summary_chat:
            summary_text += f"- {item.summary}\n"
    
    # 2. Format Recent Messages (Long-term buffer)
    recent_text = "### [Recent Messages]\n"
    for msg in chat_buffers[chat_id]:
        # Giả sử message.text là nội dung
        recent_text += f"- {msg.text}\n"

    # 3. Combine Context
    context_block = f"{summary_text}\n{recent_text}\n### [Current Message]\n{message.text}"
    user_parts.append(types.Part.from_text(text=context_block))
    
    if len(chat_buffers[chat_id]) >= HISTORY_CHAT_MAX_LEN:
        chat_buffers[chat_id] = [] # Clear buffer for this chat

    # Xử lý file đính kèm nếu có
    if message.files and len(message.files) > 0:
        print(f"--- Đang upload {len(message.files)} file lên Gemini... ---")
        for path in message.files:
            try:
                # Xác định mime_type của file cục bộ trước khi upload
                mime_type_guess, _ = mimetypes.guess_type(path)
                upload_mime_type = map_mime_type(mime_type_guess)
                
                print(f"--- Đang upload file: {path} với mime_type: {upload_mime_type} ---")
                
                # Upload file lên Gemini với mime_type đã được ép kiểu (nếu cần)
                uploaded_file = clientGemini.files.upload(file=path, config=types.UploadFileConfig(mime_type=upload_mime_type))
                
                print(f"Đã upload file: {uploaded_file.uri} {uploaded_file.mime_type}")
                
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
    
    # 2. Loop & Gọi API (Xử lý Function Calling)
    while True:
        print("--- Đang gọi Gemini API... ---")
        response = clientGemini.models.generate_content(
            model=GEMINI_MODEL,
            # config=dynamic_config,
            config=generation_config,
            contents=full_contents,
        )

        # In kết quả response để debug
        print(f"--- Gemini Response Candidates: {len(response.candidates)} ---")
        if response.candidates:
            print(f"--- Finish Reason: {response.candidates[0].finish_reason} ---")
            print(f"--- Content Parts: {len(response.candidates[0].content.parts)} ---")
            # print(response)

        bot_reply = response.text
        break

    return bot_reply, []

