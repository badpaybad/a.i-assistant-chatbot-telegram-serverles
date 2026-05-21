phát triển app mobi: my_pc_assistant ở folder:  TreeOfThought/frontend/mobi/my_pc_assistant

stack dùng là dart, flutter, ant design mobile ... cần thêm gì thì bổ sung
hỗ trợ android, ios đầy đủ

ý tưởng về kiến trúc FE giống như phát triển web đọc: TreeOfThought/docs/frontend/yeucau.md  tìm hiểu và làm phù hợp với app mobi

    FE tổng kết nhanh về cấu trúc
        lib core 
            auth, guard, interceptor, const claims, http client, event bus, component register, firebase, i18n/Transloco, pipe ... là wrap các base dùng chung theo 1 cách mà project cần , (auth cần tuân thủ theo BE auth attribute về logic kiểm tra quyền)
            
        lib shared
            - các component share cần bắt đầu với prefix: **tot-** (ví dụ: `tot-button`, `tot-table`, `tot-autocomplete`...)
            - một số component hay dùng
                - quy chuẩn các nút thao tác vd button , icon button ... khi click cần có loading trên nút để người dùng biết đã click và đang xử lý cho tới khi có kết quả thì ẩn loading
                - droplist auto complete sẽ cần dạng cho phép chọn nhiều , hoặc chọn signle item, có thể cho phép scroll để paging load khi scroll tới cuối danh sách thì tự động load thêm, cho phép add value vào session storage để lần đầu vào là có dữ liệu đã sẵn, khi paging hoặc tìm kiếm thì sẽ thêm các value lấy được chưa có ở session storage vào session hiện có. cần có loading khi đang lấy dữ liệu. tùy vào yêu cầu mà cần gọi lên server lấy hoặc data. page size mặc định 10
                ... sẽ bổ xung thêm sau ...

        lib module tên nghiệp vụ (business-dashboard, business-files-folders, ...) tên không bắt buộc bằng business
            dùng core, shared
            không được phép dùng trực tiếp component hay bất kỳ gì của module nghiệp vụ khác
                dùng thông qua event buss, message buss, component regsiter 

        app shell, app chính 
            cấu hình lazy load các module nghiệp vụ , khi cần dùng tới thì mới load 
            layout , theme, style, menu, breadcrum, route ...
            đăng ký các module nghiệp vụ để dùng 

**chú ý** đang có sẵn source code chạy bình thường ở TreeOfThought/frontend/mobi/my_pc_assistant , cần tìm hiểu và điều chỉnh code cho phù hợp không gây lỗi

**suy nghĩ và câp nhật vào TreeOfThought/docs/mobi/phattrien.md để tôi xem, không cần thực hiện cho tới khi tôi bảo**

    app cũng dùng i18n được à?, nghiệp vụ không nhất thiết phải bắt đầu bằng busines_ mà theo tên người dùng muốn lúc dùng tot-dev yêu cầu , làm ví dụ files folders trước cho module nghiệp vụ . component register có thể trao đổi dữ liệu state qua dùng event bus cqrs . chưa cần làm tot-table mà yêu cầu việc gọi lên server luôn có paging , không cần hỗ trợ lazy load. chưa làm dashboard và chachat_assistantt, làm files folders để làm sample trước UI tính năng như web (code angular TreeOfThought/frontend/web/projects/tot/business-files) làm sang app mobi

**cập nhật 1**
tất cả việc gọi lên api server cần thông qua HttpClientService ở core , không gọi thẳng dio

**cập nhật 2026-05-21 08:20:20**
 ở TreeOfThought/docs/business-oidc/yeucau.md có cập nhật về việc nhận notify fcm. cần bổ xung cho mobi app ở folder TreeOfThought/frontend/mobi/my_pc_assistant
    - mở máy lên cũng lấy sẵn fcm token device id
    - bổ xung màn login gọi auth/login với username password 
    - lúc login thành công (sso hoặc qua auth/login) cần gọi api để đăng ký fcm token với user
        - do đăng nhập sso lên localhost:5000 thì web ui login hoạt động vẫn đúng, khi quay về app mobi cũng cần đăng ký fcm token device id cho user, cũng cần gọi api để lưu vào database 
    - khi nhận noti khi ấn vào noti message nếu thấy body có text "files-folders" thì mở thẳng vào màn của module files folders
        - noti cần hoạt động cả khi ứng dụng không bật, cả khi ứng dụng đang bật
