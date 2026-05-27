BE sẽ hoạt động ở TreeOfThought/backend

sử dụng dotnet core 8.0

Core infra base 
    TreeOfThought/backend/Core.Infra.Base
        mức ảnh hưởng toàn bộ solution
        các interface, const, model, dto... chính cho toàn bộ solution
        một số hàm dùng chung , hằng số dùng chung 
        
    TreeOfThought/backend/Core.Infra.Redis
        cache, pubsub, queue, eventbus, abstract redis để sử dụng theo nghiệp vụ cần

    TreeOfThought/backend/Core.Infra.Session
        session base trên redis , toàn bộ solution cần nhìn chung 1 server session nếu cần
        quản lý session dạng hybrid để có thể kết hơp với jwt

    TreeOfThought/backend/Core.Infra.Data
        các dbcontext để kết nối các nguồn data, abstract để sử dụng theo nghiệp vụ cần
        postgresql, mssql, mysql, mongodb

    TreeOfThought/backend/Core.Infra.Firebase
        các dịch vụ google firebase cho phép có nhiều firebase admin được instance
        abstract, các hàm sẵn theo quy tắc firebase để sử dụng theo nghiệp vụ cần
            FMC noti lên app mobile và web (web fcm qua service worker) với token device id
            firestore dùng để noti lên web theo request id (FE nhận được sẽ xóa luôn theo request id)
            google cloud storage cho upload file ảnh , tài liệu, video ... 
                việc xử lý 1 số logic như lấy thumb, resize ảnh multi screen ... phụ thuộc vào nghiệp vụ cần hay không.

    TreeOfThought/backend/Core.Infra.Auth
        base auth cho toàn bộ solution, chỉ có logic về việc sinh jwt, check jwt đi theo auth attribute nhất quán logic về check quyền theo các thông tin trong jwt
            policy, role vân hoạt đồng theo chuẩn của microsoft
            claims được truyền qua constructor của auth attribute là việc dánh dấu 1 đoạn code được phép chạy khi user có claims này
                vai trò của 1 user sẽ được định nghĩa động
                vai trò sẽ gom nhiều claims thành 1 vai trò
                    nếu user có quá nhiều claims thì jwt sẽ nặng , nên có chế độ hybrid khi claims nhiều quá sẽ lấy claims theo vai trò của user trên session, rồi dùng để kiểm tra logic của auth attribute
                        and thì phải xuất hiện đủ cả claims ( auth attr khai báo 2 cái , thì 2 cái cần phải có trong session theo user)
                        or thì chỉ cần xuất hiện 1 trong số các claims ( auth attr khai báo 2 cái, mà session chỉ cẩn xuất hiện 1 trong 2 là đủ)

        liên quan FE về check jwt logic tương đồng FE theo BE: 
            TreeOfThought/frontend/web/projects/tot/core
        

    TreeOfThought/backend/Core.Infra.Cqrs
        việc xử lý các nghiệp vụ nên quy hoạch về 
            command là queue, các nghiệp vụ cần tuân thủ việc tạo command và handler
                thường xử lý xong 1 command có thể là request từ UI convert sang command, handler xử lý xong (handle xong) thường dùng firestore để publish cho UI thực hiện tiếp về UI UX vd đóng waiting progress, load lại data ... rồi xóa luôn theo request id để tránh rác tốn tài nguyên
            event là pubsub, là kết quả của 1 nghiệp vụ cụ thể sẽ được publish với topic name để các nghiệp vụ khác lắng nghe và xử lý nếu cần. các nghiệp vụ nói chuyện với nhau qua command event để tránh bị lệ thuộc 

Các project nghiệp vụ

    yêu cầu của 1 nghiệp vụ khi được triển khai :    
        là project riêng biêt     
        tuyệt đối không gọi code ở các nghiệp vụ khác vào, hoặc tận dùng add reference để dùng lại code của nghiệp vụ khác (để tránh bị lệ thuộc giữa các nghiệp vụ)
        dùng tới các core infra base khi cần
        tuân thủ việc dùng dbcontext nghiệp vụ nào sẽ có riêng dbcontext của nghiệp vụ đó
        có thể có tạo thêm dbcontext để lấy data của nghiệp vụ khác nếu cần thiết (readonly không được xuất hiện code thay đổi dữ liệu)
        cần có command, handler đẻ xử lý nghiệp vụ dạng chạy bất đồng bộ, UI sẽ nhận notify để biết được việc đã xử lý xong chưa kết quả như thế nào (path có thể là: commandresults/{request id or tracking id})
            Cân nhắc có thể một số nghiệp vụ hoặc ở trong controller có thể gọi hàm trực tiếp hoặc chạy handle luôn (inmemory) mà không cần qua CQRS, chạy đồng bộ luôn. ví dụ: xử lý upload file 
            Có thể thêm các class để xử lý nghiệp vụ tránh ở handle quá dài 
        cần có event pub/sub để các nghiệp vụ khác lắng nghe và xử lý nếu cần. 
        các nghiệp vụ nói chuyện với nhau qua command, event để tránh bị lệ thuộc 
        nếu cần có thể controller 
        cần có extension để khi cần có thể đăng ký chạy ở program.cs của các app nếu cần 
        những gì cần const hoặc cần khai báo vào appsettings.json cần cân nhắc kỹ.

    ví dụ về nghiệp vụ 
        Core infra nghiệp vụ
            TreeOfThought/backend/Core.Infra.Oidc
                dùng để quản lý user, vai trò, quyền, acl ... cung cấp oids sso cho các app trong solution
                cũng sử dụng chung cơ chế auth attribute 
                cấu hình chính là 1 identity server cho solution, isOidc = true , khi isOidc = false thì sẽ sử dụng cơ chế auth attribute thuần. dùng cho các nghiệp vụ độc lập sso với identity server solution
                liên quan FE về quản lý và đăng nhập sso, vai trò, quyền 
                    TreeOfThought/frontend/web/projects/tot/business-auth
                    TreeOfThought/frontend/web/projects/tot/core
                    TreeOfThought/frontend/web/src/app/modules/auth

            TreeOfThought/backend/Core.Infra.FilesFolders
                về quản lý file cho từng người dùng 
                liên quan FE quản lý 
                    TreeOfThought/frontend/web/projects/tot/business-files
Các app , web api
    là các web cấp api rest full cho các FE tương ứng , hoặc MVC web theo yêu cầu khi cần.
    chủ yếu để đăng ký các nghiệp vụ để sử dụng 
    có thể add reference các project cần ( core infra base, các project nghiệp vụ cần)
    có thể add các nuget cần

    ví dụ về restfulapis 
        TreeOfThought/backend/Core.Web.Api
            web api chính core web, kiêm việc mở api restful làm identity server, oidc ...
            là web chính dể đăng ký nghiệp vụ và sử dụng: oidc , files
            một số test để hướng đần dùng cqrs , firebase ...
        
        TreeOfThought/frontend/webmvctestoidc
            web mvc dùng để test identity server, oidc sso 
Các app mobi
    TreeOfThought/frontend/mobi/my_pc_assistant
        dùng để test oidc sso với identity server

đảm bảo về việc khi phát triển nghiệp vụ mới, sửa lỗi bổ xung logic gì đó cần: 
    nhất quán về auth 
    nhất quán về dùng db cache cqrs firebase
    phát triển nghiệp vụ chỉ cần quan tâm tới
        controller ( có dùng tới auth attr với claims rõ ràng và chính xác )
        các handle (thực hiện các logic nghiệp vụ)
        query dữ liệu 
        db, redis dữ liệu, cache riêng theo nghiệp vụ nếu cần
        cần trao đổi dữ liệu nghiệp vụ khác sẽ qua command event 
        có thể dùng session nếu jwt chưa đủ thông tin 
        cần kết nối db tạo dbcontext hoặc cần redis riêng thì tạo thêm các class tương ứng trong nghiệp vụ
            với connectionstring tạo vào appsettings.json của từng nghiệp vụ với key là tên nghiệp vụ (vd: NhanDienKhuonMat:Postgresql or NhanDienKhuonMat:Redis)

    tùy vào nhu cầu có thể tạo thêm project api restful, các nghiệp vụ hiện tại để kiểm tra dễ dàng đang đưa vào sử dụng tại TreeOfThought/backend/Core.Web.Api
    
    **Quy chuẩn Paging (Phân trang)**:
        - Mọi API trả về danh sách (List/Search) bắt buộc phải hỗ trợ phân trang.
        - Tham số đầu vào (Request): Phải hỗ trợ `pageIndex` (mặc định là 1) và `pageSize` (mặc định là 10).
        - Cấu trúc trả về (Response): Bắt buộc trả về một Object chứa:
            - `items`: Danh sách dữ liệu của trang hiện tại.
            - `total`: Tổng số bản ghi thỏa mãn điều kiện lọc (không bị giới hạn bởi paging).
        - Mục đích: Đảm bảo Frontend luôn có đủ thông tin để hiển thị thanh phân trang chính xác.

BE tổng kết nhanh về mặt cấu trúc
    - core infra base của dự án
        - project interface high leve design 
        - project base abstract connect db , redis 
        - project eventbus, cqrs cho toàn dự án
        - project firebase 
        - project session user cho toàn dự án , khi cần hybrid với prj auth 
        - project auth (auth attribute) jwt  , dùng cả policy, role, acl , logic sinh và kiểm tra jwt toàn solution, có thể dùng project session. FE cũng cần tuân thủ logic auth này để nhất quán về phân quyền
    
    - các nghiệp vụ là project độc lập, phải sử dụng project auth ( auth attribute để nhất quán về logic phân quyền. FE cũng cần tuân thủ logic )

        - project oidc quản lý user role , cấp các api về login , sigout, singin, SSO ...
            - project nghiệp vụ chính của oidc
                controller
                cqrs handler (command, event) 
                queries
                db context
            - project cấp api restful của oidc
        - project file quản lý file cho từng người dùng, share file ...
        - ...

**đọc file TreeOfThought/docs/backend/whattodo.md và xem code ở các project trong TreeOfThought/backend , suy nghĩ và câp nhật vào TreeOfThought/docs/backend/howtodo.md để tôi xem, không cần thực hiện cho tới khi tôi bảo**

**cập nhật 2026-05-17 12:36:36** dùng google firestore để notify lên UI , sau khi đã thực hiện xong 1 nghiệp vụ, UI cần đảm bảo xóa firestore address path đó (tránh tốn tài nguyên và tiền). address path dành cho việc này là cần thành const không được tạo bừa bãi và là duy nhất trong solution . 
**cập nhật 2026-05-17 12:46:36**
paging cho việc lấy danh sách luôn cần là paging ở server 

**cập nhật 2026-05-18 12:46:36**
    khi các project nghiệp vụ BE dùng tới TreeOfThought/backend/Core.Infra.Auth/Attributes/AppAuthorizeAttribute.cs cần dùng TreeOfThought/backend/Core.Infra.Auth/Extensions/AuthServiceExtensions.cs đăng ký với program.cs dể dùng
        cần chú ý về appsettings.json sẽ cần bổ xung 

            với api restful dùng jwt bearer 

                cần thêm session vào appsetting để dùng Auth attr với hybrid jwt + redis session 
                "Session": {
                    "Redis": "localhost:6379,defaultDatabase=0,password=Test123456,abortConnect=false"
                }

                "Auth": {
                    "Jwt": {
                    "IsOidc": false, // Project API này chỉ là Resource Server tiêu thụ Token
                    "Authority": "http://localhost:5000" // Trỏ tới địa chỉ của SSO Server (Core.Web.Api)
                    }
                }

                program.cs 
                    builder.Services.AddAppAuthorization(builder.Configuration, Auth.Models.AppAuthMode.JwtBearer);
            
            với MVC web do cần dùng cookies 

                program.cs 
                    builder.Services.AddAppAuthorization(builder.Configuration, AppAuthMode.None);

                    builder.Services.AddAuthentication(options =>
                    {
                        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                        options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                    })
                    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
                    {
                        options.Cookie.Name = "WebMvcTestOidc_Auth";
                        options.Cookie.SameSite = SameSiteMode.Lax;
                        options.LoginPath = "/Home/Login";
                    })
                    .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
                    {
                        options.Authority = oidcConfig["Authority"];
                        options.ClientId = oidcConfig["ClientId"];
                        options.ClientSecret = oidcConfig["ClientSecret"];
                        options.ResponseType = "code";
                        
                        options.SaveTokens = true;
                        options.RequireHttpsMetadata = false; 

                        // Bypass Nonce because custom OIDC server doesn't support it yet
                        options.ProtocolValidator.RequireNonce = false;

                        // Standard validation using the JWKS endpoint of backend
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            NameClaimType = "preferred_username",
                            RoleClaimType = "role",
                            ValidateIssuer = true,
                            ValidIssuer = oidcConfig["Authority"],
                            ValidateAudience = true,
                            ValidAudience = oidcConfig["ClientId"],
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ClockSkew = TimeSpan.FromMinutes(5)
                        };
                    });

**cập nhật 2026-05-18 12:46:36**
    single trust về việc coi các client to server, server to server đều cấp tài khoản là user thông qua auth attribute để kiểm tra jwt và quyền. để bỏ sự phức tạp về quản lý client và audience của oidc, cần ValidateIssuer = true, ValidateIssuerSigningKey = true,
            vd nếu không quản lý = db thì appsettings.jons
                    "Oidc":{
                        ...,
                        "Clients": [
                            {
                            "ClientId": "Asp.net_MVC_Test.FE",
                            "ClientSecret": "secret",
                            "RedirectUris": ["http://localhost:5005/signin-oidc"],
                            "TargetAudience": "TreeOfThought.FE" // <-- Ánh xạ Audience cho MVC
                            },
                            {
                            "ClientId": "ReactJS_Test.FE",
                            "ClientSecret": "secret_react",
                            "RedirectUris": ["http://localhost:3000/callback"],
                            "TargetAudience": "Mobile_API.BE" // <-- Ánh xạ Audience cho React
                            }
                        ]
                    }

**cập nhật 2026-05-19 10:30:00**
    Tiêu chuẩn và hướng dẫn bắt buộc cho skill `tot-dev` khi phát triển backend và frontend client liên quan đến cơ chế Authentication/Authorization sử dụng Auth Attribute `[AppAuthorize]` (từ project `Core.Infra.Auth`) và tích hợp SSO OIDC:

    1. Về phía Backend - Sử dụng `[AppAuthorize]` trong Controllers:
        - Sử dụng các namespace: `using Core.Infra.Auth.Attributes;` và `using Core.Infra.Session.Models;`.
        - Hỗ trợ các thuộc tính và cách dùng linh hoạt:
            * Constructor `[AppAuthorize(params string[] claims)]`: Kiểm tra claims (quyền hạn). Các claim khai báo (ví dụ `"test.read"`) sẽ tự động được thêm tiền tố `"be."` thành `"be.test.read"` khi so khớp với quyền của user.
            * `Mode` (`AuthMode.OR` / `AuthMode.AND`): Xác định kiểm tra hoặc (mặc định) hay và khi khai báo nhiều claims.
            * `Roles` (ví dụ `[AppAuthorize(Roles = "Admin")]`): Kiểm tra phân quyền theo vai trò (được ưu tiên kiểm tra trước để bypass/short-circuit).
            * `Policy` (ví dụ `[AppAuthorize(Policy = "SuperUser")]`): Kiểm tra theo base policy của ASP.NET Core (được ưu tiên kiểm tra trước).
            * `ResourceType` và `Action` (ví dụ `[AppAuthorize(ResourceType = "Document", Action = ResourceActions.Read)]`): Hỗ trợ kiểm tra quyền động (ACL) thông qua mặt nạ bitmask trong Redis session. `ResourceId` được tự động trích xuất theo thứ tự ưu tiên: Header `x-resource-id` -> Route Parameter `{id}` -> Query String `?id=...`.

    2. Đăng ký Dịch vụ ở Backend (`Program.cs`):
        - Với RESTful API (Resource Server): Gọi `builder.Services.AddAppAuthorization(builder.Configuration, AppAuthMode.JwtBearer)` để tự động cấu hình xác thực JWT Bearer & Dynamic Authorization.
        - Với Web MVC Client: Gọi `builder.Services.AddAppAuthorization(builder.Configuration, AppAuthMode.None)` để chỉ đăng ký Dynamic Authorization, và tự cấu hình Authentication (Cookie & OpenID Connect) thông qua `AddAppOidcClient(builder.Configuration)`.

    3. Các Client Frontend Tích hợp OIDC SSO:
        - **Mobile Flutter (`mobi/my_pc_assistant`)**: Sử dụng plugin `flutter_appauth` với Authorization Code Flow và PKCE. Cấu hình endpoints trỏ tới SSO Server:
            * Authorization Endpoint: `$_baseUrl/api/auth/authorize`
            * Token Endpoint: `$_baseUrl/api/auth/token`
            * End Session Endpoint: `$_baseUrl/api/auth/logout`
            * ClientId: `my_pc_assistant`, Callback Scheme: `my-pc-assistant://callback`.
            * Sau khi lấy được `accessToken`, gọi endpoint `$_baseUrl/api/auth/me` để lấy thông tin chi tiết user (`preferred_username`, `email`, `name`).
        - **Web ReactJS (`webreactjstestoidc`)**: Sử dụng thư viện `react-oidc-context` (đóng gói từ `oidc-client-ts`).
            * Cấu hình `oidcConfig` chứa `authority`, `client_id`, `redirect_uri` (`/callback`), `post_logout_redirect_uri`, `response_type: "code"`, `scope: "openid profile email"`.
            * Sử dụng Hook `useAuth()` để theo dõi trạng thái, bảo vệ các router qua Component `ProtectedRoute` và lấy thông tin user hiển thị trên UI.
        - **Web MVC C# (`webmvctestoidc`)**: Sử dụng OpenID Connect middleware.
            * Đăng ký nhanh qua extension `builder.Services.AddAppOidcClient(builder.Configuration)`.
            * Cấu hình tệp tin `appsettings.json` trong phân đoạn `OidcClient` (chứa `Authority`, `ClientId`, `ClientSecret`, `CookieName`, `LoginPath`, `RequireNonce`, `RequireHttpsMetadata`).
            * Hỗ trợ tự động pre-load JWKS keys trong môi trường localhost phát triển để tránh lỗi bắt tay SSL/TLS.
        - **Web API Client / Test Suite (`webapitestoidc` wwwroot)**: Giao diện Client SPA kiểm thử bảo mật chạy trực tiếp trên trình duyệt giao tiếp với API Server (Port 5006) và SSO Server (Port 5000).
            * Xác thực: Thực hiện POST tới SSO Server `http://localhost:5000/api/auth/login` để lấy JWT token.
            * Quản lý Session: Token nhận được lưu trong `localStorage.setItem('test_jwt_token', jwtToken)` và đính kèm vào tiêu đề `Authorization: Bearer <jwtToken>` trong các yêu cầu gửi tới API Server `http://localhost:5006`.
            * Truyền dữ liệu ACL: Để kiểm tra quyền hạn ACL động, Client đính kèm tiêu đề tùy chỉnh `x-resource-id` (hoặc thông qua Route/Query string) và `x-resource-type` lên API.
            * Luồng đăng xuất: Client xóa token trong LocalStorage và chuyển hướng trình duyệt tới `http://localhost:5000/api/auth/logout?post_logout_redirect_uri=<CallbackUrl>` để hủy hoàn toàn SSO Session cookie trên server.

**cập nhật 2026-05-27 11:40:40**
tuân thủ về việc nghiệp vụ sinh ra theo cấu trúc folder. việc nghiệp vụ có thể có các dbcontext connect riêng cho nghiệp vụ việc init khởi tạo db, bảng or data ban đầu cần đi theo quy tắc. cần để vào extension để ở app shell gọi. vd ở program.cs gọi extension cho việc build services container và app usage 
    kiểm tra xem TreeOfThought/backend/Core.Web.Api/Program.cs đã đúng chưa , nếu chưa cần sửa extesion cho các nghiệp vụ chưa đúng 