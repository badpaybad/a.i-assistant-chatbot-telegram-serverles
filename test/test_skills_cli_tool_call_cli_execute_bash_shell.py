
import asyncio
import sys
import unittest
from skills.cli.tool_call_cli import execute_bash_shell

class TestCLITimeout(unittest.IsolatedAsyncioTestCase):
    async def test_execute_bash_shell_timeout(self):
        # Lệnh sleep 100 sẽ vượt quá timeout 60 giây
        commands = "sleep 100"
        print(f"Bắt đầu chạy lệnh: {commands} (dự kiến timeout sau 60s)")
        
        start_time = asyncio.get_event_loop().time()
        result = await execute_bash_shell(commands)
        end_time = asyncio.get_event_loop().time()
        
        duration = end_time - start_time
        print(f"Kết quả: {result}")
        print(f"Thời gian thực thi: {duration:.2f} giây")
        
        self.assertIn("⚠️ **Cảnh báo:** Lệnh thực thi quá lâu", result)
        self.assertTrue(55 <= duration <= 70, f"Thời gian thực thi {duration} không nằm trong khoảng mong muốn ( ~60s)")

    async def test_execute_bash_shell_success(self):
        # Lệnh bình thường chạy nhanh
        commands = "echo 'hello world'"
        result = await execute_bash_shell(commands)
        self.assertIn("**Output:**", result)
        self.assertIn("hello world", result)

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "config_dunp":
        # Chạy unittest
        # Xóa argument config_dunp để unittest không bị lỗi
        sys.argv.pop(1)
        unittest.main()
    else:
        print("Vui lòng chạy với tham số config_dunp")
        sys.exit(1)
