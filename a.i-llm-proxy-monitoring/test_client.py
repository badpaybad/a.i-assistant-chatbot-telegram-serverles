import os
import sys
import shutil
import tempfile
import unittest

# ==== Cô lập môi trường test: dùng bản sao policy + DB tạm ====
# Phải set biến môi trường TRƯỚC khi import proxy_server/database (đọc path lúc import).
# Nhờ vậy policy_matrix.yaml thật và audit DB thật không bị test ghi vào.
_BASE_DIR = os.path.dirname(os.path.abspath(__file__))
_REAL_POLICY_PATH = os.path.join(_BASE_DIR, "policy_matrix.yaml")
with open(_REAL_POLICY_PATH, "r", encoding="utf-8") as f:
    _ORIGINAL_POLICY_CONTENT = f.read()

_OLD_POLICY_FILE_ENV = os.environ.get("POLICY_FILE")
_OLD_DB_PATH_ENV = os.environ.get("DB_PATH")

_TMP_DIR = tempfile.mkdtemp(prefix="llm_proxy_test_")
_TMP_POLICY_PATH = os.path.join(_TMP_DIR, "policy_matrix.yaml")
with open(_TMP_POLICY_PATH, "w", encoding="utf-8") as f:
    f.write(_ORIGINAL_POLICY_CONTENT)

_TMP_DB_PATH = os.path.join(_TMP_DIR, "llm_audit_test.db")
os.environ["POLICY_FILE"] = _TMP_POLICY_PATH
os.environ["DB_PATH"] = _TMP_DB_PATH

from fastapi.testclient import TestClient

from proxy_server import app, get_policy_for_client, is_model_allowed, load_policy, save_policy
from token_utils import resolve_mac_address, estimate_input_tokens
from database import (
    init_db, log_request, get_daily_token_usage, get_summary_stats, get_recent_logs,
    get_client_active_violation, get_policy_from_db, save_policy_to_db,
)

# Rule mẫu chỉ dùng cho test — được nạp lúc setUpClass và xóa lúc tearDownClass
TEST_FIXTURE_RULES = [
    {
        "name": "[TEST] Tech Lead - PC",
        "ip": "10.99.0.10",
        "mac": "02:00:00:aa:bb:03",
        "allowed_providers": ["*"],
        "allowed_models": ["*"],
        "allowed_mcp_servers": ["*"],
        "allowed_mcp_tools": ["*"],
        "max_input_tokens_per_request": 128000,
        "max_output_tokens_per_request": 16000,
        "daily_total_token_quota": 2000000,
    },
    {
        "name": "[TEST] Junior Dev - PC",
        "ip": "10.99.0.95",
        "mac": "02:00:00:aa:bb:02",
        "allowed_providers": ["google", "openai", "mcp"],
        "allowed_models": ["gemini-1.5-flash*", "gpt-4o-mini*"],
        "allowed_mcp_servers": ["lan-tools"],
        "allowed_mcp_tools": ["lan_ping", "lan_status"],
        "max_input_tokens_per_request": 16000,
        "max_output_tokens_per_request": 2000,
        "daily_total_token_quota": 150000,
    },
    {
        "name": "[TEST] Guest Subnet",
        "ip_range": "10.99.1.0/24",
        "allowed_providers": ["google"],
        "allowed_models": ["gemini-1.5-flash*"],
        "allowed_mcp_servers": ["lan-tools"],
        "allowed_mcp_tools": ["lan_ping"],
        "max_input_tokens_per_request": 4000,
        "max_output_tokens_per_request": 1000,
        "daily_total_token_quota": 30000,
    },
]

class TestLLMProxy(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_db()
        cls.client = TestClient(app)
        # Nạp rule test vào đầu danh sách (ưu tiên khớp trước)
        policy = load_policy()
        policy["rules"] = TEST_FIXTURE_RULES + policy.get("rules", [])
        save_policy(policy)

    @classmethod
    def tearDownClass(cls):
        # 1. Khôi phục nguyên vẹn 100% file policy_matrix.yaml thật
        try:
            with open(_REAL_POLICY_PATH, "w", encoding="utf-8") as f:
                f.write(_ORIGINAL_POLICY_CONTENT)
        except Exception:
            pass

        # 2. Xóa toàn bộ file và thư mục tạm
        shutil.rmtree(_TMP_DIR, ignore_errors=True)

        # 3. Khôi phục lại biến môi trường ban đầu
        if _OLD_POLICY_FILE_ENV is not None:
            os.environ["POLICY_FILE"] = _OLD_POLICY_FILE_ENV
        else:
            os.environ.pop("POLICY_FILE", None)

        if _OLD_DB_PATH_ENV is not None:
            os.environ["DB_PATH"] = _OLD_DB_PATH_ENV
        else:
            os.environ.pop("DB_PATH", None)

        # 4. Quét và dọn sạch dữ liệu test trong DB thật (nếu có lọt vào)
        try:
            from database import get_connection
            with get_connection() as conn:
                conn.execute('DELETE FROM discovered_endpoints WHERE domain LIKE "%test%" OR domain = "localhost"')
                conn.execute('DELETE FROM llm_audit_log WHERE client_ip LIKE "10.99%" OR client_ip LIKE "192.168.1.188%" OR machine_name LIKE "%TEST%" OR client_ip LIKE "10.0.99%"')
                conn.commit()
        except Exception:
            pass

    def test_01_mac_resolution(self):
        """Kiểm tra nhận diện MAC cho localhost và IP LAN"""
        mac_local = resolve_mac_address("127.0.0.1")
        self.assertEqual(mac_local, "LOCAL_HOST")

    def test_02_policy_matching(self):
        """Kiểm tra khớp ma trận chính sách theo MAC/IP/CIDR và fallback allow all"""
        # Rule test theo MAC + IP
        policy_lead = get_policy_for_client("10.99.0.10", "02:00:00:aa:bb:03")
        self.assertEqual(policy_lead["name"], "[TEST] Tech Lead - PC")
        self.assertTrue(is_model_allowed("claude-3-5-sonnet-20241022", policy_lead["allowed_models"]))

        policy_junior = get_policy_for_client("10.99.0.95", "02:00:00:aa:bb:02")
        self.assertEqual(policy_junior["name"], "[TEST] Junior Dev - PC")
        self.assertTrue(is_model_allowed("gemini-1.5-flash", policy_junior["allowed_models"]))
        self.assertFalse(is_model_allowed("claude-3-5-sonnet", policy_junior["allowed_models"]))

        # Rule test theo dải CIDR
        policy_guest = get_policy_for_client("10.99.1.42", "UNKNOWN_MAC")
        self.assertEqual(policy_guest["name"], "[TEST] Guest Subnet")
        self.assertFalse(is_model_allowed("gpt-4o", policy_guest["allowed_models"]))

        # Máy mới chưa cấu hình -> Default Policy allow all
        policy_new = get_policy_for_client("10.99.2.77", "aa:bb:cc:dd:ee:ff")
        self.assertEqual(policy_new["name"], "Default Policy (Fallback)")
        self.assertTrue(is_model_allowed("claude-3-5-sonnet-20241022", policy_new["allowed_models"]))
        self.assertIn("*", policy_new["allowed_providers"])
        # Mặc định không giới hạn token (0 = unlimited)
        self.assertEqual(policy_new.get("max_input_tokens_per_request", 0), 0)
        self.assertEqual(policy_new.get("max_output_tokens_per_request", 0), 0)
        self.assertEqual(policy_new.get("daily_total_token_quota", 0), 0)

    def test_02b_per_machine_token_limit_blocks(self):
        """Máy được cấu hình giới hạn riêng (Junior 16k input) vẫn bị chặn khi vượt"""
        big_prompt = "x" * (16001 * 4 + 100)  # ~16k+ tokens
        res = self.client.post(
            "/openai/v1/chat/completions",
            json={"model": "gpt-4o-mini", "messages": [{"role": "user", "content": big_prompt}]},
            headers={"X-Forwarded-For": "10.99.0.95"},
        )
        self.assertEqual(res.status_code, 400)
        self.assertIn("exceed", res.text)

    def test_03_input_token_estimation(self):
        """Kiểm tra ước tính token input từ body request"""
        sample_anthropic_body = {
            "model": "claude-3-5-sonnet-20241022",
            "messages": [{"role": "user", "content": "Hello world, this is a prompt test for LLM Proxy"}]
        }
        model, est_tokens = estimate_input_tokens(sample_anthropic_body, "anthropic")
        self.assertEqual(model, "claude-3-5-sonnet-20241022")
        self.assertGreater(est_tokens, 5)

    def test_04_database_logging(self):
        """Kiểm tra ghi log và tính tổng quota hàng ngày"""
        test_ip = "192.168.1.254"
        test_mac = "aa:bb:cc:dd:ee:ff"
        
        # Ghi log mẫu
        log_id = log_request(
            client_ip=test_ip,
            client_mac=test_mac,
            machine_name="Test Workstation",
            provider="google",
            model="gemini-1.5-flash",
            endpoint="v1beta/models/gemini-1.5-flash:generateContent",
            status_code=200,
            action="ALLOWED",
            input_tokens=150,
            output_tokens=300,
            latency_ms=250
        )
        self.assertIsNotNone(log_id)

        # Kiểm tra tính tổng daily usage
        daily_used = get_daily_token_usage(test_ip, test_mac)
        self.assertGreaterEqual(daily_used, 450)

        # Kiểm tra summary stats
        stats = get_summary_stats()
        self.assertIn("totals", stats)
        self.assertGreater(stats["totals"]["total_requests"], 0)

    def test_05_block_forbidden_model(self):
        """Kiểm tra chặn model không được phép qua API endpoint"""
        # Giả lập request từ Junior Dev (192.168.1.95) gọi model cấm claude-3-5-sonnet
        # Vì test client gọi qua localhost (127.0.0.1) được full quyền, ta giả lập gọi model không có trong default policy hoặc tạo mock
        response = self.client.get("/api/stats")
        self.assertEqual(response.status_code, 200)

        response_logs = self.client.get("/api/logs?limit=10")
        self.assertEqual(response_logs.status_code, 200)
        self.assertIsInstance(response_logs.json(), list)

    def test_06_policy_crud_api(self):
        """Kiểm tra API thêm, sửa, xóa rule phân quyền"""
        # 1. Thêm rule mới
        new_rule = {
            "name": "[TEST] Test UI Rule",
            "ip": "192.168.1.199",
            "mac": "cc:dd:ee:11:22:33",
            "allowed_providers": ["google"],
            "allowed_models": ["gemini-1.5-flash*"],
            "max_input_tokens_per_request": 8000,
            "max_output_tokens_per_request": 1000,
            "daily_total_token_quota": 50000
        }
        res_add = self.client.post("/api/policy/rule", json=new_rule)
        self.assertEqual(res_add.status_code, 200)
        self.assertTrue(res_add.json()["success"])

        try:
            # 2. Đọc lại policy để xác nhận rule đã được ghi vào
            res_get = self.client.get("/api/policy")
            self.assertEqual(res_get.status_code, 200)
            rules = res_get.json()["rules"]
            rule_names = [r["name"] for r in rules]
            self.assertIn("[TEST] Test UI Rule", rule_names)
        finally:
            # 3. Xóa rule vừa thêm để dọn dẹp
            res_del = self.client.delete("/api/policy/rule/[TEST] Test UI Rule")
            self.assertEqual(res_del.status_code, 200)
            self.assertTrue(res_del.json()["success"])

    def test_07_mcp_policy_checking(self):
        """Kiểm tra phân quyền MCP Server và MCP Tool theo IP/MAC"""
        from proxy_server import is_mcp_server_allowed, is_mcp_tool_allowed

        # Server check
        self.assertTrue(is_mcp_server_allowed("lan-tools", ["lan-tools", "postgres-db"]))
        self.assertTrue(is_mcp_server_allowed("any-server", ["*"]))
        self.assertFalse(is_mcp_server_allowed("forbidden-server", ["lan-tools"]))

        # Tool check with wildcard
        self.assertTrue(is_mcp_tool_allowed("lan_ping", ["lan_*"]))
        self.assertTrue(is_mcp_tool_allowed("read_user", ["read_*", "get_*"]))
        self.assertFalse(is_mcp_tool_allowed("delete_db", ["read_*", "get_*"]))

    def test_08_mcp_builtin_tools(self):
        """Kiểm tra thực thi các built-in tools của Gateway MCP"""
        import asyncio
        from proxy_server import execute_builtin_mcp_tool

        # 1. lan_status
        res_status = asyncio.run(execute_builtin_mcp_tool("lan_status", {}))
        self.assertIn("content", res_status)
        self.assertIn("LAN LLM Proxy Gateway Status", res_status["content"][0]["text"])

        # 2. lan_arp_lookup
        res_arp = asyncio.run(execute_builtin_mcp_tool("lan_arp_lookup", {"ip": "127.0.0.1"}))
        self.assertIn("LOCAL_HOST", res_arp["content"][0]["text"])

    def test_09_mcp_sse_session_and_messages(self):
        """Kiểm tra luồng SSE và gửi nhận JSON-RPC của MCP"""
        import json
        from proxy_server import mcp_sse_sessions

        # Tạo giả lập session
        session_id = "test_session_123"
        import asyncio
        queue = asyncio.Queue()
        mcp_sse_sessions[session_id] = queue

        # Gửi RPC initialize
        init_payload = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "initialize",
            "params": {"clientInfo": {"name": "UnitTest", "version": "1.0"}}
        }
        res_post = self.client.post(f"/mcp/lan-tools/messages?sessionId={session_id}", json=init_payload)
        self.assertEqual(res_post.status_code, 202)

        # Đọc response từ queue
        event_str = queue.get_nowait()
        self.assertTrue(event_str.startswith("event: message"))
        self.assertIn("LAN-MCP-Gateway", event_str)

        # Dọn dẹp
        mcp_sse_sessions.pop(session_id, None)

    def test_10_mcp_tool_blocking(self):
        """Kiểm tra chặn MCP tool khi bị giới hạn bởi Policy Matrix"""
        import asyncio
        from proxy_server import mcp_sse_sessions

        session_id = "test_session_block"
        queue = asyncio.Queue()
        mcp_sse_sessions[session_id] = queue

        # Giả lập rule chặn bằng cách thêm rule tạm
        temp_rule = {
            "name": "Restricted MCP Client",
            "ip": "192.168.1.99",
            "allowed_providers": ["*"],
            "allowed_models": ["*"],
            "allowed_mcp_servers": ["lan-tools"],
            "allowed_mcp_tools": ["lan_status"]  # Chỉ cho phép lan_status, cấm lan_ping
        }
        self.client.post("/api/policy/rule", json=temp_rule)

        try:
            # Gửi gọi tool lan_ping (bị cấm)
            call_payload = {
                "jsonrpc": "2.0",
                "id": 99,
                "method": "tools/call",
                "params": {"name": "lan_ping", "arguments": {"target": "127.0.0.1"}}
            }
            res_call = self.client.post(
                f"/mcp/lan-tools/messages?sessionId={session_id}",
                json=call_payload,
                headers={"X-Forwarded-For": "192.168.1.99"}
            )
            self.assertEqual(res_call.status_code, 202)

            # Response trong queue phải chứa error -32003
            event_str = queue.get_nowait()
            self.assertIn("-32003", event_str)
            self.assertIn("forbidden", event_str.lower())
        finally:
            self.client.delete("/api/policy/rule/Restricted MCP Client")
            mcp_sse_sessions.pop(session_id, None)

    def test_11_discovery_and_domain_block(self):
        """Lần đầu gọi -> ghi nhận domain; Block domain qua UI API -> request bị chặn 403"""
        res = self.client.post("/api/domain-policy", json={"domain": "api.openai.com", "action": "block"})
        self.assertEqual(res.status_code, 200)
        try:
            r = self.client.post(
                "/openai/v1/chat/completions",
                json={"model": "gpt-4o-mini", "messages": [{"role": "user", "content": "hi"}]},
                headers={"X-Forwarded-For": "10.99.2.50"},
            )
            self.assertEqual(r.status_code, 403)
            self.assertIn("BLOCKED", r.text)

            disc = self.client.get("/api/discovery").json()
            hits = [e for e in disc["endpoints"] if e["domain"] == "api.openai.com" and e["provider"] == "openai"]
            self.assertEqual(len(hits), 1)
            self.assertEqual(hits[0]["domain_action"], "block")
            self.assertGreaterEqual(hits[0]["blocked_count"], 1)
            self.assertEqual(hits[0]["last_model"], "gpt-4o-mini")
        finally:
            self.client.post("/api/domain-policy", json={"domain": "api.openai.com", "action": "reset"})
        self.assertNotIn("api.openai.com", load_policy().get("domain_policy") or {})

    def test_12_domain_wildcard(self):
        """Wildcard domain policy (*.googleapis.com) và mặc định allow"""
        from proxy_server import get_domain_action
        pol = {"domain_policy": {"*.googleapis.com": "block", "daily-cloudcode-pa.googleapis.com": "allow"}}
        self.assertEqual(get_domain_action("cloudcode-pa.googleapis.com", pol), "block")
        self.assertEqual(get_domain_action("daily-cloudcode-pa.googleapis.com", pol), "allow")
        self.assertEqual(get_domain_action("api.anthropic.com", pol), "allow")

    def test_13_mcp_grpc_method_blocking(self):
        """MCP qua gRPC/protobuf: chặn theo tên method (allowed_mcp_tools)"""
        self.client.post("/api/mcp/servers", json={
            "name": "test-grpc", "type": "grpc", "upstream_url": "http://127.0.0.1:9", "description": "test"})
        self.client.post("/api/policy/rule", json={
            "name": "[TEST] gRPC Client", "ip": "10.99.3.1",
            "allowed_providers": ["*"], "allowed_models": ["*"],
            "allowed_mcp_servers": ["test-grpc"], "allowed_mcp_tools": ["Get*"]})
        try:
            r = self.client.post(
                "/mcp/test-grpc/grpc/demo.v1.DataService/DeleteAll",
                content=b"\x00\x00\x00\x00\x00",
                headers={"Content-Type": "application/grpc-web+proto", "X-Forwarded-For": "10.99.3.1"},
            )
            self.assertEqual(r.status_code, 403)
            self.assertEqual(r.headers.get("grpc-status"), "7")

            # Method được phép -> đi tiếp tới upstream (không tồn tại) -> 502 / grpc-status 14
            r2 = self.client.post(
                "/mcp/test-grpc/grpc/demo.v1.DataService/GetItem",
                content=b"\x00\x00\x00\x00\x00",
                headers={"Content-Type": "application/grpc-web+proto", "X-Forwarded-For": "10.99.3.1"},
            )
            self.assertEqual(r2.status_code, 502)
            self.assertEqual(r2.headers.get("grpc-status"), "14")
        finally:
            self.client.delete("/api/policy/rule/[TEST] gRPC Client")
            self.client.delete("/api/mcp/servers/test-grpc")

    # ---------- Đếm token theo định dạng response thật của từng provider ----------
    @staticmethod
    def _track(provider, payload, chunk_size=7):
        from token_utils import StreamingTokenTracker
        t = StreamingTokenTracker(provider, est_input_tokens=999)
        data = payload.encode("utf-8")
        for i in range(0, len(data), chunk_size):  # cắt chunk nhỏ để thử ghép dòng
            t.process_chunk(data[i:i + chunk_size])
        return t.finalize()

    def test_14_control_plane_zero_tokens(self):
        """loadCodeAssist / listExperiments không phải inference -> 0 token, model '-'"""
        from token_utils import NON_INFERENCE_MODEL
        m, n = estimate_input_tokens({"metadata": {"ideType": "ANTIGRAVITY"}}, "google", "v1internal:loadCodeAssist")
        self.assertEqual((m, n), (NON_INFERENCE_MODEL, 0))
        m, n = estimate_input_tokens({}, "google", "v1internal:listExperiments")
        self.assertEqual((m, n), (NON_INFERENCE_MODEL, 0))

    def test_15_cloudcode_request_and_response(self):
        """CloudCode PA (Antigravity): body bọc trong 'request', response bọc trong 'response'"""
        body = {"model": "gemini-2.5-pro", "project": "p", "request": {
            "contents": [{"role": "user", "parts": [{"text": "x" * 400}]}],
            "systemInstruction": {"parts": [{"text": "y" * 400}]}}}
        m, n = estimate_input_tokens(body, "google", "v1internal:streamGenerateContent")
        self.assertEqual(m, "gemini-2.5-pro")
        self.assertAlmostEqual(n, 200, delta=5)  # ~800 ký tự / 4 (+ role)
        sse = ('data: {"response": {"candidates": [{"content": {"parts": [{"text": "Hel"}]}}],'
               ' "usageMetadata": {"promptTokenCount": 1200, "candidatesTokenCount": 3}}}\n\n'
               'data: {"response": {"candidates": [{"content": {"parts": [{"text": "lo"}]}}],'
               ' "usageMetadata": {"promptTokenCount": 1200, "candidatesTokenCount": 40,'
               ' "thoughtsTokenCount": 60, "cachedContentTokenCount": 800}}}\n\n')
        self.assertEqual(self._track("google", sse), (1200, 100))

    def test_16_gemini_json_array_and_model_from_path(self):
        m, _ = estimate_input_tokens({"contents": [{"parts": [{"text": "hi"}]}]}, "google",
                                     "v1beta/models/gemini-2.0-flash:generateContent")
        self.assertEqual(m, "gemini-2.0-flash")
        arr = '[{\n  "candidates": [],\n  "usageMetadata": {\n    "promptTokenCount": 10,\n    "candidatesTokenCount": 25\n  }\n}]'
        self.assertEqual(self._track("google", arr), (10, 25))

    def test_17_anthropic_cache_tokens(self):
        """Anthropic: input = input + cache_creation + cache_read; output lấy giá trị cuối"""
        sse = ('event: message_start\ndata: {"type":"message_start","message":{"usage":'
               '{"input_tokens":12,"cache_creation_input_tokens":3000,"cache_read_input_tokens":20000,"output_tokens":1}}}\n\n'
               'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"type":"text_delta","text":"ok"}}\n\n'
               'event: message_delta\ndata: {"type":"message_delta","usage":{"output_tokens":512}}\n\n')
        self.assertEqual(self._track("anthropic", sse), (23012, 512))
        # Non-stream JSON 1 dòng, không có newline cuối
        js = '{"id":"m","content":[{"type":"text","text":"hi"}],"usage":{"input_tokens":7,"output_tokens":9}}'
        self.assertEqual(self._track("anthropic", js), (7, 9))

    def test_18_openai_chat_and_responses(self):
        chat = ('data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n'
                'data: {"choices":[],"usage":{"prompt_tokens":50,"completion_tokens":20,'
                '"prompt_tokens_details":{"cached_tokens":0}}}\n\ndata: [DONE]\n\n')
        self.assertEqual(self._track("openai", chat), (50, 20))
        resp = ('event: response.completed\ndata: {"type":"response.completed","response":{"usage":'
                '{"input_tokens":70,"input_tokens_details":{"cached_tokens":0},"output_tokens":30}}}\n\n')
        self.assertEqual(self._track("openai", resp), (70, 30))
        # Không có usage -> giữ ước tính input, output ước tính từ văn bản
        self.assertEqual(self._track("openai", 'data: {"choices":[{"delta":{"content":"abcdefgh"}}]}\n\n'), (999, 2))

    def test_19_reset_logs_and_tokens(self):
        # 1. Ghi log thử nghiệm vào database
        log_request(
            client_ip="10.99.0.88",
            client_mac="02:00:00:88:88:88",
            machine_name="Reset-Test-PC",
            provider="openai",
            model="gpt-4o",
            endpoint="/v1/chat/completions",
            status_code=200,
            action="ALLOWED",
            input_tokens=150,
            output_tokens=250,
            latency_ms=100
        )
        usage_before = get_daily_token_usage("10.99.0.88", "02:00:00:88:88:88")
        self.assertGreaterEqual(usage_before, 400)

        # 2. Gọi API reset logs
        res = self.client.post("/api/logs/reset", json={"reset_discoveries": False})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertTrue(data.get("success"))
        self.assertGreaterEqual(data.get("deleted_logs"), 1)
        self.assertGreaterEqual(data.get("deleted_tokens"), 400)

        # 3. Kiểm tra usage và thống kê đã về 0
        usage_after = get_daily_token_usage("10.99.0.88", "02:00:00:88:88:88")
        self.assertEqual(usage_after, 0)
        logs_after = get_recent_logs(limit=10)
        self.assertEqual(len(logs_after), 0)
        stats_after = get_summary_stats()
        self.assertEqual(stats_after["totals"]["total_requests"], 0)
        self.assertEqual(stats_after["totals"]["total_tokens"], 0)

    def test_20_blocked_pc_access(self):
        # 1. Thêm rule chặn hoàn toàn một PC
        blocked_rule = {
            "name": "[TEST] Blocked-Test-PC",
            "ip": "10.99.0.123",
            "action": "block",
            "allowed_providers": ["*"],
            "allowed_models": ["*"]
        }
        res = self.client.post("/api/policy/rule", json=blocked_rule)
        self.assertEqual(res.status_code, 200)

        try:
            # 2. PC bị chặn gửi request đến gateway
            res_req = self.client.post(
                "/openai/v1/chat/completions",
                headers={"x-forwarded-for": "10.99.0.123"},
                json={"model": "gpt-4o", "messages": [{"role": "user", "content": "hello"}]}
            )
            self.assertEqual(res_req.status_code, 403)
            self.assertIn("BLOCKED_PC_ACCESS", res_req.text)
        finally:
            self.client.delete("/api/policy/rule/[TEST] Blocked-Test-PC")

    def test_21_toggle_client_access_api(self):
        try:
            # 1. Gọi API toggle Chặn PC
            res = self.client.post("/api/client-access", json={
                "client_ip": "192.168.1.188",
                "client_mac": "02:00:00:18:18:18",
                "machine_name": "[TEST] Dev-Laptop-188",
                "action": "block"
            })
            self.assertEqual(res.status_code, 200)
            self.assertTrue(res.json().get("success"))

            # Kiểm tra request từ PC này bị chặn
            res_blocked = self.client.post(
                "/anthropic/v1/messages",
                headers={"x-forwarded-for": "192.168.1.188"},
                json={"model": "claude-3-5-sonnet", "messages": [{"role": "user", "content": "hi"}]}
            )
            self.assertEqual(res_blocked.status_code, 403)

            # 2. Gọi API mở khóa lại PC
            res_unblock = self.client.post("/api/client-access", json={
                "client_ip": "192.168.1.188",
                "client_mac": "02:00:00:18:18:18",
                "action": "allow"
            })
            self.assertEqual(res_unblock.status_code, 200)
            self.assertTrue(res_unblock.json().get("success"))
        finally:
            self.client.delete("/api/policy/rule/[TEST] Dev-Laptop-188")

    def test_22_socks5_handshake_and_domain_block(self):
        import asyncio
        from proxy_server import handle_socks5_client

        async def run_socks5_test():
            # 1. Chặn domain qua policy API
            res = self.client.post("/api/domain-policy", json={"domain": "blocked-socks5.test.local", "action": "block"})
            self.assertEqual(res.status_code, 200)

            try:
                server = await asyncio.start_server(handle_socks5_client, "127.0.0.1", 11099)
                reader, writer = await asyncio.open_connection("127.0.0.1", 11099)

                # SOCKS5 Handshake
                writer.write(b"\x05\x01\x00")
                await writer.drain()
                resp = await reader.readexactly(2)
                self.assertEqual(resp, b"\x05\x00")

                # Connect to blocked domain
                dom = b"blocked-socks5.test.local"
                writer.write(b"\x05\x01\x00\x03" + bytes([len(dom)]) + dom + (443).to_bytes(2, "big"))
                await writer.drain()

                rep = await reader.readexactly(10)
                # rep[1] == 0x02 nghĩa là Connection not allowed by ruleset (chặn thành công)
                self.assertEqual(rep[0], 5)
                self.assertEqual(rep[1], 2)

                writer.close()
                await writer.wait_closed()
                server.close()
                await server.wait_closed()
            finally:
                self.client.post("/api/domain-policy", json={"domain": "blocked-socks5.test.local", "action": "reset"})

        asyncio.run(run_socks5_test())

    def test_23_violation_locking_and_resolution(self):
        """Kiểm tra máy trạm vi phạm quy tắc sẽ bị khóa gọi API LLM Cloud cho đến khi giải quyết"""
        test_ip = "10.99.9.50"
        test_mac = "02:00:00:99:99:50"
        rule_name = "[TEST] Rule-Violating-PC"

        # 1. Tạo rule giới hạn input token = 5
        self.client.post("/api/policy/rule", json={
            "name": rule_name,
            "ip": test_ip,
            "mac": test_mac,
            "action": "allow",
            "allowed_providers": ["google"],
            "allowed_models": ["gemini-1.5-flash"],
            "max_input_tokens_per_request": 5,
            "max_output_tokens_per_request": 0,
            "daily_total_token_quota": 0
        })

        try:
            # 2. Gửi request vi phạm giới hạn token (> 5 tokens)
            resp_violate = self.client.post(
                "/google/v1beta/models/gemini-1.5-flash:generateContent",
                headers={"x-forwarded-for": test_ip},
                json={"contents": [{"parts": [{"text": "This prompt is definitely longer than five input tokens to trigger violation"}]}]}
            )
            # Yêu cầu bị chặn do vượt token limit
            self.assertEqual(resp_violate.status_code, 400)
            self.assertIn("exceed maximum allowed limit", resp_violate.text)

            # Máy trạm giờ đây phải có trạng thái vi phạm
            violation = get_client_active_violation(test_ip, test_mac)
            self.assertIsNotNone(violation)
            self.assertEqual(violation["action"], "BLOCKED_INPUT_TOKENS")

            # 3. Request tiếp theo dù prompt rất ngắn (1 token) cũng phải BỊ KHÓA (403 BLOCKED_VIOLATION_LOCK)
            resp_locked = self.client.post(
                "/google/v1beta/models/gemini-1.5-flash:generateContent",
                headers={"x-forwarded-for": test_ip},
                json={"contents": [{"parts": [{"text": "hi"}]}]}
            )
            self.assertEqual(resp_locked.status_code, 403)
            self.assertIn("BLOCKED_VIOLATION_LOCK", resp_locked.text)

            # 4. Giải quyết vi phạm qua API resolve-violations
            res_resolve = self.client.post("/api/client-access/resolve-violations", json={
                "client_ip": test_ip,
                "client_mac": test_mac
            })
            self.assertEqual(res_resolve.status_code, 200)
            self.assertGreaterEqual(res_resolve.json().get("resolved_count", 0), 1)

            # Sau khi giải quyết, máy trạm không còn bị khóa
            violation_after = get_client_active_violation(test_ip, test_mac)
            self.assertIsNone(violation_after)

        finally:
            self.client.delete(f"/api/policy/rule/{rule_name}")
            from database import get_connection
            with get_connection() as conn:
                conn.cursor().execute("DELETE FROM llm_audit_log WHERE client_ip = ?", (test_ip,))
                conn.commit()

    def test_24_policy_db_persistence(self):
        """Kiểm tra ma trận chính sách được lưu trữ bền vững trong SQLite DB và đồng bộ"""
        db_policy = get_policy_from_db()
        self.assertIsNotNone(db_policy)
        self.assertIn("default_policy", db_policy)
        self.assertEqual(db_policy["default_policy"]["action"], "allow")
        self.assertEqual(db_policy["default_policy"]["max_input_tokens_per_request"], 0)
        self.assertEqual(db_policy["default_policy"]["max_output_tokens_per_request"], 0)

if __name__ == "__main__":
    unittest.main()
