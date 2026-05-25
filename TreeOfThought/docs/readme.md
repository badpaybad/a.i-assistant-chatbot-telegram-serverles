# Tree of Thought

Dùng các folder để chứa tri thức của dự án. Dựa trên việc chia ra để trị. Giúp LLM đi từ ngoài vào trong từ trong ra ngoài dễ dàng.

## Cách xây dựng teamm làm việc và solution

1. Xây dựng arch giải pháp cho toàn bộ
2. Viết core base infra
3. Viết các sample usage của core base infra
4. Viết hướng dẫn cho dev làm theo
5. Triển khai các nghiệp vụ theo yêu cầu

### Giải thích

Bước 1,2,3 là viết thành các quy chuẩn code đi theo giải pháp, đảm bảo sự nhất quán về các khái niệm được implement: clean arch, cqrs, kiss ...

Bước 4,5 là để scale dự án nhanh với nhiều team độc lập

#### BE tổng kết nhanh về mặt cấu trúc

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

#### FE tổng kết nhanh về cấu trúc

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

#### Summary arch

folder TreeOfThought/docs/arch là tổng hợp từ các folder khác trong TreeOfThought/docs

## Vd cách tạo các file md theo tree of thought

                yeucau.md intent, what to do do người viết

                phattrien.md là how to do do A.I viết 

### nghệp vụ IAM

                docs/iam/yeucau.md  ( mô tả về nguyên tắc, user có nhiều roles , acl là jj , db design, http rest ,...) 

                docs/iam/user/mô tả chi tiết về UI thao tác ... nghiệp vụ khi click nút edit ... về chức năng quản lý user 


                như vậy khi làm việc , chỉ cần goi skill : tot-dev.md cần fix bug iam với lỗi user ....log error ở đây ... là tự nó đọc iam/yeucau.md iam/phattrien.md + iam/user/yeucau.md ...

                bug thì chat vào box: titan-dev.md sửa lỗi xxx ở nghiệp vụ iam user lỗi như sau : ....

                titan-dev.md sẽ tự động update change vào yeucau.md về việc cập nhật bug này kia .... và cập nhật cho phattrien.md -> khi e đọc phattrien.md thấy nó mô tả đúng về lỗi và chỉ ra cáchlàm rồi -> titan-dev.md tiến hành fix

                Dev chỉ cẩn review phattrien.md để quyết định bảo A.I tiến hành thực hiện code
