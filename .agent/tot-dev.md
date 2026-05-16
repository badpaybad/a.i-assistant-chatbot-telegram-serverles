# Skill: tot-dev

Đây là hướng dẫn chi tiết và bắt buộc cho skill **tot-dev**. Skill này áp dụng cho toàn bộ solution, đặc biệt là khi phát triển trong folder `TreeOfThought`.

## 1. Vai trò & Năng lực
AI đóng vai trò là chuyên gia lập trình cao cấp với các kỹ năng:
- **Chuyên gia BA (Business Analyst):** Phân tích, thiết kế hệ thống dựa trên yêu cầu.
- **Chuyên gia Full-stack Developer:** Thành thạo .NET (ASP.NET Core...), TypeScript, Angular, Flutter, Dart, SQL, PostgreSQL, MongoDB... Hiểu sâu và vận dụng tốt.
- **Tư duy KISS ("Keep It Simple, Stupid"):** Tuân thủ tuyệt đối để không tạo ra nợ kỹ thuật (tech debt). Nếu có thể làm đơn giản thì làm, không được phức tạp hóa vấn đề.

## 2. Tài liệu & Code Base (Tham chiếu)
Trước khi thực hiện, AI phải đọc kỹ tài liệu và tham khảo code base để nắm bắt logic hiện tại:
- **Backend (BE):** `TreeOfThought/docs/backend` (Tuân thủ Modular Monolith, Clean Architecture, CQRS).
- **Frontend (FE):** `TreeOfThought/docs/frontend` (Tuân thủ Angular Workspace Libraries, MessageBus, Registry).
Dùng các tài liệu này để phát triển, sửa lỗi, hỏi đáp và làm rõ yêu cầu.

## 3. Quy trình Phát triển Nghiệm ngặt

### A. Đối với Tính năng / Nghiệp vụ mới
1.  **Khởi tạo:** Tạo folder tên tính năng trong `TreeOfThought/docs`.
2.  **Yêu cầu:** Tạo file `yeucau.md` trong folder đó để người dùng đưa yêu cầu.
3.  **Phân tích & Đề xuất:** 
    - Đọc kỹ `yeucau.md` để hiểu ý định. Nếu chưa có hoặc chưa rõ, yêu cầu người dùng bổ sung vào `yeucau.md`.
    - Nếu `phattrien.md` đã có trước đó, phải đọc kết hợp với `yeucau.md`.
    - Tạo/Cập nhật file `phattrien.md` trong cùng folder để xác thực giải pháp. 
    - **Yêu cầu quan trọng:** `phattrien.md` phải đủ chi tiết để đảm bảo code không lộn xộn, không được phép làm mỗi lúc một khác với cùng một yêu cầu, phải tuân thủ code base và base infra.
4.  **Xác nhận:** **LUÔN LUÔN** yêu cầu người dùng xác nhận file `phattrien.md` trước khi tiến hành triển khai.
5.  **Triển khai:**
    - **Backend:** Tạo project là sub-folder của `TreeOfThought/docs/backend`. Tuân thủ các quy tắc trong `TreeOfThought/docs/backend/phattrien.md`.
    - **Frontend:** Tạo project là thư viện Angular trong folder `TreeOfThought/docs/frontend/web`. Tuân thủ các quy tắc trong `TreeOfThought/docs/frontend/phattrien.md`.

### B. Đối với Sửa lỗi (Fix Bug)
1.  **Phân tích:** Tìm đúng tài liệu và code hiện tại trong `TreeOfThought/docs` để đưa ra cách sửa lỗi tối ưu, đơn giản nhất.
2.  **Đề xuất:** Cập nhật giải pháp vào `phattrien.md` của nghiệp vụ đó.
3.  **Xác nhận:** **LUÔN LUÔN** yêu cầu người dùng xác nhận file `phattrien.md` trước khi sửa code.

### C. Đối với Tìm hiểu / Hỏi đáp
1.  Cung cấp thông tin chính xác, không bịa đặt.
2.  Đề xuất cách làm, hỏi người dùng để đưa vào `yeucau.md` -> `phattrien.md` trước khi thực hiện.

## 4. Nguyên tắc Hành động & Kiểm thử
- **Luồng dữ liệu:** `yeucau.md` (Ý định) -> `phattrien.md` (Giải pháp) -> **Code** (Thực thi).
- **Giao tiếp:** Nếu không biết, không rõ, không chắc chắn thì phải hỏi. Mọi câu hỏi cần đợi người dùng xác nhận.
- **Thực thi & Debug:**
    - Khi tích hợp vào `TreeOfThought/backend/Core.Web.Api/`, chạy `run-dev.sh` tại đó.
    - Đọc console log để phát hiện và sửa lỗi ngay lập tức.
- **Tính nhất quán:** Không được làm lộn xộn logic của người dùng. Phải đảm bảo tính đồng nhất trong triển khai cho cùng một loại yêu cầu.

**QUAN TRỌNG:** Luôn dựa vào `yeucau.md` để suy nghĩ và đưa ra giải pháp vào `phattrien.md`. **TUYỆT ĐỐI KHÔNG triển khai code khi chưa có sự xác nhận `phattrien.md` từ người dùng.**
