# Phân tích Thiết kế & Giải pháp Kỹ thuật - Module Elsa BPMN Workflow (`elsa-bpnm-workflow`) [Scaffold .NET Templates theo Official Documentation & PostgreSQL + Redis]

Tài liệu này là bản cập nhật tài liệu thiết kế hệ thống (BA Design & Technical Architecture) cho nghiệp vụ **Elsa BPMN Workflow**, đồng bộ với nội dung tinh gọn tại [`whattodo.md`](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/elsa-bpnm-workflow/whattodo.md) và tuân thủ các quy tắc phát triển trong [`tot-dev.md`](file:///work/a.i-assistant-chatbot-telegram-serverles/.agent/tot-dev.md).

---

## 1. Tổng quan Nghiệp vụ & Kiến trúc Hệ thống

Theo hướng dẫn chính thức từ [Elsa Workflows (elsa-server-and-studio)](https://www.elsaworkflows.io/get-started/elsa-server-and-studio):

1. **Truy cập Giao diện qua URL `/bpnm-workflow`**:
   - Tích hợp giao diện quản trị quy trình Elsa BPMN truy cập trực tiếp tại đường dẫn `/bpnm-workflow`.
2. **Triển khai Scaffold theo .NET Templates**:
   - Tích hợp Elsa Workflows Engine vào giải pháp .NET 10 Solution (`Core.Infra.ElsaBpnmWorkflow`).
   - Khai báo các dịch vụ Elsa Server API, Elsa Management & Elsa Runtime.
3. **Cơ sở Dữ liệu & Cấu trúc Phân tán (PostgreSQL & Redis)**:
   - **PostgreSQL**: Lưu trữ cơ sở dữ liệu định nghĩa quy trình (Workflow Definitions), lịch sử thực thi (Workflow Instances, Execution Logs) và Triggers.
   - **Redis**: Đóng vai trò Distributed Cache, Signal Bus truyền thông điệp và Distributed Locking điều phối các container khi triển khai phân tán.

---

## 2. Thiết kế Chi tiết Cấu phần Backend & Frontend

### A. Backend (.NET 10 Engine & Services)
- Gói dịch vụ: `AddElsaBpnmWorkflowServices(config)` đăng ký Elsa Engine với PostgreSQL EF Core Provider và AppRedisService.
- Controller: `ElsaBpnmWorkflowController` exposed tại `/api/workflow` và `/api/workflow-definitions`, `/api/workflow-instances`, `/api/activity-descriptors`.
- Bảo mật: Tích hợp `[Authorize]` với OIDC Claims Jwt Authentication (`business-oidc`).

### B. Frontend (Angular App `@tot/elsa-bpnm-workflow`)
- Route: `/bpnm-workflow` được bảo vệ bởi `claimGuard(APP_CLAIMS.ELSA_WORKFLOW.VIEW)`.
- Main Shell Component: `ElsaWorkflowMainComponent` chứa thanh chuyển đổi các tab chức năng:
  - **Trình Thiết Kế (Designer)**: Visual drag-and-drop workflow designer canvas.
  - **Official Elsa Studio**: Web Component Wrapper `<elsa-studio-root>` cho Elsa Studio chính gốc.
  - **Dashboard Thống Kê**: Báo cáo số liệu thực thi quy trình.
  - **Công Việc & Phê Duyệt**: Danh sách tác vụ User Task & Form Phê duyệt Approve/Reject.
  - **Quản Trị Admin**: Quản lý quy trình và kiểm tra Execution Logs Audit Trail.

---

## 3. Kế hoạch Kiểm thử & Xác minh (Verification Plan)

1. **Kiểm thử Biên dịch Backend .NET**:
   - Lệnh `/home/dunp/.dotnet/dotnet build` biên dịch thành công 0 lỗi.
2. **Kiểm thử Biên dịch Frontend Angular**:
   - Lệnh `npm run build` biên dịch thành công 0 lỗi.
3. **Kiểm thử Kết nối API**:
   - Lệnh `curl /api/workflow/activities` trả về mã HTTP `200 OK`.
