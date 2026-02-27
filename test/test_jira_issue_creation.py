import asyncio
import sys
import os

# Add the project root to sys.path
sys.path.append(os.getcwd())

import skills.jira.tool_call_jira as tool_call_jira

class MockMessage:
    def __init__(self, text, chat_id):
        self.text = text
        self.chat_id = chat_id
        self.files = []

async def test_jira_creation():
    print("--- Starting Jira Skill Test ---")
    
    # Mock data
    curret_message = MockMessage(
        text="Hãy tạo một task Jira để sửa lỗi crash khi parse JSON trong module orchestration. Deadline là ngày mai.",
        chat_id="730806080" # Standard ID for testing
    )
    
    list_current_msg = [
        MockMessage("Chào bot, mình đang gặp vấn đề với module orchestration.", "730806080"),
        MockMessage("Nó bị crash khi nhận data JSON không hợp lệ.", "730806080")
    ]
    
    list_summary_chat = [
        {"json": {"summary": "Người dùng đang thảo luận về lỗi trong hệ thống."}}
    ]
    
    unique_urls = ["https://example.com/error-logs"]
    
    # Mock Gemini
    from unittest.mock import MagicMock
    original_client = tool_call_jira.clientGemini
    mock_response = MagicMock()
    mock_response.text = json.dumps({
        "should_create": True,
        "summary": "Sửa lỗi crash khi parse JSON trong module orchestration",
        "description": "Module orchestration bị crash khi nhận data JSON không hợp lệ. Xem thêm log tại: https://example.com/error-logs",
        "issuetype": "Bug",
        "duedate": "2026-02-28"
    })
    
    mock_client = MagicMock()
    mock_client.models.generate_content.return_value = mock_response
    tool_call_jira.clientGemini = mock_client

    # Mock Telegram
    import bot_telegram
    original_send = bot_telegram.send_telegram_message
    async def mock_send(chat_id, message):
        print(f"\n[Mock Telegram Send] ChatID: {chat_id}\nMessage:\n{message}\n")
    bot_telegram.send_telegram_message = mock_send
    
    try:
        await tool_call_jira.exec(None, curret_message, list_current_msg, list_summary_chat, unique_urls)
    finally:
        # Restore
        bot_telegram.send_telegram_message = original_send
        tool_call_jira.clientGemini = original_client

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
        print("Usage: python test/test_jira_issue_creation.py config_dunp")
        sys.exit(1)
        
    asyncio.run(test_jira_creation())
