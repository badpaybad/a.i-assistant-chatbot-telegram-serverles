from collections import defaultdict, deque
from nacl.exceptions import BadSignatureError
from nacl.signing import VerifyKey
from fastapi import FastAPI, Request, HTTPException
from fastapi import FastAPI, Request
from pydantic import BaseModel
import uvicorn
import subprocess
import re
import os
import json
import uuid
import time
from typing import Any
import httpx
import asyncio
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
import importlib.util
import sys

import skills.common_question_answer.main as common_question_answer

import knowledgebase.summarychat

summarychat= knowledgebase.summarychat.SummaryChat(batch_size=HISTORY_CHAT_MAX_LEN)

from knowledgebase.orchestrationbuildprompt import build_system_instruction

import knowledgebase.dbcontext

db_summary_chat = knowledgebase.dbcontext.db_summary_chat
# Khởi tạo client cấp thấp với API Key của bạn
clientGemini = genai.Client(api_key=GEMINI_APIKEY)

DIR_PROGRAM=os.path.dirname(os.path.abspath(__file__))
DIR_DOWNLOAD=f"{DIR_PROGRAM}/downloads"

def set_dir_program(dir_program):
    global DIR_PROGRAM, DIR_DOWNLOAD
    DIR_PROGRAM=dir_program
    DIR_DOWNLOAD=f"{DIR_PROGRAM}/downloads"

    print("DIR_PROGRAM", DIR_PROGRAM)
    print("DIR_DOWNLOAD", DIR_DOWNLOAD)

def extract_json_from_llm(response_text):
    # 1. Dùng Regex để tìm nội dung giữa ```json và ```
    # re.DOTALL giúp dấu . khớp với cả ký tự xuống dòng
    match = re.search(r'```json\s+(.*?)\s+```', response_text, re.DOTALL)
    
    if match:
        # Lấy nội dung group 1 và strip khoảng trắng thừa
        json_str = match.group(1).strip()
    else:
        # 2. Dự phòng: Nếu LLM không dùng code block, thử strip toàn bộ chuỗi
        # để tìm cặp ngoặc nhọn { ... }
        json_str = response_text.strip()
        # Loại bỏ các backticks lẻ nếu có
        json_str = json_str.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        print( f"Lỗi định dạng JSON: {e}")

        return None

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
                
                file_path = os.path.join(DIR_DOWNLOAD, f"{uuid.uuid4().hex[:8]}_{filename}")
                with open(file_path, "wb") as f:
                    f.write(response.content)
                
                print(f"fetch_url_content --- Đã tải file về: {file_path} ---")
                return file_path,mime_type, "file"

    except Exception as e:
        print(f"Không thể lấy nội dung từ URL {url}. Lỗi: {str(e)}")
        return "", "text/plain","text"

def get_summary_chat(chat_id:str):
    return db_summary_chat.search_json("chat_id", chat_id)[0:3]


async def do_decision(skill, curret_message, list_current_msg, list_summary_chat,unique_urls,contents_from_url):
    """_summary_

    Args:
        skill (_type_): {target_folder:"",reasoning:"",intent:"" }
        message (telegram_types.OrchestrationMessage): _description_
    """
    if skill == None or not skill:

        await common_question_answer.exec({"target_folder":"skills/common_question_answer","reasoning":"Không tìm thấy hoặc lỗi nên dùng mặc định","intent":""},curret_message, list_current_msg, list_summary_chat,unique_urls,contents_from_url)
        return 

    target_folder= skill["target_folder"]
    reasoning= skill["reasoning"]
    intent= skill["intent"]
    
    # ở các folder skills/... có file main.py trong đó luôn có hàm exec( curret_message, list_current_msg, list_summary_chat) bạn load động file main.py rồi invoke ham exec
    module_path = os.path.join(target_folder, "main.py")
    if os.path.exists(module_path):
        try:
            # Normalize target_folder and create a proper module name
            normalized_folder = target_folder.strip("/").strip("\\")
            skill_package = normalized_folder.replace("/", ".").replace("\\", ".")
            module_name = f"{skill_package}.main"

            try:
                # Try standard import first (works if skills is a package)
                skill_module = importlib.import_module(module_name)
                importlib.reload(skill_module)
            except Exception:
                # Fallback to loading from file if standard import fails
                spec = importlib.util.spec_from_file_location(module_name, module_path)
                skill_module = importlib.util.module_from_spec(spec)
                sys.modules[module_name] = skill_module
                spec.loader.exec_module(skill_module)
            
            if hasattr(skill_module, 'exec'):
                print(f"--- Đang thực thi skill: {target_folder} --- {module_name} ---")
                if asyncio.iscoroutinefunction(skill_module.exec):
                    await skill_module.exec(skill,curret_message, list_current_msg, list_summary_chat,unique_urls,contents_from_url)
                else:
                    skill_module.exec(skill,curret_message, list_current_msg, list_summary_chat,unique_urls,contents_from_url)
            else:
                print(f"Lỗi: Skill '{target_folder}' không có hàm 'exec'. mặc định dùng common_question_answer")
                await common_question_answer.exec(skill,curret_message, list_current_msg, list_summary_chat,unique_urls,contents_from_url)
        except Exception as e:
            print(f"Lỗi khi load hoặc thực thi skill '{target_folder}': {str(e)} mặc định dùng common_question_answer")
            await common_question_answer.exec(skill,curret_message, list_current_msg, list_summary_chat,unique_urls,contents_from_url)
    else:
        print(f"Lỗi: Không tìm thấy file {module_path} mặc định dùng common_question_answer")
        await common_question_answer.exec(skill,curret_message, list_current_msg, list_summary_chat,unique_urls,contents_from_url)


# system_instruction is now dynamically built in generation_config
system_instruction=build_system_instruction()
print("system_instruction ===============================",system_instruction)
# Khai báo công cụ Google Search, có thể khai báo thêm tool để query dùng dbvectorconnect.py để lấy thêm dữ liệu 
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
async def skills_decision(message: telegram_types.OrchestrationMessage):

    chat_id = message.chat_id
    if chat_id not in chat_buffers:
        chat_buffers[chat_id] = []
    
    chat_buffers[chat_id].append(message)

    list_current_msg=[]

    for msg in chat_buffers[chat_id]:
        list_current_msg.append(msg)

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
            summary_text += f"- {item["json"]['summary']}\n"
    
    # 2. Format Recent Messages (Long-term buffer)
    recent_text = "### [Recent Messages]\n"
    for msg in chat_buffers[chat_id]:
        # Giả sử message.text là nội dung
        recent_text += f"- {msg.text}\n"

    # 3. Combine Context
    context_block = f"{summary_text}\n{recent_text}\n### [Current Message]\n{message.text}"
    print("context_block ===============================",context_block)
    user_parts.append(types.Part.from_text(text=context_block))

    # context_block dùng regex để tìm danh sách url trong context_block, dùng fetch_url_content để download hoặc lấy nội dung text về ,, nếu là file thì add vào message.files 
    url_pattern = r'https?://[^\s<>"]+|www\.[^\s<>"]+'
    urls = re.findall(url_pattern, context_block)
    
    # Loại bỏ các URL trùng lặp (nếu có)
    unique_urls = list(set(urls))

    contents_from_url=[]
    
    if unique_urls:
        print(f"--- Đã tìm thấy {len(unique_urls)} URL trong ngữ cảnh ---")
        for url in unique_urls:
            content, mime_type, res_type = fetch_url_content(url)
            if res_type == "text" and content and content!="":
                # Nếu là text, thêm vào user_parts để làm ngữ cảnh
                context_url = f"\nContent from {url}:\n{content}\n"
                user_parts.append(types.Part.from_text(text=context_url))
                contents_from_url.append(context_url)
            elif res_type == "file" and content and content!="":
                # Nếu là file, thêm đường dẫn vào message.files để upload lên Gemini
                if not message.files:
                    message.files = []
                    message.files_type = []
                if content not in message.files:
                    message.files.append(content)
                    message.files_type.append(res_type) 
                    print(f"--- Đã thêm file từ URL vào danh sách tải lên: {content} ---")
                    

    print("context_block -> contents_from_url ===============================",len(contents_from_url),[ cfu[0:100] in contents_from_url])
    # # Xử lý file đính kèm nếu có
    # if message.files and len(message.files) > 0:
    #     print(f"--- Đang upload {len(message.files)} file lên Gemini... ---")
    #     for path in message.files:
    #         try:
    #             # Xác định mime_type của file cục bộ trước khi upload
    #             mime_type_guess, _ = mimetypes.guess_type(path)
    #             upload_mime_type = map_mime_type(mime_type_guess)
                
    #             print(f"--- Đang upload file: {path} với mime_type: {upload_mime_type} ---")
                
    #             # Upload file lên Gemini với mime_type đã được ép kiểu (nếu cần)
    #             uploaded_file = clientGemini.files.upload(file=path, config=types.UploadFileConfig(mime_type=upload_mime_type))
                
    #             print(f"Đã upload file: {uploaded_file.uri} {uploaded_file.mime_type}")

    #             # 2. Vòng lặp kiểm tra trạng thái (Check state)
    #             while True:
    #                 # Lấy lại thông tin file để cập nhật thuộc tính 'state'
    #                 file_info = clientGemini.files.get(name=uploaded_file.name)
                    
    #                 state = file_info.state.name # Trạng thái trả về: 'PROCESSING', 'ACTIVE', hoặc 'FAILED'
                    
    #                 if state == "ACTIVE":
    #                     print("File đã sẵn sàng!")
    #                     break
    #                 elif state == "FAILED":
    #                     raise Exception("Google không thể xử lý video này. Lỗi: FAILED")
                    
    #                 # Đợi một chút trước khi check lại để tránh spam API
    #                 print("Video đang được xử lý (PROCESSING)...")
    #                 time.sleep(3)
                
    #             # Thêm vào parts dưới dạng URI
    #             user_parts.append(
    #                 types.Part.from_uri(
    #                     file_uri=uploaded_file.uri,
    #                     mime_type=uploaded_file.mime_type
    #                 )
    #             )
    #         except Exception as e:
    #             print(f"Lỗi khi upload file '{path}': {e}")

    if len(chat_buffers[chat_id]) >= HISTORY_CHAT_MAX_LEN:
        chat_buffers[chat_id] = [] # Clear buffer for this chat

    full_contents.append(
        types.Content(
            role="user",
            parts=user_parts
        )
    )
    
    # 2. Loop & Gọi API (Xử lý Function Calling)
    while True:
        try:
            print("--- Orchestration Đang gọi Gemini API... ---")
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
            
            bot_reply= response.text
            print("skills_decision =>>>>>> ",bot_reply)
            skill_obj = extract_json_from_llm(bot_reply)
            await do_decision(skill_obj, message, list_current_msg, list_summary_chat,unique_urls,contents_from_url )
            break
        except Exception as e:
            print(f"Orchestration Lỗi khi gọi Gemini API: {e}")
            await do_decision(None, message, list_current_msg, list_summary_chat,unique_urls,contents_from_url )
            break

    return skill_obj, []

