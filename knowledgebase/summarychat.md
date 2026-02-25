ở file: summarychat.py
giữ nguyên các import đã có 
cần tạo hàm để equeue update object dạng telegram_types.TelegramUpdate, có chat.id là các nhóm chats khác nhau cần chạy summary cho từng nhóm chát
        
cần 1 vòng loop vô tận để cứ dequeue lấy đủ 10 item để build thành chuỗi chát có cấu trúc lấy từ from ra firstname lastname , từ chat lấy ra tên nhóm, ở update object lấy ra text message . cộng dồn chuỗi thành dạng : 
tên người gửi ở nhóm tên nhóm lúc thời gian nội dung : xin chào bạn
tên người gửi ở nhóm tên nhóm lúc thời gian nội dung : hi, hôm nay bạn như thế nào

có chat.id là các nhóm chats khác nhau cần chạy summary cho từng nhóm chát

sau khi lấy xong thì gọi gemini để tóm tắt lại nội dung cuộc trò chuyện và dùng dbconnect.py lưu thành bảng summary_chat với các cột : id, chat_id, chat_datetime, at (timestamp), chat_summary

cấu trúc update object dạng json: 

{
  "update_id": 170620969,
  "message": {
    "message_id": 471,
    "from": {
      "id": 730806080,
      "is_bot": false,
      "first_name": "John",
      "last_name": "Nguyen",
      "username": "badpaybad",
      "language_code": "en"
    },
    "chat": {
      "id": -5251554348,
      "title": "FOSS-A.I.BOT",
      "type": "group",
      "all_members_are_administrators": true,
      "accepted_gift_types": {
        "unlimited_gifts": false,
        "limited_gifts": false,
        "unique_gifts": false,
        "premium_subscription": false,
        "gifts_from_channels": false
      }
    },
    "date": 1771996531,
    "text": "F Ngoc Cu Kim https://github.com/badpaybad/a.i-assistant-chatbot-telegram-serverles/blob/main/.agent/rules/architecture.md",
    "entities": [
      {
        "offset": 0,
        "length": 13,
        "type": "text_mention",
        "user": {
          "id": 6993779075,
          "is_bot": false,
          "first_name": "Cù Kim",
          "last_name": "Ngọc"
        }
      },
      {
        "offset": 14,
        "length": 108,
        "type": "url"
      }
    ],
    "link_preview_options": {
      "url": "https://github.com/badpaybad/a.i-assistant-chatbot-telegram-serverles/blob/main/.agent/rules/architecture.md",
      "prefer_large_media": true
    }
  }
}
