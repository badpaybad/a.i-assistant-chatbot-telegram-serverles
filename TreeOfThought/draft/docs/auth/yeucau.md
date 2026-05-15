auth module

tyếp tục phát triển dựa trên BE xem TreeOfThought/backend/yeucau.md , FE xem TreeOfThought/frontend/web/yeucau.md và TreeOfThought/backend/Core.Infra.Auth/yeucau.md 

FE folder làm việc TreeOfThought/frontend/web/src/app/modules/auth 

**cập nhật 2026-05-13 18:18:18**
Người dùng cần bổ xung tìm kiếm : 
    keyword 
        username, displayname, email 
    droplist auto complete select nhiều
        trạng thái, vai trò, quyền 
    date range
        ngày tạo 
    droplist auto complete select 1
        sso provider,sso id

Vai trò cần bổ xung tìm kiếm:
    keyword
        vai trò, mô tả
    droplist auto complete select nhiều
        Quyền

Quyền bổ xung tìm kiếm theo
    keyword
        quyền, mô tả
    date range
        ngày tạo 

**cập nhật 2026-05-13 18:55:42**
trong bảng người dùng, bảng vai trò, khi thêm/sửa có droplist chọn quyền , khi thêm/sửa vai trò droplist cần là auto complete select nhiều giống ở filter  

**cập nhật 2026-05-13 20:30:00**
ở bảng hiển thị người dùng cần hiện thêm cột email, avatar, ngày tạo, ngày cập nhật
    bổ xung thêm cột avatar, khi click vào thì change được avatar của người dùng, cần upload file lên google cloud storage, avatar lưu public url của file trên google cloud storage

**bug 1**
sidebar menu khi đăng nhập lại bị lỗi, trong khi account admin có role Admin và claims be.admin
    Truy cập bị hạn chế
    Thiếu quyền: fe.cqrs:dashboard:view
    
**cập nhật 2026-05-15 12:30:00**
để độc lập và reuse được AppAuthorizeAttribute AppAuthorizationHandler cần move Controllers lên project Core.Web.Api