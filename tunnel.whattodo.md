đọc tunnel.whattodo.md tìm hiều viết cách làm vào tunnel.howtodo.md để tôi review 

ở program.py đang dùng cloud flare tunnel để lấy subdomain public cho local chạy Webhook của Telegram API ...
giờ cần làm 
- dùng subdomain public được cấp bởi cloudflare tunnel và nginx để làm proxy cho
    - webhook telegram (đang chạy chính ở myassitant/main.py)
    - rustdesktop remote server 
    - nginx có thể proxy pass tới các port local khác nhau theo path 
    - khi có subdomain từ tunnel cần gửi thông tin url subdomain, port rust desk những thông tin cần để rustdesk remote được, path uri proxy pass cho local port nào , gửi thông qua telegram tới user @badpaybad 
        - có cách nào để rustdesk client remote desktop chính rustdesk server 
            có thể tự động config luôn rustdesk client ở nhà và gửi id , pass của rustdesk clien home PC gửi qua telegram tới user @badpaybad
- có thể dùng cloudflared dạng dịch vụ để dùng cho rustdesk server và các dịch vụ khác 
- có thể chạy tất cả các cái trên trong initpc.py dạng subprocess, cần các cấu hình cho port local webhook, port local rustdesk, các uri path vào các local port web app  
- config có thể dùng config.py và mặc định là config_dunp
- nếu cần pull code hoặc cài đặt rustdesk server, rustdesk client, cloudflared , nginx,...  các app các service cần thiết để tự động cài đặt khi cần 
- viết các hướng dẫn sử dụng để dùng rustdesk client connect được tới rustdesk server dùng subdomain tunnel 
- khi chạy sẽ là lệnh: sudo python initpc.py full quyền cho việc chạy các subprocess khi cần  
- cần đảm bảo các dữ liệu trong config_dunp.py không bị lộ public, chỉ ở local dùng thông qua config.py 

câu hỏi cần xác minh:
tunnel.whattodo.md với yêu cầu và cách làm ở tunnel.howtodo.md đã giúp tôi có 1 subdomain miễn phí từ cloudflare và có thể truy cập PC at home như 1 server cloud với các dịch vụ mong muốn như: chatbot telegram cho nhóm, tạo server rustdesk cung cấp việc truy cập remote desktop và AI từ xa dùng , các dịch vụ web thông qua uri path để vào các local port web app?