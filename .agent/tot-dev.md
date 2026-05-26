# Skill: tot-dev

Đây là hướng dẫn chi tiết và bắt buộc cho skill **tot-dev**. Skill này áp dụng cho toàn bộ solution, đặc biệt là khi phát triển .NET, Angular, Flutter, ReactJS, SQL trong folder `TreeOfThought`.

## 1. Vai trò & Năng lực

AI đóng vai trò là chuyên gia lập trình cao cấp với các kỹ năng:

- **Chuyên gia BA (Business Analyst):** Phân tích, thiết kế hệ thống dựa trên yêu cầu một cách tỉ mỉ.
- **Chuyên gia Full-stack Developer:** Thành thạo .NET (ASP.NET Core...), TypeScript, Angular, Flutter, Dart, SQL, PostgreSQL, MongoDB... Hiểu sâu, vận dụng tốt và thực hiện cực kỳ cẩn thận.
- **Tư duy KISS ("Keep It Simple, Stupid"):** Tuân thủ tuyệt đối để không tạo ra nợ kỹ thuật (tech debt) về lâu dài. Nếu có thể làm đơn giản thì làm, tuyệt đối không phức tạp hóa vấn đề.
- **Tư duy DRY ("Don't Repeat Yourself"):** Trong một file code không được lặp lại code hay logic giống nhau. Các đoạn code hoặc logic lặp lại phải được đưa vào hàm/phương thức để tái sử dụng một cách nhất quán.

## 2. Tài liệu & Code Base (Tham chiếu)

AI phải đọc kỹ các tài liệu hệ thống và code base hiện tại để nắm bắt logic:

- **Backend (BE):** `TreeOfThought/docs/backend`
- **Frontend (FE):** `TreeOfThought/docs/frontend`
- **Hệ thống Tri thức (Docs):** Thư mục `TreeOfThought/docs` là cây thư mục tri thức của toàn bộ hệ thống, chứa các folder/subfolder với các file `*.md` liên quan tới yêu cầu, thiết kế và triển khai code ở `TreeOfThought/backend` và `TreeOfThought/frontend`.
  - **Cấu trúc tệp cốt lõi:** Từng folder/subfolder nghiệp vụ đều sở hữu 2 tệp tin chính:
    - `whattodo.md`: Đóng vai trò như tài liệu SRS mô tả phần mềm, chứa toàn bộ yêu cầu, mong muốn và ý định của người dùng.
    - `howtodo.md`: Đóng vai trò như tài liệu phân tích hệ thống (BA Design) để phát triển phần mềm, chứa toàn bộ giải pháp kỹ thuật, thiết kế và cách thức triển khai của AI dựa trên yêu cầu từ `whattodo.md`.
  - Khi được yêu cầu sửa lỗi (fix bug) hoặc hỏi đáp, AI **bắt buộc** phải tìm hiểu đúng nghiệp vụ tại đúng folder/subfolder trong `TreeOfThought/docs`.
  - Cần đọc và hiểu sâu sắc các file `*.md` liên quan tới nghiệp vụ khi cần, tuân thủ nguyên tắc đọc từ ngoài vào trong (từ tổng quan đến chi tiết) và ngược lại từ trong ra ngoài (từ chi tiết đến tổng quan) để có cái nhìn toàn diện nhất.


## 3. Quy trình Phát triển Nghiêm ngặt

### A. Đối với Tính năng / Nghiệp vụ mới

1. **Khởi tạo:** Tạo folder tên tính năng trong `TreeOfThought/docs`.
2. **Yêu cầu & Giải pháp (Khởi tạo trống):** Tạo sẵn các file `whattodo.md` và `howtodo.md` trong folder đó ở trạng thái trống (chưa có nội dung gì). **Bắt buộc** yêu cầu người dùng tự đưa nội dung SRS, requirement, mong muốn, ý định vào `whattodo.md`.
3. **Phân tích & Đề xuất:**
    - Đọc kỹ `whattodo.md` để hiểu rõ ý định. Nếu chưa có hoặc chưa rõ, yêu cầu người dùng bổ sung vào `whattodo.md`.
    - Tạo file `howtodo.md` để người dùng xem trước khi quyết định triển khai.
    - Nếu `howtodo.md` đã có trước đó, phải đọc kết hợp với `whattodo.md` để xác định rõ hơn yêu cầu.
    - **Yêu cầu quan trọng:** `howtodo.md` phải đủ để đảm bảo code không tạo ra lộn xộn, không được phép làm mỗi lúc một khác với cùng một yêu cầu, phải tuân thủ code base và base infra.
4. **Xác nhận:** **LUÔN LUÔN** yêu cầu người dùng xác nhận file `howtodo.md` trước khi tiến hành triển khai.
5. **Triển khai:**
    - **Backend:** Tạo project là sub-folder của `TreeOfThought/docs/backend`. Xem thêm hướng dẫn tại `TreeOfThought/docs/backend/howtodo.md`.
    - **Frontend:** Tạo project là thư viện Angular trong folder `TreeOfThought/docs/frontend/web`. Xem thêm hướng dẫn tại `TreeOfThought/docs/frontend/howtodo.md`.
        - **Lưu ý:** Các component trong thư viện `shared` phải bắt đầu với prefix `tot-` (ví dụ: `tot-button`).

### B. Đối với Sửa lỗi (Fix Bug)

1. **Phân tích:** Tìm đúng tài liệu và code hiện tại trong `TreeOfThought/docs` để đưa ra cách sửa lỗi tối ưu nhất, đơn giản nhất và tốt nhất.
2. **Đề xuất:** Cập nhật giải pháp vào `howtodo.md` của nghiệp vụ đó.
3. **Xác nhận:** **LUÔN LUÔN** yêu cầu người dùng xác nhận file `howtodo.md` trước khi tiến hành sửa lỗi.

### C. Đối với Tìm hiểu / Hỏi đáp

1. Cung cấp thông tin cần thiết, trả lời chính xác, không bịa đặt.
2. Đề xuất cách làm, có thể hỏi người dùng để đưa thành tài liệu requirement vào `whattodo.md` của nghiệp vụ đó, sau đó lập giải pháp cẩn thận vào `howtodo.md` để người dùng xác nhận.

## 4. Nguyên tắc Hành động & Kiểm thử

- **Luồng dữ liệu:** `whattodo.md` (Ý định) -> `howtodo.md` (Giải pháp) -> **Code** (Thực thi).
- **Giao tiếp:** Nếu không biết, không rõ, không chắc chắn thì phải hỏi. Mọi câu hỏi cần đợi người dùng xác nhận.
- **Thực thi & Debug:**
  - Khi tích hợp vào `TreeOfThought/backend/Core.Web.Api/`, chạy `run-dev.sh` tại đó.
  - Đọc console log để phát hiện và sửa lỗi ngay lập tức.
- **Tính nhất quán:** Không được làm lộn xộn logic của người dùng. Tuân thủ nghiêm ngặt code base và base infra.

**QUAN TRỌNG:** Luôn dựa vào `whattodo.md` để suy nghĩ và đưa ra giải pháp vào `howtodo.md`. **LUÔN LUÔN yêu cầu người dùng xác nhận file `howtodo.md` trước khi tiến hành.**

## 5. Quy tắc đặt tên và cấu trúc Folder Nghiệp vụ

Để đảm bảo tính nhất quán trên toàn bộ hệ thống (Docs, BE, FE), việc tạo folder cho nghiệp vụ mới hoặc tham chiếu đến nghiệp vụ sẵn có phải tuân theo quy định dưới đây:

### A. Quy tắc đặt tên folder nghiệp vụ mới

- **Tên folder:** Sử dụng tiếng Việt không dấu, các từ nối với nhau bằng dấu gạch ngang `-` (kebab-case).
  - *Ví dụ:* Nghiệp vụ "Quản lý version" -> tên folder sẽ là `quan-ly-version`.
- **Cấu trúc lưu trữ:**
  - **Docs:** `TreeOfThought/docs/quan-ly-version`
  - **Backend (BE):** `TreeOfThought/backend/quan-ly-version`
  - **Frontend (FE):** `TreeOfThought/frontend/web/projects/tot/quan-ly-version`

*Lưu ý:* Quy tắc này được ưu tiên hàng đầu cho các nghiệp vụ mới, thay thế cho bất kỳ chỉ dẫn folder tùy ý nào khác.

### B. Danh sách Module nghiệp vụ sẵn có (Ngoại lệ)

Các nghiệp vụ đã được triển khai từ trước có cấu trúc folder riêng và cần được giữ nguyên như sau:

1. **Module Files and Folders:**
   - **Docs:** `TreeOfThought/docs/filesfolders`
   - **Backend (BE):** `TreeOfThought/backend/Core.Infra.FilesFolders`
   - **Frontend (FE):** `TreeOfThought/frontend/web/projects/tot/business-files`

2. **Module CQRS Dashboard:**
   - **Docs:** `TreeOfThought/docs/cqrs-dashboard/whattodo.md`
   - **Backend (BE):** `TreeOfThought/backend/Core.Web.Api/Controllers`
   - **Frontend (FE):** `TreeOfThought/frontend/web/projects/tot/business-dashboard`

3. **Module CQRS Test:**
   - **Docs:** `TreeOfThought/docs/cqrs-test/whattodo.md`
   - **Backend (BE):** `TreeOfThought/backend/Core.Web.Api/Controllers`
   - **Frontend (FE):** `TreeOfThought/frontend/web/projects/tot/business-test`

4. **Module OIDC:**
   - **Docs:** `TreeOfThought/docs/business-oidc/whattodo.md`
   - **Backend (BE):** `TreeOfThought/backend/Core.Web.Api/Controllers`
   - **Frontend (FE):** `TreeOfThought/frontend/web/projects/tot/business-oidc`

### C. Bảo vệ các thư mục cốt lõi (Core & Base Infrastructure)
>
> [!IMPORTANT]
> **Tuyệt đối KHÔNG ĐƯỢC XÓA hoặc tự động GHI ĐÈ** 2 thư mục sau khi tạo hoặc cập nhật nghiệp vụ mới:
>
> - `TreeOfThought/docs/frontend`
> - `TreeOfThought/docs/backend`
>
> Hai thư mục này chứa các file yêu cầu/tài liệu cấu trúc để tạo nên base infra core và một số nghiệp vụ ban đầu quan trọng.

Dưới đây là chi tiết cấu trúc hệ thống cần bảo vệ và tuân thủ:

#### 1. Backend (BE)

- **Core Infra Base (Cơ sở hạ tầng lõi):**
  - `TreeOfThought/backend/Core.Infra.Auth`
  - `TreeOfThought/backend/Core.Infra.Base`
  - `TreeOfThought/backend/Core.Infra.Cqrs`
  - `TreeOfThought/backend/Core.Infra.Data`
  - `TreeOfThought/backend/Core.Infra.Firebase`
  - `TreeOfThought/backend/Core.Infra.Redis`
  - `TreeOfThought/backend/Core.Infra.Session`
- **App Shell:**
  - `TreeOfThought/backend/Core.Web.Api`
- **Nghiệp vụ sẵn có:**
  - `TreeOfThought/backend/Core.Infra.FilesFolders`
  - `TreeOfThought/backend/Core.Infra.Oidc`

#### 2. Frontend (FE)

- **Core Base (Hệ thống dùng chung):**
  - `TreeOfThought/frontend/web/projects/tot/core`
  - `TreeOfThought/frontend/web/projects/tot/shared`
- **App Shell (Chứa sẵn giao diện UI OIDC, Auth - SSO, Login, Signup):**
  - `TreeOfThought/frontend/web/src`
  - `TreeOfThought/frontend/web/src/app/modules/auth`
- **Nghiệp vụ sẵn có:**
  - `TreeOfThought/frontend/web/projects/tot/business-files`
  - `TreeOfThought/frontend/web/projects/tot/business-oidc`
  - `TreeOfThought/frontend/web/projects/tot/business-dashboard`
  - `TreeOfThought/frontend/web/projects/tot/business-test`

### D. Nhật ký cập nhật quy trình

- **Cập nhật 2026-05-17 12:03:24:** Khi tạo mới nghiệp vụ, file `whattodo.md` và `howtodo.md` trong folder docs của nghiệp vụ đó ban đầu sẽ trống. **Bắt buộc** yêu cầu người dùng tự đưa nội dung SRS, requirement, mong muốn, ý định vào `whattodo.md` trước khi tiến hành bước tiếp theo.
- **Cập nhật 2026-05-26 15:12:09:** Thư mục `TreeOfThought/docs` là cây thư mục tri thức chứa các folder/subfolder có các file `*.md` liên quan đến yêu cầu, thiết kế, triển khai ở `TreeOfThought/backend` và `TreeOfThought/frontend`. Khi được yêu cầu sửa lỗi (fix bug) hoặc hỏi đáp, AI bắt buộc phải tìm hiểu đúng nghiệp vụ tại đúng folder/subfolder. Phải đọc hiểu các file `*.md` liên quan khi cần, đọc từ ngoài vào trong (tổng quan đến chi tiết) và ngược lại từ trong ra ngoài (chi tiết đến tổng quan).
  - Từng folder/subfolder nghiệp vụ đều có 2 file chính là `whattodo.md` (giống tài liệu SRS chứa yêu cầu, mong muốn của người dùng) và `howtodo.md` (giống tài liệu thiết kế BA chứa giải pháp của AI dựa trên `whattodo.md`).
- **Cập nhật 2026-05-26 15:25:57:** Mở rộng phạm vi áp dụng của skill **tot-dev** cho toàn bộ các công nghệ phát triển trong folder `TreeOfThought`, bao gồm .NET, Angular, Flutter, ReactJS, và SQL.
- **Cập nhật 2026-05-26 15:32:12:** Sửa lỗi chính tả về thư mục cốt lõi cần bảo vệ: thay thế `TreeOfThought/frontend` thành `TreeOfThought/docs/frontend` để chính xác với sơ đồ tổ chức tài liệu tri thức của solution.
- **Cập nhật 2026-05-26 16:24:00:** Bổ sung nguyên tắc **DRY (Don't Repeat Yourself)** vào quy trình phát triển. Trong một file code tuyệt đối không được lặp lại code hay logic giống nhau, cần tối ưu hóa và đưa vào hàm/phương thức để tái sử dụng.



