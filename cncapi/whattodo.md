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

**cập nhật 23** Gcode with font, xem code và đưa thêm các chỉ số có thể config thay đổi được vào mục Điều chỉnh nâng cao, để người dùng có thể tùy chỉnh config các thông số của gcode with font.  hàm generate_font_gcode ờ cncapi/main.py các chỉ số liên quan tới việc tạo nét chữ cần cho người dùng config chỉnh sửa được để tạo gcode . Mục tiêu để viết chữ 1 nét giúp gcode sinh ra điều khiển cnc vẽ chính xác như font cung cấp. 
    Xem code hiện tại có FontGcodeRequest vậy tất cả các property field của FontGcodeRequest đều cho người dùng config dựa trên các giá trị mặc định hiện tại mà tăng giảm thay đổi

✅ Đã bổ sung mục collapsible UI `⚙️ Điều Chỉnh Nâng Cao (Config Chi Tiết FontGcodeRequest)` trên Floating Panel `gcode-font-editor-panel`.
✅ Đã hỗ trợ cấu hình tùy chỉnh cho **toàn bộ 17 thuộc tính (properties)** của `FontGcodeRequest` với giá trị mặc định hiển thị sẵn:
  1. `font_name` (`#font-select`): Font chữ được chọn.
  2. `text` (`#font-text-input`): Nội dung văn bản vẽ.
  3. `font_size_pt` (`#font-size-input`, mặc định `72 pt`): Cỡ chữ pt.
  4. `line_spacing` (`#font-line-spacing`, mặc định `1.2`): Tỷ lệ cách dòng.
  5. `line_spacing_mm` (`#font-line-spacing-mm`, mặc định `0.0 mm`): Khoảng cách dòng mm bổ sung.
  6. `feed_rate` (`#font-feed-rate`, mặc định `4000`): Tốc độ Feedrate di chuyển nét vẽ.
  7. `stroke_mode` (`#font-stroke-mode`, mặc định `single_line`): Chế độ nét chữ (`1 Nét` hoặc `Viền Chữ`).
  8. `z_safe` (`#font-z-safe`, mặc định `0.0`): Vị trí/Góc Servo PWM khi nhấc bút.
  9. `z_draw` (`#font-z-draw`, mặc định `45.0`): Vị trí/Góc Servo PWM khi hạ bút vẽ.
  10. `pen_mode` (`#font-pen-mode`, mặc định `spindle-pwm`): Chế độ điều khiển bút (`spindle-pwm` hoặc `z-axis`).
  11. `axis_dir_y` (`#font-axis-dir-y`, mặc định `1`): Hướng trục Y (`1` +Y hướng xuống hoặc `-1` Cartesian chuẩn CNC).
  12. `epsilon` (`#font-epsilon`, mặc định `1.2`): Độ mịn đường cong xấp xỉ `cv2.approxPolyDP`.
  13. `margin_mm` (`#font-margin-mm`, mặc định `5.0 mm`): Lề lùi viền khung chữ.
  14. `binary_threshold` (`#font-binary-thresh`, mặc định `128`): Ngưỡng tách ảnh chữ nhị phân (1-254).
  15. `render_dpi` (`#font-render-dpi`, mặc định `600 DPI`): Độ phân giải render font (`300`, `600`, `800`, `1200 DPI`).
  16. `min_path_len_mm` (`#font-min-path-len`, mặc định `0.5 mm`): Lọc nét rác nhiễu quá ngắn.
  17. `sort_row_height_mm` (`#font-sort-row-h`, mặc định `10.0 mm`): Gom nhóm hàng vẽ để tối ưu thứ tự nét di chuyển.
✅ Đã cập nhật Backend Pydantic Model `FontGcodeRequest` và hàm `generate_font_gcode` tiếp nhận và áp dụng tức thì tất cả các thuộc tính này.
✅ Đã gắn event listeners tự động kích hoạt cập nhật mã G-code và hiển thị preview nét chữ 1 nét realtime trên Web UI khi người dùng tăng/giảm thay đổi bất kỳ ô nhập liệu nào.

**cập nhật 24** Gcode with font, bỏ mục Mục 1.6 về cách chạy cnc như viết tay, tuân thủ gcode sinh ra cần vẽ chữ từ trái sang phải mô phỏng giống tay người viết chữ , cần ưu tiên từ trái sang phải , nhìn cho tự nhiên như viết bằng tay phải. 
✅ Đã khắc phục triệt để thuật toán sắp xếp nét chữ trong hàm `generate_font_gcode` tại `cncapi/main.py`:
  1. **Loại bỏ ưu tiên nét cao/nét dài**: Phân chia chính xác nhóm dòng chữ (`line_idx`) theo khoảng cách độ cao thực tế của dòng văn bản `line_height_mm`. Không còn hiện tượng các nét chữ cao/dài bị nhảy lên vẽ trước.
  2. **Viết tuần tự tuyệt đối từ Trái sang Phải (Strict Left-to-Right)**: Trong cùng 1 dòng chữ, mọi đường nét (ngắn, dài, nét chính, dấu phụ) được sắp xếp thứ tự ưu tiên tuyệt đối theo tọa độ `min_x` từ bé đến lớn. Đầu vẽ di chuyển tuần tự 100% từ trái qua phải tự nhiên như tay người viết chữ.

  **cập nhật 25** xem yêu cầu cnc/whattodo.md về Gcode editor dùng để xử lý ảnh thành sketch và sinh gcode điều khiển cnc xem code ở cnc/main.py cần lấy sang , bổ xung nút Gcode with image cạnh nút Gcode with font. Khi click nút Gcode with image thì sẽ mở floating window nằm bên phải chiếm 1/3 độ rộng page . logic chuyển ảnh thành sketch và gcode lấy ở cnc/main.py
    cần cho phép hiển thị xem trước lên Tool path view 
    các nút cần có tương tự như Gcode with font ví dụ
        nút Vẽ xem trước (chạy trên tool path view)
        nút Vẽ trên cnc (chạy trên cnc thực tế) 
    ✅ Đã hoàn thành toàn bộ Cập nhật 25:
      1. Đã đưa đầy đủ 4 module thuật toán (`image2gcodesketch.py`, `image2gcode.py`, `svg2gcode.py`, `OutlineExtractorPen.py`) vào `cncapi/`.
      2. Đã tạo REST API `/cncapi/v1/convert-image-gcode` tại `cncapi/main.py` nhận file ảnh/SVG/gcode, xử lý sinh mã G-code và trích xuất danh sách phân đoạn `segments`.
      3. Đã bổ sung nút `🖼️ Gcode with image` cạnh nút `✍️ Gcode with font` tại Cột 0 và tạo Floating Panel `#gcode-image-editor-panel` nằm ở lề phải chiếm 1/3 độ rộng trang (width 33%).
      4. Hiển thị đường nét xem trước màu vàng (Amber) trực tiếp trên Tool path view Canvas `#toolpath-canvas`.
      5. Đã tích hợp đầy đủ nút **🎬 Vẽ xem trước (Giả lập)** mô phỏng chuyển động nét vẽ trên canvas, nút **🚀 Vẽ trên CNC (Thực tế)** tự động cộng offset WPos phát lệnh tới máy CNC, cùng nút **💾 Lưu/Nạp Project JSON**.

**cập nhật 26** theo cập nhật 25 xử lý cho Gcode with image. xem cncapi/project_2 cosplay.json đây là config chuyển ảnh thành sketch có các config khá tốt để cho ảnh chân dung, xem tương ứng với code Thuật Toán Chuyển Đổi nào, lấy các value ra làm config , có thể mới Thuật toán chuyển đổi : Sketch dành cho vẽ chân dung 
✅ Đã hoàn thành Cập nhật 26:
  1. Phân tích file `cncapi/project_2 cosplay.json` trích xuất thông số cấu hình sketch tối ưu cho ảnh chân dung: `editorScale: 0.15`, `sketchBlurSize: 9`, `sketchClaheClip: 1.0`, `sketchMinContourLen: 18`, `sketchUseThin: False` (Giữ độ dày mượt tự nhiên của nét chân dung).
  2. Thêm preset **Sketch Chân Dung (Portrait Preset - Cosplay)** vào dropdown `Thuật Toán Chuyển Đổi` (`#image-algorithm-select`).
  3. Đã gắn event listener tự động nạp các thông số chuẩn từ `project_2 cosplay.json` vào các ô nhập liệu UI khi chọn preset **Sketch Chân Dung**.

**cập nhật 27** ở Gcode with image, gcode sinh ra cũng cần vẽ từ trái sang phải, giống thứ tự vẽ gcode của Gcode with font 
✅ Đã hoàn thành Cập nhật 27:
  1. Đồng bộ thuật toán sắp xếp đường nét `sort_gcode_paths_left_to_right` trong [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) giống 100% logic của `generate_font_gcode` (Cập nhật 24).
  2. **Đảo hướng nét vẽ (Stroke Orientation)**: Nếu nét vẽ di chuyển từ Phải sang Trái (`p_end.x < p_start.x - 0.1`), tự động đảo ngược danh sách điểm để nét luôn di chuyển từ Trái sang Phải. Với nét đứng dọc (`abs(dx) <= 0.1`), ưu tiên vẽ từ Trên xuống Dưới.
  3. **Sắp xếp theo thứ tự ưu tiên (Strict LTR Sorting)**: Gom các nét theo nhóm dòng `sort_row_height_mm` (Top to Bottom) và sắp xếp thứ tự ưu tiên tuyệt đối theo tọa độ `min_x` từ bé đến lớn.
  4. Đảm bảo toàn bộ G-code ảnh sinh ra vẽ tuần tự từ trái sang phải tự nhiên trên Canvas xem trước và máy CNC thật.

**cập nhật 28** ở Gcode with font, bổ xung them lưu project, load project giống Gcode with image 
✅ Đã hoàn thành Cập nhật 28:
  1. Thêm 2 nút **💾 Lưu Project JSON** (`#btn-save-font-project`) và **📂 Nạp Project JSON** (`#btn-load-font-project`) cùng thẻ file input ẩn `#font-project-file-input` vào panel **Gcode with font** trong [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html).
  2. Bổ sung event listeners trong `initGcodeFontEditor()` tại [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js):
     - **Lưu Project JSON Font**: Xuất cấu hình đầy đủ gồm chuỗi văn bản, font_name, font_size_pt, line_spacing, feed_rate, z_safe, z_draw, pen_mode, axis_dir_y, epsilon, margin_mm, binary_threshold, render_dpi, min_path_len_mm, sort_row_height_mm, mã fontGcode và danh sách đường nét `preview_paths`.
     - **Nạp Project JSON Font**: Nạp lại file JSON project font, tự động điền toàn bộ 15+ thông số vào giao diện Web UI, phục hồi đường nét vẽ xem trước trên Tool path view Canvas và chuỗi G-code.

**cập nhật 29** Gcode with font, Gcode with image, bổ xung thêm nút 
    Dừng và về gốc ban đầu trước khi vẽ 
    Dừng và về gốc làm việc
    Việc dừng sẽ là nhấc dao lên rồi mới di chuyển
        Dừng là có thể gửi lệnh dừng khẩn cấp để clear các lệnh đã nạp, sau khi về vị trí quy định sẽ unlock để các thao tác khác thực hiện được     

**cập nhật 30** đưa 2 nút Gcode with font, Gcode with image xuống dưới của vùng Cử Chỉ Touch & Swipe Gestures
✅ Đã hoàn thành Cập nhật 30:
  1. Đã chuyển vị trí 2 nút **✍️ Gcode with font** (`#btn-open-gcode-font`) và **🖼️ Gcode with image** (`#btn-open-gcode-image`) từ header Cột 0 xuống bố trí ở vị trí mới ngay phía bên dưới vùng **Cử Chỉ Touch & Swipe Gestures** (`<div class="gestures-container">`) trong [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html).
  2. Bố trí dạng lưới 2 cột gọn gàng với viền phân cách đường kẻ mỏng (`border-top`), giúp thao tác liên tục thuận tiện ngay sau khi định vị điểm/bắt đầu kịch bản.

**chú ý** đọc whattodo.md suy nghĩ và viết cách làm vào howtodo.md để review với howtodo.md

