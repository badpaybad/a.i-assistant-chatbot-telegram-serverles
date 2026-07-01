# Tài liệu Thiết kế & Giải pháp Phát triển: CQRS PostgreSQL-Backed Tracking ID & Logging Xuyên Suốt

Tài liệu này định nghĩa giải pháp kỹ thuật, cấu trúc cơ sở dữ liệu PostgreSQL, cơ chế thống kê trên Redis và kế hoạch triển khai chi tiết cho hệ thống theo dõi (Tracking ID) và ghi nhật ký (Logging) xuyên suốt toàn bộ vòng đời của các yêu cầu Command & Event trong hạ tầng CQRS (`Core.Infra.Cqrs`).

---

## 1. Mục tiêu & Nguyên lý Thiết kế

Khi một yêu cầu (Request) đi từ client (UI/API Controller) vào hệ thống Modular Monolith, nó có thể được phân rã thành nhiều bước xử lý bất đồng bộ thông qua Command và Event:
- API nhận yêu cầu -> Enqueue **Command A** (Priority Queue trên Redis).
- Command Worker xử lý **Command A** -> Publish **Event B** (Topic trên Redis).
- Event Worker đăng ký subscribe nhận được **Event B** -> Enqueue tiếp **Command C** hoặc gửi realtime phản hồi lên UI qua Firestore.

```mermaid
graph TD
    UI["API / Controller (Yêu cầu gốc)"] -->|1. Dispatch SendAsync| CmdA["Command A (Queue)"]
    CmdA -->|2. Dequeue & Handle| WorkerA["CommandHandler A"]
    WorkerA -->|3. PublishAsync (Transform)| EvtB["Event B (Topic)"]
    EvtB -->|4. Subscribe & Handle| WorkerB["EventHandler B"]
    WorkerB -->|5. SendAsync (Transform)| CmdC["Command C (Queue)"]
    
    style UI fill:#f9f,stroke:#333,stroke-width:2px
    style CmdA fill:#bbf,stroke:#333,stroke-width:1px
    style WorkerA fill:#dfd,stroke:#333,stroke-width:1px
    style EvtB fill:#fbb,stroke:#333,stroke-width:1px
    style WorkerB fill:#dfd,stroke:#333,stroke-width:1px
```

### Nguyên tắc 1: Lưu trữ Nhật ký trên PostgreSQL (Bền vững & Tiết kiệm Redis)
Để tránh làm nặng bộ nhớ trong của Redis (vốn dùng cho hàng đợi tin cậy và cache phiên), toàn bộ vòng đời và nhật ký xử lý của các thông điệp sẽ được lưu trữ trong một bảng append-only (`cqrs_tracking_logs`) trong cơ sở dữ liệu **PostgreSQL** trung tâm, tuân thủ kiến trúc và phân vùng riêng biệt theo cấu hình từ `appsettings.json`.

### Nguyên tắc 2: Đảm bảo tính xuyên suốt của Tracking ID (Original Trace)
Để có thể liên kết (correlate) toàn bộ cây xử lý trên về một yêu cầu gốc duy nhất, **Tracking ID phải được bảo toàn không đổi** trong suốt chuỗi biến đổi (transform/mapping) từ Command sang Event hoặc ngược lại.

### Nguyên tắc 3: Tự động hóa truyền dữ liệu Context (AsyncLocal Context Flow)
Thay vì bắt buộc lập trình viên phải truyền thủ công `TrackingId` ở mọi nơi (dễ dẫn tới sai sót hoặc quên truyền), chúng tôi áp dụng cơ chế **`AsyncLocal<Guid>`** để lưu trữ `TrackingId` hiện tại của tiến trình xử lý. 
Khi một Command/Event mới được tạo và dispatch đi từ trong một Handler đang chạy, hệ thống sẽ tự động kiểm tra:
- Nếu message mới chưa có `TrackingId` (bằng `Guid.Empty`), nó sẽ tự động kế thừa `TrackingId` từ Context đang chạy.
- Nếu không nằm trong context nào, hệ thống sẽ tự động sinh mới một `Guid`.

### Nguyên tắc 4: Xác định Bản ghi gốc (Root Message / IsRoot = true)
Bản ghi đầu tiên khi một `TrackingId` được khởi tạo sẽ có thuộc tính `IsRoot = true`. Điều này xảy ra khi ambient context `CqrsTrackerContext.CurrentTrackingId == Guid.Empty` (không có context xử lý ambient nào đang chạy), biểu thị đây là điểm bắt đầu của một chuỗi workflow execution tree mới.

### Nguyên tắc 5: Định danh Nguồn phát sinh (SourceComponent) tự động
Để biết chính xác message gốc được tạo ra từ đâu phục vụ truy vết:
- **FE-to-BE Requests**: Nguồn phát sinh tạo hoặc mapping request từ UI FE xuống thường đi qua API Controller. Hệ thống sẽ tự động phân tích stack trace để lấy thông tin của lớp **Controller** làm nguồn gốc.
- **BE-to-BE Requests**: Nguồn phát sinh tạo command/event trực tiếp từ một tiến trình nghiệp vụ ngầm hoặc xử lý nghiệp vụ nội bộ phía Backend sẽ lấy thông tin của **lớp nghiệp vụ** (Business Class/Handler) trực tiếp gọi Dispatcher làm nguồn.

---

## 2. Giải pháp Thiết kế Cơ sở Dữ liệu (PostgreSQL Schema)

Chúng tôi thiết kế bảng `cqrs_tracking_logs` dưới dạng **Append-Only** (chỉ chèn thêm, không bao giờ cập nhật hay xóa) để ghi nhận chi tiết từng bước (Milestone) mà yêu cầu đi qua.

### 2.1. Cấu trúc bảng `cqrs_tracking_logs`
Mỗi dòng đại diện cho một sự kiện (Send, Publish, Dequeue, Success, Error).

| Tên Cột | Kiểu Dữ Liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| **Id** | `bigint` | `PRIMARY KEY` (Identity) | Khóa chính tăng tự động giúp ghi nhận thứ tự tuần tự tuyệt đối. |
| **TrackingId** | `uuid` | `NOT NULL`, `INDEX` | Khóa theo dõi yêu cầu gốc, dùng để gom nhóm và truy vết. |
| **MessageType** | `varchar(500)` | `NOT NULL`, `INDEX` | **Tên kiểu đầy đủ kèm namespace** của Command/Event (ví dụ: `Core.Infra.FilesFolders.Models.UploadFileCommand`). |
| **MessageData** | `text` | `NOT NULL` | Chuỗi JSON chứa toàn bộ dữ liệu payload của Command/Event lúc gửi/nhận/lỗi. |
| **QueueOrTopicName** | `varchar(255)` | `NOT NULL`, `INDEX` | Tên gốc của Queue hoặc Topic (ví dụ: `Core.Infra.NhanDienKhuonMat.Models.FaceDetectionSessionSavedEvent` hoặc `face-detection-queue`). |
| **SubscriberName** | `varchar(255)` | `NULL`, `INDEX` | Tên của subscriber đăng ký nhận (đặc trưng cho luồng Event Pub/Sub, giúp chỉ ra subscriber nào thuộc topic nào). |
| **DestinationQueueName** | `varchar(255)` | `NULL` | Tên hàng đợi vật lý thực tế trên Redis (với topic, đây là hàng đợi riêng biệt của từng subscriber dạng `infra:sub:topicName:subscriberName`). |
| **SourceComponent** | `varchar(500)` | `NULL` | **Tên lớp đầy đủ kèm namespace** của thành phần gọi Dispatcher (tự động phân tích StackTrace để phát hiện ra Controller hoặc Handler cha thực hiện dispatch). |
| **HandlerName** | `varchar(500)` | `NULL` | **Tên kiểu đầy đủ kèm namespace** của Handler xử lý thông điệp (ví dụ: `Core.Infra.NhanDienKhuonMat.Handlers.FaceDetectionCommandHandler`). |
| **WorkerId** | `varchar(255)` | `NULL` | Định danh của Worker xử lý thông điệp. |
| **Step** | `varchar(50)` | `NOT NULL` | Bước xử lý thông điệp (chỉ dùng các giá trị viết thường):<br>- **Đối với Command (Queue)**: `send` (gửi lên queue), `dequeue` (worker dequeue và bắt đầu invoke handler), `done` (handler kết thúc thực thi).<br>- **Đối với Event (Topic Pub/Sub)**:<br>  * *Topic*: `send` (khi dispatcher đẩy Event thành công vào hàng đợi của tất cả subscriber).<br>  * *Subscriber*: `dequeue` (khi worker của subscriber dequeue và bắt đầu handle), `done` (khi subscriber handler hoàn thành). |
| **Status** | `varchar(50)` | `NOT NULL`, `INDEX` | Trạng thái xử lý (chỉ dùng các giá trị viết thường): `success` hoặc `error`. |
| **Type** | `varchar(50)` | `NOT NULL`, `INDEX` | Phân loại thông điệp (`queue` hoặc `topic`). |
| **ElapsedMilliseconds** | `bigint` | `NULL`, `INDEX` | Thời gian xử lý của bước đó tính bằng mili giây. |
| **ErrorMessage** | `text` | `NULL` | Chi tiết thông tin ngoại lệ (Exception) nếu xử lý bị lỗi. |
| **IsRoot** | `boolean` | `NOT NULL` | Đánh dấu `true` cho bản ghi đầu tiên khi TrackingId được khởi tạo ban đầu. |
| **CreatedAt** | `timestamp` | `NOT NULL`, `DEFAULT UTC` | Thời điểm ghi nhận log. |

---

## 3. Kiến trúc Cài đặt & Code Minh Họa

### 3.1. Quản lý Context qua `CqrsTrackerContext`
Tạo lớp `CqrsTrackerContext` sử dụng `AsyncLocal<Guid>` để tự động đồng bộ hóa `TrackingId` trong các luồng bất đồng bộ.

**Vị trí file:** [CqrsTrackerContext.cs](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/backend/Core.Infra.Base/Utils/CqrsTrackerContext.cs)
```csharp
using System;
using System.Threading;

namespace Core.Infra.Base.Utils;

public static class CqrsTrackerContext
{
    private static readonly AsyncLocal<Guid> _currentTrackingId = new();

    /// <summary>
    /// TrackingId đang hoạt động trên luồng xử lý bất đồng bộ hiện tại.
    /// </summary>
    public static Guid CurrentTrackingId
    {
        get => _currentTrackingId.Value;
        set => _currentTrackingId.Value = value;
    }
}
```

### 3.2. CqrsDbContext & Mô hình
Kế thừa từ `BaseDbContext` của `Core.Infra.Data` và lấy cấu hình Postgresql riêng biệt từ appsettings.json.

**Vị trí file:** [CqrsDbContext.cs](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/backend/Core.Infra.Cqrs/Contexts/CqrsDbContext.cs)
```csharp
using Core.Infra.Data.Contexts;
using Core.Infra.Cqrs.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.Infra.Cqrs.Contexts;

public class CqrsDbContext : BaseDbContext
{
    public CqrsDbContext(string connectionString, DbProviderType provider)
        : base(connectionString, provider)
    {
    }

    public DbSet<CqrsTrackingLog> CqrsTrackingLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<CqrsTrackingLog>(entity =>
        {
            entity.ToTable("cqrs_tracking_logs");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).UseIdentityAlwaysColumn();
            
            entity.HasIndex(e => e.TrackingId);
            entity.HasIndex(e => e.QueueOrTopicName);
            entity.HasIndex(e => e.MessageType);
            entity.HasIndex(e => e.CreatedAt);
            entity.HasIndex(e => e.Status);
            entity.HasIndex(e => e.Type);
            entity.HasIndex(e => e.ElapsedMilliseconds);
        });
    }
}
```

### 3.3. Dịch vụ Ghi DB Asynchronous: `CqrsDbLogger`
Để đảm bảo thread-safe tuyệt đối và không chặn luồng xử lý chính, `CqrsDbLogger` hoạt động dưới dạng Singleton và tự động tạo Scoped `CqrsDbContext` mỗi khi lưu trữ log.

**Vị trí file:** [CqrsDbLogger.cs](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/backend/Core.Infra.Cqrs/Services/CqrsDbLogger.cs)
```csharp
using System;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Infra.Cqrs.Contexts;
using Core.Infra.Cqrs.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Core.Infra.Cqrs.Services;

public class CqrsDbLogger
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<CqrsDbLogger> _logger;

    public CqrsDbLogger(IServiceProvider serviceProvider, ILogger<CqrsDbLogger> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    public async Task LogAsync(
        Guid trackingId,
        string messageType,
        string messageData,
        string queueOrTopicName,
        string? subscriberName,
        string? destinationQueueName,
        string? sourceComponent,
        string? handlerName,
        string? workerId,
        string step,
        string status,
        string type,
        long? elapsedMilliseconds = null,
        string? errorMessage = null,
        bool isRoot = false)
    {
        try
        {
            using var scope = _serviceProvider.CreateScope();
            var db = scope.ServiceProvider.GetService<CqrsDbContext>();
            if (db == null) return;

            var logEntry = new CqrsTrackingLog
            {
                TrackingId = trackingId,
                MessageType = messageType,
                MessageData = messageData,
                QueueOrTopicName = queueOrTopicName,
                SubscriberName = subscriberName,
                DestinationQueueName = destinationQueueName,
                SourceComponent = sourceComponent,
                HandlerName = handlerName,
                WorkerId = workerId,
                Step = step,
                Status = status,
                Type = type,
                ElapsedMilliseconds = elapsedMilliseconds,
                ErrorMessage = errorMessage,
                IsRoot = isRoot,
                CreatedAt = DateTime.UtcNow
            };

            db.CqrsTrackingLogs.Add(logEntry);
            await db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to write CQRS DB log for TrackingId: {TrackingId}", trackingId);
        }
    }
}
```

---

## 4. Các điểm tích hợp nghiệp vụ và Thống kê trên Redis

Việc quản lý và lưu trữ thông tin log đã được đưa xuống PostgreSQL bền vững. Tuy nhiên, để tối ưu hóa hiệu năng, hệ thống vẫn duy trì việc **thống kê tổng hợp số lượng thông điệp thời gian thực trên Redis** qua dịch vụ `IMessageTracker`.

### 4.1. Mở rộng `IMessageTracker` & `MessageTracker`
Thêm hàm `DecrementStatAsync` vào `IMessageTracker` để quản lý các số liệu trạng thái động (như tin nhắn đang xử lý).
```csharp
public async Task DecrementStatAsync(string statKey)
{
    await _db.HashDecrementAsync(CqrsConstants.StatsPrefix.TrimEnd(':'), statKey);
}
```

### 4.2. Hệ thống Key Thống kê thời gian thực trên Redis
Các số liệu thống kê được cập nhật liên tục qua các thao tác Hash Increment/Decrement:

| Chỉ số Thống kê | Key trên Redis (Hash Fields) | Thời điểm cập nhật |
| :--- | :--- | :--- |
| **Tổng số message** | `total:all` | Tăng 1 khi gửi command (`SendAsync`) hoặc publish event (`PublishAsync`). |
| **Tổng xử lý thành công** | `total:success` | Tăng 1 khi xử lý xong thành công ở worker. |
| **Tổng xử lý lỗi** | `total:error` | Tăng 1 khi xử lý gặp Exception ở worker. |
| **Tổng đang xử lý** | `total:processing` | Tăng 1 khi worker bắt đầu dequeue; Giảm 1 khi xử lý xong (thành công hoặc lỗi). |
| **Tổng theo queue/topic** | `total:{queueOrTopicName}` | Tăng 1 khi gửi/publish vào queue hoặc topic tương ứng. |
| **Tổng đang xử lý theo queue/topic** | `processing:{queueOrTopicName}` | Tăng 1 khi bắt đầu xử lý; Giảm 1 khi kết thúc (thành công/lỗi) trên queue/topic đó. |
| **Thành công theo queue/topic** | `success:{queueOrTopicName}` | Tăng 1 khi xử lý thành công trên queue/topic tương ứng. |
| **Lỗi theo queue/topic** | `error:{queueOrTopicName}` | Tăng 1 khi xử lý thất bại trên queue/topic tương ứng. |

### 4.3. Phân tích StackTrace để tự động hóa phát hiện nguồn phát sinh (SourceComponent)
Để tự động điền `SourceComponent`, dispatcher sẽ chạy phân tích StackTrace để lấy fullname có namespace của class gọi lệnh:
```csharp
private string? ResolveSourceComponent()
{
    var stackTrace = new System.Diagnostics.StackTrace();
    var frames = stackTrace.GetFrames();
    if (frames == null) return null;

    foreach (var frame in frames)
    {
        var method = frame.GetMethod();
        var type = method?.DeclaringType;
        if (type == null) continue;

        // Bỏ qua các class hệ thống và class CQRS
        if (type.Assembly.FullName?.StartsWith("System") == true ||
            type.Assembly.FullName?.StartsWith("Microsoft") == true ||
            type.FullName?.StartsWith("Core.Infra.Cqrs") == true)
        {
            continue;
        }

        return type.FullName; // Trả về FullName có namespace của Controller/Handler phát động
    }
    return null;
}
```

### 4.4. Cơ chế Tự phục hồi Đăng ký Sự kiện (Self-Healing Event Subscriptions) - Cập nhật 2026-05-25

#### A. Vấn đề Phát sinh trong Môi trường Phân tán / Docker Local
Hệ thống CQRS sử dụng cấu trúc lưu trữ tập trung của Redis Set (`topic_subs:<TopicName>`) để định tuyến động (route) các Event đến các Worker đăng ký tương ứng:
1. Danh sách đăng ký (`UiNotificationHandler` cho `FolderCreatedEvent`, `FilePermissionSetEvent`, v.v.) chỉ được ghi vào Redis **một lần duy nhất** lúc Kestrel khởi chạy (`CqrsAutoRegistrationService.StartAsync`).
2. Trong môi trường local hoặc staging, container Redis thường xuyên bị restart, flushall, hoặc reset dữ liệu.
3. Khi Redis bị dọn dẹp, toàn bộ key `topic_subs:*` biến mất vĩnh viễn, trong khi tiến trình Kestrel vẫn tiếp tục hoạt động.
4. Ở lần gọi sự kiện kế tiếp, `PublishAsync` truy vấn danh sách subscriber từ Redis và nhận về **0 subscribers** -> Tin nhắn sự kiện bị loại bỏ lặng lẽ và không bao giờ được chuyển tiếp tới Handler xử lý UI Notification.

#### B. Giải pháp Khắc phục Tự phục hồi (Self-Healing)
Chúng tôi triển khai giải pháp tự phục hồi tự động trực tiếp bên trong tiến trình xuất bản sự kiện `PublishAsync` của [CqrsDispatcher.cs](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/backend/Core.Infra.Cqrs/Dispatchers/CqrsDispatcher.cs):
*   Khi phát hành một Event, hệ thống sẽ đối chiếu tên Topic với bản đăng ký nội bộ (in-memory) `_topicSubscribers` (được bảo toàn trọn vẹn trong luồng hoạt động của Singleton Dispatcher).
*   Nếu phát hiện topic có đăng ký local nhưng key Set đăng ký tương ứng trên Redis trống/không tồn tại, Dispatcher sẽ tự động thực hiện ghi nhận lại (`SetAddAsync`) trước khi lấy danh sách.
*   Giải pháp này giúp hệ thống đạt độ chịu lỗi cực cao (Fault-Tolerant), tự động khôi phục hoàn toàn metadata định tuyến trên Redis mà không cần can thiệp hay khởi động lại Kestrel.

```csharp
// Self-healing: Đảm bảo các local subscribers được ghi nhận lại vào Redis nếu bị xóa (do Redis bị restart/clear)
if (_topicSubscribers.TryGetValue(topic, out var localSubs))
{
    foreach (var sub in localSubs)
    {
        await _queueService.SetAddAsync(CqrsConstants.GetTopicSubsKey(topic), sub);
    }
}
```

#### C. Tại sao không cần thiết áp dụng cho `SendAsync` (Command)?
Hàng đợi của các Command sử dụng kiến trúc **Định tuyến tĩnh trực tiếp (Point-to-Point static routing)** thẳng đến queue nghiệp vụ được chỉ định (như `CreateFolderCommand`) mà không đi qua cơ chế tra cứu động từ Redis Set. Do đó, ngay cả khi Redis bị xóa sạch, lần gọi `SendAsync` kế tiếp sẽ tự động tái tạo hàng đợi vật lý và đẩy command vào xử lý thành công mà không gặp phải rủi ro định tuyến rỗng.

#### D. Giải pháp Decoupling: Kết hợp Hợp đồng Chia sẻ (Shared Contracts) & Duck-Typing (Cập nhật 2026-07-01)
Để loại bỏ sự phụ thuộc chéo giữa các project module khác nhau khi truyền nhận Command/Event, hệ thống áp dụng cơ chế định danh độc lập:

1. **Thay đổi cấu trúc phân giải tên Queue/Topic:**
   * Mặc định, nếu Command/Event không cấu hình ghi đè tên Queue/Topic rõ ràng, hệ thống sẽ sử dụng **`Type.Name`** (tên Class ngắn gọn, ví dụ: `CreateFolderCommand`) thay vì `Type.FullName` (bao gồm cả namespace phức tạp).
   * Điều này đảm bảo các class ở các project khác nhau dù khai báo ở namespace khác nhau vẫn ánh xạ chung vào một hàng đợi/chủ đề trên Redis nếu có cùng tên lớp.

2. **Hỗ trợ Duck-Typing qua các hàm Dispatcher phi generic:**
   * Thêm các phương thức mới vào `IDispatcher` để cho phép dispatch thông điệp bằng chuỗi tên Queue/Topic và một Object dữ liệu bất kỳ (anonymous object, local class, DTO...):
     ```csharp
     Task SendAsync(string queueName, object command, Guid? trackingId = null, string? userId = null, bool useMemoryMode = false);
     Task PublishAsync(string topicName, object @event, Guid? trackingId = null, string? userId = null, bool useMemoryMode = false);
     ```
   * Khi dispatch qua hàm này, nếu object truyền vào không implement `IBaseMessage`, hệ thống sẽ tự động chuyển đổi qua `System.Text.Json.Nodes.JsonObject` để tiêm các thuộc tính theo dõi (`trackingId`, `timestamp`, `userId`) vào JSON trước khi đẩy lên Redis.
   * Worker ở module nhận (đã đăng ký Handler cho kiểu dữ liệu gốc của nó) sẽ tự động deserialize JSON nhận được về class Handler cục bộ của nó trơn tru nhờ tính chất tương thích cấu trúc JSON (Duck Typing), không cần bất kỳ project reference nào sang module gửi.

3. **Hỗ trợ Shared Contracts (Nếu muốn):**
   * Nếu dự án chọn cách tạo một project Contracts dùng chung chứa các POCO DTOs của Command/Event, các phương thức generic cũ (`SendAsync<TCommand>` và `PublishAsync<TEvent>`) vẫn hoạt động bình thường bằng cách tự động lấy `Type.Name` làm Queue/Topic Name mặc định và ủy quyền lời gọi xuống hàm phi generic.

---

## 5. Kịch bản Truy vấn & Tra cứu Đáp ứng Nghiệp vụ

Cấu trúc DB append-only kết hợp liên kết Subscriber cho phép giải quyết triệt để 100% các câu hỏi kiểm toán nghiệp vụ:

### 5.1. Gom nhóm & Tra cứu theo Queue / Topic làm gốc
*   **Tìm các Handlers / Workers / Message Types đã từng hoạt động trên Queue / Topic:**
    ```sql
    SELECT DISTINCT "HandlerName", "WorkerId", "MessageType" 
    FROM cqrs_tracking_logs 
    WHERE "QueueOrTopicName" = 'face-detection-queue';
    ```
*   **Chỉ ra danh sách các Subscriber (với queue tương ứng) thuộc về một Topic cụ thể:**
    ```sql
    SELECT DISTINCT "SubscriberName", "DestinationQueueName"
    FROM cqrs_tracking_logs
    WHERE "QueueOrTopicName" = 'Core.Infra.NhanDienKhuonMat.Models.FaceDetectionSessionSavedEvent'
      AND "SubscriberName" IS NOT NULL;
    ```

### 5.2. Gom nhóm & Vẽ sơ đồ quan hệ của 1 Tracking ID làm gốc
*   **Truy vết toàn bộ vòng đời và sự biến đổi của yêu cầu gốc:**
    ```sql
    SELECT "Id", "Step", "Status", "QueueOrTopicName", "SubscriberName", "DestinationQueueName", "SourceComponent", "MessageType", "HandlerName", "MessageData", "ErrorMessage", "CreatedAt"
    FROM cqrs_tracking_logs
    WHERE "TrackingId" = 'df8f477c-1ef1-46cb-8ce9-10502f4fd272'
    ORDER BY "CreatedAt" ASC;
    ```
*   **Tìm điểm bắt đầu của chuỗi workflow (Start Point):**
    ```sql
    SELECT "QueueOrTopicName", "SourceComponent", "MessageType", "CreatedAt"
    FROM cqrs_tracking_logs
    WHERE "TrackingId" = 'df8f477c-1ef1-46cb-8ce9-10502f4fd272'
    ORDER BY "CreatedAt" ASC
    LIMIT 1;
    ```
*   **Tìm điểm kết thúc hiện tại của chuỗi workflow (End Point) để xem đã thành công hay lỗi:**
    ```sql
    SELECT "QueueOrTopicName", "DestinationQueueName", "HandlerName", "Status", "ErrorMessage", "CreatedAt"
    FROM cqrs_tracking_logs
    WHERE "TrackingId" = 'df8f477c-1ef1-46cb-8ce9-10502f4fd272'
    ORDER BY "CreatedAt" DESC
    LIMIT 1;
    ```

### 5.3. Thiết kế Tích hợp Giao diện (UI Integration Design) - Cập nhật 2026-05-25 11:11:11

Để đáp ứng tối đa các yêu cầu hiển thị và lọc dữ liệu trên CQRS Dashboard UI, cấu trúc lưu trữ và các APIs đã được điều chỉnh và đồng bộ chặt chẽ:

#### A. Phân hệ Hàng đợi & Chủ đề (Queues & Topics)
*   **Tổng quan hiệu năng**: Các số liệu thống kê thời gian thực (`pending`, `active`, `processed`, `error`) được truy xuất cực kỳ nhanh thông qua việc đọc trực tiếp độ dài Redis List hoặc Hash fields (`IMessageTracker.GetStatsAsync()`). Việc này tránh quét (scan) cơ sở dữ liệu PostgreSQL liên tục.
*   **Topic Subscribers**: Với mỗi Topic Name, API `GetQueues` tự động phân tích và trả về danh sách các subscriber con kèm theo hàng đợi vật lý tương ứng (`infra:sub:topicName:subscriberName`). Điều này giúp phân biệt rõ ràng các kênh nhận tin nhắn riêng biệt của từng subscriber từ 1 Topic gốc.

#### B. Phân hệ Theo dõi gần đây (Recent Tracing)
Để tối ưu hóa trải nghiệm truy vết lỗi và theo dõi luồng tin nhắn:
1.  **Hiện message gốc mới nhất lên trên**:
    *   Truy vấn tại `GET /api/cqrs/dashboard/tracking/recent` sẽ chỉ lấy các bản ghi có **`IsRoot = true`**.
    *   Kết quả được sắp xếp theo **`CreatedAt DESC`** để đưa các yêu cầu gốc mới nhất của người dùng lên đầu trang.
    *   API tự động kết hợp (join/subquery) với bản ghi có `Id` lớn nhất cùng `TrackingId` để lấy ra trạng thái hiện tại (`Status`: success/error/processing) và bước hiện tại (`Step`) của cả chuỗi xử lý. Trình bày thông tin payload gốc kèm trạng thái mới nhất cực kỳ trực quan.
2.  **Lịch sử xử lý từng bước theo thời gian tăng dần**:
    *   Khi người dùng click expand một dòng, giao diện FE sẽ kích hoạt lazy-load thông qua API `GET /api/cqrs/dashboard/tracking/{trackingId}`.
    *   API này truy vấn toàn bộ lịch sử các milestones của `TrackingId` đó từ PostgreSQL, sắp xếp nghiêm ngặt theo **`CreatedAt ASC, Id ASC`**.
    *   Việc sắp xếp theo `Id ASC` (Identity Auto-Increment) là chốt chặn đảm bảo thứ tự chronological tăng dần tuyệt đối, ngay cả khi các bước xử lý (ví dụ: `send` $\rightarrow$ `processing` $\rightarrow$ `done`) diễn ra trong cùng một mili giây.

#### C. Trạng thái Workers & Hoạt động cuối (Workers Status & Last Active) - Cập nhật Bổ sung 2026-05-25
*   **Workers Status & Metrics**: Trạng thái bật/tắt của các background worker được lấy trực tiếp từ `IDispatcher.GetWorkerStatus()`. Cho phép quản trị viên bấm nút Bật/Tắt worker trực tiếp từ UI thông qua lệnh gọi POST tương ứng. 
    Để nâng cao khả năng quản trị, hệ thống bổ sung **3 thẻ chỉ số tổng quát (Summary Cards)** mới hiển thị ở đầu trang Dashboard:
    - **Tổng số Worker đang chạy** (Running Workers): Tính từ danh sách worker có trạng thái `Running`.
    - **Tổng số Worker đã dừng** (Stopped Workers): Tính từ danh sách worker có trạng thái khác `Running`.
    - **Tổng số Worker đăng ký** (Total Workers): Tổng độ dài danh sách status của toàn bộ workers.
*   **Hoạt động cuối (Last Active)**: Thời điểm ghi nhận hoạt động cuối cùng của từng queue/topic/subscriber được ghi vào Redis với TTL. API `GetLastActivity` trả về danh sách này, sắp xếp theo thời gian hoạt động giảm dần (`LastActive DESC`) giúp nhanh chóng phát hiện các queue hay subscriber bị ngắt kết nối hoặc không phản hồi.

#### D. Thiết kế Fixed Action Columns trên bảng hiển thị
Để tối ưu hóa trải nghiệm người dùng (UX) khi thao tác với bảng dữ liệu có nhiều cột:
- **Theo dõi gần đây (Recent Tracing)** và **Trạng thái Workers (Workers Status)** sẽ được thiết lập cơ chế **Fixed Action Column** (cột Hành động được cố định nổi ở cạnh phải của bảng khi cuộn ngang).
- Cột `Hành động` được định nghĩa `{ title: 'Hành động', key: 'action', width: '120px', right: true }`.
- Thiết lập thuộc tính `[scroll]="{ x: '1300px' }"` trên `tot-table` của tab Tracking và `[scroll]="{ x: '1000px' }"` trên tab Workers để kích hoạt thanh cuộn ngang độc lập của bảng, giúp cố định (freeze) cột hành động nằm bên phải cực kỳ trơn tru và nhất quán như tab Hàng đợi & Chủ đề.

#### E. Phân tách Trạng thái Tin nhắn giữa các Subscriber (Subscriber Status Isolation) - Cập nhật 2026-05-26
Khi truy vấn danh sách thông điệp lịch sử của một Queue, Topic hoặc Subscriber cụ thể thông qua API `GET /api/cqrs/dashboard/messages/{queueName}`, trạng thái cuối cùng (`finalState`) của một `TrackingId` phải được cô lập theo đúng phạm vi của thành phần đang hiển thị để tránh hiện tượng nhiễm trạng thái chéo (ví dụ: một Event Handler lỗi làm ảnh hưởng hiển thị của Event Handler thành công khác có chung `TrackingId`):
1. **Đối với Subscriber Queue** (tên bắt đầu bằng `sub_queue:`): Chỉ lọc các bản ghi nhật ký thuộc về subscriber cụ thể đó (`QueueOrTopicName == queueName || DestinationQueueName == queueName`).
2. **Đối với Topic**: Lọc toàn bộ các bản ghi nhật ký của chính Topic đó và các Subscriber Queue thuộc về Topic đó.
3. **Đối với Command Queue**: Chỉ lọc các bản ghi nhật ký thuộc về Command Queue đó.

---

## 6. Kế hoạch xác minh (Verification Plan)

1.  **Kiểm tra Biên dịch (Compilation)**:
    Chạy lệnh build toàn bộ solution để đảm bảo không phát sinh lỗi cú pháp hay thiếu thư viện:
    ```bash
    dotnet build Core.Infra.sln
    ```
2.  **Kiểm tra Khởi chạy và Tạo Bảng tự động (EnsureCreated)**:
    Khi chạy `run-dev.sh`, quan sát log xem bảng `cqrs_tracking_logs` đã được Entity Framework tự động sinh ra trong database PostgreSQL thành công hay chưa.
3.  **Kiểm tra tích hợp thực tế**:
    Kích hoạt upload file từ UI Angular để gửi yêu cầu xử lý, sau đó vào Postgres để xác thực:
    - Bản ghi gốc đầu tiên có `IsRoot = true`.
    - Các bản ghi processing, success/error có đầy đủ tên Handler (kèm namespace), tên Worker, dữ liệu JSON và `TrackingId` giữ nguyên xuyên suốt.
    - Với luồng Event Pub/Sub, các bản ghi chỉ ra rõ `SubscriberName` và `DestinationQueueName` khớp với Topic tương ứng.
