from telegram_types import TelegramUpdate
import json

def test_pydantic_caption():
    # Simulate a message with a caption
    data = {
        "update_id": 12345,
        "message": {
            "chat": {"id": 123, "first_name": "Test"},
            "date": 1600000000,
            "photo": [
                {"file_id": "file_1", "file_unique_id": "unique_1", "width": 100, "height": 100, "file_size": 1000}
            ],
            "caption": "This is a caption"
        }
    }
    
    update = TelegramUpdate.model_validate(data)
    print(f"Update: {update}")
    print(f"Text: {update.message.text}")
    print(f"Caption: {update.message.caption}")
    
    user_text = update.message.text or update.message.caption
    print(f"Combined user_text: {user_text}")
    
    assert user_text == "This is a caption"
    print("Test passed!")

if __name__ == "__main__":
    test_pydantic_caption()
