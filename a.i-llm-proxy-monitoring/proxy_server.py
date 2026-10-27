import os
import time
import json
import uuid
import struct
import asyncio
import fnmatch
import ipaddress
from datetime import datetime
import yaml
import httpx
import uvicorn
from fastapi import FastAPI, Request, Response, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse, JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

import socket
from urllib.parse import urlparse

from database import (
    init_db, log_request, get_daily_token_usage, get_recent_logs, get_summary_stats,
    record_discovery, get_discoveries, delete_discovery, reset_audit_logs, resolve_client_violations,
)
from token_utils import resolve_mac_address, estimate_input_tokens, StreamingTokenTracker, NON_INFERENCE_MODEL

from contextlib import asynccontextmanager

try:
    import websockets
except ImportError:
    websockets = None

http_client: httpx.AsyncClient = None
socks_server = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global http_client, socks_server
    init_db()
    limits = httpx.Limits(max_keepalive_connections=100, max_connections=300)
    http_client = httpx.AsyncClient(timeout=180.0, limits=limits)
    
    # Khởi động SOCKS5 Proxy Server trên cổng 1080 (hoặc biến môi trường SOCKS5_PORT)
    socks_server = await start_socks5_server()
    print("[INFO] LLM Proxy Monitoring Gateway initialized successfully (connection pool ready)")
    yield
    if socks_server:
        socks_server.close()
        await socks_server.wait_closed()
    if http_client and not http_client.is_closed:
        await http_client.aclose()

app = FastAPI(title="LLM Proxy & Monitoring Gateway with MCP", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

POLICY_FILE = os.getenv("POLICY_FILE", os.path.join(os.path.dirname(__file__), "policy_matrix.yaml"))
UPSTREAM_MAP = {
    "google": os.getenv("GOOGLE_UPSTREAM", "https://daily-cloudcode-pa.googleapis.com"),
    "anthropic": os.getenv("ANTHROPIC_UPSTREAM", "https://api.anthropic.com"),
    "openai": os.getenv("OPENAI_UPSTREAM", "https://api.openai.com"),
    "copilot": os.getenv("COPILOT_UPSTREAM", "https://api.githubcopilot.com")
}

def load_policy():
    try:
        with open(POLICY_FILE, "r") as f:
            return yaml.safe_load(f)
    except Exception as e:
        print(f"[ERROR] Failed to load policy matrix: {e}")
        return {
            "default_policy": {
                "action": "allow",
                "allowed_providers": ["*"],
                "allowed_models": ["*"],
                "allowed_mcp_servers": ["*"],
                "allowed_mcp_tools": ["*"],
                # 0 = không giới hạn
                "max_input_tokens_per_request": 0,
                "max_output_tokens_per_request": 0,
                "daily_total_token_quota": 0
            },
            "mcp_servers": {
                "lan-tools": {
                    "type": "builtin",
                    "description": "Built-in LAN Gateway Tools"
                }
            },
            "rules": []
        }

def save_policy(data: dict):
    with open(POLICY_FILE, "w", encoding="utf-8") as f:
        yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)

def extract_client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    if request.client:
        host = request.client.host
        if host in ("testclient", "localhost"):
            return "127.0.0.1"
        return host
    return "127.0.0.1"

def extract_ws_client_ip(websocket: WebSocket) -> str:
    forwarded = websocket.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    if websocket.client:
        host = websocket.client.host
        if host in ("testclient", "localhost"):
            return "127.0.0.1"
        return host
    return "127.0.0.1"

def match_ip_range(client_ip: str, ip_range: str) -> bool:
    try:
        if "/" in ip_range:
            return ipaddress.ip_address(client_ip) in ipaddress.ip_network(ip_range, strict=False)
        elif "-" in ip_range:
            start_ip, end_ip = ip_range.split("-")
            ip_val = int(ipaddress.ip_address(client_ip.strip()))
            return int(ipaddress.ip_address(start_ip.strip())) <= ip_val <= int(ipaddress.ip_address(end_ip.strip()))
    except Exception:
        pass
    return False

def get_policy_for_client(client_ip: str, client_mac: str) -> dict:
    policy_data = load_policy()
    rules = policy_data.get("rules", [])
    
    # 1. Khớp theo MAC vật lý
    if client_mac and client_mac != "UNKNOWN_MAC":
        for r in rules:
            if r.get("mac") and r["mac"].lower() == client_mac.lower():
                return r

    # 2. Khớp theo IP chính xác
    for r in rules:
        if r.get("ip") and r["ip"] == client_ip:
            return r

    # 3. Khớp theo dải IP (Subnet hoặc Range)
    for r in rules:
        if r.get("ip_range") and match_ip_range(client_ip, r["ip_range"]):
            return r

    # 4. Fallback về Default Policy
    default_pol = policy_data.get("default_policy", {})
    default_pol["name"] = "Default Policy (Fallback)"
    return default_pol

def is_model_allowed(model_name: str, allowed_models: list) -> bool:
    if "*" in allowed_models:
        return True
    for pattern in allowed_models:
        if fnmatch.fnmatch(model_name.lower(), pattern.lower()):
            return True
    return False

def is_mcp_server_allowed(server_name: str, allowed_servers: list) -> bool:
    if not allowed_servers or "*" in allowed_servers:
        return True
    for pat in allowed_servers:
        if fnmatch.fnmatch(server_name.lower(), pat.lower()):
            return True
    return False

def is_mcp_tool_allowed(tool_name: str, allowed_tools: list) -> bool:
    if not allowed_tools or "*" in allowed_tools:
        return True
    for pat in allowed_tools:
        if fnmatch.fnmatch(tool_name.lower(), pat.lower()):
            return True
    return False

# ==================== DISCOVERY & DOMAIN POLICY ====================
# Cơ chế: lần đầu có request LLM/MCP đi ra domain cloud nào -> ghi nhận domain + IP
# vào bảng discovered_endpoints. Admin vào UI để Allow / Block từng domain.
# Mặc định domain chưa cấu hình = ALLOW.

_dns_cache: dict = {}
_DNS_TTL = 300

def _resolve_sync(domain: str) -> str:
    try:
        infos = socket.getaddrinfo(domain, None)
        ips = sorted({i[4][0] for i in infos})
        return ",".join(ips)
    except Exception:
        return ""

async def resolve_domain_ips(domain: str) -> str:
    if not domain:
        return ""
    try:
        ipaddress.ip_address(domain)
        return domain
    except ValueError:
        pass
    cached = _dns_cache.get(domain)
    if cached and time.time() - cached[1] < _DNS_TTL:
        return cached[0]
    try:
        ips = await asyncio.wait_for(asyncio.to_thread(_resolve_sync, domain), timeout=2.0)
    except Exception:
        ips = ""
    _dns_cache[domain] = (ips, time.time())
    return ips

def get_domain_action(domain: str, policy_data: dict = None) -> str:
    """Trả về 'allow' hoặc 'block'. Hỗ trợ khóa chính xác và wildcard (*.googleapis.com)."""
    policy_data = policy_data or load_policy()
    dp = policy_data.get("domain_policy") or {}
    d = (domain or "").lower()
    if d in dp:
        return str(dp[d]).lower()
    for pattern, action in dp.items():
        if fnmatch.fnmatch(d, str(pattern).lower()):
            return str(action).lower()
    return "allow"

def host_of(url: str) -> str:
    try:
        return (urlparse(url).hostname or "").lower()
    except Exception:
        return ""

async def discover_and_check(kind: str, provider: str, domain: str, transport: str, path: str,
                             model: str, client_ip: str, machine: str):
    """Ghi nhận discovery và trả về (allowed: bool, resolved_ips: str)."""
    ips = await resolve_domain_ips(domain)
    allowed = get_domain_action(domain) != "block"
    try:
        is_new = record_discovery(kind, provider, domain, ips, transport, path, model,
                                  client_ip, machine, blocked=not allowed)
        if is_new:
            print(f"[DISCOVERY] New {kind} endpoint: {provider} -> {domain} [{ips}] via {transport}")
    except Exception as e:
        print(f"[WARN] record_discovery failed: {e}")
    return allowed, ips

# ==================== SOCKS5 PROXY SERVER (RFC 1928) ====================
async def handle_socks5_client(reader: asyncio.StreamReader, writer: asyncio.StreamWriter):
    peer = writer.get_extra_info("peername")
    client_ip = peer[0] if peer else "127.0.0.1"
    client_mac = resolve_mac_address(client_ip)
    rule = get_policy_for_client(client_ip, client_mac)
    machine_name = rule.get("name", "Unknown SOCKS5 PC")

    try:
        # 1. Bắt tay SOCKS5 (Greeting & Authentication)
        greeting = await reader.readexactly(2)
        ver, nmethods = greeting[0], greeting[1]
        if ver != 5:
            writer.close()
            await writer.wait_closed()
            return
        await reader.readexactly(nmethods)
        # 0x00: Không yêu cầu xác thực
        writer.write(b"\x05\x00")
        await writer.drain()

        # 2. Xử lý Request kết nối
        header = await reader.readexactly(4)
        ver, cmd, rsv, atyp = header[0], header[1], header[2], header[3]
        if ver != 5 or cmd != 1:  # Chỉ hỗ trợ CONNECT (0x01)
            writer.write(b"\x05\x07\x00\x01\x00\x00\x00\x00\x00\x00")
            await writer.drain()
            writer.close()
            await writer.wait_closed()
            return

        if atyp == 1:  # IPv4
            addr_bytes = await reader.readexactly(4)
            dst_host = socket.inet_ntoa(addr_bytes)
        elif atyp == 3:  # Domain name
            domain_len = (await reader.readexactly(1))[0]
            domain_bytes = await reader.readexactly(domain_len)
            dst_host = domain_bytes.decode("utf-8", errors="ignore")
        elif atyp == 4:  # IPv6
            addr_bytes = await reader.readexactly(16)
            dst_host = socket.inet_ntop(socket.AF_INET6, addr_bytes)
        else:
            writer.write(b"\x05\x08\x00\x01\x00\x00\x00\x00\x00\x00")
            await writer.drain()
            writer.close()
            await writer.wait_closed()
            return

        port_bytes = await reader.readexactly(2)
        dst_port = struct.unpack("!H", port_bytes)[0]

        # 3. Kiểm soát quyền PC (IP & MAC)
        if rule.get("action") == "block" or rule.get("status") == "blocked":
            err = f"SOCKS5: Máy trạm '{machine_name}' (IP: {client_ip} / MAC: {client_mac}) đã BỊ CHẶN sử dụng Proxy"
            log_request(client_ip, client_mac, machine_name, "socks5", dst_host, f"socks5:{dst_port}", 403, "BLOCKED_PC_ACCESS", 0, 0, 0, err)
            writer.write(b"\x05\x02\x00\x01\x00\x00\x00\x00\x00\x00")  # Connection not allowed by ruleset
            await writer.drain()
            writer.close()
            await writer.wait_closed()
            return

        # 4. Kiểm soát Domain Policy
        domain_action = get_domain_action(dst_host)
        if domain_action == "block":
            err = f"SOCKS5: Domain '{dst_host}' đã BỊ CHẶN bởi domain policy"
            log_request(client_ip, client_mac, machine_name, "socks5", dst_host, f"socks5:{dst_port}", 403, "BLOCKED_DOMAIN", 0, 0, 0, err)
            writer.write(b"\x05\x02\x00\x01\x00\x00\x00\x00\x00\x00")
            await writer.drain()
            writer.close()
            await writer.wait_closed()
            return

        # Discovery endpoint
        await discover_and_check("socks5", "network", dst_host, "socks5", f":{dst_port}", "-", client_ip, machine_name)

        # 5. Kết nối ra Upstream
        try:
            up_reader, up_writer = await asyncio.wait_for(
                asyncio.open_connection(dst_host, dst_port),
                timeout=12.0
            )
        except Exception:
            writer.write(b"\x05\x04\x00\x01\x00\x00\x00\x00\x00\x00")  # Host unreachable
            await writer.drain()
            writer.close()
            await writer.wait_closed()
            return

        # Báo kết nối thành công (REP: 0x00)
        writer.write(b"\x05\x00\x00\x01\x00\x00\x00\x00\x00\x00")
        await writer.drain()

        log_request(client_ip, client_mac, machine_name, "socks5", dst_host, f"socks5:{dst_port}", 200, "ALLOWED", 0, 0, 0, f"Tunnel {dst_host}:{dst_port}")

        # 6. Chuyển tiếp 2 chiều (Bidirectional Relay)
        async def relay(src, dst):
            try:
                while True:
                    data = await src.read(65536)
                    if not data:
                        break
                    dst.write(data)
                    await dst.drain()
            except Exception:
                pass
            finally:
                try:
                    dst.close()
                    await dst.wait_closed()
                except Exception:
                    pass

        await asyncio.gather(relay(reader, up_writer), relay(up_reader, writer))

    except Exception:
        pass
    finally:
        try:
            writer.close()
            await writer.wait_closed()
        except Exception:
            pass

async def start_socks5_server():
    socks5_port = int(os.getenv("SOCKS5_PORT", "1080"))
    socks5_host = os.getenv("HOST", "0.0.0.0")
    try:
        server = await asyncio.start_server(handle_socks5_client, socks5_host, socks5_port)
        print(f"[INFO] 🚀 SOCKS5 Proxy Server listening on {socks5_host}:{socks5_port}")
        return server
    except Exception as e:
        print(f"[WARN] SOCKS5 Proxy could not start on {socks5_host}:{socks5_port}: {e}")
        return None

# ==================== MCP BUILT-IN TOOLS ====================

BUILTIN_MCP_TOOLS = [
    {
        "name": "lan_status",
        "description": "Lấy trạng thái hoạt động tổng quan của LLM Proxy Gateway và thống kê mạng LAN",
        "inputSchema": {
            "type": "object",
            "properties": {},
            "additionalProperties": False
        }
    },
    {
        "name": "lan_ping",
        "description": "Kiểm tra kết nối mạng (ping) tới một địa chỉ IP hoặc máy chủ nội bộ LAN",
        "inputSchema": {
            "type": "object",
            "properties": {
                "target": {"type": "string", "description": "Địa chỉ IP hoặc hostname cần kiểm tra kết nối"}
            },
            "required": ["target"]
        }
    },
    {
        "name": "lan_arp_lookup",
        "description": "Tra cứu địa chỉ vật lý MAC Address từ một địa chỉ IP LAN",
        "inputSchema": {
            "type": "object",
            "properties": {
                "ip": {"type": "string", "description": "Địa chỉ IP LAN"}
            },
            "required": ["ip"]
        }
    }
]

async def execute_builtin_mcp_tool(tool_name: str, arguments: dict) -> dict:
    if tool_name == "lan_status":
        stats = get_summary_stats()
        totals = stats.get("totals", {})
        text = (
            f"=== LAN LLM Proxy Gateway Status ===\n"
            f"Total Requests: {totals.get('total_requests', 0)}\n"
            f"Successful: {totals.get('successful_requests', 0)}\n"
            f"Blocked: {totals.get('blocked_requests', 0)}\n"
            f"Total Tokens: {totals.get('total_tokens', 0)}\n"
            f"Active LAN Workstations: {len(stats.get('usage_by_client', []))}\n"
            f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        )
        return {"content": [{"type": "text", "text": text}]}
    
    elif tool_name == "lan_ping":
        target = arguments.get("target", "").strip()
        if not target:
            return {"isError": True, "content": [{"type": "text", "text": "Target IP/hostname is required"}]}
        try:
            import subprocess
            proc = await asyncio.create_subprocess_exec(
                "ping", "-c", "2", "-W", "1", target,
                stdout=subprocess.PIPE, stderr=subprocess.PIPE
            )
            stdout, stderr = await proc.communicate()
            if proc.returncode == 0:
                return {"content": [{"type": "text", "text": f"Ping to {target} SUCCESS:\n{stdout.decode('utf-8')}"}]}
            else:
                return {"isError": True, "content": [{"type": "text", "text": f"Ping to {target} FAILED:\n{stderr.decode('utf-8') or stdout.decode('utf-8')}"}]}
        except Exception as e:
            return {"isError": True, "content": [{"type": "text", "text": f"Ping error: {str(e)}"}]}

    elif tool_name == "lan_arp_lookup":
        target_ip = arguments.get("ip", "").strip()
        mac = resolve_mac_address(target_ip)
        return {"content": [{"type": "text", "text": f"IP: {target_ip} -> MAC Address: {mac}"}]}

    return {"isError": True, "content": [{"type": "text", "text": f"Unknown tool: {tool_name}"}]}

# SSE Session Manager for MCP
mcp_sse_sessions: dict[str, asyncio.Queue] = {}

async def handle_builtin_mcp_rpc(payload: dict) -> dict:
    method = payload.get("method")
    req_id = payload.get("id")
    params = payload.get("params", {})

    if method == "initialize":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {
                    "tools": {"listChanged": False},
                    "resources": {},
                    "prompts": {}
                },
                "serverInfo": {
                    "name": "LAN-MCP-Gateway",
                    "version": "1.0.0"
                }
            }
        }
    elif method == "notifications/initialized":
        return None
    elif method == "tools/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "tools": BUILTIN_MCP_TOOLS
            }
        }
    elif method == "tools/call":
        tool_name = params.get("name", "")
        args = params.get("arguments", {})
        tool_res = await execute_builtin_mcp_tool(tool_name, args)
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": tool_res
        }
    elif method == "resources/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {"resources": []}
        }
    elif method == "prompts/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {"prompts": []}
        }
    elif method == "ping":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {}
        }
    else:
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "error": {
                "code": -32601,
                "message": f"Method not found: {method}"
            }
        }

# ==================== UI & API ROUTES ====================

@app.api_route("/", methods=["GET", "HEAD"], response_class=HTMLResponse)
@app.api_route("/dashboard", methods=["GET", "HEAD"], response_class=HTMLResponse)
async def serve_dashboard():
    html_path = os.path.join(os.path.dirname(__file__), "static", "index.html")
    if os.path.exists(html_path):
        with open(html_path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>LLM Proxy Monitoring Gateway</h1><p>Dashboard file not found</p>"

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "llm-proxy-gateway"}

@app.get("/api/stats")
async def api_stats():
    stats = get_summary_stats()
    policy_data = load_policy()
    rules = policy_data.get("rules", [])
    default_pol = policy_data.get("default_policy", {})
    default_action = default_pol.get("action", "allow")

    existing_clients = set()
    for client in stats.get("usage_by_client", []):
        cip = client.get("client_ip", "")
        cmac = client.get("client_mac", "")
        if cip and cip != "-":
            existing_clients.add(cip)
        if cmac and cmac != "UNKNOWN_MAC":
            existing_clients.add(cmac.lower())
        rule = get_policy_for_client(cip, cmac)
        client["policy_name"] = rule.get("name", client.get("machine_name", ""))
        client["policy_action"] = rule.get("action", default_action)
        client["daily_quota"] = rule.get("daily_total_token_quota", 0)
        client["max_input_tokens"] = rule.get("max_input_tokens_per_request", 0)
        client["allowed_models"] = rule.get("allowed_models", ["*"])
        client["allowed_providers"] = rule.get("allowed_providers", ["*"])
        client["is_blocked_pc"] = client["policy_action"] == "block"
        client["has_violations"] = client.get("blocked_count", 0) > 0
        client["has_custom_rule"] = any(
            (r.get("ip") and r["ip"] == cip) or
            (r.get("mac") and cmac and r["mac"].lower() == cmac.lower())
            for r in rules
        )

    # Hiển thị thêm các máy trạm đã có rule trong policy_matrix.yaml nhưng chưa phát sinh traffic hôm nay
    for r in rules:
        r_ip = r.get("ip", "")
        r_mac = r.get("mac", "")
        is_known = (r_ip and r_ip in existing_clients) or (r_mac and r_mac.lower() in existing_clients)
        if (r_ip or (r_mac and r_mac != "UNKNOWN_MAC")) and not is_known:
            r_action = r.get("action", default_action)
            stats["usage_by_client"].append({
                "client_ip": r_ip or "-",
                "client_mac": r_mac or "UNKNOWN_MAC",
                "machine_name": r.get("name", "Workstation"),
                "req_count": 0,
                "sum_tokens": 0,
                "blocked_count": 0,
                "last_violation_action": None,
                "last_violation_msg": None,
                "policy_name": r.get("name", ""),
                "policy_action": r_action,
                "daily_quota": r.get("daily_total_token_quota", 0),
                "max_input_tokens": r.get("max_input_tokens_per_request", 0),
                "allowed_models": r.get("allowed_models", ["*"]),
                "allowed_providers": r.get("allowed_providers", ["*"]),
                "is_blocked_pc": r_action == "block",
                "has_violations": False,
                "has_custom_rule": True
            })

    return stats

@app.post("/api/client-access")
async def api_toggle_client_access(payload: dict):
    client_ip = payload.get("client_ip", "").strip()
    client_mac = payload.get("client_mac", "").strip()
    machine_name = payload.get("machine_name", "").strip() or f"PC ({client_ip})"
    action = payload.get("action", "allow").lower()
    if action not in ("allow", "block"):
        raise HTTPException(status_code=400, detail="action phải là 'allow' hoặc 'block'")
    if not client_ip and not client_mac:
        raise HTTPException(status_code=400, detail="Cần client_ip hoặc client_mac")

    policy_data = load_policy()
    rules = policy_data.setdefault("rules", [])
    matched_rule = None
    for r in rules:
        if client_mac and client_mac != "UNKNOWN_MAC" and r.get("mac") and r["mac"].lower() == client_mac.lower():
            matched_rule = r
            break
        if client_ip and r.get("ip") and r["ip"] == client_ip:
            matched_rule = r
            break

    if matched_rule:
        matched_rule["action"] = action
        if machine_name:
            matched_rule["name"] = machine_name
    else:
        new_rule = {
            "name": machine_name,
            "action": action,
            "allowed_providers": ["*"],
            "allowed_models": ["*"],
            "allowed_mcp_servers": ["*"],
            "allowed_mcp_tools": ["*"],
            "max_input_tokens_per_request": 0,
            "max_output_tokens_per_request": 0,
            "daily_total_token_quota": 0
        }
        if client_ip:
            new_rule["ip"] = client_ip
        if client_mac and client_mac != "UNKNOWN_MAC":
            new_rule["mac"] = client_mac
        rules.append(new_rule)

    save_policy(policy_data)

    # Khi mở khóa máy trạm -> giải quyết xóa trạng thái cảnh báo vi phạm cũ
    if action == "allow":
        resolve_client_violations(client_ip, client_mac)

    action_text = "Chặn" if action == "block" else "Cho phép"
    return {"success": True, "message": f"Đã {action_text} máy trạm '{machine_name}' thành công"}

@app.post("/api/client-access/resolve-violations")
async def api_resolve_client_violations_endpoint(payload: dict):
    client_ip = payload.get("client_ip", "").strip()
    client_mac = payload.get("client_mac", "").strip()
    count = resolve_client_violations(client_ip, client_mac)
    return {"success": True, "resolved_count": count, "message": f"Đã giải quyết {count} cảnh báo vi phạm"}

@app.get("/api/logs")
async def api_logs(limit: int = 100):
    return get_recent_logs(limit=limit)

@app.post("/api/logs/reset")
@app.delete("/api/logs")
async def api_reset_logs(request: Request):
    try:
        reset_disc = False
        try:
            body = await request.json()
            if isinstance(body, dict):
                reset_disc = bool(body.get("reset_discoveries", False))
        except Exception:
            pass
        result = reset_audit_logs(reset_discoveries=reset_disc)
        return {"success": True, **result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/policy")
async def api_policy():
    return load_policy()

@app.post("/api/policy")
async def api_save_policy(payload: dict):
    try:
        save_policy(payload)
        return {"success": True, "message": "Đã lưu ma trận phân quyền thành công"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/policy/rule")
async def api_save_rule(rule: dict):
    try:
        policy = load_policy()
        rules = policy.get("rules", [])
        
        orig_name = str(rule.pop("original_name", "")).strip()
        rule_name = str(rule.get("name", "")).strip()
        if not rule_name:
            raise HTTPException(status_code=400, detail="Tên quy tắc (name) không được để trống")
            
        updated = False
        target_name = orig_name if orig_name else rule_name
        for idx, r in enumerate(rules):
            if str(r.get("name", "")).strip().lower() == target_name.lower():
                rules[idx] = rule
                updated = True
                break
        
        if not updated:
            # Nếu đổi tên mà không tìm thấy theo target_name, kiểm tra xem có trùng IP/MAC không
            r_ip = rule.get("ip")
            r_mac = rule.get("mac")
            for idx, r in enumerate(rules):
                if (r_ip and r.get("ip") == r_ip) or (r_mac and r_mac != "UNKNOWN_MAC" and r.get("mac") and r["mac"].lower() == r_mac.lower()):
                    rules[idx] = rule
                    updated = True
                    break

        if not updated:
            rules.append(rule)
            
        policy["rules"] = rules
        save_policy(policy)

        # Nếu quy tắc được cho phép (allow) -> tự động giải quyết các cảnh báo vi phạm cũ của IP/MAC này
        if rule.get("action", "allow") == "allow":
            cip = rule.get("ip", "")
            cmac = rule.get("mac", "")
            if cip or cmac:
                resolve_client_violations(cip or "", cmac or "")

        return {"success": True, "message": f"Đã lưu quy tắc '{rule_name}' thành công"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/policy/rule/{rule_name}")
async def api_delete_rule(rule_name: str):
    try:
        policy = load_policy()
        rules = policy.get("rules", [])
        new_rules = [r for r in rules if str(r.get("name", "")).strip().lower() != rule_name.strip().lower()]
        policy["rules"] = new_rules
        save_policy(policy)
        return {"success": True, "message": f"Đã xóa quy tắc '{rule_name}' thành công"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/policy/default")
async def api_save_default_policy(default_policy: dict):
    try:
        policy = load_policy()
        policy["default_policy"] = default_policy
        save_policy(policy)
        return {"success": True, "message": "Đã cập nhật chính sách mặc định thành công"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/mcp/servers")
async def api_get_mcp_servers():
    policy = load_policy()
    return policy.get("mcp_servers", {})

@app.post("/api/mcp/servers")
async def api_save_mcp_server(payload: dict):
    try:
        policy = load_policy()
        servers = policy.get("mcp_servers", {})
        server_name = payload.get("name", "").strip()
        if not server_name:
            raise HTTPException(status_code=400, detail="Tên MCP Server không được để trống")
        servers[server_name] = {
            "type": payload.get("type", "sse"),
            "upstream_url": payload.get("upstream_url", ""),
            "description": payload.get("description", "")
        }
        policy["mcp_servers"] = servers
        save_policy(policy)
        return {"success": True, "message": f"Đã lưu cấu hình MCP Server '{server_name}'"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/mcp/servers/{server_name}")
async def api_delete_mcp_server(server_name: str):
    try:
        policy = load_policy()
        servers = policy.get("mcp_servers", {})
        if server_name in servers:
            del servers[server_name]
            policy["mcp_servers"] = servers
            save_policy(policy)
        return {"success": True, "message": f"Đã xóa MCP Server '{server_name}'"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==================== DISCOVERY / DOMAIN POLICY API ====================

@app.get("/api/discovery")
async def api_get_discovery():
    policy = load_policy()
    items = get_discoveries()
    for it in items:
        it["domain_action"] = get_domain_action(it["domain"], policy)
    return {"endpoints": items, "domain_policy": policy.get("domain_policy") or {}}

@app.post("/api/domain-policy")
async def api_set_domain_policy(payload: dict):
    domain = str(payload.get("domain", "")).strip().lower()
    action = str(payload.get("action", "")).strip().lower()
    if not domain:
        raise HTTPException(status_code=400, detail="Domain không được để trống")
    if action not in ("allow", "block", "reset"):
        raise HTTPException(status_code=400, detail="action phải là allow | block | reset")
    policy = load_policy()
    dp = policy.get("domain_policy") or {}
    if action == "reset":
        dp.pop(domain, None)
    else:
        dp[domain] = action
    policy["domain_policy"] = dp
    save_policy(policy)
    return {"success": True, "message": f"Domain '{domain}' -> {action.upper()}"}

@app.delete("/api/discovery/{discovery_id}")
async def api_delete_discovery(discovery_id: int):
    delete_discovery(discovery_id)
    return {"success": True}

# ==================== MCP SSE ENDPOINTS ====================

@app.get("/mcp/{server_name}/sse")
@app.get("/mcp/sse")
async def mcp_sse_endpoint(request: Request, server_name: str = "lan-tools"):
    client_ip = extract_client_ip(request)
    client_mac = resolve_mac_address(client_ip)
    rule = get_policy_for_client(client_ip, client_mac)
    machine_name = rule.get("name", "Unknown PC")

    # 0. Kiểm tra quyền PC
    if rule.get("action") == "block" or rule.get("status") == "blocked":
        err = f"Máy trạm '{machine_name}' (IP: {client_ip} / MAC: {client_mac}) đã BỊ CHẶN quyền sử dụng MCP Gateway"
        log_request(client_ip, client_mac, machine_name, "mcp", server_name, "sse:connect", 403, "BLOCKED_PC_ACCESS", 0, 0, 0, err)
        raise HTTPException(status_code=403, detail={"error": err, "violation": "BLOCKED_PC_ACCESS"})

    # 1. Kiểm tra phân quyền MCP Server
    allowed_servers = rule.get("allowed_mcp_servers", ["*"])
    if not is_mcp_server_allowed(server_name, allowed_servers):
        err = f"MCP Server '{server_name}' is forbidden for {machine_name} ({client_ip})"
        log_request(client_ip, client_mac, machine_name, "mcp", server_name, "sse:connect", 403, "BLOCKED_MCP_SERVER", 0, 0, 0, err)
        raise HTTPException(status_code=403, detail={"error": err})

    session_id = uuid.uuid4().hex
    queue = asyncio.Queue()
    mcp_sse_sessions[session_id] = queue

    # Gửi event endpoint mở đầu theo MCP specification
    post_url = f"/mcp/{server_name}/messages?sessionId={session_id}"
    await queue.put(f"event: endpoint\ndata: {post_url}\n\n")

    log_request(client_ip, client_mac, machine_name, "mcp", server_name, "sse:connected", 200, "ALLOWED", 0, 0, 0, f"Session ID: {session_id}")

    async def sse_event_stream():
        try:
            while True:
                msg = await queue.get()
                yield msg
        except asyncio.CancelledError:
            pass
        finally:
            mcp_sse_sessions.pop(session_id, None)

    return StreamingResponse(
        sse_event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )

@app.post("/mcp/{server_name}/messages")
@app.post("/mcp/messages")
async def mcp_post_message(request: Request, server_name: str = "lan-tools", sessionId: str = ""):
    session_id = sessionId or request.query_params.get("sessionId", "")
    if not session_id or session_id not in mcp_sse_sessions:
        raise HTTPException(status_code=404, detail="MCP Session not found or expired")

    queue = mcp_sse_sessions[session_id]
    client_ip = extract_client_ip(request)
    client_mac = resolve_mac_address(client_ip)
    rule = get_policy_for_client(client_ip, client_mac)
    machine_name = rule.get("name", "Unknown PC")

    start_time = time.time()
    try:
        payload = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    method = payload.get("method", "")
    req_id = payload.get("id")
    params = payload.get("params", {})

    # Kiểm tra phân quyền MCP Server
    allowed_servers = rule.get("allowed_mcp_servers", ["*"])
    if not is_mcp_server_allowed(server_name, allowed_servers):
        err = f"MCP Server '{server_name}' forbidden"
        resp = {"jsonrpc": "2.0", "id": req_id, "error": {"code": -32003, "message": err}}
        await queue.put(f"event: message\ndata: {json.dumps(resp)}\n\n")
        log_request(client_ip, client_mac, machine_name, "mcp", server_name, f"mcp:{method}", 403, "BLOCKED_MCP_SERVER", 0, 0, 0, err)
        return Response(status_code=202)

    # Nếu là tools/call, kiểm tra phân quyền tool cụ thể
    if method == "tools/call":
        tool_name = params.get("name", "")
        allowed_tools = rule.get("allowed_mcp_tools", ["*"])
        if not is_mcp_tool_allowed(tool_name, allowed_tools):
            err = f"MCP Tool '{tool_name}' on server '{server_name}' is forbidden for {machine_name}. Allowed tools: {allowed_tools}"
            resp = {"jsonrpc": "2.0", "id": req_id, "error": {"code": -32003, "message": err}}
            await queue.put(f"event: message\ndata: {json.dumps(resp)}\n\n")
            latency = int((time.time() - start_time) * 1000)
            log_request(client_ip, client_mac, machine_name, "mcp", server_name, f"tools/call:{tool_name}", 403, "BLOCKED_MCP_TOOL", 0, 0, latency, err)
            return Response(status_code=202)

    # Xử lý theo Server Type
    policy_data = load_policy()
    configured_mcp = policy_data.get("mcp_servers", {}).get(server_name, {})
    server_type = configured_mcp.get("type", "builtin" if server_name == "lan-tools" else "sse")
    upstream_url = configured_mcp.get("upstream_url")

    if server_type == "builtin" or server_name == "lan-tools" or not upstream_url:
        resp = await handle_builtin_mcp_rpc(payload)
        latency = int((time.time() - start_time) * 1000)
        tool_detail = f":{params.get('name')}" if method == "tools/call" else ""
        log_request(client_ip, client_mac, machine_name, "mcp", server_name, f"mcp:{method}{tool_detail}", 200, "ALLOWED", 0, 0, latency)
        if resp:
            await queue.put(f"event: message\ndata: {json.dumps(resp)}\n\n")
        return Response(status_code=202)
    else:
        # Forward tới Upstream MCP Server qua SSE / HTTP POST
        up_domain = host_of(upstream_url)
        tool_name_d = params.get("name", "") if method == "tools/call" else ""
        allowed_d, _ = await discover_and_check("mcp", server_name, up_domain, "sse", f"mcp:{method}", tool_name_d, client_ip, machine_name)
        if not allowed_d:
            err = f"Upstream domain '{up_domain}' of MCP server '{server_name}' is BLOCKED by domain policy"
            resp = {"jsonrpc": "2.0", "id": req_id, "error": {"code": -32003, "message": err}}
            await queue.put(f"event: message\ndata: {json.dumps(resp)}\n\n")
            log_request(client_ip, client_mac, machine_name, "mcp", server_name, f"mcp:{method}", 403, "BLOCKED_DOMAIN", 0, 0, 0, err)
            return Response(status_code=202)
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                up_resp = await client.post(upstream_url, json=payload, headers={"Content-Type": "application/json"})
                latency = int((time.time() - start_time) * 1000)
                tool_detail = f":{params.get('name')}" if method == "tools/call" else ""
                log_request(client_ip, client_mac, machine_name, "mcp", server_name, f"mcp:{method}{tool_detail}", up_resp.status_code, "ALLOWED", 0, 0, latency)
                await queue.put(f"event: message\ndata: {up_resp.text}\n\n")
                return Response(status_code=202)
        except Exception as e:
            latency = int((time.time() - start_time) * 1000)
            err = f"Upstream MCP error: {str(e)}"
            resp = {"jsonrpc": "2.0", "id": req_id, "error": {"code": -32000, "message": err}}
            await queue.put(f"event: message\ndata: {json.dumps(resp)}\n\n")
            log_request(client_ip, client_mac, machine_name, "mcp", server_name, f"mcp:{method}", 502, "ERROR", 0, 0, latency, err)
            return Response(status_code=202)

# ==================== MCP WEBSOCKET / SOCKET ENDPOINTS ====================

@app.websocket("/mcp/{server_name}/ws")
@app.websocket("/mcp/ws")
async def mcp_websocket_endpoint(websocket: WebSocket, server_name: str = "lan-tools"):
    await websocket.accept()
    client_ip = extract_ws_client_ip(websocket)
    client_mac = resolve_mac_address(client_ip)
    rule = get_policy_for_client(client_ip, client_mac)
    machine_name = rule.get("name", "Unknown PC")

    # 0. Kiểm tra quyền PC
    if rule.get("action") == "block" or rule.get("status") == "blocked":
        err = f"Máy trạm '{machine_name}' (IP: {client_ip} / MAC: {client_mac}) đã BỊ CHẶN quyền sử dụng MCP WebSocket"
        log_request(client_ip, client_mac, machine_name, "mcp", server_name, "ws:connect", 403, "BLOCKED_PC_ACCESS", 0, 0, 0, err)
        await websocket.send_text(json.dumps({"jsonrpc": "2.0", "error": {"code": -32003, "message": err}}))
        await websocket.close(code=1008, reason="PC Blocked by Policy")
        return

    # 1. Kiểm tra quyền MCP Server
    allowed_servers = rule.get("allowed_mcp_servers", ["*"])
    if not is_mcp_server_allowed(server_name, allowed_servers):
        err = f"MCP Server '{server_name}' forbidden for {machine_name}"
        await websocket.send_text(json.dumps({"jsonrpc": "2.0", "error": {"code": -32003, "message": err}}))
        log_request(client_ip, client_mac, machine_name, "mcp", server_name, "ws:connect", 403, "BLOCKED_MCP_SERVER", 0, 0, 0, err)
        await websocket.close(code=1008, reason="Forbidden")
        return

    log_request(client_ip, client_mac, machine_name, "mcp", server_name, "ws:connected", 200, "ALLOWED")

    policy_data = load_policy()
    configured_mcp = policy_data.get("mcp_servers", {}).get(server_name, {})
    server_type = configured_mcp.get("type", "builtin" if server_name == "lan-tools" else "websocket")
    upstream_url = configured_mcp.get("upstream_url")

    # Trường hợp 1: Built-in MCP Server
    if server_type == "builtin" or server_name == "lan-tools" or not upstream_url:
        try:
            while True:
                msg_text = await websocket.receive_text()
                start_time = time.time()
                try:
                    payload = json.loads(msg_text)
                except Exception:
                    await websocket.send_text(json.dumps({"jsonrpc": "2.0", "error": {"code": -32700, "message": "Parse error"}}))
                    continue

                method = payload.get("method", "")
                req_id = payload.get("id")
                params = payload.get("params", {})

                # Kiểm tra phân quyền tool
                if method == "tools/call":
                    tool_name = params.get("name", "")
                    allowed_tools = rule.get("allowed_mcp_tools", ["*"])
                    if not is_mcp_tool_allowed(tool_name, allowed_tools):
                        err = f"MCP Tool '{tool_name}' forbidden for {machine_name}"
                        latency = int((time.time() - start_time) * 1000)
                        log_request(client_ip, client_mac, machine_name, "mcp", server_name, f"tools/call:{tool_name}", 403, "BLOCKED_MCP_TOOL", 0, 0, latency, err)
                        await websocket.send_text(json.dumps({"jsonrpc": "2.0", "id": req_id, "error": {"code": -32003, "message": err}}))
                        continue

                resp = await handle_builtin_mcp_rpc(payload)
                latency = int((time.time() - start_time) * 1000)
                tool_detail = f":{params.get('name')}" if method == "tools/call" else ""
                log_request(client_ip, client_mac, machine_name, "mcp", server_name, f"mcp:{method}{tool_detail}", 200, "ALLOWED", 0, 0, latency)
                if resp:
                    await websocket.send_text(json.dumps(resp))

        except WebSocketDisconnect:
            pass
        except Exception as e:
            print(f"[DEBUG] MCP WS disconnect: {e}")

    # Trường hợp 2: Upstream WebSocket Proxy Bridge
    else:
        if not websockets:
            err = "Websockets library not available for upstream forwarding"
            await websocket.send_text(json.dumps({"jsonrpc": "2.0", "error": {"code": -32000, "message": err}}))
            await websocket.close()
            return

        up_domain = host_of(upstream_url)
        ws_transport = "wss" if upstream_url.lower().startswith("wss://") else "websocket"
        allowed_d, _ = await discover_and_check("mcp", server_name, up_domain, ws_transport, "ws:connect", "", client_ip, machine_name)
        if not allowed_d:
            err = f"Upstream domain '{up_domain}' of MCP server '{server_name}' is BLOCKED by domain policy"
            log_request(client_ip, client_mac, machine_name, "mcp", server_name, "ws:connect", 403, "BLOCKED_DOMAIN", 0, 0, 0, err)
            await websocket.send_text(json.dumps({"jsonrpc": "2.0", "error": {"code": -32003, "message": err}}))
            await websocket.close(code=1008, reason="Domain blocked")
            return

        try:
            async with websockets.connect(upstream_url) as upstream_ws:
                async def forward_client_to_upstream():
                    try:
                        while True:
                            msg_text = await websocket.receive_text()
                            start_time = time.time()
                            try:
                                payload = json.loads(msg_text)
                                method = payload.get("method", "")
                                req_id = payload.get("id")
                                params = payload.get("params", {})
                                if method == "tools/call":
                                    tool_name = params.get("name", "")
                                    allowed_tools = rule.get("allowed_mcp_tools", ["*"])
                                    if not is_mcp_tool_allowed(tool_name, allowed_tools):
                                        err = f"MCP Tool '{tool_name}' forbidden for {machine_name}"
                                        latency = int((time.time() - start_time) * 1000)
                                        log_request(client_ip, client_mac, machine_name, "mcp", server_name, f"tools/call:{tool_name}", 403, "BLOCKED_MCP_TOOL", 0, 0, latency, err)
                                        await websocket.send_text(json.dumps({"jsonrpc": "2.0", "id": req_id, "error": {"code": -32003, "message": err}}))
                                        continue
                                tool_detail = f":{params.get('name')}" if method == "tools/call" else ""
                                latency = int((time.time() - start_time) * 1000)
                                log_request(client_ip, client_mac, machine_name, "mcp", server_name, f"mcp:{method}{tool_detail}", 200, "ALLOWED", 0, 0, latency)
                            except Exception:
                                pass
                            await upstream_ws.send(msg_text)
                    except Exception:
                        pass

                async def forward_upstream_to_client():
                    try:
                        async for msg in upstream_ws:
                            await websocket.send_text(msg)
                    except Exception:
                        pass

                await asyncio.gather(forward_client_to_upstream(), forward_upstream_to_client())
        except Exception as e:
            err = f"Cannot bridge to upstream MCP WebSocket: {str(e)}"
            await websocket.send_text(json.dumps({"jsonrpc": "2.0", "error": {"code": -32000, "message": err}}))
            await websocket.close()

# ==================== MCP gRPC / gRPC-Web / Connect / PROTOBUF ====================
# Passthrough nhị phân (protobuf) cho MCP server kiểu "grpc" qua HTTP/1.1:
#   POST /mcp/{server_name}/grpc/{package.Service}/{Method}
# Hỗ trợ content-type: application/grpc-web(+proto), application/grpc-web-text,
#   application/connect+proto, application/proto, application/x-protobuf.
# Kiểm soát: allowed_mcp_servers (server) + allowed_mcp_tools (khớp tên Method / Service.Method).
# Lưu ý: gRPC native (HTTP/2 + trailers) cần Envoy/nginx grpc_pass đứng trước — xem howtodo.md.

@app.post("/mcp/{server_name}/grpc/{rpc_path:path}")
async def mcp_grpc_passthrough(request: Request, server_name: str, rpc_path: str):
    start_time = time.time()
    client_ip = extract_client_ip(request)
    client_mac = resolve_mac_address(client_ip)
    rule = get_policy_for_client(client_ip, client_mac)
    machine_name = rule.get("name", "Unknown PC")

    # 0. Kiểm tra quyền PC
    if rule.get("action") == "block" or rule.get("status") == "blocked":
        err = f"Máy trạm '{machine_name}' (IP: {client_ip} / MAC: {client_mac}) đã BỊ CHẶN quyền sử dụng MCP gRPC"
        log_request(client_ip, client_mac, machine_name, "mcp", server_name, f"grpc:/{rpc_path}", 403, "BLOCKED_PC_ACCESS", 0, 0, 0, err)
        return Response(status_code=403, headers={"grpc-status": "7", "grpc-message": err})

    rpc_path = rpc_path.strip("/")
    parts = rpc_path.split("/")
    method_name = parts[-1] if parts else rpc_path
    service_method = ".".join([parts[-2].split(".")[-1], method_name]) if len(parts) >= 2 else method_name
    endpoint = f"grpc:/{rpc_path}"

    if not is_mcp_server_allowed(server_name, rule.get("allowed_mcp_servers", ["*"])):
        err = f"MCP Server '{server_name}' forbidden for {machine_name}"
        log_request(client_ip, client_mac, machine_name, "mcp", server_name, endpoint, 403, "BLOCKED_MCP_SERVER", 0, 0, 0, err)
        return Response(status_code=403, headers={"grpc-status": "7", "grpc-message": err})

    allowed_tools = rule.get("allowed_mcp_tools", ["*"])
    if not (is_mcp_tool_allowed(method_name, allowed_tools) or is_mcp_tool_allowed(service_method, allowed_tools)):
        err = f"gRPC method '{rpc_path}' forbidden for {machine_name}"
        log_request(client_ip, client_mac, machine_name, "mcp", server_name, endpoint, 403, "BLOCKED_MCP_TOOL", 0, 0, 0, err)
        return Response(status_code=403, headers={"grpc-status": "7", "grpc-message": err})

    configured = load_policy().get("mcp_servers", {}).get(server_name, {})
    upstream_base = (configured.get("upstream_url") or "").rstrip("/")
    if not upstream_base:
        err = f"MCP gRPC server '{server_name}' chưa cấu hình upstream_url"
        log_request(client_ip, client_mac, machine_name, "mcp", server_name, endpoint, 404, "ERROR", 0, 0, 0, err)
        return Response(status_code=404, headers={"grpc-status": "5", "grpc-message": err})

    up_domain = host_of(upstream_base)
    allowed_d, _ = await discover_and_check("mcp", server_name, up_domain, "grpc", endpoint, method_name, client_ip, machine_name)
    if not allowed_d:
        err = f"Upstream domain '{up_domain}' is BLOCKED by domain policy"
        log_request(client_ip, client_mac, machine_name, "mcp", server_name, endpoint, 403, "BLOCKED_DOMAIN", 0, 0, 0, err)
        return Response(status_code=403, headers={"grpc-status": "7", "grpc-message": err})

    body = await request.body()
    fwd_headers = {k: v for k, v in request.headers.items()
                   if k.lower() not in ("host", "content-length", "connection", "x-forwarded-for")}
    try:
        client = httpx.AsyncClient(timeout=120.0)
        up_req = client.build_request("POST", f"{upstream_base}/{rpc_path}", headers=fwd_headers, content=body)
        up_resp = await client.send(up_req, stream=True)

        async def streamer():
            try:
                async for chunk in up_resp.aiter_raw():
                    yield chunk
            finally:
                await up_resp.aclose()
                await client.aclose()
                latency = int((time.time() - start_time) * 1000)
                log_request(client_ip, client_mac, machine_name, "mcp", server_name, endpoint,
                            up_resp.status_code, "ALLOWED", 0, 0, latency)

        resp_headers = {k: v for k, v in up_resp.headers.items()
                        if k.lower() not in ("content-length", "transfer-encoding", "connection")}
        return StreamingResponse(streamer(), status_code=up_resp.status_code, headers=resp_headers)
    except Exception as e:
        latency = int((time.time() - start_time) * 1000)
        err = f"Upstream gRPC error: {e}"
        log_request(client_ip, client_mac, machine_name, "mcp", server_name, endpoint, 502, "ERROR", 0, 0, latency, err)
        return Response(status_code=502, headers={"grpc-status": "14", "grpc-message": err[:200]})

# ==================== CORE LLM PROXY GATEWAY ====================

async def handle_proxy_request(request: Request, provider: str, subpath: str):
    start_time = time.time()
    client_ip = extract_client_ip(request)
    client_mac = resolve_mac_address(client_ip)
    
    # Đọc body
    try:
        body_bytes = await request.body()
        body_json = json.loads(body_bytes.decode("utf-8")) if body_bytes else {}
    except Exception:
        body_json = {}

    model_name, est_input_tokens = estimate_input_tokens(body_json, provider, subpath)
    # Request control-plane (loadCodeAssist, listExperiments, metrics...) không sinh nội dung
    is_inference = model_name != NON_INFERENCE_MODEL
    rule = get_policy_for_client(client_ip, client_mac)
    machine_name = rule.get("name", "Unknown PC")

    # 0. Kiểm tra Quyền Truy Cập của Máy Trạm (IP / MAC)
    if rule.get("action") == "block" or rule.get("status") == "blocked":
        err = f"Máy trạm '{machine_name}' (IP: {client_ip} / MAC: {client_mac}) đã BỊ CHẶN quyền sử dụng LLM Proxy Gateway"
        log_request(client_ip, client_mac, machine_name, provider, model_name, subpath, 403, "BLOCKED_PC_ACCESS", est_input_tokens, 0, 0, err)
        raise HTTPException(status_code=403, detail={"error": err, "violation": "BLOCKED_PC_ACCESS", "client_ip": client_ip, "client_mac": client_mac})

    # 0.1 Discovery + Domain Policy: ghi nhận domain/IP cloud, chặn nếu domain bị Block
    base_upstream = UPSTREAM_MAP.get(provider, "https://api.openai.com")
    up_domain = host_of(base_upstream)
    req_ct = request.headers.get("content-type", "").lower()
    transport = "grpc" if "grpc" in req_ct else ("protobuf" if "proto" in req_ct else "https")
    allowed_d, _ = await discover_and_check("llm", provider, up_domain, transport, subpath, model_name, client_ip, machine_name)
    if not allowed_d:
        err = f"Domain '{up_domain}' ({provider}) is BLOCKED by domain policy"
        log_request(client_ip, client_mac, machine_name, provider, model_name, subpath, 403, "BLOCKED_DOMAIN", est_input_tokens, 0, 0, err)
        raise HTTPException(status_code=403, detail={"error": err})

    # 1. Kiểm tra Quyền Provider
    allowed_providers = rule.get("allowed_providers", ["*"])
    if "*" not in allowed_providers and provider not in allowed_providers:
        err = f"Provider '{provider}' is not permitted for {machine_name} ({client_ip} / {client_mac})"
        log_request(client_ip, client_mac, machine_name, provider, model_name, subpath, 403, "BLOCKED_PROVIDER", est_input_tokens, 0, 0, err)
        raise HTTPException(status_code=403, detail={"error": err})

    # 2. Kiểm tra Quyền Model
    allowed_models = rule.get("allowed_models", ["*"])
    if is_inference and not is_model_allowed(model_name, allowed_models):
        err = f"Model '{model_name}' is forbidden for {machine_name}. Allowed: {allowed_models}"
        log_request(client_ip, client_mac, machine_name, provider, model_name, subpath, 403, "BLOCKED_MODEL", est_input_tokens, 0, 0, err)
        raise HTTPException(status_code=403, detail={"error": err})

    # 3. Kiểm tra Giới Hạn Input Token (0 / trống = không giới hạn)
    max_input = int(rule.get("max_input_tokens_per_request") or 0)
    if max_input > 0 and est_input_tokens > max_input:
        err = f"Input tokens ({est_input_tokens}) exceed maximum allowed limit ({max_input}) for this PC"
        log_request(client_ip, client_mac, machine_name, provider, model_name, subpath, 400, "BLOCKED_INPUT_TOKENS", est_input_tokens, 0, 0, err)
        raise HTTPException(status_code=400, detail={"error": err})

    # 4. Kiểm tra Daily Quota (0 / trống = không giới hạn)
    daily_quota = int(rule.get("daily_total_token_quota") or 0)
    if daily_quota > 0 and is_inference:
        current_daily_used = get_daily_token_usage(client_ip, client_mac)
        if current_daily_used + est_input_tokens > daily_quota:
            err = f"Daily token quota exceeded ({current_daily_used}/{daily_quota} tokens used today) for {machine_name}"
            log_request(client_ip, client_mac, machine_name, provider, model_name, subpath, 429, "BLOCKED_DAILY_QUOTA", est_input_tokens, 0, 0, err)
            raise HTTPException(status_code=429, detail={"error": err})

    # 5. Xây dựng Upstream URL & Headers
    upstream_url = f"{base_upstream}/{subpath}"
    if request.url.query:
        upstream_url += f"?{request.url.query}"

    # Sao chép và hiệu chỉnh Headers
    # Sao chép và hiệu chỉnh Headers (loại bỏ hop-by-hop headers)
    headers = {
        k: v for k, v in request.headers.items()
        if k.lower() not in ("host", "content-length", "connection", "keep-alive", "transfer-encoding")
    }
    
    # Đảm bảo SNI / Host đúng với target upstream
    parsed_host = base_upstream.replace("https://", "").replace("http://", "").split("/")[0]
    headers["Host"] = parsed_host
    # Chỉ nhận gzip/deflate để luôn giải nén được response và đọc usage token
    headers["accept-encoding"] = "gzip, deflate"

    tracker = StreamingTokenTracker(provider, est_input_tokens)

    # 6. Gửi Request lên Upstream Cloud LLM (dùng persistent pool và retry cho transient DNS/network error)
    global http_client
    active_client = http_client
    if active_client is None or active_client.is_closed:
        active_client = httpx.AsyncClient(timeout=180.0, limits=httpx.Limits(max_keepalive_connections=50, max_connections=200))

    try:
        last_exc = None
        upstream_resp = None
        for attempt in range(3):
            try:
                upstream_req = active_client.build_request(
                    method=request.method,
                    url=upstream_url,
                    headers=headers,
                    content=body_bytes
                )
                upstream_resp = await active_client.send(upstream_req, stream=True)
                last_exc = None
                break
            except (httpx.ConnectError, httpx.ConnectTimeout) as ce:
                last_exc = ce
                if attempt < 2:
                    await asyncio.sleep(0.15 * (attempt + 1))
                    continue
                raise ce

        if last_exc is not None or upstream_resp is None:
            raise last_exc or RuntimeError("Failed to get upstream response")

        # Xử lý trường hợp Streaming response (SSE, gRPC-web, chunked)
        content_type = upstream_resp.headers.get("content-type", "")
        is_stream = "text/event-stream" in content_type or "chunked" in upstream_resp.headers.get("transfer-encoding", "") or "grpc" in content_type

        if is_stream:
            async def response_streamer():
                try:
                    async for chunk in upstream_resp.aiter_bytes():
                        tracker.process_chunk(chunk)
                        yield chunk
                finally:
                    await upstream_resp.aclose()
                    in_tok, out_tok = tracker.finalize()
                    latency = int((time.time() - start_time) * 1000)
                    log_request(
                        client_ip, client_mac, machine_name, provider, model_name,
                        subpath, upstream_resp.status_code, "ALLOWED", in_tok, out_tok, latency
                    )

            # Loại bỏ hop-by-hop headers và encoding gốc vì aiter_bytes() đã giải nén
            resp_headers = {
                k: v for k, v in upstream_resp.headers.items()
                if k.lower() not in ("content-length", "content-encoding", "transfer-encoding", "connection", "keep-alive")
            }
            return StreamingResponse(
                response_streamer(),
                status_code=upstream_resp.status_code,
                headers=resp_headers
            )
        else:
            # Non-streaming response
            resp_bytes = await upstream_resp.aread()
            await upstream_resp.aclose()
            
            tracker.process_chunk(resp_bytes)
            in_tok, out_tok = tracker.finalize()
            latency = int((time.time() - start_time) * 1000)
            
            log_request(
                client_ip, client_mac, machine_name, provider, model_name,
                subpath, upstream_resp.status_code, "ALLOWED", in_tok, out_tok, latency
            )
            return Response(
                content=resp_bytes,
                status_code=upstream_resp.status_code,
                media_type=content_type
            )

    except Exception as e:
        latency = int((time.time() - start_time) * 1000)
        err = f"Upstream connection error: {str(e)}"
        log_request(client_ip, client_mac, machine_name, provider, model_name, subpath, 502, "ERROR", est_input_tokens, 0, latency, err)
        raise HTTPException(status_code=502, detail={"error": err})

# ==================== PROVIDER ENDPOINTS ====================

ALL_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"]

@app.api_route("/google/{subpath:path}", methods=ALL_METHODS)
async def route_google(request: Request, subpath: str):
    return await handle_proxy_request(request, "google", subpath)

@app.api_route("/anthropic/{subpath:path}", methods=ALL_METHODS)
async def route_anthropic(request: Request, subpath: str):
    return await handle_proxy_request(request, "anthropic", subpath)

@app.api_route("/openai/{subpath:path}", methods=ALL_METHODS)
async def route_openai(request: Request, subpath: str):
    return await handle_proxy_request(request, "openai", subpath)

@app.api_route("/copilot/{subpath:path}", methods=ALL_METHODS)
async def route_copilot(request: Request, subpath: str):
    return await handle_proxy_request(request, "copilot", subpath)

# Universal / Fallback detection
@app.api_route("/v1/messages", methods=["POST"])
async def direct_claude_messages(request: Request):
    return await handle_proxy_request(request, "anthropic", "v1/messages")

@app.api_route("/v1/chat/completions", methods=["POST"])
async def direct_openai_completions(request: Request):
    return await handle_proxy_request(request, "openai", "v1/chat/completions")

@app.api_route("/v1internal:{subpath:path}", methods=["GET", "POST", "PUT", "DELETE"])
@app.api_route("/v1internal/{subpath:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def direct_google_v1internal(request: Request, subpath: str = ""):
    p = request.url.path.lstrip("/")
    return await handle_proxy_request(request, "google", p)

@app.api_route("/exa.{subpath:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def direct_google_exa(request: Request, subpath: str = ""):
    p = request.url.path.lstrip("/")
    return await handle_proxy_request(request, "google", p)

if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    reload_mode = os.getenv("RELOAD", "false").lower() in ("true", "1", "yes")
    print(f"[INFO] Starting LLM Proxy Gateway on {host}:{port} (reload={reload_mode})")
    # Tùy chọn bật TLS để client kết nối https:// và wss:// trực tiếp vào Gateway
    ssl_cert = os.getenv("SSL_CERTFILE")
    ssl_key = os.getenv("SSL_KEYFILE")
    ssl_kwargs = {}
    if ssl_cert and ssl_key and os.path.exists(ssl_cert) and os.path.exists(ssl_key):
        ssl_kwargs = {"ssl_certfile": ssl_cert, "ssl_keyfile": ssl_key}
        print(f"[INFO] TLS enabled (https/wss) with cert {ssl_cert}")
    uvicorn.run("proxy_server:app", host=host, port=port, reload=reload_mode, **ssl_kwargs)
