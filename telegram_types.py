
from pydantic import BaseModel, Field,ConfigDict
from typing import Any,List,Optional
# --- ĐỊNH NGHĨA DỮ LIỆU (Pydantic Models) ---
# Giúp code sạch hơn và tự động kiểm tra dữ liệu đầu vào

class AcceptedGiftTypes(BaseModel):
    unlimited_gifts: bool|None=None
    limited_gifts: bool|None=None
    unique_gifts: bool|None=None
    premium_subscription: bool|None=None
    gifts_from_channels: bool|None=None

class Chat(BaseModel):
    id: int| None = None
    first_name: str | None = None
    title: str | None = None  # Dành cho Group
    type: str | None = None
    all_members_are_administrators:bool|None=None
    accepted_gift_types: AcceptedGiftTypes|None=None


class PhotoSize(BaseModel):
    file_id: str| None = None
    file_unique_id: str| None = None
    width: int| None = None
    height: int| None = None
    file_size: int | None = None


class Document(BaseModel):
    file_id: str| None = None
    file_unique_id: str| None = None
    file_name: str | None = None
    mime_type: str | None = None
    file_size: int | None = None


class Video(BaseModel):
    file_id: str| None = None
    file_unique_id: str| None = None
    width: int| None = None
    height: int| None = None
    duration: int| None = None
    file_name: str | None = None
    mime_type: str | None = None
    file_size: int | None = None


class Voice(BaseModel):
    file_id: str| None = None
    file_unique_id: str| None = None
    duration: int| None = None
    mime_type: str | None = None
    file_size: int | None = None


class Audio(BaseModel):
    file_id: str| None = None
    file_unique_id: str| None = None
    duration: int| None = None
    performer: str | None = None
    title: str | None = None
    file_name: str | None = None
    mime_type: str | None = None
    file_size: int | None = None


class Animation(BaseModel):
    file_id: str| None = None
    file_unique_id: str| None = None
    width: int| None = None
    height: int| None = None
    duration: int| None = None
    file_name: str | None = None
    mime_type: str | None = None
    file_size: int | None = None
 
class FromUser(BaseModel):
    id: int| None = None
    is_bot: bool | None = None
    first_name: str | None = None
    last_name: str | None = None
    username: str | None = None
    
class Message(BaseModel):

    # Cho phép dùng cả 'from_user' và 'from' khi khởi tạo
    model_config = ConfigDict(populate_by_name=True)

    chat: Chat | None = None 
    text: str | None = None  # Tin nhắn có thể là ảnh/sticker (không có text)
    caption: str | None = None  # Văn bản đi kèm media (ảnh/video/file)
    date: int | None = None 
    edit_date:int|None=None
    media_group_id: str | None = None
    photo: list[PhotoSize] | None = None
    document: Document | None = None
    video: Video | None = None
    voice: Voice | None = None
    audio: Audio | None = None
    animation: Animation | None = None
    entities:Any| None = None 
    link_preview_options:Any=None
    message_id:int | None = None 
    from_user: FromUser | None = Field(default=None, alias="from")
    reply_to_message: Optional['Message'] | None = None
    # class Config:
    #     # This allows you to populate the model using the alias "from" 
    #     # but also access it via "from_user"
    #     populate_by_name = True

class TelegramUpdate(BaseModel):
    update_id: int|None=None
    message: Message | None = None  # Có thể là edited_message, nên để None
    edited_message: Message | None = None  # Có thể là edited_message, nên để None
    ok:bool|None=None
    result: Message | None = None  # Có thể là kết quả post reply lên group
    def get_chat_id(self):
        if self.message:
            return self.message.chat.id
        elif self.edited_message:
            return self.edited_message.chat.id
        elif self.result:
            return self.result.chat.id
        return None
    
    def get_message_date(self):
        if self.message:
            return self.message.date
        elif self.edited_message:
            return self.edited_message.date
        elif self.result:
            return self.result.date
        return None
    

class OrchestrationMessage:
    message: TelegramUpdate|None=None
    msg_id:str|None=None
    files:List[str]|None=None
    text:str|None=None
    chat_id:str|None=None
    webhook_base_url:str|None=None
    
        