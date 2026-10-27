import sqlite3
import os
import json
from datetime import datetime
from typing import Dict, Any, List, Optional

def get_db_path() -> str:
    env_path = os.getenv("DB_PATH")
    if env_path:
        return env_path
    data_dir_db = os.path.join(os.path.dirname(__file__), "data", "llm_audit.db")
    if os.path.exists(data_dir_db) or os.path.exists(os.path.join(os.path.dirname(__file__), "data")):
        return data_dir_db
    return os.path.join(os.path.dirname(__file__), "llm_audit.db")

def get_connection() -> sqlite3.Connection:
    db_file = get_db_path()
    db_dir = os.path.dirname(db_file)
    if db_dir and not os.path.exists(db_dir):
        os.makedirs(db_dir, exist_ok=True)
    conn = sqlite3.connect(db_file, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS llm_audit_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                client_ip TEXT NOT NULL,
                client_mac TEXT NOT NULL,
                machine_name TEXT,
                provider TEXT NOT NULL,
                model TEXT NOT NULL,
                endpoint TEXT NOT NULL,
                status_code INTEGER,
                action TEXT NOT NULL,
                input_tokens INTEGER DEFAULT 0,
                output_tokens INTEGER DEFAULT 0,
                total_tokens INTEGER DEFAULT 0,
                latency_ms INTEGER DEFAULT 0,
                error_message TEXT
            )
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_client_ip ON llm_audit_log(client_ip)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_client_mac ON llm_audit_log(client_mac)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_timestamp ON llm_audit_log(timestamp)")
        # Danh sách domain/IP cloud được tự động phát hiện khi có request đầu tiên
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS discovered_endpoints (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                kind TEXT NOT NULL,              -- llm | mcp
                provider TEXT NOT NULL,          -- google | anthropic | openai | copilot | <mcp server>
                domain TEXT NOT NULL,
                resolved_ips TEXT,
                transport TEXT,                  -- https | sse | websocket | wss | grpc | ...
                last_path TEXT,
                last_model TEXT,
                last_client_ip TEXT,
                last_machine TEXT,
                hit_count INTEGER DEFAULT 0,
                blocked_count INTEGER DEFAULT 0,
                first_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
                last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(kind, provider, domain)
            )
        """)
        # Bảng lưu trữ Ma Trận Phân Quyền (Policy Matrix) bền vững trong Database
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS policy_matrix (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                config_json TEXT NOT NULL,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()

def get_policy_from_db() -> Optional[Dict[str, Any]]:
    """Đọc ma trận chính sách phân quyền từ Database."""
    try:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT config_json FROM policy_matrix WHERE id = 1")
            row = cursor.fetchone()
            if row and row["config_json"]:
                return json.loads(row["config_json"])
    except Exception:
        pass
    return None

def save_policy_to_db(policy_data: Dict[str, Any]) -> None:
    """Lưu ma trận chính sách phân quyền vào Database (áp dụng ngay lập tức)."""
    json_str = json.dumps(policy_data, ensure_ascii=False)
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO policy_matrix (id, config_json, updated_at)
            VALUES (1, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(id) DO UPDATE SET
                config_json = excluded.config_json,
                updated_at = CURRENT_TIMESTAMP
        """, (json_str,))
        conn.commit()

def log_request(
    client_ip: str,
    client_mac: str,
    machine_name: str,
    provider: str,
    model: str,
    endpoint: str,
    status_code: int,
    action: str,
    input_tokens: int = 0,
    output_tokens: int = 0,
    latency_ms: int = 0,
    error_message: str = ""
) -> int:
    total_tokens = input_tokens + output_tokens
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO llm_audit_log (
                client_ip, client_mac, machine_name, provider, model,
                endpoint, status_code, action, input_tokens, output_tokens,
                total_tokens, latency_ms, error_message
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            client_ip, client_mac, machine_name, provider, model,
            endpoint, status_code, action, input_tokens, output_tokens,
            total_tokens, latency_ms, error_message
        ))
        conn.commit()
        return cursor.lastrowid

def get_daily_token_usage(client_ip: str, client_mac: str) -> int:
    today_str = datetime.now().strftime("%Y-%m-%d")
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT SUM(total_tokens) AS daily_sum
            FROM llm_audit_log
            WHERE (client_mac = ? OR client_ip = ?)
               AND DATE(timestamp) = DATE(?)
               AND status_code = 200
        """, (client_mac, client_ip, today_str))
        row = cursor.fetchone()
        if row and row["daily_sum"]:
            return int(row["daily_sum"])
        return 0

def get_recent_logs(limit: int = 100) -> List[Dict[str, Any]]:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, timestamp, client_ip, client_mac, machine_name,
                   provider, model, endpoint, status_code, action,
                   input_tokens, output_tokens, total_tokens, latency_ms, error_message
            FROM llm_audit_log
            ORDER BY id DESC
            LIMIT ?
        """, (limit,))
        return [dict(row) for row in cursor.fetchall()]

def get_summary_stats() -> Dict[str, Any]:
    today_str = datetime.now().strftime("%Y-%m-%d")
    with get_connection() as conn:
        cursor = conn.cursor()
        
        # Total counts
        cursor.execute("""
            SELECT 
                COUNT(*) AS total_requests,
                COALESCE(SUM(CASE WHEN status_code = 200 THEN 1 ELSE 0 END), 0) AS successful_requests,
                COALESCE(SUM(CASE WHEN action LIKE 'BLOCKED%' THEN 1 ELSE 0 END), 0) AS blocked_requests,
                COALESCE(SUM(input_tokens), 0) AS total_input_tokens,
                COALESCE(SUM(output_tokens), 0) AS total_output_tokens,
                COALESCE(SUM(total_tokens), 0) AS total_tokens
            FROM llm_audit_log
        """)
        totals = dict(cursor.fetchone() or {})
        
        # Usage by client IP & MAC with violation detection
        cursor.execute("""
            SELECT client_ip, client_mac,
                   (SELECT machine_name FROM llm_audit_log sub WHERE sub.client_ip = l.client_ip ORDER BY id DESC LIMIT 1) AS machine_name,
                   COUNT(*) AS req_count,
                   SUM(total_tokens) AS sum_tokens,
                   COALESCE(SUM(CASE WHEN action LIKE 'BLOCKED%' THEN 1 ELSE 0 END), 0) AS blocked_count,
                   (SELECT action FROM llm_audit_log sub WHERE (sub.client_ip = l.client_ip OR sub.client_mac = l.client_mac) AND sub.action LIKE 'BLOCKED%' ORDER BY id DESC LIMIT 1) AS last_violation_action,
                   (SELECT error_message FROM llm_audit_log sub WHERE (sub.client_ip = l.client_ip OR sub.client_mac = l.client_mac) AND sub.action LIKE 'BLOCKED%' ORDER BY id DESC LIMIT 1) AS last_violation_msg
            FROM llm_audit_log l
            WHERE DATE(timestamp) = DATE(?)
            GROUP BY client_ip, client_mac
            ORDER BY blocked_count DESC, sum_tokens DESC
        """, (today_str,))
        usage_by_client = [dict(row) for row in cursor.fetchall()]

        # Usage by model
        cursor.execute("""
            SELECT model, provider, COUNT(*) AS req_count, SUM(total_tokens) AS sum_tokens
            FROM llm_audit_log
            GROUP BY model, provider
            ORDER BY sum_tokens DESC
        """)
        usage_by_model = [dict(row) for row in cursor.fetchall()]

        return {
            "totals": totals,
            "usage_by_client": usage_by_client,
            "usage_by_model": usage_by_model
        }

def get_client_active_violation(client_ip: str, client_mac: str = "") -> Optional[Dict[str, Any]]:
    """
    Kiểm tra xem máy trạm (IP hoặc MAC) có vi phạm kiểm soát nào chưa được giải quyết hay không.
    Trả về dict { action, error_message, timestamp } nếu đang vi phạm, ngược lại None.
    """
    with get_connection() as conn:
        cursor = conn.cursor()
        conditions = []
        params = []
        if client_ip in ("127.0.0.1", "localhost") or client_mac == "LOCAL_HOST":
            conditions.append("(client_ip IN ('127.0.0.1', 'localhost') OR client_mac = 'LOCAL_HOST')")
        elif client_ip and client_ip != "-":
            conditions.append("client_ip = ?")
            params.append(client_ip)
        if client_mac and client_mac not in ("UNKNOWN_MAC", "LOCAL_HOST"):
            conditions.append("client_mac = ?")
            params.append(client_mac)
        if not conditions:
            return None
        where_clause = " OR ".join(conditions)
        cursor.execute(f"""
            SELECT action, error_message, timestamp
            FROM llm_audit_log
            WHERE ({where_clause})
              AND action LIKE 'BLOCKED_%'
            ORDER BY (CASE WHEN action = 'BLOCKED_VIOLATION_LOCK' THEN 1 ELSE 0 END) ASC, id DESC
            LIMIT 1
        """, params)
        row = cursor.fetchone()
        if row:
            return dict(row)
        return None

def resolve_client_violations(client_ip: str, client_mac: str = "") -> int:
    """Đánh dấu tất cả các bản ghi vi phạm cũ của máy trạm là đã giải quyết."""
    with get_connection() as conn:
        cursor = conn.cursor()
        conditions = []
        params = []
        if client_ip in ("127.0.0.1", "localhost") or client_mac == "LOCAL_HOST":
            conditions.append("(client_ip IN ('127.0.0.1', 'localhost') OR client_mac = 'LOCAL_HOST')")
        elif client_ip and client_ip != "-":
            conditions.append("client_ip = ?")
            params.append(client_ip)
        if client_mac and client_mac not in ("UNKNOWN_MAC", "LOCAL_HOST"):
            conditions.append("client_mac = ?")
            params.append(client_mac)
        if not conditions:
            return 0
        where_clause = " OR ".join(conditions)
        cursor.execute(f"""
            UPDATE llm_audit_log
            SET action = 'RESOLVED_' || action
            WHERE ({where_clause})
              AND action LIKE 'BLOCKED%'
        """, params)
        conn.commit()
        return cursor.rowcount

def record_discovery(
    kind: str,
    provider: str,
    domain: str,
    resolved_ips: str = "",
    transport: str = "",
    path: str = "",
    model: str = "",
    client_ip: str = "",
    machine: str = "",
    blocked: bool = False,
) -> bool:
    """Ghi nhận domain/IP cloud. Trả về True nếu đây là lần đầu phát hiện."""
    if not domain:
        return False
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id FROM discovered_endpoints WHERE kind=? AND provider=? AND domain=?",
            (kind, provider, domain),
        )
        row = cursor.fetchone()
        if row:
            cursor.execute("""
                UPDATE discovered_endpoints SET
                    resolved_ips = COALESCE(NULLIF(?, ''), resolved_ips),
                    transport = COALESCE(NULLIF(?, ''), transport),
                    last_path = ?, last_model = COALESCE(NULLIF(?, ''), last_model),
                    last_client_ip = ?, last_machine = ?,
                    hit_count = hit_count + 1,
                    blocked_count = blocked_count + ?,
                    last_seen = CURRENT_TIMESTAMP
                WHERE id = ?
            """, (resolved_ips, transport, path, model, client_ip, machine, 1 if blocked else 0, row["id"]))
            conn.commit()
            return False
        cursor.execute("""
            INSERT INTO discovered_endpoints (
                kind, provider, domain, resolved_ips, transport, last_path, last_model,
                last_client_ip, last_machine, hit_count, blocked_count
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
        """, (kind, provider, domain, resolved_ips, transport, path, model, client_ip, machine, 1 if blocked else 0))
        conn.commit()
        return True

def get_discoveries() -> List[Dict[str, Any]]:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM discovered_endpoints ORDER BY last_seen DESC")
        return [dict(r) for r in cursor.fetchall()]

def delete_discovery(discovery_id: int) -> None:
    with get_connection() as conn:
        conn.execute("DELETE FROM discovered_endpoints WHERE id = ?", (discovery_id,))
        conn.commit()

def reset_audit_logs(reset_discoveries: bool = False) -> Dict[str, Any]:
    """Xóa toàn bộ bản ghi audit log và đặt lại tất cả bộ đếm tokens để tính lại từ đầu (0).
    Nếu reset_discoveries=True, cũng sẽ xóa cả danh sách domain/endpoint đã auto-discovery."""
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*), COALESCE(SUM(total_tokens), 0) FROM llm_audit_log")
        row = cursor.fetchone()
        deleted_logs = int(row[0]) if row and row[0] is not None else 0
        deleted_tokens = int(row[1]) if row and row[1] is not None else 0

        cursor.execute("DELETE FROM llm_audit_log")
        try:
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='llm_audit_log'")
        except sqlite3.OperationalError:
            pass

        deleted_disc = 0
        if reset_discoveries:
            try:
                cursor.execute("SELECT COUNT(*) FROM discovered_endpoints")
                r = cursor.fetchone()
                deleted_disc = int(r[0]) if r and r[0] is not None else 0
                cursor.execute("DELETE FROM discovered_endpoints")
                cursor.execute("DELETE FROM sqlite_sequence WHERE name='discovered_endpoints'")
            except sqlite3.OperationalError:
                pass

        conn.commit()
        try:
            conn.execute("VACUUM")
        except Exception:
            pass

        return {
            "deleted_logs": deleted_logs,
            "deleted_tokens": deleted_tokens,
            "deleted_discoveries": deleted_disc,
            "message": "Đã reset toàn bộ audit logs và bộ đếm tokens về 0 thành công."
        }
