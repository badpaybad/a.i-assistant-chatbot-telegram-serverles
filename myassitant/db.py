"""
myassitant/db.py
SQLite database layer — schema, init, CRUD helpers.

Tables:
  group_chat        — Thông tin nhóm chat (cả private 1-1 và group)
  message_of_group  — Lịch sử message của nhóm
  file_of_message   — File đính kèm theo message
  notes             — Ghi chú do người dùng yêu cầu chatbot lưu
  reminders         — Nhắc nhở tự động theo thời gian
"""
import sqlite3
import json
import os
import re
import threading
from datetime import datetime
from typing import Optional, List, Dict, Any

from myassitant.config import DB_PATH

# Thread-local connection pool
_local = threading.local()


def _regexp_func(pattern: str, text: str) -> int:
    """Hàm bổ trợ REGEXP cho SQLite (param1: pattern, param2: text column)."""
    if not text or not pattern:
        return 0
    try:
        return 1 if re.search(str(pattern), str(text), re.IGNORECASE) else 0
    except Exception as e:
        return 0






def get_conn() -> sqlite3.Connection:
    """Lấy connection SQLite thread-safe."""
    if not hasattr(_local, "conn") or _local.conn is None:
        conn = sqlite3.connect(DB_PATH, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA foreign_keys=ON")
        _local.conn = conn
    try:
        _local.conn.create_function("REGEXP", 2, _regexp_func)
    except Exception:
        pass
    return _local.conn




def init_db():
    """Khởi tạo toàn bộ schema SQLite."""
    conn = get_conn()
    cur = conn.cursor()

    cur.executescript("""
    -- ── 1. Nhóm chat ────────────────────────────────────────────────────────
    CREATE TABLE IF NOT EXISTS group_chat (
        group_id    TEXT PRIMARY KEY,       -- Telegram chat_id (âm = group, dương = private)
        title       TEXT,                   -- Tên nhóm hoặc username người dùng
        type        TEXT,                   -- "private" | "group" | "supergroup" | "channel"
        added_at    TEXT NOT NULL,          -- ISO-8601 datetime khi bot được add
        is_active   INTEGER DEFAULT 1       -- 1 = đang hoạt động, 0 = bot bị kick
    );

    -- ── 2. Message của nhóm ──────────────────────────────────────────────────
    CREATE TABLE IF NOT EXISTS message_of_group (
        id                  INTEGER PRIMARY KEY AUTOINCREMENT,
        group_id            TEXT NOT NULL,          -- FK → group_chat.group_id
        message_id          INTEGER NOT NULL,        -- Telegram message_id
        from_user_id        TEXT,
        from_username       TEXT,
        from_full_name      TEXT,
        text                TEXT,                   -- Nội dung text (có thể NULL nếu chỉ là file)
        created_at          TEXT NOT NULL,          -- ISO-8601
        is_chatbot_reply    INTEGER DEFAULT 0,      -- 0=không cần reply, 1=đang đợi reply, 2=đã reply
        is_processed        INTEGER DEFAULT 0,      -- 0=chưa xử lý file/link, 1=đã xử lý
        reply_to_message_id INTEGER,               -- message_id được quote/reply
        raw_json            TEXT,                   -- JSON toàn bộ update từ Telegram
        UNIQUE(group_id, message_id)
    );
    CREATE INDEX IF NOT EXISTS idx_msg_group_processed
        ON message_of_group(group_id, is_processed, created_at);
    CREATE INDEX IF NOT EXISTS idx_msg_group_reply
        ON message_of_group(group_id, is_chatbot_reply, created_at);

    -- ── 3. File đính kèm ────────────────────────────────────────────────────
    CREATE TABLE IF NOT EXISTS file_of_message (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        message_id_fk INTEGER NOT NULL,             -- FK → message_of_group.id (auto id)
        group_id    TEXT NOT NULL,
        file_id     TEXT,                           -- Telegram file_id
        file_type   TEXT,                           -- "photo"|"document"|"audio"|"video"|"voice"|"url"
        local_path  TEXT,                           -- Đường dẫn local sau khi download
        url         TEXT,                           -- URL nếu là link
        description TEXT,                           -- Tóm tắt nội dung từ Gemma4
        created_at  TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_file_msg ON file_of_message(message_id_fk);

    -- ── 4. Ghi chú ──────────────────────────────────────────────────────────
    CREATE TABLE IF NOT EXISTS notes (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        group_id    TEXT NOT NULL,
        user_id     TEXT,
        content     TEXT NOT NULL,
        tags        TEXT,                           -- JSON array of tags
        created_at  TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_notes_group ON notes(group_id, created_at);

    -- ── 5. Reminders ────────────────────────────────────────────────────────
    CREATE TABLE IF NOT EXISTS reminders (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        group_id    TEXT NOT NULL,
        user_id     TEXT,
        username    TEXT,
        message     TEXT NOT NULL,
        remind_at   TEXT NOT NULL,                  -- ISO-8601 datetime cần nhắc
        is_active   INTEGER DEFAULT 1,              -- 1=còn hiệu lực, 0=đã xử lý hoặc bị xóa
        created_at  TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_reminder_active ON reminders(is_active, remind_at);
    """)
    conn.commit()
    print(f"[DB] SQLite initialized at {DB_PATH}")


# ═══════════════════════════════════════════════════════════════════════════════
# group_chat
# ═══════════════════════════════════════════════════════════════════════════════

def upsert_group_chat(group_id: str, title: str, chat_type: str):
    """Thêm hoặc bỏ qua nhóm (không overwrite is_active nếu đã có)."""
    conn = get_conn()
    conn.execute("""
        INSERT INTO group_chat(group_id, title, type, added_at)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(group_id) DO UPDATE SET
            title = excluded.title,
            type  = excluded.type,
            is_active = 1
    """, (str(group_id), title, chat_type, _now()))
    conn.commit()


def set_group_active(group_id: str, is_active: int):
    conn = get_conn()
    conn.execute("UPDATE group_chat SET is_active=? WHERE group_id=?", (is_active, str(group_id)))
    conn.commit()


def get_all_active_groups() -> List[Dict]:
    conn = get_conn()
    rows = conn.execute("SELECT * FROM group_chat WHERE is_active=1").fetchall()
    return [dict(r) for r in rows]


# ═══════════════════════════════════════════════════════════════════════════════
# message_of_group
# ═══════════════════════════════════════════════════════════════════════════════

def insert_message(
    group_id: str,
    message_id: int,
    from_user_id: Optional[str],
    from_username: Optional[str],
    from_full_name: Optional[str],
    text: Optional[str],
    created_at: str,
    is_chatbot_reply: int,
    reply_to_message_id: Optional[int],
    raw_json: Optional[str],
) -> Optional[int]:
    """Thêm message mới. Trả về rowid hoặc None nếu đã tồn tại."""
    conn = get_conn()
    try:
        cur = conn.execute("""
            INSERT OR IGNORE INTO message_of_group
            (group_id, message_id, from_user_id, from_username, from_full_name,
             text, created_at, is_chatbot_reply, is_processed, reply_to_message_id, raw_json)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
        """, (str(group_id), message_id, from_user_id, from_username, from_full_name,
              text, created_at, is_chatbot_reply, reply_to_message_id, raw_json))
        conn.commit()
        return cur.lastrowid if cur.rowcount else None
    except Exception as e:
        print(f"[DB] insert_message error: {e}")
        return None


def get_recent_processed_messages(group_id: str, limit: int = 10) -> List[Dict]:
    """Lấy các message đã xử lý (is_processed=1) gần nhất của nhóm."""
    conn = get_conn()
    rows = conn.execute("""
        SELECT m.*, GROUP_CONCAT(f.file_type || ':' || COALESCE(f.description,''), '|') as file_summaries
        FROM message_of_group m
        LEFT JOIN file_of_message f ON f.message_id_fk = m.id
        WHERE m.group_id=? AND m.is_processed=1
        GROUP BY m.id
        ORDER BY m.created_at DESC
        LIMIT ?
    """, (str(group_id), limit)).fetchall()
    return [dict(r) for r in reversed(rows)]


def get_pending_reply_messages(group_id: str) -> List[Dict]:
    """Lấy các message cần chatbot trả lời (is_chatbot_reply=1 và đã xử lý file is_processed=1), sắp xếp theo thời gian."""
    conn = get_conn()
    rows = conn.execute("""
        SELECT * FROM message_of_group
        WHERE group_id=? AND is_chatbot_reply=1 AND is_processed=1
        ORDER BY created_at ASC
    """, (str(group_id),)).fetchall()
    return [dict(r) for r in rows]



def get_unprocessed_messages() -> List[Dict]:
    """Lấy tất cả message chưa xử lý file/link (is_processed=0) toàn hệ thống."""
    conn = get_conn()
    rows = conn.execute("""
        SELECT * FROM message_of_group WHERE is_processed=0
        ORDER BY created_at ASC
        LIMIT 50
    """).fetchall()
    return [dict(r) for r in rows]


def claim_pending_reply_message(msg_db_id: int) -> bool:
    """
    Atomic claim: Chuyển is_chatbot_reply từ 1 sang 3 (đang xử lý).
    Trả về True nếu claim thành công, False nếu luồng khác đã claim.
    """
    conn = get_conn()
    cur = conn.execute(
        "UPDATE message_of_group SET is_chatbot_reply=3 WHERE id=? AND is_chatbot_reply=1",
        (msg_db_id,)
    )
    conn.commit()
    return cur.rowcount > 0


def claim_unprocessed_message(msg_db_id: int) -> bool:
    """
    Atomic claim: Chuyển is_processed từ 0 sang 3 (đang xử lý file/link).
    Trả về True nếu claim thành công.
    """
    conn = get_conn()
    cur = conn.execute(
        "UPDATE message_of_group SET is_processed=3 WHERE id=? AND is_processed=0",
        (msg_db_id,)
    )
    conn.commit()
    return cur.rowcount > 0


def update_message_processed(msg_db_id: int):
    conn = get_conn()
    conn.execute("UPDATE message_of_group SET is_processed=1 WHERE id=?", (msg_db_id,))
    conn.commit()


def update_message_chatbot_replied(msg_db_id: int):
    conn = get_conn()
    conn.execute("UPDATE message_of_group SET is_chatbot_reply=2 WHERE id=?", (msg_db_id,))
    conn.commit()


def get_message_by_db_id(msg_db_id: int) -> Optional[Dict]:
    conn = get_conn()
    row = conn.execute("SELECT * FROM message_of_group WHERE id=?", (msg_db_id,)).fetchone()
    return dict(row) if row else None


def get_message_by_telegram_id(group_id: str, message_id: int) -> Optional[Dict]:
    """Lấy message theo telegram message_id trong nhóm."""
    conn = get_conn()
    rows = conn.execute("""
        SELECT m.*, GROUP_CONCAT(f.file_type || ':' || COALESCE(f.description,''), '|') as file_summaries
        FROM message_of_group m
        LEFT JOIN file_of_message f ON f.message_id_fk = m.id
        WHERE m.group_id=? AND m.message_id=?
        GROUP BY m.id
    """, (str(group_id), message_id)).fetchall()
    return dict(rows[0]) if rows else None


def search_messages(group_id: str, query: str, from_date: str = None, to_date: str = None, use_regex: bool = False) -> List[Dict]:
    """Tìm kiếm message trong nhóm theo nội dung, regex hoặc khoảng thời gian."""
    conn = get_conn()
    is_regex = use_regex or any(ch in query for ch in r".*+?^$[](){}\|")
    if is_regex:
        sql = "SELECT * FROM message_of_group WHERE group_id=? AND text REGEXP ?"
        params = [str(group_id), query]
    else:
        sql = "SELECT * FROM message_of_group WHERE group_id=? AND text LIKE ?"
        params = [str(group_id), f"%{query}%"]

    if from_date:
        sql += " AND created_at >= ?"
        params.append(from_date)
    if to_date:
        sql += " AND created_at <= ?"
        params.append(to_date)
    sql += " ORDER BY created_at DESC LIMIT 50"
    try:
        rows = conn.execute(sql, params).fetchall()
        return [dict(r) for r in rows]
    except Exception as e:
        print(f"[DB] search_messages error: {e}")
        # Fallback to simple LIKE
        sql_fallback = "SELECT * FROM message_of_group WHERE group_id=? AND text LIKE ? ORDER BY created_at DESC LIMIT 50"
        rows = conn.execute(sql_fallback, (str(group_id), f"%{query}%")).fetchall()
        return [dict(r) for r in rows]



# ═══════════════════════════════════════════════════════════════════════════════
# file_of_message
# ═══════════════════════════════════════════════════════════════════════════════

def insert_file(
    message_id_fk: int,
    group_id: str,
    file_id: Optional[str],
    file_type: str,
    local_path: Optional[str] = None,
    url: Optional[str] = None,
    description: Optional[str] = None,
) -> int:
    conn = get_conn()
    cur = conn.execute("""
        INSERT INTO file_of_message
        (message_id_fk, group_id, file_id, file_type, local_path, url, description, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (message_id_fk, str(group_id), file_id, file_type, local_path, url, description, _now()))
    conn.commit()
    return cur.lastrowid


def update_file_description(file_db_id: int, local_path: Optional[str], description: Optional[str]):
    conn = get_conn()
    conn.execute("""
        UPDATE file_of_message SET local_path=?, description=? WHERE id=?
    """, (local_path, description, file_db_id))
    conn.commit()


def get_file_description_by_path(local_path: str) -> Optional[str]:
    """Lấy description đã lưu của file từ local_path để tránh xử lý trùng."""
    if not local_path:
        return None
    conn = get_conn()
    row = conn.execute("""
        SELECT description FROM file_of_message
        WHERE (local_path=? OR url=?) AND description IS NOT NULL AND description NOT LIKE '[Đang xử lý%'
        ORDER BY id DESC LIMIT 1
    """, (local_path, local_path)).fetchone()
    return row["description"] if row else None


def get_files_of_message(message_id_fk: int) -> List[Dict]:
    conn = get_conn()
    rows = conn.execute(
        "SELECT * FROM file_of_message WHERE message_id_fk=?", (message_id_fk,)
    ).fetchall()
    return [dict(r) for r in rows]


# ═══════════════════════════════════════════════════════════════════════════════
# notes
# ═══════════════════════════════════════════════════════════════════════════════

def save_note(group_id: str, user_id: Optional[str], content: str, tags: List[str] = None) -> int:
    conn = get_conn()
    tags_json = json.dumps(tags or [], ensure_ascii=False)
    cur = conn.execute("""
        INSERT INTO notes(group_id, user_id, content, tags, created_at)
        VALUES (?, ?, ?, ?, ?)
    """, (str(group_id), user_id, content, tags_json, _now()))
    conn.commit()
    return cur.lastrowid


def search_notes(group_id: str, query: str) -> List[Dict]:
    conn = get_conn()
    rows = conn.execute("""
        SELECT * FROM notes WHERE group_id=? AND (content LIKE ? OR tags LIKE ?)
        ORDER BY created_at DESC LIMIT 20
    """, (str(group_id), f"%{query}%", f"%{query}%")).fetchall()
    return [dict(r) for r in rows]


def get_all_notes(group_id: str) -> List[Dict]:
    conn = get_conn()
    rows = conn.execute(
        "SELECT * FROM notes WHERE group_id=? ORDER BY created_at DESC LIMIT 50",
        (str(group_id),)
    ).fetchall()
    return [dict(r) for r in rows]


# ═══════════════════════════════════════════════════════════════════════════════
# reminders
# ═══════════════════════════════════════════════════════════════════════════════

def save_reminder(
    group_id: str, user_id: Optional[str], username: Optional[str],
    message: str, remind_at: str
) -> int:
    conn = get_conn()
    cur = conn.execute("""
        INSERT INTO reminders(group_id, user_id, username, message, remind_at, is_active, created_at)
        VALUES (?, ?, ?, ?, ?, 1, ?)
    """, (str(group_id), user_id, username, message, remind_at, _now()))
    conn.commit()
    return cur.lastrowid


def delete_reminder(reminder_id: int) -> bool:
    conn = get_conn()
    conn.execute("UPDATE reminders SET is_active=0 WHERE id=?", (reminder_id,))
    conn.commit()
    return True


def list_reminders(group_id: str, user_id: Optional[str] = None) -> List[Dict]:
    conn = get_conn()
    if user_id:
        rows = conn.execute("""
            SELECT * FROM reminders WHERE group_id=? AND user_id=? AND is_active=1
            ORDER BY remind_at ASC
        """, (str(group_id), user_id)).fetchall()
    else:
        rows = conn.execute("""
            SELECT * FROM reminders WHERE group_id=? AND is_active=1
            ORDER BY remind_at ASC
        """, (str(group_id),)).fetchall()
    return [dict(r) for r in rows]


def get_due_reminders() -> List[Dict]:
    """Lấy tất cả reminder đã đến hạn."""
    conn = get_conn()
    now = _now()
    rows = conn.execute("""
        SELECT * FROM reminders WHERE is_active=1 AND remind_at <= ?
        ORDER BY remind_at ASC
    """, (now,)).fetchall()
    return [dict(r) for r in rows]


def mark_reminder_done(reminder_id: int):
    conn = get_conn()
    conn.execute("UPDATE reminders SET is_active=0 WHERE id=?", (reminder_id,))
    conn.commit()


# ═══════════════════════════════════════════════════════════════════════════════
# Utilities
# ═══════════════════════════════════════════════════════════════════════════════

def _now() -> str:
    return datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S")


if __name__ == "__main__":
    init_db()
    print("DB initialized successfully.")
