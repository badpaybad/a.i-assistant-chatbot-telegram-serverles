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

**cập nhật 29** ở gcode editor editor-file-input khi chọn upload lên cần kiểm tra chiều rộng, chiều cao nếu 1 trong 2 lớn hơn 720px thì resize về 720px giữ nguyên tỷ lệ để dùng cho việc vẽ và convert gcode. coi ảnh resized là ảnh gốc để làm gcode và lưu project
    api/gcode-editor/convert khi gọi lên convert chưa resize, việc tạo gcode và các bước sau này đều dùng ảnh đã resize

**cập nhật 30**
ở float window video feed, sẽ bổ xung thêm chức năng: Scenario
    sau title Video feed, thêm input text nhập tên scenario + button create scenario, lúc này sẽ khởi tạo 1 scenario và hiện nút save scenario  , cancel ( để không lưu scenario hiện tại )
        khi create scenario các thao tác chuột phải dùng để lưu các vị trí x,y, cnc head, action tại vị trí ( tab, double tab , swipe ...)
        khi chuột phải vào video sẽ thêm các menu item để lưu các action phụ vụ cho kịch bản
            - set begin : lưu vị trí x,y trên ảnh , cùng cnc header  , sau này khi chạy kịch bản but cần nhấc lên trước cnc head sẽ về vị trí này trước
            - go to here: lưu vị trí x,y trên ảnh , cnc header và but cần nhấc lên trước , sau này khi chạy kịch bản sẽ cnc sẽ di chuyển đến vị trí này trước sau đó thực hiện các action tiếp theo
            - các ation giả lập touch ( tab, doulbe tap , swipe down, swipe up, swipe left, swipe right, pen down, pen up) lưu vị trí x,y cùng cnc header
                swipe down (mô phỏng giống khi click btn-gesture-swipe-down ) là mũi tên đi lên, swipe up (mô phỏng giống btn-gesture-swipe-up click) là múi tên đi xuống, do trục tọa độ đi theo set home tương tự cho tab, double tab swipe left, swipe down, long press
            - go to keep state: giữ nguyên trạng thái bút (vd đang down) để di chuyển đến vị trí x,y chọn
            - dwell 0.25s : tạm dừng 0.25 giây
            - set end: lưu vị trí x,y trên ảnh cùng cnc header và but cần nhấc lên , khi chạy kịch bản sẽ về vị trí cuối
        khi click nút save scenario thi cho người dùng lưu thành json và download về.
        có nút load scenario chọn json file load lại
        sau khi chuột phải set end hoặc trong scenario có điểm set end thì enable nút chạy , để click vào thì đầu cnc sẽ chạy theo kịch bản.
        có nút sửa kịch bản hiện modal góc trái có thể di chuyển. để xóa item kịch bản và load lại kịch bản với các thay đổi. có thể thay đổi thứ tự các step trong scenario, đầu cuối vẫn là set begin, set end vẫn cho phép đổi thứ tự trong scenario
            các step chạy lần lượt cần xong rồi mới tới step tiếp theo
không cần test tự động trên chrome, sửa xong tôi tự test

**cập nhật 31** generateGcodeFromSegments đang reset  lines.push("G10 L20 P1 X0 Y0 ; Reset vi tri"); xung đột set home, ở phần image to gcode này chỉ cần vẽ bắt đầu từ vị trí hiện tại của đầu cnc

**cập nhật 32** ở generateGcodeFromSegments ưu tiên vẽ các đường connected dài trước.

**cập nhật 33** scenario thêm nut run loop cạnh nút run để làm vòng lặp chạy kịch bản. đến khi click stop loop
    sau khi run loop, nút này toggle thành stop loop, khi stop loop sẽ không chạy run nữa.
    nút run trước đó đang click chạy kịch bản 1 lần
    run loop chạy kịch bản vòng lặp kịch bản xong 1 lần tới lần tiếp theo
xem logic btnRunLoopScenario việc enable khi set end xong cần giống btnRunScenario . không cần state phức tạp, khi start run loop rồi, thì toggle chuyển thành stop loop. click stop loop dừng lại không loop nữa

**cập nhật 34** kiểm tra việc set home với button btn-reset-home , toàn bộ hệ thống chỉ có 1 điểm set home này, khi cnc mất điện hoặc reset việc chạy lại điểm set home này cần được giữ
    giữ thông số cho cả cnc lẫn ảnh UI , frame camera để tham chiếu.

Không cần set home lại dưới bất kỳ action nào, cũng không cần set lock cnc tự khi thực hiện các action , chỉ cần button btn-reset-home khi click để set home làm tính toán cho đầu cnc, cho ảnh và frame camera

Không cần set alarm lock tự động khi chạy các kịch bản
    vậy khi nào bị alarm lock cnc ? việc này chỉ cần làm manual với nút click trên UI , jog-unlock toggle làm việc đó

Nếu có lệnh stop và clear buffer tự động khi chạy xong kịch bản, xuất hiện alarm lock khi thực hiện lock xong cần unlock trở lại

**cập nhật 35** chuyển giao diện các text đang là tiếng Anh sang Tiếng Việt

**cập nhật 36** xây dựng cơ chế đa ngôn ngữ (i18n) chuẩn bằng JSON trong thư mục static/lang (en.json, vi.json). HTML sử dụng các tag thuộc tính data-i18n, data-i18n-placeholder, data-i18n-title. Javascript sử dụng hàm t(key, replacements) để dịch động các thông điệp hệ thống, log và tooltip trạng thái mà không bị mất key khi chuyển đổi qua lại.

**cập nhật 37** vị trí cuối cùng của đầu CNC khônng phải là vị set home. vị trí set home đã thống nhất ở **cập nhật 34** chỉ duy nhất viết set home khi button btn-reset-home được click .
khi tắt máy khởi động lại hệ thống, cần tính toán lại đầu cnc cho đúng theo vị trí cuối của cnc và vị trí được set home
    Vd hệ thống khi set home xong . di chuyển đầu CNC ra một vị trí bất kỳ. khi hệ thống mất điện bật lại cần xác định được vị trí cnc head để nếu click go to x=0 y=0 hoặc Stop & go home thì đầu cnc về đúng vị trí set home, cần match giữa frame ảnh và cnc head để tính toán được vị trí đúng.

**cập nhật 38** hiệu chỉnh thống nhất hướng trục Y khi tính toán sai lệch giữa camera Bed Coordinate System (BCS) và hệ trục tọa độ thực tế của máy CNC. Trục Y của camera (BCS) tăng theo chiều đi lên, ngược với trục Y của máy CNC (tăng theo chiều đi xuống). Do đó, khoảng lệch Y được tính toán bằng live camera hoặc khôi phục gốc Home cần được đảo dấu (`y_cnc = -(y_head_bed - y_home_bed)`) để tránh việc đầu CNC di chuyển ngược hướng trục Y khi thực hiện Go to Home hoặc di chuyển về 0.

**cập nhật 39** ở floating window video frame, trên top khi nhận diện được các object trong frame, cần hiện tên các label , khi nhấn vào 1 label thì đầu cnc sẽ di chuyển tới vị trí đó. (tâm bbox của cnc head sẽ di chuyển dến tâm bbox của object detedcted)

**cập nhật 40** các text ở cnc/static/app.js innertext, label , log to console cần chuyển sang tiếng Việt và dùng cơ chế i18n (đa ngôn ngữ) ở **cập nhật 36**

Khi droplist change language thay đổi thì các tag html5 đã thay đổi theo ngôn ngữ, nhưng các data bind động bằng javascript thì chưa, cần thay đổi theo lang được chọn, lang được chọn cần lưu vào localstorage để lần sau khi vào lại website sẽ dùng lang đã chọn

**cập nhật 41** floating window video frame, thêm side pannel bên trái frame video , side panel bên trái này ẩn hiện được. có các button chức năng bên trong hoạt động cho scencario.
    các button sẽ có chức năng giống như chuột phải vào video frame : set start, set end ....
        khi các button được click thì dựa vào vị trí hiện tại của cnc head để ghi nhận vị trí và thao tác tương ứng các step của scenario.

**cập nhật 42** tìm hiểu tại sao khi click trên video frame mà cnc head di chuyển đến lại chưa chính xác, đầu but touch cần di chuyển tới đúng vị trí click. thường đầu bút touch khi set home thị vị trí x,y là đúng đầu bút touch gắn trên cnc head rồi.

bổ xung thêm menu của việc set 4 góc aruco, thêm 1 nút set touch pen position. lúc này cần đánh dấu match giữa x,y của cnc head và vị trí touch pen position trên ảnh. việc di chuyển lúc này sẽ có tính toán dựa trên pixel trên frame video cần ánh xạ bù trừ x,y cho cnc head để di chuyển đến chính xác vị trí click trên ảnh . với giả định khi đã set home xong sẽ đến set touch pen position . từ đó gốc tọa độ trên frame video, gốc home cnc , cnc head position (x,y) và touch pen position trên frame video sẽ luôn có công thức và offset để bù trừ khi tính toán và di chuyển
    khi set home thì gốc tọa độ trên frame video cũng là home của cnc và cnc head đang có touch pen nằm ở vị trí gốc tọa độ frame, x,y cnc cũng đang ở gốc tọa độ home. việc cnc di chuyển thì touch pen position cũng di chuyển tương ứng , bỏ qua điểm trung tâm khi A.I bbox được cnc head và không dùng điểm này làm tính toán mà dùng touch pen position để tính toán

**cập nhật 43** dùng kết quả calibration ở cnc/camera_calibration_result.npz để tính toán vị trí frame video cho đúng, về vị trí set home , touch pen position, các object detect ... để tính toán cho việc di chuyển cnc head chính xác tới các vị trí khi click trên frame video, khi move tới object detected ...
về resolution hiện tại ảnh crop từ frame video là 720x720 và hiển thị lên web UI cũng là 720x720 đồng nhất từ calibration cho đến frame video croped và hiển thị UI giữ nguyên 720x720 không cần crop lại
check nếu có file cnc/camera_calibration_result.npz mới áp dụng tính toán theo nó, khi update cần khởi động lại hệ thống để cho an toàn

**cập nhật 44** khi set home thì gốc tọa độ trên frame video, gốc home cnc cần lưu để khi tắt hệ thống đi mở lại vẫn đúng vị trí như khi set.
vị trí cuối cùng của cnc và tương ứng với vị trí đó là touch pen position trên frame video , khi khởi động lại các vị trí này cần được load lại.
    vd khi có các vị trí home cnc, gốc tọa độ frame video, vị trí cuối của cnc head , vị trí cuối của touch pen . click nút go to x=0, y=0 hoặc stop and go home thì cnc sẽ di chuyển về home cnc , tương tự touch pen postion cũng sẽ về gốc tọa độ video frame

**cập nhật 45** các cập nhật 42, cập nhật 43, cập nhật 44 dùng để xử lý việc tính toán di chuyển khi thao tác trên frame video cho cnc head ở ngoài đời thực. bổ xung thêm chiều cao thực tế từ camera tới mặt phẳng làm việc (mặt phẳng số 0) là 542mm (54.2cm). áp dụng việc tính toán cho việc click trên frame video để di chuyển cnc head ( đầu cnc), move to object detected, go to home , set home , set pen touch position, set 4 marker aruco manual ...cần di chuyển đúng tới vị trí
cần lưu thêm chiều cao vào cấu hình để khi tắt máy load lại vẫn dùng được. tính toán về y cần xem cập nhật 20, cập nhật 24, cập nhật 38

gốc tọa độ frame video là tâm của hình được tạo từ 4 aruco manual khi chuột phải set, khi set home thì cnc head thực tế đã nằm đúng vị trí  gốc tọa độ frame video.
với frame video gốc tọa độ frame video trái sang phải là trục +x, gốc tọa độ frame video trên xuống dưới là trục y+  

```
       |
       |
_______|_______x+
       |
       |
       |y+
```

phần tư thứ 0: x+, y+
phân tư thứ 1: x-, y+
phân tư thứ 2: x-, y-
phân tư thứ 3: x+, y-

đang bị sai cần sửa, click chuột vào phần tư thứ 0 thì cnc head thực tế lại di chuyển về phần tư thứ 3, cần sửa cho đúng việc tính toán từ position pixel trên frame video thành gcode cnc head di chuyển

**cập nhật 46**
không dùng lại code tính toán để di chuyển cnc head ở các cập nhật : cập nhật 45, cập nhật 44, cập nhật 43
camera capture về là frame gốc. xác định tâm của frame gốc theo độ phân giải frame gốc đó (width gốc / 2, height gốc / 2) và tính offset để crop ra được frame 720x720.
frame croped 720x720 gọi là frame chính
frame chính cũng là ảnh để dùng trong việc detect object (a.i detection)
frame chính dùng để tính toán, để hiển thị web UI
cần vẽ hiển thị trục tọa độ làm việc trên frame chính , gốc tọa độ là tâm của frame chính , trục x+ là sang phải, y+ là đi xuống

```
       |
       |
_______|_______x+
       |
       |
       |y+
```

phần tư thứ 0: x+, y+
phân tư thứ 1: x-, y+
phân tư thứ 2: x-, y-
phân tư thứ 3: x+, y-

ngoài thực tế máy cnc cần đưa cnc head về gốc tọa độ là tâm của frame chính rồi set home, khi set home cần lưu được vị trí cnc head tương ứng với gốc tọa độ frame chính . rồi set touch pen position
set 4 aruco manual khi click chuột vào 4 vị trí thì góc đánh dấu hiển thị trên frame chính , cùng với các thông số về cnc head (touch pen postion là vị trị bút cảm ứng trên frame chính) và gốc tọa độ của frame chính , cần lưu tương ứng 4 điểm aruco tương ứng với cnc head position
vùng làm việc là diện tích được xác định bởi 4 điểm aruco manual, cần vẽ đường bao trên UI để nhận biết
cần thiết lập chiều cao từ camera tới mặt phẳng làm việc (mặt phẳng số 0), mặt phẳng số 0 hiện có chiều cao từ camera là 542mm (54.2cm) .
các thông số được thiết lập phía trên cần lưu lại để khi khởi động lại cần load lại làm cơ sở tính toán để di chuyển đầu cnc (touch pen postion) thực tế khi có thao tác trên frame video vd
    click chuột trên frame chính để di chuyển đầu cnc (touch pen postion)
    di chuyển tới các object detected trên frame chính đến tâm bbox của object detected
    di chuyển về gốc tọa độ frame chính (cũng chính là home của đầu cnc khi được set home)
có UI để thiết lập lại chiều cao camera tới mặt phẳng làm việc (mặt phẳng 0)
cần lưu cả vị trí cuối cùng của cnc head để khi tắt máy đi mở lại thì cnc head ở ngoài thực tế và frame chính ở trên web UI đang ở cùng vị trí cuối cùng của cnc head , vd có thể click go to x=0,y=0 hoặc go to home  là cnc head di chuyển về gốc tọa độ
việc tính toán sẽ không dùng tới cnc/camera_calibration_result.npz mà dựa trên gốc tọa độ của frame chính, touch pen position, chiều cao từ mặt phẳng tới camera, 4 điểm aruco manual ( tọa độ pixel theo frame chính) tương ứng với tọa độ thực tế của máy cnc head từ đó tính ra được các tỷ lệ để di chuyển
để di chuyển chính xác hơn: tỷ lệ từ gốc tọa độ frame chính, tới 4 điểm aruco manual có độ méo nhất định, các vector từ gốc tới 4 điểm aruco manual và vector từ gốc tới 4 trung điểm 4 cạnh aruco manual có thể suy luận ra độ méo tương đối của camera, cùng với chiều cao từ mặt phẳng 0 tới camera có thể bổ xung thêm cho việc tính toán di chuyển khi click trên frame chính , di chuyển cnc head (touch pen position) tới object detected ...  
    việc touch pen position offset cũng cần tính toán để bù trừ khi di chuyển
    việc tính toán cũng cần cân nhắc camera nhìn thẳng xuống gốc tọa độ của frame chính, do vậy việc tuyến tính tăng dần giảm dần khoảng cách từ tâm frame tới vùng ngoại vi frame sẽ tương ứng với tuyến tính tăng dần khoảng cách từ gốc tọa độ thực tế của máy cnc head tới vùng ngoại vi. dựa vào 4 điểm aruco manual là hình tứ giác méo, nếu lấy điểm aruco xa nhất và vẽ hình vuông có tâm là gốc tọa độ sẽ có tỷ lệ về tuyến tính tăng giảm
    độ cao camera với mặt phẳng 0 tính bằng milimet,4 điểm aruco manual, touch pen position, gốc tọa độ có pixel x,y là theo frame chính, tương ứng 4 điểm đó là cnc head position của aruco tính bằng milimet. từ gốc tọa độ , và home (sau khi set home của cnc) cần tính toán để bù trừ cho gcode moving khi click trên frame video hoặc move tới tâm bbox object detected . camera sẽ tạo ra 4 tam giác vuông tới 4 aruco manual vuông tại gốc tọa độ, cạnh huyền là từ camera đến 4 điểm aurco manua tù đó có thể tính ra việc bù trừ gcode moving tới vị trí cho đúng

**cập nhật 48** không dùng lại code tính toán để di chuyển cnc head ở các cập nhật : cập nhật 46, cập nhật 45, cập nhật 44, cập nhật 43 tạo code mới theo nguyên tắc sau để di chuyển khi click trên frame video hoặc di chuyển tới tâm bbox object detected
camera capture về là frame gốc. xác định tâm của frame gốc theo độ phân giải frame gốc đó (width gốc / 2, height gốc / 2) và tính offset để crop ra được frame 720x720.
frame croped 720x720 gọi là frame chính
cần vẽ hiển thị trục tọa độ làm việc trên frame chính , gốc tọa độ là tâm của frame chính , trục x+ là sang phải, y+ là đi xuống

```
       |
       |
_______|_______x+
       |
       |
       |y+
```

phần tư thứ 0: x+, y+
phân tư thứ 1: x-, y+
phân tư thứ 2: x-, y-
phân tư thứ 3: x+, y-

grbl code cnc set home
    G10 L20 P1 X0 Y0 Z0
    M5 (hoặc M3 S0)

định nghĩa các thông số cần cập nhật cho cnc/calibration_settings.json sẽ có những thông số
frame_o : {x, y}
    pixel x của gốc tọa độ frame chính (bằng width gốc / 2) với frame chính ở đây là 320
    pixel y của gốc tọa độ frame chính (bằng height gốc / 2) với frame chính ở đây là 320
cnc_o : {x,y}
    milimet x khi set home lấy theo thực tế grbl đọc ra
    milimet y khi set home lấy theo thực tế grbl đọc ra

trên UI khi click set home, vị trí cnc head đã được đưa đúng vị trí frame_o . cần lưu cập nhật frame_o, cnc_o vào cnc/calibration_settings.json
sau khi lưu cập nhật xong, di chuyển cnc head lần lượt tới 4 góc của khung cnc , từng góc cần lưu khi set manual aruco tương ứng tl,tr,br,bl
    frame_tl: {x:pixel,y:pixel} lấy theo vị trí pixel frame chính khi chuột phải ra menu set manual aruco tương ứng
        cnc_tl: {x:milimet,y:milimet} lấy theo thực tế grbl đọc ra tại vị trí cnc head đang đứng
    frame_tr: {x:pixel,y:pixel} lấy theo vị trí pixel frame chính khi chuột phải ra menu set manual aruco tương ứng
        cnc_tr: {x:milimet,y:milimet} lấy theo thực tế grbl đọc ra tại vị trí cnc head đang đứng
    frame_br: {x:pixel,y:pixel} lấy theo vị trí pixel frame chính khi chuột phải ra menu set manual aruco tương ứng
        cnc_br: {x:milimet,y:milimet} lấy theo thực tế grbl đọc ra tại vị trí cnc head đang đứng
    frame_bl: {x:pixel,y:pixel} lấy theo vị trí pixel frame chính khi chuột phải ra menu set manual aruco tương ứng
        cnc_bl: {x:milimet,y:milimet} lấy theo thực tế grbl đọc ra tại vị trí cnc head đang đứng
cần lưu cập nhật các thông số frame_tl,cnc_tl, frame_tr,cnc_tr,frame_br,cnc_br,frame_bl, cnc_bl khi được click set trên UI vào cnc/calibration_settings.json

camera_height: chiều cao tính bằng milimet từ camera tới mặt phẳng 0 (mặt phẳng làm việc là frame chính) hiện tại là là 542mm (54.2cm) khi có thay đổi cần lưu cập nhật vào cnc/calibration_settings.json

vùng làm việc của camera là diện tích tạo bởi: frame_tl, frame_tr, frame_bl, frame_br
vùng làm việc của cnc head là: cnc_tl, cnc_tr, cnc_bl, cnc_br

quy tắc tính chuyển pixel sang milimet để tạo gcode di chuyển cnc khi click trên frame chính , hoặc di chuyển tới tâm bbox object detected
    tính 1 pixel là bao nhiêu milimet
        pixel của phần tư 0: (dộ dài từ cnc_o tới cnc_br) / (độ dài frame_o, frame_br)
        pixel của phần tư 1: (dộ dài từ cnc_o tới cnc_bl) / (độ dài frame_o, frame_bl)
        pixel của phần tư 2: (dộ dài từ cnc_o tới cnc_tl) / (độ dài frame_o, frame_tl)
        pixel của phần tư 3: (dộ dài từ cnc_o tới cnc_tr) / (độ dài frame_o, frame_tr)
    các tỷ lệ đường chéo
        tỷ lệ 0 : vector frame phần tư thứ 0 (frame_o , frame_br) tỷ lệ với vector cnc (cnc_o, cnc_br)
        tỷ lệ 1 : vector frame phần tư thứ 1 (frame_o , frame_bl) tỷ lệ với vector cnc (cnc_o, cnc_bl)
        tỷ lệ 2 : vector frame phần tư thứ 2 (frame_o , frame_lt) tỷ lệ với vector cnc (cnc_o, cnc_tl)
        tỷ lệ 3 : vector frame phần tư thứ 3 (frame_o , frame_tr) tỷ lệ với vector cnc (cnc_o, cnc_tr)
    công thức lượng giác tang góc từ camera nhìn tới 4 điểm aruco manual:
        frame tg 0 của phần tư thứ 0: (độ dài đoạn từ frame_o tới frame_br) chia camera_height
        frame tg 1 của phần tư thứ 1: (độ dài đoạn từ frame_o tới frame_bl) chia camera_height
        frame tg 2 của phần tư thứ 2: (độ dài đoạn từ frame_o tới frame_lt) chia camera_height
        frame tg 3 của phần tư thứ 3: (độ dài đoạn từ frame_o tới frame_tr) chia camera_height
        cnc tg 0 của phần tư thứ 0: (độ dài đoạn từ cnc_o tới cnc_br) chia camera_height
        cnc tg 1 của phần tư thứ 1: (độ dài đoạn từ cnc_o tới cnc_bl) chia camera_height
        cnc tg 2 của phần tư thứ 2: (độ dài đoạn từ cnc_o tới cnc_lt) chia camera_height
        cnc tg 3 của phần tư thứ 3: (độ dài đoạn từ cnc_o tới cnc_tr) chia camera_height
    khi click chuột trên frame chính hoặc bbox sẽ có target : {x,y} là pixel tương ứng trên frame chính, phụ thuộc vào góc phần tư nào (phần tư thứ 0,1,2,3) mà lấy tương ứng các tỷ lệ đường chéo, công thức lượng giác tang góc từ camera nhìn tới 4 điểm aruco manual, tính 1 pixel là bao nhiêu milimet dựa vào đó tính ra được gcode sinh ra để di chuyển cnc head tới target {x,y}

cần lưu cả vị trí cuối cùng của cnc head (frame_last , cnc_last) vào cnc/calibration_settings.json để khi tắt máy đi mở lại thì cnc head ở ngoài thực tế và frame chính ở trên web UI đang ở cùng vị trí cuối cùng của cnc head , vd có thể click go to x=0,y=0 hoặc go to home là cnc head di chuyển về gốc tọa độ (frame_o, cnc_o)
cnc_o là work coord
cnc/calibration_settings.json cần lưu cả cnc_wpos cơ học (cnc_wpos_o, cnc_wpos_tl, cnc_wpos_tr, cnc_wpos_bl, cnc_mpos_br)
dùng tính tính 1 pixel là bao nhiêu milimet cho từng góc phần tư để tính target {x,y} ra gcode milimet, do càng xa gốc tọa độ thì camera càng bị nhìn chéo cần bù thêm dùng  công thức lượng giác tang góc từ camera nhìn tới 4 điểm aruco manual cho từng góc phần tư

**cập nhật 49** dựa vào **cập nhật 48** làm 1 hàm mới để dựa vào gốc tọa độ frame và 4 điểm manual aruco (frame_o, frame_tl, frame_tr,frame_bl, frame_br) và tọa độ của cnc head tại các điểm đó (cnc_o, cnc_tl, cnc_tr,cnc_bl, cnc_br) , gốc tọa độ trùng nhau frame_o và cnc_o đã được thiết lập ngoài đời là trùng nhau. dựa vào tứ giác tạo bới 4 điểm tl,tr,bl,br tương ứng cho frame và cnc . khi người dùng click trên frame hoặc tâm của bbox object detected sẽ có target {x,y} cần chuyển thành tọa độ cnc gcode tương ứng để di chuyển cnc head 

**cập nhật 50** gcode editor CẤU HÌNH NÉT VẼ đang hỗ trợ rất tốt về việc sketch hình khối vd ảnh khuôn mặt 
Cần bổ xung thêm tab cho việc xử lý chữ viết tay, chữ đen trên nền trắng 
✅ Đã bổ sung thanh chuyển Tab trong sidebar "CẤU HÌNH NÉT VẼ": Tab "🎨 Sketch Hình Khối" và Tab "✍️ Chữ Viết Tay" (Chữ đen nền trắng). Hỗ trợ nhị phân hóa (Otsu / Manual), tự động đảo màu, rút xương (Thinning 1px), bo cong (Potrace Bezier / Smooth), lọc nhiễu nét ngắn và 4 chế độ nét chữ (Centerline, Potrace Bezier, Outline, Concentric Fill). 

Có thể bổ xung thêm kiểu fill native tức là ảnh cho về đen trắng để nổi bật chữ với nền rồi đầu cnc cứ di chuyển 2 pixel gần nhau liên tục như nề lại chữ
✅ Đã bổ sung chế độ "Raster Scanline (Tô quét Ziczac 2px)" trong tab Chữ Viết Tay. Cho phép đầu CNC di chuyển ziczac liên tục theo từng dòng cách nhau 2px (tùy chỉnh từ 1px - 10px) qua toàn bộ diện tích nét chữ để tô phủ kín chữ như nề lại chữ.
✅ Đã bổ sung Phương án 2: "Local Raster (Tô Ziczac từng chữ)" - Tự động tách từng ký tự liên thông (Connected Components) và chỉ quét Ziczac ngắn trong phạm vi từng con chữ, giúp loại bỏ di chuyển không tải xa và không nhấc bút giữa chừng.
✅ Đã bổ sung Phương án 3: "Cross-Hatch (Tô gạch chéo 45°)" - Tô lấp đầy nét chữ theo các đường gạch chéo nghiêng 45° liền mạch, tạo hiệu ứng tô bóng nét chữ mỹ thuật và mềm mại.
