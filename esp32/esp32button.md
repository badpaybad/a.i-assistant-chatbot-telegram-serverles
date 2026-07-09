tính năng về các nút vật lý cho esp32os xem các yêu cầu đã làm ở esp32/whattodo.md
các chân đấu đặc biệt sẽ không được đụng vào , như chân cho nút boot và reset trên esp32, các chân dành cho ram mở rộng tốc độ cao , các chân đã sử dụng ...

custom button reset cần thiết kế 1 nút bấm để khi nhấn giữ 10 giây sẽ reset config sau khi khởi động lại người dùng tự connect hostpot của esp32 và điền thông tin cấu hình vd ssid , esp32 hub domain or ip port , firebase key ... các key được người dùng nhập thông qua esp32/esp32os/esp32uiconfig.ino
    file esp32button.ino mô tả khai báo chân đấu nối tới esp32 và logic reset, khai báo và dùng ở esp32os, khi người dùng nhấn giữ 10s sẽ reset toàn bộ config và khởi động lại esp32
custom button reset dùng GPIO 2 còn GPIO 0,1 vẫn dùng theo mạch thiết kế 

