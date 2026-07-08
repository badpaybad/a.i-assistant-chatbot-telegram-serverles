import os
import sys
import asyncio
import logging
import sqlite3
import uuid
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import uvicorn
from google import genai
from google.genai import types

# Setup sys.path to import config from parent directory (1 level up)
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
try:
    from config_dunp import GEMINI_APIKEY, PORT
except ImportError:
    GEMINI_APIKEY = os.environ.get("GEMINI_API_KEY", "")
    PORT = 8888

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("esp32hub")

# SQLite Storage Setup
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "chat_history.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            role TEXT,
            content TEXT
        )
    """)
    conn.commit()
    conn.close()
    logger.info("sqlite3 database initialized.")

def save_chat_message(session_id: str, role: str, content: str) -> str:
    if not content.strip():
        return "Nội dung trống, không lưu."
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO chat_history (session_id, role, content) VALUES (?, ?, ?)",
            (session_id, role, content.strip())
        )
        row_id = cursor.lastrowid
        conn.commit()
        conn.close()
        logger.info(f"💾 Saved {role} message to SQLite: ID={row_id}, '{content.strip()}'")
        return f"Thành công: Đã thêm bản ghi có ID {row_id}."
    except Exception as e:
        error_msg = f"Lỗi lưu cơ sở dữ liệu: {e}"
        logger.error(error_msg)
        return error_msg

def update_chat_message(record_id: int, new_content: str) -> str:
    if not new_content.strip():
        return "Nội dung mới trống, không thể cập nhật."
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        # Verify first if it exists
        cursor.execute("SELECT id, role, content FROM chat_history WHERE id = ?", (record_id,))
        row = cursor.fetchone()
        if not row:
            conn.close()
            return f"Lỗi: Không tìm thấy bản ghi có ID {record_id}."
        
        cursor.execute(
            "UPDATE chat_history SET content = ? WHERE id = ?",
            (new_content.strip(), record_id)
        )
        conn.commit()
        conn.close()
        logger.info(f"💾 Updated message ID={record_id} to '{new_content.strip()}'")
        return f"Thành công: Cập nhật bản ghi ID {record_id}."
    except Exception as e:
        error_msg = f"Lỗi cập nhật cơ sở dữ liệu: {e}"
        logger.error(error_msg)
        return error_msg

def delete_chat_message(record_id: int) -> str:
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        # Verify first if it exists
        cursor.execute("SELECT id FROM chat_history WHERE id = ?", (record_id,))
        row = cursor.fetchone()
        if not row:
            conn.close()
            return f"Lỗi: Không tìm thấy bản ghi có ID {record_id}."
        
        cursor.execute("DELETE FROM chat_history WHERE id = ?", (record_id,))
        conn.commit()
        conn.close()
        logger.info(f"💾 Deleted message ID={record_id}")
        return f"Thành công: Đã xóa bản ghi ID {record_id}."
    except Exception as e:
        error_msg = f"Lỗi xóa cơ sở dữ liệu: {e}"
        logger.error(error_msg)
        return error_msg

def get_chat_history_summary(limit: int = 20) -> str:
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, role, content, timestamp FROM chat_history ORDER BY id DESC LIMIT ?",
            (limit,)
        )
        rows = cursor.fetchall()
        conn.close()
        
        if not rows:
            return "Chưa có lịch sử trò chuyện nào."
            
        rows.reverse()
        history_lines = []
        for row_id, role, content, timestamp in rows:
            role_name = "Người dùng" if role == "user" else "Trợ lý (Du)"
            history_lines.append(f"[ID: {row_id}] [{timestamp}] {role_name}: {content}")
        return "\n".join(history_lines)
    except Exception as e:
        return f"Lỗi truy vấn lịch sử: {e}"

def search_chat_history(query_text: str, limit: int = 10) -> str:
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, role, content, timestamp FROM chat_history WHERE content LIKE ? ORDER BY id DESC LIMIT ?",
            (f"%{query_text}%", limit)
        )
        rows = cursor.fetchall()
        conn.close()
        
        if not rows:
            return f"Không tìm thấy kết quả nào khớp với '{query_text}' trong lịch sử."
            
        rows.reverse()
        history_lines = []
        for row_id, role, content, timestamp in rows:
            role_name = "Người dùng" if role == "user" else "Trợ lý (Du)"
            history_lines.append(f"[ID: {row_id}] [{timestamp}] {role_name}: {content}")
        return f"Kết quả tìm kiếm cho '{query_text}':\n" + "\n".join(history_lines)
    except Exception as e:
        return f"Lỗi tìm kiếm lịch sử: {e}"

# Model Tools Implementations
def get_conversation_history(limit: int = 20) -> str:
    """Lấy danh sách các câu đàm thoại gần nhất (trí nhớ ngắn hạn) để tiếp tục hội thoại."""
    logger.info(f"🤖 Model called tool: get_conversation_history(limit={limit})")
    return get_chat_history_summary(limit)

def search_conversation_history(query_text: str) -> str:
    """Tìm kiếm thông tin chi tiết (trí nhớ dài hạn) trong lịch sử hội thoại."""
    logger.info(f"🤖 Model called tool: search_conversation_history(query_text='{query_text}')")
    return search_chat_history(query_text)

def add_conversation_record(session_id: str, role: str, content: str) -> str:
    """Thêm một bản ghi đàm thoại thủ công."""
    logger.info(f"🤖 Model called tool: add_conversation_record(role='{role}', content='{content}')")
    return save_chat_message(session_id, role, content)

def update_conversation_record(record_id: int, new_content: str) -> str:
    """Sửa đổi bản ghi đàm thoại theo ID."""
    logger.info(f"🤖 Model called tool: update_conversation_record(record_id={record_id}, new_content='{new_content}')")
    return update_chat_message(record_id, new_content)

def delete_conversation_record(record_id: int) -> str:
    """Xóa bản ghi đàm thoại theo ID."""
    logger.info(f"🤖 Model called tool: delete_conversation_record(record_id={record_id})")
    return delete_chat_message(record_id)

# Initialize SQLite database
init_db()

app = FastAPI(title="ESP32 Voice Chat Hub (esp32hub)")

@app.get("/")
def read_root():
    return {"status": "running", "hub": "esp32hub"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    session_id = str(uuid.uuid4())
    logger.info(f"🔌 Client connected via WebSocket. Generated Session ID: {session_id}")

    if not GEMINI_APIKEY:
        logger.error("❌ GEMINI_APIKEY is not configured in config_dunp.py or environment.")
        await websocket.send_json({"event": "error", "message": "API key not configured"})
        await websocket.close()
        return

    client = genai.Client(api_key=GEMINI_APIKEY)
    model = "gemini-3.1-flash-live-preview"

    # Configuration for Gemini Live
    config = types.LiveConnectConfig(
        response_modalities=[types.Modality.AUDIO],
        speech_config=types.SpeechConfig(
            voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Aoede")
            )
        ),
        system_instruction=types.Content(
            parts=[types.Part.from_text(
                text="Bạn là trợ lý ảo tiếng Việt thông minh có tên là 'Du'. Hãy trả lời cực kỳ ngắn gọn, tự nhiên và trôi chảy như đang hội thoại thực tế. "
                     "Bạn có quyền truy cập vào lịch sử đàm thoại thông qua các công cụ lưu trữ SQLite (get_conversation_history, search_conversation_history, "
                     "add_conversation_record, update_conversation_record, delete_conversation_record) để quản lý, sửa đổi hoặc truy xuất chuyện cũ khi người dùng yêu cầu."
            )]
        ),
        realtime_input_config=types.RealtimeInputConfig(
            activity_handling=types.ActivityHandling.NO_INTERRUPTION
        ),
        tools=[
            types.Tool(function_declarations=[
                types.FunctionDeclaration(
                    name="get_conversation_history",
                    description="Lấy danh sách các câu đàm thoại gần nhất dưới dạng danh sách kèm ID bản ghi (trí nhớ ngắn hạn) để biết ngữ cảnh.",
                    parameters=types.Schema(
                        type=types.Type.OBJECT,
                        properties={
                            "limit": types.Schema(
                                type=types.Type.INTEGER,
                                description="Số lượng bản ghi hội thoại gần nhất cần lấy."
                            )
                        }
                    )
                ),
                types.FunctionDeclaration(
                    name="search_conversation_history",
                    description="Tìm kiếm thông tin chi tiết (trí nhớ dài hạn) trong lịch sử hội thoại bằng từ khóa và trả về danh sách bản ghi kèm ID.",
                    parameters=types.Schema(
                        type=types.Type.OBJECT,
                        properties={
                            "query_text": types.Schema(
                                type=types.Type.STRING,
                                description="Từ khóa hoặc nội dung cần tìm kiếm trong lịch sử."
                            )
                        },
                        required=["query_text"]
                    )
                ),
                types.FunctionDeclaration(
                    name="add_conversation_record",
                    description="Thêm một câu đàm thoại thủ công vào lịch sử lưu trữ SQLite theo yêu cầu của người dùng.",
                    parameters=types.Schema(
                        type=types.Type.OBJECT,
                        properties={
                            "role": types.Schema(
                                type=types.Type.STRING,
                                description="Vai trò phát ngôn: 'user' (người dùng) hoặc 'model' (trợ lý)."
                            ),
                            "content": types.Schema(
                                type=types.Type.STRING,
                                description="Nội dung hội thoại cần lưu trữ."
                            )
                        },
                        required=["role", "content"]
                    )
                ),
                types.FunctionDeclaration(
                    name="update_conversation_record",
                    description="Chỉnh sửa hoặc cập nhật lại nội dung của một bản ghi hội thoại trong SQLite theo ID bản ghi.",
                    parameters=types.Schema(
                        type=types.Type.OBJECT,
                        properties={
                            "record_id": types.Schema(
                                type=types.Type.INTEGER,
                                description="ID của bản ghi hội thoại cần sửa."
                            ),
                            "new_content": types.Schema(
                                type=types.Type.STRING,
                                description="Nội dung hội thoại mới thay thế nội dung cũ."
                            )
                        },
                        required=["record_id", "new_content"]
                    )
                ),
                types.FunctionDeclaration(
                    name="delete_conversation_record",
                    description="Xóa vĩnh viễn một bản ghi hội thoại ra khỏi lịch sử lưu trữ SQLite theo ID bản ghi.",
                    parameters=types.Schema(
                        type=types.Type.OBJECT,
                        properties={
                            "record_id": types.Schema(
                                type=types.Type.INTEGER,
                                description="ID của bản ghi hội thoại cần xóa."
                            )
                        },
                        required=["record_id"]
                    )
                )
            ])
        ]
    )

    logger.info("🔗 Connecting to Gemini Live API...")
    try:
        async with client.aio.live.connect(model=model, config=config) as session:
            logger.info("🟢 Gemini Live API session connected successfully.")
            # Notify ESP32 that setup is complete and it can start streaming mic
            await websocket.send_json({"event": "setup_complete"})

            # Task 1: Forward audio from ESP32 to Gemini Live
            async def esp32_to_gemini():
                packet_count = 0
                try:
                    while True:
                        message = await websocket.receive()
                        msg_type = message.get("type")
                        if msg_type == "websocket.disconnect":
                            logger.info("🔌 Client disconnected.")
                            break
                        
                        if "bytes" in message:
                            pcm_chunk = message["bytes"]
                            if pcm_chunk:
                                # Forward raw 16kHz PCM mono audio
                                await session.send_realtime_input(
                                    audio=types.Blob(data=pcm_chunk, mime_type="audio/pcm;rate=16000")
                                )
                                packet_count += 1
                                if packet_count % 30 == 0:
                                    logger.info(f"📤 Forwarded packet #{packet_count} ({len(pcm_chunk)} bytes) to Gemini.")
                        elif "text" in message:
                            text_msg = message["text"]
                            logger.info(f"📩 Received text from ESP32: {text_msg}")
                except WebSocketDisconnect:
                    logger.info("🔌 Client disconnected.")
                except asyncio.CancelledError:
                    pass
                except Exception as e:
                    logger.error(f"❌ Error in ESP32->Gemini loop: {e}")
                    raise e

            # Task 2: Forward response from Gemini Live to ESP32
            async def gemini_to_esp32():
                audio_buffer = bytearray()
                CHUNK_SIZE = 4096 # Standardize to 4KB chunks (~85ms of 24kHz audio)
                model_text_acc = []
                try:
                    async for response in session.receive():
                        # Check if the model is asking to use a tool
                        if response.tool_call is not None:
                            logger.info("🤖 Model requested tool call...")
                            function_responses = []
                            for fc in response.tool_call.function_calls:
                                name = fc.name
                                args = fc.args
                                call_id = fc.id
                                logger.info(f"🛠️ Executing function '{name}' with args {args}")
                                
                                result = ""
                                if name == "get_conversation_history":
                                    limit = args.get("limit", 20)
                                    result = get_conversation_history(limit)
                                elif name == "search_conversation_history":
                                    query_text = args.get("query_text", "")
                                    result = search_conversation_history(query_text)
                                elif name == "add_conversation_record":
                                    role = args.get("role", "user")
                                    content = args.get("content", "")
                                    result = add_conversation_record(session_id, role, content)
                                elif name == "update_conversation_record":
                                    record_id = int(args.get("record_id", 0))
                                    new_content = args.get("new_content", "")
                                    result = update_conversation_record(record_id, new_content)
                                elif name == "delete_conversation_record":
                                    record_id = int(args.get("record_id", 0))
                                    result = delete_conversation_record(record_id)
                                else:
                                    result = f"Error: Tool '{name}' not found."
                                    logger.error(result)
                                    
                                function_responses.append(types.FunctionResponse(
                                    name=name,
                                    response={'result': result},
                                    id=call_id
                                ))
                            
                            logger.info(f"📤 Sending tool response back to Gemini: {function_responses}")
                            await session.send_tool_response(function_responses=function_responses)
                            continue

                        server_content = response.server_content
                        if server_content is not None:
                            # Interruption event (barge-in)
                            if server_content.interrupted:
                                logger.info("🛑 Gemini session interrupted. Sending mute event.")
                                audio_buffer.clear()
                                if model_text_acc:
                                    model_text = "".join(model_text_acc) + " [Bị cắt ngang]"
                                    save_chat_message(session_id, "model", model_text)
                                    model_text_acc.clear()
                                await websocket.send_json({"event": "interrupted"})

                            # Model speaking turn audio data
                            if server_content.model_turn is not None:
                                for part in server_content.model_turn.parts:
                                    if part.inline_data is not None:
                                        audio_data = part.inline_data.data
                                        if audio_data:
                                            audio_buffer.extend(audio_data)
                                            while len(audio_buffer) >= CHUNK_SIZE:
                                                chunk = bytes(audio_buffer[:CHUNK_SIZE])
                                                del audio_buffer[:CHUNK_SIZE]
                                                await websocket.send_bytes(chunk)
                                    elif part.text is not None:
                                        # Print or log the text response
                                        print(part.text, end="", flush=True)
                                        model_text_acc.append(part.text)

                            # Turn complete
                            if server_content.turn_complete:
                                # Flush any remaining audio in the buffer
                                if audio_buffer:
                                    await websocket.send_bytes(bytes(audio_buffer))
                                    audio_buffer.clear()
                                print("\n🤖 [Turn Complete]")
                                if model_text_acc:
                                    model_text = "".join(model_text_acc)
                                    save_chat_message(session_id, "model", model_text)
                                    model_text_acc.clear()
                                await websocket.send_json({"event": "turn_complete"})

                            # User input transcription check
                            if server_content.input_transcription is not None:
                                trans = server_content.input_transcription
                                if trans.text:
                                    text_lower = trans.text.lower()
                                    
                                    # Save user message to database on finalization
                                    if trans.finished:
                                        logger.info(f"🎙️ [User transcription]: '{trans.text}'")
                                        save_chat_message(session_id, "user", trans.text)
                                    
                                    await websocket.send_json({"event": "user_transcription", "text": trans.text})

                                    # Check if the user wants to stop
                                    if "dừng lại" in text_lower or "làm ơn dừng lại" in text_lower:
                                        logger.info("🛑 Emergency stop command detected in transcription! Muting speaker.")
                                        await websocket.send_json({"event": "interrupted"})

                except WebSocketDisconnect:
                    pass
                except asyncio.CancelledError:
                    pass
                except Exception as e:
                    logger.error(f"❌ Error in Gemini->ESP32 loop: {e}")
                    raise e

            # Run both loops concurrently, cancel the other if one exits
            done, pending = await asyncio.wait(
                [
                    asyncio.create_task(esp32_to_gemini()),
                    asyncio.create_task(gemini_to_esp32())
                ],
                return_when=asyncio.FIRST_COMPLETED
            )
            for task in pending:
                task.cancel()

    except Exception as e:
        logger.error(f"❌ Error during Gemini Live session: {e}")
        try:
            await websocket.send_json({"event": "error", "message": str(e)})
        except Exception:
            pass
    finally:
        logger.info("🔌 WebSocket connection closed and cleaned up.")

if __name__ == "__main__":
    logger.info(f"🚀 Starting esp32hub FastAPI server on http://0.0.0.0:{PORT}...")
    uvicorn.run(app, host="0.0.0.0", port=PORT)
