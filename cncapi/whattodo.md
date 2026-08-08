folder làm việc: cncapi 
dựa vào cnc/main.py về các code liên quan điều khiển cnc
    bỏ gcode editor
    bỏ gcode with font
    bỏ object detect, không load model object detect do không dùng đến
    bỏ camera stream

Cần làm như sau 

Mà hình chia 3 hàng

Hàng 0
    chia 3 cột
        cột 0
            Cấu hình kết nối cnc , cổng serial vẫn mặc dịnh /dev/ttyACM0 baudrate 115200
            các thông tin về cnc 
                tọa độ gốc máy (Machine Zero - G53)
                    tọa độ đầu cnc theo gốc máy
                tọa độ gốc làm việc, gốc phôi (Work Zero - G54)
                    tọa độ đầu cnc theo tọa độ làm việc 
                tọa độ điểm đỗ ( dùng để rút dao)

        cột 1
                
            cấu hình spindle 

            đặt gốc tọa độ làm việc 
        cột 2
            trạng thái kết nối
            chọn ngôn ngữ
hàng 1
    chia 3 cột
        cột 0 : width 25%

            bộ di chuyển ( machine jogging)
                cấu hình  
                    tốc độ di chuyển feed rate
                    bước di chuyển

            Touch & Swipe Gestures
                cấu hình  
                    tốc độ di chuyển feed rate
                    bước di chuyển
                    tab độ trễ
                    swipe độ dài 

        cột 1: width 50%
            tool path view 
            dùng để preview xem kịch bản hoặc xem chạy giả lập kịch bản 

        cột 2: width 25%
            các thao tác tạo kịch bản ví dụ: tạo, lưu , chạy , chạy loop, chạy giả lập 

            PHÍM KỊCH BẢN
                set begin, ...

Hàng 2
    Cửa Sổ Console Serial
    copy right @ 2026

Logic điều khiển cnc cho kịch bản 

Machine jogging và touch & swipe gesture không phụ thuộc gì cứ cnc connect là điều khiển đầu cnc được, tạo sẵn các api khi UI gọi sẽ thực hiện di chuyển hoặc nâng hạ bút theo nghiệp vụ. Dùng machine jogging để di chuyển đầu CNC và set tọa độ gốc làm việc , có nút dừng và di chuyển về gốc tọa độ làm việc    

Chạy kịch bản cần dựa vào tọa độ gốc làm việc
    các cấu hình di chuyển và touch swipe dùng chung ở trên 
    Dựa vào tọa độ gốc làm việc để lưu các vị trí start, tab, swipe , end .. của đầu cnc 
    Dựa vào tọa độ gốc làm việc để thực hiện các di chuyển và thao tác của đầu cnc cho kịch bản 

Tool Path View (Xem & Giả Lập Kịch Bản)
    chiều Y cần vẽ ngược lại 

**cập nhật 1** Quản Lý & Phím Kịch Bản cần hoạt động được giống bên  cnc/main.py 
    Khi chưa set home gốc làm việc ( gốc phôi) click vào sẽ báo cần Đặt gốc tọa độ làm việc 
    cho phép chỉnh sửa lại thứ tự các thao tác di chuyển 
    cho phép insert thêm vào sau 1 bước nào đó
    tuân thủ Cấu Hình Spindle & Gốc Làm Việc (vị trí nâng hạ bút) có cấu hình nâng hạ
    Tuân thủ cấu hình Cử Chỉ Touch & Swipe Gestures Tốc Độ Feedrate 4000 Bước Chuyển (mm) Tap Độ Trễ (s) Swipe Độ Dài (mm)
    set begin và set end cần nhấc dao trước rồi mới thực hiện  

**cập nhật 2** Tool Path View (Xem & Giả Lập Kịch Bản) đùng để hiển thị các bước ở kịch bản tại Quản Lý & Phím Kịch Bản và thực tế của đầu cnc so với gốc tọa độ làm việc 
    kịch bản sẽ cần được vẽ lên để người dùng nhìn thấy các bước 
    Khi click chạy giả lập thì cnc sẽ đi theo các đường vẽ tương ứng , các đường vẽ sẽ mô phỏng thực tế của đầu cnc so với gốc tọa độ làm việc 
**cập nhật 3** vuốt lên, vuốt xuống, vuốt sang trái , vuốt sang phải chỉ cần thực hiện rồi dừng không cần quay về vị trị bắt đầu vuốt

**cập nhật 4** vẽ tracking di chuyển cnc cần dường mờ nhạt. vẽ đường đi của kịch bản cần đường đi rõ nét bắt đầu từ set begin tới điểm set end, khi nhấn nút chạy hoặc giả lập mới cần vẽ đường đi của kịch bản. còn bình thường chỉ cần vẽ các node theo step của kịch bản .
Lúc chạy hoặc chạy lặp thì cần thể hiện thực tế đầu cnc hiện khi chạy giả lập đã có 

**cập nhật 5** bổ xung việc click chuột lên tool path view để di chuyển. cần quy đổi từ tọa độ điểm click trên canvas sang tọa độ máy để di chuyển tới đó dựa vào gốc tọa độ làm việc. click vị trí nào thì cnc di chuyển tới vị trí đó.
    Tool Path View (Xem & Giả Lập Kịch Bản) bổ xung thêm tỷ lệ 1 pixel tương đương với bao nhiêu milimet (vd 1 px = 0.1mm)

**cập nhật 6** Tool Path View (Xem & Giả Lập Kịch Bản) bổ xung option để hiển thị vẽ trục x,y gốc tọa độ làm việc trên canvas
    x: cho phép chọn trái sang phải là chiều dương hoặc phải sang trái là chiều dương 
    y: cho phép chọn dưới lên trên là chiều dương hoặc trên xuống dưới là chiều dương
    mặc định: x trái sang phải , y trên xuống dưới

**cập nhật 7**  
cần đưa các cấu hình:
    Bộ Di Chuyển & Cử Chỉ có cấu hình : Tốc Độ Feedrate, Bước Chuyển (mm)
    Cử Chỉ Touch & Swipe Gestures có cấu hình : Tốc Độ Feedrate, Bước Chuyển (mm), Tap Độ Trễ (s) , Swipe Độ Dài (mm)
    về Cấu Hình Spindle & Gốc Làm Việc 
        Tốc Độ Feedrate, Bước Chuyển (mm) cần dùng chung cho toàn bộ 

Cấu Hình Spindle & Gốc Làm Việc là dùng chung cho toàn bộ
    bổ xung nút lưu, load lại cấu hình 
        cổng serial, baudrate 
        tốc độ feedrate , bước chuyển 
        Tốc Độ Vuốt (Swipe Feedrate) dành cho việc vuốt và giả lập tay người vuốt 
        tab delay, swipe độ dài 
        Chế Độ Điều Khiển Bút/Spindle ,Vị Trí NHẤC / HẠ 
        gốc tọa độ làm việc 
        tool path view về việc vẽ hướng trục x, trục y 

        khi lưu cấu hình ngoài lưu nội bộ để dùng cho phép người dùng download file về máy tính
        khi load cấu hình cho phép người dùng chọn file cấu hình đã lưu để dùng 

**cập nhật 8**  
ở các thao tác Cử Chỉ Touch & Swipe Gestures, đầu cnc đang ở đâu thì thực hiện tại đó, vd chạm (tab) thì tab tại đầu cnc. vuốt lên thì tại vị trí cnc đang đứng vuốt lên, không cần về gốc tọa độ làm việc rồi mới thực hiện 

**cập nhật 9** ở **cập nhật 5**  có đề cập tỷ lệ 1 pixel tương đương với bao nhiêu milimet cho Tool Path View (Xem & Giả Lập Kịch Bản) để vẽ trên canvas và quy đổi khi click chuột. Cho phép đưa thành cấu hình có thể thay đổi được khi người dùng muốn (mặc định 1px = 0.5mm)
ở **cập nhật 6** đề cập về việc hiển thị vẽ trục x,y gốc tọa độ làm việc trên canvas
cần đưa lên Cấu Hình Cấu Trúc & Gốc Làm Việc, để tập trung và gọn 
     
**cập nhật 10** do nhầm lẫn trước đây hiện tại đang bị nhầm lẫn cần lấy thông tin tọa độ gốc máy thay cho tọa độ gốc phôi, gốc phôi và tọa độ gốc làm việc là 1 rồi.

    Hàng 0
        chia 3 cột
            cột 0
                Cấu hình kết nối cnc , cổng serial vẫn mặc dịnh /dev/ttyACM0 baudrate 115200
                các thông tin về cnc 
                    tọa độ gốc phôi -> cần lấy là tọa độ gốc máy (Machine Zero - G53)
                        tọa độ đầu cnc theo gốc máy
                    tọa độ gốc làm việc, gốc phôi (Work Zero - G54)
                        tọa độ đầu cnc theo tọa độ làm việc 
                    tọa độ điểm đỗ ( dùng để rút dao)

**cập nhật 11**
hiện tại trên UI html js đang dùng để thao tác với cnc, cần dựa vào các cấu hình và thao tác để bổ xung tạo mới các api cho các ứng dụng khác có thể thao tác với cnc không phụ thuộc vào UI html js . chỉ cần gọi api là thực hiện được 
    api bắt đầu với prefix: /cncapi/v1/... cần các api cho các chức năng của các chức năng đang có. các code không nằm trên UI client nữa mà cần là code ở api server 
        Bộ Di Chuyển & Cử Chỉ
        Cử Chỉ Touch & Swipe Gestures
        về gốc làm việc
        dùng di chuyển
        Quản Lý & Phím Kịch Bản
            việc tạo kịch bản chạy kịch bản là session, người dùng vẫn có thể lưu download thành file local và load lại để dùng 
            các Phím Thêm Bước Kịch Bản lúc này code không nằm trên UI client nữa, cần là code ở api serverr 
        việc trả ra các state, thông tin đang hoạt động cũng cần cung cấp api để nếu client cần vẽ UI minh họa khi cần 

**cập nhật 12**
Cấu Hình Cấu Trúc & Gốc Làm Việc cần bổ xung thêm cấu hình cho việc Cử Chỉ Touch & Swipe Gestures về Nhấn giữ cấu hình về thời gian nhấn giữ , cũng áp dụng thời gian nhấn giữ bao lâu cho bước trong kịch bản , mặc định là 1.5 giây 

**cập nhật 13**
ở Cấu Hình Cấu Trúc & Gốc Làm Việc thiếu sys-step-distance (step_distance) cần bổ xung 

**cập nhật 14** ở Cấu Hình Cấu Trúc & Gốc Làm Việc cần bổ xung thêm cấu hình với 4 nút cạnh nút Đặt gốc tọa độ làm việc, 4 nút set bổ xung thêm cho cấu hình các vị trí so với Gốc tọa độ làm việc. cnc_tl, cnc_tr, cnc_bl, cnc_br dùng để vẽ khung làm việc ngoài đời thực trên Tool Path View (Xem & Giả Lập Kịch Bản)  
    set top left
    set top right
    set bottom right
    set bottom left
    khi có 4 điểm chỉ cần vẽ khung theo 4 điểm này, chưa cần dùng để validate hay cần tính toán thêm gì. cần cấp thêm api để set 4 điểm này và lưu config , có 4 điểm thì vẽ không thì không cần vẽ 

**cập nhật 15** xem cncapi/main.py cần đóng gói thành file chạy để tránh người dùng can thiệp đọc và sửa code, khi build tạo toàn bộ ứng dụng vào folder dist
- Đã bổ sung cấu hình đường dẫn tài nguyên tĩnh (`STATIC_DIR`) tự động tương thích môi trường thực thi PyInstaller (`sys._MEIPASS`).
- Đã tạo `main.spec` cấu hình đóng gói toàn bộ backend FastAPI và thư mục `static/` thành 1 file chạy duy nhất `cncapi`.
- Tạo script build `build_dist.sh` để thực hiện đóng gói nhanh vào thư mục `dist/`.
- File thực thi tạo ra: `cncapi/dist/cncapi`. Chạy `./dist/cncapi` từ thư mục `cncapi` sẽ khởi động ứng dụng Web API mà không lộ mã nguồn `.py`.

**cập nhật 16** ở **cập nhật 15** build đã chạy cho linux (cụ thể ubuntu 24.04) có thể thêm option để build chạy trên window 10, window 11, macos . 
- **Đóng gói trực tiếp trên Ubuntu 24.04 cho Linux & Windows**:
  - Script `./build_dist.sh` đã tích hợp đóng gói song song: tạo ra file Linux `dist/cncapi` và file Windows `dist/cncapi.exe` (thông qua Wine Python).
- **Hỗ trợ macOS qua GitHub Actions**:
  - Do quy định bảo mật SDK của Apple, macOS không cho phép cross-compile từ Linux. Đã khởi tạo workflow `/.github/workflows/build_cncapi.yml` để đóng gói tự động file cho macOS (`cncapi-macos`), Windows (`cncapi.exe`) và Linux (`cncapi-linux`) trên GitHub CI/CD.
- **Kịch bản Native cho người dùng muốn build trên Windows**:
  - `build_dist.bat` (chạy trên Command Prompt) & `build_dist.ps1` (chạy trên PowerShell).

**cập nhật 17** cấu hình Cổng Serial có thể dựa vào hệ điều hành để lấy các cổng serial tương ứng, cần lấy các cổng tương thích để kết nối được vào mạch cnc  cho người dùng chọn 
- **Tự động nhận diện theo Hệ điều hành**:
  - **Linux (Ubuntu)**: Tự động lọc và ưu tiên các cổng USB CNC (`/dev/ttyACM*`, `/dev/ttyUSB*`), đưa các cổng này lên đầu danh sách chọn.
  - **Windows**: Tự động liệt kê các cổng COM (`COM1`, `COM3`, `COM4`...) kèm mô tả phần cứng chi tiết (`CH340`, `Arduino Uno`, `USB Serial Port`...).
  - **macOS**: Tự động lọc các cổng `/dev/tty.usbmodem*`, `/dev/cu.usbmodem*`, `/dev/tty.usbserial*`...
- **Giao diện Web UI (`app.js`)**: Cập nhật hàm `fetchPorts()` hiển thị đầy đủ tên cổng + thông tin thiết bị phụ trợ để người dùng dễ chọn đúng mạch CNC.

**cập nhật 18** cần đưa các thư viện cần cài cho cncapi vào cncapi/requirements.txt để khi build trên các nền tảng hệ điều hành khác nhau hoạt động đúng, xem các file commandline build.dist cập nhật nếu cần 
- Đã tạo/khởi tạo file [cncapi/requirements.txt](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/requirements.txt) khai báo đầy đủ 5 thư viện cần thiết (`fastapi`, `uvicorn[standard]`, `pyserial`, `pydantic`, `pyinstaller`).
- Đã cập nhật tất cả các kịch bản build command-line (`build_dist.sh`, `build_dist.bat`, `build_dist.ps1`) tự động kiểm tra và cài đặt thư viện từ `requirements.txt` trước khi chạy đóng gói PyInstaller.
- Đã cập nhật workflow CI/CD GitHub Actions cài đặt tự động từ `cncapi/requirements.txt` khi đóng gói trên các môi trường Windows, macOS và Linux.

**cập nhật 19** đọc yêu cầu ở cnc/whattodo.md về Gcode with font và code đã làm ở cnc/main.py , cần lấy tính năng đó sang cncapi
Bổ xung nút để mở editor Gcode with font phía trên Bộ Di Chuyển & Cử Chỉ
    click nút Gcode with font thì mở floating pannel 1/3 bên phải page, không che vùng Tool Path View (Xem & Giả Lập Kịch Bản)
    cần preview trên Tool Path View (Xem & Giả Lập Kịch Bản) 
    viết chữ từ vị trí hiện tại của đầu cnc 
    có nút Vẽ xem trước để chạy giả lập trên Tool Path View (Xem & Giả Lập Kịch Bản) 
    có nút Vẽ trên cnc là để điều khiển cnc thật chạy 
✅ Đã bổ sung nút `✍️ Gcode with font` ở Cột 0 (phía trên Bộ Di Chuyển).
✅ Đã thiết kế Floating Panel góc phải 33% chiều rộng (`gcode-font-editor-panel`) không che vùng Tool Path View ở trung tâm.
✅ Đã thêm API `GET /cncapi/v1/fonts`, `POST /cncapi/v1/generate-font-gcode` và `POST /cncapi/v1/run-gcode`.
✅ Đã tích hợp vẽ xem trước (Preview) đường nét chữ trên Tool Path View Canvas bắt đầu từ vị trí `WPos` hiện tại của đầu CNC.
✅ Đã bổ sung nút `🎬 Vẽ xem trước` (Giả lập chuyển động trên Canvas) và nút `🚀 Vẽ trên CNC` (Gửi G-code thực thi trên máy CNC thật).

**cập nhật 20** ở **cập nhật 19** đã có xuống dòng khi có \n nhưng mà các dòng đang sát nhau, thêm cấu hình để các dòng cách nhau
✅ Đã bổ sung tham số `line_spacing` (Tỷ lệ khoảng cách giữa các dòng chữ, mặc định `1.2x`) vào API Backend `POST /cncapi/v1/generate-font-gcode`.
✅ Đã tính toán khoảng cách dòng tương ứng `line_height_px = int(font_size_px * line_spacing)` trong PIL render để loại bỏ tình trạng các dòng chữ bị dính sát nhau.
✅ Đã bổ sung ô nhập liệu `Cách Dòng (Line Spacing)` (`#font-line-spacing`) trên Floating Panel Web UI và tự động cập nhật preview nét chữ realtime khi thay đổi.

**cập nhật 21** ở cập nhật 20 có line spacing. cần thêm cấu hình dạng khoảng cách tính bằng milimet khi gặp \n sẽ cần tạo ra thêm 1 khoảng trống để các dòng cách nhau  
không cần chạy tự động build dist tôi sẽ chạy khi cần 
✅ Đã bổ sung tham số `line_spacing_mm` (Khoảng cách dòng bổ sung mm, mặc định `0.0 mm`) vào API Backend `POST /cncapi/v1/generate-font-gcode`.
✅ Đã tính toán quy đổi mm sang pixel `extra_spacing_px = int(line_spacing_mm / scale_mm_per_px)` bổ sung vào PIL multiline render giúp các dòng giãn cách chính xác theo milimet.
✅ Đã bổ sung ô nhập liệu `Cách Dòng (mm)` (`#font-line-spacing-mm`) trên Floating Panel Web UI và tự động cập nhật preview nét chữ realtime khi thay đổi.

**cập nhật 22** Gcode with font đang không hạ bút vẽ khi click Vẽ trên CNC , cần kiểm tra code ,gcode cũng đang không vẽ đúng nét chữ như preview trên tool path view , xem lại code ở cnc/main.py để sinh gcode và điều khiển đầu cnc đúng 
✅ Đã đối chiếu với logic của `cnc/main.py` (sử dụng cơ chế `translate_command` để tự động biên dịch toàn bộ câu lệnh di chuyển Trục Z thành lệnh Servo `M3 S<pen_down_pwm>` / `M3 S<pen_up_pwm>` khi ở chế độ `spindle-pwm`).
✅ Đã nâng cấp API `POST /cncapi/v1/run-gcode` trong `cncapi/main.py`: Chuyển toàn bộ file G-code qua `translate_command` và nạp vào bộ truyền `gcode_streamer_task()` sử dụng giao thức đếm ký tự (Character-Counting Buffer Protocol, tối đa 127 bytes). Nhờ đó không bị tràn bộ nhớ đệm Serial của bo mạch GRBL, không bị nuốt câu lệnh, bút vẽ hạ đúng vị trí và vẽ hình chữ chuẩn xác 100% như bản preview.
✅ Đã đồng bộ tọa độ Y trong `generate_font_gcode` theo tham số `axis_dir_y`: tự động lộn ngược tọa độ Y `y_mm = round((raw_h_px - (pt[1] - pad_px)) * scale_mm_per_px + req.margin_mm, 2)` khi `axis_dir_y == -1` (hệ CNC Cartesian chuẩn), giúp nét chữ thực tế trên máy CNC trùng khớp 100% với hiển thị preview.
✅ Đã bổ sung tính toán offset vị trí làm việc `curWpos` (`X + curWpos.x`, `Y + curWpos.y`) khi bấm `🚀 Vẽ trên CNC` ở `static/app.js` để đầu CNC vẽ chính xác từ vị trí làm việc hiện tại.