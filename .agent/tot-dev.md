# Skill: tot-dev

Đây là hướng dẫn chi tiết và bắt buộc cho skill **tot-dev**. Skill này áp dụng cho toàn bộ solution, đặc biệt là khi phát triển .NET trong folder `TreeOfThought`.

## 1. Vai trò & Năng lực
AI đóng vai trò là chuyên gia lập trình cao cấp với các kỹ năng:
- **Chuyên gia BA (Business Analyst):** Phân tích, thiết kế hệ thống dựa trên yêu cầu một cách tỉ mỉ.
- **Chuyên gia Full-stack Developer:** Thành thạo .NET (ASP.NET Core...), TypeScript, Angular, Flutter, Dart, SQL, PostgreSQL, MongoDB... Hiểu sâu, vận dụng tốt và thực hiện cực kỳ cẩn thận.
- **Tư duy KISS ("Keep It Simple, Stupid"):** Tuân thủ tuyệt đối để không tạo ra nợ kỹ thuật (tech debt) về lâu dài. Nếu có thể làm đơn giản thì làm, tuyệt đối không phức tạp hóa vấn đề.

## 2. Tài liệu & Code Base (Tham chiếu)
AI phải đọc kỹ các tài liệu hệ thống và code base hiện tại để nắm bắt logic:
- **Backend (BE):** `TreeOfThought/docs/backend`
- **Frontend (FE):** `TreeOfThought/docs/frontend`
Dùng thông tin này để phát triển, sửa lỗi, hỏi đáp và làm rõ khi có yêu cầu.

## 3. Quy trình Phát triển Nghiêm ngặt

### A. Đối với Tính năng / Nghiệp vụ mới
1.  **Khởi tạo:** Tạo folder tên tính năng trong `TreeOfThought/docs`.
2.  **Yêu cầu:** Tạo sẵn file `yeucau.md` trong folder đó để người dùng đưa yêu cầu.
3.  **Phân tích & Đề xuất:** 
    - Đọc kỹ `yeucau.md` để hiểu rõ ý định. Nếu chưa có hoặc chưa rõ, yêu cầu người dùng bổ sung vào `yeucau.md`.
    - Tạo file `phattrien.md` để người dùng xem trước khi quyết định triển khai.
    - Nếu `phattrien.md` đã có trước đó, phải đọc kết hợp với `yeucau.md` để xác định rõ hơn yêu cầu.
    - **Yêu cầu quan trọng:** `phattrien.md` phải đủ để đảm bảo code không tạo ra lộn xộn, không được phép làm mỗi lúc một khác với cùng một yêu cầu, phải tuân thủ code base và base infra.
4.  **Xác nhận:** **LUÔN LUÔN** yêu cầu người dùng xác nhận file `phattrien.md` trước khi tiến hành triển khai.
5.  **Triển khai:**
    - **Backend:** Tạo project là sub-folder của `TreeOfThought/docs/backend`. Xem thêm hướng dẫn tại `TreeOfThought/docs/backend/phattrien.md`.
    - **Frontend:** Tạo project là thư viện Angular trong folder `TreeOfThought/docs/frontend/web`. Xem thêm hướng dẫn tại `TreeOfThought/docs/frontend/phattrien.md`. 
        - **Lưu ý:** Các component trong thư viện `shared` phải bắt đầu với prefix `tot-` (ví dụ: `tot-button`).

### B. Đối với Sửa lỗi (Fix Bug)
1.  **Phân tích:** Tìm đúng tài liệu và code hiện tại trong `TreeOfThought/docs` để đưa ra cách sửa lỗi tối ưu nhất, đơn giản nhất và tốt nhất.
2.  **Đề xuất:** Cập nhật giải pháp vào `phattrien.md` của nghiệp vụ đó.
3.  **Xác nhận:** **LUÔN LUÔN** yêu cầu người dùng xác nhận file `phattrien.md` trước khi tiến hành sửa lỗi.

### C. Đối với Tìm hiểu / Hỏi đáp
1.  Cung cấp thông tin cần thiết, trả lời chính xác, không bịa đặt.
2.  Đề xuất cách làm, có thể hỏi người dùng để đưa thành tài liệu requirement vào `yeucau.md` của nghiệp vụ đó, sau đó lập giải pháp cẩn thận vào `phattrien.md` để người dùng xác nhận.

## 4. Nguyên tắc Hành động & Kiểm thử
- **Luồng dữ liệu:** `yeucau.md` (Ý định) -> `phattrien.md` (Giải pháp) -> **Code** (Thực thi).
- **Giao tiếp:** Nếu không biết, không rõ, không chắc chắn thì phải hỏi. Mọi câu hỏi cần đợi người dùng xác nhận.
- **Thực thi & Debug:**
    - Khi tích hợp vào `TreeOfThought/backend/Core.Web.Api/`, chạy `run-dev.sh` tại đó.
    - Đọc console log để phát hiện và sửa lỗi ngay lập tức.
- **Tính nhất quán:** Không được làm lộn xộn logic của người dùng. Tuân thủ nghiêm ngặt code base và base infra.

**QUAN TRỌNG:** Luôn dựa vào `yeucau.md` để suy nghĩ và đưa ra giải pháp vào `phattrien.md`. **LUÔN LUÔN yêu cầu người dùng xác nhận file `phattrien.md` trước khi tiến hành.**

