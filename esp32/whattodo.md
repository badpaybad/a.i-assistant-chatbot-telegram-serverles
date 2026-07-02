hiện esp32 đang cắm trên cổng usb /dev/ttyACM1
code file ở esp32/esp32os/esp32os.ino
cần tạo wifi hostport để esp32 phát ra 1 mạng wifi esp32os_dunp pass là esp32osdunp khi truy cập vào wifi này thì esp32 sẽ bật giao diện cấu hình wifi của mạng LAN để lưu ssid và mật khẩu. sau khi lưu xong cần connect vào ssid của mạng LAN và tắt wifi hostport. các thông số cần lưu sau khi reset hoặc rút điện bật lại cần tự connnect. esp32 cần log ra output về chất lượng wifi ssid mà nó connect 5 giây 1 lần.
