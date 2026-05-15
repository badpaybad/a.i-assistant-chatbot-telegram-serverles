xem file TreeOfThought/backend/yeucau.md 
AppAuthorizeAttribute
Hiện tại đóng vai trò là nơi lưu trữ Metadata. Nó tự động tạo ra một chuỗi Policy duy nhất dựa trên các tham số (Mode, Action, ResourceType, Claims).
Ví dụ: [AppAuthorize("user.view", Mode = AuthMode.And)] sẽ tạo ra Policy: AppAuthorize:AND:None:null:null:null:be.user.view.
(Lưu ý: Tất cả claims truyền vào AppAuthorize sẽ tự động được prepend "be.")
AppAuthorizationRequirement.cs (Mới):

Lớp chứa dữ liệu điều kiện để Handler sử dụng.
AppAuthorizationHandler.cs (Mới):

Nơi thực hiện logic phân quyền Bất đồng bộ (Async).
Sử dụng ICacheService và IHttpContextAccessor thông qua Dependency Injection.
Logic kiểm tra Claims (Hybrid Mode) và ACL (Bitmask từ Redis) đã được tối ưu hóa với await.
AppAuthorizationPolicyProvider.cs (Mới):

Xử lý việc tạo Policy động. Khi nhận thấy Policy bắt đầu bằng AppAuthorize:, nó sẽ phân tách chuỗi để tạo ra Requirement tương ứng.
Program.cs:

Đăng ký các dịch vụ mới: IHttpContextAccessor, IAuthorizationPolicyProvider, và IAuthorizationHandler.

Các kịch bản sử dụng chuẩn MS:
Dùng như [Authorize(Roles = "A")]: [AppAuthorize(Roles = "A")] -> Chỉ chạy qua bước kiểm tra Role rồi Succeed. Hoàn toàn giống chuẩn MS.
Dùng như [Authorize(Policy = "P")]: [AppAuthorize(Policy = "P")] -> Chỉ chạy qua bước kiểm tra Policy rồi Succeed. Hoàn toàn giống chuẩn MS.
Dùng kết hợp: [AppAuthorize(Roles = "A", Policy = "P")] -> Kiểm tra A trước, rồi P, xong mới cho qua.

Logic Custom (Redis/ACL) chỉ thực sự "tốn công" chạy khi bạn truyền tham số vào constructor: [AppAuthorize("be.user.edit", Roles = "Staff")] Trong trường hợp này, nếu User không phải là Staff, hệ thống sẽ chặn ngay ở bước kiểm tra Role, giúp bạn tiết kiệm được một lần gọi vào Redis. (Lưu ý: "be.user.edit" sẽ được kiểm tra)

chỉ dùng [AppAuthorize("be.user.edit")] (không có Roles, không có Policy)
Luồng xử lý:
Bỏ qua các lớp lọc chuẩn:
Hệ thống thấy Roles = null -> Bỏ qua (Không check Role).
Hệ thống thấy Policy = null -> Bỏ qua (Không check Policy tĩnh).
Tập trung vào Logic Custom:
Hệ thống thấy bạn có truyền vào user.edit.
Nó sẽ lấy userId của người dùng hiện tại.
Truy vấn Redis: Nó tìm trong Key claims:{userId} xem có chuỗi user.edit không.

claims đánh dấu các chức năng user có thể thực hiện , roles trong DB là nhóm các claims lại , hoàn toàn quản lý động ở DB. khác với [Authorize(Roles = "A")] trong mvc, chỉ dùng mvc thì khó để quản lý các quyền phức tạp và động. AppAuthorize vẫn hỗ trợ các tính năng cũ của mvc

program.cs cần 
    builder.Services.AddAppAuth(config); // Đăng ký dịch vụ

    //hoặc có thể truyền thêm policy tùy chỉnh 

    builder.Services.AddAppAuth(config,  new Dictionary<string, Action<AuthorizationPolicyBuilder>>
    {
        { "VipOnly", policy => policy.RequireClaim("membership", "vip") },
        { "ComplianceTeam", policy => policy.RequireRole("Compliance") }
    });

    // ...
    builder.Services.AddControllers().AddAuthControllers(); // Đăng ký Controller

    // --- 8. Initialize Infrastructure ---
    await app.UseAppAuth(config, new[] { Assembly.GetExecutingAssembly() });

**cập nhật 2026-05-15 1-:28:28**

openid connect đã được bổ xung 
BE: TreeOfThought/backend/Core.Infra.Auth/Controllers/AuthController.cs
FE: TreeOfThought/docs/auth/yeucau.md 
oidc kết hợp cả backend và SPA frontend web: 
    logic login oidc đã đúng chưa. khi mà bên thứ 3 request login oidc sau khi đăng nhập thành công redirect để trả code cho bên thứ 3