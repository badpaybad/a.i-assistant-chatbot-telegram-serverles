import asyncio
import logging
import serial
import serial.tools.list_ports
import json
import sys
from mcp.server.lowlevel import Server
import mcp.types as types

# Khởi tạo Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("mcp-cnc-advanced-server")

cnc_connection = None
server = Server("mcp-cnc-advanced-controller")

# ------------------------------------------------------------------
# RESOURCES & TOOLS (Logic xử lý phần cứng CNC)
# ------------------------------------------------------------------
@server.list_resources()
async def handle_list_resources() -> list[types.Resource]:
    return [
        types.Resource(
            uri="cnc://connection_status",
            name="CNC Connection Status",
            description="Thông tin cấu hình kết nối hiện tại.",
            mimeType="application/json"
        )
    ]

@server.read_resource()
async def handle_read_resource(uri: str) -> str:
    global cnc_connection
    if uri == "cnc://connection_status":
        if cnc_connection and cnc_connection.is_open:
            return json.dumps({"connected": True, "port": cnc_connection.port, "baudrate": cnc_connection.baudrate})
        return json.dumps({"connected": False, "port": None, "baudrate": None})
    raise ValueError(f"Không tìm thấy tài nguyên: {uri}")

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="scan_serial_ports",
            description="Quét toàn bộ hệ thống để tìm các cổng USB Serial đang cắm.",
            inputSchema={"type": "object", "properties": {}}
        ),
        types.Tool(
            name="connect_cnc",
            description="Thiết lập kết nối Serial tới máy CNC.",
            inputSchema={
                "type": "object",
                "properties": {
                    "port": {"type": "string", "description": "Ví dụ: /dev/ttyUSB0 hoặc COM3"},
                    "baudrate": {"type": "integer", "default": 115200}
                },
                "required": ["port"]
            }
        ),
        types.Tool(
            name="send_gcode",
            description="Gửi lệnh G-code đến máy CNC.",
            inputSchema={
                "type": "object",
                "properties": {"gcode": {"type": "string"}},
                "required": ["gcode"]
            }
        )
    ]

@server.call_tool()
async def handle_call_tool(name: str, arguments: dict | None) -> list[types.TextContent]:
    global cnc_connection
    if name == "scan_serial_ports":
        ports = serial.tools.list_ports.comports()
        return [types.TextContent(type="text", text=json.dumps([{"port": p.device, "desc": p.description} for p in ports], indent=2))]
    
    elif name == "connect_cnc":
        port = arguments.get("port")
        baudrate = arguments.get("baudrate", 115200)
        try:
            if cnc_connection and cnc_connection.is_open:
                cnc_connection.close()
            cnc_connection = serial.Serial(port, baudrate, timeout=1)
            await asyncio.sleep(2) # Chờ chip nạp lại
            return [types.TextContent(type="text", text=f"Kết nối thành công tới {port}")]
        except Exception as e:
            return [types.TextContent(type="text", text=f"Lỗi kết nối: {str(e)}")]
            
    elif name == "send_gcode":
        gcode = arguments.get("gcode", "").strip()
        if not cnc_connection or not cnc_connection.is_open:
            return [types.TextContent(type="text", text="Lỗi: Chưa kết nối CNC.")]
        cnc_connection.write(f"{gcode}\n".encode())
        return [types.TextContent(type="text", text=f"Đã gửi lệnh: {gcode}")]

    raise ValueError(f"Không tìm thấy tool: {name}")

# ------------------------------------------------------------------
# ĐA GIAO THỨC KHỞI CHẠY (STDIO vs WEB HTTP/SSE)
# ------------------------------------------------------------------
async def run_stdio():
    """Chạy chế độ STDIO chuẩn mực (Cho Cursor, Claude Desktop)"""
    from mcp.server.stdio import stdio_server
    logger.info("Đang chạy MCP Server ở chế độ STDIO...")
    async with stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream, write_stream, server.create_initialization_options()
        )


def run_web():
    """Chạy chế độ Web Server bẻ khóa hoàn toàn Response bằng ASGI App thô"""
    from fastapi import FastAPI, Request
    from fastapi.responses import RedirectResponse
    from mcp.server.sse import SseServerTransport
    from starlette.routing import Mount
    import uvicorn

    # Định tuyến đích cho các gói tin nhắn phản hồi RPC
    transport = SseServerTransport("/messages")

    # BIẾN THÀNH ASGI APP THÔ: Không nhận Request, tuân thủ đúng chữ ký hàm ASGI (scope, receive, send)
    async def handle_messages_asgi(scope, receive, send):
        """Ủy quyền 100% cho MCP SDK tự đọc và tự đóng phản hồi HTTP"""
        await transport.handle_post_message(scope, receive, send)

    # Sử dụng Mount để gắn ASGI App thô này trực tiếp vào Router của FastAPI lúc khởi tạo
    app = FastAPI(
        title="CNC MCP Multi-Protocol Gateway", 
        version="1.0.0",
        routes=[
            Mount("/messages", app=handle_messages_asgi)
        ]
    )

    @app.get("/", include_in_schema=False)
    async def index():
        return RedirectResponse(url="/docs")

    @app.get("/sse")
    async def handle_sse(request: Request):
        """Endpoint thiết lập kết nối SSE với Client và liên kết với nhân xử lý cùng lúc"""
        async with transport.connect_sse(request.scope, request.receive, request._send) as (read_stream, write_stream):
            await server.run(
                read_stream,
                write_stream,
                server.create_initialization_options()
            )

    logger.info("Đang chạy Web Server tại http://localhost:8000 (Mở /docs để xem Swagger)...")
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "web":
        run_web()
    else:
        asyncio.run(run_stdio())

# pip install mcp fastapi uvicorn sse-starlette anyio pyserial