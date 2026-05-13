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