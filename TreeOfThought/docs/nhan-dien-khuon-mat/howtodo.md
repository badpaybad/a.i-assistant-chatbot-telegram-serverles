# Giải pháp Phát triển Nghiệp vụ Nhận diện Khuôn mặt (nhan-dien-khuon-mat)

Tài liệu này trình bày giải pháp chi tiết và sơ đồ thiết kế cho module **Nhận diện khuôn mặt** nhằm đáp ứng đầy đủ các yêu cầu nghiệp vụ mới và nâng cao tại [whattodo.md](whattodo.md), tuân thủ nghiêm ngặt quy trình và các nguyên tắc thiết kế hiện có của hệ thống **TreeOfThought**.

---

## 1. Tổng quan Kiến trúc Hệ thống

Giải pháp kết hợp xử lý trí tuệ nhân tạo (AI) hiệu năng cao trực tiếp trên trình duyệt (Client-side Edge AI) để tối ưu trải nghiệm và bảo mật dữ liệu, đồng thời sử dụng hệ thống lưu trữ và quản lý phiên tập trung trên Backend (Server-side, DB PostgreSQL & Google Cloud Storage):

```mermaid
graph TD
    A[Người dùng truy cập Nhận diện khuôn mặt] --> B{Giao diện Workspace Kép}
    
    %% Session làm việc %%
    subgraph Session làm việc (Active Working Session)
        B --> C[Nạp nguồn: Drag & Drop / Folder Picker / File Picker]
        C --> D[Cộng dồn vào hàng đợi Tệp tin nguồn - Cột trái]
        D --> E[Quét MediaPipe Face Detection tuần tự]
        E --> F[Chuyển ảnh có khuôn mặt sang Cột phải]
        F --> G[Xem trước Bounding Box & crop 150x150]
        G --> H[Toggle chọn Lưu/Bỏ ảnh gốc & từng ảnh crop]
        H --> I[Đặt tên Phiên & nhấn Lưu trữ]
        I --> J[Upload nhị phân lên GCS & URL vào DB PostgreSQL]
        J --> K[Realtime Firestore Event: Upload Completed]
        K --> L[Tự động Reset Session làm việc cục bộ]
    end
    
    %% Danh sách quản lý %%
    subgraph Danh sách quản lý (Historical Sessions List)
        B --> M[Bảng lịch sử các phiên upload]
        M --> N[Hành động: Đổi tên inline]
        M --> O[Hành động: Xem chi tiết]
        M --> P[Hành động: Xóa Phiên]
        
        O --> Q[Modal: Bảng chi tiết dòng ảnh gốc & mặt crop]
        Q --> R[Xóa ảnh gốc -> Cascade xóa tệp trên GCS & DB]
        Q --> S[Xóa ảnh crop -> Xóa riêng tệp trên GCS & DB]
        P --> T[Xóa Phiên -> Cascade xóa tất cả tệp liên quan trên GCS & DB]
    end
```

---

## 2. Thiết kế Chi tiết: Session Làm Việc (Active Working Session)

### 2.1. Bố cục và Nạp nguồn đa dạng (Layout & Multi-Source Input)
- **Bố cục (Layout):** Tách biệt các khu vực nạp nguồn và cấu trúc thành 3 cột chính nằm ngang (flexbox/grid) tuân thủ sketch và nâng cao UX:
  - **Khung tiêu đề đầu tiên (3 cột):**
    - *Cột bên trái:* "Nhập tên phiên đang làm việc" hiển thị ô tiêu đề và ô Input nhập tên phiên.
    - *Cột ở giữa:* Khu vực `"Chọn file hoặc kéo thả file"` hỗ trợ Drag & Drop ảnh đơn lẻ và mở file picker.
    - *Cột bên phải:* Khu vực `"Chọn folder hoặc kéo thả folder"` hỗ trợ Drag & Drop thư mục và mở folder picker.
  - **Khung danh sách file:** Bảng dữ liệu của phiên đang làm việc (`Active Session Files Table`) kèm theo phân trang cục bộ (`Paging ...`) ở góc dưới bên phải, và nút "Lưu phiên làm việc" ở góc dưới bên trái.
- **Tính nhất quán với Hệ thống (App Shell Alignment):**
  - **Theme màu sắc:** Tuân thủ 100% theme màu sáng và hệ thống màu của App Shell chung (với nền sáng `#f0f2f5`, sắc xanh chủ đạo `--primary-color: #1890ff`, và các thẻ card mờ kính sáng `rgba(255, 255, 255, 0.7)`).
  - **Nút bấm dùng chung (Shared tot-button):** Tất cả các nút bấm bên trong bảng (`Active Session Table` và `History Table`) bắt buộc phải sử dụng thẻ component dùng chung `<tot-button>` thay thế cho các thẻ HTML thông thường để đồng bộ hóa thiết kế.
- **Hàng đợi cộng dồn (Cumulative loading):**
  - **"Có thể kéo thêm file ảnh hoặc folder vào session đã có để xử lý tiếp"**: Dữ liệu cũ trong bảng làm việc được cộng dồn (append) tiếp và quét song song mà không bị xóa.
- **Cơ chế quét thư mục đệ quy (Recursive Folder Traversal):**
  - Khi người dùng kéo thả thư mục vào khu vực Folder, hệ thống sẽ sử dụng API `webkitGetAsEntry()` đệ quy duyệt qua tất cả các file ảnh nằm sâu bên trong thư mục con để nạp vào hàng đợi.
  - Khi chọn qua Folder Picker, trình duyệt tự động đọc đệ quy và lọc tất cả các tệp hình ảnh để đưa vào xử lý.

### 2.2. Quy trình Quét và Trích xuất (Edge AI pipeline)
1. **Quét MediaPipe:** Sử dụng **MediaPipe Face Detection** chạy cục bộ thông qua WebGL/WebAssembly trên trình duyệt.
2. **Cập nhật Bảng Session:** Bảng danh sách tệp tin hiển thị kết quả phân tích theo cấu trúc 4 cột chuẩn chỉnh:
   - **Tên file:** Tên tệp tin gốc của ảnh.
   - **Khuôn mặt trong ảnh:**
     - Nếu ảnh phát hiện có khuôn mặt: Hiển thị các avatar ảnh khuôn mặt được crop ra (chuẩn 150x150) kèm theo checkbox tích chọn (`[v] ảnh mặt crop được`) trực quan ngay bên trong ô của bảng. Người dùng có thể click chọn hoặc bỏ chọn từng ảnh khuôn mặt crop này.
     - Nếu ảnh không phát hiện khuôn mặt: Hiển thị dòng chữ cảnh báo `"Không có ảnh khuôn mặt"`.
   - **Đường dẫn file:** Hiển thị đường dẫn mô phỏng dạng `/work/[Tên file]` để bảo mật và giữ giao diện nhất quán đúng thiết kế (ví dụ: `/work/dunp.png`).
   - **Hành động:** Nút bấm `"Xóa"` để loại bỏ nhanh tệp tin này ra khỏi hàng đợi phiên làm việc.

### 2.3. Đặt tên, Lưu trữ & Tự động Reset Session
- **Đặt tên phiên:** Tự động tạo tên gợi ý dạng `"Phiên ngày [dd/MM/yyyy HH:mm]"` trong ô Input để người dùng sửa đổi trực tiếp theo ý muốn.
- **Lưu trữ công khai (Public GCS):** Khi bấm nút `"Lưu phiên làm việc"`:
  - Tiến hành tải nhị phân các tệp ảnh gốc được chọn và các ảnh khuôn mặt crop tương ứng lên dịch vụ lưu trữ Google Cloud Storage (GCS) ở chế độ **Public (Mọi người có thể đọc công khai)** bằng cách đặt `isPublic = true` khi gọi `UploadFileAsync` của `FirebaseService`.
  - Cập nhật URL và Metadata vào DB PostgreSQL.
  - Reset hoàn toàn Workspace (về trạng thái trống) và tự động kích hoạt reload danh sách lịch sử bên dưới.

---

## 3. Thiết kế Chi tiết: Danh Sách Quản Lý & Cascade GCS Cleaners

### 3.1. Danh sách Quản lý Phiên (Historical Session List)
- Hiển thị bảng danh sách lịch sử các phiên upload đã lưu của người dùng dưới dạng bảng phân trang từ API PostgreSQL. Bảng gồm 4 cột chính xác theo thiết kế:
  - **Tên phiên:** Hiển thị tên phiên làm việc (cho phép đổi tên inline).
  - **Số lượng ảnh:** Tổng số ảnh gốc trong phiên đó.
  - **Số lượng khuôn mặt:** Tổng số khuôn mặt đã crop của toàn bộ ảnh thuộc phiên đó (được đếm và tối ưu hóa truy vấn thông qua `.SelectMany(i => i.CroppedFaces).Count()`).
  - **Hành động:** Chứa 2 nút bấm `"Xem"` (Xem Chi tiết phiên qua Modal) và `"Xóa"` (Xóa phiên).

### 3.2. Xem Chi tiết & Quản lý dòng (Detailed Session Modal)
- Khi bấm nút **"Xem"**, hiển thị một Modal Chi tiết chứa bảng hiển thị cấu trúc tương tự để xem ảnh gốc và danh sách khuôn mặt crop.
- **Cơ chế xóa đơn lẻ trong modal chi tiết:**
  - *Xóa ảnh gốc:* Xóa file gốc vật lý trên GCS, xóa các file crop vật lý liên kết trên GCS, và cascade xóa dữ liệu trong DB.
  - *Xóa ảnh crop:* Xóa file crop vật lý tương ứng trên GCS và xóa bản ghi đơn lẻ trong DB.

### 3.3. Xóa Phiên & Đồng bộ GCS (Cascade GCS Cleanup Lifecycle)
- **"do dùng google cloud storage lưu file nên khi xóa cần xóa cả trên GCS"**: Khi xóa phiên từ bảng lịch sử hoặc qua API:
  - Hệ thống tự động quét toàn bộ file liên kết, xóa tệp vật lý trên GCS của tất cả ảnh gốc và ảnh crop thuộc phiên đó.
  - Thực thi xóa `UploadSession` trong DB, kích hoạt Cascade Delete xóa sạch toàn bộ OriginalImages và CroppedFaces liên quan.

---

## 4. Thiết kế Thực thể Dữ liệu (Database Schema)

Cơ sở dữ liệu PostgreSQL `tot_db` quản lý 3 bảng thực thể với liên kết chặt chẽ:

```mermaid
erDiagram
    UploadSessions ||--o{ OriginalImages : "has (ON DELETE CASCADE)"
    OriginalImages ||--o{ CroppedFaces : "has (ON DELETE CASCADE)"

    UploadSessions {
        uuid Id PK
        varchar Name
        uuid UserId FK
        timestamp CreatedAt
        varchar CreatedBy
    }

    OriginalImages {
        uuid Id PK
        uuid UploadSessionId FK
        varchar FileName
        text Url
        bigint Size
        uuid UserId FK
        timestamp CreatedAt
        varchar CreatedBy
    }

    CroppedFaces {
        uuid Id PK
        uuid OriginalImageId FK
        text Url
        text BoundingBox
        timestamp CreatedAt
        varchar CreatedBy
    }
```

---

## 5. Quy hoạch RESTful API Endpoints (FaceDetectionController.cs)

Các API quản lý trực tiếp qua DbContext được thiết kế tối giản, loại bỏ nợ kỹ thuật:

| Phương thức | API Endpoint | Mô tả | Chi tiết dọn dẹp tệp vật lý |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/face-detection/save` | Lưu ảnh gốc & mặt crop theo phiên | Tải tệp tin lên GCS |
| `GET` | `/api/face-detection/sessions` | Lấy danh sách các phiên upload | Không |
| `GET` | `/api/face-detection/sessions/{id}` | Lấy chi tiết ảnh gốc & crop của phiên | Không |
| `PUT` | `/api/face-detection/sessions/{id}/rename` | Đổi tên phiên upload | Không |
| `DELETE` | `/api/face-detection/sessions/{id}` | Xóa toàn bộ phiên upload | **Xóa tất cả** tệp ảnh gốc & crop trên GCS |
| `DELETE` | `/api/face-detection/images/{id}` | Xóa đơn lẻ ảnh gốc | **Xóa tệp ảnh gốc & các mặt crop** trên GCS |
| `DELETE` | `/api/face-detection/faces/{id}` | Xóa đơn lẻ ảnh khuôn mặt crop | **Xóa tệp ảnh crop tương ứng** trên GCS |
