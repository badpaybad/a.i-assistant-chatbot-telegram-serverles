bạn tạo hoặc cập nhật file tool_call_jira.py để làm các việc sau

dựa vào curret_message, list_current_msg, list_summary_chat, unique_urls tạo prompt đẻ dùng gemini api để lấy thông tin phù hợp và sinh ra các lệnh tạo issue jira 

cần phân tích xu hướng của context chát (curret_message, list_current_msg, list_summary_chat, unique_urls) để quyết định có nên tạo issue jira hay không

JIRA_PERSONAL_ACCESS_TOKEN, JIRA_PROJECT_KEY, JIRA_SERVER_URL đã được khai báo trong import từ config.py 

khi tạo xong bạn cần gửi response về cho người dùng biết issue đã được tạo thành công và có link issue

tham khảo code về gọi cli và gửi response về cho người dùng ở skills/cli/main.py

dùng knowledgebase/dbcontext.py có db_jira để lưu trữ thông tin issue jira theo url issuse 

Cấu trúc để gửi request tạo issue jira tham khảo mẫu như sau 

                curl --request POST \
                --url JIRA_SERVER_URL \
                --header 'Authorization: Bearer JIRA_PERSONAL_ACCESS_TOKEN' \
                --header 'Content-Type: application/json' \
                --data '{
                        "fields": {
                            "project": {
                            "key": "KEY" 
                            },
                            "summary": "Lấy mô tả từ curret_message, list_current_msg, list_summary_chat, unique_urls.",
                            "issuetype": {
                            "name": "Task"
                            },
                            "duedate": "ngày deadline nếu có ", 
                            "description": {
                            "type": "doc",
                            "version": 1,
                            "content": [
                                {
                                "type": "paragraph",
                                "content": [
                                    {
                                    "type": "text",
                                    "text": "Lấy mô tả task từ curret_message, list_current_msg, list_summary_chat, unique_urls."
                                    }
                                ]
                                }
                            ]
                            }
                        }
                        }'


luôn có các import sau cho file .py 


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
                    import httpx
                    from urllib.parse import urlparse
                    import importlib.util
                    import sys
                    from google import genai
                    from google.genai import types

                    from config import HISTORY_CHAT_MAX_LEN,TELEGRAM_BOT_TOKEN, TELEGRAM_API_URL, PORT, TELEGRAM_BOT_CHATID, TELEGRAM_BOT_USERNAME, GEMINI_APIKEY,GEMINI_MODEL, DISCORD_PUBKEY, DISCORD_APPID, DISCORD_TOKEN,  TELEGRAM_API_ID, TELEGRAM_API_HASH, REPLY_ON_TAG_BOT_USERNAME, JIRA_PERSONAL_ACCESS_TOKEN, JIRA_PROJECT_KEY

                    import bot_telegram
                    import bot_discord
                    import telegram_types

                    import knowledgebase
                    import skills.common_question_answer.main as common_question_answer
                    from knowledgebase.orchestrationbuildprompt import build_system_instruction
                    import knowledgebase.dbcontext
                    import knowledgebase.orchestrationcontext 
                    