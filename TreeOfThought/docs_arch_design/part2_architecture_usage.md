# 🚀 PART 2: ARCHITECTURE USAGE — Hướng Dẫn Thực Hành Cho Junior Developer

> **Dành cho**: Junior Developers muốn bắt đầu đóng góp code  
> **Mục tiêu**: Biết **LÀM THẾ NÀO** — đặt tay vào bàn phím và code ngay hôm nay  
> **Cam kết**: Sau phần này bạn sẽ thêm được feature mới mà không sợ phá vỡ kiến trúc 💪

---

## 1. 🗺️ Codebase Navigation — Đi Đâu Khi Cần Gì

### 1.1. Sơ Đồ Folder Toàn Hệ Thống

```
TreeOfThought/
├── backend/                         ← Toàn bộ code BE (.NET 8)
│   ├── Core.Infra.Base/             ← Interfaces & Models dùng chung (đọc nhưng ÍT SỬA)
│   ├── Core.Infra.Auth/             ← Logic JWT & AppAuthorize (đọc nhưng ÍT SỬA)
│   ├── Core.Infra.Cqrs/             ← CQRS engine (đọc nhưng ÍT SỬA)
│   │   ├── Dispatchers/CqrsDispatcher.cs  ← Trái tim của hệ thống
│   │   ├── Services/CqrsDbLogger.cs       ← Ghi log vào PostgreSQL
│   │   ├── Services/CqrsAutoRegistrationService.cs ← Auto-register handlers
│   │   └── Extensions/CqrsExtensions.cs  ← DI registration
│   ├── Core.Infra.Data/             ← BaseDbContext (đọc nhưng ÍT SỬA)
│   ├── Core.Infra.Firebase/         ← Firebase services (đọc nhưng ÍT SỬA)
│   ├── Core.Infra.Session/          ← Session management (đọc nhưng ÍT SỬA)
│   ├── Core.Infra.Redis/            ← Redis services (đọc nhưng ÍT SỬA)
│   │
│   ├── Core.Infra.Oidc/             ← Nghiệp vụ SSO/OIDC (code theo chuẩn)
│   ├── Core.Infra.FilesFolders/     ← Nghiệp vụ Files (code theo chuẩn)
│   ├── nhan-dien-khuon-mat/         ← Nghiệp vụ AI (code theo chuẩn)
│   ├── Core.Infra.Contracts/        ← Shared Event/Command contracts
│   │
│   ├── Core.Web.Api/                ← App Shell (chỉ đăng ký modules vào đây)
│   │   ├── Program.cs               ← ĐIỂM ĐẦU VÀO — đăng ký services
│   │   ├── appsettings.json         ← Cấu hình connection strings
│   │   └── Services/AppRedisService.cs
│   │
│   └── docker-compose.yaml          ← Khởi động infrastructure local
│
├── frontend/web/                    ← Toàn bộ code FE (Angular 17+)
│   ├── src/app/                     ← App Shell (routing, layout)
│   └── projects/tot/
│       ├── core/                    ← @tot/core (ÍT SỬA)
│       ├── shared/                  ← @tot/shared (ÍT SỬA)
│       └── {ten-nghiep-vu}/         ← Module nghiệp vụ của bạn
│
└── docs_arch_design/                ← Tài liệu bạn đang đọc
```

### 1.2. "Tôi Muốn... Tôi Nên Đến Đâu?"

| Khi bạn muốn... | Hãy đến folder/file... |
|----------------|----------------------|
| Thêm API endpoint mới | `backend/{ten-nghiep-vu}/Controllers/` |
| Thêm nghiệp vụ xử lý bất đồng bộ | `backend/{ten-nghiep-vu}/Handlers/` |
| Thay đổi/thêm bảng DB | `backend/{ten-nghiep-vu}/Contexts/` |
| Thêm model/DTO | `backend/{ten-nghiep-vu}/Models/` |
| Thêm trang UI mới | `frontend/web/projects/tot/{ten-nghiep-vu}/` |
| Thêm component dùng chung | `frontend/web/projects/tot/shared/` (prefix **tot-**) |
| Xem cấu hình database | `backend/Core.Web.Api/appsettings.json` |
| Khởi động local infra | `backend/docker-compose.yaml` |
| Đăng ký module mới vào hệ thống | `backend/Core.Web.Api/Program.cs` |

---

## 2. 📋 Standard Workflow (Step-by-Step) — Quy Trình 4 Bước Bắt Buộc

> **⚠️ Quan trọng**: Mọi tính năng mới đều phải đi qua đúng 4 bước này. Không được nhảy cóc!

```
Bước 1: Đọc & Phân Tích (whattodo.md)
    ↓
Bước 2: Thiết Kế & Viết Kế Hoạch (howtodo.md)
    ↓
Bước 3: Lấy Phê Duyệt (đợi người review howtodo.md)
    ↓
Bước 4: Viết Code & Kiểm Thử
```

---

## 3. 🏗️ Hướng Dẫn Thêm Nghiệp Vụ Mới — Ví Dụ Đầy Đủ

Giả sử bạn cần tạo nghiệp vụ **"Quản lý công việc nội bộ"** (`quan-ly-cong-viec`).

### Bước A: Tạo Cấu Trúc Folder

```bash
# Backend: tạo project mới
mkdir -p TreeOfThought/backend/quan-ly-cong-viec/{Controllers,Handlers,Models,Contexts,Services,Extensions}

# Frontend: tạo Angular library
cd TreeOfThought/frontend/web
ng generate library quan-ly-cong-viec --prefix=tot

# Docs
mkdir -p TreeOfThought/docs/quan-ly-cong-viec
```

### Bước B: Tạo Model & Command

```csharp
// backend/quan-ly-cong-viec/Models/TaskModels.cs
using Core.Infra.Base.Models;

namespace QuanLyCongViec.Models;

// --- DB Entity ---
public class CongViec : BaseEntity
{
    public string TieuDe { get; set; } = string.Empty;
    public string MoTa { get; set; } = string.Empty;
    public string NguoiThucHien { get; set; } = string.Empty;
    public string TrangThai { get; set; } = "chua_bat_dau";
    public DateTime HanChot { get; set; }
}

// --- Command (Yêu cầu tạo công việc) ---
public class TaoCongViecCommand : BaseMessage, IBaseCommand
{
    // QueueName: tên ngắn gọn để routing (KHÔNG dùng FullName)
    public string QueueName => "TaoCongViecCommand";

    public string TieuDe { get; set; } = string.Empty;
    public string MoTa { get; set; } = string.Empty;
    public string NguoiThucHien { get; set; } = string.Empty;
    public DateTime HanChot { get; set; }
}

// --- Event (Thông báo đã tạo thành công) ---
public class CongViecDaTaoEvent : BaseMessage, IBaseEvent
{
    public string TopicName => "CongViecDaTaoEvent";

    public Guid CongViecId { get; set; }
    public string TieuDe { get; set; } = string.Empty;
}
```

### Bước C: Tạo DbContext

```csharp
// backend/quan-ly-cong-viec/Contexts/CongViecDbContext.cs
using Core.Infra.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using QuanLyCongViec.Models;

namespace QuanLyCongViec.Contexts;

public class CongViecDbContext : BaseDbContext
{
    // Kế thừa BaseDbContext — đã có sẵn EF Core setup
    public CongViecDbContext(string connectionString, DbProviderType provider)
        : base(connectionString, provider) { }

    public DbSet<CongViec> CongViecs { get; set; }
}
```

### Bước D: Tạo Handler (Logic Nghiệp Vụ)

```csharp
// backend/quan-ly-cong-viec/Handlers/TaoCongViecCommandHandler.cs
using Core.Infra.Base.Interfaces;
using Core.Infra.Firebase.Services;
using QuanLyCongViec.Contexts;
using QuanLyCongViec.Models;

namespace QuanLyCongViec.Handlers;

public class TaoCongViecCommandHandler : ICommandHandler<TaoCongViecCommand>
{
    private readonly CongViecDbContext _db;
    private readonly FirebaseService _firebase;
    private readonly IDispatcher _dispatcher;

    public TaoCongViecCommandHandler(
        CongViecDbContext db,
        FirebaseService firebase,
        IDispatcher dispatcher)
    {
        _db = db;
        _firebase = firebase;
        _dispatcher = dispatcher;
    }

    public async Task HandleAsync(TaoCongViecCommand command)
    {
        // 1. Thực hiện nghiệp vụ
        var congViec = new CongViec
        {
            Id = Guid.NewGuid(),
            TieuDe = command.TieuDe,
            MoTa = command.MoTa,
            NguoiThucHien = command.NguoiThucHien,
            HanChot = command.HanChot,
            TrangThai = "chua_bat_dau"
        };

        _db.CongViecs.Add(congViec);
        await _db.SaveChangesAsync();

        // 2. Publish event cho các module khác lắng nghe (nếu cần)
        await _dispatcher.PublishAsync(new CongViecDaTaoEvent
        {
            CongViecId = congViec.Id,
            TieuDe = congViec.TieuDe
        });

        // 3. Notify về FE qua Firestore (theo hằng số bắt buộc)
        // Path: commandresults/{trackingId}
        await _firebase.SetDocumentAsync(
            collection: "commandresults",
            documentId: command.TrackingId.ToString(),
            data: new { success = true, congViecId = congViec.Id }
        );
    }
}
```

### Bước E: Tạo Controller (REST API)

```csharp
// backend/quan-ly-cong-viec/Controllers/CongViecController.cs
using Core.Infra.Auth.Attributes;
using Core.Infra.Base.Interfaces;
using Microsoft.AspNetCore.Mvc;
using QuanLyCongViec.Contexts;
using QuanLyCongViec.Models;

namespace QuanLyCongViec.Controllers;

[ApiController]
[Route("api/cong-viec")]
public class CongViecController : ControllerBase
{
    private readonly IDispatcher _dispatcher;
    private readonly CongViecDbContext _db;

    public CongViecController(IDispatcher dispatcher, CongViecDbContext db)
    {
        _dispatcher = dispatcher;
        _db = db;
    }

    // --- Query: Lấy danh sách (đồng bộ) ---
    [HttpGet]
    [AppAuthorize("cong-viec.read")] // ← LUÔN khai báo quyền rõ ràng
    public async Task<IActionResult> DanhSach(
        [FromQuery] int pageIndex = 1,
        [FromQuery] int pageSize = 10) // ← LUÔN có paging
    {
        var query = _db.CongViecs.OrderByDescending(x => x.CreatedAt);
        var total = await query.CountAsync();
        var items = await query
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        // ← LUÔN trả về { items, total }
        return Ok(new { items, total });
    }

    // --- Command: Tạo mới (bất đồng bộ) ---
    [HttpPost]
    [AppAuthorize("cong-viec.write")]
    public async Task<IActionResult> TaoMoi([FromBody] TaoCongViecCommand command)
    {
        // Nếu FE không gửi trackingId, server tự tạo
        if (command.TrackingId == Guid.Empty)
            command.TrackingId = Guid.NewGuid();

        // Đẩy vào queue, trả về ngay mà không đợi xử lý xong
        await _dispatcher.SendAsync(command);

        return Ok(new { trackingId = command.TrackingId });
    }
}
```

### Bước F: Tạo Extension & Đăng Ký

```csharp
// backend/quan-ly-cong-viec/Extensions/CongViecExtensions.cs
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using QuanLyCongViec.Contexts;
using QuanLyCongViec.Controllers;

namespace QuanLyCongViec.Extensions;

public static class CongViecExtensions
{
    // Đăng ký Services
    public static IServiceCollection AddCongViec(
        this IServiceCollection services,
        IConfiguration config)
    {
        var connStr = config["CongViec:Postgresql"]!; // ← pattern bắt buộc
        services.AddScoped<CongViecDbContext>(_ =>
            new CongViecDbContext(connStr, Core.Infra.Data.Contexts.BaseDbContext.DbProviderType.PostgreSql));
        return services;
    }

    // Đăng ký Controllers
    public static IMvcBuilder AddCongViecControllers(this IMvcBuilder builder)
    {
        builder.AddApplicationPart(typeof(CongViecController).Assembly);
        return builder;
    }

    // Khởi tạo DB khi startup
    public static async Task UseCongViec(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<CongViecDbContext>();
        await db.EnsureTablesCreatedAsync(); // ← tự động tạo bảng nếu chưa có
    }
}
```

### Bước G: Thêm vào `appsettings.json` và `Program.cs`

```json
// appsettings.json — thêm connection string theo pattern
{
  "CongViec": {
    "Postgresql": "Host=localhost;Port=54321;Database=tot_cong_viec_db;Username=root;Password=Test123456"
  }
}
```

```csharp
// Program.cs — chỉ thêm 3 dòng:
builder.Services.AddCongViec(config);                          // Services

builder.Services.AddControllers()
    .AddCongViecControllers()                                  // Controllers
    /* ... */

await app.UseCongViec();                                       // DB init
```

---

## 4. ⚖️ Architectural Rules & Guardrails — Luật & Rào Chắn

### ✅ BẮT BUỘC Phải Làm

| Quy tắc | Lý do |
|---------|-------|
| **Mỗi nghiệp vụ là 1 project riêng** | Tránh coupling, scale độc lập |
| **DbContext riêng cho mỗi nghiệp vụ** | Cô lập dữ liệu hoàn toàn |
| **Connection string theo pattern `{TenNghiepVu}:Postgresql`** | Nhất quán cấu hình |
| **Luôn khai báo `[AppAuthorize]` trên controller** | Bảo mật nhất quán |
| **Mọi API list phải có paging `pageIndex + pageSize`** | Bảo vệ hiệu năng |
| **Response list phải có `{ items, total }`** | FE cần `total` để hiển thị pagination |
| **Firestore path dùng hằng số `commandresults/{trackingId}`** | Tránh lãng phí tài nguyên |
| **FE xóa Firestore doc sau khi nhận notify** | Tránh rác, tốn tiền |
| **Commands và Events phải có `TrackingId`** | Truy vết toàn bộ vòng đời |
| **Tên command handler field `QueueName` dùng `Type.Name`** | Decoupling, tránh namespace conflict |

### ❌ TUYỆT ĐỐI KHÔNG Làm

| Điều cấm | Hậu quả |
|----------|---------|
| **Add Reference trực tiếp giữa các business module** | Circular dependency, không scale được |
| **Gọi code của module khác trực tiếp** | Phá vỡ cô lập module |
| **Hardcode connection string trong code** | Security risk, khó deploy |
| **Xóa hoặc sửa Core Infra projects** mà không review kỹ | Phá vỡ toàn hệ thống |
| **Tạo Firestore path tùy tiện** | Tốn tiền GCP, khó debug |
| **Bỏ qua paging** trong API trả về danh sách | Full table scan, crash production |
| **Import trực tiếp giữa các FE business modules** | Circular dependency Angular |
| **Sửa DbContext của module khác** | Vi phạm cô lập dữ liệu |

---

## 5. 🔧 Error Handling & Logging — Xử Lý Lỗi Và Ghi Log

### 5.1. CQRS Automatic Tracking (Tự Động)

Hệ thống **tự động** ghi log mọi bước xử lý vào `cqrs_tracking_logs`:

```
Khi Controller gọi SendAsync():
  → Ghi: step="send", status="success"|"error"

Khi Worker dequeue:
  → Ghi: step="dequeue", status="success"

Khi Handler hoàn thành:
  → Ghi: step="done", status="success"|"error", elapsedMs=...
  → Nếu lỗi: errorMessage = exception.ToString()
```

Bạn **không cần** tự viết log tracking cho CQRS — framework tự làm.

### 5.2. Business Logic Error Handling

```csharp
public async Task HandleAsync(TaoCongViecCommand command)
{
    try
    {
        // ... logic nghiệp vụ ...
    }
    catch (Exception ex)
    {
        // Ghi log thông thường
        _logger.LogError(ex, "Lỗi khi tạo công việc. TrackingId: {TrackingId}", 
            command.TrackingId);

        // Thông báo lỗi về FE qua Firestore
        await _firebase.SetDocumentAsync(
            collection: "commandresults",
            documentId: command.TrackingId.ToString(),
            data: new { success = false, error = ex.Message }
        );

        throw; // Re-throw để CQRS framework ghi status="error" vào DB
    }
}
```

### 5.3. Controller Error Handling

```csharp
// Sử dụng IActionResult với status code phù hợp
return Ok(data);                              // 200
return BadRequest(new { error = "..." });     // 400
return NotFound(new { error = "..." });       // 404
return StatusCode(500, new { error = "..." }); // 500

// KHÔNG throw exception từ controller — chỉ return IActionResult
```

### 5.4. Xem Log Thực Tế

```bash
# Xem CQRS tracking logs trong PostgreSQL
SELECT "Id", "TrackingId", "Step", "Status", "QueueOrTopicName", 
       "HandlerName", "ElapsedMilliseconds", "ErrorMessage", "CreatedAt"
FROM cqrs_tracking_logs
ORDER BY "CreatedAt" DESC
LIMIT 50;

# Xem log lỗi của một TrackingId cụ thể
SELECT * FROM cqrs_tracking_logs
WHERE "TrackingId" = 'your-tracking-id-here'
ORDER BY "Id" ASC;
```

---

## 6. 🧪 Testing & Validation

### 6.1. Chạy Local Development

```bash
# Bước 1: Khởi động infrastructure (PostgreSQL + Redis)
cd TreeOfThought/backend
docker-compose up -d redis postgres

# Bước 2: Chạy Backend
cd Core.Web.Api
./run-dev.sh
# Hoặc: dotnet run --urls="http://0.0.0.0:5000"

# Bước 3: Truy cập Swagger để test API
# http://localhost:5000/swagger
```

### 6.2. Build Toàn Solution

```bash
cd TreeOfThought/backend
dotnet build Core.Infra.sln
```

### 6.3. Test Manual Bằng Curl/Swagger

```bash
# Login để lấy JWT
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# Gọi API với JWT (thay <TOKEN> bằng token vừa lấy)
curl http://localhost:5000/api/cong-viec \
  -H "Authorization: Bearer <TOKEN>"
```

### 6.4. Validate CQRS Đang Hoạt Động

```bash
# Xem CQRS Dashboard
# http://localhost:5000/admin/modules/cqrs-dashboard

# Check tracking logs trong DB
psql -h localhost -p 54321 -U root -d tot_cqrs_db
SELECT * FROM cqrs_tracking_logs ORDER BY "Id" DESC LIMIT 20;
```

### 6.5. Debug Firestore Realtime

Khi test tính năng bất đồng bộ:
1. Mở browser Developer Tools → Network
2. Gọi API POST → nhận `trackingId`
3. Mở Firestore Console → kiểm tra document `commandresults/{trackingId}`
4. Document phải được tạo ra sau khi Handler xử lý xong
5. FE phải xóa document ngay sau khi nhận (kiểm tra trong Firestore Console)

---

## 7. 🚩 Checklist Trước Khi Submit Code

Trước khi tạo Pull Request, hãy tự kiểm tra:

- [ ] `dotnet build Core.Infra.sln` không có lỗi
- [ ] Controller có `[AppAuthorize]` với claims rõ ràng
- [ ] API danh sách có paging (`pageIndex`, `pageSize`) và trả về `{ items, total }`
- [ ] Connection string được đặt trong `appsettings.json` theo pattern `{TenNghiepVu}:Postgresql`
- [ ] Extension method đã được thêm vào `Program.cs` (services + controllers + usage)
- [ ] Command/Event có `QueueName`/`TopicName` dùng `Type.Name` (tên ngắn, không phải FullName)
- [ ] Không add reference trực tiếp sang business module khác
- [ ] Firestore notify dùng đúng hằng số `commandresults/{trackingId}`
- [ ] Handler có try/catch và notify lỗi về FE khi có exception
- [ ] DB table được tạo qua `EnsureTablesCreatedAsync()` trong extension

---

## 8. 🎓 Ví Dụ Thực Tế: Đọc Code Module Có Sẵn

Để học cách viết code đúng chuẩn, hãy đọc module **`Core.Infra.FilesFolders`** — đây là ví dụ mẫu chuẩn nhất:

```
TreeOfThought/backend/Core.Infra.FilesFolders/
├── Contexts/           ← FilesFoldersDbContext kế thừa BaseDbContext
├── Controllers/        ← Controller với [AppAuthorize] + paging chuẩn
├── Handlers/           ← Command/Event Handlers gọi Firebase + Dispatcher
├── Models/             ← Entities + Commands + Events
├── Services/           ← Business logic phụ
└── Extensions/         ← DI registration + AddControllers() + UseFilesFolders()
```

**Và module CQRS mẫu** `Core.Infra.BusinessTest` — để xem cách viết SampleCommand và SampleEventHandler đơn giản nhất.

---

## 9. 🗣️ Quy Trình Phát Triển Agile Với AI IDE

> **Triết lý cốt lõi**: `whattodo.md` + (ảnh thiết kế nếu có) → AI chạy lần đầu đạt ~80% → Developer bổ sung liên tục → Hoàn thiện dần theo vòng lặp Agile.

Dự án này được thiết kế để **làm việc hiệu quả với AI coding assistants** (Cursor, Windsurf, Antigravity IDE...):

### 9.1. Vòng Lặp Agile AI-Driven — First Run đạt ~80%

```
┌─────────────────────────────────────────────────────────────────────┐
│             QUY TRÌNH AGILE VỚI AI IDE (Lặp liên tục)              │
│                                                                     │
│  [Developer]                        [AI IDE]                        │
│                                                                     │
│  1. Viết docs/{nghiep-vu}/          →  Đọc whattodo.md             │
│     whattodo.md                        (+ ảnh thiết kế nếu có)     │
│     (mô tả yêu cầu, SRS,              Viết kế hoạch vào            │
│      ảnh mockup UI...)                 howtodo.md                  │
│                                                                     │
│  2. Review howtodo.md               ←  Xuất howtodo.md để review   │
│     ✅ Đồng ý → "tiến hành code"                                   │
│     ❌ Chưa ưng → cập nhật whattodo                                │
│                                                                     │
│  3. AI code lần đầu tiên            →  Tạo BE + FE + DB            │
│     → Chạy được, đạt ~80%              theo đúng kiến trúc         │
│       chức năng yêu cầu               TreeOfThought                │
│                                                                     │
│  4. Developer dùng thử              ←  App đang chạy               │
│     Phát hiện thiếu/cần sửa                                        │
│                                                                     │
│  5. Cập nhật tiếp whattodo.md       →  AI đọc update mới           │
│     (thêm yêu cầu chi tiết,            Code tiếp, hoàn thiện       │
│      edge cases, UI tweaks...)                                      │
│                                                                     │
│  ↺  Lặp lại từ bước 4 → 5 → 4 → 5... cho đến khi đạt 100%        │
└─────────────────────────────────────────────────────────────────────┘
```

**Tại sao ~80% ngay lần đầu?**
- `whattodo.md` cung cấp đủ context về nghiệp vụ
- Ảnh thiết kế UI (nếu có) giúp AI "nhìn thấy" layout mong muốn
- Kiến trúc TreeOfThought đã chuẩn hóa sẵn — AI chỉ cần điền vào template đúng chuẩn
- 20% còn lại thường là: edge cases nghiệp vụ đặc thù, UX tweaks, performance tuning

### 9.2. Hướng Dẫn Viết `whattodo.md` Hiệu Quả

Càng nhiều thông tin chi tiết, AI càng làm chính xác hơn:

```markdown
# docs/ten-nghiep-vu/whattodo.md

## Mục tiêu
Mô tả ngắn gọn nghiệp vụ này làm gì

## Các màn hình / UI
- Màn hình danh sách: có filter theo [x], sort theo [y], paging
- Màn hình tạo mới: form với các trường [a, b, c...]
- [Đính kèm ảnh mockup nếu có]

## Nghiệp vụ chi tiết
- Khi user click "Tạo mới" → POST /api/... → xử lý bất đồng bộ
- Quy tắc validation: trường X bắt buộc, Y phải > 0
- Sau khi tạo xong → notify FE qua Firestore → reload danh sách

## Phân quyền
- Xem danh sách: claim "ten-nghiep-vu.read"
- Tạo/Sửa: claim "ten-nghiep-vu.write"
- Xóa: claim "ten-nghiep-vu.delete" + chỉ Admin

## Cấu trúc DB dự kiến (nếu biết)
- Bảng: ten_bang (id, ten, mo_ta, ...)

## Cập nhật 2026-XX-XX (vòng lặp tiếp theo)
- Cần thêm tính năng: export Excel
- Cần sửa: validation trường Y phải unique
```

### 9.3. Tips Cung Cấp Ảnh Thiết Kế Cho AI

Khi có ảnh mockup/wireframe/screenshot:
1. Đặt ảnh vào `docs/{ten-nghiep-vu}/images/` hoặc đính kèm trực tiếp khi chat
2. Mô tả ngắn trong `whattodo.md`: `[Xem ảnh: images/main-screen.png]`
3. AI sẽ đọc ảnh và tạo UI layout gần nhất với design của bạn

### 9.4. Vòng Lặp Cải Thiện Liên Tục (Continuous Iteration)

```
SPRINT 1: whattodo.md ban đầu → AI code → 80% xong
    ↓
SPRINT 2: Developer cập nhật whattodo.md (thêm yêu cầu mới)
          → AI đọc update → code tiếp phần còn thiếu
    ↓  
SPRINT 3: Phát hiện bug / edge case → ghi vào whattodo.md
          → AI fix và kiểm tra
    ↓
SPRINT N: Tính năng hoàn chỉnh 100%
```

**Lợi ích của mô hình này:**
- **Không cần spec hoàn hảo ngay từ đầu** — viết `whattodo.md` khi biết gì viết nấy
- **Developer kiểm soát hoàn toàn** — review `howtodo.md` trước khi AI code
- **AI không "sáng tạo" tự do** — bị ràng buộc bởi kiến trúc TreeOfThought đã định nghĩa
- **Traceability đầy đủ** — lịch sử cập nhật `whattodo.md` = lịch sử phát triển tính năng

### 9.5. Khi Cần Fix Bug

```
"Sửa lỗi [mô tả lỗi] ở nghiệp vụ [tên module],
log error ở đây: [paste log error]"
```

AI sẽ tự đọc `docs/{module}/whattodo.md` và `howtodo.md` để hiểu context trước khi sửa.

### 9.6. Giữ `whattodo.md` Làm "Nguồn Sự Thật Duy Nhất"

> **Quy tắc vàng**: Mọi thay đổi yêu cầu nghiệp vụ, cập nhật spec, bug được phát hiện, UX feedback từ user **đều phải được ghi vào `whattodo.md`** trước khi yêu cầu AI thực hiện.

```
whattodo.md = Lịch sử sống của nghiệp vụ
howtodo.md  = Kế hoạch kỹ thuật AI viết để bạn review
```

---

## 10. 🎛️ `howtodev/` — Bộ Kiểm Soát Chất Lượng AI IDE

> **Mục tiêu**: Đảm bảo AI IDE làm đúng, làm đều, và Developer kiểm soát hoàn toàn mọi output của AI trước khi code được tạo ra.

Folder `TreeOfThought/howtodev/` là **bộ điều phối trung tâm** định nghĩa vai trò, quy tắc hành động và quy trình làm việc của AI IDE trong toàn bộ solution.

### 10.1. Cấu Trúc Folder `howtodev/`

```
TreeOfThought/howtodev/
├── whattodo.md     ← Yêu cầu về skill tot-dev: vai trò AI, quy trình, quy tắc đặt tên
├── howtodo.md      ← Giải pháp triển khai skill: cấu hình IDE rules, nội dung tot-dev
└── qa/             ← Hỏi & Đáp chuyên sâu về DDD, Event Sourcing, CQRS...
    ├── whattodo.md ← Câu hỏi từ developer
    └── thinking.md ← Phân tích chi tiết của AI
```

### 10.2. Skill `tot-dev` — Bộ Não AI IDE

Skill `tot-dev` là tập hợp quy tắc và vai trò được nạp vào AI IDE mỗi khi làm việc với dự án TreeOfThought. Nó được triển khai qua file trung tâm `.agent/tot-dev.md` và được kích hoạt tự động qua các file rules ở thư mục gốc:

| File | IDE Tương Ứng |
|------|---------------|
| `.clinerules` | Cline / VS Code |
| `.cursorrules` | Cursor IDE |
| `.geminirules` | Google Gemini Code Assist / Antigravity IDE |
| `.windsurfrules` | Windsurf IDE |

Mỗi file rules đều yêu cầu AI **bắt buộc đọc `.agent/tot-dev.md`** trước khi thực hiện bất kỳ tác vụ nào:

```markdown
# System Instructions for AI

You are an expert AI coding assistant. This project strictly follows the **tot-dev** methodology.

**CRITICAL REQUIREMENT:**
You MUST read and strictly adhere to the comprehensive guidelines in:
👉 `.agent/tot-dev.md`
```

### 10.3. Vai Trò AI Được Định Nghĩa Trong `tot-dev`

Khi làm việc với TreeOfThought, AI IDE đóng vai trò **đồng thời 3 chuyên gia**:

| Vai Trò | Trách Nhiệm |
|---------|-------------|
| **BA (Business Analyst)** | Đọc `whattodo.md`, hiểu yêu cầu, viết `howtodo.md` như tài liệu thiết kế hệ thống |
| **System Architect** | Đảm bảo tuân thủ kiến trúc Distributed, Modular Monolith, KISS, DRY, quy ước folder |
| **Full Stack Developer** | Triển khai code BE (.NET 8), FE (Angular), Database (PostgreSQL), Mobile (Flutter) |

### 10.4. Quy Trình Kiểm Soát Chất Lượng (Quality Gate)

```
Developer yêu cầu AI làm tính năng mới
    ↓
AI đọc docs/{ten-nghiep-vu}/whattodo.md
    ↓
AI viết kế hoạch chi tiết vào howtodo.md:
    - Thiết kế DB (bảng, trường, quan hệ)
    - Luồng dữ liệu (API endpoints, CQRS flow)
    - Cấu trúc code dự kiến (files sẽ tạo)
    ↓
⛔ DỪNG LẠI — Gửi howtodo.md cho Developer review
    ↓
Developer review howtodo.md:
    ✅ Đồng ý → "tiến hành code"
    ❌ Chưa đúng → Cập nhật whattodo.md → AI viết lại howtodo.md
    ↓
AI code theo đúng howtodo.md đã được phê duyệt
    ↓
AI chạy run-dev.sh, đọc console log, tự sửa lỗi nếu có
```

> **Tại sao cần Quality Gate này?** AI có thể làm sai nếu chỉ dựa vào suy luận mà không có spec. `howtodo.md` là "hợp đồng" giữa Developer và AI — khi Developer phê duyệt, cả hai đã thống nhất về cách làm.

### 10.5. Nguyên Tắc Bắt Buộc Của AI IDE

Dựa trên `howtodev/whattodo.md`, AI bắt buộc tuân thủ:

**✅ BẮT BUỘC:**
- **KISS** (Keep It Simple, Stupid) — Luôn chọn giải pháp đơn giản nhất có thể
- **DRY** (Don't Repeat Yourself) — Trong một file code không được lặp lại logic giống nhau
- Đọc `whattodo.md` trước, `howtodo.md` sau, code cuối cùng
- Nếu không rõ, không biết, không chắc → **hỏi người dùng**, không tự suy đoán
- Không được tự ý xóa hoặc ghi đè các folder Core Base

**❌ TUYỆT ĐỐI KHÔNG:**
- Code trước khi có `howtodo.md` được phê duyệt
- Làm mỗi lúc một khác với cùng yêu cầu (phải nhất quán với `howtodo.md`)
- Sửa hoặc xóa: `Core.Infra.*`, `@tot/core`, `@tot/shared`, `src/app/modules/auth`

### 10.6. Knowledge Base: `howtodev/qa/`

Folder `qa/` chứa các bài hỏi đáp chuyên sâu — nơi ghi lại các câu hỏi khó từ Developer và phân tích chi tiết từ AI:

- **DDD (Domain-Driven Design)** trong TreeOfThought
- **Event Sourcing** và khi nào cần dùng (so với CQRS hiện có)
- **Event Schema Evolution** — xử lý khi cấu trúc Event thay đổi
- **Performance Optimization** — Replay millions of events

> Khi gặp vấn đề kiến trúc phức tạp, hãy đặt câu hỏi vào `howtodev/qa/whattodo.md` để AI phân tích và lưu lại thành tài liệu tham khảo lâu dài.

---

*Tài liệu được tạo tự động từ codebase. Cập nhật lần cuối: 2026-07-02*
