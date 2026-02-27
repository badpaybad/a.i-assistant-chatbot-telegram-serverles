import requests
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

from config import HISTORY_CHAT_MAX_LEN,TELEGRAM_BOT_TOKEN, TELEGRAM_API_URL, PORT, TELEGRAM_BOT_CHATID, TELEGRAM_BOT_USERNAME, GEMINI_APIKEY,GEMINI_MODEL, DISCORD_PUBKEY, DISCORD_APPID, DISCORD_TOKEN,  TELEGRAM_API_ID, TELEGRAM_API_HASH, REPLY_ON_TAG_BOT_USERNAME, JIRA_PERSONAL_ACCESS_TOKEN, JIRA_PROJECT_KEY,JIRA_SERVER_ISSUE_API,JIRA_SERVER_WEBHOOK_API

import bot_telegram
import bot_discord
import telegram_types

import knowledgebase
import skills.common_question_answer.main as common_question_answer
from knowledgebase.orchestrationbuildprompt import build_system_instruction
import knowledgebase.dbcontext
import knowledgebase.orchestrationcontext 

def get_all_webhook():
    # Cấu hình các tham số
    headers = {
        "Authorization": f"Bearer {JIRA_PERSONAL_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    try:
        # Thực hiện request GET
        response = requests.get(JIRA_SERVER_WEBHOOK_API, headers=headers)

        # Kiểm tra lỗi HTTP (nếu có)
        response.raise_for_status()

        # Trả về kết quả dạng JSON
        data = response.json()
        # print(data)
        return data

    except Exception as errh:
        print(f"Http Error: {errh}")
        return None

def delete_webhook(webhook_name):
    all_webhook = get_all_webhook()
    if all_webhook is None:
        print("❌ Không thể lấy danh sách webhook")
        return None

    url_webhook_by_name = None
    for webhook in all_webhook:
        if webhook["name"] == webhook_name:
            url_webhook_by_name = webhook["self"]
            break

    if url_webhook_by_name is None:
        print(f"❌ Không tìm thấy webhook có tên: {webhook_name}")
        return None

    headers = {
        "Authorization": f"Bearer {JIRA_PERSONAL_ACCESS_TOKEN}",
        "X-Atlassian-Token": "no-check"
    }

    try:
        response = requests.delete(url_webhook_by_name, headers=headers)

        if response.status_code == 200 or response.status_code == 204:
            print(f"✅ Xóa Webhook '{webhook_name}' thành công!")
            return True
        else:
            print(f"❌ Xóa Thất bại. Mã lỗi: {response.status_code}")
            print(response.text)
            return None

    except Exception as e:
        print(f"🔥 Lỗi kết nối: {e}")
        return None


def create_or_update_webhook(webhook_name, base_url_tunnel):

    all_webhook= get_all_webhook()

    url_webhook_by_name =None
    for webhook in all_webhook:
        if webhook["name"] == webhook_name:
            print(f"Webhook {webhook_name} đã tồn tại")
            url_webhook_by_name = webhook["self"]
            break


    headers = {
        "Authorization": f"Bearer {JIRA_PERSONAL_ACCESS_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Atlassian-Token": "no-check"
    }

    # 2. Cấu hình Webhook mới (Payload)
    # Bạn có thể tùy chỉnh các sự kiện (events) và bộ lọc (filters)
    new_webhook_data = {       
    "name": f"{webhook_name}",
    "description": "",
    "url": f"{base_url_tunnel}",
    "lastUpdatedUser": "",
    "lastUpdatedDisplayName": "",
    "enabled": True, 
    "filters": {"issue-related-events-section": ""},
    "excludeBody": False ,
    "events": ["jira:issue_updated","worklog_created","comment_created","option_unassigned_issues_changed","comment_updated","jira:issue_deleted","jira:worklog_updated","worklog_updated"]
    }

    try:
        if url_webhook_by_name!=None:
            delete_webhook(webhook_name)

        # 2. Thực hiện gửi request POST create
        response = requests.post(JIRA_SERVER_WEBHOOK_API,headers=headers, json=new_webhook_data)

        if response.status_code == 201 or response.status_code == 200:
            print("✅ Tạo mới Webhook thành công!")
            # Trả về thông tin webhook vừa tạo (bao gồm cả ID mới)
            
            return response.json()
        else:
            print(f"❌ Tạo mới Thất bại. Mã lỗi: {response.status_code}")
            print(response.text)
            return None
        return None

    except Exception as e:
        print(f"🔥 Lỗi kết nối: {e}")
        return None
