folder làm việc chính : TreeOfThought/backend/Core.Infra.Cqrs
đọc các yêu cầu về cqrs các file *.md ở folder TreeOfThought/docs/backend có thể cần xem code để hiểu rõ CqrsDispatcher là nghiệp vụ trung tâm điều phối logic pub sub , equeue, dequeue

khi UI hoặc 1 nghiệp vụ bất kỳ khi publish ,push , enqueue thì command và event cần có tracking id , đây là tracking id yêu cầu gốc
    Ở controller nếu check UI request ko gửi lên tracking id hoặc request id thì có thể tạo để push  publish hoặc enqueue
Cần log được toàn bộ quá trình tracking id theo thời gian khi được transform rồi gửi nhận lên queuename và topic khác nhau (dequeue, subscribe ...)
    các thông tin log : class name của hàm handle, type của command event , data của command event (lấy fulltype name có namespace cho cả class handle class event class command )
    khi worker dequeue hoặc nhận được data từ queue hoặc topic nên log lại thông tin của event/command đã nhận được, tracking id sẽ không thay đổi gì để đảm bảo việc xuyên suốt xử lý từ 1 yêu cầu gốc. có thể transform hoặc mapping từ command sang event , command này thành command khác, event sang command, event sang event ... nếu trước đó tracking id đã có sẽ không thay đổi

để tránh nặng redis cần dùng postgresql để lưu trữ thông tin log. cần tuân thủ TreeOfThought/backend/Core.Infra.Data để có dbcontext riêng từ appsettings.json vd "Cqrs":{"Postgresql": "...connection string..."}
    cần thiết kế db đạt mục tiêu về các việc sau:
        - khi tracking id đc tạo ra đầu tiên, thường nằm ở việc enqueue send data lên queue name, hoặc publish lên topic thì được tính là root, là message gốc
                - Nguồn phát ra tạo hoặc mapping request thành command event message thường từ UI FE xuống controller, có thể lấy thông tin controller làm nguồn
                - Nguồn phát ra tạo command event message trực tiếp từ 1 nghiệp vụ BE thì có thể lấy theo thông tin của class tạo ra
            - Để dễ dàng biết được đâu là message gốc (root)
                - các event hay command ở controller tạo ra được tính là root, khi controller dùng cqrsdispatcher send ,equeue, publish ...
                - ở 1 nghiệp vụ cụ thể thường là ở scheduler, hoặc ở startup chương trình tạo ra các command event thì nó là root, cần được viết rõ ràng khi mô tả nghiệp vụ sẽ chỉ ra message root ban đầu

        - append only đảm bảo tracking id luôn biết đc các sự kiện đi đâu và đang ở đâu
        - biết message xủ lý bị lỗi ở đâu queuename nào topic nào, lỗi là gì , data command event lúc xử lý bị lỗi ( phục vụ cơ chế retry ...)
        - lấy queuename / topicname làm gốc để tra cứu
            - các class handler, các worker, các command or event thộc về queuename, topic name
            - lấy được các message thuộc về queuename, topicname
                - enqueue lúc nào
                - publish lúc nào
                - dequeue lúc nào
                - subscribe nhận dược lúc nào
            - với topic name
                - sẽ có nhiều subscriber , mỗi subscriber có queue name data riêng

        - dễ dang vẽ được sơ dồ của 1 tracking id, lấy tracking id làm gốc
            - theo thời gian tạo ra lúc nào
            - biến đổi thành data nào message nào lên queue hay topic nào
            - xử lý ở handler nào worker nào
            - lỗi ở đâu class nào và data lúc lỗi là gì để phục vụ mục đích  retry
            - cần chỉ ra message gốc ban đầu khi tracking id được tạo ra
            - sau khi xử lý message gốc sẽ biết được toàn bộ chuỗi workflow đã xử lý thành công, hay lỗi 
                - chỉ ra được điểm bắt đầu ở đâu topic or queue nào, controller ,worker, handler, command or event nào ( cần lấy fullname có cả namespace của các class)
                - chỉ ra được điểm kết thúc ở đâu topic or queue nào, controller ,worker, handler, command or event nào ( cần lấy fullname có cả namespace của các class) lỗi hay ko lỗi 
        
        - mỗi topic name sẽ có nhiều subscribe , mỗi subscriber có queue data riêng, cần dảm bảo chỉ ra được subscriber queuename thuộc topic nào 

việc thống kê về tổng số message vẫn dùng redis
    - tổng số message
    - tổng số message xử lý thành công
    - tổng số message xử ly lỗi
    - tổng số messagne đang xử lý
    - tổng số message theo queue name /topic name
    - tổng số messange đang xử lý theo queuee name / topic name
    - tổng số message xử lý thành công theo queue name/topic name
    - tổng số message xử lý lỗi theo queue name/topic name

**chú ý** đọc file TreeOfThought/backend/Core.Infra.Cqrs/yeucau.md cần tạo file TreeOfThought/backend/Core.Infra.Cqrs/phattrien.md để tôi review trước khi tiến hành code. Khi có cập nhật ở yeucau.md cũng cần cập nhật cho phattrien.md để tôi xem trước khi tiến hành code
