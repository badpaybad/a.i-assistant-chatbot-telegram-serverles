# Giải pháp Xử lý Cột Hành động (Action) trên Mobile cho `tot-table`

> [!IMPORTANT]
> Tài liệu này phân tích nguyên nhân gốc rễ và đề xuất 3 phương án tối ưu hóa cột Hành động (Action/Operation) của component dùng chung `tot-table` khi hiển thị trên các màn hình di động (hẹp), nhằm giải quyết triệt để vấn đề cột hành động cố định che mất nội dung chính (như tên file hoặc các cột đầu tiên).

---

## 1. Phân tích Nguyên nhân Gốc rễ

Hiện tại, `tot-table` được cấu hình cột Hành động cố định ở phía bên phải (`nzRight="0px"`) và sử dụng bố cục cố định `nzTableLayout="fixed"`.
Khi chuyển sang màn hình di động (chiều rộng nhỏ hơn `768px`):
- Cột hành động cố định chiếm một chiều rộng tương đối lớn (khoảng `150px` - `200px` để chứa các nút thao tác).
- Không gian còn lại cho các cột đầu tiên (ví dụ: cột tên file, kích thước...) bị bóp nghẹt cực độ, dẫn đến việc chữ bị tràn hoặc cột đầu tiên bị cột hành động che khuất hoàn toàn.
- Thuộc tính `position: sticky` của `ng-zorro-antd` ghim chặt cột hành động này đè lên trên các nội dung khác khi người dùng cuộn ngang trên thiết bị màn hình nhỏ.

```
+----------------------------------------+
| Tên File (Bị che) | Size  | [HÀNH ĐỘNG] |  <- Cột Hành động ghim cố định
| file-rat-dai-be.. | 12 KB | [Tải xuống]|     chiếm 50% màn hình, che khuất
| du-an-tot.docx... | 24 MB | [Xóa]      |     cột Tên File!
+----------------------------------------+
```

---

## 2. Các Phương án Xử lý Đề xuất

Để giải quyết triệt để, chúng tôi đưa ra 3 phương án từ đơn giản (hiệu năng cao) đến cao cấp (trải nghiệm di động tối đa):

### Phương án 1: CSS Media Queries - Tự động Hủy Cố định trên Mobile (Khuyến nghị 1)
*   **Giải pháp**: Sử dụng CSS Media Queries để tự động ghi đè thuộc tính `position: sticky` thành `position: static !important` cho các cột cố định (`nzLeft`, `nzRight`) khi màn hình nhỏ hơn `768px`.
*   **Cơ chế hoạt động**:
    *   Trên **Desktop/Tablet lớn**: Cột hành động vẫn cố định ở bên phải như cũ, giúp cuộn ngang mượt mà.
    *   Trên **Mobile**: Cột hành động sẽ trôi tự nhiên (flow) theo dòng chảy của bảng. Bảng sẽ có thanh cuộn ngang độc lập để người dùng vuốt xem, và cột hành động sẽ nằm ở cuối hành trình cuộn, không đè lên cột tên file.

#### Chi tiết Code chỉnh sửa trong `tot-table.component.ts`:
```css
@media (max-width: 767px) {
  :host ::ng-deep .ant-table-cell-fix-left,
  :host ::ng-deep .ant-table-cell-fix-right {
    position: static !important;
    left: auto !important;
    right: auto !important;
    border-left: none !important;
    border-right: none !important;
    box-shadow: none !important;
  }
  
  /* Đảm bảo toàn bộ bảng cuộn ngang trơn tru */
  :host ::ng-deep .ant-table-content {
    overflow-x: auto !important;
  }
}
```

*   **Đánh giá**:
    *   **Ưu điểm**: Cực kỳ gọn nhẹ, 100% bằng CSS, không ảnh hưởng đến logic Angular, tự động áp dụng cho **tất cả** các bảng sử dụng `tot-table` trong toàn giải pháp.
    *   **Trải nghiệm người dùng (UX)**: Đạt chuẩn premium, bảng cuộn ngang tự nhiên mà không bị hiện tượng "ghim đè" khó chịu.

---

### Phương án 2: Giao diện Kết hợp (Hybrid Dual-Layout) - Responsive Card Grid (Khuyến nghị 2)
*   **Giải pháp**: Thay đổi cấu trúc hiển thị của component. Khi phát hiện thiết bị di động, tự động ẩn giao diện bảng truyền thống (`<table>`) và thay thế bằng danh sách Card dọc độc lập (List Cards) được thiết kế hiện đại, responsive.
*   **Cơ chế hoạt động**:
    *   Sử dụng CSS `@media` ẩn/hiện hoặc dùng `isMobile` check (resize/mediaQuery).
    *   Tái sử dụng hoàn toàn danh sách cột `columns` và các Template nội dung tùy biến của `totCell` (như cột tên file có icon, cột chia sẻ có tag màu, và cột hành động có các nút bấm xếp dọc).

#### Sơ đồ cấu trúc hiển thị trên Mobile:
```
+---------------------------------------+
|  [F] Tên File: file-rat-dai-be.pdf    | <- Header dòng 1
|  Size: 12 KB                          | <- Dòng thông tin phụ
|  Trạng thái: Công khai (Tag Xanh)     |
|  -----------------------------------  |
|  Hành động: [ Tải xuống ] [ Xóa ]     | <- Các nút hành động nằm dưới card
+---------------------------------------+
```

#### Chi tiết Template đề xuất trong `tot-table.component.ts`:
```html
<!-- Giao diện Desktop (Bảng chuẩn) -->
<nz-table #basicTable class="tot-desktop-table" ...>
  ...
</nz-table>

<!-- Giao diện Mobile (Card List) -->
<div class="tot-mobile-cards">
  <div class="tot-card-item" *ngFor="let item of data; let i = index">
    <div class="tot-card-row" *ngFor="let col of columns">
      <!-- Bỏ qua cột hành động trong danh sách thông tin chính -->
      <ng-container *ngIf="col.key !== 'action' && col.key !== 'operations'">
        <div class="tot-card-field">
          <span class="tot-field-label">{{ col.title | transloco }}:</span>
          <span class="tot-field-value">
            <ng-container *ngIf="getColTemplate(col); else textOnly">
              <ng-container *ngTemplateOutlet="getColTemplate(col)!; context: { $implicit: item, index: i, key: col.key }"></ng-container>
            </ng-container>
            <ng-template #textOnly>
              {{ getFieldValue(item, col.key) }}
            </ng-template>
          </span>
        </div>
      </ng-container>
    </div>
    
    <!-- Hiển thị riêng cột Hành động dưới đáy Card -->
    <div class="tot-card-actions" *ngIf="getActionColumn()">
      <ng-container *ngTemplateOutlet="getColTemplate(getActionColumn()!)!; context: { $implicit: item, index: i }"></ng-container>
    </div>
  </div>
</div>
```

#### Chi tiết CSS bổ sung:
```css
/* Mặc định ẩn giao diện Mobile Card */
.tot-mobile-cards {
  display: none;
}

@media (max-width: 767px) {
  .tot-desktop-table {
    display: none !important;
  }
  .tot-mobile-cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .tot-card-item {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .tot-card-field {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px dashed #fafafa;
  }
  .tot-field-label {
    font-weight: 500;
    color: #8c8c8c;
  }
  .tot-field-value {
    font-weight: 500;
    color: #262626;
  }
  .tot-card-actions {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
}
```

*   **Đánh giá**:
    *   **Ưu điểm**: Mang lại giao diện di động đỉnh cao, trực quan như một ứng dụng native di động thực thụ, hoàn toàn không có thanh cuộn ngang gây phiền toái.
    *   **Trải nghiệm người dùng (UX)**: Vượt trội tuyệt đối. Phù hợp hoàn hảo với tiêu chuẩn "wow" thiết kế của dự án.

---

### Phương án 3: Dynamic Menu/More Dropdown cho Cột Hành động trên Mobile
*   **Giải pháp**: Giữ nguyên cấu trúc bảng, nhưng trên màn hình di động, cột hành động sẽ được tự động rút gọn chỉ còn duy nhất 1 nút bấm (ví dụ: Biểu tượng 3 chấm đứng `ellipsis`). Khi nhấn vào, hệ thống sẽ hiển thị một menu thả xuống (`nz-dropdown`) hoặc bảng hành động kéo từ dưới lên (Action Sheet) chứa tất cả các chức năng.
*   **Đánh giá**:
    *   **Ưu điểm**: Bảng gọn gàng, cột hành động chỉ chiếm tối đa `50px`, giải phóng tới `100px` - `150px` không gian cho cột Tên file.
    *   **Nhược điểm**: Đòi hỏi sửa đổi cấu trúc truyền Template từ các component nghiệp vụ cha, tăng độ phức tạp trong bảo trì.

---

## 3. Lựa chọn Khuyến nghị & Kế hoạch Triển khai

Để tối ưu hóa thời gian triển khai mà vẫn mang lại hiệu quả **Trải nghiệm Người dùng Đỉnh cao (Premium UX)**, chúng tôi đề xuất thực hiện kết hợp **Phương án 1 và Phương án 2** theo thứ tự:

1.  **Bước 1: Áp dụng nhanh Phương án 1 (Hủy Fixed Column trên Mobile)**
    *   Thêm đoạn CSS Media Query vào phần `styles` của `tot-table.component.ts`.
    *   *Kết quả lập tức*: Giải quyết triệt để lỗi cột hành động che nội dung chính trên mọi thiết bị màn hình nhỏ. Cột hành động sẽ trôi mượt theo thanh cuộn ngang độc lập.
2.  **Bước 2: Nâng cấp lên Phương án 2 (Responsive Card Grid)**
    *   Triển khai cấu trúc layout đôi (Desktop Table vs. Mobile Cards) ngay bên trong `tot-table.component.ts`.
    *   Sắp xếp lại CSS để tạo hiệu ứng chuyển đổi mượt mà, biến bảng dữ liệu khô khan thành các block Card thông tin bo góc tinh tế trên điện thoại di động.

---

## 4. Hướng dẫn Xác thực & Kiểm thử (Verification Plan)

Sau khi triển khai một trong hai phương án trên, việc kiểm thử cần được tiến hành kỹ lưỡng:

### A. Kiểm thử trên Trình duyệt (Chrome DevTools Mobile Mode)
1.  Mở rộng màn hình Desktop: Xác nhận bảng hiển thị bình thường, cột Hành động cố định ghim chắc bên phải, header màu `#fafafa`, các cell text đầy đủ.
2.  Nhấn `F12` và chuyển sang chế độ thiết bị di động (ví dụ: iPhone SE/14 Pro hoặc Samsung Galaxy S20).
3.  Xác nhận:
    *   **Nếu dùng Phương án 1**: Bảng hiển thị trọn vẹn, xuất hiện thanh cuộn ngang độc lập dưới chân bảng. Cột Hành động trôi theo thanh cuộn ngang, KHÔNG che cột Tên file.
    *   **Nếu dùng Phương án 2**: Bảng biến mất hoàn toàn, thay thế bằng danh sách Card tuyệt đẹp. Tên file, kích thước, tag hiển thị rõ ràng từng dòng. Cột Hành động hiển thị dạng nút tiện dụng ở cuối mỗi Card.

### B. Kiểm thử Biên dịch & Triển khai
*   Khởi chạy dev server:
    ```bash
    ./run-dev.sh
    ```
*   Đảm bảo không có bất kỳ lỗi build Angular Compiler nào xảy ra.

---

# Giải pháp Tích hợp TinyMCE Version 6 (`tot-editor-tinymce`)

> [!IMPORTANT]
> Giải pháp này thực hiện việc thiết kế và tích hợp TinyMCE 6 dưới dạng một component Angular Standalone độc lập tên là `tot-editor-tinymce` dùng chung trong dự án. Để tối ưu trải nghiệm và đảm bảo tính độc lập hoàn toàn, giải pháp sử dụng mô hình self-hosted TinyMCE thay vì tải từ CDN đám mây của Tiny Cloud.

---

## 1. Cơ chế Self-Hosted & Phân phối Tài nguyên
Để TinyMCE hoạt động mượt mà mà không phụ thuộc internet hay yêu cầu API Key từ hãng:
1. **Quản lý Assets**: Cấu hình tệp `angular.json` để chuyển hướng thư mục `node_modules/tinymce` vào thư mục static `/tinymce/` của ứng dụng khi build.
2. **Lazy-loading Script**:
   Trong Component `tot-editor-tinymce.component.ts`, cung cấp injector `TINYMCE_SCRIPT_SRC` với giá trị đường dẫn script động.
3. **Xác định base_url động**:
   Hệ thống tự động đọc `base` href của ứng dụng để tự thích ứng giữa hai môi trường:
   - *Môi trường Dev*: localhost sử dụng base href `/` -> `base_url` sẽ là `/tinymce`.
   - *Môi trường Product (Integrated)*: base href `/admin/` -> `base_url` sẽ là `/admin/tinymce`.
   
   Cơ chế giải quyết tự động:
   ```typescript
   const baseHref = document.getElementsByTagName('base')[0]?.getAttribute('href') || '/';
   const tinymceBaseUrl = `${baseHref}tinymce`.replace(/\/+/g, '/');
   ```

---

## 2. Thiết kế Component `tot-editor-tinymce`

### Cấu hình Toolbar & Plugins
Giao diện TinyMCE sẽ được trang bị đầy đủ các công cụ định dạng chuyên nghiệp tương đương với CKEditor hiện tại:
- **Plugins tích hợp sẵn**: `advlist`, `autolink`, `lists`, `link`, `image`, `charmap`, `preview`, `anchor`, `searchreplace`, `visualblocks`, `code`, `fullscreen`, `insertdatetime`, `media`, `table`, `code`, `wordcount`.
- **Custom Button `filesfolders`**:
  Khi nhấn nút này, component sẽ kích hoạt `EditorService.requestModal('file-select')` để mở modal chọn tệp. Sau khi nhận được tệp phản hồi:
  - Nếu là tệp ảnh (`mimeType.startsWith('image/')`), chèn thẻ `<img src="url" alt="name" style="max-width:100%"/>`.
  - Nếu là tệp khác, chèn thẻ `<a href="url" target="_blank">name</a>`.
- **Custom Button `insertBase64Image`**:
  Cho phép người dùng chọn ảnh từ máy cục bộ, mã hóa sang dạng chuỗi Base64 và nhúng trực tiếp vào thẻ `<img>`.

### Bộ xử lý Tải ảnh Lên (`images_upload_handler`)
TinyMCE v6 sử dụng cơ chế Promise-based cho việc upload ảnh. Chúng tôi tích hợp trực tiếp với API `/api/Files/editor-upload` của hệ thống:
```typescript
images_upload_handler: (blobInfo, progress) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('upload', blobInfo.blob(), blobInfo.filename());

    this.httpService.postObservable<any>('/api/Files/editor-upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percent = Math.round((event.loaded / (event.total || 1)) * 100);
          progress(percent);
        } else if (event.type === HttpEventType.Response) {
          if (event.body && event.body.url) {
            resolve(event.body.url);
          } else {
            reject('Không nhận được URL từ phản hồi tải lên.');
          }
        }
      },
      error: (err: any) => {
        reject(err.message || 'Tải ảnh lên thất bại.');
      }
    });
  });
}
```

---

## 3. Quy trình Tích hợp và Đăng ký Component

1. Thêm gói phụ thuộc vào `package.json` của thư mục frontend/web:
   ```json
   "dependencies": {
     "tinymce": "^6.8.3",
     "@tinymce/tinymce-angular": "^8.0.0"
   }
   ```
2. Đăng ký component mới trong thư viện dùng chung `shared`:
   - Tạo thư mục `tot-editor-tinymce` chứa tệp tin component.
   - Thêm dòng xuất bản trong tệp `public-api.ts`:
     ```typescript
     export * from './lib/components/tot-editor-tinymce/tot-editor-tinymce.component';
     ```
3. Tiến hành chạy lệnh biên dịch kiểm chứng:
   ```bash
   npm run integrated
   ```

