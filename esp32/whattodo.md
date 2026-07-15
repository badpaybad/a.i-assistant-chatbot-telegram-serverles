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
        cần subscribe topic wakeupword khi nhận được data type start sẽ resume việc detect wakeup word. nếu data type pending thì không xử lý detect wakeup word nữa
        khi esp32 khởi động ở main thread sẽ publish lên topic wakeupword type start để resume việc detect.

wakeup word đang dùng model_data.h cần đổi tên thành wakeupword_model_data.h
mic phần cứng đang dùng (I2S Input - Cho 2 Mic INMP441 song song)

**cập nhật 4** Cổng I2S Đầu Ra (I2S Output - Cho Mạch Khuếch Đại MAX98357A + Loa) xem code ở mic/arduino_esp32_2mic_talk.ino và tạo esp32speaker.ino khi nhận được âm thanh từ mic cần forward ra load để test việc hoạt động thực của loa và mic .

**cập nhật 5** với cách thiết kế ở trên , nếu cần chạy riêng esp32/esp32os/esp32mic.ino để test việc wakeup word thì có ổn không ? hiện tại chưa thấy log được việc detected wakeup word, model thì đã họat động khi chạy thử ở mic/detect_wakeup.py
không forward mic ra loa nữa.
khi detect được cần phát ra loa âm thanh esp32/esp32os/ok.wav
bổ xung thêm log mỗi khi detect word để xem mô hình hoạt động không
việc detected wakeup word cần tham khảo  mic/detect_wakeup.py . kiểm trả kỹ logic, thông số, kể cả việc xuất model cho esp32  

**cập nhật 6**
khi init xong mic, loa
cần play âm thanh ok_wav.h để xác nhận loa hoạt động.
rồi để xác nhận mic hoạt động, cần thu âm trong vòng 2 giây thành wav rồi play speaker.
rồi mới vào task detect wakeup word
ở thread main esp32 khi boot lên: init mic ->init loa -> play ok sound -> mic ghi âm 2s wav -> play 2s wav đã ghi -> giải phóng bộ nhớ 2s wav vừa ghi
    esp32mic ghi âm rồi trả ra wav
    esp32speaker sẽ play wav đó ( như code để play ok playOkSound)
    micSelfTest cần nằm ở main thread

khi thu âm cần đúng chuẩn thiết bị, nhưng khi xử lý detect wakeup word cần chuyển về input âm thanh như model cần xem tham khảo ở mic/detect_wakeup.py

mạch esp đang dùng : esp32 s3 n16r8
2 mic : is2 INMP441
khuyếch đại âm thanh: MAX98357A
việc cắm các chân, cài thư viện ở đây esp32/readme.md cần matching từ code các chân cắm
sét âm lượng to nhất cho loa

**cập nhật 7** khi detect được wakeup word cần bỏ qua việc xử lý detect wakeup word, đợi nghiệp vụ khác publish data lên topic với type = start thì sẽ tiếp tục xử lý detect wakeup word
    publish data lên topic với type = stop thì sẽ bỏ xử lý detect wakeup word

**cập nhật 8** từ yêu cầu này mic/whattodo.md đã code ra mic/detect_wakeup.py chạy như 1 voice chat bot hỗ trợ. có thể mô phòng code python và bổ xung thêm các hàm vào esp32/esp32os/esp32mic.ino để làm voice chat bot cho esp32, cũng dùng gemini api
khi detect được wakeup word thì không phát ok_wav nữa, xử lý như voice chatbot ở mic/detect_wakeup.py các logic cần làm giống luôn code python về voice chat bot assitant ở mic/detect_wakeup.py

**cập nhật 9** ở esp32/esp32os/esp32uiconfig.ino cần bổ xung config để lưu gemini key và model name cho mic/esp32mic.ino, khi reset reboot , tắt đi bật lại vẫn dùng được, và cần bổ xung thêm các input config cho gemini . model mặc định "gemini-3.1-flash-live-preview"

**cập nhật 10** wifi connect thành công thì cần play ok_wifi.wav (xử lý giống ok_wav).

**cập nhật 11**
trên mạch  esp32 s3 n16r8 dùng nút boot, khi nhấn giữ 10 giây thì sẽ xóa hết config và khởi động lại để mở hostpot và config lại.

**cập nhật 12** [DONE] ở esp32/esp32os/esp32uiconfig.ino bổ xung thêm config cho google firebase firestore .
tạo thêm esp32firebase.ino để xử lý đọc ghi lên firestore

**cập nhật 13** xem code ở  mic/detect_wakeup.py , cần esp32 cũng dùng chat voice live gemini api được

**cập nhật 14** cần xem esp32/esp32os/esp32chatvoice.md để dùng mic stream lên api esp32 hub để làm chat voice, lúc này mic chỉ capture voice gửi lên api esp32 hub và nhận stream audio để phát loa, esp32 không xử lý trực tiếp google gemini live nữa, gemini live đã được xử lý ở api esp32 hub
    
mic vẫn cần wake word detect rồi mới bắt đầu chat vocie, vẫn giữ 60 giây nếu không thấy mic active ( có âm thanh nhận biết dược) thì sẽ tạm dừng gọi stream api esp32 hub nữa. quay lại đợi wake word detect

chú ý ARENA_SIZE phụ thuộc (SPEC_ROWS = 99), SPEC_ROWS  phụ thuộc FRAME_LENGTH và FRAME_STEP cần cập nhật cho đúng để chạy được model wake word detect

sau khi detect wake word du ơi thành công cần thực hiện voice chát như code theo yêu cầu ở esp32/esp32os/esp32chatvoice.md , xem code esp32/detect_wakeup/detect_wakeup.ino . 

esp32/detect_wakeup/detect_wakeup.ino và mic/esp32_hub.py đang hoạt động tốt , cập nhật esp32/esp32os/esp32mic.ino tương tự để hoạt động tốt với  mic/esp32_hub.py

**cập nhật 15** ở esp32/esp32os/esp32mic.ino các thông tin host và ip của esp32 hub cần được lưu dạng config như ở esp32/esp32os/esp32uiconfig.ino , cho phép người dùng nhập host hoặc ip và port của esp32 hub 

**cập nhật 16** dựa trên MAC address mà esp32 có, gọi api http get firebase access token + MAC address lên api esp32 hub mô tả ở mic/whattodo.md -> khi MAC address matched với đã dăng ký ở hub thì google firebase admin generate jwt access token expire 1 giờ cho esp32 dùng cho các dịch vụ firebase client ở esp32. ở esp32 nếu jwt access token hết hạn hoặc expired thì cần gọi api http get firebase access token để lấy mới .
ngoài việc esp32 hub gửi IP or domain và port của api esp32 hub thì có thể dùng để trao đổi các data khác khi cần giữa esp32 client và esp32 hub 

nếu firebase jwt access token đã có và chưa expired thì cần firestore subscribe khi khởi động để đảm bảo nhận được dữ liệu từ esp32 hub khi cần.

**cập nhật 17** khi wifi check connect được và firebase từ esp32 hub gửi IP + port (hoặc domain + port) mới nếu connect được (IP domain port mới thay đổi khác so với cái đang có hiện tại ở config ) cần tự động lưu vào config

**cập nhật 18** cần cấp thêm api cho esp32 hub để tạo Google OAuth 2.0 Access Token (đại diện cho services account ) để client esp32 lưu lại, việc lấy access token này vẫn dùng MAC address validate, cần 1 số dịch vụ chạy distributed trên các client esp32. 

**cập nhật 19** PN532 RFID 13.56Mhz để đọc NFC , chỉ ra chân đấu với esp32 s3 n16r8 và code để đọc NFC , xem code esp32/pn532_test/pn532_test.ino 

**chú ý** cần cập nhật cách làm vào esp32/howtodo.md , việc cài đặt cần thiết các thư viện cách cấu hình IDE cần cập nhật vào esp32/readme.md
