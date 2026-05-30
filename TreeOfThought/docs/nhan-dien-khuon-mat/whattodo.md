Nghiệp vụ: nhan-dien-khuon-mat

Sau khi đăng nhập người dùng vào chức năng Nhận diện khuôn mặt

Session làm việc

    cho phép tạo session bằng việc 
        nhờ việc kéo file ảnh, chọn file ảnh, hoặc kéo folder, chọn folder
            khi kéo file or folder sẽ để ảnh vào danh sách bên trái
            xử lý face detect xong , dùng MediaPipe Face Detection chạy trên trình duyệt 
            để ảnh có khuôn mặt sang danh sách bên phải 
                danh sách ảnh có khuôn mặt sẽ có thêm danh sách các khuôn mặt được crop ra từ file ảnh đó
                người dùng xem trước khuôn mặt được crop có thể chọn không lưu nếu không muốn
                người dùng cần chọn xem ảnh gốc nào, ảnh crop nào được đưa lưu
        có thể kéo thêm file ảnh hoặc folder vào session đã có để xử lý tiếp

    Cần cho phép người dùng đặt tên cho session
    Khi click nút lưu 
        lưu các file ảnh gốc và các mặt crop được chọn vào session đó

    Lưu xong sẽ reset session làm việc và reload lại Danh sách quản lý

Danh sách quản lý

    danh sách sesion sẽ hiện lần lượt bên dưới với tên, thời gian mỗi phiên upload.
        mỗi session sẽ có các hành động: xem chi tiết, đặt lại tên, xóa
            xem chi tiết: mở modal show bảng danh sách các ảnh gốc và các mặt được crop từ file ảnh gốc
                có cột action xóa từng ảnh crop, xóa ảnh gốc
                    xóa ảnh gốc sẽ xóa cả các ảnh crop từ file đó
                    xóa ảnh crop sẽ xóa riêng ảnh crop đó

    do dùng google cloud storage lưu file nên khi xóa cần xóa cả trên GCS

Đây là sketch design TreeOfThought/docs/nhan-dien-khuon-mat/ui.png ảnh và màu sắc cần tuân thủ antdesign, xem sketch design để làm đúng UI UX và cập nhật vào TreeOfThought/docs/nhan-dien-khuon-mat/howtodo.md

**cập nhật 2026-05-27 15:32:32**
ở chức năng này cần save file lên GCS là public
Tính năng kéo thả hoặc chọn 1 folder chưa làm việc
    - có thể tách thành 2 khu vực:
        - chọn file hoặc kéo thả file
        - chọn folder hoặc kéo thả folder
            - khi chọn folder họăc kéo thảo thì cần lấy các file ảnh để  xử lý như khi chọn từng file

**cập nhật 2026-05-27 15:39:32**

Theme màu cần theo app shell chung
Các button table cần theo hướng dẫn về dùng shared component tot-...

Giao diện hơi xấu và đang không dùng core shared tot-table tot-button , không tự bịa thêm các css cần dùng ant design nhiều nhất có thể

**cập nhật 2026-05-28 16:39:32**

ở Lịch Sử Các Phiên Upload ở cột hành động cần bổ xung thêm nút : Chọn định nghĩa khuôn mặt
    - click nút Chọn định nghĩa khuôn mặt cần load ra component nằm dưới Lịch sử các phiên upload
        - Hiện ra là bảng danh sách các ảnh gốc , có tên , ảnh , ở cột hành động có
            - 1 droplist auto complete để chọn user
                ở BE cần tạo 1 dbcontext riêng để lấy user ( xem user ở TreeOfThought/docs/business-oidc/whattodo.md )
            - 1 nút để  add định nghĩa cho khuôn mặt cho user được chọn ở droplist auto complete
                cần tạo dbcontext riêng cho nhận diện khuôn mặt để lưu ánh xạ user với ảnh
                    1 user có thể có nhiều ảnh nhận diện khuôn mặt
                        cảnh báo nếu người dùng chọn ảnh đã được định nghĩa cho user khác, nhưng vẫn cho phép làm khi người dùng xác nhận
            - 1 nút Xem user định nghĩa khuôn mặt
                click sẽ mở lên modal show danh sách các khuôn mặt định nghĩa cho user và thông tin user
                    cột hành động sẽ cho phép xóa ảnh khỏi user

**cập nhật 2026-05-28 16:59:32**

ở sidemenu Nhận diện khuôn mặt bổ xung thêm menu : Đào tạo nhận dạng
    - click vào menu thì load ra component đào tạo nhận dạng

Đào tạo nhận dạng

Là nghiệp vụ liên quan tới TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/whattodo.md . Khi người dùng click nút đào tạo nhận dạng  thì những user được chọn ở danh sách sẽ được dùng ảnh gốc của khuôn mặt để đào tạo

        Nút Đào tạo nhận dạng nằm trên cùng của component này. 
        
        Log region: Phía trên danh sách user là box hiện thông tin đọc stdout của process training 

        - Hiện danh sách user đã định nghĩa khuôn mặt và các thông tin của user
            - bổ xung cột đầu tiên là check box

Mô tả nghiệp vụ khi Nút Đào tạo nhận dạng click
    Các user được check vào checkbox sẽ được dùng ảnh gốc của khuôn mặt để đào tạo
    Tạo folder faceids ở c# base domain directory nếu chưa có, var rootfaceids= {basedir}/ArcFaceFinetune/facesid
        Tạo subfolder tên theo ngày được click {yyyy-MM-dd} bên trong rootfaceids
            tạo subfolder dataraw bên trong folder dataraw là cá subfolder theo userid_username
                bên trong subfolder user này là các ảnh gốc download theo user đó
                    trong quá trình đào tạo cần hiện log lên Log region

        Sau khi download hết ảnh gốc, thì sẽ bắt đầu quá trình đào tạo, khởi tạo c# process để gọi tiến trình python như mô tả ở yêu cầu TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/whattodo.md
            các args của main.py sẽ dùng folder theo ngày {rootfaceids}/{yyyy-MM-dd} làm gốc 

                --epochs 10
                --batch_size 16
                --learning_rate 0.00005
                --align_mode advanced 
                --raw_dir {rootfaceids}/{yyyy-MM-dd}/dataraw
                --data_dir {rootfaceids}/{yyyy-MM-dd}/data
                --model_output_path {rootfaceids}/{yyyy-MM-dd}/arcface_model_final.onnx
                --mobile_model_output_path {rootfaceids}/{yyyy-MM-dd}/arcface_model_final_mobile.onnx
                --best_model_output_path {rootfaceids}/{yyyy-MM-dd}/arcface_model_best.onnx
                --best_mobile_model_output_path {rootfaceids}/{yyyy-MM-dd}/arcface_model_best_mobile.onnx
                --device cpu

            trong quá trình đào tạo sẽ đọc stdout đưa vào Log region để theo dõi

Khi file onnx đã tạo xong cần dùng Best Loss Epoch Model để chuẩn bị lấy embeding
Ngay dưới Log region: sẽ hiện các tên folder theo ngày nằm bên trong folder: {rootfaceids}/{yyyy-MM-dd} , từng folder name là nút để click. Khi click vào tên 1 folder name
        dùng c# load best_model_output_path của folder đó  và folder data_dir của folder đó
            các subfolder data_dir có tên là {userid_username} , load modal best_model_output_path để lấy embeding từng ảnh bên trong folder {userid_username} và lưu vào db context riêng cho nhận diện khuôn mặt để lưu trữ
                Cần dùng dbcontext riêng cho nhận diện khuôn mặt để lưu trữ
                    1 user có nhiều embeding vector

khi ở Chọn User để Đào Tạo chọn xong cần bổ xung nút Đào tạo
    click nút Đào tạo thì tiến hành download ảnh và training

**cập nhật 2026-05-29 08:08:08**

danh sách: Chọn User để Đào Tạo cần thêm cột Hành động , có nút Thên ảnh định nghĩa
    - Khi click nút Thêm ảnh định nghĩa : mở modal load component  Lịch Sử Các Phiên Upload, để cho phép chọn định nghĩa khuôn mặt

danh sách Kết Quả Đào Tạo & Trích Xuất Embedding Ngay dưới Log region: sẽ hiện các tên folder theo ngày nằm bên trong folder: {rootfaceids}/{yyyy-MM-dd} cần lấy ra UI để hiện khi load page. Khi Đào tạo xong cần reload danh sách

Khi click vào tên 1 folder name để training trích xuất embedding cần lưu trữ thêm
    - lưu trữ embeding dùng best_model_output_path nào, ảnh input lấy embeding là ảnh nào (path data_dir theo {userid_username}) , user nào

Bổ xung thêm Danh sách khuôn mặt đã có embding
    thông tin user , danh sách embeding vector  , cột hành động có nút xóa để xóa user và embeding của user
        danh sách embeding vector hiện 1 phần và có, nút Copy, nút Xóa, nút Kiểm tra
            click Nút kiểm tra
                cho phép mở modal ở modal chọn 1 ảnh bất kỳ đẻ lấy ra khuôn mặt dùng best_model_output_path (đi theo embeding đó) của user để so sánh và hiện ra thông tin của user và khoảng cách với các embeding của các user khác ( có thể thêm ngưỡng so sánh )

Dùng nhận diện qua chỉ mục HNSW + Inner Product, khi lấy ảnh input để kiểm tra cần tuân thủ alig face và các hướng dẫn sử dụng TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/howtodo.md

**cập nhật 2026-05-29 09:10:56**
Modal Kiểm Tra Đối Sánh Khuôn Mặt (HNSW + Inner Product) khi mở lên chưa cho phép chọn ảnh để so sánh với embeding của user được chọn

Danh Sách Khuôn Mặt Đã Có Embedding
    trong từng user
        Danh sách Vector Embedding , từng embeding khi training cần lưu ảnh đã dùng đưa vào lấy vector embeding ( ở đây là face đã croped và align --data_dir {rootfaceids}/{yyyy-MM-dd}/data)

Danh sách :   Chọn User để Đào Tạo bổ xung cột các ảnh khuôn mặt đã định nghĩa

**cập nhật 2026-05-29 09:30:56**

Thêm submenu cho Nhận diện khuôn mặt: Camera nhận dạng
    - click vào menu thì load ra component để mở camera , khi nhận dạng được khuôn mặt trên camera , thì hệ thống sẽ lấy khuôn mặt đưa lên so sánh embeding và tìm ra best match người đó là ai, và hiện khuôn mặt của người đó và thông tin tên , cho phép chọn threshhold
        Để hỗ trợ nếu 1 khung hình có nhiều người, thêm threshhold về độ rộng ảnh face croped >= threshhold
        Ảnh algign croped trên FE có thể lấy padding lớn để tránh bị mất nhiều diện tích khuôn mặt (gửi lên server cho tiết kiệm băng thông), khi lên server cũng cần căn lấy face và align lại để đúng chuẩn và có kết quả tốt nhất (các chuẩn về align TreeOfThought/docs/nhan-dien-khuon-mat/howtodo.md)
        cần đưa padding lên BE để BE crop lại ảnh rồi mới align

**cập nhật 2026-05-29 09:50:56**
        Kết Quả Nhận Dạng (HNSW)
            cần giữ history 5 kết quả nhận diện mới nhất, hiện các score, thông tin user

**cập nhật 2026-05-29 10:10:56**
Ở Camera nhận dạng
BE không dùng align_face_helper.py mà dùng c# dùng onnx session để  detect face , crop lại face rồi căn chỉnh lại khuôn mặt với mode standard khi dùng camera , hoặc kiểm tra so khớp khuôn mặt
    cần đưa padding lên BE để BE crop lại ảnh rồi mới align
khi dùng camera để mượt mà UI thì dùng SSE để gửi kết quả nhận diện sau khi xử lý

**cập nhật 2026-05-29 10:10:56**
Ở Camera nhận dạng
Khi xử lý thì cần lấy embeding đã được lưu ở cơ sở đữ liệu để so sánh, cần cache dữ liệu trên bộ nhớ
session onnx sẽ lấy theo folder mới nhất và cũng cần cache trên bộ nhớ để dùng
Thêm UI nút reload cache : khi click nút thì reload lại cache dữ liệu và force load lại model onnx theo folder mới nhất (đang có tên folder dạng date yyyy-MM-dd)

**2026-05-29 14:35:35**

Ở menu đào tạo nhận dạng:
    danh sách: Chọn User để Đào Tạo cột Ảnh khuôn mặt đã định nghĩa
        cho phép xóa từng ảnh theo user
        hiển thị ảnh ở đây là ảnh gốc 

**2026-05-29 14:35:35**
Ở nút Đào tạo bổ xung các input cho phép người dùng nhập các thông tin thay đổi các tham số khi train:
        $"--epochs 100 " +
        $"--batch_size 16 " +
        $"--learning_rate 0.00005 " +
        $"--align_mode advanced " +
        $"--device cpu";

**2026-05-30 10:35:35**
chưa tuân thủ cqrs cần phải sửa để đúng tiêu chuẩn frontend backend
    kiểm tra nếu dispatch dùng được useMemoryMode: false

**2026-05-30 14:35:35**
tìm các file .onnx tương ứng với TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/arcfacemodels/face_landmarker.task TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/arcfacemodels/blaze_face_short_range.tflite download vào TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/arcfacemodels rồi viết thêm controller để sử dụng các file onnx đó 

**2026-05-30 16:05:35 (Đã hoàn thành)**
Ở nút Đào tạo bổ sung input cho phép người dùng nhập thông tin thay đổi tham số `--margin` khi train:
    - **Frontend (Angular)**: Đã thêm biến `margin: number = 0.50` vào `training.component.ts`, thêm trường nhập liệu `nz-input-number` vào `training.component.html`, và cập nhật service `NhanDienKhuonMatService.streamTraining` để truyền tham số này qua EventSource.
    - **Backend (C#)**: Đã bổ sung thuộc tính `Margin` vào lớp `TrainArcFaceModelCommand` (mặc định 0.50), ánh xạ tham số từ Controller API `TrainStream` và truyền động chuỗi đối số `--margin <value>` vào tiến trình Python `main.py` thông qua Command Handler.