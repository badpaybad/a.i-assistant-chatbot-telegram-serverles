# Giải pháp phát triển: Skill tot-dev cho AI IDE

## 1. Phân tích vấn đề
Dựa vào yêu cầu mới nhất trong `whattodo.md`, người dùng muốn tạo một cơ chế chuẩn hóa và nhất quán (Single Source of Truth) cho skill `tot-dev`. Thay vì lặp lại các đoạn system prompt dài dòng ở khắp các IDE, chúng ta sẽ lưu bộ luật chi tiết nhất vào một file duy nhất là `.agent/tot-dev.md`. Sau đó, các file cấu hình của từng AI IDE sẽ chỉ làm nhiệm vụ "chỉ điểm" (tham chiếu) về file gốc này.

## 2. Cách tiếp cận (Giải pháp)
Chúng ta sẽ chia cấu trúc cấu hình AI thành 2 tầng:

**Tầng 1: Nguồn chân lý (Single Source of Truth)**
- File: `.agent/tot-dev.md`
- Chức năng: Chứa toàn bộ nội dung chi tiết bằng tiếng Việt về vai trò, quy tắc KISS, quy trình bắt buộc phải đi qua `whattodo.md` -> `howtodo.md`, cách đặt tên thư mục tiếng Việt không dấu, và việc bảo vệ các thư mục core (`TreeOfThought/frontend`, `TreeOfThought/docs/backend`).

**Tầng 2: Điểm neo cho các IDE (Pointers)**
- Các file: `.cursorrules`, `.windsurfrules`, `.clinerules`, `.geminirules`, `.github/copilot-instructions.md`.
- Chức năng: Ép buộc các IDE (như Cursor, Windsurf, Cline, Copilot, Antigravity) phải đi vào đọc file `.agent/tot-dev.md` trước khi giải quyết bất cứ nghiệp vụ hay sửa lỗi nào.
- Nội dung (mẫu chung):
  ```markdown
  # System Instructions for AI
  You are an expert AI coding assistant. This project strictly follows the **tot-dev** methodology.
  
  **CRITICAL REQUIREMENT:**
  You MUST read and strictly adhere to the comprehensive guidelines and rules defined in the following file before proceeding with ANY task:
  👉 `.agent/tot-dev.md`
  
  Do not make assumptions about the workflow or repository structure.
  ```

## 3. Kế hoạch thực thi
1. Trình bày file `howtodo.md` này để **người dùng xác nhận**.
2. Khi người dùng duyệt:
   - Đảm bảo file `.agent/tot-dev.md` đã tồn tại và chứa đủ nội dung cần thiết.
   - Cập nhật toàn bộ 5 file pointer ở thư mục gốc trỏ về `.agent/tot-dev.md`.
