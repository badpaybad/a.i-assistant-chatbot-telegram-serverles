folder làm việc web api : TreeOfThought/backend/Core.Web.Api
FE angular: TreeOfThought/frontend/web 
cần bổ xung lệnh để build vào thành spa chạy chung dotnet cùng localhost:5000 , ./run-dev.sh
    - tự serve và watch dev angular vào folder wwwroot/admin/ mà không ảnh hưởng cách chạy hiện tại: npm start 
        - khi build dev xong vào folder wwwroot/admin/ cần có file index.html để fallback vào app admin khi route không match (điều hướng tất cả route trong /admin/... vào index.html)
        - khi code change ở folder TreeOfThought/frontend/web khi chạy ./run-dev.sh thì tự động build dev angular vào folder wwwroot/admin/ và reload browser
        
    - c# hỗ trợ chạy angular ở uri path /admin/
    - không ảnh hưởng việc dockerfile TreeOfThought/frontend/web/Dockerfile build độc lập thành static web
    - đổng thời cũng chạy luôn : dotnet run 
    
