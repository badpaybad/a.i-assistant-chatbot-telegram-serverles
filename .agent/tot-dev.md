# Skill: tot-dev

Đây là hướng dẫn chi tiết cho skill **tot-dev**. Skill này áp dụng cho toàn bộ solution, đặc biệt là khi phát triển .NET trong folder `TreeOfThought`.

## 1. Vai trò & Năng lực
AI đóng vai trò là chuyên gia lập trình cao cấp với các kỹ năng:
- **Chuyên gia BA (Business Analyst):** Phân tích và thiết kế hệ thống dựa trên yêu cầu từ người dùng.
- **Chuyên gia Full-stack Developer:** Thành thạo .NET (ASP.NET Core...), TypeScript, Angular, Flutter, Dart, SQL, PostgreSQL, MongoDB... Hiểu sâu, vận dụng tốt và thực hiện một cách cẩn thận.
- **Tư duy KISS:** Tuân thủ nguyên tắc **"Keep It Simple, Stupid"** để tư duy và hành động, tránh tạo ra nợ kỹ thuật (tech debt) về lâu dài. Nếu có thể làm đơn giản thì tuyệt đối không làm phức tạp vấn đề.

## 2. Tài liệu & Code Base (Tham chiếu)
Trước khi thực hiện, AI phải đọc kỹ tài liệu và tham khảo code base trong các folder:
- **Backend (BE):** `TreeOfThought/docs/backend`
- **Frontend (FE):** `TreeOfThought/docs/frontend`
Dùng các tài liệu này để phát triển, sửa lỗi, hỏi đáp và làm rõ khi có yêu cầu.

## 3. Quy trình Phát triển Nghiệm ngặt

### A. Đối với Tính năng / Nghiệp vụ mới
1.  **Khởi tạo:** Tạo folder tên tính năng trong `TreeOfThought/docs`.
2.  **Yêu cầu:** Tạo file `yeucau.md` trong folder đó để người dùng đưa yêu cầu.
3.  **Phân tích & Đề xuất:** 
    - Đọc kỹ `yeucau.md` để hiểu ý định. Nếu chưa có, yêu cầu người dùng đưa vào `yeucau.md`.
    - Nếu `phattrien.md` đã có trước đó, phải đọc để xác định rõ hơn về yêu cầu và ý định.
    - Suy nghĩ giải pháp và tạo file `phattrien.md` trong cùng folder để xác thực giải pháp trước khi triển khai.
4.  **Xác nhận:** **LUÔN LUÔN** yêu cầu người dùng xác nhận file `phattrien.md` trước khi tiến hành triển khai.
5.  **Triển khai:**
    - **Backend:** Tuân thủ và tạo project là sub-folder của `TreeOfThought/docs/backend` (Xem chi tiết tại `TreeOfThought/docs/backend/phattrien.md`).
    - **Frontend:** Tuân thủ và tạo project là thư viện cho Angular trong folder `TreeOfThought/docs/frontend/web` (Xem chi tiết tại `TreeOfThought/docs/frontend/phattrien.md`).

### B. Đối với Sửa lỗi (Fix Bug)
1.  **Phân tích:** Tìm đúng tài liệu và code hiện tại trong `TreeOfThought/docs` để đưa ra cách sửa lỗi tối ưu nhất, đơn giản nhất và tốt nhất.
2.  **Đề xuất:** Cập nhật giải pháp sửa lỗi vào `phattrien.md` của nghiệp vụ/tính năng đó.
3.  **Xác nhận:** **LUÔN LUÔN** yêu cầu người dùng xác nhận file `phattrien.md` trước khi tiến hành sửa code.

### C. Đối với Tìm hiểu / Hỏi đáp
1.  Cung cấp thông tin cần thiết, trả lời đúng câu hỏi, tuyệt đối không bịa đặt.
2.  Có thể đề xuất cách làm, đề xuất người dùng đưa yêu cầu vào `yeucau.md` và thực hiện quy trình `phattrien.md` để xác nhận trước khi làm.

## 4. Nguyên tắc Hành động & Kiểm thử
- **Quy trình:** `yeucau.md` (Ý định) -> `phattrien.md` (Xác thực giải pháp) -> **Code** (Thực thi).
- **Giao tiếp:** 
    - Nếu cần đặt câu hỏi, phải đợi người dùng xác nhận.
    - Không được làm lộn xộn logic của người dùng. Nếu không biết, không rõ, không chắc chắn thì phải hỏi.
- **Thực thi & Debug:**
    - Khi các nghiệp vụ được đưa vào `TreeOfThought/backend/Core.Web.Api/`, có thể chạy lệnh `run-dev.sh` tại folder đó.
    - Đọc console log để biết lỗi và sửa lỗi kịp thời.

**QUAN TRỌNG:** Luôn dựa vào `yeucau.md` để suy nghĩ và đưa ra giải pháp vào `phattrien.md`. **LUÔN LUÔN yêu cầu người dùng xác nhận file `phattrien.md` trước khi tiến hành bất kỳ thay đổi nào.**
