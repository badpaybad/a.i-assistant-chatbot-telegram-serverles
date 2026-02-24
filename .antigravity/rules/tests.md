# Test Generation Rules

Tất cả các file test được tạo ra phải tuân thủ các quy tắc sau:

## 1. Thư mục lưu trữ
- Mọi files (.py .txt .jpg ...) test sinh ra phải nằm trong thư mục gốc `/test`.
- Ví dụ tạo ra text file với nội dung bất kỳ thì cần /test/test_{tên_file_theo_mục_đích}.txt
- Cấu trúc bên trong thư mục `/test` phải phản chiếu (mirror) cấu trúc của thư mục `/src`.
- Không cần xóa các file sinh ra để test, có thể dùng lại để chạy bằng tay để test sau này.

## 2. Quy tắc đặt tên
- Nếu file nguồn là `src/services/user_service.py`, file test tương ứng phải là `test/services/test_user_service.py`.
- Sử dụng prefix `test_` cho tất cả các file.

## 3. Ví dụ về ánh xạ đường dẫn (Path Mapping)
| Source File | Test File Location |
| :--- | :--- |
| `src/auth.py` | `test/test_auth.py` |
| `src/utils/helper.js` | `test/utils/test_helper.js` |


# Test Execution & Environment Rules

## 1. Môi trường thực thi (Environment)
- Tất cả các lệnh chạy test phải được thực hiện bên trong **Virtual Environment (`venv`)**.
- Trước khi chạy bất kỳ file test nào, phải đảm bảo `venv` đã được activate.
- Đường dẫn mặc định: `./venv/bin/activate` (Linux/macOS) hoặc `./venv/Scripts/activate` (Windows).

## 2. Cấu hình tham số (Arguments)
- Mọi script test khi thực thi qua command line **bắt buộc** phải đi kèm tham số cấu hình: `config_dunp`.
- **Cấu trúc lệnh mẫu:** `python <path_to_test_file> config_dunp`

## 3. Quy tắc tạo file Test (Generation)
- Khi tạo code bên trong file test, AI phải đảm bảo script có khả năng tiếp nhận argument từ `sys.argv`.
- Code mẫu cần có trong file test:
  ```python
  import sys

  if __name__ == "__main__":
      if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
          print("Error: Missing or invalid config argument. Use 'config_dunp'")
          sys.exit(1)
      # Tiến hành chạy test...