# Định hướng & Kiến trúc Phát triển Frontend (TreeOfThought)

Tài liệu này trình bày giải pháp kỹ thuật chi tiết cho việc xây dựng Frontend Angular theo mô hình modularized (Workspace Libraries), đảm bảo tính độc lập tuyệt đối giữa các nghiệp vụ (Business Modules) nhưng vẫn tuân thủ chặt chẽ các quy chuẩn chung của hệ thống về HTTP Client, Auth, Interceptor, Event Bus và UI UX.

---

## 🗺️ 1. Cấu trúc Workspace & Mô hình Module hóa

Hệ thống Frontend được đặt tại thư mục **`TreeOfThought/frontend/web`**, phát triển trên nền tảng **Angular Workspace (v17+)** kết hợp với **TypeScript**, **Ant Design (NG-ZORRO)** và **Transloco (Đa ngôn ngữ)**.

```mermaid
graph TD
    %% Nodes
    AppShell["App Shell (Main Application)<br/>src/app/"]
    CoreLib["@tot/core<br/>projects/tot/core"]
    SharedLib["@tot/shared<br/>projects/tot/shared"]
    
    DashboardModule["business-dashboard<br/>projects/tot/business-dashboard"]
    FilesModule["business-files<br/>projects/tot/business-files"]
    OidcModule["business-oidc<br/>projects/tot/business-oidc"]
    FaceModule["nhan-dien-khuon-mat<br/>projects/tot/nhan-dien-khuon-mat"]

    %% Dependencies
    AppShell --> CoreLib
    AppShell --> SharedLib
    AppShell -. Lazy Load .-> DashboardModule
    AppShell -. Lazy Load .-> FilesModule
    AppShell -. Lazy Load .-> OidcModule
    AppShell -. Lazy Load .-> FaceModule

    DashboardModule --> CoreLib
    DashboardModule --> SharedLib
    
    FilesModule --> CoreLib
    FilesModule --> SharedLib

    OidcModule --> CoreLib
    OidcModule --> SharedLib

    FaceModule --> CoreLib
    FaceModule --> SharedLib

    %% Decoupled interactions
    FilesModule -. MessageBus / Registry .-> DashboardModule
```

### 📂 Phân bổ các Thư viện chính:

1. **`@tot/core` (Thư viện cốt lõi)**:
   - **Nhiệm vụ**: Đóng gói toàn bộ nền tảng hệ thống dùng chung.
   - **Thành phần**: `HttpClientService`, `AuthService`, `Interceptors`, `Guards`, `Claims Constants`, `MessageBusService`, `ComponentRegistryService`, `FirebaseService`, `Transloco Providers`.
   - **Quy tắc**: Tuyệt đối không chứa bất kỳ giao diện người dùng (UI) nào. Chỉ chứa logic, service, hằng số và interface.

2. **`@tot/shared` (Thư viện UI dùng chung)**:
   - **Nhiệm vụ**: Cung cấp bộ UI component thống nhất và tái sử dụng cao.
   - **Thành phần**: Các component có tiền tố `tot-` như `tot-button`, `tot-table`, `tot-autocomplete`, `tot-editor`...
   - **Quy tắc**: Chỉ phụ thuộc vào `@tot/core` và các thư viện bên thứ ba (NG-ZORRO, v.v.). Tuyệt đối không import bất kỳ business module nào.

3. **`projects/tot/{ten-nghiep-vu}` (Các thư viện Nghiệp vụ độc lập)**:
   - **Tên thư mục**: Viết thường, phân tách bằng dấu gạch ngang (kebab-case), ví dụ: `business-dashboard`, `business-files`, `nhan-dien-khuon-mat`. Không nhất thiết phải có prefix `business-`, đặt tên sát với nghiệp vụ thực tế.
   - **Quy tắc cô lập**:
     - **CẤM IMPORT TRỰC TIẾP** mã nguồn, component, service hay hằng số giữa các thư viện nghiệp vụ với nhau (ví dụ: `business-dashboard` không được import trực tiếp từ `business-files`).
     - Việc trao đổi dữ liệu hoặc gọi UI chéo bắt buộc phải thông qua **Message Bus (Event Bus)** và **Component Registry**.

---

## 🛠️ 2. Quy chuẩn Kỹ thuật & Tích hợp Hệ thống

### 2.1. Đăng ký Định tuyến (Routing) và Lazy Loading
Để đảm bảo hiệu năng tối ưu, tất cả các module nghiệp vụ đều phải được tải chậm (Lazy Loading) bởi App Shell chính.

*   **Tại Thư viện Nghiệp vụ (ví dụ: `business-files`)**:
    Định nghĩa file routes và export ra ngoài thông qua `public-api.ts`:
    ```typescript
    // projects/tot/business-files/src/lib/business-files.routes.ts
    import { Routes } from '@angular/router';
    import { FilesDashboardComponent } from './components/files-dashboard/files-dashboard.component';

    export const BUSINESS_FILES_ROUTES: Routes = [
      { path: '', component: FilesDashboardComponent }
    ];
    ```

*   **Tại App Shell (`src/app/app.routes.ts`)**:
    Đăng ký lazy loading bằng cú pháp `loadChildren` hoặc `loadComponent`:
    ```typescript
    import { Routes } from '@angular/router';
    import { ClaimGuard } from '@tot/core';

    export const routes: Routes = [
      {
        path: 'files',
        loadChildren: () => import('@tot/business-files').then(m => m.BUSINESS_FILES_ROUTES),
        canActivate: [ClaimGuard],
        data: { claims: ['Files.View'] }
      }
    ];
    ```

### 2.2. Nhất quán Luật HTTP Client, Auth và Interceptor
> [!NOTE]
> Tất cả các thư viện nghiệp vụ khi chạy đều tuân thủ 100% các bộ luật Interceptor và Auth chung của hệ thống.

*   **Lý do**: Trong Angular, HTTP Interceptors được đăng ký ở tầng Root Application (`app.config.ts`). Do đó, bất kể request HTTP được gửi từ App Shell hay từ bất kỳ Business Module lazy-loaded nào, chúng đều tự động đi qua các Interceptors đã đăng ký:
    1.  `AuthInterceptor`: Tự động gắn token `Bearer` từ `AuthService`.
    2.  `ErrorInterceptor`: Tự động bắt lỗi HTTP (401, 403, 500...) và hiển thị thông báo qua `AppNotificationService`.
*   **Thực thi**: Các nghiệp vụ sử dụng `HttpClient` tiêu chuẩn của Angular hoặc gọi qua `HttpClientService` của `@tot/core` để tận dụng các API bọc sẵn.

### 2.3. Cơ chế Truyền dữ liệu & State Management
Để tối ưu hóa luồng dữ liệu và giữ cấu trúc đơn giản (KISS), việc truyền dữ liệu được phân cấp như sau:
1.  **Quan hệ Cha - Con (Trong cùng 1 component cha)**: Sử dụng thuộc tính `@Input()` và `@Output()` chuẩn Angular.
2.  **Giữa các view/page trong cùng một Module Nghiệp vụ**: Sử dụng dịch vụ lưu trữ trạng thái có phạm vi (Scoped State Service) được cung cấp trong module đó (sử dụng `BehaviorSubject` của RxJS) hoặc truyền qua `ActivatedRoute` (Query/Route Params).
3.  **Giữa các Module Nghiệp vụ hoàn toàn độc lập**: Sử dụng `MessageBusService` để gửi message hoặc lắng nghe sự kiện mà không làm tăng độ phụ thuộc chéo.

---

## ⚡ 3. Hệ thống CQRS Message Bus (Event Bus)

Để mô phỏng hoàn hảo cơ chế CQRS từ Backend (`Core.Infra.Cqrs`), Frontend triển khai `MessageBusService` tích hợp sâu trong `@tot/core`.

```mermaid
sequenceDiagram
    participant FE as Module nghiệp vụ FE
    participant MB as MessageBusService (Core)
    participant BE as REST API Backend
    participant FS as Cloud Firestore
    
    rect rgb(240, 248, 255)
    Note over FE, MB: Luồng 1: Xử lý Command (FIFO Queue)
    FE->>MB: execute(queueName, command)
    MB->>MB: Xếp hàng đợi (Tuần tự xử lý FIFO)
    MB->>BE: Gửi HTTP POST request (chứa trackingId)
    BE-->>MB: HTTP Response nhận yêu cầu (202 Accepted)
    end
    
    rect rgb(255, 240, 245)
    Note over FE, FS: Luồng 2: Nhận kết quả và Xóa Record ngay lập tức
    FS-->>FE: Realtime Stream trigger (kết quả tại commandresults/{trackingId})
    FE->>FE: Xử lý UI (Ẩn loading, refresh data...)
    FE->>FS: Gửi request XÓA RECORD (deleteDoc)
    Note over FE, FS: Xóa ngay lập tức để tiết kiệm chi phí & tránh rác!
    end
```

### 3.1. Phân biệt Command (Queue) và Event (Pub/Sub)

*   **Command (Xử lý hàng đợi - Queue)**:
    - **Cơ chế**: FIFO (First-In, First-Out).
    - **Nguyên tắc**: Ở mỗi `queueName`, tại một thời điểm **chỉ có duy nhất một xử lý** được hoạt động tuần tự. Các yêu cầu tiếp theo sẽ xếp hàng đợi.
    - **API trên Core**:
      ```typescript
      execute<T extends IBaseCommand>(queueName: string, command: T): Promise<void>
      ```
    - **Ứng dụng**: Cho các tác vụ ghi dữ liệu, chỉnh sửa hệ thống, upload nhiều tài liệu tuần tự.

*   **Event (Phát sóng - Pub/Sub)**:
    - **Cơ chế**: Phát quảng bá (Broadcasting).
    - **Nguyên tắc**: Một Topic có thể được đăng ký lắng nghe bởi vô số Subscriber. Khi Event phát đi, tất cả Subscriber sẽ nhận đồng thời.
    - **API trên Core**:
      ```typescript
      publish<T extends IBaseEvent>(topicName: string, event: T): void;
      on<T extends IBaseEvent>(topicName: string): Observable<T>;
      ```
    - **Ứng dụng**: Gửi thông điệp toàn cục (ví dụ: `FILE_UPLOADED`, `THEME_CHANGED`, `USER_LOGGED_OUT`).

### 3.2. Đồng bộ Realtime Feedback và Tối ưu hóa Firestore
> [!IMPORTANT]
> **QUY TẮC PHẢI TUÂN THỦ (ONCE-ONLY RECEIPT)**
> 
> Khi gửi một Command dài hơi lên Backend, Frontend đính kèm một mã định danh duy nhất `trackingId`. Backend xử lý xong sẽ ghi kết quả vào Google Firestore tại đường dẫn cố định duy nhất trong hệ thống: **`commandresults/{trackingId}`**.
> 
> Ngay sau khi Frontend nhận được kết quả realtime và cập nhật giao diện người dùng thành công, Frontend **BẮT BUỘC** phải thực hiện **XÓA NGAY LẬP TỨC** bản ghi tại path đó để giải phóng dữ liệu, tránh phát sinh chi phí lưu trữ/truy vấn đám mây (Firestore billing) và tránh trùng lặp dữ liệu xử lý.

Đoạn code tích hợp trong `FirebaseService` đảm bảo quy tắc này:
```typescript
subscribeOnce(requestId: string, callback: (data: any) => void) {
  // FIRESTORE_NOTIFY_PATH_PREFIX = 'commandresults'
  const docRef = doc(this.db, FIRESTORE_NOTIFY_PATH_PREFIX, requestId);
  
  const unsubscribe = onSnapshot(docRef, async (snapshot) => {
    if (snapshot.exists()) {
      try {
        const data = snapshot.data();
        callback(data); // Thực thi logic cập nhật giao diện trên FE
        
        unsubscribe(); // Hủy lắng nghe realtime ngay lập tức
      } catch (error) {
        console.error('Lỗi xử lý kết quả:', error);
      } finally {
        try {
          await deleteDoc(docRef); // BẮT BUỘC: Xóa tài liệu khỏi Firestore
        } catch (e) {
          console.error('Không thể xóa Firestore document:', e);
        }
      }
    }
  });
  return unsubscribe;
}
```

### 3.3. Tích hợp FCM Token Toàn cục và Background Service Worker

Để tối ưu hóa việc quản lý và đẩy thông báo (FCM Push Notifications), hệ thống triển khai cơ chế thu thập, lưu trữ và đăng ký token toàn cục:

*   **Tự động lấy và cache FCM Token**:
    - Ngay khi ứng dụng khởi chạy (`FirebaseService` constructor), hệ thống sử dụng một `setTimeout` an toàn để kích hoạt phương thức `getFCMToken()`.
    - Token lấy được sẽ lưu trữ trực tiếp vào biến bộ nhớ `currentFcmToken` của `FirebaseService`, cho phép các thành phần khác truy cập đồng bộ lập tức qua phương thức `getCurrentFCMToken()` không gây trễ giao diện.

*   **Tự động đăng ký FCM Token lên Backend**:
    - Để đảm bảo Backend luôn có thông tin thiết bị và token mới nhất phục vụ gửi noti, `AuthService` chịu trách nhiệm tự động gửi token lên API `/api/auth/register-fcm` ngay khi người dùng có phiên làm việc hợp lệ.
    - Luồng tự động đăng ký diễn ra tại:
      1.  **Khi tải trang (Startup)**: Nếu người dùng đã đăng nhập (có JWT token), hệ thống tự động đẩy token lên Backend sau khi nạp cấu hình claims (`syncClaims`).
      2.  **Khi đăng nhập thành công**: Cả luồng đăng nhập Username/Password thông thường và Social SSO đều kích hoạt đăng ký FCM Token lập tức sau khi lưu session cookie.

*   **Nhận thông báo trong nền (Background Messaging)**:
    - Sử dụng Service Worker `/admin/firebase-messaging-sw.js` (phạm vi scope `/admin/`) hoạt động độc lập dưới nền trình duyệt để lắng nghe sự kiện `onBackgroundMessage`.
    - Khi có thông báo mới, Service Worker tự động gọi `self.registration.showNotification(...)` hiển thị trực tiếp lên hệ điều hành ngay cả khi người dùng không mở tab trình duyệt.

*   **Hiển thị thông báo khi ứng dụng đang mở (Foreground Template)**:
    - App Shell (`app.ts`) đăng ký một listener sự kiện foreground `onMessageReceived` toàn cục.
    - Khi nhận được payload, hệ thống sử dụng `templateService.getTemplate('html')` (khai báo dạng template động chứa `[innerHTML]` tại `app.html`) kết hợp với `AppNotificationService` để hiển thị thông báo toast góc trên bên phải màn hình một cách đồng nhất, thẩm mỹ cao.

---

## 🧩 4. Giải pháp Gọi Component chéo (Component Registry)

Khi các nghiệp vụ độc lập cần hiển thị UI của nhau (ví dụ: Editor trong `business-oidc` cần nhúng nút "Chọn tài liệu" từ thư viện `business-files`), chúng ta sử dụng **`ComponentRegistryService`** làm đại lý trung gian.

```mermaid
sequenceDiagram
    participant Files as Thư viện Files-Folders
    participant Core as ComponentRegistry (Core)
    participant Editor as Thư viện CKEditor (Oidc/Shared)

    Note over Files, Core: 1. Đăng ký Component khi Khởi chạy
    Files->>Core: register('FILES_SELECTOR', FileSelectModalComponent)
    
    Note over Editor, Core: 2. Gọi Component gián tiếp từ Key
    Editor->>Core: get('FILES_SELECTOR')
    Core-->>Editor: Trả về Component Type
    Editor->>Editor: Render động bằng Dynamic ViewContainerRef
```

### 4.1. Khai báo các Key Đăng ký tập trung
Tất cả các định danh dùng để gọi component động được quy hoạch tại `@tot/core` dưới dạng hằng số đóng băng:
```typescript
// projects/tot/core/src/lib/constants/registry.constants.ts
export const REGISTRY_KEYS = {
  FILES_FOLDERS: 'FILES_FOLDERS',
  FACE_RECOGNITION: 'FACE_RECOGNITION',
} as const;
```

### 4.2. Thực thi Đăng ký và Sử dụng

*   **Tại Thư viện nghiệp vụ cung cấp UI (`business-files`)**:
    ```typescript
    import { ComponentRegistryService, REGISTRY_KEYS } from '@tot/core';
    import { FileSelectModalComponent } from './components/file-select-modal.component';

    export class BusinessFilesModule {
      constructor(private registry: ComponentRegistryService) {
        // Đăng ký component vào Registry hệ thống
        this.registry.register(REGISTRY_KEYS.FILES_FOLDERS, FileSelectModalComponent);
      }
    }
    ```

*   **Tại Thư viện nghiệp vụ tiêu thụ UI (ví dụ: Editor hoặc Dashboard)**:
    Sử dụng directive hoặc nạp thủ công qua `ViewContainerRef`:
    ```typescript
    import { Component, ViewChild, ViewContainerRef } from '@angular/core';
    import { ComponentRegistryService, REGISTRY_KEYS } from '@tot/core';

    @Component({
      selector: 'tot-editor-wrapper',
      template: `<div #dynamicHost></div>`
    })
    export class EditorWrapperComponent {
      @ViewChild('dynamicHost', { read: ViewContainerRef, static: true }) host!: ViewContainerRef;

      constructor(private registry: ComponentRegistryService) {}

      openFileSelector() {
        const componentType = this.registry.get(REGISTRY_KEYS.FILES_FOLDERS);
        if (componentType) {
          this.host.clear();
          const componentRef = this.host.createComponent(componentType);
          // Truy cập instance và truyền tham số nếu cần
          // componentRef.instance.someInput = ...
        }
      }
    }
    ```

---

## 🎨 5. Quy chuẩn Thiết kế UI Components (`@tot/shared`)

Tất cả các thành phần UI thuộc thư viện dùng chung bắt buộc phải tuân theo tiền tố **`tot-`** và áp dụng thiết kế giao diện cao cấp, chuyên nghiệp.

### 5.1. Tot Button (`tot-button`)
*   **Hành vi**: Tự động hiển thị spinner loading khi đang xử lý các tác vụ bất đồng bộ, vô hiệu hóa nút bấm để tránh double-click.
*   **Đặc tả API**:
    - Hỗ trợ truyền vào thuộc tính `[loading]` một giá trị `boolean`, một `Observable<any>`, hoặc một `Promise<any>`.
    - Tự động ngắt kết nối (unsubscribe) và dừng loading khi stream hoàn thành hoặc phát sinh lỗi (`finalize`).

### 5.2. Tot Autocomplete (`tot-autocomplete`)
Component thay thế cho các hộp chọn Dropdown/Select truyền thống, mang lại trải nghiệm mượt mà.
*   **Chế độ**: Hỗ trợ Chọn đơn (`default`) và Chọn nhiều (`multiple`).
*   **Tải dữ liệu phân trang (Infinite Scroll)**:
    - Bắt buộc tích hợp cuộn vô hạn (`nzScrollToBottom`). Khi cuộn xuống cuối danh sách, component tự động nạp thêm trang dữ liệu tiếp theo. Page size mặc định luôn là **10**.
*   **Caching & Hydration (Tối ưu hóa API)**:
    - Khi khởi tạo, component kiểm tra và lấy dữ liệu trong `sessionStorage` để render ngay lập tức (instant rendering).
    - Khi thực hiện phân trang tiếp theo hoặc tìm kiếm từ khóa, các mục dữ liệu mới được merge vào cache hiện có, đảm bảo không trùng lặp và tiết kiệm số lần gọi API lên server.

### 5.3. Tot Table (`tot-table`)
Thành phần trung tâm để quản lý hiển thị danh sách dữ liệu, được bọc trong các chuẩn giao diện cực kỳ cao cấp.

| Thuộc tính (Input) | Kiểu dữ liệu | Giá trị mặc định / Mô tả |
| :--- | :--- | :--- |
| `[data]` | `any[]` | Danh sách bản ghi hiển thị trên bảng. |
| `[columns]` | `TotTableColumn[]` | Cấu hình cột (Title, Key, Width, Alignment, Fixed...). |
| `[loading]` | `boolean` | Trạng thái hiển thị spinner đang tải dữ liệu. |
| `[total]` | `number` | **Bắt buộc**: Tổng số lượng bản ghi thực tế từ server phục vụ server-side paging. |
| `[pageIndex]` | `number` | `1` (Trang hiện tại). |
| `[pageSize]` | `number` | `10` (Kích thước trang mặc định). |
| `[title]` | `string \| TemplateRef` | Tiêu đề hiển thị ở góc trái của NZ-Card wrapper. |
| `[extra]` | `TemplateRef \| string` | Template chứa nút hành động (Add, Refresh...) ở góc phải NZ-Card. |

> [!IMPORTANT]
> **CÁC NGUYÊN TẮC THIẾT KẾ BẮT BUỘC CỦA TOT-TABLE**
> 
> 1.  **Phân trang phía Server (Server-side Paging)**: Tất cả bảng danh sách **phải phân trang từ phía máy chủ**. Mọi thay đổi về chỉ mục trang, kích thước trang đều phải phát ra sự kiện gửi request API lên server. Thanh phân trang luôn hiển thị (`nzHideOnSinglePage: false`). Hỗ trợ các kích thước: `5, 10, 20, 25, 50, 100, 200`. Mặc định khởi tạo là **10**.
> 2.  **Cố định Cột Hành động (Fixed Action Column)**: Cột Hành động (chứa các nút Sửa, Xóa...) **BẮT BUỘC** cố định ở phía bên phải (`right: true`). Độ rộng cố định khoảng **`150px`** để đảm bảo trải nghiệm cuộn mượt mà.
> 3.  **Layout Nút Xếp Dọc (Vertical Action Stack)**: Nếu cột hành động chứa nhiều nút bấm, tất cả các nút **BẮT BUỘC phải xếp dọc** (mỗi nút chiếm một dòng riêng biệt, sử dụng CSS `flex-direction: column; gap: 4px;`), tuyệt đối không được co cụm hay thu nhỏ nút theo chiều ngang gây vỡ bố cục. Tất cả các nút hành động phải dùng `tot-button`.
> 4.  **Hiển thị Text Trọn vẹn (No Text Overflow)**: Các ô (cells) dữ liệu trong bảng phải luôn hiển thị đầy đủ text, **CẤM** sử dụng các thuộc tính cắt ngắn text như ellipsis ẩn đi dữ liệu của người dùng trừ khi có chỉ định đặc biệt. Thiết lập CSS bắt buộc tự động xuống hàng:
>     ```css
>     ::ng-deep .ant-table-cell {
>       white-space: normal !important;
>       word-break: break-word !important;
>     }
>     ```
> 5.  **Màu sắc Đồng nhất**: Header bảng có mã màu nền `#fafafa`. Các dòng dữ liệu (bao gồm cả dòng có cột cố định fixed-right) có màu nền là `#ffffff` để tạo cảm giác sang trọng, tương phản cao.

### 5.4. Tot Input (`tot-input`)
Thành phần input dùng chung hỗ trợ 3 dạng: văn bản thông thường, mật khẩu (có nút ẩn/hiện), và textarea. Bắt buộc tích hợp `ControlValueAccessor` của Angular Forms để sử dụng đồng nhất.

*   **Đặc tả API**:
    - `[type]`: `'text' | 'password' | 'textarea'` (Mặc định: `'text'`).
    - `[placeholder]`: `string` (Mặc định: `''`).
    - `[prefixIcon]`: `string | null` (Mặc định: `null`, ví dụ: `'user'`, `'lock'`).
    - `[rows]`: `number` (Mặc định: `4`, dùng cho dạng `'textarea'`).
    - `[disabled]`: `boolean` (Mặc định: `false`).
*   **Trường Mật khẩu (Password)**:
    - Hiển thị nút biểu tượng con mắt (`eye` hoặc `eye-invisible`) ở phía bên phải.
    - Click vào nút mắt sẽ chuyển đổi trạng thái hiển thị của mật khẩu (ẩn/hiện) và cập nhật biểu tượng mắt phù hợp.

---

## 🌐 6. Hệ thống Đa ngôn ngữ (Internationalization - I18n)

Hệ thống sử dụng **Transloco** (`@jsverse/transloco`) làm thư viện dịch đa ngôn ngữ cốt lõi thay thế hoàn toàn cho `ngx-translate`.

### 6.1. Đóng gói tại Core
Toàn bộ logic nạp file ngôn ngữ, cấu hình runtime và phát hiện ngôn ngữ mặc định được đóng gói gọn gàng trong `@tot/core`.
Ứng dụng chính chỉ cần gọi hàm khởi tạo tại `app.config.ts`:
```typescript
provideTotI18n({
  prodMode: environment.production,
  availableLangs: ['en', 'vi'],
  defaultLang: 'vi'
})
```

### 6.2. Cấu trúc File JSON & Docker Mountable Volume
*   **Vị trí**: Toàn bộ file JSON đa ngôn ngữ được tập trung tại `src/assets/lang/` (ví dụ: `vi.json`, `en.json`).
*   **Quy chuẩn Vận hành**: Thư mục ngôn ngữ này được cấu hình để có thể **mount volume** từ máy chủ host vào Container Docker chứa ứng dụng (Nginx):
    ```bash
    -v /opt/app/lang:/usr/share/nginx/html/assets/lang
    ```
    Điều này cho phép bộ phận vận hành hoặc biên dịch viên chỉnh sửa nội dung đa ngôn ngữ trực tiếp tại runtime mà không cần phải build và deploy lại ứng dụng Frontend.

---

## 💻 7. Quy trình Phát triển & DX (Developer Experience)

### 7.1. Chế độ Watch Thời gian thực (Real-time HMR)
Khi các lập trình viên thay đổi mã nguồn trong bất kỳ thư viện con nào (`projects/tot/core`, `@tot/shared`, hay `@tot/business-files`), hệ thống sẽ lập tức nhận biết và biên dịch lại (Hot Module Replacement) lên App Shell chính.
*   **Cấu hình**: Bản đồ đường dẫn (Path mapping) trong `tsconfig.json` trỏ trực tiếp đến file định nghĩa public API của thư viện:
    ```json
    "paths": {
      "@tot/core": ["projects/tot/core/src/public-api.ts"],
      "@tot/shared": ["projects/tot/shared/src/public-api.ts"],
      "@tot/business-files": ["projects/tot/business-files/src/public-api.ts"]
    }
    ```

### 7.2. Lệnh Khởi chạy Dự án
Tại thư mục gốc Frontend (`TreeOfThought/frontend/web`), lập trình viên chạy lệnh sau để khởi động môi trường phát triển:
```bash
npm run dev
# Hoặc chạy file shell script hỗ trợ:
./run-dev.sh
```

---

## 💡 8. Triết lý KISS & Decoupling (Tách biệt Nghiệp vụ)

Để dự án phát triển lâu dài không bị rơi vào bẫy "Technical Debt", mỗi lập trình viên phải ghi nhớ:
1.  **Keep It Simple, Stupid (KISS)**: Tránh viết code quá phức tạp. Chia nhỏ các component lớn thành các component con có mục tiêu rõ ràng.
2.  **Decoupling**: Các module nghiệp vụ tuyệt đối không liên kết trực tiếp với nhau. Nếu module A cần tính năng của module B:
    - *Gọi UI*: Sử dụng `ComponentRegistry`.
    - *Gửi tín hiệu / Data*: Sử dụng `MessageBus` Event.
3.  **Không Placeholder**: Mọi giao diện khi phát triển phải sử dụng dữ liệu mô phỏng (mock data) thực tế hoặc hình ảnh chất lượng cao sinh bởi AI, tránh các khối xám rác gây mất thẩm mỹ cho bản demo.

---
> [!IMPORTANT]
> *Tài liệu này là quy chuẩn kiến trúc bắt buộc. Mọi thay đổi mã nguồn hoặc bổ sung thư viện nghiệp vụ mới phải được đối chiếu và cập nhật vào tài liệu này trước khi tiến hành viết code.*
