Tạo hoặc cập nhật code cho skills/browser/zalo_surf.py

Dùng playwright để automation như sau

khởi playwright tạo profile với data cá nhân rồi lưu lại để lần tới dùng tiếp
lưu page, context global để dùng tiếp sau

khởi tạo mở trang web  https://id.zalo.me/account?continue=https%3A%2F%2Fchat.zalo.me%2F
đợi qr code hiện lên class .qr-container img
download qr về có thể là url hoặc base64

download xong thì gửi telegram cho người dùng với chat_id=TELEGRAM_OWNER_USERID và files là ảnh qr phía trên

kiểm tra tới khi nào trang web chuyển hướng về https://chat.zalo.me/

sau đó cần khởi tạo 1 queue action

tạo 1 vòng loop vô tận để lấy action từ queue action và thực hiện

tạo các hàm dạng phục vụ tool call cho LLM

mở nhóm có tên {tên nhóm} lúc này hàm dùng page để tìm selector theo tên nhóm và gọi click






file .py cần import phía dưới và thêm những import cần thiết

import asyncio
from playwright.async_api import async_playwright

from config import TELEGRAM_BOT_GROUP_CHATID,TELEGRAM_OWNER_USERID,TELEGRAM_OWNER_USERNAME,TELEGRAM_BOT_TOKEN, TELEGRAM_API_URL, PORT, TELEGRAM_BOT_CHATID, TELEGRAM_BOT_USERNAME, GEMINI_APIKEY, GEMINI_MODEL, DISCORD_PUBKEY, DISCORD_APPID, DISCORD_TOKEN,  TELEGRAM_API_ID, TELEGRAM_API_HASH, REPLY_ON_TAG_BOT_USERNAME,JIRA_PERSONAL_ACCESS_TOKEN,JIRA_SERVER_ISSUE_API,JIRA_PROJECT_KEY,JIRA_SERVER_WEBHOOK_API,SWAKSRC

import bot_telegram