cqrs-dashboard module

tiếp tục phát triển dựa trên BE xem TreeOfThought/backend/yeucau.md , FE xem TreeOfThought/frontend/web/yeucau.md

**cập nhật 2026-05-11 21:21:21**

ở dashboard cần bổ xung thêm thông tin chỉ ra queue name topic name được khai báo dùng với command nào, event nào, command handle nào, event handle nào

**cập nhật 2026-05-12 08:21:21**

vể command / event name : kiểm tra nếu tên (queue name , topic name) empty thì lấy theo type.fullname
command / event đều có Payload là data nghiệp vụ để xử lý

làm rõ về Theo dõi gần đây (Tracking): được sinh ra từ FE ( tracking id or request id) gọi lên api thì sẽ gán lại khi tạo command hỏặc event (nếu không có thì tự tạo tracking id), hoặc ở 1 tác nhân nghiệp vụ khác khi khởi tạo command / event . khi code nghiệp vụ cần chú ý việc kiểm tra nếu dequeue ra nhận để xử lý nghiệp vụ đã có tracking id thì phải giữ nguyên 
    - việc tracking này là append only, là chỉ thêm vào để tracking theo tracking id theo thời gian. dữ liệu xuyên suốt từ khi phát sinh đến lần cuối được xử lý.

**cập nhật 2026-05-12 11:30:24**
ở module test, test cqrs, test cho SampleCommand handler khi thành công cần publish event SampleEvent để minh chứng được sự liên kết command -> event theo dõi trên dashboard 
UI bổ xung thêm component test cqrs nút test api gửi cho command và event

**cập nhật 2026-05-12 11:40:24**
BE core infra base
    cần thiết kế để RedisService eventbus đơn giản là wrap redis stackexchange , đưa ra các hàm dùng có quy tắc về cache, queue, pubsub.... bỏ tracking ở rediservice, đưa drainQueue lên cqrs dispatch  
        queue
            có enqueue dequeue thông thường
            có enqueue dequeue theo priority

    ở dispatch cqrs cần 
        
        dùng enqueue và dequeue theo priority cho các queue data, với priority là epoch tính theo nano seconds của thời điểm dispatch

        từng queue name gốc, từng topic name gốc là lấy theo định nghĩa code ở các class event, class commnad.
        topic còn có các subscribe, mỗi subscribe có queue riêng 
            khi publish event là enqueue lên các subscribe riêng theo topic , rồi publish để trigger các subscribe drainQueue để xử lý
        lấy danh sách topic gốc
        lấy danh sách queue gốc
        lấy tên các subcriber theo topic
        lấy tên queuename của subscriber theo topic
        lấy tên queuename processing của subscriber theo topic

        việc lưu tên nhằm để quản lý tên queue, tên topic, cần chỉ ra thời điểm cuối được tạo ( khi code chạy ở data command event có khai báo tên queue name topic name). lưu có lần cuối các message được xử lý để xác định có những topic queue đã quá lâu không có xử lý gì 

        với queue dùng queue name làm gốc. (có thể là queue name của subscriber, có thể có multiple subscriber có queue name riêng)
            khi enqueue cần lưu lại số đếm enqueue theo queue name 
            khi invoke hàm bị lỗi cần lưu lại số đếm xử lý bị lỗi theo queue name
            khi invoke hàm thành công cần lưu lại số đếm xử lý thành công theo queue name
        
        với pubsub dùng topic name làm gốc. có thể có multiple subscriber với queue name riêng
            khi publish cần lưu lại số đếm publish theo topic name
            từng subscribe
                khi subscribe invoke hàm bị lỗi cần lưu lại số đếm xử lý bị lỗi theo topic name, subsribe name riêng
                khi subscribe invoke hàm thành công cần lưu lại số đếm xử lý thành công theo topic name, subsribe name riêng
            tổng số xử lý thành công theo topic name ( tổng thành công các subscriber)
            tổng số xử lý bị lỗi theo topic name (tổng lỗi các subscriber)

    việc tracking làm nằm ở nghiệp vụ cqrs, tracking append only cho các nơi sau, lưu lại các thời điểm và payload tại thời điểm tracking
        khi cqrs dispatch enqueue command  
        sau khi command handle dequeue và trước khi commnad handle invoke
        khi command handle invoke  bị lỗi
        khi command handle inovke thành công

        khi cqrs dispatch publish topic event
        từng subscriber:
            khi nhận được event và trước khi event handle invoke 
            khi subscriber event handle invoke bị lỗi
            khi subscriber event handle invoke thành công
        - việc tracking này là append only, là chỉ thêm vào để tracking theo tracking id theo thời gian. dữ liệu xuyên suốt từ khi phát sinh đến lần cuối được xử lý. cần lưu cả payload của message item tại thời điểm tracking

FE:

    ở tab Hàng đợi & chủ đề:
        bảng thống kê dữ liệu ví dụ như sau: (lấy danh sách queue name gốc và topic name gốc)
            | loại | tên topic/ queue | đang xử lý | đã xử lý thành công | đã xử lý lỗi | tổng message | danh sách worker | danh sách command handle / event handle | hành động |
            | -- | -- | -- | -- | -- | -- | -- | -- | -- | 
            |queue|sample.command|1|1|0|2|worker1,worker2|SampleCommandHandler, CommandHandler2...| Chi tiết, Xem đang xử lý |
            |topic|sample.event|1|1|0|2|worker1,worker2|SampleEventHandler,SampleEventHandlerAlwaysError,...| Chi tiết, Xem đang xử lý |

                đếm đang xử lý là lấy tổng theo queue processing của queue name 
                    với queuee name gốc = len queue name gốc + len processing queue name
                    với topic thì là tổng của len queue name theo subscribe + len queue name processing theo subscribe
                đếm đã xử lý thành công là tổng xử lý thành công 
                đếm đã xử lý lỗi là tổng xử lý lỗi 
            
            khi chi tiết click                
                khi Chi tiết click là command (xem các message đã xử lý )
                    modal hiện lên là bảng danh sách 
                        |thời gian| message item | trạng thái | hành động |
                        | -- | -- | -- | -- | 
                        | 2026-05-12 11:00:00 | {..sample command json..} | success | Gửi lại, Xóa |
                        | 2026-05-12 11:01:00 | {..sample command json..} | fail | Gửi lại, Xóa |

                khi chi tiết click là topic (xem các message đã xử lý )
                    modal hiện lên là các bảng danh sách theo tứng subsriber của topic đó, với mỗi subscriber là một tab
                        tab 1: sample subscriber 1
                            | thời gian | message item | trạng thái | hành động |
                            | -- | -- | -- | -- | 
                            | 2026-05-12 11:00:00 | {..sample event json..} | success | Gửi lại, Xóa |
                            | 2026-05-12 11:01:00 | {..sample event json..} | fail | Gửi lại, Xóa |
                        tab 2: sample subscriber 2
                            | thời gian | message item | trạng thái | hành động |
                            | -- | -- | -- | -- | 
                            | 2026-05-12 11:00:00 | {..sample event json..} | success | Gửi lại, Xóa |
                            | 2026-05-12 11:01:00 | {..sample event json..} | fail | Gửi lại, Xóa |

            khi Xem đang xử lý click
                modal hiện lên là các tab theo queue name đang xử lý của queue name , hoặc các queue name của subscribe theo topic . phụ thuộc loại 
                    

    ở tab Theo dõi gần đây:

        bảng dữ liệu lấy ra từ danh sách tracking đã lưu theo thứ tự thời gian, có phân trang 

            ví dụ:
                |tracking id|message item|Thời gian |trạng thái| hành động|
                | -- | -- | -- | -- | -- |
                |tracking-id-123|{..sample command json..}|2026-05-12 11:00:00|success|Gửi lại, Xóa|
                |tracking-id-123|{..sample command json..}|2026-05-12 11:01:00|fail|Gửi lại, Xóa|
                |tracking-id-123|{..sample command json..}|2026-05-12 11:02:00|success|Gửi lại, Xóa|
                
    ở tab Theo dõi worker:
        GIữ nguyên như hiện tại


    các table cần có thể scroll , cột hành động có thể fixed bên phải .

mô tả luồng để kiểm tra việc ghi nhận lên queue, processing, error, success:
    - UI gọi api test send command
    - Controler convert request thành sample command gửi lên queue 
    - Command Handle deuqueu lưu processing , try catch 
        nêú exception thì log vào zset error
        không exception thì lưu vào zset success , publish sample event lên topic ( gửi lên các queue data subsrciber của topic, pub sub trigger drainqueue) 
    - Từng subscribe họat động với queue data , dequeue lưu processing , try catch 
        nêú exception thì log vào zset error
        không exception thì lưu vào zset success
    - UI cqrs dashboard hiển thị dữ liệu từ các zset theo click refresh hoặc interval polling chọn ỏ droplist

BE - kiểm tra kỹ việc topic lưu định danh các subcriber name và queue name của subscriber name đó, để khi hàm publish gọi cần enqueue lên queue name của subscriber name,sau khi enqueue xong hết thì redis publish để trigger các subscribe chạy drainqueue. kiểm tra quy tắc đặt tên cần trùng nhau.
    khi dispatcher cqrs được gọi publish event việc enqueue lên queue name data của subscribe thì cần dùng logic đối xử như queue của command. sẽ luôn đảm bảo được thống nhất xử lý queue data khi tracking, khi dequeue (ở drainqueue) trước khi invoke hàm xử lý, rồi try catch lưu vào success error 

    drainqueue cũng giống như RegisterCommandHandlerAsync  while (!ct.IsCancellationRequested) ... khác ở chỗ publish event trigger và draindqueue xử lý và dừng khi empty queue. cần hàm dùng chung về xử lý dequeue, đảm bảo việc tracking , success, error zset  

FE    
    ở tab Hàng đợi & chủ đề:
        khi click chi tiết sẽ xem được các bảng theo các queue name của subscriber của topic đang xem các msg dữ liệu thành công và lỗi

    **cqrs bug 1** ở UI click gửi test sample command, SampleCommandHandler hàm HandleAsync(SampleCommand command) đã gọi  await _dispatcher.PublishAsync(new SampleEvent ... ở SampleEventHandler chưa thấy log xử lý gì , ở SampleEventHandlerAlwaysError cũng chưa thấy ghi ra lỗi  . xem chi tiết thì 2 bảng theo subscriber empty
        mở modal Chi tiết Topic: sample.event không thấy có dữ liệu nào ở 2 tab 
            SampleEventHandler     SampleEventHandlerAlwaysError

BE 
    để tránh nhầm lẫn cộng chuỗi sai các tạo tên queuename, tên topic name, từ redis cho đến cqrs dispatcher cần tạo các const prefix key, topic name, queue name. các data json quy chuẩn camelCase 