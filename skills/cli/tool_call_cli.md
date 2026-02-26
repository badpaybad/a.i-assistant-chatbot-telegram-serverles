tôi cần prompt để sinh ra các lệnh bash shell trên linux , theo yêu cầu từ text người dùng đưa vào. tôi sẽ có tool call để thi hành lệnh bash shell được sinh ra

bạn tạo hoặc cập nhật file tool_call_cli.py

bên trong dùng google gemini api tham khảo gemini_truyenkieu.py

cần có prompt thật tốt để sinh ra các lệnh bash shell trên linux , theo yêu cầu từ: list_summary_chat, list_current_msg, curret_message, unique_urls

sau khi có response text từ gemini bạn parse và lấy ra các lệnh bash shell được sinh ra rồi thực hiện gọi lệnh.

kết quả gọi lệnh bạn trả về cho người dùng

nếu có lệnh nào đó cần dùng bạn hãy cố gắng cài dùng apt install, nếu không cài được bạn trả thông báo lên chat cho người dùng biết cần phải cài lên máy tính 

prompt cần cân nhắc thêm các nội dung :


                    Yêu cầu kỹ thuật:
                                        
                    1. **BẮT BUỘC**: Đặt toàn bộ các lệnh bash shell cần thực thi vào trong các khối mã Markdown (ví dụ: ```bash [lệnh ở đây] ```).
                    2. Giải thích ngắn gọn mục đích của các lệnh bên ngoài khối mã.
                    3. Chỉ sử dụng các lệnh an toàn. Tuyệt đối không chạy các lệnh nguy hiểm tới hệ thống và phá vỡ bảo mật (ví dụ: sudo rm -rf /).
                    4. Nếu yêu cầu không liên quan đến CLI hoặc không thể thực hiện qua bash shell, hãy trả lời bình thường.
                    5. Luôn trả lời bằng tiếng Việt.
                    6. Nếu một lệnh chạy quá 15 giây hoặc không thể dừng lại, hãy kill process đó, rồi thông báo rõ ràng cho người dùng biết họ cần cài đặt thủ công.
                    7. Không cho phép đọc nội dung file source code python, c# , java, typescript,php ... 
                    8. Không cho phép đọc nội dung file cấu hình vd .env appsettings.json ... các folder file hiden vd ở linux .git, .vscode, .idea, .swaksrc ...
                    9. **Bắt buộc** các lệnh sinh ra sẽ không cần sudo để chạy 
                    10. Nếu có gửi email thì dùng swaks và ~/.swaksrc
                    11. Các nội dung sinh ra để trả về hoặc gửi đi cho người dùng phải là tiếng việt unicode đầy đủ dấu câu



Ví dụ:

luôn có các import sau cho file tool_call_cli.py 


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

                    from config import HISTORY_CHAT_MAX_LEN,TELEGRAM_BOT_TOKEN, TELEGRAM_API_URL, PORT, TELEGRAM_BOT_CHATID, TELEGRAM_BOT_USERNAME, GEMINI_APIKEY,GEMINI_MODEL, DISCORD_PUBKEY, DISCORD_APPID, DISCORD_TOKEN,  TELEGRAM_API_ID, TELEGRAM_API_HASH, REPLY_ON_TAG_BOT_USERNAME

                    import bot_telegram
                    import bot_discord
                    import telegram_types

                    import knowledgebase
                    import skills.common_question_answer.main as common_question_answer
                    from knowledgebase.orchestrationbuildprompt import build_system_instruction
                    import knowledgebase.dbcontext
                    import knowledgebase.orchestrationcontext 