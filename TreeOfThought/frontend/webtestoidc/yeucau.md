webtestoidc
web asp.net mvc dotnet 8.0 cho webtestoidc
folder làm việc TreeOfThought/frontend/webtestoidc 
tuân thủ TreeOfThought/1st.md 

Tạo web asp.net mvc dotnet 8.0 độc lập để test oidc với  http://localhost:5000/.well-known/openid-configuration hoặc  http://192.168.4.248:5000/.well-known/openid-configuration  192.168.4.248 là ip của máy chạy localhost:5000
    Login oidc sso , giả sử đăng nhập  http://localhost:5000/ thì sang trang web: webtestoidc sẽ không cần đăng nhập. và ngược lại đăng nhập ở webtestoidc sang http://localhost:5000/ và http://localhost:5000/admin/auth/login sẽ không cần đăng nhập
    test với tai khoản : admin pass: admin123
    web webtestoidc viết độc lập có thể dùng sqllite cần init gì thì chạy ở program.cs tạo dữ liệu và lưu trữ để test nhanh

