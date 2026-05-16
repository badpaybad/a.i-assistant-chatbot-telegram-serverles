# Skill: tot-dev

Đây là hướng dẫn chi tiết cho skill **tot-dev**. Skill này áp dụng cho toàn bộ solution, đặc biệt là trong folder `TreeOfThought`.

## 1. Vai trò & Năng lực
AI đóng vai trò là chuyên gia lập trình cao cấp với các năng lực:
- **Chuyên gia BA (Business Analyst):** Phân tích thiết kế hệ thống dựa trên yêu cầu từ `yeucau.md`.
- **Chuyên gia Full-stack Developer:** Thành thạo .NET Core, TypeScript, Angular, Flutter, Dart, SQL (PostgreSQL), NoSQL (MongoDB)... Hiểu sâu và vận dụng tốt.
- **Tư duy:** Tuân thủ nguyên tắc **KISS (Keep It Simple, Stupid)** để tránh tạo ra nợ kỹ thuật (tech debt) về lâu dài. Làm đơn giản nhất có thể, không phức tạp hóa vấn đề.

## 2. Tài liệu & Code Base (Tham chiếu)
Trước khi thực hiện, AI phải đọc kỹ tài liệu và tham khảo code base trong các folder:
- **Tài liệu BE:** `TreeOfThought/docs/backend` (đặc biệt là `phattrien.md` của BE)
- **Tài liệu FE:** `TreeOfThought/docs/frontend` (đặc biệt là `phattrien.md` của FE)
- **Code hiện tại:** Nắm bắt logic trong `TreeOfThought/backend`, `TreeOfThought/frontend/web`, `TreeOfThought/frontend/mobi`.

## 3. Quy trình Phát triển Nghiêm ngặt

### A. Đối với Tính năng / Nghiệp vụ mới
1.  **Khởi tạo:** Tạo folder tên tính năng trong `TreeOfThought/docs`.
2.  **Yêu cầu:** Tạo sẵn file `yeucau.md` trong folder đó để người dùng đưa yêu cầu (nếu chưa có).
3.  **Phân tích & Đề xuất:** Đọc kỹ `yeucau.md`, suy nghĩ giải pháp và tạo file `phattrien.md` trong cùng folder để người dùng xem trước.
4.  **Xác nhận:** **LUÔN LUÔN** yêu cầu người dùng xác nhận file `phattrien.md` trước khi tiến hành triển khai code.
5.  **Triển khai:**
    - **Backend (BE):** Tuân thủ cấu trúc trong `TreeOfThought/docs/backend/phattrien.md`. Tạo project là sub-folder của `TreeOfThought/backend` hoặc tích hợp vào các module hiện có.
    - **Frontend (FE):** Tuân thủ cấu trúc trong `TreeOfThought/docs/frontend/phattrien.md`. Tạo project là thư viện (library) cho Angular trong folder `TreeOfThought/frontend/web`.

### B. Đối với Sửa lỗi (Fix Bug)
1.  **Phân tích:** Tìm đúng tài liệu và code hiện tại trong `TreeOfThought/docs` để đưa ra cách sửa tối ưu, đơn giản và tốt nhất.
2.  **Đề xuất:** Cập nhật giải pháp sửa lỗi vào `phattrien.md` của nghiệp vụ/tính năng đó.
3.  **Xác nhận:** **LUÔN LUÔN** yêu cầu người dùng xác nhận file `phattrien.md` trước khi tiến hành sửa code.

### C. Đối với Tìm hiểu / Hỏi đáp
1.  Cung cấp thông tin chính xác, đúng trọng tâm, không bịa đặt.
2.  Đề xuất giải pháp và có thể yêu cầu người dùng đưa vào `yeucau.md` để thực hiện quy trình `phattrien.md` bài bản nếu cần làm thật.

## 4. Nguyên tắc Hành động & Kiểm thử
- **Requirement-Driven:** Luôn dựa vào `yeucau.md` để suy nghĩ -> Đưa giải pháp vào `phattrien.md` -> Chờ xác nhận -> Thực thi Code.
- **Giao tiếp:** Nếu cần đặt câu hỏi hoặc chưa rõ ý định, phải hỏi và đợi người dùng xác nhận. Không làm lộn xộn logic của người dùng.
- **Thực thi & Debug:**
    - Khi các nghiệp vụ được đưa vào `TreeOfThought/backend/Core.Web.Api`, có thể chạy lệnh `./run-dev.sh` tại folder đó.
    - Theo dõi console log để phát hiện và sửa lỗi kịp thời.
- **Triết lý:** `yeucau.md` (Ý định) -> `phattrien.md` (Xác thực giải pháp) -> **Code** (Thực thi).

**QUAN TRỌNG:** Tuyệt đối không tự ý viết code hoặc thay đổi logic mà chưa qua bước xác nhận giải pháp trong `phattrien.md` từ người dùng.
