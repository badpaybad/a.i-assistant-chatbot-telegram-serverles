FE web sẽ chạy trên đây: TreeOfThought/frontend/web
stack dùng là typescript, angular, ant design ...
tôi dùng angular, cần tạo lib module riêng cho từng nghiệp vụ rồi import vào app chính, setup sẵn routing, cần làm như thế nào, độ khả thi để các lib module nghiệp vụ đi theo layout các rule chung về httpclient, auth, intercepter

các moulde cần có quy chuẩn dùng chung dạng event buss, đăng ký topic queue để gửi dữ liệu qua nhau cần tạo lib core tách ra từ TreeOfThought/frontend/web để sử dụng nhất quán cho các nghiệp vụ và app chính. về httpclient, auth, intercepter, guard, các const claims  

Việc navigate qua lại, menu, gửi dữ liệu state qua lai giữa các component , cha con, giữa các module nghiệp vụ , giữa các page khac nhau cần làm như thế nào 

Trong quá trình code thay đổi cá lib và module nghiệp vụ sẽ được watch để thấy được thay đổi luôn

eventbus: cần có queue , dạng cqrs , command , event . đăng ký và subscribe queue giống trong csharp (TreeOfThought/backend/Core.Infra.Cqrs)
    command cần xử lý là queue, đảm bảo ở 1 queue name chỉ có 1 process đang xử lý nghiệp vụ của 1 item cần xử lý lần lượt, khi đăng ký xử lý , publish lên queue sẽ cần chỉ ra queue name 
    event cần xử lý là pubsub, cần chỉ ra topic name khi đăng ký subscribe và publish

cần đảm bảo được:
    - kiểm soát dễ dàng nghiệp vụ theo từng lib module 
    - khi phát triển nghiệp vụ tập trung phát triển nghiệp vụ, không bị phụ thuộc nghiệp vụ khác
    - đồng nhất về trao đổi dữ liệu
    - đồng nhất về layout
    - đồng nhất về permission truy cập url , ẩn hiện các component , element ...
    - **các notify từ backend** vd firestore (commandresults/...) sau khi FE nhận được data, xử lý xong cần xóa luôn trên firestore, để FE chỉ nhận 1 lần duy nhất khi request xử lý, tránh rác, tránh tốn tiền 

các component của các nghiệp vụ mà dùng qua lại của nhau thì cần như thế nào. vd ở ckeditor sẽ cần tới component của file and folder làm nút plugin trên tool bar. tương tự có nghiệp vụ khác cần dùng ckeditor và đưa plugin vào để sử dụng . hoặc dashboard sẽ cần tới các module nghiệp vụ để hiển thị dữ liệu

các component directive pipe liên quan tới auth, cần đưa lên core để thống nhất trong 1 solution về ẩn hiện UI, truy cập compnonent ... element , về truy cập url ...
    các key dùng để đăng ký dùng component ở các module khác nhau, nên cần có const ở core để nắm bắt và điều phối chung khi cần  

khi phát triển nghiệp vụ mới, FE cần tạo thư viện là thành folder con {tên nghiệp vụ} trong TreeOfThought/frontend/web/projects/tot
    tuẩn thủ về dùng các thư viện core, shared
    các nguyên tắc về đăng ký routing , component, command event 
    có thể đưa vào app chính TreeOfThought/frontend/web/src/app để dùng hoặc test 
    không nhất thiết các nghiệp vụ sẽ có prefix là business phụ thuộc vào yêu cầu của người dùng cần lấy tên liên quan tương đối chính xác là được

FE tổng kết nhanh về cấu trúc
    lib core 
        auth, guard, interceptor, const claims, http client, event bus, component register, firebase, i18n/Transloco, pipe ... là wrap các base dùng chung theo 1 cách mà project cần , (auth cần tuân thủ theo BE auth attribute về logic kiểm tra quyền)
    lib shared
        - các component share cần bắt đầu với prefix: **tot-** (ví dụ: `tot-button`, `tot-table`, `tot-autocomplete`...)
        - một số component hay dùng
            - quy chuẩn các nút thao tác vd button , icon button ... khi click cần có loading trên nút để người dùng biết đã click và đang xử lý cho tới khi có kết quả thì ẩn loading
            - droplist auto complete sẽ cần dạng cho phép chọn nhiều , hoặc chọn signle item, có thể cho phép scroll để paging load khi scroll tới cuối danh sách thì tự động load thêm, cho phép add value vào session storage để lần đầu vào là có dữ liệu đã sẵn, khi paging hoặc tìm kiếm thì sẽ thêm các value lấy được chưa có ở session storage vào session hiện có. cần có loading khi đang lấy dữ liệu. tùy vào yêu cầu mà cần gọi lên server lấy hoặc data. page size mặc định 10
            - table cần có các tính năng cốt lõi và nâng cao sau:
                - **Layout Cao cấp**: Bảng phải được bọc trong `nz-card` (sử dụng input `title` và `extra` của `tot-table`).
                - **Paging (Phân trang)**: Luôn hiển thị thanh phân trang (`nzHideOnSinglePage: false`). Cho phép chọn page size 5, 10, 20, 25, 50, 100, 200. Mặc định là 10.
                - **Cột Hành động**: Cố định bên phải, độ rộng ~150px, các nút chức năng xếp dọc (mỗi nút một dòng) và sử dụng `tot-button`.
                - **Đồng nhất màu sắc**: Header màu `#fafafa`, các ô dữ liệu (kể cả cột fixed) màu `#fff`.
                - **Sort & Filter**: Hỗ trợ sắp xếp và bộ lọc tìm kiếm cho từng cột.
                - **Expandable Rows**: Mở rộng dòng để hiển thị nội dung chi tiết qua `expandTemplate`.
                - **Hiệu năng**: Hỗ trợ Virtual Scroll cho danh sách dữ liệu lớn.
    lib module tên nghiệp vụ (business-dashboard, business-files-folders, ...) tên không bắt buộc bằng business
        dùng core, shared
        không được phép dùng trực tiếp component hay bất kỳ gì của module nghiệp vụ khác
            dùng thông qua event buss, message buss, component regsiter 
    app shell, app chính 
        cấu hình lazy load các module nghiệp vụ , khi cần dùng tới thì mới load 
        layout , theme, style, menu, breadcrum, route ...
        đăng ký các module nghiệp vụ để dùng , 
**suy nghĩ và câp nhật vào TreeOfThought/docs/frontend/howtodo.md để tôi xem, không cần thực hiện cho tới khi tôi bảo**

**cập nhật 2026-05-16 22:22:22**
- [x] Cập nhật page size mặc định 10.
- [x] Sử dụng i18n và Transloco cho phần đa ngôn ngữ.
- [x] Bắt buộc dùng `tot-button` cho các nút và `tot-table` cho danh sách dạng bảng.

**cập nhật 2026-05-17 12:46:36**
paging cho việc lấy danh sách luôn cần là paging ở server, dùng tot-table cột action ( hành động ) luôn cần fixed để người dùng thao tác dễ, nếu có nhiều nút chức năng làm độ rộng cột action rộng quá thì mỗi nút sẽ tự động xuống 1 dòng để hiển thị , không co. tot-table các cell luôn cần hiển thị đủ text không bị overflow che mất 

**cập nhật 2026-05-19 13:46:36**
cần tạo tot-input vào shared đáp ứng cho việc
    input cho password cần có icon hiển thị password ( mẳt) khi click vào thì đổi icon và ẩn/hiện nội dung input
    input text thông thường 
    input text dạng area 

cần dùng tot-input password cho các nơi cần password trong

**cập nhật 2026-05-21 16:46:36**
cập nhật firebase ở core 
    cần lấy fcm token device id globaly để dùng cho chỗ khác ví dụ ở login khi login thành công sẽ lưu fcm token device id này cho user đó xem thêm ở TreeOfThought/docs/business-oidc/whattodo.md 
    đăng ký notification fcm global listener, msg notify display template global, dùng service worker firebase-messaging-sw.js để nhận noti ngay cả khi ko mở trình duyệt .
