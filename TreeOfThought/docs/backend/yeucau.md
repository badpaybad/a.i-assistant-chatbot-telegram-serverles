suy nghĩ về các yêu cầu ở dưới . viết vào TreeOfThought/docs/backend/phattrien.md để tôi xem

AppAuthorizeAttribute
    TreeOfThought/backend/Core.Infra.Oidc/Attributes/AppAuthorizeAttribute.cs 
    TreeOfThought/backend/Core.Infra.Oidc/Handlers/AppAuthorizationHandler.cs
    TreeOfThought/backend/Core.Infra.Oidc/Handlers/AppAuthorizationPolicyProvider.cs

tách sang riêng project Core.Infra.Auth 

để các project nghiệp vụ như TreeOfThought/backend/Core.Infra.FilesFolders, TreeOfThought/backend/Core.Infra.Oidc, ... dùng nhất quán về AppAuthorizeAttribute là nơi để đọc jwt và thực hiện authorize claim / role / permission / policy 

đang vướng việc login tạo jwt lại nằm ở controller 

tách sang riêng project Core.Infra.Session 
    2 project liên quan 
        TreeOfThought/backend/Core.Infra.Oidc 
        TreeOfThought/backend/Core.Infra.Auth

    Do việc lưu các thông tin role right claims permision acl lên redis cho user khi login, 
    cần , việc sinh ra khi login ở TreeOfThought/backend/Core.Infra.Oidc ,việc kiểm tra lại ở 
        TreeOfThought/backend/Core.Infra.Auth

    nên cần suy nghĩ và tách ra project riêng Core.Infra.Session để hybrid jwt và session server khi cần 
    
các project đều cần có extension để đăng ký vào program.cs cho web api cần 

Core.Infra.Session 
    như vậy project TreeOfThought/backend/Core.Infra.Session sẽ kiêm sinh jwt, session để thống nhất , cấp các const cho các project khác nếu cần. cần extension để đăng ký vào program.cs cho web api cần 

    việc sinh jwt cũng cần ở project TreeOfThought/backend/Core.Infra.Auth vì logic check jwt , lấy session ra check ở TreeOfThought/backend/Core.Infra.Auth/Handlers/AppAuthorizationHandler.cs 

Core.Infra.Auth
    TreeOfThought/backend/Core.Infra.Auth sinh ra để tất cả các project nghiệp vụ dùng AppAuthorizeAttribute nhất quán về kiểm tra quyền / role / permission / policy / acl ... . cần extension để đăng ký vào program.cs cho web api cần , extension của project Core.Infra.Auth cần có sẵn luôn của Core.Infra.Session 
    Các project nghiệp vụ có controller đều cần dùng Core.Infra.Auth AppAuthorizeAttribute

Core.Infra.Oidc
    TreeOfThought/backend/Core.Infra.Oidc Đây là project nghiệp vụ để quản lý user, role, claims sync ..., sso , oidc provider, login ..., 
        lúc này extension để đăng ký vào program.cs là đã có của Core.Infra.Auth