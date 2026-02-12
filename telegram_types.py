
from pydantic import BaseModel
# --- ĐỊNH NGHĨA DỮ LIỆU (Pydantic Models) ---
# Giúp code sạch hơn và tự động kiểm tra dữ liệu đầu vào


class Chat(BaseModel):
    id: int
    first_name: str | None = None
    title: str | None = None  # Dành cho Group



class PhotoSize(BaseModel):
    file_id: str
    file_unique_id: str
    width: int
    height: int
    file_size: int | None = None


class Document(BaseModel):
    file_id: str
    file_unique_id: str
    file_name: str | None = None
    mime_type: str | None = None
    file_size: int | None = None


class Video(BaseModel):
    file_id: str
    file_unique_id: str
    width: int
    height: int
    duration: int
    file_name: str | None = None
    mime_type: str | None = None
    file_size: int | None = None


class Message(BaseModel):
    chat: Chat
    text: str | None = None  # Tin nhắn có thể là ảnh/sticker (không có text)
    date: int
    photo: list[PhotoSize] | None = None
    document: Document | None = None
    video: Video | None = None



class TelegramUpdate(BaseModel):
    update_id: int
    message: Message | None = None  # Có thể là edited_message, nên để None
