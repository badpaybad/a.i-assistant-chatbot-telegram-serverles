folder làm việc: TreeOfThought/backend

**Tuân thủ hướng dẫn chung ở TreeOfThought/1st.md**

Đọc kỹ TreeOfThought/backend/yeucau.md suy nghĩ viết ra giải pháp và cách làm vào TreeOfThought/backend/phattrien.md nếu có thay đổi cần thêm vào TreeOfThought/backend/yeucau.md và yêu cầu AI suy nghĩ viết giải pháp cách làm vào TreeOfThought/backend/phattrien.md . Sau khi review TreeOfThought/backend/phattrien.md sẽ xác nhận để tiến hành code

Các yêu cầu:
    - Dùng dotnet core c# version 8 (net8.0 nếu chưa có tự cài thêm)
        - Tạo project core infra đáp ứng yêu cầu:
            - Các cấu hình cần được đọc từ file appsettings.json
            - Base EF kết nối được sqlserver, postgresql, mysql, mongodb
                - Các nghiệp vụ cần kế thừa, khi khởi tạo đưa connection string qua constructor 
                - Khai báo các dbset, entity để làm việc với các loại db
                - Hỗ trợ việc log debug các linq to sql text, linq to nosql text (eg mongodb query)
                - Các entity cần kế thừa chung interface base entity, mỗi loại nghiệp vụ cần thêm entity thì kế thừa và định nghĩa thêm field, property riêng.
                - Không dùng migration của entity framework. 
                    - Mongodb tự động sinh collection
                        - Cho phép lỗi về việc missing field, thiếu property
                        - tham khảo code ở folder /work/cloud/cloud.core/src/mongodb bổ xung cho phù hợp. cho phép đinh nghĩa entity và dbset cho mongodb. Cần đảm bảo Dbset của mongodb có thể thực hiên linq như dbset của EF với các method Add, Update, Delete, FirstOrDefault Async, ...
                    - Relation db cần đảm bảo đã có table trước khi dùng. 
                        - Có hàm để sinh ra các sql tạo bảng dựa trên entity nếu bảng chưa có. Không tự chạy, khi cần chạy gọi riêng và thực thi độc lập.
                - Tạo các hàm bulk insert, update, delete . bluk update hỗ trỡ update full entity, partial entity
                - Hỗ trợ fulltext search, tìm kiếm cho phép cả tiếng Việt có dấu và tiêng Việt không dấu 
            - Base redis dùng làm cache, queue, event bus
                - Hỗ trợ cả standalone và cluster
                - Event bus cần đáp ứng:``
                    - publish event
                    - subscribe event
                    - retry send event
                    - prevent loss message
                    - cho phép khai báo hàm và topic để xử lý
                - queue cần đáp ứng:
                    - enqueue 
                    - dequeue 
                    - retry queue
                    - prevent loss message
                    - cho phép khai báo hàm và queue name để xử lý
                - cache cần đáp ứng:
                    - get cache
                    - set cache
                    - delete cache
                    - set expire cache
            - Base cqrs handle cần đáp ứng:
                - Dựa trên Base redis
                - Các hàm khai báo queue name và hàm xử lý data của queue name đó
                    - Command handle
                        - Khi controller nhận request enqueue commnad lên queue name, thì command handle được khai báo xử lý queue name đó sẽ dequeue và xử lý
                - Các hàm khai báo topic và hàm xử lý data khi subcribe topic name đó
                `    - Event handle
                        - Khi controller nhận request publish event to topic name, thì event handle được khai báo xử lý topic name đó sẽ publish data
                - Các hàm để enqueue command
                    - Có option memory mode, tức là sẽ gọi các hàm handle được đăng ký xử lý ngay không thông qua redis 
                    - Cần worker tự động dequeue và gọi handle để xử lý data
                - Các hàm để publish event lên topic
                    - Có option memory mode, tức là sẽ gọi các hàm handle được đăng ký xử lý ngay không thông qua redis 
                    - Mỗi subscribe cần có queue data riêng, khi publish lên topic là enqueue lên queue data riêng đó. Rồi bắn event lên topic để các subscribe topic đó sẽ khơi chạy while true gọi handle xử lý hết các data trên queue data riêng đó. rồi lại đợi có data change khi publish lên topic  
                - Cần tạo base command và base event để kế thừa
                    - Đảm bảo đủ thông tin để log tracking nếu có lỗi và truy vết hoặc retry 
                - Quản lý được queue name, topic name sinh ra từ đâu, và xử lý ở đâu 
                    - Cùng queue name chỉ cho phép đăng ký nhiều handle cùng command type cùng handle type
                - Xử lý về network timeout, crash có thể chạy lại và không mất data trên queue và có thể chạy khi khởi động lại
                - Cần thống kê về số lượng command, event, queue name, topic name, handle type, command type. Có thể vẽ được biểu dồ đi lại của command và event thông qua id , đi từ queue nào sang queue nào, sang topic nào sang topic nào, queue sang topic, topic sang queue 
                - Cần quản lý được các handle ( command handle, event handle) để cho phép điều khiển start, stop và check được trạng thai hoạt động 
                - Đăng ký các handle (command, event) đều là singleton
            - Google firebase
                - Cho phép khởi tạo nhiều firebase thông qua json file
                - Tạo custom token để FE có thể login vào firebase 
                - Firestore dùng để phục vụ FE khi người dùng đang ở 1 màn hình, thực hiện action có request id gửi lên. BE nhânj được dữ liệu khi xử lý nghiệp vụ thành công sẽ bắn trả noti lên, coi request id là topic address path 
                    - Subscribe address path
                    - Publish to address path
                    - Delete address path
                - FCM 
                    - Push notification theo token device id
                    - Get token device id theo custom token 
                - Google cloud storage
                    - Upload file
                        - Cho phép có url để share cho người nhận được link vĩnh viễn
                    - Cho phép set thời gian expired url download file, read file từ file đã upload
                    - Download file
                    - Delete file
                    - Đọc binnary và load trên bộ nhớ để xử lý (vd file .docx, .pdf, .txt, .pptx, .jpg, .png, .mp4 ...)
                    - List file theo path đưa vào
                    - List folder thêo path đưa vào

        - Kiểm thử : Tạo các project test trong folder TreeOfThought/backend/test
            - Viết các class handle sample và đăng ký để test
            - Tạo unit test project riêng
                - Các connection string để test cho project cần để trong file appsettings.json của project test
            - Tạo thêm test chạy console app giả lập cqrs và handle ( test cả event lẫn command )
                - Các connection string để test cho project cần để trong file appsettings.json của project test
            - Tạo prj để test connect crud sample entity cho monogodb,mysql,postgresql, mssql
                - cấu hình connection để ở appsettings.json 
                - test việc khai báo entity, khai báo dbset cho : monogodb,mysql,postgresql, mssql
                - test các bulk update,insert, delete, partial update
                - viết các test query select by id, tìm kiếm fulltext search có paging, tìm kiếm theo property có paging và order by property
            - Tạo prj để test google firebase
                có thể dùng file json admin sdk TreeOfThought/backend/realtimedbtest-d8c6b-firebase-adminsdk-luofp-e7b3882eb3.json có thể copy file này vào root web ứng dụng

        - Tạo prj web ứng dụng BE dùng asp.net core restful api đạt các yêu cầu :
            - Có swagger để xem các đầu api, cho phép tắt bật ở appsettings.json
            - Chop phép cấu hình port chạy ở appsettings.json với binding address 0.0.0.0, cần chạy https
            - Tạo mock dữ liệu user trên memory (tạo data sẵn ở code mock) để test
            - auth login với username, password để tạo jwt token key secret ở appsettings.json cho FE, và firebase custom token để FE app firebase login tự động. user có 1 email chính để làm SSO với google, MS, facebook
            - auth verify token, refresh jwt token
            - auth có api get user info đang đăng nhập, cần apply auth attribute đã đăng nhập
            - Middleware auth để làm attribute cho các route (class, function) cần check quyền:
                - đã đăng nhập ( chỉ cần valid jwt token với key secret ở appsettings.json)
                - đưa claim vào constructor attribute thì cần check với jwt token ở header và check có claim đó hay không, có nhiều claim để check có 1 trong các claim là được 
            - Người dùng có thể signup bằng username và password **bắt buộc** cầu nhập tên display name và email address, email address cần phải được verify bằng code gửi về email. Verify bằng việc mở url do BE trả về chứa token verify. Khi verify thành công thì mới login được, email đã được verify thì không cần verify lại khi login với username và password 
            - Người dùng có thể signup bằng tài khoản google, ms, facebook yêu **bắt buộc** cầu nhập tên display name và email address
                - Khi SSO với google, ms, facebook thành công sẽ tạo 1 user mới và lưu vào mock data memory nếu chưa có. Nếu có rồi thì login luôn với user có email trùng ( email đã được verify) 
                - Khi SSO với google, ms, facebook thất bại thì trả về lỗi  
            - Tạo api controller để test các chức năng của google firebase trong của prj core infra
            - Tạo api controler để test các chức năng của cqrs core trong của prj core infra
                - controller enqueue command , publish event
                - Các class sample handle command và handle event để test ( sử dụng command hay event do controler tạo ra )
                - cần auth attribute "cqrs-test"
            - Cho phép cors tất cả các origin , allow nhiều method, allow nhiều header, và cho phép credential, cho phép các web khác được load vào thành iframe allow mic, webcam, ...

        - Docker file cho web ứng dụng
            ubuntu 24.04

        - Docker compose cho db test
            - Tạo các db cần thiết như redis, postgres, mysql, mongodb theo yêu cầu ở local với account: root password: Test123456 rồi cập nhật vào appsettings.json của web ứng dụng để chạy được các api controller test ở trên. redis cũng cần mật khẩu: Test123456
            - cần tạo folder TreeOfThought/backend/db_test và mount volume các db ra ngoài để dữ liệu có thể dùng dev mà không bị mất

**cập nhật 1**

                    - Mongodb tự động sinh collection
                        - Cho phép lỗi về việc missing field, thiếu property
                        - tham khảo code ở folder /work/cloud/cloud.core/src/mongodb bổ xung cho phù hợp. cho phép đinh nghĩa entity và dbset cho mongodb

    bổ xung test với dbset cho monogdb context
    cần đảm bảo Dbset của mongodb có thể thực hiên linq như dbset của EF với các method Add, Update, Delete, FirstOrDefault Async, ...


**cập nhật 2** 

    hiện tại IBaseEntity đang có sẵn các property, tốt nhất IBaseEntity không có sẵn property nào, 
                public interface IBaseEntity
                {
                    Guid Id { get; set; }
                    DateTime CreatedAt { get; set; }
                    DateTime? UpdatedAt { get; set; }
                    string? CreatedBy { get; set; }
                    string? UpdatedBy { get; set; }
                }

    đổi IBaseEntity thành IBaseTrackingEntity 

ở dbset của mongodb đang có hàm này bị phụ thuộc vào entity có Id type guid cần bỏ đi. 
    Task DeleteAsync(Guid id);

**Cập nhật 3**

Bổ xung tách auth vào core infra auth để làm các việc 
    - dùng các base core infra
    - auth attribute middleware tập trung để xử lý validate token, authenticate , authorization ...
    - các controller liên quan auth

Các nghiệp vụ khi phát triển cần tạo project riêng: dùng lại các core infra base, tuân thủ về cqrs , các handle command, event, queries, và api controller riêng của nghiệp vụ đó. cần dùng core infra auth để chung về cơ chế xử lý auth attr 

**Cập nhật 4**
core infra auth bỏ mock và tạo db postgres riêng để dùng.
khi chưa có tài khoản admin ban đầu của hệ thống cần tạo mới.
Bổ xung việc quản lý các permision
    - claims : là định nghĩa ở code là claim trong auth attr, hoặc được UI gửi lên thông qua việc đồng bộ claims.
    - cần api quản lý role là nhóm các claims 
    - cần api quản lý user có role nào (1 user có thể có nhiều role)
    - cần api quản lý claims nào có trong role nào
    - cần api quản lý user có claims trực tiếp (effective claims) (1 user có thể có nhiều claims)
    - login sinh jwt token cần bổ xung role và claims của user vào trong token
    - cần auth attribute có thể dùng để check quyền
        - check theo claims
    - bổ xung để dùng cả RBAC và ACL 
    - bổ xung để tương tích openid connect 
    - user chỉ có 1 email làm key SSO, user có thể có nhiều email nhưng chỉ duy nhất 1 email active được phép dùng làm SSO ( email active là email đã được verify )
    - Auth attribute bổ xung cho phép check quyền OR hoặc AND mặc định là OR 
        - Bổ xung việc xử lý ACL trong auth attribute để check quyền có trong danh sách được phép, cần dùng redis (cần code dùng redis ở core infra base) để xử lý do ACL có thể có rất nhiều. 
        IEntity<TKey> là các project khác nhìn được, IBaseEntity private prj để làm việc generic khi cần ở tại project
    - Khi tạo jwt chỉ có claims , còn role là để query các claims đi theo role theo user đó. 
        - Bổ xung cơ chế tự động check từ redis khi cần, nếu lượng claims trong jwt lớn hơn 30, thì bổ xung roles cho jwt khi login, và khi check thấy có roles auth attr sẽ vào redis lấy dữ liệu để check không ưu tiên các claim sẵn trong jwt 

**Cập nhật 5**
việc CqrsDispatcher đăng ký các handle đang thủ công các dòng code ở program, tôi cần bổ xung thêm việc auto đăng ký = reflection, cần làm đạt mục tiêu:
    - command , event có property queueu name , topic name , thì tự đăng ký handle theo, không bổ xung thêm class attribute như DotNetCore.CAP 
        - kiểm tra nếu queue name , topic name empty thì throw exception biết được lỗi ở handle command nào event nào để xác định nghiệp vụ
    - code refection cần xem nếu cache được các value sau khi reflection thì dùng luôn
    - chỉ những hàm public của handle class mới cần auto đăng ký
    
**Cập nhật 6**

xác nhận về mô hình hệ thống dùng CQRS

    - command là action từ UI FE, controller convert reuqest sang command rôi enqueue, hoặc gọi inmemmory invoke handle
    - handle command là nghiệp vụ 
    - nghiệp vụ xong cần publish event 
    - các nghiệp vụ quan tâm tới kết quả của nghiệp vụ khác cần subscribe event tương ứng
    - event bus là redis, cqrs là việc đang ký các handle và điều phối command và event.
    - auth theo core infra auth

Về luồng nghiệp vụ thay đổi dữ liệu:

                UI FE -> request -> proxy LB -> web container auto scale -> do bussines command handler container auto scale -> publish event -> publish UI FE by google firestore 

Về queries:
                Nằm trực tiếp ở các project viết trả cho controller
                Controller liên quan việc trả dữ liệu có thể cần cache theo request context (header, query string , body ...) , 
                cache:
                    ưu tiên cache 5s với memory nếu không có lấy trên redis, redis thì cache 10s, redis không có thì cần thực hiện query ở controller 


về scale ngang của các service :

                web container có jwt hoặc dùng chung core infra auth có redis làm session

                web container và các command handler container , event handler container nhìn chung event buss với CQRS

các nghiệp vụ sẽ được viết ở project riêng
                chỉ cần phát triển controller, handle, command, event , entity , dbcontext ... cho nghiệp vụ đó 

**cập nhật 7**

permission/sync giờ là claims/sync cần đã đăng nhập thì mới được gọi

**cập nhật 8**
user init hệ thống ban đầu chưa có db, cần init db có account là admin / pass: admin123. role đặc biệt không được xóa là Admin gán cho account admin , toàn quyền hệ thống không limit không restrict. khi init xong cần hiện UI để đổi mật khẩu cho admin. 

**cập nhật 9** khi người dùng được gán là role Admin hoặc claim admin , thì sẽ có quyền full không restrict. 
Không cho phép xóa role Admin ở quản lý role
không cho phép xóa claim admin ở quản lý claim
Không cho phép xóa account admin ở quản lý account

role Admin hoặc claim admin là đặc biệt là full quyền không hạn chế quyền (cần check từ BE). không thể bị chỉnh sửa, thêm xóa, khi check quyền thì cần ưu tiên role Admin hoặc claim admin, xem FE nếu cần TreeOfThought/frontend/web/yeucau.md

username, role, claim là không quan tâm hoa thường 