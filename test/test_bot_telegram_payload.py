import asyncio
import os
import sys
from unittest.mock import AsyncMock, patch

# Thêm thư mục gốc vào sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import bot_telegram
from config import TELEGRAM_BOT_CHATID

async def test_payload_logic():
    print("--- Testing Telegram Payload Logic ---")
    
    # Mock httpx.AsyncClient to avoid real network calls
    with patch("httpx.AsyncClient") as mock_client:
        mock_instance = mock_client.return_value.__aenter__.return_value
        mock_instance.post = AsyncMock()
        mock_instance.post.return_value.json.return_value = {"ok": True, "result": {"message_id": 1, "chat": {"id": 123}, "date": 1600000000}}
        mock_instance.post.return_value.status_code = 200
        mock_instance.post.return_value.raise_for_status = lambda: None

        # Case 1: sendToGroup=True, chat_id=-1 (should use default)
        print("\nCase 1: sendToGroup=True, chat_id=-1")
        with patch("bot_telegram.TELEGRAM_BOT_CHATID", "-123456789"):
            await bot_telegram.send_telegram_message(-1, "Test default group")
            _, kwargs = mock_instance.post.call_args
            sent_payload = kwargs.get("json")
            print(f"Sent chat_id: {sent_payload['chat_id']}")
            assert sent_payload['chat_id'] == -123456789

        # Case 2: sendToGroup=True, specific chat_id (should use specific)
        print("\nCase 2: sendToGroup=True, specific chat_id=-999")
        await bot_telegram.send_telegram_message(-999, "Test specific group")
        args, kwargs = mock_instance.post.call_args
        sent_payload = kwargs.get("json")
        print(f"Sent chat_id: {sent_payload['chat_id']}")
        assert sent_payload['chat_id'] == -999

        # Case 3: sendToGroup=False, chat_id=12345 (individual)
        print("\nCase 3: sendToGroup=False, chat_id=12345")
        await bot_telegram.send_telegram_message(12345, "Test individual", isSendToGroup=False)
        args, kwargs = mock_instance.post.call_args
        sent_payload = kwargs.get("json")
        print(f"Sent chat_id: {sent_payload['chat_id']}")
        assert sent_payload['chat_id'] == 12345

    print("\n--- All Payload Logic Tests Passed! ---")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "config_dunp":
        asyncio.run(test_payload_logic())
    else:
        print("Vui lòng chạy với tham số config_dunp")
