# Yêu cầu: Tạo skill tot-dev cho các AI IDE

Người dùng yêu cầu: "tạo skill: tot-dev để các A.I IDE đều dùng được". tạo vào .agent/tot-dev.md và các file rules của các AI IDE cần tham chiếu tới để AI đọc và tuân theo khi giải quyết nghiệp vụ hoặc sửa lỗi 

Ý định:
- Cần xuất bộ quy tắc đã được định nghĩa trong `TreeOfThought/howtodev/whattodo.md` ra thành các file cấu hình (rule/prompt) chuẩn.
- Các AI IDE (như Cursor, Windsurf, Cline, GitHub Copilot) khi mở project này sẽ tự động nhận diện và nạp các quy tắc này.
- Mục tiêu là để bắt kỳ AI nào cũng tuân thủ đúng quy trình làm việc `tot-dev`:
  + Tuân thủ KISS.
  + Đọc `whattodo.md` -> Viết `howtodo.md` -> Đợi xác nhận -> Mới code.
  + Áp dụng đúng cấu trúc folder tiếng Việt không dấu.
  + Không xóa/ghi đè core base.
