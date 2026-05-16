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
        cần có command, handler đẻ xử lý nghiệp vụ
        cần có event pub/sub để các nghiệp vụ khác lắng nghe và xử lý nếu cần. 
        các nghiệp vụ nói chuyện với nhau qua command, event để tránh bị lệ thuộc 
        nếu cần có thể controller 
        cần có extension để khi cần có thể đăng ký chạy ở program.cs của các app nếu cần 

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
        
        TreeOfThought/frontend/webtestoidc
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
    tùy vào nhu cầu có thể tạo thêm project api restful, các nghiệp vụ hiện tại để kiểm tra dễ dàng đang đưa vào sử dụng tại TreeOfThought/backend/Core.Web.Api


**đọc file TreeOfThought/docs/backend/yeucau.md và xem code ở các project trong TreeOfThought/backend , suy nghĩ và câp nhật vào TreeOfThought/docs/backend/phattrien.md để tôi xem, không cần thực hiện cho tới khi tôi bảo**