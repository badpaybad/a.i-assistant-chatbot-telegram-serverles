import asyncio
import logging
import serial
import serial.tools.list_ports
import json
from mcp.server.models import InitializationOptions
from mcp.server import NotificationOptions, Server
import mcp.types as types
from mcp.server.stdio import stdio_server

# Khởi tạo Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("mcp-cnc-advanced-server")

# Biến toàn cục quản lý kết nối CNC biến đổi động
cnc_connection = None

# Khởi tạo MCP Server
server = Server("mcp-cnc-advanced-controller")

# ------------------------------------------------------------------
# RESOURCES: Quản lý trạng thái kết nối hiện tại
# ------------------------------------------------------------------
@server.list_resources()
async def handle_list_resources() -> list[types.Resource]:
    return [
        types.Resource(
            uri="cnc://connection_status",
            name="CNC Connection Status",
            description="Thông tin cấu hình kết nối hiện tại (Port, Baudrate, Status).",
            mimeType="application/json"
        )
    ]

@server.read_resource()
async def handle_read_resource(uri: str) -> str:
    global cnc_connection
    if uri == "cnc://connection_status":
        if cnc_connection and cnc_connection.is_open:
            return json.dumps({
                "connected": True,
                "port": cnc_connection.port,
                "baudrate": cnc_connection.baudrate
            })
        return json.dumps({"connected": false, "port": None, "baudrate": None})
    raise ValueError(f"Không tìm thấy tài nguyên: {uri}")

# ------------------------------------------------------------------
# TOOLS: Định nghĩa các hành động dò tìm, kết nối và điều khiển
# ------------------------------------------------------------------
@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    return [
        # Tool 1: Quét danh sách cổng USB/Serial hiện có
        types.Tool(
            name="scan_serial_ports",
            description="Quét toàn bộ hệ thống để tìm các cổng USB Serial đang cắm. Trả về tên cổng, mô tả phần cứng và ID phần cứng để AI nhận biết thiết bị CNC.",
            inputSchema={"type": "object", "properties": {}}
        ),
        # Tool 2: Kết nối động vào một cổng cụ thể
        types.Tool(
            name="connect_cnc",
            description="Thiết lập kết nối Serial tới máy CNC với cổng và baudrate tùy chọn.",
            inputSchema={
                "type": "object",
                "properties": {
                    "port": {"type": "string", "description": "Tên cổng, ví dụ: '/dev/ttyUSB0' hoặc 'COM3'"},
                    "baudrate": {"type": "integer", "description": "Tốc độ baud, mặc định cho Grbl thường là 115200", "default": 115200}
                },
                "required": ["port"]
            }
        ),
        # Tool 3: Ngắt kết nối
        types.Tool(
            name="disconnect_cnc",
            description="Ngắt kết nối an toàn khỏi máy CNC hiện tại.",
            inputSchema={"type": "object", "properties": {}}
        ),
        # Tool 4: Gửi G-code (chỉ chạy khi đã kết nối)
        types.Tool(
            name="send_gcode",
            description="Gửi lệnh G-code đến máy CNC (Yêu cầu phải chạy connect_cnc trước).",
            inputSchema={
                "type": "object",
                "properties": {
                    "gcode": {"type": "string", "description": "Ví dụ: G0 X10 Y10 hoặc $H"}
                },
                "required": ["gcode"]
            }
        )
    ]

@server.call_tool()
async def handle_call_tool(name: str, arguments: dict | None) -> list[types.TextContent]:
    global cnc_connection

    # HÀNH ĐỘNG 1: QUÉT CỔNG
    if name == "scan_serial_ports":
        ports = serial.tools.list_ports.comports()
        if not ports:
            return [types.TextContent(type="text", text="Không tìm thấy cổng USB/Serial nào đang kết nối với máy tính.")]
        
        port_list = []
        for p in ports:
            port_list.append({
                "port": p.device,
                "description": p.description,
                "hwid": p.hwid
            })
        return [types.TextContent(type="text", text=json.dumps(port_list, indent=2))]

    # HÀNH ĐỘNG 2: KẾT NỐI
    elif name == "connect_cnc":
        port = arguments.get("port")
        baudrate = arguments.get("baudrate", 115200)

        # Nếu đang có kết nối cũ thì đóng lại
        if cnc_connection and cnc_connection.is_open:
            cnc_connection.close()

        try:
            cnc_connection = serial.Serial(port, baudrate, timeout=1)
            # Chờ một chút để vi điều khiển khởi động lại (Reset on Connect)
            await asyncio.sleep(2)
            # Đọc dòng chào mừng từ Grbl (nếu có)
            welcome_msg = ""
            if cnc_connection.in_waiting:
                welcome_msg = cnc_connection.read(cnc_connection.in_waiting).decode(errors='ignore').strip()
            
            return [types.TextContent(
                type="text", 
                text=f"Kết nối THÀNH CÔNG tới {port} ở tốc độ {baudrate}.\nPhản hồi ban đầu từ CNC: {welcome_msg}"
            )]
        except Exception as e:
            return [types.TextContent(type="text", text=f"LỖI KẾT NỐI tới {port}: {str(e)}")]

    # HÀNH ĐỘNG 3: NGẮT KẾT NỐI
    elif name == "disconnect_cnc":
        if cnc_connection and cnc_connection.is_open:
            port_name = cnc_connection.port
            cnc_connection.close()
            return [types.TextContent(type="text", text=f"Đã đóng kết nối an toàn với cổng {port_name}.")]
        return [types.TextContent(type="text", text="Hiện không có kết nối nào đang mở.")]

    # HÀNH ĐỘNG 4: GỬI LỆNH G-CODE
    elif name == "send_gcode":
        gcode = arguments.get("gcode", "").strip()
        if not cnc_connection or not cnc_connection.is_open:
            return [types.TextContent(
                type="text", 
                text="LỖI: Chưa thiết lập kết nối tới CNC. Hãy yêu cầu quét cổng và kết nối trước."
            )]
        
        try:
            cnc_connection.write(f"{gcode}\n".encode())
            await asyncio.sleep(0.1) # Chờ phần cứng xử lý
            
            # Đọc phản hồi phản hồi cho đến khi nhận được 'ok' hoặc 'error'
            response_lines = []
            timeout_counter = 0
            while timeout_counter < 20: # Tránh loop vô hạn
                if cnc_connection.in_waiting:
                    line = cnc_connection.readline().decode().strip()
                    if line:
                        response_lines.append(line)
                        if line.lower() == "ok" or "error" in line.lower():
                            break
                await asyncio.sleep(0.05)
                timeout_counter += 1

            return [types.TextContent(type="text", text=f"CNC Response:\n" + "\n".join(response_lines))]
        except Exception as e:
            return [types.TextContent(type="text", text=f"Lỗi khi truyền thông tin qua Serial: {str(e)}")]

    raise ValueError(f"Không tìm thấy tool: {name}")

# ------------------------------------------------------------------
# RUN SERVER
# ------------------------------------------------------------------
async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="cnc-mcp-advanced",
                server_version="1.1.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )

if __name__ == "__main__":
    asyncio.run(main())