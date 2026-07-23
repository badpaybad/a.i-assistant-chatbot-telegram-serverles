import sys
import os
import asyncio

# Ensure project root is in sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import config
import bot_telegram
import telegram_types
import program

async def test_mention_format():
    print("--- Test 1: format_user_mention ---")
    tag1 = bot_telegram.format_user_mention(username="badpaybad")
    print(f"Mention by username: {tag1}")
    assert tag1 == "@badpaybad"

    tag2 = bot_telegram.format_user_mention(user_id=730806080, fullname="Nguyen Phan Du")
    print(f"Mention by ID + Name: {tag2}")
    assert tag2 == '<a href="tg://user?id=730806080">Nguyen Phan Du</a>'

    print("--- Test 1 PASSED ---")

async def test_bot_tag_filter():
    print("--- Test 2: gemma4_process_chat_history_and_current_msg Tag Filter ---")
    
    # Untagged message
    msg_untagged = telegram_types.OrchestrationMessage(
        chat_id="12345678",
        text="Xin chào các bạn trong nhóm",
        message=telegram_types.TelegramUpdate(
            message=telegram_types.Message(
                message_id=1,
                date=1700000000,
                chat=telegram_types.Chat(id=12345678, type="group"),
                text="Xin chào các bạn trong nhóm",
                from_user=telegram_types.FromUser(id=999, first_name="Tester", username="tester")
            )
        )
    )

    res1 = await program.gemma4_process_chat_history_and_current_msg(msg_untagged)
    assert res1 is None, "Should skip replying when bot is not tagged/mentioned"
    print("Untagged message skipped as expected.")

    # Tagged message test (Checking tag detection logic)
    bot_name = config.TELEGRAM_BOT_USERNAME.replace("@", "")
    msg_tagged = telegram_types.OrchestrationMessage(
        chat_id="12345678",
        text=f"Chào @{bot_name} bạn có khỏe không?",
        message=telegram_types.TelegramUpdate(
            message=telegram_types.Message(
                message_id=2,
                date=1700000005,
                chat=telegram_types.Chat(id=12345678, type="group"),
                text=f"Chào @{bot_name} bạn có khỏe không?",
                from_user=telegram_types.FromUser(id=999, first_name="Tester", username="tester")
            )
        )
    )
    
    # Mocking Gemma4 API endpoint response for offline test
    import httpx
    original_post = httpx.AsyncClient.post
    async def mock_post(self, url, *args, **kwargs):
        if "generateContent" in str(url):
            class DummyResp:
                status_code = 200
                def raise_for_status(self): pass
                def json(self):
                    return {
                        "candidates": [
                            {"content": {"parts": [{"text": "Chào bạn, mình khỏe!"}]}}
                        ]
                    }
            return DummyResp()
        elif "sendMessage" in str(url) or "sendPhoto" in str(url):
            class DummyResp:
                status_code = 200
                def raise_for_status(self): pass
                def json(self):
                    return {"ok": True, "result": {"message_id": 100, "chat": {"id": 12345678}, "date": 1700000010, "text": "Chào bạn, mình khỏe!"}}
            return DummyResp()
        return await original_post(self, url, *args, **kwargs)

    httpx.AsyncClient.post = mock_post

    try:
        res2 = await program.gemma4_process_chat_history_and_current_msg(msg_tagged)
        print(f"Tagged message processed successfully. Response: {res2}")
        assert res2 is not None, "Tagged message should be processed"
    finally:
        httpx.AsyncClient.post = original_post

    print("--- Test 2 PASSED ---")

async def main():
    await test_mention_format()
    await test_bot_tag_filter()
    print("ALL TESTS PASSED PERFECTLY!")

if __name__ == "__main__":
    asyncio.run(main())
