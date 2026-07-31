"""
myassitant/agent.py
GroupChatAgent — AI Agent cho từng nhóm chat Telegram.

Mỗi instance chạy trong thread riêng, phục vụ một group_id cụ thể.
Agentic loop tối đa 3 vòng để thu thập thông tin và trả lời.
"""
import os
import sys
import re
import json
import time
import threading
import httpx
from datetime import datetime
from typing import Optional, List, Dict, Any, Tuple

_DIR = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.dirname(_DIR)
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

from myassitant import db
from myassitant.config import (
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_BOT_USERNAME,
    GEMMA4_GENERATE_URL,
    HISTORY_CONTEXT_LIMIT,
    AGENT_MAX_LOOP,
    AGENT_SLEEP_INTERVAL,
    REMINDER_CHECK_INTERVAL,
    SYSTEM_PROMPT,
)
from myassitant.agent_tools import TOOL_DEFINITIONS, execute_tool

TELEGRAM_SEND_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"


# ─── Gửi message Telegram ────────────────────────────────────────────────────

def _send_telegram_message(chat_id: str, text: str, reply_to_message_id: Optional[int] = None):
    """Gửi message qua Telegram Bot API (sync)."""
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
    }
    if reply_to_message_id:
        payload["reply_to_message_id"] = reply_to_message_id

    try:
        with httpx.Client(timeout=15) as client:
            resp = client.post(TELEGRAM_SEND_URL, json=payload)
            if resp.status_code != 200:
                print(f"[Agent] Telegram send error {resp.status_code}: {resp.text[:200]}")
            return resp.json()
    except Exception as e:
        print(f"[Agent] Telegram send exception: {e}")
        return None


# ─── Build context từ lịch sử message ────────────────────────────────────────

def _build_context_text(group_id: str, limit: int = 5) -> str:
    """Xây dựng chuỗi context rút gọn từ các message gần nhất để làm ngữ cảnh tham khảo nhẹ."""
    recent = db.get_recent_processed_messages(group_id, limit)
    if not recent:
        return "(Chưa có lịch sử tin nhắn trước đó)"

    lines = []
    for i, msg in enumerate(recent, 1):
        sender = msg.get("from_full_name") or msg.get("from_username") or "Unknown"
        text = (msg.get("text") or "").strip()
        ts = msg.get("created_at", "")
        short_text = text[:150] + ("..." if len(text) > 150 else "")
        line = f"  [{ts}] {sender}: {short_text}"
        lines.append(line)

    return "\n".join(lines)


# ─── Gọi Gemma4 API ─────────────────────────────────────────────────────────

# ─── Gọi Gemma4 API ─────────────────────────────────────────────────────────

KNOWN_TOOLS = {
    "send_telegram_file", "execute_python_code", "execute_bash_script",
    "search_google", "db_search_messages", "db_search_notes", "db_list_reminders",
    "crawl_url", "read_file", "db_save_note", "db_set_reminder", "db_delete_reminder"
}


def _extract_tool_calls_from_text(text: str) -> Tuple[str, List[Dict]]:
    """
    Bóc tách các câu lệnh gọi hàm dạng [tool_code] ... [/tool_code],
    thẻ pseudo-tag [tool_name: {args}], hoặc text code mà Gemma4 tự sinh trong phần text phản hồi.
    """
    if not text:
        return text, []

    import ast
    import json
    import re

    tool_calls = []
    clean_text = text

    # 1. Bóc tách thẻ pseudo-tag dạng: [tool_name: {args}] hoặc [tool_name: args]
    tag_matches = re.findall(r'\[([a-zA-Z0-9_]+)\s*:\s*(\{[\s\S]*?\}|[\s\S]*?)\]', text)
    for tname, raw_args in tag_matches:
        if tname in KNOWN_TOOLS:
            args = {}
            raw_args_s = raw_args.strip()
            try:
                args = json.loads(raw_args_s)
            except Exception:
                try:
                    args = ast.literal_eval(raw_args_s)
                except Exception:
                    pairs = re.findall(r'([a-zA-Z0-9_]+)\s*:\s*[\"\']?([^,\"\'}]+)[\"\']?', raw_args_s)
                    args = {k.strip(): v.strip() for k, v in pairs}

            tool_calls.append({"name": tname, "args": args})
            clean_text = re.sub(rf'\[{tname}\s*:\s*[\s\S]*?\]', '', clean_text).strip()

    # 2. Pattern bóc tách khối [tool_code] ... [/tool_code] hoặc ```python ... ```
    if not tool_calls:
        tool_blocks = re.findall(r'(\[tool_code\][\s\S]*?\[/tool_code\]|```(?:python|tool_code|bash)?[\s\S]*?```)', text)

        for block in tool_blocks:
            inner = re.sub(r'\[/?tool_code\]', '', block)
            inner = re.sub(r'```(?:python|tool_code|bash)?', '', inner).replace('```', '').strip()

            for line in inner.split('\n'):
                line_s = line.strip()
                if line_s.startswith("print(") and line_s.endswith(")"):
                    line_s = line_s[6:-1].strip()

                for tool in KNOWN_TOOLS:
                    if tool in line_s and "(" in line_s:
                        try:
                            tree = ast.parse(line_s)
                            for node in ast.walk(tree):
                                if isinstance(node, ast.Call):
                                    func_name = None
                                    if isinstance(node.func, ast.Name):
                                        func_name = node.func.id
                                    if func_name in KNOWN_TOOLS:
                                        args = {}
                                        for kw in node.keywords:
                                            try:
                                                args[kw.arg] = ast.literal_eval(kw.value)
                                            except Exception:
                                                pass
                                        tool_calls.append({"name": func_name, "args": args})
                        except Exception:
                            pass

            clean_text = clean_text.replace(block, "").strip()

    # 3. Fallback cho trường hợp gọi trực tiếp không nằm trong tag: tool_name(...)
    if not tool_calls:
        for line in text.split('\n'):
            line_s = line.strip()
            if line_s.startswith("print(") and line_s.endswith(")"):
                line_s = line_s[6:-1].strip()
            for tool in KNOWN_TOOLS:
                if tool in line_s and "(" in line_s:
                    try:
                        tree = ast.parse(line_s)
                        for node in ast.walk(tree):
                            if isinstance(node, ast.Call):
                                func_name = None
                                if isinstance(node.func, ast.Name):
                                    func_name = node.func.id
                                if func_name in KNOWN_TOOLS:
                                    args = {}
                                    for kw in node.keywords:
                                        try:
                                            args[kw.arg] = ast.literal_eval(kw.value)
                                        except Exception:
                                            pass
                                    tool_calls.append({"name": func_name, "args": args})
                                    clean_text = clean_text.replace(line, "").strip()
                    except Exception:
                        pass

    return clean_text, tool_calls


def _call_gemma4(system_prompt: str, user_message: str, tools: List[Dict] = None) -> Dict:
    """
    Gọi local Gemma4 API.
    Trả về dict: {"text": "...", "tool_calls": [...]}
    """
    request_body = {
        "contents": [{"role": "user", "parts": [{"text": user_message}]}],
        "system_instruction": {"role": "system", "parts": [{"text": system_prompt}]},
        "generationConfig": {"temperature": 0.7, "maxOutputTokens": 1024},
    }

    if tools:
        request_body["tools"] = [{"function_declarations": tools}]

    try:
        with httpx.Client(timeout=120) as client:
            resp = client.post(GEMMA4_GENERATE_URL, json=request_body)
            resp.raise_for_status()
            data = resp.json()

        result_text = ""
        tool_calls = []

        candidates = data.get("candidates", [])
        if candidates:
            parts = candidates[0].get("content", {}).get("parts", [])
            for p in parts:
                if p.get("function_call"):
                    tool_calls.append(p["function_call"])
                elif p.get("text"):
                    result_text += p["text"]

        # Nếu không có JSON function call nhưng có mã text dạng [tool_code], tự bóc tách tool call
        if not tool_calls and result_text:
            clean_text, text_tool_calls = _extract_tool_calls_from_text(result_text)
            if text_tool_calls:
                result_text = clean_text
                tool_calls = text_tool_calls
                print(f"[Agent] Extracted {len(tool_calls)} text-based tool call(s) from Gemma4 response.")

        return {"text": result_text.strip(), "tool_calls": tool_calls}

    except Exception as e:
        print(f"[Agent] Gemma4 API error: {e}")
        return {"text": "", "tool_calls": [], "error": str(e)}


# ─── GroupChatAgent ───────────────────────────────────────────────────────────

class GroupChatAgent:
    """
    AI Agent cho một nhóm chat cụ thể.
    Chạy trong thread riêng, poll DB và trả lời message cần reply.
    """

    def __init__(self, group_id: str):
        self.group_id = group_id
        self.stop_event = threading.Event()
        self._thread: Optional[threading.Thread] = None
        self._last_reminder_check = 0.0
        self._lock = threading.Lock()
        self._semaphore = threading.Semaphore(1)  # Cập nhật 5: Semaphore Lock theo nhóm chat
        self._processing_msg_ids = set()

        # Thông tin nhóm
        groups = db.get_all_active_groups()
        self._group_info = next((g for g in groups if g["group_id"] == group_id), {})
        group_title = self._group_info.get("title", group_id)
        group_type = self._group_info.get("type", "group")
        print(f"[Agent:{group_id}] Initialized for '{group_title}' ({group_type})")

    def start(self):
        self._thread = threading.Thread(
            target=self._run_loop,
            name=f"agent-{self.group_id}",
            daemon=True
        )
        self._thread.start()

    def stop(self):
        self.stop_event.set()

    def is_alive(self) -> bool:
        return self._thread is not None and self._thread.is_alive()

    def _run_loop(self):
        """Main loop: poll → process → sleep."""
        print(f"[Agent:{self.group_id}] Loop started.")
        while not self.stop_event.is_set():
            try:
                self._process_pending_replies()
                self._check_reminders()
            except Exception as e:
                print(f"[Agent:{self.group_id}] Loop error: {e}")

            time.sleep(AGENT_SLEEP_INTERVAL)

        print(f"[Agent:{self.group_id}] Loop stopped.")

    def _process_pending_replies(self):
        """Xử lý tất cả message đang chờ chatbot trả lời."""
        pending = db.get_pending_reply_messages(self.group_id)
        if not pending:
            return

        for msg in pending:
            msg_db_id = msg["id"]
            if not self._semaphore.acquire(blocking=False):
                # Nhóm chat đang bận xử lý 1 message khác -> quay lại ở loop sau
                break
            try:
                with self._lock:
                    if msg_db_id in self._processing_msg_ids:
                        continue
                    # Atomic claim DB transition: is_chatbot_reply=1 -> 3
                    if not db.claim_pending_reply_message(msg_db_id):
                        continue
                    self._processing_msg_ids.add(msg_db_id)

                try:
                    self._handle_message(msg)
                except Exception as e:
                    print(f"[Agent:{self.group_id}] Error handling msg #{msg_db_id}: {e}")
                finally:
                    with self._lock:
                        self._processing_msg_ids.discard(msg_db_id)
                    db.update_message_chatbot_replied(msg_db_id)
            finally:
                self._semaphore.release()

    def _handle_message(self, msg: Dict):
        """Xử lý một message: agentic loop → reply → update DB."""
        msg_db_id = msg["id"]
        telegram_msg_id = msg.get("message_id")
        text = msg.get("text") or ""
        from_username = msg.get("from_username") or ""
        from_full_name = msg.get("from_full_name") or from_username or "bạn"
        user_id = msg.get("from_user_id")
        created_at = msg.get("created_at", "")

        print(f"[Agent:{self.group_id}] Processing msg #{msg_db_id} from @{from_username}: {text[:80]}")

        # Context từ lịch sử
        context_text = _build_context_text(self.group_id)

        # Lấy file summaries của message hiện tại
        files = db.get_files_of_message(msg_db_id)
        file_items = []
        raw_audio_texts = []
        for f in files:
            desc = f.get("description") or ""
            local_path = f.get("local_path") or ""
            desc = f.get("description") or ""
            ftype = f.get("file_type", "file")
            url = f.get("url") or f.get("local_path") or ""
            file_info_str = f"📎 [{ftype}]"
            if local_path:
                file_info_str += f" local_path: {local_path}"
            if desc:
                file_info_str += f" | {desc}"
            file_items.append(file_info_str)
            if ftype in ("audio", "voice", "video") and desc and not desc.startswith("[Lỗi") and not desc.startswith("[Không"):
                raw_audio_texts.append(desc)


        file_context = ""
        if file_items:
            file_context = (
                "\n\n### THÔNG TIN VÀ NỘI DUNG FILE ĐÍNH KÈM (ĐÃ ĐƯỢC TRÍCH XUẤT/TÓM TẮT SẴN):\n"
                + "\n".join(file_items)
                + "\n(Lưu ý: Nội dung file đính kèm trên đã được trích xuất sẵn. Bạn hãy trực tiếp sử dụng thông tin này để trả lời người dùng, KHÔNG CẦN gọi tool read_file trừ khi thực sự cần thiết).\n"
            )

        # reply_to context (Khi nhận message reply/quote, dùng nội dung cả 2 message: message được quote và current message)
        reply_context = ""
        reply_to_id = msg.get("reply_to_message_id")
        if reply_to_id:
            reply_msg = db.get_message_by_telegram_id(self.group_id, reply_to_id)
            if reply_msg:
                reply_sender = reply_msg.get("from_full_name") or reply_msg.get("from_username") or "Unknown"
                reply_user = reply_msg.get("from_username") or ""
                reply_text = reply_msg.get("text") or ""
                reply_ts = reply_msg.get("created_at", "")
                reply_files = reply_msg.get("file_summaries") or ""
                reply_context = (
                    f"\n\n### NỘI DUNG TIN NHẮN ĐƯỢC QUOTE / REPLY (Message #{reply_to_id}):\n"
                    f"[{reply_ts}] {reply_sender} (@{reply_user}): {reply_text}"
                )
                if reply_files:
                    reply_context += f"\n    📎 File tóm tắt: {reply_files}"
            else:
                # Fallback: Cố parse từ raw_json nếu message gốc chưa lưu trong DB
                raw_json = msg.get("raw_json")
                if raw_json:
                    try:
                        update_data = json.loads(raw_json)
                        m = update_data.get("message", {}) or update_data.get("edited_message", {})
                        r = m.get("reply_to_message", {})
                        if r:
                            r_from = r.get("from", {})
                            r_user = r_from.get("username", "")
                            r_name = f"{r_from.get('first_name', '')} {r_from.get('last_name', '')}".strip() or r_user or "Unknown"
                            r_text = r.get("text") or r.get("caption") or ""
                            reply_context = (
                                f"\n\n### NỘI DUNG TIN NHẮN ĐƯỢC QUOTE / REPLY (Message #{reply_to_id}):\n"
                                f"{r_name} (@{r_user}): {r_text}"
                            )
                    except Exception:
                        pass
                if not reply_context:
                    reply_context = f"\n\n(Người dùng đang reply/quote message_id={reply_to_id})"

        # Tag người dùng trong reply
        tag_user = f"@{from_username}" if from_username else from_full_name

        # Xây dựng system prompt với info nhóm
        now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
        group_title = self._group_info.get("title", self.group_id)
        group_type = self._group_info.get("type", "group")
        is_private = group_type == "private" or (self.group_id and int(self.group_id) > 0)

        if is_private:
            prompt_rules = SYSTEM_PROMPT.replace(
                "- Chỉ trả lời khi được tag trực tiếp hoặc được gọi tên trong tin nhắn mới nhất.",
                "- Bạn đang trò chuyện riêng 1-1 với người dùng: Hãy trả lời trực tiếp TẤT CẢ tin nhắn của người dùng (không yêu cầu người dùng phải tag hay gọi tên bot)."
            )
        else:
            prompt_rules = SYSTEM_PROMPT

        system_text = (
            prompt_rules
            + f"\n\nThông tin nhóm chat:\n- Tên nhóm: {group_title}\n"
            + f"- Loại: {group_type}\n- Thời gian hiện tại: {now_str}\n"
            + f"- {'Chat riêng 1-1' if is_private else 'Nhóm nhiều người'}"
        )

        # ── Agentic loop tối đa AGENT_MAX_LOOP vòng ──────────────────────────
        collected_tool_results = []
        final_reply = ""

        for loop_i in range(1, AGENT_MAX_LOOP + 1):
            # Xây dựng user prompt cho vòng hiện tại
            tool_results_str = ""
            if collected_tool_results:
                tool_results_str = "\n\n### KẾT QUẢ TỪ CÁC CÔNG CỤ ĐÃ DÙNG:\n"
                for tr in collected_tool_results:
                    tool_results_str += f"\n[{tr['tool']}]: {tr['result'][:1000]}"

            user_prompt = (
                f"### TIN NHẮN CẦN TRẢ LỜI (ƯU TIÊN HÀNG ĐẦU):\n"
                f"[{created_at}] {from_full_name} (@{from_username}): {text}\n"
                f"{reply_context}\n"
                f"{file_context}\n"
                f"{tool_results_str}\n\n"
                f"### TÓM TẮT LỊCH SỬ TRÒ CHUYỆN GẦN ĐÂY (THAM KHẢO RÚT GỌN):\n"
                f"{context_text}\n\n"
                f"### HƯỚNG DẪN XỬ LÝ:\n"
                f"- Tập trung phân tích và trả lời trực tiếp cho tin nhắn mới nhất, tin nhắn được quote/reply và các file đính kèm.\n"
                f"- Các công cụ khả dụng (Tool Calls):\n"
                f"  + `send_telegram_file`: BẮT BUỘC gọi tool này để gửi file (ảnh, pdf, icon, code, docx...) về lại Telegram cho người dùng sau khi đã tạo/chuyển đổi file xong.\n"
                f"  + `execute_python_code` / `execute_bash_script`: Sinh và chạy code/script (VD: ffmpeg convert ảnh, xử lý dữ liệu) khi người dùng yêu cầu.\n"
                f"  + `db_search_messages` / `db_search_notes` / `db_list_reminders`: Truy vấn CSDL SQLite khi cần thông tin cũ.\n"
                f"  + `search_google`: Tìm kiếm thông tin Google thời gian thực.\n"
                f"- LƯU Ý BẮT BUỘC: Nếu người dùng yêu cầu tạo file, convert ảnh/audio/video, hay gửi file, sau khi chạy lệnh tạo file xong, bạn PHẢI gọi tool `send_telegram_file` để gửi file đó lên Telegram. Tuyệt đối KHÔNG hứa 'Tôi sẽ gửi file ngay bây giờ' mà không thực hiện gọi tool `send_telegram_file`!\n"
                f"{'Nếu không cần dùng thêm tool, hãy đưa ra câu trả lời trực tiếp.' if loop_i > 1 else ''}"
                + (f"\nTag người dùng: {tag_user}" if not is_private else "")
            )

            result = _call_gemma4(
                system_prompt=system_text,
                user_message=user_prompt,
                tools=TOOL_DEFINITIONS if loop_i < AGENT_MAX_LOOP else None,  # Vòng cuối không dùng tool
            )

            # Xử lý tool calls
            if result.get("tool_calls"):
                for tc in result["tool_calls"]:
                    tool_name = tc.get("name", "")
                    tool_args = tc.get("args", {})
                    tool_result = execute_tool(
                        tool_name=tool_name,
                        args=tool_args,
                        group_id=self.group_id,
                        user_id=user_id,
                        username=from_username,
                    )
                    collected_tool_results.append({"tool": tool_name, "result": tool_result})
                    print(f"[Agent:{self.group_id}] Tool {tool_name} → {tool_result[:80]}")

                # Tiếp tục loop để dùng kết quả tool
                continue

            # Không có tool call → đây là câu trả lời cuối
            final_reply = result.get("text", "").strip()
            break

        # ── Kiểm tra và gửi reply ────────────────────────────────────────────
        if not final_reply:
            final_reply = "Em đã nhận tin nhắn nhưng chưa có câu trả lời phù hợp."

        # Bỏ qua nếu AI quyết định không cần reply
        if "[NO_REPLY]" in final_reply or final_reply.strip() == "[NO_REPLY]":
            print(f"[Agent:{self.group_id}] AI decided no reply needed for msg #{msg_db_id}")
            db.update_message_chatbot_replied(msg_db_id)
            return

        # Gửi reply với tag người dùng (nếu là nhóm)
        if not is_private and tag_user and tag_user not in final_reply:
            final_reply = f"{tag_user} {final_reply}"

        # Theo yêu cầu whattodo.md: audio/video cần trả thêm nguyên text lấy từ audio ra nằm sau content reply
        if raw_audio_texts:
            audio_suffix = "\n\n--- Nội dung văn bản từ Audio/Video ---\n" + "\n".join(raw_audio_texts)
            if len(final_reply) + len(audio_suffix) <= 4000:
                final_reply += audio_suffix
            else:
                max_avail = 3900 - len(final_reply)
                if max_avail > 50:
                    final_reply += audio_suffix[:max_avail]

        # Truncate nếu quá dài (Telegram limit 4096 chars)
        if len(final_reply) > 4000:
            final_reply = final_reply[:3950] + "\n...(Nội dung bị rút gọn)"


        send_result = _send_telegram_message(
            chat_id=self.group_id,
            text=final_reply,
            reply_to_message_id=telegram_msg_id,
        )

        if send_result and send_result.get("ok"):
            db.update_message_chatbot_replied(msg_db_id)
            print(f"[Agent:{self.group_id}] Replied to msg #{msg_db_id}: {final_reply[:80]}...")
        else:
            print(f"[Agent:{self.group_id}] Failed to send reply: {send_result}")

    def _check_reminders(self):
        """Kiểm tra và gửi reminder đến hạn cho nhóm này."""
        now = time.time()
        if now - self._last_reminder_check < REMINDER_CHECK_INTERVAL:
            return
        self._last_reminder_check = now

        due = db.get_due_reminders()
        for r in due:
            if r["group_id"] != self.group_id:
                continue
            username = r.get("username")
            tag = f"@{username}" if username else ""
            msg = f"⏰ Nhắc nhở {tag}: {r['message']}"
            _send_telegram_message(self.group_id, msg)
            db.mark_reminder_done(r["id"])
            print(f"[Agent:{self.group_id}] Sent reminder #{r['id']}: {r['message'][:60]}")
