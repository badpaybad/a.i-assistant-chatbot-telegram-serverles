với api gemini key  = " copy ở config_dunp.py variable GEMINI_APIKEY" model "gemini-3.1-flash-live-preview"
các khai báo chân mic ở esp32/esp32os/esp32mic.ino , loa esp32os/esp32speaker.ino
kết nối wifi ssid : "50Van Cao_Mesh" mật khẩu "123chaoban"
xem code chat voice mic/detect_wakeup.py tạo ra detect_wakeup.ino để nạp vào esp32 để có thể chatvoice ( nghe và nói với gemini ) bỏ qua các logic cần connect wifi , connect các chân mic, loa, rồi kết nối gemini api để chatvoice luôn

để chạy thử python có thể ở folder /work/a.i-assistant-chatbot-telegram-serverles/mic chạy lệnh: source ../venv/bin/activate && python detect_wakeup.py

để test loa chạy đúng khi connect wifi xong cần phát ra loa âm thanh esp32/esp32os/ok_wav.h sau đó play âm silence 1 giây tham khảo code esp32/esp32os/esp32speaker.ino

rồi mới connect google gemini để chat live 