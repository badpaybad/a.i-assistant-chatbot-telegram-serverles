
from pydantic import BaseModel
# --- ĐỊNH NGHĨA DỮ LIỆU (Pydantic Models) ---
# Giúp code sạch hơn và tự động kiểm tra dữ liệu đầu vào


class Chat(BaseModel):
    id: int
    first_name: str | None = None
    title: str | None = None  # Dành cho Group


class Message(BaseModel):
    chat: Chat
    text: str | None = None  # Tin nhắn có thể là ảnh/sticker (không có text)
    date: int


class TelegramUpdate(BaseModel):
    update_id: int
    message: Message | None = None  # Có thể là edited_message, nên để None
