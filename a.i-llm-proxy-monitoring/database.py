import sqlite3
import os
import json
from datetime import datetime, timedelta
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

def get_daily_detailed_token_usage(client_ip: str, client_mac: str) -> Dict[str, int]:
    today_str = datetime.now().strftime("%Y-%m-%d")
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT 
                COALESCE(SUM(input_tokens), 0) AS daily_input,
                COALESCE(SUM(output_tokens), 0) AS daily_output,
                COALESCE(SUM(total_tokens), 0) AS daily_total
            FROM llm_audit_log
            WHERE (client_mac = ? OR client_ip = ?)
               AND DATE(timestamp) = DATE(?)
               AND status_code = 200
        """, (client_mac, client_ip, today_str))
        row = cursor.fetchone()
        if row:
            return {
                "daily_input": int(row["daily_input"]),
                "daily_output": int(row["daily_output"]),
                "daily_total": int(row["daily_total"])
            }
        return {"daily_input": 0, "daily_output": 0, "daily_total": 0}

def get_daily_token_usage(client_ip: str, client_mac: str) -> int:
    return get_daily_detailed_token_usage(client_ip, client_mac)["daily_total"]

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

def get_paginated_logs(
    page: int = 1,
    page_size: int = 20,
    search: str = "",
    column_filters: Optional[Dict[str, str]] = None,
    sort_by: str = "id",
    sort_order: str = "desc"
) -> Dict[str, Any]:
    if page < 1:
        page = 1
    if page_size < 1:
        page_size = 20

    allowed_columns = {
        "id": "id",
        "timestamp": "timestamp",
        "client_ip": "client_ip",
        "client_mac": "client_mac",
        "machine_name": "machine_name",
        "provider": "provider",
        "model": "model",
        "endpoint": "endpoint",
        "status_code": "status_code",
        "action": "action",
        "input_tokens": "input_tokens",
        "output_tokens": "output_tokens",
        "total_tokens": "total_tokens",
        "latency_ms": "latency_ms",
        "error_message": "error_message"
    }

    col = allowed_columns.get(sort_by.lower(), "id")
    order = "ASC" if str(sort_order).lower() == "asc" else "DESC"

    where_clauses = []
    params: List[Any] = []

    # Global keyword search
    if search:
        search_like = f"%{search.strip()}%"
        where_clauses.append("""(
            client_ip LIKE ? OR client_mac LIKE ? OR machine_name LIKE ? OR
            provider LIKE ? OR model LIKE ? OR endpoint LIKE ? OR
            action LIKE ? OR error_message LIKE ?
        )""")
        params.extend([search_like] * 8)

    # Per-column filters
    if column_filters:
        for k, v in column_filters.items():
            if v and str(v).strip():
                val = str(v).strip()
                if k == "client":
                    where_clauses.append("(client_ip LIKE ? OR client_mac LIKE ?)")
                    params.extend([f"%{val}%", f"%{val}%"])
                elif k == "model":
                    where_clauses.append("(provider LIKE ? OR model LIKE ?)")
                    params.extend([f"%{val}%", f"%{val}%"])
                elif k == "notes":
                    where_clauses.append("(error_message LIKE ? OR endpoint LIKE ?)")
                    params.extend([f"%{val}%", f"%{val}%"])
                elif k in allowed_columns:
                    where_clauses.append(f"{allowed_columns[k]} LIKE ?")
                    params.append(f"%{val}%")

    where_sql = ("WHERE " + " AND ".join(where_clauses)) if where_clauses else ""

    with get_connection() as conn:
        cursor = conn.cursor()

        # Count total matching records
        cursor.execute(f"SELECT COUNT(*) AS total FROM llm_audit_log {where_sql}", tuple(params))
        total_row = cursor.fetchone()
        total = int(total_row["total"]) if total_row else 0

        total_pages = (total + page_size - 1) // page_size if total > 0 else 1
        if page > total_pages and total > 0:
            page = total_pages

        offset = (page - 1) * page_size
        query_sql = f"""
            SELECT id, timestamp, client_ip, client_mac, machine_name,
                   provider, model, endpoint, status_code, action,
                   input_tokens, output_tokens, total_tokens, latency_ms, error_message
            FROM llm_audit_log
            {where_sql}
            ORDER BY {col} {order}
            LIMIT ? OFFSET ?
        """
        cursor.execute(query_sql, tuple(params + [page_size, offset]))
        items = [dict(row) for row in cursor.fetchall()]

        return {
            "items": items,
            "total": total,
            "page": page,
            "page_size": page_size,
            "total_pages": total_pages
        }

def get_summary_stats() -> Dict[str, Any]:
    now = datetime.now()
    today_str = now.strftime("%Y-%m-%d")
    week_start_dt = now - timedelta(days=now.weekday())
    week_end_dt = week_start_dt + timedelta(days=6)
    week_start_str = week_start_dt.strftime("%Y-%m-%d")
    week_end_str = week_end_dt.strftime("%Y-%m-%d")
    month_str = now.strftime("%Y-%m")

    with get_connection() as conn:
        cursor = conn.cursor()
        
        # 1. Thống kê tổng hợp toàn hệ thống theo 4 mốc: Tất cả (All-Time), Hôm nay (Today), Tuần này (Week), Tháng này (Month)
        cursor.execute("""
            SELECT 
                COUNT(*) AS total_requests,
                COALESCE(SUM(CASE WHEN status_code = 200 THEN 1 ELSE 0 END), 0) AS successful_requests,
                COALESCE(SUM(CASE WHEN action LIKE 'BLOCKED%' THEN 1 ELSE 0 END), 0) AS blocked_requests,
                COALESCE(SUM(input_tokens), 0) AS total_input_tokens,
                COALESCE(SUM(output_tokens), 0) AS total_output_tokens,
                COALESCE(SUM(total_tokens), 0) AS total_tokens,

                COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN 1 ELSE 0 END), 0) AS today_requests,
                COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) AND status_code = 200 THEN 1 ELSE 0 END), 0) AS today_successful_requests,
                COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) AND action LIKE 'BLOCKED%' THEN 1 ELSE 0 END), 0) AS today_blocked_requests,
                COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN input_tokens ELSE 0 END), 0) AS today_input_tokens,
                COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN output_tokens ELSE 0 END), 0) AS today_output_tokens,
                COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN total_tokens ELSE 0 END), 0) AS today_tokens,

                COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) THEN 1 ELSE 0 END), 0) AS week_requests,
                COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) AND status_code = 200 THEN 1 ELSE 0 END), 0) AS week_successful_requests,
                COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) AND action LIKE 'BLOCKED%' THEN 1 ELSE 0 END), 0) AS week_blocked_requests,
                COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) THEN input_tokens ELSE 0 END), 0) AS week_input_tokens,
                COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) THEN output_tokens ELSE 0 END), 0) AS week_output_tokens,
                COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) THEN total_tokens ELSE 0 END), 0) AS week_tokens,

                COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? THEN 1 ELSE 0 END), 0) AS month_requests,
                COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? AND status_code = 200 THEN 1 ELSE 0 END), 0) AS month_successful_requests,
                COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? AND action LIKE 'BLOCKED%' THEN 1 ELSE 0 END), 0) AS month_blocked_requests,
                COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? THEN input_tokens ELSE 0 END), 0) AS month_input_tokens,
                COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? THEN output_tokens ELSE 0 END), 0) AS month_output_tokens,
                COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? THEN total_tokens ELSE 0 END), 0) AS month_tokens
            FROM llm_audit_log
        """, (
            today_str, today_str, today_str, today_str, today_str, today_str,
            week_start_str, week_end_str, week_start_str, week_end_str, week_start_str, week_end_str,
            week_start_str, week_end_str, week_start_str, week_end_str, week_start_str, week_end_str,
            month_str, month_str, month_str, month_str, month_str, month_str
        ))
        agg = dict(cursor.fetchone() or {})

        totals = {
            "total_requests": int(agg.get("total_requests", 0) or 0),
            "successful_requests": int(agg.get("successful_requests", 0) or 0),
            "blocked_requests": int(agg.get("blocked_requests", 0) or 0),
            "total_input_tokens": int(agg.get("total_input_tokens", 0) or 0),
            "total_output_tokens": int(agg.get("total_output_tokens", 0) or 0),
            "total_tokens": int(agg.get("total_tokens", 0) or 0),
            "today_date": today_str,
            "today_requests": int(agg.get("today_requests", 0) or 0),
            "today_successful_requests": int(agg.get("today_successful_requests", 0) or 0),
            "today_blocked_requests": int(agg.get("today_blocked_requests", 0) or 0),
            "today_input_tokens": int(agg.get("today_input_tokens", 0) or 0),
            "today_output_tokens": int(agg.get("today_output_tokens", 0) or 0),
            "today_tokens": int(agg.get("today_tokens", 0) or 0),
            "week_start": week_start_str,
            "week_end": week_end_str,
            "week_requests": int(agg.get("week_requests", 0) or 0),
            "week_successful_requests": int(agg.get("week_successful_requests", 0) or 0),
            "week_blocked_requests": int(agg.get("week_blocked_requests", 0) or 0),
            "week_input_tokens": int(agg.get("week_input_tokens", 0) or 0),
            "week_output_tokens": int(agg.get("week_output_tokens", 0) or 0),
            "week_tokens": int(agg.get("week_tokens", 0) or 0),
            "month": month_str,
            "month_requests": int(agg.get("month_requests", 0) or 0),
            "month_successful_requests": int(agg.get("month_successful_requests", 0) or 0),
            "month_blocked_requests": int(agg.get("month_blocked_requests", 0) or 0),
            "month_input_tokens": int(agg.get("month_input_tokens", 0) or 0),
            "month_output_tokens": int(agg.get("month_output_tokens", 0) or 0),
            "month_tokens": int(agg.get("month_tokens", 0) or 0),
        }

        today_summary = {
            "date": today_str,
            "total_requests": totals["today_requests"],
            "successful_requests": totals["today_successful_requests"],
            "blocked_requests": totals["today_blocked_requests"],
            "input_tokens": totals["today_input_tokens"],
            "output_tokens": totals["today_output_tokens"],
            "total_tokens": totals["today_tokens"],
        }

        week_summary = {
            "week_start": week_start_str,
            "week_end": week_end_str,
            "total_requests": totals["week_requests"],
            "successful_requests": totals["week_successful_requests"],
            "blocked_requests": totals["week_blocked_requests"],
            "input_tokens": totals["week_input_tokens"],
            "output_tokens": totals["week_output_tokens"],
            "total_tokens": totals["week_tokens"],
        }

        month_summary = {
            "month": month_str,
            "total_requests": totals["month_requests"],
            "successful_requests": totals["month_successful_requests"],
            "blocked_requests": totals["month_blocked_requests"],
            "input_tokens": totals["month_input_tokens"],
            "output_tokens": totals["month_output_tokens"],
            "total_tokens": totals["month_tokens"],
        }
        
        # 2. Thống kê theo từng Máy Trạm Mạng LAN (IP & MAC) với đủ 4 chỉ số: All-Time, Hôm nay, Tuần này, Tháng này
        cursor.execute("""
            SELECT client_ip, client_mac,
                   (SELECT machine_name FROM llm_audit_log sub WHERE sub.client_ip = l.client_ip ORDER BY id DESC LIMIT 1) AS machine_name,
                   COUNT(*) AS alltime_requests,
                   COALESCE(SUM(input_tokens), 0) AS alltime_input_tokens,
                   COALESCE(SUM(output_tokens), 0) AS alltime_output_tokens,
                   COALESCE(SUM(total_tokens), 0) AS alltime_tokens,

                   COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN 1 ELSE 0 END), 0) AS today_requests,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN input_tokens ELSE 0 END), 0) AS today_input_tokens,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN output_tokens ELSE 0 END), 0) AS today_output_tokens,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN total_tokens ELSE 0 END), 0) AS today_tokens,

                   COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) THEN 1 ELSE 0 END), 0) AS week_requests,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) THEN input_tokens ELSE 0 END), 0) AS week_input_tokens,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) THEN output_tokens ELSE 0 END), 0) AS week_output_tokens,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) THEN total_tokens ELSE 0 END), 0) AS week_tokens,

                   COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? THEN 1 ELSE 0 END), 0) AS month_requests,
                   COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? THEN input_tokens ELSE 0 END), 0) AS month_input_tokens,
                   COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? THEN output_tokens ELSE 0 END), 0) AS month_output_tokens,
                   COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? THEN total_tokens ELSE 0 END), 0) AS month_tokens,

                   COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN 1 ELSE 0 END), 0) AS req_count,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN total_tokens ELSE 0 END), 0) AS sum_tokens,
                   COALESCE(SUM(CASE WHEN action LIKE 'BLOCKED%' THEN 1 ELSE 0 END), 0) AS blocked_count,
                   (SELECT action FROM llm_audit_log sub WHERE (sub.client_ip = l.client_ip OR sub.client_mac = l.client_mac) AND sub.action LIKE 'BLOCKED%' ORDER BY id DESC LIMIT 1) AS last_violation_action,
                   (SELECT error_message FROM llm_audit_log sub WHERE (sub.client_ip = l.client_ip OR sub.client_mac = l.client_mac) AND sub.action LIKE 'BLOCKED%' ORDER BY id DESC LIMIT 1) AS last_violation_msg
            FROM llm_audit_log l
            GROUP BY client_ip, client_mac
            ORDER BY blocked_count DESC, today_tokens DESC, alltime_tokens DESC
        """, (
            today_str, today_str, today_str, today_str,
            week_start_str, week_end_str, week_start_str, week_end_str, week_start_str, week_end_str, week_start_str, week_end_str,
            month_str, month_str, month_str, month_str,
            today_str, today_str
        ))
        usage_by_client = [dict(row) for row in cursor.fetchall()]

        # 3. Thống kê theo từng Model AI với đủ 4 chỉ số: All-Time, Hôm nay, Tuần này, Tháng này
        cursor.execute("""
            SELECT model, provider,
                   COUNT(*) AS req_count,
                   COALESCE(SUM(total_tokens), 0) AS sum_tokens,
                   COUNT(*) AS alltime_requests,
                   COALESCE(SUM(input_tokens), 0) AS alltime_input_tokens,
                   COALESCE(SUM(output_tokens), 0) AS alltime_output_tokens,
                   COALESCE(SUM(total_tokens), 0) AS alltime_tokens,

                   COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN 1 ELSE 0 END), 0) AS today_requests,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN input_tokens ELSE 0 END), 0) AS today_input_tokens,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN output_tokens ELSE 0 END), 0) AS today_output_tokens,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) = DATE(?) THEN total_tokens ELSE 0 END), 0) AS today_tokens,

                   COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) THEN 1 ELSE 0 END), 0) AS week_requests,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) THEN input_tokens ELSE 0 END), 0) AS week_input_tokens,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) THEN output_tokens ELSE 0 END), 0) AS week_output_tokens,
                   COALESCE(SUM(CASE WHEN DATE(timestamp) >= DATE(?) AND DATE(timestamp) <= DATE(?) THEN total_tokens ELSE 0 END), 0) AS week_tokens,

                   COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? THEN 1 ELSE 0 END), 0) AS month_requests,
                   COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? THEN input_tokens ELSE 0 END), 0) AS month_input_tokens,
                   COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? THEN output_tokens ELSE 0 END), 0) AS month_output_tokens,
                   COALESCE(SUM(CASE WHEN strftime('%Y-%m', timestamp) = ? THEN total_tokens ELSE 0 END), 0) AS month_tokens
            FROM llm_audit_log
            GROUP BY model, provider
            ORDER BY alltime_tokens DESC, req_count DESC
        """, (
            today_str, today_str, today_str, today_str,
            week_start_str, week_end_str, week_start_str, week_end_str, week_start_str, week_end_str, week_start_str, week_end_str,
            month_str, month_str, month_str, month_str
        ))
        usage_by_model = [dict(row) for row in cursor.fetchall()]

        return {
            "totals": totals,
            "today": today_summary,
            "week": week_summary,
            "month": month_summary,
            "usage_by_client": usage_by_client,
            "usage_by_model": usage_by_model
        }


def get_daily_token_charts(from_date: Optional[str] = None, to_date: Optional[str] = None) -> Dict[str, Any]:
    """
    Thống kê dữ liệu biểu đồ (Charts tổng tokens) theo ngày:
    - Cho phép lọc từ ngày (from_date) đến ngày (to_date); mặc định không chọn để hiển thị tất cả (Show All).
    - Trả về:
      1. by_day: Tổng tất cả tokens (input, output, total) và requests theo từng ngày.
      2. by_pc & pc_series: Tổng số tokens theo ngày của từng PC (IP & MAC).
      3. by_model & model_series: Tổng số tokens theo ngày của từng Model A.I.
    """
    clean_from = (from_date or "").strip()
    clean_to = (to_date or "").strip()

    where_clauses: List[str] = []
    params: List[Any] = []

    if clean_from:
        where_clauses.append("DATE(timestamp) >= DATE(?)")
        params.append(clean_from)
    if clean_to:
        where_clauses.append("DATE(timestamp) <= DATE(?)")
        params.append(clean_to)

    where_sql = ("WHERE " + " AND ".join(where_clauses)) if where_clauses else ""

    with get_connection() as conn:
        cursor = conn.cursor()

        # Khoảng ngày nhỏ nhất / lớn nhất toàn bảng
        cursor.execute("""
            SELECT MIN(DATE(timestamp)) AS min_date,
                   MAX(DATE(timestamp)) AS max_date
            FROM llm_audit_log
        """)
        bounds_row = dict(cursor.fetchone() or {})
        min_date = bounds_row.get("min_date") or ""
        max_date = bounds_row.get("max_date") or ""

        # 1. Chart theo tổng tất cả theo ngày (by_day)
        cursor.execute(f"""
            SELECT DATE(timestamp) AS date,
                   COUNT(*) AS requests,
                   COALESCE(SUM(input_tokens), 0) AS input_tokens,
                   COALESCE(SUM(output_tokens), 0) AS output_tokens,
                   COALESCE(SUM(total_tokens), 0) AS total_tokens
            FROM llm_audit_log
            {where_sql}
            GROUP BY DATE(timestamp)
            ORDER BY DATE(timestamp) ASC
        """, tuple(params))
        by_day = []
        dates_set = set()
        for r in cursor.fetchall():
            row = dict(r)
            d = row.get("date") or ""
            if not d:
                continue
            dates_set.add(d)
            by_day.append({
                "date": d,
                "requests": int(row.get("requests", 0) or 0),
                "input_tokens": int(row.get("input_tokens", 0) or 0),
                "output_tokens": int(row.get("output_tokens", 0) or 0),
                "total_tokens": int(row.get("total_tokens", 0) or 0),
            })

        # 2. Chart theo từng PC là tổng số theo ngày của từng PC (by_pc)
        cursor.execute(f"""
            SELECT DATE(l.timestamp) AS date,
                   l.client_ip,
                   l.client_mac,
                   (SELECT sub.machine_name FROM llm_audit_log sub WHERE sub.client_ip = l.client_ip ORDER BY sub.id DESC LIMIT 1) AS machine_name,
                   COUNT(*) AS requests,
                   COALESCE(SUM(l.input_tokens), 0) AS input_tokens,
                   COALESCE(SUM(l.output_tokens), 0) AS output_tokens,
                   COALESCE(SUM(l.total_tokens), 0) AS total_tokens
            FROM llm_audit_log l
            {where_sql.replace('timestamp', 'l.timestamp') if where_sql else ''}
            GROUP BY DATE(l.timestamp), l.client_ip, l.client_mac
            ORDER BY DATE(l.timestamp) ASC, total_tokens DESC
        """, tuple(params))
        by_pc = []
        pc_map: Dict[str, Dict[str, Any]] = {}
        for r in cursor.fetchall():
            row = dict(r)
            d = row.get("date") or ""
            if not d:
                continue
            dates_set.add(d)
            cip = row.get("client_ip") or "-"
            cmac = row.get("client_mac") or "UNKNOWN_MAC"
            mname = row.get("machine_name") or cip
            reqs = int(row.get("requests", 0) or 0)
            in_tok = int(row.get("input_tokens", 0) or 0)
            out_tok = int(row.get("output_tokens", 0) or 0)
            tot_tok = int(row.get("total_tokens", 0) or 0)

            item = {
                "date": d,
                "client_ip": cip,
                "client_mac": cmac,
                "machine_name": mname,
                "requests": reqs,
                "input_tokens": in_tok,
                "output_tokens": out_tok,
                "total_tokens": tot_tok,
            }
            by_pc.append(item)

            pc_key = f"{cip}|{cmac}"
            if pc_key not in pc_map:
                label = f"{mname} ({cip})" if mname and mname != cip else cip
                pc_map[pc_key] = {
                    "pc_key": pc_key,
                    "label": label,
                    "client_ip": cip,
                    "client_mac": cmac,
                    "machine_name": mname,
                    "total_requests": 0,
                    "total_input_tokens": 0,
                    "total_output_tokens": 0,
                    "total_tokens": 0,
                    "daily": {}
                }
            pc_entry = pc_map[pc_key]
            pc_entry["total_requests"] += reqs
            pc_entry["total_input_tokens"] += in_tok
            pc_entry["total_output_tokens"] += out_tok
            pc_entry["total_tokens"] += tot_tok
            pc_entry["daily"][d] = {
                "requests": reqs,
                "input_tokens": in_tok,
                "output_tokens": out_tok,
                "total_tokens": tot_tok,
            }

        pc_series = sorted(
            pc_map.values(),
            key=lambda x: (x["total_tokens"], x["total_requests"]),
            reverse=True
        )

        # 3. Chart theo từng Model A.I là tổng số theo ngày của từng Model A.I (by_model)
        cursor.execute(f"""
            SELECT DATE(timestamp) AS date,
                   model,
                   provider,
                   COUNT(*) AS requests,
                   COALESCE(SUM(input_tokens), 0) AS input_tokens,
                   COALESCE(SUM(output_tokens), 0) AS output_tokens,
                   COALESCE(SUM(total_tokens), 0) AS total_tokens
            FROM llm_audit_log
            {where_sql}
            GROUP BY DATE(timestamp), model, provider
            ORDER BY DATE(timestamp) ASC, total_tokens DESC
        """, tuple(params))
        by_model = []
        model_map: Dict[str, Dict[str, Any]] = {}
        for r in cursor.fetchall():
            row = dict(r)
            d = row.get("date") or ""
            if not d:
                continue
            model_name = row.get("model") or "-"
            provider_name = row.get("provider") or "unknown"
            reqs = int(row.get("requests", 0) or 0)
            in_tok = int(row.get("input_tokens", 0) or 0)
            out_tok = int(row.get("output_tokens", 0) or 0)
            tot_tok = int(row.get("total_tokens", 0) or 0)

            # Bỏ qua control-plane ('-') nếu 0 token để biểu đồ Model AI không bị nhiễu
            if model_name in ("-", "unknown", "") and tot_tok == 0:
                continue

            dates_set.add(d)
            item = {
                "date": d,
                "model": model_name,
                "provider": provider_name,
                "requests": reqs,
                "input_tokens": in_tok,
                "output_tokens": out_tok,
                "total_tokens": tot_tok,
            }
            by_model.append(item)

            model_key = f"{provider_name}:{model_name}"
            if model_key not in model_map:
                model_map[model_key] = {
                    "model_key": model_key,
                    "label": f"{model_name} ({provider_name})",
                    "model": model_name,
                    "provider": provider_name,
                    "total_requests": 0,
                    "total_input_tokens": 0,
                    "total_output_tokens": 0,
                    "total_tokens": 0,
                    "daily": {}
                }
            m_entry = model_map[model_key]
            m_entry["total_requests"] += reqs
            m_entry["total_input_tokens"] += in_tok
            m_entry["total_output_tokens"] += out_tok
            m_entry["total_tokens"] += tot_tok
            m_entry["daily"][d] = {
                "requests": reqs,
                "input_tokens": in_tok,
                "output_tokens": out_tok,
                "total_tokens": tot_tok,
            }

        model_series = sorted(
            model_map.values(),
            key=lambda x: (x["total_tokens"], x["total_requests"]),
            reverse=True
        )

        dates = sorted(dates_set)

        return {
            "from_date": clean_from,
            "to_date": clean_to,
            "min_date": min_date,
            "max_date": max_date,
            "dates": dates,
            "by_day": by_day,
            "by_pc": by_pc,
            "pc_series": pc_series,
            "by_model": by_model,
            "model_series": model_series,
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
