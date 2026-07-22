# Hướng Dẫn & Đánh Giá Chi Tiết Chuyển Đổi Hệ Thống Từ C# (.NET) Sang Python (TreeOfThought Python Migration)

Tài liệu này được biên soạn dựa trên việc phân tích chuyên sâu toàn bộ mã nguồn C# và tài liệu kiến trúc tại [TreeOfThought/docs/backend/howtodo.md](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/backend/howtodo.md), [TreeOfThought/docs/backend/whattodo.md](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/backend/whattodo.md) và các quy chuẩn nghiệp vụ của skill `tot-dev`.

---

## 1. Đánh Giá Tổng Quan Kiến Trúc & Tính Khả Thi Khi Chuyển Sang Python

Hệ thống Backend C# hiện tại được thiết kế theo mô hình **Distributed Microservices / Isolated Services** (hỗ trợ distributed auto-scaling độc lập cho từng nghiệp vụ, cô lập hoàn toàn về mặt mã nguồn, logic và cơ sở dữ liệu) kết hợp với **Clean Architecture**, **CQRS**, **Hybrid Authentication/Session**, **Server-Side Paging chuẩn hóa** và **Realtime UI Notification qua Firebase Firestore**.

Khi chuyển đổi (migrate) sang ngôn ngữ **Python**, mục tiêu tối thượng là: **Bảo tồn 100% tư duy kiến trúc, các khái niệm cốt lõi (concepts), tính cô lập nghiệp vụ (Isolation & Database-per-service), khả năng distributed auto-scaling, và đảm bảo khả năng bảo trì, mở rộng đường dài mà không tạo nợ kỹ thuật (Tech Debt).**

### 1.1. Bảng Đối Chiếu Kiến Trúc C# vs Python Ecosystem

| Thành phần Kiến trúc | Giải pháp Hiện tại (C# .NET) | Giải pháp Đề xuất trong Python | Ghi chú & Quy chuẩn Triển khai |
| :--- | :--- | :--- | :--- |
| **Framework Web chính** | ASP.NET Core Web API 8.0 | **FastAPI** (Python 3.11+) | Tận dụng AsyncIO native, Pydantic v2 validation tốc độ cao, OpenAPI auto-doc. |
| **Cấu trúc Solution** | Distributed Services (Phân tách deployable projects/containers) | **Independent Python Services / Packages** (Triển khai các FastAPI apps cô lập trong `modules/...`) | Phân chia package độc lập, cấm import chéo giữa các `modules`. Mở rộng độc lập (Auto-scale). |
| **Dependency Injection** | `Microsoft.Extensions.DependencyInjection` | **FastAPI `Depends`** + **`dependency-injector`** (Container pattern) | Đảm bảo IoC, quản lý Lifespan Scope (Singleton, Scoped, Transient). |
| **Data Access Layer & DB Isolation** | Entity Framework Core (EF Core) + Isolated DB per service | **SQLAlchemy 2.0 (AsyncEngine + AsyncSession)** | Hỗ trợ Async native, Declarative Mapping, cô lập DB Engine riêng cho từng service. Kết nối readonly sang DB nghiệp vụ khác khi cần. |
| **DB Migration** | EF Core Migrations | **Alembic** | Quản lý migration độc lập cho từng module DB hoặc multi-tenant schemas. |
| **CQRS & Dispatcher** | Custom In-Memory Dispatcher (`IDispatcher`) | **Python Custom Async Dispatcher** + `@command_handler` / `@query_handler` decorators | Đăng ký handler tự động qua reflection (`importlib`), xử lý bất đồng bộ native `asyncio`. |
| **Reliable Message Queue** | Redis `LPUSH` / `RPOP` (`Core.Infra.Redis`) | **Redis Async Client** (`redis-py`) + `BRPOPLPUSH` / **Redis Streams** / **Arq** | Đảm bảo không mất message khi worker ngẫu nhiên đứt kết nối hoặc crash. |
| **Hybrid Session & Cache** | Redis Hybrid Session (`Core.Infra.Session`) | **Redis Async Session Store** | Lưu thông tin session mở rộng trên Redis, kiểm tra token JWT nhanh ở Gateway/Middleware. |
| **Security & Auth** | Custom `[AppAuthorize]` Claims + Bitmask ACL | **FastAPI Security Dependency (`AppAuthorize`)** | Kiểm tra JWT signature + Redis session bitmask ACL dynamic trên từng Resource ID. |
| **Realtime Notification** | Firebase Firestore Client (`notify/{trackingId}`) | **Firebase Admin SDK Python (Async Firestore)** | Publish kết quả async command lên Firestore `commandresults/{tracking_id}` để UI lắng nghe. |
| **Server-Side Paging** | `pageIndex` (1-based), `pageSize`, `{ items, total }` | Pydantic Generic Model `PagedResult[T]` | Bắt buộc 1-based indexing, query string `pageIndex`, `pageSize`, JSON return `items`, `total`. |

---

## 2. Thiết Kế Chi Tiết Kiến Trúc Python (Architecture & Concept Mapping)

### 2.1. Cấu Trúc Thư Mục & Đóng Gói Dịch Vụ Phân Tán (Distributed Services Architecture)

Để tuân thủ tuyệt đối tính cô lập (Isolation) và quy định của `tot-dev`, dự án Python sẽ tổ chức theo cấu trúc package sau:

```text
TreeOfThought/backend_python/
├── core/                           # Hạ tầng cơ sở chung (Base Infrastructure)
│   ├── infra/
│   │   ├── base/                   # Protocol, Contracts, Interfaces, Standard Exceptions
│   │   │   ├── contracts.py
│   │   │   └── exceptions.py
│   │   ├── cqrs/                   # Custom In-Memory CQRS Dispatcher & Event Bus
│   │   │   ├── dispatcher.py
│   │   │   ├── interfaces.py
│   │   │   └── decorators.py
│   │   ├── data/                   # BaseDbContext abstraction (SQLAlchemy AsyncEngine Manager)
│   │   │   ├── base_db.py
│   │   │   └── mixins.py
│   │   ├── redis/                  # Async Redis Service, LPUSH/RPOP Reliable Queue
│   │   │   ├── redis_service.py
│   │   │   └── reliable_queue.py
│   │   ├── session/                # Hybrid Session Manager (Redis-backed JWT session)
│   │   │   └── session_service.py
│   │   ├── auth/                   # AppAuthorize Dependency & Bitmask ACL Evaluator
│   │   │   ├── dependencies.py
│   │   │   └── acl_evaluator.py
│   │   └── firebase/               # Firebase Admin SDK Client (Firestore, Storage, FCM)
│   │       └── firebase_service.py
│
├── modules/                        # Các Module Nghiệp Vụ Cô Lập (Business Modules)
│   ├── filesfolders/               # Module Nghiệp vụ Quản lý File/Folder
│   │   ├── config.py
│   │   ├── db/
│   │   │   ├── models.py           # SQLAlchemy Models riêng
│   │   │   └── context.py          # Module AsyncSession
│   │   ├── dtos/                   # Pydantic Schemas (Request/Response DTOs)
│   │   ├── commands/               # CQRS Commands & Handlers
│   │   ├── queries/                # CQRS Queries & Handlers
│   │   ├── router.py               # FastAPI APIRouter
│   │   └── extension.py            # init_module(app) / extension setup
│   │
│   └── nhan_dien_khuon_mat/        # Module Nghiệp vụ Nhận Diện Khuôn Mặt
│       ├── config.py
│       ├── db/
│       ├── dtos/
│       ├── commands/
│       ├── queries/
│       ├── services/               # Model AI Inference wrappers (ONNX/ArcFace)
│       ├── router.py
│       └── extension.py
│
├── app_shell/                      # App Shell (Tương đương Core.Web.Api C#)
│   ├── main.py                     # FastAPI Application Instance & Lifespan Startup
│   ├── config.py                   # Pydantic BaseSettings (App Environment settings)
│   └── middlewares.py              # Exception Handler, CORS, Logging Middlewares
│
├── alembic/                        # Database Migrations tool configuration
├── tests/                          # Pytest Integration & Unit Tests
├── requirements.txt                # Dependencies file
└── pyproject.toml                  # Code style, Ruff, Mypy, Pytest config
```

---

### 2.2. Chi Tiết Triển Khai Hạ Tầng Cơ Sở (Core Infra Implementations)

#### 1. Core CQRS & Auto Registration (`core.infra.cqrs`)
Trong Python, chúng ta xây dựng `Dispatcher` bất đồng bộ native sử dụng `asyncio`:

```python
# core/infra/cqrs/interfaces.py
from typing import TypeVar, Generic, Type, Dict, Any, Callable
from pydantic import BaseModel

class BaseCommand(BaseModel):
    tracking_id: str

class BaseQuery(BaseModel):
    pass

TCommand = TypeVar("TCommand", bound=BaseCommand)
TResult = TypeVar("TResult")

class CommandHandler(Generic[TCommand, TResult]):
    async def handle(self, command: TCommand) -> TResult:
        raise NotImplementedError

# core/infra/cqrs/dispatcher.py
import asyncio
import importlib
import pkgutil
from typing import Dict, Type, Any

class CqrsDispatcher:
    _command_handlers: Dict[Type[Any], Any] = {}
    _query_handlers: Dict[Type[Any], Any] = {}

    @classmethod
    def register_command_handler(cls, command_cls: Type[Any], handler_instance: Any):
        cls._command_handlers[command_cls] = handler_instance

    @classmethod
    def register_query_handler(cls, query_cls: Type[Any], handler_instance: Any):
        cls._query_handlers[query_cls] = handler_instance

    async def send_async(self, command: BaseCommand) -> Any:
        handler = self._command_handlers.get(type(command))
        if not handler:
            raise ValueError(f"No handler registered for command: {type(command).__name__}")
        return await handler.handle(command)

    async def execute_query_async(self, query: BaseQuery) -> Any:
        handler = self._query_handlers.get(type(query))
        if not handler:
            raise ValueError(f"No handler registered for query: {type(query).__name__}")
        return await handler.handle(query)
```

#### 2. Quy chuẩn Server-Side Paging chuẩn hóa (`core.infra.base.paging`)
Bắt buộc tuân thủ 100% quy chuẩn tham số `pageIndex` (1-based) và `pageSize`, trả về JSON chứa `items` và `total` dạng chữ thường:

```python
# core/infra/base/paging.py
from typing import Generic, List, TypeVar
from pydantic import BaseModel, Field
from fastapi import Query

T = TypeVar("T")

class PagedResult(BaseModel, Generic[T]):
    items: List[T]
    total: int

class PageParams:
    def __init__(
        self,
        pageIndex: int = Query(1, ge=1, description="Trang hiện tại (1-based index)"),
        pageSize: int = Query(10, ge=1, le=100, description="Số lượng bản ghi trên một trang")
    ):
        self.page_index = pageIndex
        self.page_size = pageSize

    @property
    def skip(self) -> int:
        return (self.page_index - 1) * self.page_size

    @property
    def take(self) -> int:
        return self.page_size
```

*Công thức SQLAlchemy 2.0 Query Paging:*
```python
# Ví dụ truy vấn phân trang chuẩn trong Query Handler:
stmt = select(FaceDetectionModel).where(...).offset(params.skip).limit(params.take)
result = await session.execute(stmt)
items = result.scalars().all()

count_stmt = select(func.count()).select_from(FaceDetectionModel).where(...)
total = await session.scalar(count_stmt)

return PagedResult(items=items, total=total or 0)
```

---

### 2.3. Quy Trình CQRS Bất Đồng Bộ & Realtime UI Notification qua Firestore

Để tái hiện chính xác sơ đồ Sequence Diagram trong tài liệu C#:

1. **FastAPI Controller**: Nhận HTTP Post -> Tạo `Command(tracking_id=uuid4())` -> Đẩy qua `dispatcher.send_async(command)` -> Trả về HTTP `200 OK` chứa `trackingId`.
2. **Background Task / Handler**: Handler xử lý logic nghiệp vụ, lưu DB riêng của module.
3. **Publish Realtime Firestore Event**: Khi xong, Handler gọi `firebase_service.publish_to_address_path_async(f"commandresults/{tracking_id}", payload)`.
4. **Frontend Angular**: Nhận kết quả từ Firestore realtime stream, cập nhật UI và xóa document Firestore.

```python
# core/infra/firebase/firebase_service.py
import firebase_admin
from firebase_admin import credentials, firestore_async

class FirebaseService:
    def __init__(self, credential_path: str):
        if not firebase_admin._apps:
            cred = credentials.Certificate(credential_path)
            firebase_admin.initialize_app(cred)
        self.db = firestore_async.client()

    async def publish_command_result_async(self, tracking_id: str, data: dict):
        """Đồng bộ với C# const path 'commandresults/{trackingId}'"""
        doc_ref = self.db.collection("commandresults").document(tracking_id)
        await doc_ref.set(data)
```

---

### 2.4. Khởi Tạo Module & Extension Encapsulation (`Add...` / `Use...` Lifespan in FastAPI)

Trong C#, chúng ta dùng `AddNhanDienKhuonMat()` và `UseNhanDienKhuonMat()`. Trong FastAPI, ta triển khai qua **Lifespan Manager**:

```python
# modules/nhan_dien_khuon_mat/extension.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from modules.nhan_dien_khuon_mat.db.context import init_face_db

@asynccontextmanager
async def use_nhan_dien_khuon_mat(app: FastAPI):
    # Giai đoạn Startup (Khởi tạo DB / Seed Data an toàn)
    try:
        await init_face_db()
        print("[STARTUP] NhanDienKhuonMat DB initialized successfully.")
    except Exception as ex:
        print(f"[STARTUP ERROR] NhanDienKhuonMat DB init failed: {str(ex)}")
    
    yield
    
    # Giai đoạn Shutdown (Giải phóng tài nguyên)
    print("[SHUTDOWN] NhanDienKhuonMat cleaned up.")
```

---

## 3. Bộ Kỹ Năng Đội Ngũ Lập Trình Viên Python (Python Team Skill Matrix)

Để đảm bảo quá trình chuyển đổi không bị đứt gãy kiến trúc hoặc tạo mã nguồn kém chất lượng (spaghetti code), đội ngũ lập trình viên Python khi tham gia dự án cần đáp ứng các yêu cầu kỹ năng cụ thể sau:

### 3.1. Bảng Khung Kỹ Năng Đánh Giá (Skill Matrix)

| Nhóm Kỹ Năng | Mức Đội Ngũ Cần Đạt | Yêu Cầu Chi Tiết |
| :--- | :--- | :--- |
| **Python Core & Modern Features** | **Advanced (Tối thiểu 3+ năm Python)** | Python 3.11+, Strong AsyncIO, Generics/Protocol, Decorators, Context Managers (`@asynccontextmanager`), Metaprogramming. |
| **Data Validation & Typing** | **Master** | Pydantic v2 (Strict Typing, Generic Models, Custom Validators, Field Serializers), Python Type Hints (`mypy` clean execution). |
| **Web Framework & Dependency Injection** | **Senior** | FastAPI (Lifespan, Custom Dependencies, Background Tasks, Exception Handlers, Security Scopes). |
| **Database & Async ORM** | **Senior** | SQLAlchemy 2.0 (AsyncEngine, AsyncSession, Declarative Base, Dynamic Relationship Loading, Unit of Work Pattern), Alembic Migrations. |
| **Architectural Patterns** | **Architect / Senior** | Clean Architecture, CQRS, DDD Concepts, Loose Coupling, Event-Driven Architecture, Distributed Services/Microservices (Database-per-Service, Read-Only Cross-DB Connection). |
| **Caching & Messaging** | **Mid / Senior** | Async Redis (`redis-py`), Reliable Queues (`BRPOPLPUSH`), Pub/Sub, Hybrid Session State Management. |
| **Security & Authentication** | **Mid / Senior** | JWT (JSON Web Tokens), OAuth2 / OIDC, Bitmask ACL Evaluation, Claims-based Authorization. |
| **Cloud & SDKs** | **Mid** | Firebase Admin SDK Python (Firestore Async, Cloud Storage, FCM), ONNX Runtime / PyTorch Inference integration. |
| **Code Quality & Testing** | **Senior** | Pytest, pytest-asyncio, Mocking/Faking Async dependencies, Ruff linter, Docker/Containerization. |

---

## 4. Bộ Câu Hỏi Phỏng Vấn & Kiểm Tra Developer Python (Screening & Assessment Questions)

Bộ câu hỏi này gồm **5 phần chuyên sâu** nhằm kiểm tra từ tư duy nền tảng Python AsyncIO, kiến thức ORM, đến khả năng làm việc với Clean Architecture, CQRS và bài tập chuyển đổi code thực tế từ C# sang Python.

---

### Phần 1: Kiến Thức Core Python & AsyncIO Loop (Junior / Mid Level)

#### Câu 1: Cơ chế AsyncIO trong Python hoạt động như thế nào? Sự khác biệt giữa I/O-bound và CPU-bound task?
* **Mục đích kiểm tra**: Nắm rõ Event Loop, `async`/`await`, và rủi ro làm nghẽn Event Loop.
* **Kỳ vọng câu trả lời**:
  * AsyncIO dựa trên đơn luồng (Single-threaded Event Loop) sử dụng cơ chế Co-routine & Non-blocking I/O.
  * Task I/O-bound (gọi DB, Redis, API HTTP): Dùng `async`/`await` để nhường quyền điều khiển (yield) cho Event Loop xử lý task khác trong lúc chờ.
  * Task CPU-bound (Xử lý ảnh AI, ArcFace embedding, mã hóa file): Không dùng `async` đơn thuần vì sẽ làm **freeze/block Event Loop**. Cần đẩy sang `ProcessPoolExecutor` hoặc `asyncio.to_thread()`.

#### Câu 2: Trong Python AsyncIO, điều gì xảy ra nếu bạn gọi một hàm blocking đồng bộ (ví dụ: `requests.get()` hoặc `time.sleep()`) bên trong một `async def` function? Cách xử lý đúng?
* **Mục đích kiểm tra**: Khả năng phát hiện bug hiệu năng nguy hiểm trong môi trường Async.
* **Kỳ vọng câu trả lời**:
  * Hàm blocking đồng bộ sẽ treo toàn bộ Event Loop, làm cho tất cả các request HTTP khác của ứng dụng FastAPI bị ngưng trệ (lock up).
  * **Cách xử lý đúng**:
    1. Thay thế bằng thư viện async tương đương: dùng `httpx.AsyncClient` thay cho `requests`, dùng `asyncio.sleep()` thay cho `time.sleep()`.
    2. Nếu bắt buộc gọi hàm đồng bộ của thư viện bên thứ 3: bọc hàm đó trong `await asyncio.to_thread(blocking_func, *args)`.

#### Câu 3: Hãy giải thích cách hoạt động của Python Decorator. Làm sao để viết một Decorator hỗ trợ cả async function và sync function?
* **Mục đích kiểm tra**: Hiểu sâu về Metaprogramming & Decorators trong Python.
* **Kỳ vọng câu trả lời**:
  * Decorator là một Higher-Order Function nhận vào một function và trả về một wrapper function.
  * Để bọc cả async và sync: Cần kiểm tra `inspect.iscoroutinefunction(func)` bên trong wrapper:
    ```python
    import functools, inspect

    def my_decorator(func):
        @functools.wraps(func)
        async def async_wrapper(*args, **kwargs):
            # Pre-logic
            res = await func(*args, **kwargs)
            # Post-logic
            return res

        @functools.wraps(func)
        def sync_wrapper(*args, **kwargs):
            # Pre-logic
            res = func(*args, **kwargs)
            # Post-logic
            return res

        return async_wrapper if inspect.iscoroutinefunction(func) else sync_wrapper
    ```

---

### Phần 2: Thiết Kế Kiến Trúc Clean Architecture & CQRS (Senior Level)

#### Câu 4: Trong kiến trúc dịch vụ phân tán (Distributed Services / Microservices) bằng Python, làm sao để đảm bảo các nghiệp vụ (ví dụ `FilesFolders` và `NhanDienKhuonMat`) giữ tính cô lập tuyệt đối về mặt code và logic (Isolation), không import chéo mã nguồn của nhau mà vẫn truy xuất được dữ liệu liên nghiệp vụ khi cần?
* **Mục đích kiểm tra**: Tư duy Loose Coupling, Distributed Architecture và quy chuẩn tích hợp dữ liệu của hệ thống.
* **Kỳ vọng câu trả lời**:
  1. Không bao giờ `import modules.filesfolders...` trực tiếp trong `modules.nhan_dien_khuon_mat` (hoặc ngược lại). Mỗi nghiệp vụ được triển khai và deploy như một dịch vụ độc lập.
  2. Mọi giao tiếp nghiệp vụ bất đồng bộ phải thông qua **Event-Driven Architecture (Redis Pub-Sub, Message Queue, Event Bus)**.
  3. **Truy vấn dữ liệu liên nghiệp vụ (Cross-service read-only access)**: Nếu dịch vụ B cần đọc dữ liệu từ CSDL của dịch vụ A, dịch vụ B tự khai báo Model/Schema cần thiết và kết nối trực tiếp đến database của dịch vụ A bằng một **tài khoản chỉ đọc (Read-only Account)**. Tuyệt đối không được thực hiện các thao tác ghi/sửa đổi (Write/Update/Delete) dữ liệu trên CSDL của nghiệp vụ khác, và không dùng chung code/models.

#### Câu 5: Thiết kế một In-Memory Command Dispatcher trong Python có khả năng tự động đăng ký (Auto-registration) tất cả các Command Handler khi ứng dụng khởi chạy mà không cần khai báo thủ công từng Handler?
* **Mục đích kiểm tra**: Khả năng chuyển đổi cơ chế `CqrsAutoRegistrationService` của C# sang Python.
* **Kỳ vọng câu trả lời**:
  * Trình bày giải pháp kết hợp Decorator `@command_handler(CommandClass)` và quét package tự động bằng `pkgutil` / `importlib.import_module`:
    ```python
    # core/infra/cqrs/decorators.py
    HANDLERS_REGISTRY = {}

    def register_handler(command_cls):
        def decorator(handler_cls):
            HANDLERS_REGISTRY[command_cls] = handler_cls
            return handler_cls
        return decorator
    ```
  * Khi ứng dụng startup (`lifespan`), gọi hàm tự động import tất cả các file trong thư mục `modules/*/commands/`.

---

### Phần 3: Database & Async ORM (SQLAlchemy 2.0 & Alembic) (Mid / Senior Level)

#### Câu 6: Trong SQLAlchemy 2.0 AsyncIO, lỗi "coroutine was never awaited" hoặc "object is not bound to a Session" (Lazy Loading issue) xảy ra khi nào và cách khắc phục triệt để?
* **Mục đích kiểm tra**: Kinh nghiệm thực chiến với SQLAlchemy Async.
* **Kỳ vọng câu trả lời**:
  * Lỗi xảy ra khi truy cập vào một `relationship` chưa được load mà ORM cố gắng thực hiện Lazy Loading đồng bộ (không tương thích với AsyncSession).
  * **Cách khắc phục**:
    1. Bắt buộc dùng **Eager Loading**: `select(Model).options(joinedload(Model.relation))` hoặc `selectinload`.
    2. Cấu hình `lazy="raise_on_sql"` trên relationship để phát hiện lỗi ngay từ thời điểm development.

#### Câu 7: Làm thế nào để quản lý Transaction và Unit of Work pattern chuẩn xác trong FastAPI + SQLAlchemy 2.0 để đảm bảo tự động Commit khi thành công và Rollback khi có exception?
* **Mục đích kiểm tra**: Quản lý vẹn toàn dữ liệu (Data Integrity).
* **Kỳ vọng câu trả lời**:
  * Trực tiếp sử dụng Async Generator Dependency trong FastAPI hoặc Async Context Manager:
    ```python
    async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
        async with AsyncSessionFactory() as session:
            async with session.begin(): # Tự động commit khi thoát block, rollback nếu rải exception
                yield session
    ```

---

### Phần 4: Security, Session & Distributed Caching (Senior Level)

#### Câu 8: Hãy mô tả cơ chế Hybrid Session & Dynamic ACL Bitmask Evaluation. Làm sao để triển khai một Dependency `@AppAuthorize` trong FastAPI?
* **Mục đích kiểm tra**: Chuyển đổi cơ chế An ninh `Core.Infra.Auth` và `Core.Infra.Session` sang Python.
* **Kỳ vọng câu trả lời**:
  * Hybrid Session: Token JWT chứa thông tin tĩnh (UserId, TenantId). Thông tin quyền động (ACL Bitmask, Dynamic Claims) được lưu tại Redis theo key `session:{userId}`.
  * Khi API nhận request: FastAPI Security Dependency giải mã JWT -> Lấy `session` từ Redis -> Thực hiện phép tính toán bit (Bitwise AND `user_mask & required_mask == required_mask`) để kiểm tra quyền truy cập.

#### Câu 9: Trong mô hình CQRS, khi một worker ngầm xử lý tác vụ bị crash giữa chừng, làm sao để đảm bảo tác vụ không bị mất (Reliable Queue Pattern)?
* **Mục đích kiểm tra**: Tư duy thiết kế hệ thống chịu lỗi (Fault-Tolerant System).
* **Kỳ vọng câu trả lời**:
  * Không dùng `RPOP` đơn thuần (vì lấy ra là mất khỏi Redis).
  * Dùng lệnh Redis `BRPOPLPUSH` (hoặc `LMOVE` trong Redis 6.2+) để chuyển atomic message từ `Queue_Pending` sang `Queue_Processing`. Khi worker xử lý xong mới xóa khỏi `Queue_Processing`. Nếu worker chết, worker khởi chạy lại sẽ quét `Queue_Processing` để xử lý lại.

---

### Phần 5: Kiến Trúc Hệ Thống Phân Tán & Tư Duy Thiết Kế Liên Ngôn Ngữ (C# / Python Agnostic)

#### Câu 10: Hãy giải thích mô hình so sánh "Tòa nhà lớn và các phòng độc lập" (Large Building vs Independent Rooms) trong thiết kế hệ thống của TreeOfThought và phân chia trách nhiệm giữa Leader và Developer?
* **Mục đích kiểm tra**: Hiểu rõ triết lý thiết kế chia sẻ hạ tầng nhưng cô lập nghiệp vụ, đảm bảo khả năng Distributed Auto-scaling.
* **Kỳ vọng câu trả lời**:
  * **Core Infra (Hạ tầng tòa nhà)**: Cung cấp dịch vụ dùng chung (Backbone Message, DB Connect, Firebase Notification, OIDC, Auth & Session, Logging...). Leader tập trung xây dựng phần này để tự động hóa logging, tracking, scaling.
  * **Domain Business (Từng căn phòng)**: Đảm nhiệm nghiệp vụ cô lập, có CSDL riêng, tự do auto-scale độc lập. Developer tập trung viết logic nghiệp vụ trong Command Handler (hàm `handle`) và query trong Controllers, không cần can thiệp hạ tầng.

#### Câu 11: Sự khác biệt giữa Command và Event trong giao tiếp liên nghiệp vụ là gì? Tại sao hệ thống cấm chia sẻ query hoặc cache dùng chung giữa các nghiệp vụ?
* **Mục đích kiểm tra**: Nắm vững CQRS và Loose Coupling trong kiến trúc phân tán.
* **Kỳ vọng câu trả lời**:
  * **Command**: Yêu cầu thực hiện một nghiệp vụ cụ thể, gửi qua Queue để duy nhất một Handler xử lý.
  * **Event**: Phát ra sau khi xử lý xong để báo hiệu trạng thái, dùng Pub/Sub để các nghiệp vụ khác tự do lắng nghe.
  * **Cấm chia sẻ query/cache**: Tránh kiến trúc phụ thuộc chéo (Tight Coupling). Khi thay đổi logic CSDL của một nghiệp vụ không làm ảnh hưởng đến các nghiệp vụ khác. Truy xuất chỉ thông qua readonly DB connection hoặc Command/Event contract dùng chung.

#### Câu 12: Hệ thống TreeOfThought phân loại Caching thành InMemory Cache và Network Cache như thế nào khi auto-scale?
* **Mục đích kiểm tra**: Chiến lược caching trong hệ thống phân tán.
* **Kỳ vọng câu trả lời**:
  * **InMemory Cache (< 5s)**: RAM của chính container, truy cập nhanh nhưng không đồng nhất giữa các container được auto-scale. Chỉ dùng cho cấu hình tĩnh hoặc dữ liệu tạm thời hết hạn rất nhanh.
  * **Network Cache (Redis)**: Lưu trữ và chia sẻ Session/State dùng chung giữa các container, đảm bảo tính nhất quán nhưng tốn chi phí truyền dữ liệu qua mạng.

#### Câu 13: Khi throw Exception từ Command Handler, làm thế nào để infra tự động capture log phục vụ theo dõi?
* **Mục đích kiểm tra**: Cơ chế Exception handling tập trung.
* **Kỳ vọng câu trả lời**:
  * Developer không tự ghi log lỗi. Khi có lỗi nghiệp vụ, throw Exception cụ thể kèm theo **message context** và **các giá trị tham số liên quan (value context)**. Exception Middleware ở Core Infra sẽ tự động bắt được và lưu vào hệ thống tracking tập trung.

#### Câu 14: Hãy lập bảng đối chiếu các pattern thông dụng giữa C# (.NET 8.0) và Python (FastAPI + SQLAlchemy) để hỗ trợ quá trình tuyển dụng/chuyển đổi?
* **Mục đích kiểm tra**: Tư duy liên ngôn ngữ để dễ dàng chuyển giao công nghệ.
* **Kỳ vọng câu trả lời**:
  * API Entry Point: Controllers (C#) $\leftrightarrow$ APIRouter (FastAPI).
  * Dependency Injection: `IServiceCollection` (C#) $\leftrightarrow$ `Depends()` / `dependency-injector` (Python).
  * Startup/Cleanup: `IHostedService` (C#) $\leftrightarrow$ `@asynccontextmanager` Lifespan (Python).
  * In-Memory CQRS: MediatR (C#) $\leftrightarrow$ Custom `CqrsDispatcher` (Python).
  * DB ORM: EF Core (C#) $\leftrightarrow$ SQLAlchemy (Python).
  * Validation: Data Annotations / FluentValidation (C#) $\leftrightarrow$ Pydantic v2 (Python).

---

### Phần 6: Bài Tập Migration Thực Tế C# -> Python (Live Coding Challenge)

#### Bài Tập 1: Chuyển đổi C# Extension Method & Middleware sang Python FastAPI Lifespan

**Mã nguồn C# mẫu:**
```csharp
public static async Task UseNhanDienKhuonMat(this IApplicationBuilder app)
{
    using (var scope = app.ApplicationServices.CreateScope())
    {
        var services = scope.ServiceProvider;
        try
        {
            var faceDb = services.GetRequiredService<NhanDienKhuonMatDbContext>();
            await faceDb.EnsureTablesCreatedAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[STARTUP ERROR] NhanDienKhuonMatDbContext table creation failed: {ex.Message}");
        }
    }
}
```

**Đáp án Python chuẩn (Yêu cầu Developer viết đúng):**
```python
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from modules.nhan_dien_khuon_mat.db.context import face_db_engine, Base

logger = logging.getLogger("startup")

@asynccontextmanager
async def use_nhan_dien_khuon_mat(app: FastAPI):
    # Startup Context Scope
    try:
        async with face_db_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("[STARTUP] NhanDienKhuonMat tables created successfully.")
    except Exception as ex:
        logger.error(f"[STARTUP ERROR] NhanDienKhuonMatDbContext table creation failed: {str(ex)}")
    
    yield
    
    # Shutdown context (Clean resource)
    await face_db_engine.dispose()
```

---

#### Bài Tập 2: Chuyển đổi C# Command Handler & Realtime Firestore Event sang Python

**Mã nguồn C# mẫu:**
```csharp
public class SaveFaceDetectionCommandHandler : ICommandHandler<SaveFaceDetectionCommand, bool>
{
    private readonly NhanDienKhuonMatDbContext _dbContext;
    private readonly IFirebaseService _firebaseService;

    public SaveFaceDetectionCommandHandler(NhanDienKhuonMatDbContext dbContext, IFirebaseService firebaseService)
    {
        _dbContext = dbContext;
        _firebaseService = firebaseService;
    }

    public async Task<bool> HandleAsync(SaveFaceDetectionCommand command, CancellationToken ct)
    {
        var entity = new FaceSession { Id = Guid.NewGuid(), Name = command.Name };
        _dbContext.Sessions.Add(entity);
        await _dbContext.SaveChangesAsync(ct);

        // Notify Realtime UI via Firestore const path 'commandresults/{trackingId}'
        await _firebaseService.PublishToAddressPathAsync($"commandresults/{command.TrackingId}", new {
            Success = true,
            Message = "Lưu phiên thành công",
            Data = entity.Id
        });

        return true;
    }
}
```

**Đáp án Python chuẩn (Yêu cầu Developer viết đúng):**
```python
from uuid import uuid4
from core.infra.cqrs.decorators import register_handler
from core.infra.cqrs.interfaces import CommandHandler
from core.infra.firebase.firebase_service import FirebaseService
from modules.nhan_dien_khuon_mat.commands.save_face_command import SaveFaceDetectionCommand
from modules.nhan_dien_khuon_mat.db.models import FaceSession
from sqlalchemy.ext.asyncio import AsyncSession

@register_handler(SaveFaceDetectionCommand)
class SaveFaceDetectionCommandHandler(CommandHandler[SaveFaceDetectionCommand, bool]):
    def __init__(self, db_session: AsyncSession, firebase_service: FirebaseService):
        self.db_session = db_session
        self.firebase_service = firebase_service

    async def handle(self, command: SaveFaceDetectionCommand) -> bool:
        entity = FaceSession(
            id=str(uuid4()),
            name=command.name
        )
        self.db_session.add(entity)
        await self.db_session.commit()

        # Publish Realtime Event lên Firestore path 'commandresults/{tracking_id}'
        await self.firebase_service.publish_command_result_async(
            tracking_id=command.tracking_id,
            data={
                "success": True,
                "message": "Lưu phiên thành công",
                "data": entity.id
            }
        )
        return True
```

---

## 5. Lộ Trình Triển Khai Migration (Migration Roadmap & Action Checklist)

Để quá trình chuyển đổi diễn ra an toàn, không gián đoạn hệ thống hiện tại, nhóm phát triển sẽ triển khai theo 4 giai đoạn cụ thể:

- [ ] **Giai đoạn 1: Xây dựng Core Infra Package (`core/infra`)**
  - Khởi tạo repo Python Backend, cài đặt `FastAPI`, `SQLAlchemy 2.0`, `Pydantic v2`, `redis-py`, `firebase-admin`.
  - Hoàn thiện `core.infra.base` (Paging, Exceptions, Base DTOs).
  - Hoàn thiện `core.infra.cqrs` (Async Dispatcher, Auto-registration).
  - Hoàn thiện `core.infra.redis` & `core.infra.session`.

- [ ] **Giai đoạn 2: Triển khai Authentication & Security Module (`core.infra.auth`)**
  - Xây dựng FastAPI `AppAuthorize` dependency.
  - Tích hợp kiểm tra JWT + Hybrid Redis Session + ACL Bitmask.

- [ ] **Giai đoạn 3: Migration từng Module Nghiệp Vụ (Business Modules Migration)**
  - Migrate Module `FilesFolders` (`modules/filesfolders`).
  - Migrate Module `NhanDienKhuonMat` (`modules/nhan_dien_khuon_mat`).
  - Đảm bảo tuân thủ tuyệt đối quy chuẩn **Server-side Paging** (`items`, `total`) và **Firestore Realtime Notification** (`commandresults/{tracking_id}`).

- [ ] **Giai đoạn 4: Integration Testing & Verification**
  - Đóng gói Docker Container.
  - Chạy thử nghiệm kết nối song song với Angular Frontend hiện tại để xác nhận tính tương thích 100% về mặt API contract và realtime UI update.
