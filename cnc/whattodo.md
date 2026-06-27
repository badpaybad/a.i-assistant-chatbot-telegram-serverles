usb  /dev/ttyACM0
đang connect tới cnc
dùng python lập trình với grbl

folder làm việc: cnc

trục x, y là động cơ bước nema 17

trục z của tôi là servo sg90 hiện tại đang test device setting GRBL-M3 (1.1e or earlier) , light burn đang điểu khiển fire theo % độ.

hiện tại cần dùng cnc để gắn bút cảm ứng, để giả lập touch, vuốt lên màn hình điện thoại

click z+ 2 lần thì phải xoay 2 lần mỗi lần 10 độ, ngược lại click z- 2 lần thì quay ngược 10 độ 2 lần

click pen up, click pen down thì về đúng độ được set

cần vừa gửi lệnh x,y , vừa gửi được spindle z , cần giả lập như ngón tay người touch, many touch, vuốt trái , vuốt phải , vuốt chéo , vuốt lên, vuốt xuống ...

đã cắm camera usb rapoo , bổ xung thêm lên UI để xem camera. camera đang treo phía trên khung cnc để theo dõi, div camera cần luôn hiển thị dạng fixed css và có thể colapse được , vùng camera có thể kéo to hoặc thu nhỏ vùng xem

**cập nhật 1** để xác định gốc tọa độ cho đầu bút cần dựa vào 4 ArUco Marker như hình cnc/printarea.png
camera capture được ảnh, cần xác định 4 đỉnh của hình chữ nhật. rồi đưa đầu bút vào chính giữa hình chữ nhật
    cần draw hình chữ nhật được xác định bới 4 ArUco Marker đó trên video.
    cần vẽ trục tọa độ x,y trên video , sao cho gốc tọa độ trùng với tâm của hình chữ nhật.

**cập nhật 2** khi dùng web UI để điều khiển , và đưa đầu bút vào gốc tọa độ. nhấn nút Home để set gốc tọa độ hiện tại trên ảnh cũng là gốc 0,0,0 của xyz cnc . Cần lưu lại để tắt máy đi vẫn dùng lại được.
Ảnh và 4 đỉnh cũng cần lưu tại thời điểm nhấn nút Home. dùng ảnh đó như bản đồ để di chuyển đầu bút . dựa trên tính toán gốc tọa độ . Ví dụ như sau khi set gốc xong, tôi muốn di chuyển đầu bút tới vị trí (10,10) thì tôi chỉ việc nhập 10,10 vào web UI, và nhấn nút GoTo. lúc đó web UI sẽ tính toán xem đầu bút đang ở đâu , so sánh với ảnh gốc để xác định vị trí , rồi di chuyển đầu bút tới vị trí (10,10)

**cập nhật 3**
camera feed có thể mở rộng full page , để nhìn video cho to rõ hơn

dùng model cameraip/train/runs/detect/train/weights/best.onnx và code detect usage ở cameraip/train/detect_onnx.py để phát hiện ra object trong frame camera , lấy ra object có bbox to nhất lấy điểm trung tâm và gửi lệnh di chuyển đầu bút đến vị trí đó
    các nút chức năng chiếm nhiều vị trí của feed camera, cần video camera rộng  min 480px chiều rộng, video min chiều cao 320px, kể cả chưa phóng to full page
    detect được object thì cần vẽ bbox trên video  

**cập nhật 4**
thêm các lệnh ls để lấy danh sách usb camera , serial port để connect , droplist chọn và có thể gõ text nếu cần thay cho việc chọn sẵn ở droplist

**cập nhật 5** ở **cập nhật 3** detect object cần bật mặc định, khi detect được thì cần cho phép click go to object , giữ lại vị trí cuối của object lagest, để có thể click nút go to lagest object cần enable lên
    click sẽ di chuyển đầu bút tới vị trí đó

**cập nhật 6**
khi detect ArUco Marker và yolo object detect cần dùng frame ảnh gốc từ camera. sau khi có tất cả các điểm rồi thì mới vẽ lên frame để hiển thị
    detect object chỉ lấy lable: sittng, dùng object to nhất để xác định vị trí theo gốc set home

**cập nhật 7** Last Largest Object khi detect ra bbox và tính ra trung tâm bbox. cần dựa vào Aruco và gốc tọa độ để tính ra điểm cần di chuyển đến của đầu bút khi click Go to largest object
Sau khi set home nút Go to largest object sẽ được enable, bbox sẽ tính theo gốc home được set theo ảnh home đã chụp

**cập nhật 8** dựa vào 4 điểm Aruco , đổi nút Move Spindle to Center thành Moving around. Khi click sẽ điều khiẻn đầu bút đi theo  hình chiều kim đồng hồ lần lượt 4 điểm , đi từ gốc , lên đến top right,bot right, bot left, top left , gốc , top right ... vòng lặp cho tới khi click lại Moving around. sẽ chuyển trạng thái vd Moving around -> Moving around started -> Moving around stop  -> Moving around . do có khung vật lý nên cần tránh va chạm động cơ khi di chuyển. với hình vuông theo vị trí 4 điểm aruco, mà đường chéo từ gốc đến 4 điểm là 100
    đến từng điểm thì lại giả lập touch bút, hạ xuống nhấc lên rồi mới di chuyển tiếp

**cập nhật 9**
việc trả frame hiển thị cần nhanh hơn bằng cách tách tính toán aruco, detect object ra các thread khác nhau, khi có kết quả thì vẽ lên frame hiển thị cho UI
frame latest cần lưu lại để dùng cho các thread xử lý về aruco và detect object ở 2 thread riêng , thread vẽ lền frame cho UI riêng
thread aruco
    để xử lý 4 aruco có thể  chia frame ảnh ra 4 phần hình chữ nhật, từ tâm của frame ảnh sang các trung điêm các cạnh của frame
        các điểm của aruco tìm được cần lưu latest nếu tìm được , như vậy có 4 điểm latest luôn có giá trị để vẽ lên frame UI , việc tính toán gốc cũng là vậy
            tọa độ hiện tại từ trái sang là x+ từ trên xuống là y+
thread detect object cũng cần riêng
    detect và lưu lại bbox latest, cũng như tâm của bbbox, trong vòng 5s nếu không thấy detect được object thì clear last largest, để không vẽ lên frame ảnh nữa

**cập nhật 10**
cần cải thiện việc nhận 4 điểm aruco chính xác hơn, để camera về frame 1280x720. cần frame hình vuông khi đưa vào xử lý nhận diện aruco, object ... nên cần crop frame về 720x720 lấy vùng giữ frame. để giữ nguyên chất lượng ảnh. trước khi nhận diện aruco và dùng yolo cần crop về frame 720x720, UI hiển thị cũng sẽ dùng frame 720x720 này

camera frame gốc -> crop frame lấy đoạn giữa frame crop 720x720 -> cho việc xử lý aruco, object ..., UI hiển thị

bỏ việc chia 4 tính aruco xử lý nguyên frame để tìm các điểm của aruco ưu tiên giữ

detect object hoạt động cần detect liên tục và giữ lại latest cùng với thời gian để sau này quyết định dùng vào việc khác .
tương tự các aruco cũng cần lưu cùng thời gian , cần tìm cách để nhận ra các aruco chính xác hơn

lưu lịch sử theo thời gian cần lưu 500 item cuối theo thời gian cho mỗi loại, để tránh tràn bộ nhớ

**cập nhật 11**
bổ xung thêm nut set aruco , khi set aruco thì 4 điểm tại thời điểm nhấn chọn là tiêu chuẩn để dùng vẽ tọa độ và việc tính toán tọa độ cho việc di chuyển . việc vẽ hiển thị UI là vẽ theo các điểm aruco tìm được
    vẫn detect tiếp aurco nhưng nét vẽ cần mờ đi

khi set aruco xong thì nó chính là tiêu chủân để tính gốc tọa độ , người dùng sẽ di chuyển đầu bút của CNC tới gốc tọa độ và set home. set home để xác định vị trí cho CNC di chuyển
    các tính toán tọa độ sẽ cần dựa trên các aruco , gốc tọa độ tính tương đương với frame croped 720x720
    vẽ tọa độ trên frame cần thêm x+ ở trung điểm cạnh bên phải , y+ ở trung điểm cạnh dưới cùng  

**cập nhật 12** Perspective Matrix Transformation có hỗ trợ việc tìm aruco tốt hơn không? có thể cải thiện tốt việc nhận aruco trên frame croped 720x720 cho chính xác và ổ định hơn, hiện tại camera caputure về  4 điểm aruco nhảy lung tung không ổn định

**cập nhật 13** bổ xung chuột phải lên video để set các vị trí aruco : TL (top left), TR (top right), BR (bottom right), BL (bottom left) nếu detect quá lâu. sau khi set bằng chuột phải trên video cần lưu lại để dùng trong việc tính gốc tọa độ.
    mọi tính toán sẽ cần dùng tới gốc tọa độ này.
    cần vẽ theo các điểm aruco này, và vẽ gốc tọa độ
    khi di chuyển đầu bút tới gốc và set home. là set home cho cnc đầu bút.

khi có aruco, gốc tọa độ, set home cho đầu bút CNC , toàn bộ cần lưu lại, lưu vị trí hiện tại của đầu bút để khi tắt đi bật lại vẫn dùng được.
    cho phép reset các điểm aruco và set home lại .
    các tính toán về di chuyển sau này đều cần tham chiếu tới gốc tọa độ , aruco, set home value

**cập nhật 14** bổ xung thêm nút capture 1280 và nút capture 720, cạnh drop list chọn camera ở vùng camera feed
    nút capture 1280
        khi click sẽ capture frame gốc của camera trước khi croped
    nút capture 720
        khi click sẽ capture frame gốc và croped đã lấy vùng giữa 720

sau khi có ảnh cần cho người dùng chọn thư mục để lưu.
    dạng chọn folder như download file của trình duyệt ở máy client, lưu ảnh chụp được qua trình duyệt
    lưu ảnh dạng jpeg frame capture

**cập nhật 15**
chức năng ở Touch & Swipe Gestures . bổ xung thêm checkbox auto lấy theo đầu bút của cnc, mặc định là checked
    khi checked cần lấy theo vị trí hiện tại của đầu bút để thao tác, Start Position (X, Y) cần cập nhật tự động theo vị trí hiện tại của đầu bút.  

**cập nhật 16** việc object detect sẽ load /work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/runs/detect/train/weights/best.onnx , model train có nhiều labels, trong đó
    lable cnchead là đầu but cnc cần vẽ lên video , nếu detect được cnchead
        vị trí đầu bút cnc đã dược xác định qua grbl, cần so sánh nếu vị trí từ grbl nằm bên trong vùng bbox cnchead detect, nếu nằm ngoài vùng bbox cần hiển thị text lỗi not in range
    lable sittng, là object cần lấy largest đẻ khi go to largest object thì đầu bút cnc sẽ di chuyển đến
sau này mô hình sẽ còn các labels khác (kể cả sittng, ccnhead đã có xử lý riêng và vẽ rồi), detect được sẽ cần vẽ label tương ứng lên video frame UI

**cập nhật 17** khi set home (home_snapshot) cũng chính là vị trí của cnc header hiện tại.  

**cập nhật 18** cần tốc độ vuốt của đầu bút nhanh như tay người, khi vuốt cũng nhấc dần đầu bút lên cao khi tới cuối hành trình thì là như nhấc hẳn ngón tay lên màn cảm ứng
    Step Size (Distance) và Jog Feed Rate, Feedrate,Dist (mm),Swipe/Dwell (s),Tap Dwell (s) cần thành global apply, cũng cần lưu lại để khi tắt đi mở lại vẫn dùng như được set
    cần lưu cả phía server và client load theo server
    việc nhấc đầu but lên dần có thể servor chỉnh theo 1 độ 1 lần như vậy giống việc vuốt của tay người, tốc độ cần nhanh tăng tốc dần

Step Size (Distance) và Jog Feed Rate, Feedrate,Dist (mm),Swipe/Dwell (s),Tap Dwell (s) cần thành global sử dụng cho tất cả các chế độ để di chuyển của đầu CNC, từ tab , vuốt, click trên video di chuyển đầu cnc, go to x y, moving around , go to largest object ...
cnc/pen_settings.json cần merger vào cnc/calibration_settings.json để chỉ còn 1 file và thống nhất về các chỉ số cấu hình sử dụng cho toàn bộ hệ thống
Vuốt dạng nhấc dần đầu bút lên đang bị giật giật, chuyển về ban đầu, nhấn bút vuốt rồi tới cuối nhấc hẳn bút, bỏ nhấc dần dần

**cập nhật 19** bỏ tính toán động 4 aruco bằng detect camera, dùng hoàn toàn 4 điểm aruco được set manual, từ đó có gốc tọa độ chính xác để ánh xạ tính toán với set home cnc, cnc header của croped frame 720x720, việc click video di chuyển, hay detect largest object sẽ theo tọa độ của 4 điểm aruco set manual .

**cập nhật 20** kiểm tra lại việc tính toán click chuột trên frame video croped 720x720, ảnh UI cũng đang hiển thị 720x720 thì cần ánh xạ tính toán tọa độ chính xác. khi tôi click Go To X,Y về home thì đã về đúng vị trí pixel trên ảnh, khi click vào điểm bất kỳ trên video để di chuyển tới đó thì vị trí đầu bút CNC đi tới không đúng vị trí pixel vừa click vào, kiểm tra và sửa chính xác .
trục tọa độ của ảnh là tù vị trí gốc , OX trái sang phải là dương tăng dần , OY từ trên xuống là dương tăng dần
set home của cnc cần đi theo, hiện tại việc di chuyển đầu cnc bị ngược chiều Y của ảnh
    việc di chuyển đầu CNC cần đúng tới vị trí click trên ảnh, hiện chưa đúng về Y, cần tính X,Y chính xác trên frame ảnh khi được click rồi transform và dựa trên home của cnc và di chuyển
    đầu CNC đang bị di chuyển ngược trục Y so với click trên ảnh

**cập nhật 21**
Khi set manua 4 điểm aruco sẽ có gốc tọa độ trên croped frame 720x720, khi set home cnc thì đầu cnc đã được điều chỉnh ở gốc tọa độ. Cần bổ xung thêm 4 nút set cnc TL, TR, BR, BL để set các vị trí của cnc header tương ứng với các điểm aruco, người dùng sẽ tự di chuyển đầu cnc tới đúng 4 tọa độ điểm aruco trên frame croped và click nút set cnc tương ứng, sau đó click set cnc tl, tr, bl, br để lưu ánh xạ từ điểm ảnh với vị trí cnc. sẽ có bộ home cnc là gốc tọa độ , các cnc tl, tr,br,bl tương ứng với các tọa độ điểm aruco tl,tr,br,bl
    Cần tính pixel tỷ lệ tương ứng với milimet frame ảnh 720x720 và cnc  (cnc G21 G90  ; Đặt đơn vị mm, chế độ tọa độ tuyệt đối)
        Tất cả các tính toán đều cần dựa vào các gốc tọa độ tương ứng set home cnc, các điểm aruco tl,tr,br,bl tương ứng cnc tl,tr,br,bl sẽ dùng khi go to object khi detect được, vẽ đường baseline cho việc vẽ tranh, click trên ảnh để di chuyển ...
các tính toán cần dựa trên các điểm: set home cnc (gốc tọa độ trên ảnh theo các aruco ), aruco tl,tr,br,bl , cnc tl,tr,br,bl
    đầu CNC đang bị di chuyển ngược trục Y so với click trên ảnh

**cập nhật 22**

thêm 1 floating window chiếm nửa bên trái của UI, UI này gọi là Gcode editor
    cho phép người dùng chọn file ảnh (jpg png ...) hoặc svg
    khi chọn xong tham khảo code cnc/svg2gcode.py hoặc cnc/grblgcode2image.py để tạo ra gcode
    khi có gcode rồi thì cần vẽ lên html5 canvas tham khảo cnc/gcode_canvas.html và cnc/gcode2htmlcanvas.py
    khi có canvas rồi cho phép người dùng chỉnh sửa, có thêm việc vẽ tay trên canvas để thêm các đường vẽ, khi vẽ tay gần hoặc trùng với các đường có sẵn của gcode gốc cần chỉnh lại các đường để cho mịn liền mạch để gcode sinh ra không bị đứt đoạn và di chuyển cnc để vẽ không bị giật cục
    cho phép chọn các đọan để xóa

    chỉnh sửa xong cho phép người dùng lưu lại : ảnh gốc, gcode gốc, gcode đã chỉnh sửa
    lưu lại các file, có thể load lại để dùng cho các lần sau
    có nút Thực hiện vẽ
        lúc này gcode đã chỉnh sửa sẽ được gửi tới cnc máy vẽ để thực hiện lệnh di chuyển cnc head để vẽ.
        vị trí hiện tại của đầu cnc là gốc home rồi mới bắt đầu vẽ 

**cập nhật 23** bổ xung nút <button class="btn btn-warning" id="btn-stop-to-home">Stop & go home</button> khi người dùng click thì gọi lệnh stop cnc , reset gcode ở máy cnc và go to home

**cập nhật 24** <canvas id="toolpath-canvas"></canvas> đang vẽ bị ngược như gương, trục Y cần điều chỉnh

**cập nhật 25** ở gcode editor , lưu project và load project chưa hoạt động
    lưu project cho phép người dùng lưu vào file dạng json các dữ liệu (gồm cả ảnh , gcode gốc, gcode đã chỉnh sửa ..), cho phép người dùng chọn folder như download về
    load project cần chọn file json đã lưu, chọn xong các dữ liệu (gồm cả ảnh , gcode gốc, gcode đã chỉnh sửa ..) được load lại vào gcode editor để tiếp tục

**cập nhật 26**
gcode editor gcode-editor-panel cần chiếm 1/4 độ rộng của page. min width là theo editor-canvas để vẽ đúng kích cỡ
    editor-sidebar cần thành bottom bar của gcode editor
    editor-canvas cần nằm phía trên

**cập nhật 27** bổ xung nút <button class="btn btn-success" id="btn-editor-preview-in-video-frame" ... ></button> button này khi click sẽ dựa vào video frame ở div id=camera-floating-panel , dựa vào object detect ra cnchead để lấy vị trí của đầu cnc trong video frame và vẽ gcode đã chỉnh sửa ở gcode editor tương ứng vào video frame UI
    cnc header object detected là class_id=0 hoặc class_name=cnchead

**cập nhật 28**  <div class="editor-canvas-wrapper" id="editor-canvas-wrapper">
                    <canvas id="editor-canvas" width="720" height="720"></canvas>
                </div> 
trong thẻ div trên cần bổ xung side menu bên phải cho id="editor-canvas" dựa vào code cnc/image2gcodesketch.py cần lấy ra các chỉ số để đưa lên UI cho phép người dùng thay đổi động để lấy sketch , sketch này sẽ tạo ra các gcode đã chỉnh sửa để xem preview thay đổi trên frame video
khi chọn file ảnh ở 2. Chọn File Ảnh / SVG  . thì Sketch Settings cần có các UI control để thay đổi thông số liên quan để tạo sketch, thay đổi realtime khi người dùng thay đổi UI control, tạo ra gcode đã chỉnh sửa để hiển thị lên frame video 

Bổ xung thêm check box cho Sketch Settings, để apply filter hoặc không
    từng filter đều cần có check box để apply vào ảnh lấy sketch chuyển thành gcode đã chỉnh sửa hay không 
    các logic hiển thị trước đó lên framevideo , editor canvas draw,toolpath view đang đúng , chỉ riêng cnc/image2gcodesketch.py dang bị sai trục Y, cần sửa lại  