# Giải pháp Phát triển Nghiệp vụ Nhận diện Khuôn mặt (nhan-dien-khuon-mat)

Tài liệu này trình bày giải pháp chi tiết cho module **Nhận diện khuôn mặt** nhằm đáp ứng đầy đủ các yêu cầu nghiệp vụ tại [yeucau.md](yeucau.md), tuân thủ nghiêm ngặt cấu trúc và các nguyên tắc thiết kế hiện có của hệ thống **TreeOfThought**.

---

## 1. Tổng quan Giải pháp Kỹ thuật

Giải pháp kết hợp xử lý AI hiệu năng cao trên trình duyệt và lưu trữ tập trung trên Backend/Cloud Storage:
1. **Phía Trình duyệt (Client-side):**
   - Người dùng tải lên (Drag & Drop) cả một thư mục ảnh (hỗ trợ đọc đệ quy các thư mục con).
   - Sử dụng thư viện **pico.js** (một thư viện nhận diện khuôn mặt siêu nhẹ khoảng 2KB và cực kỳ nhanh) chạy trực tiếp trên trình duyệt mà không cần cài đặt TensorFlow hay các dependencies nặng nề khác.
   - File cascade trained model (`facefinder` khoảng 80KB) được tải một lần từ thư mục tài nguyên tĩnh (`src/assets/models/facefinder`) của ứng dụng và lưu trong bộ nhớ.
   - Các ảnh được xử lý tuần tự (sequential processing) bằng HTML5 Canvas: vẽ ảnh, chuyển đổi sang ảnh xám (grayscale), chạy giải thuật `pico.js` để tìm tọa độ khuôn mặt, sau đó dùng Canvas crop riêng các khuôn mặt được tìm thấy.
   - Hiển thị giao diện trực quan cho phép người dùng duyệt từng khuôn mặt đã crop, bật/tắt (toggle) trạng thái "Lưu trữ" cho từng khuôn mặt cụ thể.

2. **Phía Server (Backend):**
   - Triển khai một Module nghiệp vụ cô lập hoàn toàn: `Core.Infra.NhanDienKhuonMat`.
   - Có cơ sở dữ liệu riêng (kế thừa `BaseDbContext`) quản lý hai bảng: `OriginalImages` (lưu file ảnh gốc) và `CroppedFaces` (lưu ảnh các khuôn mặt được cắt ra và liên kết tới ảnh gốc).
   - Sử dụng hạ tầng **Firebase/GCS** sẵn có để lưu trữ file nhị phân của ảnh gốc và ảnh mặt đã crop lên Google Cloud Storage, lấy link signed/public URL lưu vào Database.
   - Áp dụng mô hình **CQRS** (Command/Handler và Event/PubSub) đồng nhất với toàn bộ hệ thống để thực hiện nghiệp vụ lưu trữ bất đồng bộ và trả về kết quả thời gian thực cho UI.

---

## 2. Thiết kế Cơ sở Dữ liệu (Database Schema)

Chúng ta sẽ tạo hai bảng trong cơ sở dữ liệu `tot_db` (dùng chung PostgreSQL của hệ thống):

### Bảng 1: `OriginalImages` (Lưu thông tin ảnh gốc)
| Trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `Id` | `Guid` | Primary Key | ID duy nhất của ảnh gốc |
| `FileName` | `VARCHAR(255)` | Not Null | Tên file ảnh gốc |
| `Url` | `TEXT` | Not Null | Đường dẫn lưu trữ trên GCS |
| `Size` | `BIGINT` | Not Null | Kích thước file (bytes) |
| `UserId` | `Guid` | Not Null, Index | ID người dùng tải lên |
| `CreatedAt` | `TIMESTAMP` | Not Null | Thời gian tạo |
| `CreatedBy` | `VARCHAR(255)` | Not Null | Người tạo |

### Bảng 2: `CroppedFaces` (Lưu thông tin khuôn mặt được cắt)
| Trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `Id` | `Guid` | Primary Key | ID duy nhất của ảnh khuôn mặt |
| `OriginalImageId` | `Guid` | Foreign Key | Liên kết tới bảng `OriginalImages` (Cascade Delete) |
| `Url` | `TEXT` | Not Null | Đường dẫn lưu trữ trên GCS |
| `BoundingBox` | `TEXT` | Not Null | Tọa độ khuôn mặt trong ảnh gốc (định dạng JSON: `{x, y, w, h}`) |
| `CreatedAt` | `TIMESTAMP` | Not Null | Thời gian tạo |
| `CreatedBy` | `VARCHAR(255)` | Not Null | Người tạo |

---

## 3. Kiến trúc Backend (`Core.Infra.NhanDienKhuonMat`)

Chúng ta sẽ tạo một thư mục mới tại `TreeOfThought/backend/nhan-dien-khuon-mat` chứa class library .NET:

### 3.1. Các lớp dữ liệu & DbContext
- **`NhanDienKhuonMatDbContext`**: Kế thừa từ `BaseDbContext`.
  ```csharp
  public class NhanDienKhuonMatDbContext : BaseDbContext
  {
      public DbSet<OriginalImage> OriginalImages { get; set; }
      public DbSet<CroppedFace> CroppedFaces { get; set; }
  }
  ```

### 3.2. CQRS Commands & Events
- **`SaveFaceDetectionSessionCommand`**: Nhận dữ liệu tải lên từ Controller.
  ```csharp
  public class SaveFaceDetectionSessionCommand : ICommand
  {
      public string TrackingId { get; set; } = string.Empty;
      public string? UserId { get; set; }
      public string OriginalFileName { get; set; } = string.Empty;
      public byte[] OriginalContent { get; set; } = Array.Empty<byte>();
      public string OriginalContentType { get; set; } = "image/jpeg";
      public List<CroppedFaceUploadDto> CroppedFaces { get; set; } = new();
  }
  
  public class CroppedFaceUploadDto
  {
      public byte[] Content { get; set; } = Array.Empty<byte>();
      public string ContentType { get; set; } = "image/jpeg";
      public string BoundingBox { get; set; } = string.Empty; // JSON {"x":10,"y":20,"w":100,"h":100}
  }
  ```
- **`FaceDetectionSessionSavedEvent`**: Event được publish sau khi xử lý thành công, kế thừa `INotifyUiEvent` để đẩy thông báo thời gian thực lên client thông qua Firestore.

### 3.3. Command Handler (`FaceDetectionCommandHandler`)
- Nhận command, tiến hành:
  1. Upload ảnh gốc lên GCS bằng `FirebaseService.UploadFileAsync`.
  2. Tạo bản ghi `OriginalImage` và lưu vào DB.
  3. Lặp qua danh sách `CroppedFaces` được chọn, upload từng khuôn mặt crop lên GCS, tạo bản ghi `CroppedFace` liên kết tới ảnh gốc vừa tạo.
  4. Lưu tất cả vào DbContext và gọi `SaveChanges`.
  5. Publish `FaceDetectionSessionSavedEvent` để thông báo cho UI biết quá trình lưu trữ hoàn tất.

### 3.4. API Controller (`FaceDetectionController`)
- Endpoint: `POST /api/face-detection/save` (chấp nhận `multipart/form-data`).
- Lấy thông tin user đăng nhập qua `GetUserId()`, khởi tạo `TrackingId` qua `GetTrackingId()`.
- Chuyển đổi các files được tải lên (`originalFile`, `croppedFiles`, `boundingBoxes` tương ứng) thành command và gọi `_dispatcher.SendAsync(command, useMemoryMode: true)`.

---

## 4. Kiến trúc Frontend (`@tot/nhan-dien-khuon-mat`)

Tạo một Angular library mới tại `TreeOfThought/frontend/web/projects/tot/nhan-dien-khuon-mat` theo quy chuẩn hệ thống:

### 4.1. Pico.js Integration
- Tích hợp giải thuật `pico.js` trực tiếp dưới dạng một file TypeScript utility (`pico.ts`) để đảm bảo type-safety và tự đóng gói (self-contained).
- Viết hàm `rgbaToGrayscale` để tối ưu hóa việc chuyển đổi dữ liệu pixel của canvas sang định dạng 8-bit grayscale mà `pico.js` yêu cầu.
- Tải cascade model `facefinder` thông qua HTTP client từ `/assets/models/facefinder` tại thời điểm khởi tạo component và chuyển đổi sang `Uint8Array`.

### 4.2. Giao diện Người dùng (UI/UX) Premium & Hiện đại
- **Khu vực Tải thư mục (Dropzone):**
  - Thiết kế dạng Glassmorphism card với đường viền gradient chuyển động mượt mà.
  - Sử dụng thẻ `<input type="file" webkitdirectory directory multiple>` ẩn bên dưới và kích hoạt khi người dùng click hoặc kéo thả thư mục ảnh vào dropzone.
  - Lọc đệ quy toàn bộ các file được kéo vào, chỉ giữ lại định dạng ảnh hợp lệ (`.jpg`, `.jpeg`, `.png`, `.webp`).
- **Giao diện Quét ảnh & Nhận diện tự động:**
  - Hiệu ứng quét laser chuyển động lên xuống trên hình ảnh đang quét.
  - Xử lý đệ quy/tuần tự từng ảnh để tránh làm đơ trình duyệt.
  - Vẽ khung bounding box màu xanh neon lên trên khuôn mặt được phát hiện tức thời bằng Canvas.
- **Khu vực Duyệt ảnh đã phát hiện:**
  - Sử dụng grid layout 2 cột:
    - **Cột Trái (Original Image View):** Hiển thị ảnh gốc nguyên bản kèm các bounding box neon.
    - **Cột Phải (Cropped Faces View):** Hiển thị danh sách các khuôn mặt được crop riêng biệt dưới dạng thẻ card nhỏ. Mỗi khuôn mặt crop sẽ đi kèm một toggle switch Ant Design (`nz-switch`) hoặc checkbox để người dùng chọn bật/tắt chế độ "Lưu trữ".
- **Tiến trình Upload & Lưu trữ:**
  - Nút "Lưu lên Server" tích hợp hiệu ứng gradient lấp lánh (pulsing glow).
  - Khi lưu, một modal tiến trình (Progress overlay) hiển thị số lượng ảnh gốc và số khuôn mặt đang được tải lên server theo thời gian thực (ví dụ: "Đang tải ảnh 3/10 lên hệ thống...").
  - Đăng ký nhận kết quả bất đồng bộ từ Firestore thông qua `TrackingId` để hiển thị màn hình chúc mừng (Success View) sinh động khi hoàn tất.

---

## 5. Các bước Tích hợp Hệ thống

### 5.1. Backend:
1. Đăng ký Project `Core.Infra.NhanDienKhuonMat` vào Solution `Core.Infra.sln`.
2. Tham chiếu Project này vào `Core.Web.Api.csproj`.
3. Khai báo service và DbContext trong `Core.Web.Api/Program.cs`:
   - `builder.Services.AddNhanDienKhuonMat(config);`
   - Đăng ký Controller: `.AddNhanDienKhuonMatControllers()` vào pipeline.
   - Thêm `typeof(FaceDetectionCommandHandler).Assembly` vào lệnh khởi tạo CQRS `AddCqrs(...)`.
4. Gọi `EnsureTablesCreatedAsync()` cho `NhanDienKhuonMatDbContext` lúc khởi chạy ứng dụng để tự động sinh bảng.

### 5.2. Frontend:
1. Đăng ký `@tot/nhan-dien-khuon-mat` vào `angular.json` và cấu hình path mapping trong `tsconfig.json`.
2. Đăng ký provider của nghiệp vụ mới trong `src/app/app.config.ts`: `provideNhanDienKhuonMat()`.
3. Thêm Router Route trong `src/app/app.routes.ts` để lazy-load component của module:
   ```typescript
   {
     path: 'modules/nhan-dien-khuon-mat',
     data: { breadcrumb: 'Nhận diện khuôn mặt' },
     loadComponent: () => import('@tot/nhan-dien-khuon-mat').then(m => m.NhanDienKhuonMatComponent)
   }
   ```
4. Cập nhật `MenuService` (`src/app/services/menu.service.ts`) để thêm liên kết menu:
   ```typescript
   {
     label: 'Nhận diện khuôn mặt',
     icon: 'scan',
     route: '/modules/nhan-dien-khuon-mat',
     claim: 'fe.face_detection:view' // Hoặc claim tùy cấu hình
   }
   ```
5. Đặt file cascade model `facefinder` vào thư mục `TreeOfThought/frontend/web/src/assets/models/facefinder` để phục vụ tải tĩnh.

---

## 6. Kế hoạch Kiểm thử & Đảm bảo Chất lượng (QA/QC)

1. **Kiểm thử Giải thuật trên Browser:**
   - Sử dụng các bộ ảnh test gồm: chân dung đơn, tập thể, ảnh thiếu sáng và ảnh góc nghiêng để căn chỉnh ngưỡng nhạy cảm (threshold) của `pico.js` sao cho chính xác nhất.
2. **Kiểm thử Tải lên & Crop:**
   - Xác thực việc crop ảnh bằng Canvas giữ đúng độ phân giải của khuôn mặt.
   - Xác thực việc người dùng toggle bỏ chọn không lưu khuôn mặt sẽ không được upload lên server.
3. **Kiểm thử Tải lên Server bất đồng bộ:**
   - Kiểm tra console log của `run-dev.sh` trên Backend để đảm bảo dữ liệu nhị phân nhận diện chính xác, upload thành công lên GCS và sinh các link tương ứng lưu vào PostgreSQL.
   - Đảm bảo cơ chế Realtime UI nhận diện đúng sự kiện hoàn tất qua Firestore `commandresults/{TrackingId}`.
