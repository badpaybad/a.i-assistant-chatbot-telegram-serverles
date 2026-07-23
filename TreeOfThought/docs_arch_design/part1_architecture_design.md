# 🏛️ PART 1: ARCHITECTURE DESIGN — Thiết Kế Kiến Trúc Hệ Thống TreeOfThought

> **Dành cho**: Junior Developers mới tham gia dự án  
> **Mục tiêu**: Giúp bạn hiểu **TẠI SAO** hệ thống được xây dựng theo cách này và **CÁI GÌ** tồn tại trong hệ thống  
> **Phong cách đọc**: Hãy tưởng tượng bạn đang được Tech Lead ngồi cạnh giải thích từng bước 🧑‍🏫

---

## 1. 📌 High-Level Overview — Bức Tranh Toàn Cảnh

### 1.1. Hệ Thống Làm Gì?

**TreeOfThought** là một **nền tảng phần mềm doanh nghiệp đa chức năng** (Enterprise Platform) bao gồm:

- 🔐 **Hệ thống SSO (Single Sign-On / OIDC)** — Đăng nhập một lần cho tất cả ứng dụng trong hệ sinh thái
- 📁 **Quản lý File & Thư mục** — Upload, lưu trữ, chia sẻ file trên Google Cloud Storage
- 🤖 **Nhận diện khuôn mặt** (AI Face Detection) — Xử lý ảnh bằng AI
- 📊 **CQRS Dashboard** — Bảng điều khiển theo dõi toàn bộ luồng xử lý bất đồng bộ trong hệ thống

### 1.2. Kiến Trúc Lõi: Distributed, Modular Monolith + Clean Architecture

> **Tưởng tượng thế này**: Thay vì xây một tòa nhà khổng lồ không có tường ngăn (Monolith thuần), hệ thống chia thành các **căn hộ riêng biệt** (Modules) trong cùng một tòa nhà. Mỗi căn hộ có cửa riêng, nội thất riêng, không ai tự tiện vào nhà người khác. Nhưng tất cả vẫn dùng chung hệ thống điện, nước, thang máy (Core Infrastructure).

| Đặc điểm | Microservices | Monolith thuần | **Distributed, Modular Monolith (TreeOfThought)** |
|-----------|:---:|:---:|:---:|
| Deploy đơn giản | ❌ | ✅ | ✅ |
| Module độc lập | ✅ | ❌ | ✅ |
| Giao tiếp nội bộ | Network (chậm) | Direct Call | Message/Event (CQRS) |
| Phức tạp vận hành | Cao | Thấp | **Thấp** |

```
┌────────────────────────────────────────────────────────────────────┐
│                    TREEOF THOUGHT SYSTEM                           │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              FRONTEND ANGULAR WORKSPACE                      │  │
│  │  [App Shell] → lazy loads → [biz-oidc] [biz-files] [...]    │  │
│  │  [@tot/core] + [@tot/shared] — dùng chung mọi module         │  │
│  └───────────────────────────┬──────────────────────────────────┘  │
│                              │ RESTful API / JWT                   │
│  ┌───────────────────────────▼──────────────────────────────────┐  │
│  │           BACKEND Distributed, Modular Monolith (.NET 8)                  │  │
│  │  [Core.Web.Api] ← Entry Point                                │  │
│  │       ├── [Core.Infra.Auth]     ← Bảo mật, JWT, ACL          │  │
│  │       ├── [Core.Infra.Cqrs]     ← Event Bus, Queue           │  │
│  │       ├── [Core.Infra.Data]     ← Database abstraction       │  │
│  │       ├── [Core.Infra.Firebase] ← Realtime notify            │  │
│  │       ├── [Core.Infra.Session]  ← User session               │  │
│  │       ├── [Core.Infra.Oidc]     ← SSO Identity Server        │  │
│  │       ├── [Core.Infra.FilesFolders] ← Business module        │  │
│  │       └── [nhan-dien-khuon-mat] ← Business module            │  │
│  └───────────────────────────┬──────────────────────────────────┘  │
│                              │                                     │
│  ┌───────────────────────────▼──────────────────────────────────┐  │
│  │                   HẠ TẦNG DỊCH VỤ                           │  │
│  │  [PostgreSQL] [Redis] [Firebase Firestore] [Google Cloud GCS]│  │
│  └──────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

---

## 2. 🧩 System Components & Boundaries — Phân Tích Từng Thành Phần

### 2.1. Backend: Phân Lớp Rõ Ràng

#### 🔵 Tầng Hạ Tầng Lõi (Core Infrastructure Libraries)

Đây là **"bộ khung xương"** của hệ thống — không chứa logic nghiệp vụ, chỉ cung cấp các công cụ và quy tắc.

| Project | Trách Nhiệm | Ranh Giới |
|---------|-------------|-----------|
| `Core.Infra.Base` | Interface & Contract toàn hệ thống (`IDispatcher`, `IBaseCommand`, `IBaseEvent`, `ICacheService`...) | **Không phụ thuộc vào project nào** — đây là "hợp đồng" |
| `Core.Infra.Redis` | Wrap StackExchange.Redis: Cache, Queue (`LPUSH`/`RPOP`), PubSub | Chỉ dùng `Base` |
| `Core.Infra.Session` | Hybrid Session: JWT mỏng + Redis dày | Dùng `Redis` |
| `Core.Infra.Data` | `BaseDbContext` hỗ trợ PostgreSQL, MSSQL, MySQL, MongoDB | Dùng `EF Core` |
| `Core.Infra.Firebase` | FCM push notification, Firestore realtime, Google Cloud Storage | Dùng Firebase Admin SDK |
| `Core.Infra.Auth` | Sinh/kiểm tra JWT, attribute `[AppAuthorize]`, ACL Bitmask | Dùng `Session`, `Base` |
| `Core.Infra.Cqrs` | **Trung tâm điều phối**: Command Queue, Event PubSub, Tracking Log | Dùng tất cả các Infra |

#### 🟢 Tầng Nghiệp Vụ (Business Modules)

Mỗi nghiệp vụ là một **project riêng biệt hoàn toàn**:

| Module | Chức Năng | Database Riêng |
|--------|-----------|----------------|
| `Core.Infra.Oidc` | SSO Identity Server, quản lý User/Role/Permission | PostgreSQL (`tot_db`) |
| `Core.Infra.FilesFolders` | Quản lý file, thư mục, quyền truy cập | PostgreSQL (`tot_files_db`) |
| `nhan-dien-khuon-mat` | AI Face Detection, lưu session nhận diện | PostgreSQL (`tot_db`) |
| `Core.Infra.BusinessTest` | Module mẫu demo CQRS flow | N/A (demo) |
| `cqrs-dashboard` | Dashboard API theo dõi CQRS | Dùng chung CQRS DB |

#### 🟡 Tầng App Shell (Entry Point)

| Project | Vai Trò |
|---------|---------|
| `Core.Web.Api` | Điểm vào duy nhất — đăng ký tất cả modules, cấu hình pipeline, expose API |

### 2.2. Frontend: Cấu Trúc Angular Workspace

```
frontend/web/
├── src/app/                    ← App Shell chính (routing, layout, menu)
└── projects/tot/
    ├── core/                   ← @tot/core: Auth, Guards, HTTP Client, Firebase, MessageBus
    ├── shared/                 ← @tot/shared: tot-button, tot-table, tot-autocomplete...
    ├── business-auth/          ← Giao diện quản lý User/Role/Permission
    ├── business-files/         ← Giao diện Files & Folders
    ├── business-dashboard/     ← Giao diện CQRS Dashboard
    └── nhan-dien-khuon-mat/    ← Giao diện AI Face Detection
```

**Quy tắc vàng FE**: Các module nghiệp vụ **KHÔNG ĐƯỢC** import trực tiếp lẫn nhau. Giao tiếp bắt buộc qua:
- `MessageBusService` (event/command)
- `ComponentRegistryService` (hiển thị UI chéo module)

---

## 3. 🎯 Key Design Patterns — Các Mẫu Thiết Kế Cốt Lõi

### 3.1. CQRS (Command Query Responsibility Segregation)

> **Giải thích đơn giản**: Tách biệt việc **"ra lệnh thay đổi dữ liệu"** (Command) và **"hỏi thông tin"** (Query). Giống như trong quân đội — người ra lệnh và người báo cáo tình hình là hai kênh khác nhau.

**Tại sao dùng?**
- Xử lý bất đồng bộ: UI không phải chờ Server xử lý xong mới có phản hồi
- Mở rộng dễ dàng: Thêm Handler mới không ảnh hưởng code cũ
- Truy vết đầy đủ: Mọi command/event đều được log vào PostgreSQL

**Cách hoạt động trong hệ thống:**

```
[Controller] → SendAsync(CreateFolderCommand)
                    ↓ Redis Queue (LPUSH)
              [Worker dequeue] → ICommandHandler.HandleAsync()
                    ↓ Kết quả
              [Firebase Firestore] → push realtime về FE
```

### 3.2. Event-Driven Architecture (Pub/Sub)

> **Giải thích đơn giản**: Giống như đài radio — người phát sóng (publisher) không cần biết ai đang nghe. Người nghe (subscriber) đăng ký tần số họ quan tâm và tự xử lý khi nhận được tín hiệu.

**Ví dụ thực tế trong dự án:**

```
[FaceDetectionCommandHandler]
    → PublishAsync(FaceDetectionSessionSavedEvent) [Topic]
        ↓
        ├── [UiNotificationEventHandler]  → push Firestore về UI
        └── [AnotherBusinessHandler]      → xử lý nghiệp vụ khác
```

**Lý do chọn:** Các module nghiệp vụ có thể "lắng nghe" sự kiện của nhau mà không cần reference trực tiếp vào code của nhau → **Zero coupling**.

### 3.3. Repository Pattern qua BaseDbContext

Mỗi module có **DbContext riêng** kế thừa `BaseDbContext`, tự quản lý connection string của mình qua `appsettings.json`:

```json
{
  "FilesFolders": {
    "PostgreSql": "Host=localhost;Port=54321;Database=tot_files_db;..."
  },
  "NhanDienKhuonMat": {
    "Postgresql": "Host=localhost;Port=54321;Database=tot_db;..."
  },
  "Cqrs": {
    "Postgresql": "Host=localhost;Port=54321;Database=tot_cqrs_db;..."
  }
}
```

**Pattern key**: `{TenNghiepVu}:Postgresql` → đây là **quy ước bắt buộc**.

### 3.4. Dependency Injection (DI) + Extension Methods

Thay vì `Program.cs` phải biết chi tiết từng service, mỗi module tự đóng gói đăng ký vào extension method:

```csharp
// Program.cs - gọn gàng, không biết chi tiết bên trong
builder.Services.AddCqrs(config, ...assemblies);
builder.Services.AddFilesFolders(config);
builder.Services.AddNhanDienKhuonMat(config);

// Mỗi module tự định nghĩa extension của mình
// FilesFoldersExtensions.cs
public static IServiceCollection AddFilesFolders(this IServiceCollection services, ...) { ... }
```

### 3.5. Hybrid Authentication (JWT + Redis Session)

> **Vấn đề cần giải quyết**: Nếu nhét tất cả quyền (claims) vào JWT → Token quá nặng. Nếu không nhét gì → phải query DB mỗi request.

**Giải pháp Hybrid:**
- JWT chỉ chứa: `sub` (userId), `role` (danh sách vai trò), `kid` (key ID)
- Redis Session chứa: toàn bộ claims chi tiết theo userId
- `[AppAuthorize]` tự động kiểm tra JWT trước, sau đó tra cứu Redis Session

### 3.6. Singleton Dispatcher + Scoped Handler

```
IDispatcher (Singleton) ← Sống suốt vòng đời app
    ↓
ICommandHandler (Scoped) ← Tạo mới mỗi request để tránh memory leak
    ↓
DbContext (Scoped) ← Tạo mới, dispose sau khi xong
```

---

## 4. 🌊 Data & Message Flow — Luồng Dữ Liệu

### 4.1. Luồng Request Đồng Bộ (Query / Read)

```
[FE Browser]
    │ GET /api/files-folders/list?page=1
    ▼
[Core.Web.Api Controller]
    │ [AppAuthorize] kiểm tra JWT + Redis Session
    ▼
[FilesFoldersController]
    │ Query PostgreSQL qua FilesFoldersDbContext
    ▼
[Response: { items: [...], total: 100 }]
    ▼
[FE hiển thị bảng dữ liệu với tot-table]
```

### 4.2. Luồng Request Bất Đồng Bộ (Command / Write)

```
[FE Browser]
    │ POST /api/files-folders/create-folder
    ▼
[Controller]
    │ dispatcher.SendAsync(CreateFolderCommand { ... })
    │ Redis LPUSH → queue: "CreateFolderCommand"
    ▼
[Response: 200 OK + { trackingId: "abc-123" }]
    │ FE lưu trackingId, hiển thị loading indicator
    │ FE subscribe Firestore path: "commandresults/abc-123"

    ═══ Song song, nền Worker đang xử lý ═══

[CqrsDispatcher Worker]
    │ Redis RPOP → dequeue "CreateFolderCommand"
    │ Log: step="dequeue", status="success"
    ▼
[FilesFoldersCommandHandler.HandleAsync()]
    │ Tạo thư mục trong PostgreSQL
    │ Log: step="done", status="success"|"error"
    ▼
[Firebase Firestore]
    │ Set document: "commandresults/abc-123" = { success: true }
    ▼
[FE nhận Firestore realtime push]
    │ Đóng loading, reload data, XÓA doc Firestore
```

### 4.3. Luồng Event Pub/Sub (Thông Tin Liên Module)

```
[FilesFoldersCommandHandler]
    │ PublishAsync(FolderCreatedEvent) → Topic: "FolderCreatedEvent"
    │
    │ Redis tạo queue riêng cho mỗi subscriber:
    │   infra:sub:FolderCreatedEvent:UiNotificationHandler
    ▼
[UiNotificationEventHandler] ← subscriber 1
    │ Push Firestore realtime về UI

[AnotherBusinessHandler] ← subscriber 2 (nếu có)
    │ Thực hiện nghiệp vụ phụ...
```

### 4.4. CQRS Tracking — Vòng Đời Message Trong DB

Mọi bước đều được ghi vào bảng `cqrs_tracking_logs` (PostgreSQL, append-only):

| Id | TrackingId | Step | Status | Type | QueueOrTopic | Handler |
|----|-----------|------|--------|------|-------------|---------|
| 1 | abc-123 | send | success | queue | CreateFolderCommand | NULL |
| 2 | abc-123 | dequeue | success | queue | CreateFolderCommand | NULL |
| 3 | abc-123 | done | success | queue | CreateFolderCommand | FilesFoldersCommandHandler |
| 4 | abc-123 | send | success | topic | FolderCreatedEvent | NULL |
| 5 | abc-123 | dequeue | success | topic | FolderCreatedEvent | NULL |
| 6 | abc-123 | done | success | topic | FolderCreatedEvent | UiNotificationEventHandler |

> **Self-Healing**: Nếu Redis bị restart và mất metadata routing của event subscribers, `CqrsDispatcher` tự động ghi lại danh sách subscribers từ bộ nhớ in-process trước khi publish → Hệ thống **tự phục hồi** không cần restart.

---

## 5. 🛠️ Tech Stack & Tooling

### 5.1. Backend

| Công Nghệ | Phiên Bản | Vai Trò |
|-----------|-----------|---------|
| **.NET Core** | 8.0 | Runtime & Framework chính |
| **ASP.NET Core Web API** | 8.0 | REST API, Middleware pipeline |
| **Entity Framework Core** | 8.x | ORM — tự động tạo bảng |
| **PostgreSQL** | 15+ (ankane/pgvector) | Database chính |
| **Redis** | 7-alpine | Queue, PubSub, Session, Cache |
| **StackExchange.Redis** | Latest | Redis client cho .NET |
| **Firebase Admin SDK** | Latest | Firestore realtime, FCM push, GCS |
| **JWT (RS256)** | Custom RSA key | Authentication token |
| **Swagger/OpenAPI** | Latest | API documentation |
| **Docker Compose** | 3.x | Local infrastructure |

### 5.2. Frontend

| Công Nghệ | Phiên Bản | Vai Trò |
|-----------|-----------|---------|
| **Angular** | 17+ | Web framework |
| **TypeScript** | 5.x | Ngôn ngữ lập trình |
| **NG-ZORRO (Ant Design)** | Latest | UI Component Library |
| **RxJS** | 7.x | Reactive programming, MessageBus |
| **Transloco** | Latest | i18n / Đa ngôn ngữ |
| **Firebase SDK** | Latest | Firestore realtime listener |

### 5.3. Infrastructure (Docker)

```yaml
# backend/docker-compose.yaml
redis:     redis:7-alpine      # Port 6379  — Queue, Session, Cache
postgres:  ankane/pgvector     # Port 54321 — Main database (+ pgvector cho AI)
mariadb:   mariadb:10.11       # Port 3306  — Alternative DB
mongodb:   mongo:6.0           # Port 27017 — Document store
mssql:     mssql-server:2022   # Port 1433  — SQL Server
oracle:    oracle-free:23-slim # Port 1521  — Oracle
```

### 5.4. Multi-Client Support

| Client | Công Nghệ | Giao Thức |
|--------|-----------|-----------|
| Mobile | Flutter + flutter_appauth | OIDC Authorization Code + PKCE |
| Web Angular | Angular + @tot/core | REST API + Firestore Realtime |
| Web ReactJS | React + react-oidc-context | OIDC Authorization Code |
| Web MVC | ASP.NET Core MVC | OIDC Cookie Auth |

---

## 6. 🔐 Security Architecture

### 6.1. `[AppAuthorize]` — Custom Authorization Attribute

```csharp
// Sử dụng trong Controller
[AppAuthorize("files.read")]                               // Claim-based: "be.files.read"
[AppAuthorize("files.read", "files.write", Mode = AuthMode.AND)] // Phải có đủ cả hai
[AppAuthorize(Roles = "Admin")]                             // Role-based
[AppAuthorize(ResourceType = "Document", Action = ResourceActions.Read)] // ACL Bitmask
```

### 6.2. ACL Bitmask

| Bit | Giá trị | Quyền |
|-----|---------|-------|
| `0001` | 1 | Read (Đọc) |
| `0010` | 2 | Write (Ghi/Sửa) |
| `0100` | 4 | Delete (Xóa) |
| `1000` | 8 | Share (Chia sẻ) |

> Ví dụ: `bitmask = 3` (`0011`) → có Read + Write, không có Delete/Share.

### 6.3. Firestore Realtime Path — Hằng Số Bắt Buộc

```
Path: commandresults/{trackingId}
```

> ⚠️ **TUYỆT ĐỐI KHÔNG** tự ý đặt path Firestore ngoài hằng số này. FE phải **xóa ngay document** sau khi nhận notify.

---

*Đọc tiếp: **[Part 2: Architecture Usage](./part2_architecture_usage.md)***
