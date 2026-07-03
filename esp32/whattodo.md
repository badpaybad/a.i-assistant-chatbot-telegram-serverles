hiện esp32 đang cắm trên cổng usb /dev/ttyACM1
code file ở esp32/esp32os/esp32os.ino
cần tạo wifi hostport để esp32 phát ra 1 mạng wifi esp32os_dunp pass là esp32osdunp khi truy cập vào wifi này thì esp32 sẽ bật giao diện cấu hình wifi của mạng LAN để lưu ssid và mật khẩu. sau khi lưu xong cần connect vào ssid của mạng LAN và tắt wifi hostport. các thông số cần lưu sau khi reset hoặc rút điện bật lại cần tự connnect. esp32 cần log ra output về chất lượng wifi ssid mà nó connect 5 giây 1 lần.

**cập nhật 1** tách wifi setup và connect từ esp32/esp32os/esp32os.ino ra thành esp32wifi.ino rồi dùng trở lại vào esp32/esp32os/esp32os.ino 
    việc build UI web config wifi cũng cần để riêng thành esp32uiconfig.ino sẽ dùng để config thêm những thông tin khác thêm sau này. các config (wifi ...) cần lưu trữ để reset reboot , tắt đi bật lại vẫn dùng được
        cần lưu 5 config wifi ssid gần nhất để auto connect 

**cập nhật 2** cần tạo dạng esp32eventbus.ino rồi dùng cho các file ino khác , esp32eventbus cần cung cấp các hàm publish, subscribe . enqueue, dequeue. set , get
    publish là khi các nghiêp vụ khi xong cần gửi kết quả lên topic
    subscribe là khi các nghiệp vụ cần kết quả từ nghiệp vụ khác thông qua topic
    1 topic có thể có nhiều subscribe phân biệt bằng subscribe name , các subsribename không được trùng nhau.

esp32eventbus này cần boot lên chạy ở thread khác với thread chính và chạy singleton toàn bộ esp32