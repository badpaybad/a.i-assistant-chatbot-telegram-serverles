folder làm việc: TreeOfThought/backend

Tham khảo hướng dẫn chung ở TreeOfThought/readme.md 

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
            - Google firebase
                - Cho phép khởi tạo nhiều firebase thông qua json file
                - Tạo custom token để FE có thể login vào firebase 
                - Firestore
                    - Subscribe address path
                    - Publish to address path
                    - Delete address path
                - FCM 
                    - Push notification theo token device id
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
            