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

    - Tổng số worker đang chạy
    - Tổng số worker stop
    - Tổng số worker

**chú ý** đọc file TreeOfThought/backend/Core.Infra.Cqrs/whattodo.md cần tạo file TreeOfThought/backend/Core.Infra.Cqrs/howtodo.md để tôi review trước khi tiến hành code. Khi có cập nhật ở whattodo.md cũng cần cập nhật cho howtodo.md để tôi xem trước khi tiến hành code

**cập nhật 2026-05-26 20:12:12**

Cần check lại cập nhật việc ghi nhận tracking và cá bước khi xử lý của cqrs dispatcher:
    - command / command handler:
        đầu hàm send ghi là sending lấy type fullname source nào sending queue name nào command nào.
        send thành công cuối hàm send ghi là sent lấy type fullname source nào sent queue name nào command nào.
        dequeue xử lý thì là processing lấy type fullname : queue name nào handle nào worker nào command nào.
        xử lý xong lỗi thì ghi error lấy type fullname : queue name nào handle nào worker nào command nào.
        xử lý xong thành công ghi success lấy type fullname : queue name nào handle nào worker nào command nào.
    - event / event handler
        đầu hàm publish ghi là publishing lấy type fullname source nào publish topic name nào event nào.
        publish và gửi thành công lên tất cả các queue data của từng subcriber (cùng 1 topic) trigger publish redis ghi published lấy type fullname source nào published topic name nào event nào
            subscriber dequeue là processing cho queue name của chính subscriber lấy type fullname : handle nào worker nào topic name nào event nào.
            subscriber invoke xử lý xong lỗi thì ghi error lấy type fullname : handle nào worker nào topic name nào event nào.
            subscriber invoke xử lý xong thành công ghi success lấy type fullname : handle nào worker nào topic name nào event nào.

**cập nhật 2026-05-26 20:20:12**

class SampleEventHandlerAlwaysError là giả lập nghiệp vụ fail, bị lỗi throw exception. nhưng khi chạy sao tracking lại ghi nhận báo lỗi cả SampleEventHandler
FE post test command TreeOfThought/backend/Core.Web.Api/Controllers/TestController.cs
    SampleEventHandler có 1 handle không lỗi nhưng report log lại lỗi là không đúng
                    curl '<http://localhost:5000/api/cqrs/dashboard/messages/sub_queue:sample.event:SampleEventHandler?page=1&pageSize=10>' \
            -H 'Accept: application/json, text/plain, */*' \
            -H 'Accept-Language: en-US,en;q=0.9,vi;q=0.8' \
            -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGY0NzdjLTFlZjEtNDZjYi04Y2U5LTEwNTAyZjRmZDI3MiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGZkM2RlNS04YjJjLTQ5ZDgtYjhhNi1lZmMxNmNiNWE2NjciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJuYW1lIjoiQWRtaW5pc3RyYXRvciIsImp0aSI6ImU1MDJlNjA2LTQzZGUtNGJlMy04MDZjLTQ3ODU3NmEwN2FiOSIsImlhdCI6MTc3OTM1NDAzNiwidXNlcklkIjoiY2RmZDNkZTUtOGIyYy00OWQ4LWI4YTYtZWZjMTZjYjVhNjY3IiwicGljdHVyZSI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kdW5wLXRlc3QtZ2NzL2F2YXRhcnMvY2RmZDNkZTUtOGIyYy00OWQ4LWI4YTYtZWZjMTZjYjVhNjY3XzYzOTE0NTk0ODQxNTI1NjI1MC5qcGciLCJyb2xlIjpbIkFkbWluIiwicHVibGljIl0sImNsYWltcyI6WyJiZS5hZG1pbiIsImZlLmNxcnM6ZGFzaGJvYXJkOnZpZXciXSwibmJmIjoxNzc5MzU0MDM2LCJleHAiOjE3NzkzNTc2MzYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6IlRyZWVPZlRob3VnaHQuRkUifQ.igUwiFPrUmhOyLak_YOEOvY_8rGQFwmn1cllc9mP2G0hDLXHLCp7fdarBGVp9P7kSEAgew5PFqHvZSpUlkcco4ibap_fa7XsSZYmA_5TuLDM2OtWvh45a0SoOeJd18QGt87FgbNwqrh7q9eRqp_iJKAvx8rtjpB158iqeDxEZAgMGyxuKCY8ejna4p1oEeKWPc-lNAjg53r_918MwlPgM0t3Ub5wJNE1zySApV5j3i-4gjDPDvgAwnsIbFSyTnpnZxrxuUSsXwvJknZZOHV4vsC3EkFqWQGoEDrpO2hANgZk8EKa_EoFEUJULrwakaTmzsOa7nHnghI59dLO5mzi6w' \
            -H 'Cache-Control: no-cache' \
            -H 'Connection: keep-alive' \
            -H 'Content-Type: application/json' \
            -b 'TOT_SSO_SESSION=CfDJ8KDUUcfP1nNFlF5gAObaJPCtI-RN23KZ9YadfJ0PuS8r98isQeV3T8TvWHAnaveG7ion4SKtUHS37PpSTqyz8I9oNagBT-HBIh4Y7E1za_d-rQ4z4GpDaphyPSuU9nQYOX8xpY11yikZZpa9WmLuULyie3Zd8yKDqG7QA3bUTaet3Q3BgowrLrIeCa4VSt1aOpwuoOStaKtk9OcPt55cOp9Y2I_hWjwx9GlVWUKXboWl89UtEwrh-Y7rSpeoT-BctOGZ680LlQUKXHsW6AdRReII_MK0Mer5vSO0PZCE0zekeK4RFxaKNcu5nWwnk_GB6lmc-g3oqEPpcwwVKTR30NxjsJ9cOP1HbYxcByS85QtgFMusA23a79ePjTRKzlK0yISJ5SnZ3Dd1ZhVHOrLqHPw' \
            -H 'Pragma: no-cache' \
            -H 'Referer: <http://localhost:5000/admin/modules/cqrs-dashboard>' \
            -H 'Sec-Fetch-Dest: empty' \
            -H 'Sec-Fetch-Mode: cors' \
            -H 'Sec-Fetch-Site: same-origin' \
            -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36' \
            -H 'sec-ch-ua: "Chromium";v="148", "Google Chrome";v="148", "Not/A)Brand";v="99"' \
            -H 'sec-ch-ua-mobile: ?0' \
            -H 'sec-ch-ua-platform: "Linux"'

    SampleEventHandlerAlwaysError có 1 handle lỗi thì đúng là lỗi 

                curl 'http://localhost:5000/api/cqrs/dashboard/messages/sub_queue:sample.event:SampleEventHandlerAlwaysError?page=1&pageSize=10' \
            -H 'Accept: application/json, text/plain, */*' \
            -H 'Accept-Language: en-US,en;q=0.9,vi;q=0.8' \
            -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGY0NzdjLTFlZjEtNDZjYi04Y2U5LTEwNTAyZjRmZDI3MiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGZkM2RlNS04YjJjLTQ5ZDgtYjhhNi1lZmMxNmNiNWE2NjciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJuYW1lIjoiQWRtaW5pc3RyYXRvciIsImp0aSI6ImU1MDJlNjA2LTQzZGUtNGJlMy04MDZjLTQ3ODU3NmEwN2FiOSIsImlhdCI6MTc3OTM1NDAzNiwidXNlcklkIjoiY2RmZDNkZTUtOGIyYy00OWQ4LWI4YTYtZWZjMTZjYjVhNjY3IiwicGljdHVyZSI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kdW5wLXRlc3QtZ2NzL2F2YXRhcnMvY2RmZDNkZTUtOGIyYy00OWQ4LWI4YTYtZWZjMTZjYjVhNjY3XzYzOTE0NTk0ODQxNTI1NjI1MC5qcGciLCJyb2xlIjpbIkFkbWluIiwicHVibGljIl0sImNsYWltcyI6WyJiZS5hZG1pbiIsImZlLmNxcnM6ZGFzaGJvYXJkOnZpZXciXSwibmJmIjoxNzc5MzU0MDM2LCJleHAiOjE3NzkzNTc2MzYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6IlRyZWVPZlRob3VnaHQuRkUifQ.igUwiFPrUmhOyLak_YOEOvY_8rGQFwmn1cllc9mP2G0hDLXHLCp7fdarBGVp9P7kSEAgew5PFqHvZSpUlkcco4ibap_fa7XsSZYmA_5TuLDM2OtWvh45a0SoOeJd18QGt87FgbNwqrh7q9eRqp_iJKAvx8rtjpB158iqeDxEZAgMGyxuKCY8ejna4p1oEeKWPc-lNAjg53r_918MwlPgM0t3Ub5wJNE1zySApV5j3i-4gjDPDvgAwnsIbFSyTnpnZxrxuUSsXwvJknZZOHV4vsC3EkFqWQGoEDrpO2hANgZk8EKa_EoFEUJULrwakaTmzsOa7nHnghI59dLO5mzi6w' \
            -H 'Cache-Control: no-cache' \
            -H 'Connection: keep-alive' \
            -H 'Content-Type: application/json' \
            -b 'TOT_SSO_SESSION=CfDJ8KDUUcfP1nNFlF5gAObaJPCtI-RN23KZ9YadfJ0PuS8r98isQeV3T8TvWHAnaveG7ion4SKtUHS37PpSTqyz8I9oNagBT-HBIh4Y7E1za_d-rQ4z4GpDaphyPSuU9nQYOX8xpY11yikZZpa9WmLuULyie3Zd8yKDqG7QA3bUTaet3Q3BgowrLrIeCa4VSt1aOpwuoOStaKtk9OcPt55cOp9Y2I_hWjwx9GlVWUKXboWl89UtEwrh-Y7rSpeoT-BctOGZ680LlQUKXHsW6AdRReII_MK0Mer5vSO0PZCE0zekeK4RFxaKNcu5nWwnk_GB6lmc-g3oqEPpcwwVKTR30NxjsJ9cOP1HbYxcByS85QtgFMusA23a79ePjTRKzlK0yISJ5SnZ3Dd1ZhVHOrLqHPw' \
            -H 'Pragma: no-cache' \
            -H 'Referer: http://localhost:5000/admin/modules/cqrs-dashboard' \
            -H 'Sec-Fetch-Dest: empty' \
            -H 'Sec-Fetch-Mode: cors' \
            -H 'Sec-Fetch-Site: same-origin' \
            -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36' \
            -H 'sec-ch-ua: "Chromium";v="148", "Google Chrome";v="148", "Not/A)Brand";v="99"' \
            -H 'sec-ch-ua-mobile: ?0' \
            -H 'sec-ch-ua-platform: "Linux"'

cần kiểm tra và sửa đúng
