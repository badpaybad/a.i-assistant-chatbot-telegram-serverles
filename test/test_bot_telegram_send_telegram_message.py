import asyncio
import os
import sys

# Thêm thư mục gốc vào sys.path để import được các module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from bot_telegram import send_telegram_message

async def main():
    # Chat ID lấy từ database. Nếu không chạy được, hãy thay bằng chat ID thực tế của bạn.
    chat_id = -5251554348 
    
    print("--- Test 1: Gửi tin nhắn văn bản bình thường ---")
    res1 = await send_telegram_message(chat_id, "Test tin nhắn văn bản từ script test")
    print(f"Kết quả Test 1: {'Thành công' if res1 else 'Thất bại'}")

    print("\n--- Test 2: Gửi tin nhắn kèm ảnh (img1.png) ---")
    image_path = "img1.png"
    if os.path.exists(image_path):
        res2 = await send_telegram_message(chat_id, "Test gửi ảnh img1.png", files=[image_path])
        print(f"Kết quả Test 2: {'Thành công' if res2 else 'Thất bại'}")
    else:
        print(f"Bỏ qua Test 2: Không tìm thấy file {image_path}")

    print("\n--- Test 3: Gửi tin nhắn kèm tài liệu (requirements.txt) ---")
    doc_path = "requirements.txt"
    if os.path.exists(doc_path):
        res3 = await send_telegram_message(chat_id, "Test gửi document requirements.txt", files=[doc_path])
        print(f"Kết quả Test 3: {'Thành công' if res3 else 'Thất bại'}")
    else:
        print(f"Bỏ qua Test 3: Không tìm thấy file {doc_path}")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "config_dunp":
        asyncio.run(main())
    else:
        print("Vui lòng chạy với tham số config_dunp")
        print("Ví dụ: python test/test_bot_telegram_send_telegram_message.py config_dunp")
