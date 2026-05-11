layout đã làm theo TreeOfThought/frontend/web/yeucau.md cần làm tiếp ở đây

folder làm việc FE: TreeOfThought/frontend/web/src/app/layouts

**cần tuân thủ** TreeOfThought/1st.md

**cập nhật 2026-05-11 22:05:05**
main-layout
    
    breadcrumb
        cần bổ xung breadcrumb chung cho main-layout ở trên router-outlet, không phụ thuộc vào module nào đang được hiển thị, dựa vào url hiện tại và TreeOfThought/frontend/web/src/app/app.routes.ts để hiển thị breadcrumb chung nếu có thể để giúp người dùng navigate qua lại trang cha, trang con, trang trước, trang sau dễ dàng hơn

    sidemenu
        cần active và expand theo đường dẫn hiện tại, nếu con nằm trong cha thi cần expand và active cha lên, cũng để dễ dàng cho người dùng biết được đang ở đâu 
        font chữ cần nếu không phải là đường link màu đang bị màu đen cần có style như đường link thẻ a để chữ không bị tối không nhìn rõ so với màu nền của sidemneu

        **sidemenu bug1** breadcrumb chưa tiện cho việc qua lại vd url cha http://localhost:4200/modules/cqrs-dashboard url con [ http://localhost:4200/modules/cqrs-dashboard/overview , http://localhost:4200/modules/cqrs-dashboard/tracing/f721a058-b703-4c7a-b4a6-1fd7ef2dab75 ] nhưng vào con thì không có breadcrumb cha để click quay lại

