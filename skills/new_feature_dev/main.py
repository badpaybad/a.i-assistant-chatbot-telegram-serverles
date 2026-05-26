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
import mimetypes
from urllib.parse import urlparse
import importlib.util
import sys
from google import genai
from google.genai import types

from config import HISTORY_CHAT_MAX_LEN, TELEGRAM_BOT_TOKEN, TELEGRAM_API_URL, PORT, TELEGRAM_BOT_CHATID, TELEGRAM_BOT_USERNAME, GEMINI_APIKEY, GEMINI_MODEL, DISCORD_PUBKEY, DISCORD_APPID, DISCORD_TOKEN, TELEGRAM_API_ID, TELEGRAM_API_HASH, REPLY_ON_TAG_BOT_USERNAME

# Initialize Gemini client
clientGemini = genai.Client(api_key=GEMINI_APIKEY)

NEW_FEATURE_SYSTEM_INSTRUCTION = """
Bạn là một chuyên gia quản lý dự án và kiến trúc phần mềm. 
Nhiệm vụ của bạn là phân tích yêu cầu người dùng và xác định tên nghiệp vụ/tính năng mới (slug) cùng với mô tả tóm tắt.

Dữ liệu đầu vào:
- [Current Message]: Tin nhắn yêu cầu của người dùng.

Yêu cầu đầu ra (JSON ONLY):
{
  "feature_name_slug": "tên-nghiệp-vụ-viet-lien-khong-dau",
  "feature_title": "Tên nghiệp vụ có dấu",
  "summary": "Mô tả ngắn gọn nghiệp vụ"
}

Ví dụ:
Người dùng: "Tôi muốn làm tính năng quản lý đơn hàng"
Trả lời:
{
  "feature_name_slug": "quan-ly-don-hang",
  "feature_title": "Quản lý đơn hàng",
  "summary": "Hệ thống quản lý đơn hàng, bao gồm tạo, cập nhật và theo dõi trạng thái đơn hàng."
}
"""

PHATTRIEN_GENERATOR_INSTRUCTION = """
Bạn là một chuyên gia phát triển phần mềm Fullstack (C# Backend, React Frontend).
Nhiệm vụ của bạn là đọc yêu cầu người dùng và viết tài liệu giải pháp chi tiết vào file `howtodo.md`.

Tài liệu cần bao gồm:
1. Phân tích yêu cầu.
2. Thiết kế Database (Entity, Table).
3. Thiết kế API (Endpoint, Request/Response).
4. Thiết kế UI/UX (Các trang, components).
5. Kế hoạch triển khai chi tiết.

Sử dụng ngôn ngữ Tiếng Việt, trình bày chuyên nghiệp.
"""

def extract_json_from_text(text: str) -> dict:
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group())
        except:
            return None
    return None

async def exec(skill, curret_message, list_current_msg, list_summary_chat, unique_urls, contents_from_url):
    import bot_telegram
    import knowledgebase.orchestrationcontext

    user_text = curret_message.text
    chat_id = curret_message.chat_id

    # 1. Phân tích tên nghiệp vụ
    try:
        response = clientGemini.models.generate_content(
            model=GEMINI_MODEL,
            config=types.GenerateContentConfig(
                temperature=0.0,
                system_instruction=NEW_FEATURE_SYSTEM_INSTRUCTION
            ),
            contents=[types.Content(role="user", parts=[types.Part.from_text(text=user_text)])]
        )
        feature_info = extract_json_from_text(response.text)
        if not feature_info:
            await bot_telegram.send_telegram_message(chat_id, "Không thể xác định tên nghiệp vụ. Vui lòng thử lại với tên rõ ràng hơn.")
            return

        slug = feature_info["feature_name_slug"]
        title = feature_info["feature_title"]
        summary = feature_info["summary"]

        await bot_telegram.send_telegram_message(chat_id, f"Đang khởi tạo nghiệp vụ: **{title}** ({slug})...")

        # 2. Tạo thư mục và file tài liệu
        docs_path = f"TreeOfThought/docs/{slug}"
        os.makedirs(docs_path, exist_ok=True)
        
        yeucau_content = f"# Yêu cầu: {title}\n\n{summary}\n\n## Chi tiết yêu cầu từ người dùng:\n{user_text}"
        with open(f"{docs_path}/whattodo.md", "w", encoding="utf-8") as f:
            f.write(yeucau_content)

        # 3. Tạo howtodo.md dùng Gemini
        phattrien_response = clientGemini.models.generate_content(
            model=GEMINI_MODEL,
            config=types.GenerateContentConfig(
                temperature=0.7,
                system_instruction=PHATTRIEN_GENERATOR_INSTRUCTION
            ),
            contents=[types.Content(role="user", parts=[types.Part.from_text(text=yeucau_content)])]
        )
        with open(f"{docs_path}/howtodo.md", "w", encoding="utf-8") as f:
            f.write(phattrien_response.text)

        # 4. Tạo Backend Project
        be_path = f"TreeOfThought/backend/{slug}"
        os.makedirs(be_path, exist_ok=True)
        # Tạm thời tạo project console đơn giản, người dùng có thể đổi sau
        subprocess.run(["dotnet", "new", "classlib", "-n", slug, "-o", be_path], capture_output=True)

        # 5. Tạo Frontend Module
        fe_path = f"TreeOfThought/frontend/web/src/modules/{slug}"
        os.makedirs(fe_path, exist_ok=True)
        os.makedirs(f"{fe_path}/components", exist_ok=True)
        os.makedirs(f"{fe_path}/pages", exist_ok=True)
        os.makedirs(f"{fe_path}/services", exist_ok=True)
        os.makedirs(f"{fe_path}/types", exist_ok=True)

        # Tạo file index.tsx hoặc tương đương cho module
        with open(f"{fe_path}/pages/{slug.capitalize()}Page.tsx", "w", encoding="utf-8") as f:
            f.write(f"import React from 'react';\n\nconst {slug.capitalize()}Page: React.FC = () => {{\n  return <div>{title} Page</div>;\n}};\n\nexport default {slug.capitalize()}Page;")

        await bot_telegram.send_telegram_message(chat_id, f"✅ Đã khởi tạo xong nghiệp vụ **{title}**.\n- Docs: `{docs_path}`\n- Backend: `{be_path}`\n- Frontend: `{fe_path}`")

    except Exception as e:
        print(f"New Feature Dev Skill error: {e}")
        await bot_telegram.send_telegram_message(chat_id, f"❌ Lỗi khi tạo nghiệp vụ mới: {str(e)}")
