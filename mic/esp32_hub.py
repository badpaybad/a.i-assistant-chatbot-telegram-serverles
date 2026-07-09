import os
import sys
import time
import json
import asyncio
import logging
import sqlite3
import uuid
import socket
import re
import subprocess
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
import uvicorn
import firebase_admin
from firebase_admin import credentials, firestore
from google import genai
from google.genai import types

# Setup sys.path to import config from parent directory (1 level up)
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
try:
    from config_dunp import GEMINI_APIKEY, PORT
    try:
        from config_dunp import ALLOWED_ESP32_MACS
    except ImportError:
        ALLOWED_ESP32_MACS = ["14:c1:9f:2e:3a:18"]
except ImportError:
    GEMINI_APIKEY = os.environ.get("GEMINI_API_KEY", "")
    PORT = 8888
    ALLOWED_ESP32_MACS = ["14:c1:9f:2e:3a:18"]

def is_authorized_mac(mac: str) -> bool:
    if not mac:
        return False
    mac_str = mac.strip().lower()
    allowed_macs_normalized = [m.strip().lower() for m in ALLOWED_ESP32_MACS]
    return mac_str in allowed_macs_normalized

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("esp32hub")

# SQLite Storage Setup
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "chat_history.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    # Table 1: Chat history (dialogue log)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            role TEXT,
            content TEXT
        )
    """)
    # Table 2: User memory/notes (separate table for explicit user request saves)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user_notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            topic TEXT,
            content TEXT
        )
    """)
    conn.commit()
    conn.close()
    logger.info("sqlite3 database initialized with chat_history and user_notes tables.")

# --- Bảng 1: Lịch sử hội thoại tự động ---
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
        logger.info(f"💾 Saved {role} message to SQLite chat_history: ID={row_id}")
        return f"Thành công: Đã ghi nhận đàm thoại ID {row_id}."
    except Exception as e:
        error_msg = f"Lỗi lưu lịch sử: {e}"
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
            history_lines.append(f"[Đàm thoại ID: {row_id}] [{timestamp}] {role_name}: {content}")
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
            return f"Không tìm thấy kết quả nào khớp với '{query_text}' trong lịch sử đàm thoại."
            
        rows.reverse()
        history_lines = []
        for row_id, role, content, timestamp in rows:
            role_name = "Người dùng" if role == "user" else "Trợ lý (Du)"
            history_lines.append(f"[Đàm thoại ID: {row_id}] [{timestamp}] {role_name}: {content}")
        return f"Kết quả tìm kiếm đàm thoại cho '{query_text}':\n" + "\n".join(history_lines)
    except Exception as e:
        return f"Lỗi tìm kiếm lịch sử: {e}"


# --- Bảng 2: Ghi chú / Thông tin người dùng yêu cầu lưu trữ ---
def save_user_note(topic: str, content: str) -> str:
    if not content.strip():
        return "Nội dung ghi chú trống, không thể lưu."
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO user_notes (topic, content) VALUES (?, ?)",
            (topic.strip() if topic else "Chung", content.strip())
        )
        row_id = cursor.lastrowid
        conn.commit()
        conn.close()
        logger.info(f"💾 Saved user note to SQLite user_notes: ID={row_id}, Topic='{topic}'")
        return f"Thành công: Đã lưu ghi chú '{topic}' với ID {row_id}."
    except Exception as e:
        error_msg = f"Lỗi lưu ghi chú: {e}"
        logger.error(error_msg)
        return error_msg

def get_user_notes_summary(limit: int = 50) -> str:
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, topic, content, timestamp FROM user_notes ORDER BY id DESC LIMIT ?",
            (limit,)
        )
        rows = cursor.fetchall()
        conn.close()
        
        if not rows:
            return "Chưa có ghi chú hay thông tin nào được lưu."
            
        rows.reverse()
        notes_lines = []
        for row_id, topic, content, timestamp in rows:
            notes_lines.append(f"[Ghi chú ID: {row_id}] [{timestamp}] Chủ đề: {topic} - Nội dung: {content}")
        return "\n".join(notes_lines)
    except Exception as e:
        return f"Lỗi truy vấn ghi chú: {e}"

def search_user_notes_summary(query_text: str) -> str:
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, topic, content, timestamp FROM user_notes WHERE topic LIKE ? OR content LIKE ? ORDER BY id DESC",
            (f"%{query_text}%", f"%{query_text}%")
        )
        rows = cursor.fetchall()
        conn.close()
        
        if not rows:
            return f"Không tìm thấy ghi chú hay thông tin nào khớp với '{query_text}'."
            
        rows.reverse()
        notes_lines = []
        for row_id, topic, content, timestamp in rows:
            notes_lines.append(f"[Ghi chú ID: {row_id}] [{timestamp}] Chủ đề: {topic} - Nội dung: {content}")
        return f"Kết quả tìm kiếm ghi chú cho '{query_text}':\n" + "\n".join(notes_lines)
    except Exception as e:
        return f"Lỗi tìm kiếm ghi chú: {e}"

def update_user_note_content(note_id: int, new_topic: str = None, new_content: str = None) -> str:
    if not new_topic and not new_content:
        return "Không có thông tin mới để cập nhật."
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Verify first if it exists
        cursor.execute("SELECT id, topic, content FROM user_notes WHERE id = ?", (note_id,))
        row = cursor.fetchone()
        if not row:
            conn.close()
            return f"Lỗi: Không tìm thấy ghi chú có ID {note_id}."
        
        current_topic, current_content = row[1], row[2]
        final_topic = new_topic.strip() if new_topic else current_topic
        final_content = new_content.strip() if new_content else current_content
        
        cursor.execute(
            "UPDATE user_notes SET topic = ?, content = ? WHERE id = ?",
            (final_topic, final_content, note_id)
        )
        conn.commit()
        conn.close()
        logger.info(f"💾 Updated user note ID={note_id}")
        return f"Thành công: Cập nhật ghi chú ID {note_id}."
    except Exception as e:
        error_msg = f"Lỗi cập nhật ghi chú: {e}"
        logger.error(error_msg)
        return error_msg

def delete_user_note_record(note_id: int) -> str:
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        # Verify first if it exists
        cursor.execute("SELECT id FROM user_notes WHERE id = ?", (note_id,))
        row = cursor.fetchone()
        if not row:
            conn.close()
            return f"Lỗi: Không tìm thấy ghi chú có ID {note_id}."
        
        cursor.execute("DELETE FROM user_notes WHERE id = ?", (note_id,))
        conn.commit()
        conn.close()
        logger.info(f"💾 Deleted user note ID={note_id}")
        return f"Thành công: Đã xóa ghi chú ID {note_id}."
    except Exception as e:
        error_msg = f"Lỗi xóa ghi chú: {e}"
        logger.error(error_msg)
        return error_msg


# --- Model Tools Implementations ---
def get_conversation_history(limit: int = 20) -> str:
    """Lấy danh sách các câu đàm thoại gần nhất (trí nhớ ngắn hạn)."""
    logger.info(f"🤖 Model called tool: get_conversation_history(limit={limit})")
    return get_chat_history_summary(limit)

def search_conversation_history(query_text: str) -> str:
    """Tìm kiếm từ khóa trong lịch sử đàm thoại."""
    logger.info(f"🤖 Model called tool: search_conversation_history(query_text='{query_text}')")
    return search_chat_history(query_text)

def add_user_note_tool(topic: str = "Chung", content: str = "") -> str:
    """Thêm ghi chú thông tin người dùng yêu cầu lưu trữ."""
    logger.info(f"🤖 Model called tool: add_user_note(topic='{topic}', content='{content}')")
    return save_user_note(topic, content)

def get_user_notes_tool(limit: int = 50) -> str:
    """Lấy danh sách thông tin người dùng đã lưu trữ."""
    logger.info(f"🤖 Model called tool: get_user_notes(limit={limit})")
    return get_user_notes_summary(limit)

def search_user_notes_tool(query_text: str) -> str:
    """Tìm kiếm trong ghi chú/thông tin người dùng đã lưu trữ."""
    logger.info(f"🤖 Model called tool: search_user_notes(query_text='{query_text}')")
    return search_user_notes_summary(query_text)

def update_user_note_tool(note_id: int, new_topic: str = None, new_content: str = None) -> str:
    """Sửa thông tin ghi chú theo ID."""
    logger.info(f"🤖 Model called tool: update_user_note(note_id={note_id}, new_topic='{new_topic}', new_content='{new_content}')")
    return update_user_note_content(note_id, new_topic, new_content)

def delete_user_note_tool(note_id: int) -> str:
    """Xóa thông tin ghi chú theo ID."""
    logger.info(f"🤖 Model called tool: delete_user_note(note_id={note_id})")
    return delete_user_note_record(note_id)


# Paths for Firebase config
ADMIN_SDK_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "TreeOfThought", "backend", "Core.Web.Api", "firebase-adminsdk.json"
)

def get_lan_ip():
    try:
        # Run 'ip a' command
        result = subprocess.run(["ip", "a"], capture_output=True, text=True, check=True)
        output = result.stdout
    except Exception as e:
        logger.error(f"⚠️ Error running 'ip a': {e}. Falling back to socket method.")
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        try:
            s.connect(('8.8.8.8', 80))
            ip = s.getsockname()[0]
        except Exception:
            ip = '127.0.0.1'
        finally:
            s.close()
        return ip

    # Parse output of 'ip a'
    interfaces = {}
    current_iface = None
    
    # Matching interface index & name (e.g. "2: wlp2s0: <...")
    iface_regex = re.compile(r'^\d+:\s+([^:@\s]+)')
    # Matching IPv4 address (e.g. "    inet 192.168.4.248/23 ...")
    inet_regex = re.compile(r'^\s+inet\s+([0-9.]+)/\d+')

    for line in output.splitlines():
        iface_match = iface_regex.match(line)
        if iface_match:
            current_iface = iface_match.group(1)
            interfaces[current_iface] = []
        elif current_iface:
            inet_match = inet_regex.match(line)
            if inet_match:
                ip = inet_match.group(1)
                # Ignore loopback IP
                if ip != '127.0.0.1':
                    interfaces[current_iface].append(ip)

    wifi_ips = []
    eth_ips = []
    other_ips = []

    for iface, ips in interfaces.items():
        if not ips:
            continue
        iface_lower = iface.lower()
        if any(w in iface_lower for w in ['wlan', 'wlp', 'wlo', 'wifi']):
            wifi_ips.append((iface, ips[0]))
        elif any(e in iface_lower for e in ['eth', 'enp', 'eno', 'ens', 'em']):
            eth_ips.append((iface, ips[0]))
        else:
            other_ips.append((iface, ips[0]))

    if wifi_ips:
        iface, ip = wifi_ips[0]
        logger.info(f"📶 Selected WiFi IP: {ip} (interface: {iface})")
        return ip
    if eth_ips:
        iface, ip = eth_ips[0]
        logger.info(f"🔌 Selected Ethernet IP: {ip} (interface: {iface})")
        return ip
    if other_ips:
        iface, ip = other_ips[0]
        logger.info(f"🌐 Selected LAN IP: {ip} (interface: {iface})")
        return ip

    return '127.0.0.1'

def publish_ip_to_firestore():
    if not os.path.exists(ADMIN_SDK_PATH):
        logger.error(f"❌ Firebase Admin SDK config not found at: {ADMIN_SDK_PATH}")
        return
    try:
        lan_ip = get_lan_ip()
        logger.info(f"🌐 Local LAN IP detected: {lan_ip}")
        
        cred = credentials.Certificate(ADMIN_SDK_PATH)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        
        doc_ref = db.collection("esp32hub").document("config")
        doc_ref.set({
            "ip": lan_ip,
            "port": PORT
        })
        logger.info(f"🔥 Successfully published server IP ({lan_ip}:{PORT}) to Firestore 'esp32hub/config'!")
    except Exception as e:
        logger.error(f"❌ Error publishing IP to Firestore: {e}")

# Initialize SQLite database and publish server IP to Firestore
init_db()
publish_ip_to_firestore()

app = FastAPI(title="ESP32 Voice Chat Hub (esp32hub)")

@app.get("/")
def read_root():
    return {"status": "running", "hub": "esp32hub"}

@app.get("/history")
def get_history(limit: int = 100):
    """Lấy toàn bộ lịch sử đàm thoại tự động dưới dạng JSON."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, session_id, role, content, timestamp FROM chat_history ORDER BY id DESC LIMIT ?",
            (limit,)
        )
        rows = cursor.fetchall()
        conn.close()
        
        history = []
        for row_id, session_id, role, content, timestamp in rows:
            history.append({
                "id": row_id,
                "session_id": session_id,
                "role": role,
                "content": content,
                "timestamp": timestamp
            })
        return {"status": "success", "count": len(history), "data": history}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/notes")
def get_notes(limit: int = 100):
    """Lấy toàn bộ ghi chú / thông tin người dùng yêu cầu lưu trữ dưới dạng JSON."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, topic, content, timestamp FROM user_notes ORDER BY id DESC LIMIT ?",
            (limit,)
        )
        rows = cursor.fetchall()
        conn.close()
        
        notes = []
        for row_id, topic, content, timestamp in rows:
            notes.append({
                "id": row_id,
                "topic": topic,
                "content": content,
                "timestamp": timestamp
            })
        return {"status": "success", "count": len(notes), "data": notes}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/firebase-token")
def get_firebase_token(mac: str = None):
    if not mac:
        raise HTTPException(status_code=400, detail="Missing MAC address")
    if not is_authorized_mac(mac):
        logger.warning(f"🔒 Unauthorized token request for MAC: {mac}")
        raise HTTPException(status_code=401, detail="Unauthorized MAC address")
    try:
        # Load Firebase Admin certificate info to get client_email and private_key
        if not os.path.exists(ADMIN_SDK_PATH):
            logger.error(f"❌ Firebase Admin SDK config not found at: {ADMIN_SDK_PATH}")
            raise HTTPException(status_code=500, detail="Firebase config not found")
        with open(ADMIN_SDK_PATH) as f:
            info = json.load(f)
        private_key = info["private_key"]
        client_email = info["client_email"]
        
        now = int(time.time())
        # Generate custom JWT token for Firebase access valid for 1 week (7 days)
        payload = {
            "iss": client_email,
            "sub": client_email,
            "aud": "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
            "uid": mac.strip().lower(),
            "iat": now,
            "exp": now + 7 * 24 * 3600, # 7 days (1 week) expiration
        }
        import jwt
        token = jwt.encode(payload, private_key, algorithm="RS256")
        
        logger.info(f"🔑 Generated Firebase JWT Token for authorized MAC: {mac}")
        return {
            "status": "success",
            "token": token,
            "expires_in": 7 * 24 * 3600
        }
    except Exception as e:
        logger.error(f"❌ Error generating Firebase token: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, mac: str = None):
    # If not passed as query param, check headers
    if not mac:
        mac = websocket.headers.get("x-esp32-mac")
        
    logger.info(f"🔌 Incoming WebSocket connection. MAC: {mac}")
    
    # Check authorization
    if not is_authorized_mac(mac):
        logger.warning(f"🔒 Unauthorized WebSocket connection attempt. MAC: {mac}")
        await websocket.accept()  # Accept to send error explanation, then close
        await websocket.send_json({"event": "error", "message": "Unauthorized MAC address"})
        await websocket.close(code=4001)
        return

    await websocket.accept()
    session_id = str(uuid.uuid4())
    logger.info(f"🔌 Client authorized and connected. MAC: {mac}, Session ID: {session_id}")

    # State tracking for clean finalization on disconnect
    session_state = {
        "user_text_acc": "",
        "model_text_acc": []
    }

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
            ),
            language_code="vi-VN"
        ),
        system_instruction=types.Content(
            parts=[types.Part.from_text(
                text="HỆ THỐNG YÊU CẦU BẮT BUỘC:\n"
                     "1. BẠN PHẢI LUÔN LUÔN PHÁT ÂM TIẾNG VIỆT VỚI GIỌNG CHUẨN MIỀN BẮC VIỆT NAM (GIỌNG HÀ NỘI). TUYỆT ĐỐI KHÔNG ĐƯỢC NÓI LƠ LỚ, KHÔNG GIẢ GIỌNG NƯỚC NGOÀI, VÀ KHÔNG ĐƯỢC CHUYỂN SANG TIẾNG ANH HOẶC NÓI ĐỆM TIẾNG ANH TRONG MỌI TRƯỜNG HỢP.\n"
                     "2. Bạn là trợ lý ảo thông minh tiếng Việt tên là 'Du'. Hãy trả lời cực kỳ ngắn gọn, tự nhiên, thân thiện và phát âm rõ ràng như đang hội thoại thực tế.\n"
                     "3. BẠN CÓ THỂ TRUY CẬP VÀO LỊCH SỬ ĐÀM THOẠI tự động trong cơ sở dữ liệu qua các công cụ 'get_conversation_history' và 'search_conversation_history' để nhớ chuyện cũ.\n"
                     "4. BẠN CÓ THỂ LƯU TRỮ, TRA CỨU, SỬA, XÓA THÔNG TIN RIÊNG của người dùng (sở thích, lịch trình, nhắc nhở...) vào một bảng lưu trữ riêng khi người dùng yêu cầu qua các công cụ: "
                     "'add_user_note', 'get_user_notes', 'search_user_notes', 'update_user_note', 'delete_user_note'. "
                     "Khi thực hiện các thao tác này, hãy thông báo lại kết quả chính xác cho người dùng bằng tiếng Việt giọng Bắc chuẩn."
            )]
        ),
        realtime_input_config=types.RealtimeInputConfig(
            activity_handling=types.ActivityHandling.NO_INTERRUPTION
        ),
        tools=[
            types.Tool(function_declarations=[
                # Nhóm 1: Tra cứu lịch sử hội thoại tự động (chat_history)
                types.FunctionDeclaration(
                    name="get_conversation_history",
                    description="Lấy danh sách các câu đàm thoại gần nhất (trí nhớ ngắn hạn) để tiếp tục hội thoại.",
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
                    description="Tìm kiếm từ khóa trong lịch sử đàm thoại của người dùng và trợ lý để tra cứu thông tin cũ.",
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
                # Nhóm 2: CRUD trên bảng thông tin/ghi chú riêng của người dùng (user_notes)
                types.FunctionDeclaration(
                    name="add_user_note",
                    description="Thêm một ghi chú hoặc lưu trữ thông tin (sở thích, công việc, lịch trình, ghi nhớ...) của người dùng theo yêu cầu của họ vào bảng riêng.",
                    parameters=types.Schema(
                        type=types.Type.OBJECT,
                        properties={
                            "topic": types.Schema(
                                type=types.Type.STRING,
                                description="Chủ đề hoặc tiêu đề ngắn của ghi chú (ví dụ: 'sở thích', 'cuộc hẹn', 'nhắc nhở')."
                            ),
                            "content": types.Schema(
                                type=types.Type.STRING,
                                description="Nội dung thông tin cần lưu trữ chi tiết."
                            )
                        },
                        required=["content"]
                    )
                ),
                types.FunctionDeclaration(
                    name="get_user_notes",
                    description="Lấy toàn bộ danh sách các thông tin ghi nhớ/ghi chú đã lưu của người dùng trong bảng riêng.",
                    parameters=types.Schema(
                        type=types.Type.OBJECT,
                        properties={
                            "limit": types.Schema(
                                type=types.Type.INTEGER,
                                description="Giới hạn số lượng ghi chú muốn lấy."
                            )
                        }
                    )
                ),
                types.FunctionDeclaration(
                    name="search_user_notes",
                    description="Tìm kiếm các thông tin ghi nhớ/ghi chú của người dùng theo từ khóa.",
                    parameters=types.Schema(
                        type=types.Type.OBJECT,
                        properties={
                            "query_text": types.Schema(
                                type=types.Type.STRING,
                                description="Từ khóa cần tìm trong các ghi chú."
                            )
                        },
                        required=["query_text"]
                    )
                ),
                types.FunctionDeclaration(
                    name="update_user_note",
                    description="Cập nhật hoặc sửa đổi một ghi chú đã lưu của người dùng theo ID ghi chú.",
                    parameters=types.Schema(
                        type=types.Type.OBJECT,
                        properties={
                            "note_id": types.Schema(
                                type=types.Type.INTEGER,
                                description="ID của ghi chú cần chỉnh sửa."
                            ),
                            "new_topic": types.Schema(
                                type=types.Type.STRING,
                                description="Chủ đề mới thay thế (tùy chọn)."
                            ),
                            "new_content": types.Schema(
                                type=types.Type.STRING,
                                description="Nội dung ghi chú mới thay thế (tùy chọn)."
                            )
                        },
                        required=["note_id"]
                    )
                ),
                types.FunctionDeclaration(
                    name="delete_user_note",
                    description="Xóa vĩnh viễn một ghi chú ra khỏi danh sách ghi nhớ của người dùng theo ID ghi chú.",
                    parameters=types.Schema(
                        type=types.Type.OBJECT,
                        properties={
                            "note_id": types.Schema(
                                type=types.Type.INTEGER,
                                description="ID của ghi chú cần xóa."
                            )
                        },
                        required=["note_id"]
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
                
                # Real-time audio pacing parameters
                start_time = None
                sent_duration = 0.0
                CHUNK_DURATION = CHUNK_SIZE / 48000.0 # 4096 bytes / 48000 bytes/sec = 0.085333s
                
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
                                elif name == "add_user_note":
                                    topic = args.get("topic", "Chung")
                                    content = args.get("content", "")
                                    result = add_user_note_tool(topic, content)
                                elif name == "get_user_notes":
                                    limit = args.get("limit", 50)
                                    result = get_user_notes_tool(limit)
                                elif name == "search_user_notes":
                                    query_text = args.get("query_text", "")
                                    result = search_user_notes_tool(query_text)
                                elif name == "update_user_note":
                                    note_id = int(args.get("note_id", 0))
                                    new_topic = args.get("new_topic", None)
                                    new_content = args.get("new_content", None)
                                    result = update_user_note_tool(note_id, new_topic, new_content)
                                elif name == "delete_user_note":
                                    note_id = int(args.get("note_id", 0))
                                    result = delete_user_note_tool(note_id)
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
                                start_time = None
                                sent_duration = 0.0
                                if session_state["model_text_acc"]:
                                    session_state["model_text_acc"].clear()
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
                                                
                                                if start_time is None:
                                                    start_time = asyncio.get_event_loop().time()
                                                
                                                # Send the chunk to the ESP32
                                                await websocket.send_bytes(chunk)
                                                sent_duration += CHUNK_DURATION
                                                
                                                # Perform adaptive pacing based on actual elapsed time
                                                now = asyncio.get_event_loop().time()
                                                elapsed = now - start_time
                                                # Maintain a 150ms lead cushion (approx 1.7 chunks) on client play queue
                                                target_play_time = sent_duration - 0.150
                                                if target_play_time > elapsed:
                                                    await asyncio.sleep(target_play_time - elapsed)
                                    elif part.text is not None:
                                        # Print or log the text response
                                        print(part.text, end="", flush=True)
                                        session_state["model_text_acc"].append(part.text)

                            # Turn complete
                            if server_content.turn_complete:
                                # Flush any remaining audio in the buffer
                                if audio_buffer:
                                    await websocket.send_bytes(bytes(audio_buffer))
                                    audio_buffer.clear()
                                print("\n🤖 [Turn Complete]")
                                start_time = None
                                sent_duration = 0.0
                                if session_state["model_text_acc"]:
                                    session_state["model_text_acc"].clear()
                                await websocket.send_json({"event": "turn_complete"})

                            # User input transcription check
                            if server_content.input_transcription is not None:
                                trans = server_content.input_transcription
                                if trans.text:
                                    session_state["user_text_acc"] = trans.text
                                    await websocket.send_json({"event": "user_transcription", "text": trans.text})

                                    # Check if the user wants to stop
                                    text_lower = trans.text.lower()
                                    if "dừng lại" in text_lower or "làm ơn dừng lại" in text_lower:
                                        logger.info("🛑 Emergency stop command detected in transcription! Muting speaker.")
                                        await websocket.send_json({"event": "interrupted"})

                                # Save user message to database on finalization
                                if trans.finished:
                                    if session_state["user_text_acc"]:
                                        logger.info(f"🎙️ [User transcription]: '{session_state['user_text_acc']}'")
                                        save_chat_message(session_id, "user", session_state["user_text_acc"])
                                        session_state["user_text_acc"] = "" # Reset for next turn

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
        # Flush any unsaved dialogue to SQLite before cleaning up on disconnect
        try:
            if session_state["user_text_acc"]:
                save_chat_message(session_id, "user", session_state["user_text_acc"])
            # We do not save model text responses into chat_history
            pass
        except Exception as e:
            logger.error(f"❌ Error during session state cleanup: {e}")
        logger.info("🔌 WebSocket connection closed and cleaned up.")

if __name__ == "__main__":
    logger.info(f"🚀 Starting esp32hub FastAPI server on http://0.0.0.0:{PORT}...")
    uvicorn.run(app, host="0.0.0.0", port=PORT)
