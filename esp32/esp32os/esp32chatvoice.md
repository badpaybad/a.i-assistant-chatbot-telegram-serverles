với api gemini key  = " copy ở config_dunp.py variable GEMINI_APIKEY" model "gemini-3.1-flash-live-preview"
các khai báo chân mic ở esp32/esp32os/esp32mic.ino , loa esp32os/esp32speaker.ino
kết nối wifi ssid : "50Van Cao_Mesh" mật khẩu "123chaoban"
xem code chat voice mic/detect_wakeup.py tạo ra detect_wakeup.ino để nạp vào esp32 để có thể chatvoice ( nghe và nói với gemini ) bỏ qua các logic cần connect wifi , connect các chân mic, loa, rồi kết nối gemini api để chatvoice luôn

để chạy thử python có thể ở folder /work/a.i-assistant-chatbot-telegram-serverles/mic chạy lệnh: source ../venv/bin/activate && python detect_wakeup.py

để test loa chạy đúng khi connect wifi xong cần phát ra loa âm thanh esp32/esp32os/ok_wav.h sau đó play âm silence 1 giây tham khảo code esp32/esp32os/esp32speaker.ino

rồi mới connect google gemini để chat live 

**cập nhật 1** esp32/detect_wakeup/detect_wakeup.ino dùng esp32/detect_wakeup/dunp_config.h lấy các config wifi ssid, gemini để dùng 

xem mic/detect_wakeup.py cần làm thành 1 api esp32hub để làm việc như sau:
    esp32 không tự gọi lên gemini nữa , chỉ capture âm thanh và stream gửi lên api api esp32hub
    api esp32hub xử lý stream từ esp32 rồi gọi lên gemini để hoạt động chat voice, khi có stream voice từ gemini live về thì esp32 sẽ nhận qua api esp32hub rồi phát vào loa 
giữ nguyên  mic/detect_wakeup.py  và tạo mới mic/esp32_hub.py để dùng

**cập nhật 2**
mic/esp32_hub.py api esp32hub này cần lưu lịch sử hỏi và trà lời để có thể tiếp tục đàm thoại, sử dụng làm trí nhớ ngắn hạn và dài hạn phục vụ gọi gemini live api
    dùng sqllite để lưu trữ
    thêm tools call để lấy dữ liệu trong sqllite khi cần
cần lưu lịch sử trò chuyện vào sqllite, cung cấp các tool call về lấy dữ liệu, thêm dữ liệu, sửa dữ liệu, xóa dữ liệu, khi người dùng yêu cầu bằng voice chát sẽ thực hiện và thông báo lại kết quả nếu cần 

Trong quá trình chát việc người dùng yêu cầu lưu thông tinh thêm sửa xóa ... cần thực hiện theo yêu cầu vào table riêng 

    **chú ý** api esp32hub Trong quá trình chat voice cần tự động lưu toàn bộ lịch sử chat chít cần lưu request response từ gemini live vào sqllite, cho phép người dùng lấy thông tin khi cần 

gemini live cần dùng tool call để thực hiện các yêu cầu của người dùng khi cần 

gemini live config âm thanh giọng phù hợp tiếng Việt phổ thông giọng miền bắc Việt nam , giọng nữ thân thiện rõ ràng  

gemini live response voice có kèm cả text không cần lưu text response vào history 

**cập nhật 3**
mic/esp32_hub.py api esp32hub cùng mạng LAN , wifi với esp32. cần mic/esp32_hub.py api esp32hub dùng lấy IP LAN  và dùng firestore TreeOfThought/backend/Core.Web.Api/firebase-adminsdk.json rồi gửi cho esp32 để nhận IP cho việc stream voice chat.
esp32 cần dùng firebase firestore với config  firebase: {
    apiKey: "AIzaSyAeOXhZrhaadsOIp1e_0tklcnH8H5KfRZ8",
    authDomain: "realtimedbtest-d8c6b.firebaseapp.com",
    databaseURL: "https://realtimedbtest-d8c6b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "realtimedbtest-d8c6b",
    storageBucket: "realtimedbtest-d8c6b.firebasestorage.app",
    messagingSenderId: "787425357847",
    appId: "1:787425357847:web:70987cc599fe6242a92c52",
    vapidKey: "BBsnw8XbQ0yCpHixy3hKt20NuwTBB_Uqz__TdWPVlAEN6LZekJQCNqDO53JpXO5Q1gJ_3Nfrr28RHvKVtXU1tRw"
  } để nhận IP mới từ api esp32hub rồi thực hiện chat voice bình thường. khi esp32 nhận được ip và connect IP thành công cần xóa dữ liệu trên firestore để tiết kiêm chi phí , có thể tham khảo code ở esp32/esp32os/esp32firebase.ino 

Nếu chưa lấy được IP từ firestore thì vẫn dùng IP ở esp32/detect_wakeup/dunp_config.h khi nào lấy được IP thì khởi động lại socket để kết nối IP mới 