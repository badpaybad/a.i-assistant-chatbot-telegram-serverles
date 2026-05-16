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

các component của các nghiệp vụ mà dùng qua lại của nhau thì cần như thế nào. vd ở ckeditor sẽ cần tới component của file and folder làm nút plugin trên tool bar. tương tự có nghiệp vụ khác cần dùng ckeditor và đưa plugin vào để sử dụng . hoặc dashboard sẽ cần tới các module nghiệp vụ để hiển thị dữ liệu

các component directive pipe liên quan tới auth, cần đưa lên core để thống nhất trong 1 solution về ẩn hiện UI, truy cập compnonent ... element , về truy cập url ...
    các key dùng để đăng ký dùng component ở các module khác nhau, nên cần có const ở core để nắm bắt và điều phối chung khi cần  

khi phát triển nghiệp vụ mới, FE cần tạo thư viện là thành folder con {tên nghiệp vụ} trong TreeOfThought/frontend/web/projects/tot
    tuẩn thủ về dùng các thư viện core, shared
    các nguyên tắc về đăng ký routing , component, command event 
    có thể đưa vào app chính TreeOfThought/frontend/web/src/app để dùng hoặc test 
    không nhất thiết các nghiệp vụ sẽ có prefix là business phụ thuộc vào yêu cầu của người dùng cần lấy tên liên quan tương đối chính xác là được

**suy nghĩ và câp nhật vào TreeOfThought/docs/frontend/phattrien.md để tôi xem, không cần thực hiện cho tới khi tôi bảo**
