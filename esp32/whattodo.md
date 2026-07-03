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

**cập nhật 3** dựa vào kết nối 2 mic ở mic/arduino_esp32_2mic.ino và wakeup word ở mic/arduino_esp32.ino để bổ xung thêm code esp32mic.ino rồi dùng vào esp32/esp32os/esp32os.ino 
    esp32mic.ino cần đáp ứng
        chạy ở thread khác không phải thread main
        thu âm từ 2 mic, gọi xử lý wakeup word khi có wakeup word cần dùng event bus esp32eventbus đẻ publish lên topic: wakeupword với idx class ở model A.I detect được, thời điểm detect được , type detected ,score 
        khi detect được cần pending không xử lý detect wakeup word nữa
        cần subscribe topic wakeupword khi nhận được data type start sẽ resume việc detect wakeup word. nếu data type peding thì không xử lý detect wakeup word nữa 
        khi esp32 khởi động ở main thread sẽ publish lên topic wakeupword type start để resume việc detect.

wakeup word đang dùng model_data.h cần đổi tên thành wakeupword_model_data.h
mic phần cứng đang dùng (I2S Input - Cho 2 Mic INMP441 song song) 
 
**cập nhật 4** Cổng I2S Đầu Ra (I2S Output - Cho Mạch Khuếch Đại MAX98357A + Loa) xem code ở mic/arduino_esp32_2mic_talk.ino và tạo esp32speaker.ino khi nhận được âm thanh từ mic cần forward ra load để test việc hoạt động thực của loa và mic . 

**cập nhật 5** với cách thiết kế ở trên , nếu cần chạy riêng esp32/esp32os/esp32mic.ino để test việc wakeup word thì có ổn không ? hiện tại chưa thấy log được việc detected wakeup word, model thì đã họat động khi chạy thử ở mic/detect_wakeup.py 
không forward mic ra loa nữa.
khi detect được cần phát ra loa âm thanh esp32/esp32os/ok.wav
bổ xung thêm log mỗi khi detect word để xem mô hình hoạt động không 
việc detected wakeup word cần tham khảo  mic/detect_wakeup.py . kiểm trả kỹ logic, thông số, kể cả việc xuất model cho esp32  

**cập nhật 6** cần play âm thanh ok_wav.h khi init xong mic loa . 

**chú ý** cần cập nhật cách làm vào esp32/howtodo.md , việc cài đặt cần thiết các thư viện cách cấu hình IDE cần cập nhật vào esp32/readme.md