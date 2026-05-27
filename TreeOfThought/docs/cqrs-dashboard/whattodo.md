# Tài liệu Yêu cầu Nghiệp vụ - Module CQRS Dashboard (Hệ thống Giám sát & Quản trị CQRS)

Module CQRS Dashboard cung cấp giải pháp giám sát thời gian thực, quản lý và điều phối luồng xử lý tin nhắn (Commands, Events) trong kiến trúc CQRS & Event Bus của toàn bộ giải pháp hệ thống TreeOfThought. Giao diện cung cấp cho quản trị viên và lập trình viên khả năng theo dõi sức khỏe hệ thống, chi tiết hàng đợi, lịch sử theo dõi và kiểm soát hoạt động của các Worker luồng.

## 1. Thông tin Cấu trúc Module

- **Tài liệu nghiệp vụ (Docs):** [whattodo.md](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/cqrs-dashboard/whattodo.md) | [howtodo.md](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/cqrs-dashboard/howtodo.md)
- **Backend (BE):**
  - Controller chính: [CqrsDashboardController.cs](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/backend/Core.Web.Api/Controllers/CqrsDashboardController.cs)
- **Frontend (FE):** [business-dashboard](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/business-dashboard)

---

## 2. Yêu cầu Nghiệp vụ Tổng quan

Hệ thống quản lý và giám sát CQRS Dashboard giải quyết các bài toán cốt lõi sau:

1. **Giám sát Sức khỏe & Chỉ số Hệ thống (Metrics Monitoring):** Cung cấp các số liệu thống kê tổng quát thời gian thực về số lượng tin nhắn thành công, tin nhắn lỗi, số lượng worker đang hoạt động và tải lượng hệ thống.
2. **Xem chi tiết Hàng đợi & Topic (Queue & Topic Inspection):** Cho phép xem danh sách tất cả các Commands/Queues và Events/Topics đăng ký trên hệ thống, kèm theo thông tin chi tiết về pending, active, processed, error và tổng số message.
3. **Theo dõi chi tiết từng tin nhắn (Message Tracing):** Cung cấp nhật ký truy vết chi tiết (Audit Trail) cho từng tin nhắn thông qua `trackingId` (GUID) từ khi được gửi từ UI/Controller, qua bộ phân phối (Dispatcher), tới khi được nhận bởi Worker và xử lý thành công hoặc gặp lỗi.
4. **Quản trị Lỗi & Gửi lại tin nhắn (DLQ & Retry Management):** Cho phép theo dõi hàng đợi tin nhắn lỗi (Dead-Letter Queue - DLQ), xem nguyên nhân lỗi chi tiết (Stack Trace) và thực hiện gửi lại (Retry) tin nhắn lỗi hoặc xóa tin nhắn lỗi khỏi DLQ.
5. **Điều phối Workers động (Dynamic Worker Control):** Quản trị viên có khả năng bật/tắt hoạt động của từng Background Worker xử lý hàng đợi/topic cụ thể một cách trực tiếp từ UI mà không cần khởi động lại dịch vụ Backend.

---

## 3. Chi tiết Yêu cầu và Tính năng Phân hệ Backend (BE)

### 3.1. Phân hệ API Giám sát & Quản lý CQRS ([CqrsDashboardController.cs](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/backend/Core.Web.Api/Controllers/CqrsDashboardController.cs))

Yêu cầu quyền truy cập của nhà phát triển hệ thống (`be.infra.dashboard` thông qua thuộc tính `[AppAuthorize]`).

- **API Thống kê Tổng quát (`GET /api/cqrs/dashboard/stats`):**
  - Trả về số liệu thống kê tổng quát từ `IMessageTracker` (số lượng tin nhắn lỗi, thành công, đang xử lý cho từng queue).
  - Trả về trạng thái hoạt động hiện tại của tất cả các background workers (`Running`, `Stopped`) từ `IDispatcher`.
- **API Danh sách Hàng đợi & Topic (`GET /api/cqrs/dashboard/queues`):**
  - Tổng hợp danh sách toàn bộ Commands/Queues và Events/Topics đăng ký trong `IDispatcher`.
  - Đối với từng Queue: Trả về số lượng pending (chờ xử lý), active (đang xử lý), processed (đã xử lý thành công), error (gặp lỗi) thu thập từ Redis và Message Tracker; trả về mảng IDs của Workers đang xử lý queue đó và các Handlers đăng ký.
  - Đối với từng Topic: Trả về thông tin tương tự tổng hợp trên toàn bộ các subscribers; cung cấp mảng chi tiết thông tin các subscribers đăng ký nghe topic đó.
- **API Hoạt động Gần nhất (`GET /api/cqrs/dashboard/last-activity`):**
  - Truy xuất thời điểm hoạt động cuối cùng của từng queue/topic/subscriber lưu trữ trong Redis nhằm phát hiện hàng đợi bị treo hoặc không hoạt động.
- **API Tin nhắn Hàng đợi (`GET /api/cqrs/dashboard/messages/{queueName}`):**
  - Lấy danh sách tin nhắn hiện tại hỗ trợ phân trang Server-side.
  - Đối với hàng đợi đặc biệt (ví dụ: `:processing`, `:dead`): Trả về danh sách message trực tiếp từ Redis List tương ứng.
  - Đối với hàng đợi/topic thông thường: Kết hợp cả tin nhắn đang chờ trong hàng đợi và lịch sử tin nhắn đã xử lý thành công/gặp lỗi lưu vết bởi `IMessageTracker` trong khoảng 100 tin nhắn gần nhất.
- **API Gửi lại tin nhắn lỗi (`POST /api/cqrs/dashboard/retry`):**
  - Cho phép gửi lại một tin nhắn lỗi từ DLQ (`queueName:dead`) trở lại hàng đợi gốc để thực hiện xử lý lại.
- **API Đẩy tin nhắn thủ công (`POST /api/cqrs/dashboard/push`):**
  - Cho phép admin đẩy trực tiếp một tin nhắn dưới định dạng JSON vào hàng đợi chỉ định phục vụ mục đích kiểm thử.
- **API Xóa tin nhắn DLQ (`DELETE /api/cqrs/dashboard/dead-letter/{queueName}`):**
  - Xóa vĩnh viễn tin nhắn chỉ định khỏi hàng đợi tin nhắn lỗi (DLQ).
- **API Lịch sử Theo dõi (`GET /api/cqrs/dashboard/tracking/{trackingId}`):**
  - Trả về toàn bộ lịch sử (step-by-step history) các bước xử lý của một message cụ thể theo mã GUID `trackingId`.
- **API Nhật ký Theo dõi Gần đây (`GET /api/cqrs/dashboard/tracking/recent`):**
  - Tìm kiếm và lọc nâng cao danh sách log tracking lưu trữ trên Redis.
  - Hỗ trợ các bộ lọc: `trackingId`, `content` (nội dung tin nhắn), `status` (trạng thái: pending, processing, success, error).
  - Hỗ trợ phân trang phía Server (`pageIndex`, `pageSize`).
- **API Gửi lại qua Tracking (`POST /api/cqrs/dashboard/tracking/{trackingId}/resend`):**
  - Đọc ngược dữ liệu nội dung tin nhắn gốc từ log tracking và tự động nạp/đẩy lại vào hàng đợi hoặc Event Bus tùy thuộc vào loại tin nhắn gốc (Command hay Event).
- **API Xóa log Tracking (`DELETE /api/cqrs/dashboard/tracking/{trackingId}`):**
  - Xóa toàn bộ dữ liệu log tracking của message chỉ định khỏi hệ thống Redis.
- **API Quản lý Worker (`POST /api/cqrs/dashboard/workers/{workerId}/stop`, `POST /api/cqrs/dashboard/workers/{workerId}/start`):**
  - Ra lệnh cho `IDispatcher` dừng hoặc chạy một Background Worker cụ thể theo ID.

---

## 4. Giao diện Người dùng Phân hệ Frontend (FE)

Phát triển dưới dạng Angular Library độc lập trong thư mục `business-dashboard`. Sử dụng Ng-Zorro-Antd, Transloco đa ngôn ngữ, và các component dùng chung (`tot-table`, `tot-button`).

### 4.1. Trang Dashboard chính (`dashboard` Component)

Trang quản trị chính gồm các khu vực chức năng chính:

- **Card Chỉ số Hệ thống (Metrics Cards):**
  - Hiển thị các chỉ số: Số lượng Workers đang chạy, Tin nhắn đang chờ xử lý (Pending), Lượng tin nhắn lỗi (Errors) và Biểu đồ tải lượng hiện tại.
- **Tabs Quản lý Chức năng:**
  - **Tab Hàng đợi & Topic (`Queues`):**
    - Sử dụng bảng `tot-table` hiển thị danh sách hàng đợi và topic. Các cột gồm: Loại (Tag Queue/Topic), Tên topic/queue, Đang xử lý, Thành công, Lỗi, Tổng, Workers (các worker đang xử lý), Handlers (các class handler đăng ký) và Hành động (Xem tin nhắn, Gửi thử).
    - Hỗ trợ click hành động mở Modal chi tiết Subscriber (đối với Topic) hoặc Modal danh sách tin nhắn (đối với Queue).
  - **Tab Quản lý Worker (`Workers`):**
    - Sử dụng bảng `tot-table` hiển thị thông tin chi tiết các background worker: ID Worker, Trạng thái (Chạy/Dừng với badge màu tương ứng), Loại tin nhắn xử lý, Tên Queue/Topic đích, và Hành động (Bật/Tắt worker).
  - **Tab Nhật ký Theo dõi (`Tracking`):**
    - Hộp tìm kiếm và lọc nâng cao: `Tracking ID`, `Nội dung`, `Trạng thái`, `Bộ chọn khoảng ngày tạo`.
    - Bảng danh sách tracking lịch sử: Mã tracking, Trạng thái (Tag màu biểu thị), Hàng đợi đích, Handler nhận, Worker xử lý, Nội dung preview, Ngày tạo và Hành động (Gửi lại tin nhắn, Xóa log tracking).
    - Cho phép click expand từng dòng để xem sơ đồ NzSteps/NzTimeline chi tiết lịch sử xử lý.
  - **Tab Hoạt động cuối (`Last Activity`):**
    - Hiển thị danh sách các queue/topic/subscriber kèm theo thời gian hoạt động cuối cùng tương ứng để theo dõi treo luồng.
- **Tự động Refresh (Auto-refresh):**
  - Cung cấp Dropdown cấu hình tần suất làm mới dữ liệu tự động (Manual, 1s, 5s, 10s, 30s, 1m, 5m, 10m...).
- **Nút "Gửi Command" & "Gửi Event" Test:**
  - Mở modal cho phép nhập dữ liệu JSON tùy ý để gửi tin nhắn test hệ thống qua API `/api/Test/cqrs/sample-command` hoặc `/api/Test/cqrs/sample-event`.

### 4.2. Xem danh sách Tin nhắn (`message-list` Component)

Hiển thị danh sách tin nhắn hiện tại của một hàng đợi chỉ định dưới dạng bảng:

- **Bảng danh sách tin nhắn (`tot-table`):**
  - Các cột: Thời gian, Nội dung tin nhắn (Click để expand xem chi tiết), Trạng thái (Tag màu), Hành động (Gửi lại, Xóa, Chi tiết).
  - Hỗ trợ phân trang phía Server.
- **Expand JSON Viewer:**
  - Render nội dung tin nhắn dưới dạng JSON định dạng đẹp mắt (prettified).
  - Hỗ trợ nút Sao chép nội dung tin nhắn nhanh vào Clipboard.
  - Nếu tin nhắn gặp lỗi (DLQ): Hiển thị chi tiết thông tin Stack Trace lỗi màu đỏ nổi bật cùng ID của Worker gặp lỗi.

### 4.3. Theo dõi chi tiết Luồng (`tracing` Component)

Trang hiển thị sơ đồ truy vết cho một tin nhắn thông qua mã `trackingId`:

- **NzPageHeader:** Hiển thị mã `trackingId`, nút Back quay lại dashboard và nút Refresh tải lại dữ liệu.
- **NzSteps:** Biểu thị trực quan vị trí xử lý hiện tại của tin nhắn (Gửi đi -> Bộ điều phối -> Worker nhận -> Kết quả xử lý).
- **NzTimeline:** Hiển thị chuỗi thời gian chi tiết của từng bước (Timestamp, tên thành phần xử lý, nội dung chi tiết hành động hoặc mô tả lỗi gặp phải).

**cập nhật 2026-05-25 11:11:11**
đọc về thiết kế lưu trữ log tracking ở TreeOfThought/backend/Core.Infra.Cqrs/whattodo.md để sửa UI cho phù hợp
  Hàng đợi & Chủ đề  
  Theo dõi gần đây
    - cần hiện message gốc hiện mới nhất lên trên
      - khi expand thì hiện lịch sử xử lý từng bước theo thời gian tăng dần
  Trạng thái Workers
  Hoạt động cuối
  
- Bổ xung thêm các tổng số

- Table ở Hàng đợi & chủ đề đang hoạt động tốt
  - cần sửa lại table cho Theo dõi gần đây, và Trạng thái Workers , bảng hiển thị cần có action fixed

**cập nhật 2026-05-27 09:59:24**

Về cách log step statu ở 2 file TreeOfThought/backend/Core.Infra.Cqrs/whattodo.md và TreeOfThought/backend/Core.Infra.Cqrs/howtodo.md đã cũ và ko thống nhất. Cần cập nhật:

Mô tả về step và status trong tracking log (Đã cập nhật tối giản & phân nhánh độc lập):
    command là dùng queue
        step: send có status success | error
        step: dequeue (dequeue và bắt đầu invoke handle) có status success
        step: done có status success | error dựa vào việc invoke handle có lỗi hay không
    event là dùng topic pub/sub
        step: send có status success | error (success: là khi send hết message lên queue cho tất cả các subscriber thành công)
        từng subscriber có queue data riêng hoạt động độc lập:
            step: dequeue (dequeue và invoke handle) có status success
            step: done có status success | error dựa vào việc invoke handle có lỗi hay không

Thống kê tổng chung hệ thống

- tổng số message cho queue
  - total send success, total send error
  - total done success, total done error
- tổng số message cho topic
  - total send success, total send error
  - total done success, total done error

Tách Hàng đợi & Chủ đề   thành riêng 2 tab độc lập : queue riêng , topic riêng

Tab Danh sách các queue name, theo từng queue name
    total send success, total send error, total done succes, total done error, xem chi tiết
      xem chi tiết click vào mở modal danh sách các message gốc thuộc queue name đó
        hiện theo thời gian giảm dần, thông tin hiển thị đầy đủ của message gốc.
          click vào sẽ expand ra log quá trình của message gốc theo thời gian tăng dần

Tab Danh sách các topic name, theo từng topic name
    total send success, total send error,total done succes, total done error, xem chi tiết
      xem chi tiết click vào mở modal danh sách các queue data của subsciber của topic đó
        total send success, total send error,total done succes, total done error, xem chi tiết
          xem chi tiết click vào expand danh sách các message gốc thuộc queue name của subsriber đó
            hiện theo thời gian giảm dần, thông tin hiển thị đầy đủ của message gốc.
              click vào sẽ expand ra log quá trình của message gốc theo thời gian tăng dần

**cập nhật 2026-05-27 10:40:24**

cần cập nhật lại các step và status cho tracking log , mô tả hoạt động vd:

FE UI tạo request test command có trackking id -> BE controller tạo command từ reuqest , command data lúc này là root message với tracking id từ UI -> dispatcher enqueue -> worker dequeue -> invoke handle cho command -> publish event test (có 2 subscriber nên loop và enqueue cho 2 queue data của 2 subscriber -> trigger pub/sub) -> có 2 subscriber chạy song song nhận đc trigger pub/sub
  - subscriber 1 giả lập thành công
    loop deuque -> invoke handle  
  - subscriber 2 event handle giả lập lỗi
    loop deuque -> invoke handle  

từng step cần ghi nhận: step name, status, data, timestamp , elasped
  controller gửi lên queue thành công hay không 
  dequeue thành công hay không 
  handle xử lý thành công hay không
  command publish event thành công hay không 
  từng subscriber dequeue thành công hay không
  từng subscriber handle thầnh công hay không 

Cần cập nhật và chỉnh cả UI cho phù hợp 

Bảng : cqrs_tracking_logs cũng chưa có 

Chưa chỉ ra được gửi từ source component nào tới source component nào (cần lấy fullname cả namespace của class ) 
vd cho mesage này, từ handle khi publish event thì cần chỉ ra là từ handle command nào lên topic nào 
      SELECT "Id", "TrackingId", "MessageType", "MessageData", "QueueOrTopicName", "SubscriberName", "DestinationQueueName", "SourceComponent", "HandlerName", "WorkerId", "Step", "Status", "ErrorMessage", "IsRoot", "CreatedAt", "Type", "ElapsedMilliseconds"
      FROM public.cqrs_tracking_logs
      where  "TrackingId" ='5572008f-02a5-47c7-9ddb-1ba92ee6ae66'
      order by "CreatedAt" asc  ;

**cập nhật 2026-05-27 20:40:24**
folder backend của nghiệp vụ : cqrs-dashboard 
move TreeOfThought/backend/Core.Web.Api/Controllers/CqrsDashboardController.cs ra project trong folder TreeOfThought/backend/cqrs-dashboard để đồng nhất với folder frontend cũng đổi TreeOfThought/frontend/web/projects/tot/business-dashboard thành TreeOfThought/frontend/web/projects/tot/cqrs-dashboard và docs TreeOfThought/docs/cqrs-dashboard 