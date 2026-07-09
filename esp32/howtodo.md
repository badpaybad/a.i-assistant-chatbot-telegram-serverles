# Hướng dẫn Kiến trúc và Cách vận hành (How-To-Do) - ESP32 OS

Tài liệu này đặc tả kiến trúc thiết kế, sơ đồ luồng dữ liệu và cách hoạt động của hệ điều hành thu nhỏ dành cho ESP32-S3 (ESP32 OS).

---

## 1. Bản đồ Phân chia File & Kiến trúc Mô-đun

Dự án được cấu trúc dạng đa file (multi-tab) trong Arduino IDE, giúp phân tách các nhiệm vụ nghiệp vụ độc lập:

```
esp32os/
├── esp32os.ino          # File chạy chính (Main entry), khởi động luồng và điều phối chung
├── esp32wifi.ino        # Trình quản lý kết nối WiFi (Auto-connect 5 mạng gần nhất + Fallback)
├── esp32uiconfig.ino    # Giao diện Web cấu hình mạng (Captive Portal, Glassmorphism UI)
├── esp32eventbus.ino    # Bus sự kiện trung tâm (Asynchronous EventBus, Singleton, chạy Core 0)
├── esp32firebase.ino    # Trình đọc ghi Google Firebase Firestore (Chạy qua REST API + EventBus)
├── esp32mic.ino         # Mô-đun xử lý Mic INMP441 (I2S RX, FFT, tạo Spectrogram & Suy luận AI)
└── esp32speaker.ino     # Mô-đun điều khiển Loa MAX98357A (I2S TX, giải mã và phát âm thanh)
```

---

## 2. Luồng Vận hành Hệ thống (Workflow)

```mermaid
sequenceDiagram
    participant Main as Main Thread (Core 1)
    participant Bus as EventBus Thread (Core 0)
    participant Mic as Mic AI Task (Core 0)
    participant Web as Web Server (Portal)

    Note over Main, Mic: Khởi động hệ thống (Bootup Sequence)
    Main->>Bus: Khởi tạo EventBus (initEventBus)
    Main->>Main: Subscribe topic "wakeupword"
    Main->>Mic: Khởi tạo Mic I2S RX (initMic)
    Main->>Main: Khởi tạo Speaker I2S TX (initSpeaker)
    Main->>Main: Phát thử ok.wav qua loa (playOkSound)
    Main->>Mic: Gọi micRecord(5s) để thu âm từ mic (Main Thread)
    Main->>Main: Phát lại âm thanh vừa ghi qua loa (playSpeakerMono)
    Main->>Main: Giải phóng bộ nhớ đệm thu âm (free)
    Main->>Mic: Bắt đầu Task phát hiện giọng nói (startWakeupDetectionTask)
    Main->>Bus: Publish "start" để kích hoạt nhận diện AI

    alt Có WiFi đã lưu trong Flash
        Main->>Main: Quét và tự động kết nối WiFi
    else Không có WiFi hoặc kết nối lỗi
        Main->>Web: Bật Captive Portal (Phát WiFi cấu hình)
        Web->>Main: Lưu thông tin WiFi mới vào NVS -> Reset chip
    end

    Note over Mic, Bus: Chu kỳ phát hiện giọng nói và Live Chat
    loop Đọc Mic & Suy luận
        Mic->>Mic: Đọc I2S Stereo (INMP441)
        Mic->>Mic: Cộng gộp L/R + FFT + Spectrogram
        Mic->>Mic: EloquentTinyML dự đoán (predict)
        alt Nhận diện được từ khóa "du ơi" (probability > 0.50)
            Mic->>Bus: Publish "type:detected" lên topic "wakeupword"
            Mic->>Mic: Tự động TẠM DỪNG quét mic (micDetectActive = false)
            Bus-->>Main: Kích hoạt Callback onWakeupwordReceived
            Main->>Main: Phát ok.wav báo hiệu
            Main->>Mic: connect_live_chat() (Kết nối WebSockets SSL)
            Note over Main, Mic: Đàm thoại Live bắt đầu (live_chat_active = true)
            loop Vòng lặp đàm thoại Live
                Main->>Mic: stream_mic_to_websocket() (Thu và gửi PCM 16kHz)
                Mic->>Main: Nhận phản hồi âm thanh PCM 24kHz từ Gemini
                Main->>Main: Phát âm thanh qua loa (MAX98357A)
            end
            Note over Main: Hết 15s im lặng (Timeout) hoặc ngắt kết nối
            Main->>Mic: disconnect_live_chat()
            Main->>Bus: Publish "type=start" để mở lại Mic
            Bus-->>Mic: Kích hoạt quét mic trở lại (micDetectActive = true)
        end
    end
```

---

## 3. Chi tiết Thiết kế các Mô-đun

### A. Bus sự kiện (`esp32eventbus.ino`)
* Chạy như một **Singleton** trên một Task FreeRTOS độc lập tại Core 0.
* Cung cấp cơ chế giao tiếp bất đồng bộ giữa các Thread để tránh chặn (block) Thread chính:
  * `publish(topic, payload)`: Gửi sự kiện đến các subscriber.
  * `subscribe(topic, subName, callback)`: Đăng ký lắng nghe sự kiện trên một topic.
  * `enqueue(queueName, payload)` / `dequeue(queueName)`: Hàng đợi FIFO để trao đổi gói tin.
  * `set(key, value)` / `get(key)`: Lưu trữ trạng thái dùng chung.

### B. Thu âm & Nhận diện Giọng nói (`esp32mic.ino`)
* Chạy bất đồng bộ trên Core 0 thông qua `wakeup_detection_task` để tránh làm chậm Main Loop.
* **Đọc đệm I2S siêu ngắn (20ms/block)**: Cho phép truyền trực tiếp tín hiệu ra loa (`playSpeaker`) với độ trễ cực thấp (<20ms) và ổn định cao, hoàn toàn loại bỏ tiếng rè rẹt do hụt bộ đệm.
* **Lọc nhiễu & Đệm xoay vòng (Circular Buffer)**:
  * Thu âm từ Mic INMP441 (mặc định lấy dữ liệu kênh Trái để tránh tiếng xào xào nhiễu khi chỉ dùng 1 mic hoặc 2 mic đấu song song bị lỏng chân) sử dụng cấu hình tự động nhận diện độ rộng bit (cả 16-bit và 32-bit slot width).
  * Tách 16 bit có nghĩa nhất (MSB) nếu chạy ở chế độ 32-bit bằng cách dịch phải 16 bit (`>> 16`) arithmetically để chuyển về dạng mẫu signed 16-bit PCM. Nếu chạy ở chế độ 16-bit, dữ liệu được đọc trực tiếp không cần dịch bit.
  * Tích lũy mẫu mono liên tục vào bộ đệm xoay vòng `loop_audio_buffer` kích thước **16000 mẫu (1.0 giây)**.
* **Xử lý TFLite Micro khớp chuẩn Python**:
  * Chu kỳ suy luận được đặt cố định **100ms một lần** (mỗi 1600 mẫu mới), khớp tần suất suy luận với Python.
  * **Khử sai lệch DC (DC Offset Removal)**: Tính giá trị trung bình (mean) của toàn bộ 16000 mẫu trong bộ đệm và trừ đi từ mỗi mẫu. Bước này bắt buộc phải có để loại bỏ nhiễu DC sinh ra từ cảm ứng phần cứng, khớp với tín hiệu sạch từ môi trường kiểm thử của Python.
  * **Chuẩn hóa biên độ (Peak Normalization)**: Tìm trị tuyệt đối biên độ lớn nhất (`max_val`) của toàn bộ 16000 mẫu âm thanh đã khử DC trong cửa sổ 1.0 giây và chia tỷ lệ các mẫu cho `max_val` để biên độ luôn nằm trong khoảng `[-1.0, 1.0]`. Giải quyết bài toán chênh lệch âm lượng thu âm thực tế.
  * Trích xuất cửa sổ trượt (Overlap STFT) với `FRAME_LENGTH = 240` và `FRAME_STEP = 160` tạo ra đúng **99 hàng** phổ (Spectrogram) cho mô hình.
  * **Cửa sổ Hann (Hann Windowing)**: Áp dụng thủ công cửa sổ Hann kích thước $N=240$ trên mỗi khung trước khi đệm zero-padding lên 512 mẫu để chạy FFT, khớp 100% với hàm toán học `tf.signal.stft` mặc định của TensorFlow. Thu thập **257 cột tần số đầu tiên** cho mỗi hàng phổ.
  * **Lượng tử hóa tuyến tính (Linear Quantization)**: Dữ liệu được lượng tử hóa tuyến tính sang khoảng `[-128, 127]` dựa theo tham số `scale` và `zero_point` đầu vào của mô hình.
  * **Hợp tác đa nhiệm (RTOS Yield)**: Chèn lệnh `vTaskDelay` 1ms định kỳ (sau mỗi 10 hàng FFT và trước khi predict) để nhường quyền điều phối cho Task Idle trên Core 0, triệt tiêu hoàn toàn lỗi kích hoạt Watchdog khi chạy tính toán nặng.
* **Giao thức điều khiển qua EventBus (Control Protocol)**:
  * Khi phát hiện từ khóa "du ơi", luồng AI sẽ tự động gán `micDetectActive = false` để **tạm dừng nhận dạng**, tránh trùng lặp.
  * Lắng nghe liên tục trên topic `wakeupword` để nhận lệnh điều khiển:
    * **Kích hoạt lại AI**: Khi nhận bản tin chứa `type=start` (hoặc `type:start`, `start`), hệ thống sẽ bật lại AI (`micDetectActive = true`).
    * **Tắt/Tạm dừng AI**: Khi nhận bản tin chứa `type=stop` hoặc `type=pending` (hoặc định dạng dấu hai chấm `:stop`, `:pending`, hoặc chuỗi đơn `stop`, `pending`), hệ thống sẽ dừng xử lý AI (`micDetectActive = false`).


### C. Phát âm thanh (`esp32speaker.ino`)
* Khởi tạo Driver I2S Output (TX) trên cổng độc lập `I2S_NUM_1` với tần số phát mẫu **16kHz Stereo**.
* Cung cấp hàm `playSpeaker(samples, count)` phục vụ phát âm thanh PCM thô.
* **Tối ưu hóa âm lượng lớn nhất**:
  * **Phần mềm (Software)**: Tích hợp hệ số nhân âm lượng `#define SPEAKER_VOLUME_BOOST 1.5f` kết hợp bộ cắt biên độ (clamping) để tránh tràn số, nâng biên độ lên gấp 2.5 lần.
  * **Phần cứng (Hardware)**: Hướng dẫn nối chân **GAIN** của MAX98357A xuống **GND** (cho mức Gain 12dB) hoặc qua **điện trở 100kΩ xuống GND** (cho mức Gain cực đại 15dB) để âm thanh phát ra loa to rõ nhất.
* **Hardware Loopback Test**: Trong quá trình quét mic, toàn bộ dữ liệu Stereo đọc được từ mic sẽ ngay lập tức được ghi thẳng sang Loa giúp người dùng nghe trực tiếp âm thanh thu được để căn chỉnh độ nhạy phần cứng và kiểm tra kết nối vật lý.

### D. Quản lý mạng WiFi (`esp32wifi.ino` & `esp32uiconfig.ino`)
* **Lưu trữ NVS**: Sử dụng thư viện `Preferences` để duy trì danh sách mạng. Tự động dịch chuyển cấu trúc để lưu trữ **5 mạng WiFi đã kết nối gần nhất** theo dạng hàng đợi ưu tiên (mạng mới lưu có mức ưu tiên kết nối cao nhất).
* **Cơ chế Fallback**: Khi khởi động, nếu bộ nhớ Flash chưa lưu mạng nào, nó sẽ sử dụng mạng dự phòng cấu hình sẵn là `"Tang 1 OMT"` / `"Omt070110"`.
* Nếu tất cả kết nối thất bại, ESP32 sẽ phát WiFi `esp32os_dunp` và khởi tạo Captive Portal (DNS Hijacking). Mọi truy cập web từ thiết bị kết nối sẽ được tự động điều hướng về trang chủ cấu hình kính mờ (Glassmorphism UI) để nhập thông tin mạng mới.
* **Nut Boot - Factory Reset (nhan giu 10 giay)**:
  * **Kien truc: `buttonPollingTask` (FreeRTOS task)**:
    * Task chay doc lap tren **Core 0**, priority 1, doc `digitalRead(GPIO 0)` moi **50ms**.
    * **Guard 1 - Startup delay**: Task ngu 2 giay (`vTaskDelay(2000ms)`) sau khi khoi dong. Trong qua trinh boot, bootloader keo GPIO 0 xuong LOW de kiem tra flash mode. Delay dam bao trang thai chan on dinh truoc khi bat dau poll.
    * **Guard 2 - Xac nhan nhan lien tiep**: Can **3 lan doc LOW lien tiep** (= 150ms duy tri LOW) moi xac nhan la nhan that. Mot spike LOW don le do nhieu dien se bi loc.
  * **Phan hoi theo tien do giu**:
    * **5 giay**: 1 tieng bip thap 440Hz ("tiep tuc giu").
    * **8 giay**: 2 tieng bip 660Hz ("sap xong").
    * **10 giay**: Phat chuoi 3 am di xuong (C6 -> G5 -> C5) bao hieu factory reset.
  * **Factory Reset thực thi trong Task** (không cần qua `loop()`):
    1. Xóa namespace NVS **`wifi-creds`** (5 mạng WiFi đã lưu).
    2. Xóa namespace NVS **`gemini-config`** (API Key + Model Name).
    3. Xóa namespace NVS **`firebase-cfg`** (Firebase Project ID + API Key + Doc Path).
    4. Xóa namespace NVS **`hub-config`** (ESP32 Hub Host/IP + Port).
    5. Gọi `ESP.restart()` để khởi động lại chip.
  * Sau khi restart, boot sequence tìm thấy không có credentials, `connectWiFi()` thất bại, tự động gọi `startAP()` để mở hotspot cấu hình.
  * **Cấu hình ESP32 Hub từ xa**:
    * Cho phép người dùng nhập trực tiếp địa chỉ Host hoặc IP và số cổng (Port) của ESP32 Hub cục bộ qua giao diện cấu hình Captive Portal (Web UI).
    * Thông tin này được lưu trữ trong namespace NVS **`hub-config`** (chứa khóa `"host"` kiểu chuỗi và `"port"` kiểu số nguyên).
    * Khi khởi động, các cấu hình này được nạp tự động vào biến toàn cục `hub_host` và `hub_port`. Trường hợp không thể đọc địa chỉ IP của Hub từ Firestore (do Firebase Project ID trống), ESP32 sẽ tự động sử dụng cấu hình Hub đã lưu này làm địa chỉ kết nối dự phòng (fallback).

  * Trên mạch ESP32-S3-N16R8, nút **BOOT** (đấu nối phần cứng sẵn vào GPIO 0) được cấu hình chế độ `INPUT_PULLUP`.
  * Một ISR (`bootButtonISR`, `IRAM_ATTR`) được gắn vào ngắt phần cứng `CHANGE` của GPIO 0, nhận biết cả 2 sườn: đang nhấn xuống (FALLING) và thả ra (RISING).
  * Khi nhấn xuống: ISR lưu thời điểm bắt đầu (`isrPressStartMs`) và đánh dấu `isrButtonHeld = true`.
  * Khi thả ra: ISR đặt lại `isrButtonHeld = false` – hủy bỏ nếu chưa đủ 10 giây.
  * Hàm `checkBootButton()` trong `loop()` theo dõi thời lượng giữ và phát phản hồi theo tiến độ:
    * **5 giây**: 1 tiếng bíp thấp (“tiếp tục giữ”).
    * **8 giây**: 2 tiếng bíp trừ vừa (“sắp xong”).
    * **10 giây**: Phát chuỗi 3 âm đi xuống (C6 → G5 → C5) báo hiệu factory reset, sau đó:
      1. Xóa namespace NVS **`wifi-creds`** (5 mạng WiFi đã lưu).
      2. Xóa namespace NVS **`gemini-config`** (API Key + Model Name).
      3. Gọi `ESP.restart()` để khởi động lại chip.
  * Sau khi restart, boot sequence bình thường tìm thấy không có credentials → `connectWiFi()` thất bại → tự động gọi `startAP()` để mở hotspot cấu hình.



### E. Tự kiểm tra Phần cứng (Self-test)
* Thực hiện tuần tự trên Thread chính (`setup()` trên Core 1) ngay sau khi khởi tạo phần cứng để xác thực đường dẫn âm thanh trước khi chạy AI:
  1. **Kiểm tra Loa (I2S TX)**: Gọi `playOkSound()` để giải mã và phát trực tiếp dữ liệu âm thanh `ok.wav` lưu trong bộ nhớ Flash. Nếu người dùng nghe thấy tiếng nhạc khởi động tức là cổng I2S TX, bộ khuếch đại MAX98357A và loa đều hoạt động bình thường.
  2. **Kiểm tra Mic (I2S RX)**: Gọi `micRecordWav(5, &wav_size)` để ghi âm 5 giây âm thanh từ hai mic INMP441, trộn mono và trả ra dưới dạng file WAV hoàn chỉnh (bao gồm 44-byte WAV header ở đầu).
     * Hệ thống ưu tiên cấp phát vùng nhớ 160KB + 44 byte trên **PSRAM** bằng hàm `heap_caps_malloc(MALLOC_CAP_SPIRAM)`. Nếu board không có PSRAM hoặc không được cấu hình bật, hệ thống sẽ tự động hạ cấp xuống ghi âm 2 giây trên RAM nội bộ (Internal DRAM) để tránh tràn bộ nhớ.
     * Sau khi ghi âm kết thúc, hàm sẽ tự động điền các thông tin của file WAV tiêu chuẩn (RIFF, fmt, data chunk, sample rate 16000Hz, mono, 16-bit) vào 44 byte đầu tiên của bộ đệm.
  3. **Phát lại và Giải phóng**: Gọi `playSpeakerWav(wav_buf, wav_size)` để phát lại file WAV vừa ghi được qua loa. Hàm này sẽ tự động bỏ qua 44 byte WAV header và phát dữ liệu mono PCM còn lại ra loa tương tự như cách hoạt động của `playOkSound()`. Ngay sau khi phát xong, hệ thống gọi `playSilence(1000)` để ghi 1 giây âm thanh im lặng (dữ liệu 0) vào bộ đệm I2S, giúp xả sạch (flush) bộ đệm DMA của loa và dừng triệt để hiện tượng lặp tiếng/vọng tiếng do bộ đệm I2S bị đọng dữ liệu cũ. Cuối cùng, gọi `free(wav_buf)` ở main thread để giải phóng toàn bộ vùng đệm WAV, trả lại dung lượng RAM sạch cho hệ thống.

### F. Trợ lý ảo đàm thoại Live qua local Hub (`esp32mic.ino` & `esp32speaker.ino`)
* **Kiến trúc luồng âm thanh thông qua local `esp32_hub`**:
  * Khi từ khóa "du ơi" được phát hiện, hệ thống sẽ tạm ngắt nhận dạng AI cục bộ và kết nối tới endpoint WebSocket của local hub (`ws://<HUB_IP>:<PORT>/ws`).
  * **Xử lý bất đồng bộ đa luồng (Async FreeRTOS Tasks & Queues)**:
    * **Đầu vào (Mic - `mic_recording_task`)**: Thu thập dữ liệu PCM 32-bit Stereo từ I2S RX, chuyển đổi thành PCM 16-bit Mono (16kHz), sau đó đưa vào hàng đợi `mic_queue`.
    * **WebSocket (Main Loop - `loopGeminiLive()`)**: Đọc từ `mic_queue` và stream dữ liệu mono PCM thô dưới dạng nhị phân (`webSocket.sendBIN`) trực tiếp lên local hub.
    * **VAD (Voice Activity Detection)**: Khi đang stream, nếu mic thu nhận được tín hiệu âm thanh có biên độ đỉnh `peak > 1500` (có âm thanh người dùng nói), hệ thống sẽ cập nhật `last_interaction_time` để làm mới thời gian đàm thoại.
    * **Đầu ra (Loa - `audio_playback_task`)**: Nhận dữ liệu nhị phân PCM 24kHz Mono từ WebSocket của hub, chuyển đổi thành Stereo và đẩy vào `audio_play_queue`. Task phát sẽ liên tục lấy dữ liệu từ hàng đợi và phát qua I2S TX với tốc độ 24kHz.
  * **Khử nhiễu vọng phản hồi (Echo Suppression)**: Khi loa đang phát hoặc có dữ liệu trong hàng đợi phát, micro sẽ tự động bỏ qua (discard) dữ liệu thu từ I2S và xả sạch hàng đợi `mic_queue` để tránh phản hồi vòng lặp (echo loop).
  * **Timeout im lặng (Inactivity Timeout)**: Sau 60 giây nếu cả người dùng không nói (không có âm thanh mic `peak > 1500`) và loa không phát âm thanh, hệ thống sẽ tự động gọi `disconnect_live_chat()`, khôi phục loa về tần số 16kHz, và mở lại chế độ chờ Wake-word ngoại tuyến.

### G. Google Firebase Firestore Client (`esp32firebase.ino`)
* **Không dùng thư viện nặng**: Sử dụng trực tiếp `WiFiClientSecure` và `HTTPClient` gốc để gọi REST API của Firestore, tránh xung đột bộ nhớ và watchdog với TensorFlow Lite / Gemini WebSockets.
* **Tự động cấu hình kết nối động (Dynamic IP Discovery)**:
  * **Đọc IP**: Khi kết nối, ESP32 gọi `get_hub_ip_from_firestore()` đọc tài liệu `esp32hub/config` trên Firestore nhằm tìm địa chỉ IP và Port hiện tại của local hub, nếu không thấy sẽ sử dụng IP cấu hình tĩnh dự phòng ở `dunp_config.h`.
  * **Xóa tài liệu**: Khi kết nối WebSocket tới hub thành công, ESP32 sẽ gọi `delete_hub_ip_from_firestore()` để xóa config trên Firestore nhằm tối ưu hóa chi phí database.
  * **Cập nhật động**: Nếu kết nối bằng IP dự phòng, ESP32 sẽ định kỳ 10 giây kiểm tra Firestore. Khi thấy có IP mới, nó sẽ tự động ngắt kết nối và khởi động lại WebSocket để chuyển sang IP mới.
* **Tự động chuyển đổi định dạng JSON (JSON Mapping)**:
  * Khi ghi: Hàm `flatJsonToFirestore(flatJson)` tự động chuyển đổi JSON phẳng sang định dạng phân cấp của Firestore REST API.
  * Khi đọc: Hàm `firestoreToFlatJson(firestoreJson)` chuyển đổi ngược lại sang JSON phẳng.
* **Đọc ghi bất đồng bộ qua EventBus**:
  * Đăng ký nhận sự kiện ghi trên topic `firebase/write`.
  * Đăng ký nhận sự kiện đọc trên topic `firebase/read`. Kết quả đọc được sẽ được publish ngược lại lên topic `firebase/read/result` dưới dạng JSON phẳng.

---

## 4. Hướng dẫn Gỡ lỗi (Troubleshooting)

1. **Kiểm tra hoạt động của Mic & Loa**:
    * Xem log `I2S Bytes Read` trên Serial Monitor. Nếu luôn bằng `0`, hãy kiểm tra lại kết nối chân `SCK` (GPIO 4) và `WS` (GPIO 5).
    * Nói vào mic và quan sát `Spectrogram Max Amp`. Nếu số này dao động chứng tỏ Mic thu âm tốt. Nếu luôn bằng `0.00000` kèm cảnh báo im lặng, kiểm tra dây dữ liệu `SD` (GPIO 6) và nguồn của Mic.
    * **⚠️ Cảnh báo chân cắm trên ESP32-S3 N16R8 (R8 là 8MB Octal PSRAM)**: Do chế độ **OPI PSRAM** bắt buộc phải sử dụng các chân **GPIO 15, 16, 17** để truyền nhận dữ liệu với chip RAM ngoài của board, bạn tuyệt đối **không** được đấu mic (SCK, WS) hay loa (LRC) vào cụm chân này. Nếu đấu nhầm, I2S sẽ không thể thu âm (tiếng phát ra xào xào) và CPU sẽ bị stall liên tục làm thời gian phát chậm đi rất nhiều. Phải đấu đúng sang: Mic (SCK=4, WS=5, SD=6) và Loa (LRC=7, BCLK=14, DIN=13).
2. **Loa có tiếng xè xè hoặc rè**:
   * Đảm bảo nguồn cấp cho mạch `MAX98357A` đấu vào chân **5V** thay vì **3.3V**. Dòng điện tiêu thụ từ loa khi phát âm thanh rất lớn, dùng chung đường 3.3V với MCU và Mic sẽ gây sụt áp đột ngột và sinh nhiễu.
3. **Lỗi `wifi:Expected to init 4 rx buffer, actual is 0` / Treo Hotspot cấu hình**:
   * **Nguyên nhân**: Biên dịch nhưng tắt PSRAM trong cài đặt. Mảng TFLite Arena (180KB) bị đẩy vào bộ nhớ RAM nội bộ (DRAM) làm cạn kiệt Heap dành cho driver WiFi và mạng.
   * **Cách xử lý**: Vào **Tools -> PSRAM** trong Arduino IDE và chuyển từ **Disabled** sang **OPI PSRAM** (bắt buộc chọn OPI cho dòng N16R8). Hệ thống sẽ tự động chuyển mảng AI ra RAM ngoài, giải phóng hoàn toàn DRAM nội bộ giúp hệ thống hoạt động ổn định.
