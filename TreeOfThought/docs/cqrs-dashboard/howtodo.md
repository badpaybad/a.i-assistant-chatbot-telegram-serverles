# Phân tích Thiết kế & Kế hoạch Phát triển - Module CQRS Dashboard (Cập nhật PostgreSQL & Redis)

Tài liệu này cập nhật giải pháp kỹ thuật và kế hoạch triển khai chi tiết cho giao diện **CQRS Dashboard UI** (thư viện Angular `business-dashboard`) nhằm đồng bộ hoàn toàn với hệ thống lưu trữ log tracking mới trên PostgreSQL và các số liệu thống kê telemetry thời gian thực trên Redis.

---

## 1. Tổng quan Sự thay đổi & Thách thức Kiến trúc UI

Trước đây, toàn bộ log tracking được lưu trữ trong Redis dưới dạng Hashes và Sorted Sets. Để tối ưu hóa dung lượng bộ nhớ Redis, hệ thống backend đã được tái cấu trúc:
- **Redis (Telemetry & Stats)**: Chỉ lưu giữ các key thống kê số lượng tin nhắn thời gian thực (`total:all`, `processed:{queue}`, `error:{queue}`, `processing:{queue}`) phục vụ cho việc hiển thị số liệu nhanh.
- **PostgreSQL (Append-Only Log Tracing)**: Bảng `cqrs_tracking_logs` lưu trữ toàn bộ lịch sử chi tiết (Audit Trail) của từng thông điệp gồm: `sourceComponent`, `subscriberName`, `destinationQueueName`, qualified full name của `handler` và `messageType`, các bước trạng thái `Step` chi tiết (Enqueue, Publish, Subscribe, Dequeue, Execute), trạng thái lỗi `ErrorMessage`.

### Thách thức đối với Giao diện (FE):
1. **Lọc và phân trang nâng cao (Search & Paginate)**: UI cần gọi API `/api/cqrs/dashboard/tracking/recent` và truyền đầy đủ tham số phân trang (`page`, `pageSize`) kết hợp các bộ lọc (`trackingId`, `content`, `status`) để hiển thị dữ liệu từ DB PostgreSQL một cách mượt mà.
2. **Namespace đầy đủ (Full qualified names)**: Các trường dữ liệu `SourceComponent` và `Handler` trả về từ DB là tên đầy đủ có namespace (ví dụ: `Core.Infra.FilesFolders.Models.UploadFileCommand`). Hiển thị trực tiếp các chuỗi dài này sẽ làm vỡ giao diện bảng. UI cần cơ chế rút gọn thông minh (hiển thị tên Class ngắn) kết hợp HTML tooltip hiển thị đầy đủ namespace.
3. **Lazy-loading Step History**: Log tracking đầy đủ của một yêu cầu có thể chứa nhiều dòng milestone. Để tránh quá tải mạng khi tải danh sách tracking gần đây, chúng ta sẽ mở rộng bảng `tot-table` hỗ trợ sự kiện `expandChange` để chỉ khi người dùng click expand dòng thì UI mới gọi API `/api/cqrs/dashboard/tracking/{trackingId}` để tải lịch sử luồng sự kiện chi tiết của message đó.

---

## 2. Giải pháp Thiết kế Chi tiết phía Frontend (FE)

### A. Cập nhật Model & Service (`dashboard.service.ts`)
Cập nhật các interfaces TypeScript để map chính xác các trường dữ liệu mới từ PostgreSQL API:
- **`TrackingSummary`**:
  - `id`: string (UUID)
  - `step`: string (milestone hiện tại: Enqueue, Publish, Subscribe, Dequeue, Execute)
  - `time`: string (thời gian tạo dưới dạng ISO string)
  - `content`: string (nội dung JSON gốc)
  - `status`: string (Success, Error, Pending, Processing)
  - `queueOrTopic`: string (tên queue hoặc topic gốc)
  - `subscriberName`?: string (tên subscriber nhận event)
  - `destinationQueueName`?: string (tên queue thực tế)
  - `sourceComponent`?: string (tên lớp phát lệnh gọi)
  - `handler`?: string (tên handler xử lý)
  - `worker`?: string (worker xử lý)
  - `errorMessage`?: string (thông điệp lỗi nếu có)
  - `isRoot`?: boolean (bản ghi gốc của TrackingId)
  - `history`?: TrackingStep[] (lịch sử đầy đủ)
  - `expand`?: boolean (trạng thái expand trên UI)

- **`TrackingStep`**:
  - `timestamp`: string (thời gian ghi nhận)
  - `step`: string (milestone)
  - `details`: string (chi tiết bước hoặc ErrorMessage)
  - `status`?: string (Success, Error, Pending, Processing)
  - `sourceComponent`?: string
  - `handlerOrEventName`?: string
  - `workerName`?: string
  - `subscriberName`?: string
  - `destinationQueueName`?: string

---

### B. Mở rộng Shared Component `tot-table`
Để hỗ trợ Lazy-loading khi người dùng expand dòng, chúng ta thêm sự kiện `@Output() expandChange` trong `tot-table.component.ts`:
```typescript
@Output() expandChange = new EventEmitter<{ item: any; expanded: boolean }>();

onExpandChange(item: any, checked: boolean): void {
  item.expand = checked;
  this.expandChange.emit({ item, expanded: checked });
}
```
Điều này cho phép dashboard nhận biết chính xác khi nào người dùng bấm nút mở rộng dòng hoặc bấm nút mũi tên mặc định của table để tự động load dữ liệu.

---

### C. Refactor Dashboard Component (`dashboard.component.ts`)

#### 1. Cấu hình Cột hiển thị mới cho Tab Tracking
```typescript
this.trackingColumns = [
  { title: 'Tracking ID', key: 'id', width: '280px' },
  { title: 'Trạng thái', key: 'status', width: '120px', align: 'center' },
  { title: 'Bước hiện tại', key: 'step', width: '120px', align: 'center' },
  { title: 'Nguồn phát (Source)', key: 'sourceComponent', width: '180px' },
  { title: 'Kênh nhận (Queue/Topic)', key: 'queueOrTopic', width: '180px' },
  { title: 'Handler', key: 'handler', width: '180px' },
  { title: 'Thời gian', key: 'time', width: '160px' },
  { title: 'Hành động', key: 'action', width: '120px', right: true }
];
```

#### 2. Xử lý Lazy-loading History khi Expand dòng
```typescript
onRowExpand(event: { item: any, expanded: boolean }): void {
  if (event.expanded && (!event.item.history || event.item.history.length === 0)) {
    this.dashboardService.getTracking(event.item.id).subscribe(history => {
      event.item.history = history;
    });
  }
}

toggleExpand(item: any): void {
  item.expand = !item.expand;
  this.onRowExpand({ item, expanded: item.expand });
}
```

#### 3. Rút gọn Namespace hiển thị
Tạo một phương thức helper đơn giản để lấy tên Class cuối cùng từ chuỗi namespace dài:
```typescript
shortenNamespace(name: string): string {
  if (!name) return '-';
  const parts = name.split('.');
  return parts[parts.length - 1];
}
```

---

### D. Cải tiến UI hiển thị (`dashboard.component.html` & CSS)

#### 1. Định dạng Cells
- **`sourceComponent` & `handler`**: Hiển thị tên rút gọn sử dụng helper `shortenNamespace(data.sourceComponent)`. Đặt thẻ span có thuộc tính `title` để hiển thị tooltip tên đầy đủ khi di chuột vào.
- **`step`**: Hiển thị tag badge màu sắc đặc trưng cho từng bước:
  - `Enqueue` hoặc `Publish`: Màu xanh dương (`blue`) biểu thị tin nhắn đi vào Event Bus hoặc Hàng đợi.
  - `Subscribe`: Màu tím (`purple`) biểu thị chia luồng của subscriber.
  - `Dequeue`: Màu vàng/cam (`orange`) biểu thị worker đã nhận.
  - `Execute`: Màu xanh lá (`green`) biểu thị xử lý hoàn tất.

#### 2. Thiết kế Premium Expand Timeline (`expandTpl`)
Khi người dùng mở rộng một dòng trong danh sách tracking, chúng ta thiết kế một giao diện cao cấp:
- **Cấu trúc Tab đôi (Double-Panel)**:
  - **Bên trái (JSON Payload & Trace Metadata)**: Hiển thị JSON dữ liệu tin nhắn gốc dạng Prettified, có nút Copy nhanh.
  - **Bên phải (Visual Timeline)**: Một timeline chi tiết sử dụng `nz-timeline`. Mỗi node timeline biểu diễn:
    - Thời gian chi tiết (`timestamp | date:'HH:mm:ss.SSS'`).
    - Icon tương ứng với `Step` (Enqueue -> Database, Publish -> Export, Subscribe -> Import, Execute -> Check-circle).
    - Mô tả hành động cụ thể chỉ ra nguồn gửi (`sourceComponent`), Worker nhận (`workerName`), và Handler xử lý (`handlerOrEventName`).
    - Nếu bước đó gặp lỗi, hiển thị một banner lỗi màu đỏ gắt nổi bật (`nz-alert` hoặc border đỏ) chứa đầy đủ `details` (Stack Trace lỗi) và nút Copy Stack Trace lỗi nhanh chóng.

---

## 3. Kịch bản Xác minh (Verification Plan)

### A. Kiểm tra Biên dịch (Build Validation)
Chạy build Angular để đảm bảo không lỗi cú pháp hoặc thiếu dependencies:
```bash
npm run build --tot/business-dashboard
```

### B. Kiểm thử Chức năng UI
1. **Kiểm tra Tab Hàng đợi & Topic**: Xác nhận active processing count, processed, và error count hiển thị đúng theo telemetry từ Redis.
2. **Kiểm tra Theo dõi gần đây**:
   - Xác nhận bảng tracking hiển thị các cột `Source Component` và `Handler` dạng rút gọn, di chuột hiển thị full namespace.
   - Thử tìm kiếm lọc theo `Tracking ID`, `Content`, hoặc `Status` và chuyển trang để xác định server-side pagination hoạt động mượt mà.
3. **Kiểm tra Row Expand**:
   - Bấm expand một dòng: verify timeline được load bất đồng bộ thành công.
   - Kiểm tra sơ đồ timeline có hiển thị đúng chuỗi sự kiện tuần tự từ Controller gốc (`IsRoot = true`) đến các bước Dequeue -> Execute của Worker.
   - Đối với message lỗi: Verify banner chi tiết Stack Trace hiển thị màu đỏ gắt và nút copy hoạt động.
4. **Kiểm tra Action**:
   - Bấm nút "Gửi lại" (Resend) ở một tracking: kiểm tra xem command gốc có được gửi lại thành công và xuất hiện bản ghi mới trong hàng đợi không.

---

## 4. Ý kiến đề xuất xác nhận từ người dùng

Vui lòng xem xét giải pháp trên và cho ý kiến đồng ý để chúng tôi tiến hành triển khai sửa đổi UI chi tiết cho phù hợpTurn này.
