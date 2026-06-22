# Hướng Dẫn Train YOLO Object Detection & Export ONNX

Tài liệu này hướng dẫn chi tiết cách gán nhãn dữ liệu thô, chuẩn bị dữ liệu, huấn luyện mô hình YOLO (Transfer Learning), giám sát thời gian thực bằng Web Dashboard, xuất mô hình sang định dạng ONNX và chạy inference (nhận diện) độc lập trên PC (CPU) và thiết bị di động (Android / iOS).

---

## 1. Hướng Dẫn Gán Nhãn Dữ Liệu Với CVAT (Data Labeling)

Để huấn luyện YOLO, bạn cần các cặp ảnh gốc và file annotation `.txt` tương ứng. Dự án này sử dụng **CVAT (Computer Vision Annotation Tool)** làm công cụ gán nhãn (boxing / bounding box) chính thức.

#### Cách 1: Sử dụng Bản Cloud (Nhanh, không cần cài đặt)

1. **Truy cập**: Sử dụng trang web [cvat.ai](https://cvat.ai/) (miễn phí cho các project nhỏ).
2. **Tạo Task**:
   - Tạo Project hoặc Task mới.
   - Định nghĩa danh sách các nhãn (Labels) cần nhận diện.
   - Upload ảnh hoặc video thô lên hệ thống.
3. **Gán nhãn**: Sử dụng công cụ vẽ hình chữ nhật (Draw new rectangle) để gán nhãn cho từng ảnh.
4. **Xuất dữ liệu**:
   - Click **Export Task Dataset**.
   - Chọn định dạng **YOLO 1.1** hoặc **YOLOv8**.
   - Tải file `.zip` về máy và giải nén vào thư mục `dataraw`.

#### Cách 2: Chạy CVAT Local qua Docker Compose (Bảo mật dữ liệu, lưu trữ lâu dài)

Chúng tôi đã chuẩn bị sẵn file [docker-compose.yml](file:///work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/docker-compose.yml) trong thư mục `cameraip/train/`. File này đã được tinh chỉnh tối giản để hoạt động độc lập không cần clone toàn bộ repo CVAT, đồng thời sử dụng các Docker volumes để lưu trữ dữ liệu bền vững (không bị mất nhãn khi tắt container).

1. **Yêu cầu**:
   - Máy tính đã cài đặt Docker và Docker Compose.
   - Máy chủ Redis ngoài đang chạy tại cổng `6379` (password: `Test123456`) trên máy host (đã được cấu hình tự động phân giải qua `host.docker.internal` trong Docker Compose, giúp hệ thống hoạt động ổn định kể cả khi địa chỉ IP của máy host thay đổi).
2. **Cấu hình tự động khởi động cùng hệ thống**:
   Để CVAT tự động chạy bất cứ khi nào máy tính của bạn khởi động lên:
   - Tất cả các dịch vụ trong file `docker-compose.yml` đều được cấu hình với chính sách `restart: always`. Điều này có nghĩa là khi Docker Daemon chạy, các container của CVAT sẽ tự động khởi động theo.
   - Hãy đảm bảo Docker Daemon tự khởi động cùng hệ điều hành (OS) bằng cách chạy lệnh sau trên Linux:

     ```bash
     sudo systemctl enable docker
     ```

3. **Khởi động CVAT**:
   Chạy lệnh sau tại thư mục `cameraip/train/`:

   ```bash
   docker compose up -d
   ```

4. **Tạo tài khoản Superuser**:
   Sau khi các service khởi động thành công (đợi khoảng 30 giây đến 1 phút), chạy lệnh dưới đây để tạo tài khoản admin:

   ```bash
   docker exec -it cvat_server python3 manage.py createsuperuser
   ```

   *Tài khoản mặc định đã tạo:* `dunp` / `Test123456`
5. **Sử dụng**:
   Mở trình duyệt truy cập `http://localhost:8080` và đăng nhập bằng tài khoản admin của bạn.
6. **Kiểm tra trạng thái hoạt động**:
   Để kiểm tra xem các container của CVAT có đang chạy tốt hay không, dùng lệnh:

   ```bash
   docker compose ps
   ```

7. **Dữ liệu được lưu trữ ở đâu?**:
   Các volumes sau được tạo tự động để giữ an toàn cho dữ liệu (không bao giờ bị mất dữ liệu khi tắt máy hoặc restart):
   - `cvat_db`: Lưu thông tin PostgreSQL (project, tasks, users, labels).
   - `cvat_data`: Lưu trữ ảnh và annotations bạn upload.
   - `cvat_keys`, `cvat_logs`, `cvat_cache_db`: Lưu cấu hình, nhật ký hoạt động và cache.
8. **Dừng CVAT (nếu không muốn chạy ngầm nữa)**:

   ```bash
   docker compose down
   ```

---

## 2. Cấu Trúc Thư Mục Dữ Liệu Thô (`dataraw`)

Sau khi xuất hoặc gán nhãn dữ liệu, bạn sắp xếp thư mục dữ liệu thô `dataraw/` theo một trong ba cách dưới đây. Code của dự án (`prepare_data.py`) được thiết kế để tự động tương thích với cả ba cấu trúc này:

### Dạng 1: Cấu trúc xuất từ CVAT (YOLO 1.1 / Darknet - Khuyên dùng khi lấy từ CVAT)

Khi giải nén file xuất từ CVAT, bạn sẽ có cấu trúc như sau:

```text
dataraw/
├── obj.data                # Cấu hình số class và đường dẫn file names
├── obj.names               # Chứa danh sách tên nhãn (mỗi dòng 1 tên nhãn)
├── train.txt               # Chứa danh sách đường dẫn tới các file ảnh
└── obj_train_data/         # Thư mục con chứa toàn bộ các cặp ảnh và file nhãn .txt
    ├── sample_1.png
    ├── sample_1.txt
    ├── sample_2.png
    └── sample_2.txt
```

### Dạng 2: Cấu trúc phân chia sẵn (Structured Layout)

```text
dataraw/
├── images/
│   ├── sample_1.jpg
│   └── sample_2.jpg
└── labels/
    ├── sample_1.txt
    └── sample_2.txt
```

### Dạng 3: Cấu trúc phẳng (Flat Layout)

```text
dataraw/
├── sample_1.jpg
├── sample_1.txt
├── sample_2.jpg
└── sample_2.txt
```

*Lưu ý: Mỗi file `.txt` chứa các dòng có định dạng: `<class_id> <x_center> <y_center> <width> <height>` với tọa độ đã chuẩn hóa trong khoảng `[0.0, 1.0]`.*

---

## 3. Chuẩn Bị Dữ Liệu (`prepare_data.py`)

File `prepare_data.py` dùng để trộn ngẫu nhiên và phân chia dữ liệu gốc thành 2 tập **Train (80%)** và **Validation (20%)** vào thư mục `data/` phục vụ huấn luyện YOLO.

### Cách chạy

```bash
# Chạy từ thư mục gốc của dự án:
venv/bin/python cameraip/train/prepare_data.py --src cameraip/train/dataraw --dest cameraip/train/data --split 0.8
```

> [!TIP]
> **Điểm nổi bật của mã nguồn `prepare_data.py` hiện tại:**
>
> 1. **Tự động chuyển đổi sang ảnh đen trắng (Grayscale)**: Để tránh việc màu ảnh hưởng tới quá trình huấn luyện và nhận diện, ảnh từ `dataraw` được tự động chuyển đổi sang dạng ảnh xám (grayscale) và lưu dưới dạng 3 kênh màu (để tương thích hoàn toàn với các mô hình pre-trained YOLO mà không cần thay đổi kiến trúc mạng).
> 2. **Hỗ trợ cấu trúc CVAT tự động**: Tự động duyệt tìm file ảnh và nhãn `.txt` đệ quy sâu bên trong các thư mục con như `obj_train_data/` mà không bắt buộc bạn phải di chuyển file hoặc đổi tên thư mục.
> 3. **Tự động trích xuất Tên Class**: Đọc trực tiếp từ file `obj.names` (được sinh ra khi xuất dữ liệu từ CVAT) để đưa tên các nhãn (ví dụ: `test`) vào file `dataset.yaml` thay vì tạo các nhãn mặc định `class_0`, `class_1` giúp bạn không cần chỉnh sửa thủ công cấu hình `dataset.yaml`.
> 4. **Phân chia dữ liệu bảo toàn Class (Class-Aware Split & Copy)**: Tự động phân tích nhãn của từng ảnh để đảm bảo mọi class đều có mẫu biểu diễn trong cả hai tập `train` và `val`. Trong trường hợp một class chỉ có duy nhất 1 ảnh gán nhãn, ảnh đó sẽ được tự động nhân bản (copy) vào cả hai tập `train` và `val` để đảm bảo chất lượng kiểm thử và tránh lỗi huấn luyện/đánh giá.


### Kết quả đầu ra thư mục `data/`

```text
data/
├── dataset.yaml            # File cấu hình YOLO chứa thông tin đường dẫn tập train, val và các class
├── images/
│   ├── train/              # Ảnh dùng để huấn luyện
│   └── val/                # Ảnh dùng để đánh giá
└── labels/
    ├── train/              # Annotations tập train
    └── val/                # Annotations tập val
```

---

## 4. Giám Sát Huấn Luyện Bằng Web Dashboard (`app_monitor.py`)

Chúng tôi cung cấp một ứng dụng Web viết bằng Flask giúp bạn cấu hình, chạy huấn luyện, xem logs trực tiếp và theo dõi các biểu đồ đánh giá thời gian thực.

### Cách chạy server monitor

```bash
venv/bin/python cameraip/train/app_monitor.py --port 5000
```

### Cách sử dụng

1. Mở trình duyệt và truy cập: `http://localhost:5000`
2. **Cấu hình**: Nhập các tham số huấn luyện (số Epochs, kích thước Batch, kích thước ảnh Image Size, Model nền).
3. **Bắt đầu**: Click **Start Train** để bắt đầu. Hệ thống sẽ tự chạy ngầm và chuyển trạng thái sang **Training**.
4. **Theo dõi live**:
   - Biểu đồ **Loss Curves** (Train Box, Train Class, Val Box, Val Class) và **mAP Curves** (mAP50, mAP50-95) sẽ tự động vẽ và cập nhật sau mỗi epoch.
   - Terminal **Live Console Logs** hiển thị trực tiếp output tiến trình đang chạy.
   - Bạn có thể dừng bất cứ lúc nào bằng nút **Stop**.
5. **Kết quả**: Khi train xong, phần **Evaluation Output Gallery** sẽ hiển thị trực quan biểu đồ Confusion Matrix, kết quả vẽ nhãn thực tế (`labels.jpg`) và dự đoán (`val_batch0_pred.jpg`) để bạn dễ dàng đánh giá mô hình.

---

## 5. Huấn Luyện Thủ Công Bằng CLI (`train_yolo.py`)

Nếu không muốn dùng giao diện web, bạn có thể chạy trực tiếp file train qua CLI.

### Chạy huấn luyện và tự động xuất ONNX

```bash
venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolov8m.pt --epochs 50 --batch 8 --device cpu


venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 40 --batch 8 --device cpu

venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26x.pt --epochs 50 --batch 8 --device cpu
```

*Quá trình này sẽ sinh ra file PyTorch (`best.pt`) và tự động xuất ra file ONNX (`best.onnx`) lưu tại thư mục `runs/detect/train/weights/`.*

> [!TIP]
> **Các tham số huấn luyện bổ sung tối ưu cho nhận dạng vật thể nhỏ:**
> - `--mosaic <float>`: Tỉ lệ áp dụng mosaic augmentation (mặc định: `1.0`). Ghép 4 ảnh thành 1 để thu nhỏ vật thể xuống 50% kích thước ban đầu, giúp model học nhận diện vật thể nhỏ/xa tốt hơn.
> - `--scale <float>`: Biên độ ngẫu nhiên phóng to/thu nhỏ ảnh khi train (mặc định: `0.6`, tương ứng zoom từ 0.4x đến 1.6x).
> - `--multi-scale` / `--no-multi-scale`: Kích hoạt/Vô hiệu hóa việc thay đổi kích thước ảnh ngẫu nhiên theo từng batch khi train (mặc định: bật).

> [!NOTE]
> **Tự động tải và Quản lý file Pretrain Weights:**
>
> - Mặc định hệ thống sử dụng mô hình Medium (`yolov8m.pt`) để đạt độ chính xác tối ưu cho bài toán đếm học sinh lớp học.
> - Các file pre-trained weights (như `yolov8m.pt`, `yolov8s.pt`, `yolov8n.pt`) sẽ được quản lý trực tiếp trong thư mục `cameraip/train/`.
> - Khi bạn chạy huấn luyện (qua Web UI hoặc CLI), script `train_yolo.py` sẽ tự động kiểm tra xem file weights đã tồn tại tại `cameraip/train/` chưa. Nếu chưa có, script sẽ **tự động tải trực tiếp từ kho lưu trữ của Ultralytics** và lưu vào đúng thư mục này trước khi chạy huấn luyện.

---

## 6. Chạy Nhận Diện Với File ONNX Độc Lập (`detect_onnx.py`)

Sau khi xuất mô hình ra file `.onnx`, bạn có thể chạy nhận diện trên các hệ thống khác chỉ với thư viện gọn nhẹ: `onnxruntime`, `opencv-python` và `numpy` (không cần `pytorch` hay `ultralytics`).

### Cách chạy

```bash
venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/dataraw/obj_train_data/2 cosplay.png" --output cameraip/train/output_detect.jpg --conf 0.25

venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/dataraw/obj_train_data/photo_2025-04-18_20-32-02.jpg" --output cameraip/train/output_detect.jpg --conf 0.25

venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/1.jpg" --output cameraip/train/1output_detect.jpg --conf 0.25


venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/2.jpg" --output cameraip/train/2output_detect.jpg --conf 0.25


venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/3.jpg" --output cameraip/train/3output_detect.jpg --conf 0.25

venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/1.jpg" --output cameraip/train/1output_detect.jpg --conf 0.25
```

*Kết quả nhận diện (vẽ khung bounding box và tên nhãn tương ứng) sẽ được lưu vào file `output_detect.jpg`.*

> [!IMPORTANT]
> **Cơ chế tiền xử lý đen trắng (Grayscale Inference):**
>
> - Khi bạn chạy nhận diện qua `detect_onnx.py`, luồng ảnh đầu vào sẽ tự động được chuyển đổi sang grayscale (3-channel) trước khi đẩy vào model ONNX nhằm đồng bộ hóa với tập dữ liệu huấn luyện đen trắng.
> - Bounding boxes dự đoán sẽ được **vẽ và ánh xạ trực tiếp lên ảnh gốc có màu**. Kết quả lưu lại là ảnh màu hoàn chỉnh có bounding box, giúp bạn có thể dễ dàng crop ảnh màu chính xác (crop ảnh thật).
> - **Tự động nhận diện định dạng mô hình**: Script tự động phát hiện kiến trúc đầu ra ONNX. Với YOLOv8/v11 (đầu ra chưa có NMS), nó sẽ tự động chạy thuật toán lọc box NMS của OpenCV. Với YOLO26 (kiến trúc End-to-End, đầu ra có shape `[300, 6]`), nó sẽ đọc trực tiếp kết quả đã qua NMS của mô hình để tối ưu hóa thời gian xử lý.

---

## 7. Hướng Dẫn Sử Dụng Trên Mobile (Android / iOS)

File `best.onnx` có thể tích hợp trực tiếp vào ứng dụng di động:

### Trên Android (Kotlin/Java)

Sử dụng **ONNX Runtime Mobile SDK**:

1. Thêm gradle dependency:

   ```groovy
   implementation 'com.microsoft.onnxruntime:onnxruntime-android:1.16.0'
   ```

2. Nạp file `best.onnx` từ asset folder.
3. Thực hiện tiền xử lý: Resize ảnh camera về `640x640` (giữ tỉ lệ aspect ratio qua padding xám), chuyển sang RGB, chuẩn hóa chia `255.0` và chuyển sang định dạng float32 `[1, 3, 640, 640]`.
4. Gọi `session.run(...)` và viết thuật toán NMS trên Kotlin/Java dựa vào logic giải mã tọa độ trong `detect_onnx.py`.

### Trên iOS (Swift/Objective-C)

Sử dụng **ONNX Runtime Mobile** hoặc chuyển đổi sang định dạng **CoreML** (`.mlmodel`):

1. Tải thư viện ONNX Runtime Swift package.
2. Viết class quản lý session, nạp ảnh từ Camera (CVPixelBuffer), tiền xử lý và chạy inference trên CPU/GPU của iPhone (CoreML Execution Provider).

---

## 8. Giải Pháp Cho Bài Toán Đếm Người Học Qua 4 Camera IP Góc Phòng

Bài toán đếm số người đang ngồi học từ 4 camera Full HD ở 4 góc phòng học là một bài toán thực tế rất hay nhưng cũng đầy thách thức do gặp phải hiện tượng **che khuất (occlusion)** và **đếm trùng lặp (overlapping)** giữa các camera. Dưới đây là giải pháp kiến trúc và cách thiết lập hệ thống tối ưu:

### 8.1. Thu Thập Dữ Liệu & Gán Nhãn (Data Labeling Guidelines)

* **Góc chụp**: Thu thập ảnh đồng bộ từ cả 4 camera IP ở các thời điểm khác nhau (phòng trống, có vài người, phòng đầy đủ học sinh).
- **Gán nhãn trên CVAT**:
  - Sử dụng duy nhất 1 class: `person`.
  - **Xử lý che khuất (Occlusion)**: Học sinh ngồi bàn sau thường bị che khuất một phần bởi học sinh bàn trước hoặc bàn ghế. Khi gán nhãn, hãy cố gắng vẽ bounding box bao phủ toàn bộ phần cơ thể còn nhìn thấy được của họ (tối thiểu chỉ cần nhìn thấy đầu/vai là phải gán nhãn).
  - Gán nhãn cả học sinh ở xa camera (kích thước nhỏ) lẫn ở gần camera (kích thước lớn).

### 8.2. Cấu Hình Huấn Luyện YOLO (Model Tuning)

* **Kích thước ảnh (`--imgsz`)**:
  - Vì camera Full HD ghi hình góc rộng, những học sinh ngồi ở bàn cuối sẽ rất nhỏ trong ảnh.
  - Ban đầu, hãy thử nghiệm với `--imgsz 640` (mặc định).
  - Nếu mô hình bỏ sót nhiều học sinh ở xa, hãy tăng kích thước ảnh huấn luyện lên `--imgsz 960` hoặc `--imgsz 1280` để giữ lại chi tiết nhỏ tốt hơn.
  - Sử dụng lệnh train:

    ```bash
    venv/bin/python cameraip/train/train_yolo.py --imgsz 960 --model cameraip/train/yolov8n.pt --epochs 100
    ```

* **Các tham số Data Augmentation tối ưu cho vật thể nhỏ**:
  - Đảm bảo sử dụng `--mosaic 1.0` (mặc định) để YOLO tự động ghép 4 ảnh thành 1, giả lập các vật thể nhỏ hơn.
  - Sử dụng `--scale 0.6` (mặc định) và bật `--multi-scale` để thay đổi kích thước ảnh linh hoạt theo từng batch, giúp tăng độ bao phủ của mô hình ở nhiều độ phân giải khác nhau.

### 8.3. Giải Thuật Loại Bỏ Đếm Trùng Lặp Giữa 4 Camera (Cross-Camera De-duplication)

Khi 4 camera giám sát cùng một phòng học, vùng nhìn của chúng chắc chắn sẽ chồng lấn lên nhau. Nếu chỉ đếm tổng đơn giản từ 4 camera ($Total = C_1 + C_2 + C_3 + C_4$), số học sinh sẽ bị nhân lên nhiều lần. Có 2 giải pháp chính để triệt tiêu trùng lặp:

#### Giải pháp 1: Chia vùng quan sát không chồng lấn (Region of Interest - ROI) - *Đơn giản & Hiệu quả*

1. **Thiết lập**: Trên luồng hình ảnh của mỗi camera, xác định một vùng đa giác quan sát (ROI polygon) sao cho tổng 4 vùng đa giác của 4 camera bao phủ trọn vẹn phòng học và không chồng lấn lên nhau.
2. **Thuật toán đếm**:
   - Chạy nhận diện YOLO trên từng camera.
   - Lấy tọa độ điểm trung tâm phía dưới của bounding box (vị trí ngồi/đứng của người đó trên sàn).
   - Chỉ tăng biến đếm nếu điểm này nằm **bên trong** vùng đa giác ROI được cấu hình riêng cho camera đó (sử dụng thuật toán kiểm tra điểm trong đa giác - Ray Casting / Point-in-Polygon).
3. **Ưu điểm**: Dễ cài đặt, không cần tính toán phức tạp, xử lý độc lập trên từng camera rồi cộng tổng lại.

```text
+-------------------------------------------------+
| [Camera 1 ROI]  \       /  [Camera 2 ROI]       |
|                  \     /                        |
|                   \   /                         |
|                    \ /                          |
|                     X                           |
|                    / \                          |
|                   /   \                         |
|                  /     \                        |
| [Camera 4 ROI]  /       \  [Camera 3 ROI]       |
+-------------------------------------------------+
(Mỗi camera chỉ đếm người nằm trong đa giác ROI của mình)
```

#### Giải pháp 2: Ánh xạ tọa độ 2D lên mặt bằng phòng học (Homography Mapping) - *Nâng cao & Chính xác nhất*

1. **Thiết lập**: Đo đạc kích thước thực tế của phòng học (ví dụ: $8m \times 6m$) và vẽ một sơ đồ mặt bằng 2D. Xác định 4 điểm mốc cố định trên sàn phòng học để tính toán ma trận chuyển đổi phối cảnh (Homography Matrix $H$) cho mỗi camera.
2. **Thuật toán đếm**:
   - Với mỗi người được phát hiện bởi bất kỳ camera nào, lấy điểm cơ sở (đáy của bounding box - vị trí chân tiếp xúc mặt sàn).
   - Dùng ma trận $H$ của camera đó để chiếu tọa độ này lên mặt bằng 2D của phòng học:
     $$\begin{bmatrix} x_{2d} \\ y_{2d} \\ 1 \end{bmatrix} = H \times \begin{bmatrix} x_{image} \\ y_{image} \\ 1 \end{bmatrix}$$
   - Gộp tất cả các điểm tọa độ 2D từ cả 4 camera vào một danh sách chung đại diện cho cả phòng học.
   - Sử dụng các thuật toán phân cụm khoảng cách (như **DBSCAN** hoặc lọc khoảng cách Euclidean đơn giản): Nếu các điểm tọa độ từ các camera khác nhau cách nhau ít hơn 0.5 mét (khoảng cách ngồi thực tế giữa các bàn học sinh), chúng ta coi đó là cùng một người và gộp lại thành 1 điểm.
   - Tổng số cụm (clusters) sau khi lọc chính là số học sinh thực tế trong phòng.
3. **Ưu điểm**: Rất chính xác, có thể vẽ được sơ đồ nhiệt (heatmap) phân bố chỗ ngồi của học sinh trong lớp học theo thời gian thực.

---

## 9. Tăng Cường Dữ Liệu Trước Khi Gán Nhãn (`augment_images.py`)

Để làm phong phú tập dữ liệu gán nhãn trên CVAT, chúng tôi cung cấp script `augment_images.py` để nhân bản và xoay/lật các hình ảnh thô gốc (trước khi đưa vào CVAT gán nhãn). Điều này giúp mô hình nhận dạng tốt hơn ở nhiều góc quay khác nhau của camera IP.

### Các loại tăng cường được hỗ trợ từ mỗi ảnh gốc:
1. **Ảnh gốc**: Sao chép nguyên bản (được đổi tên đuôi thành `_original` để phân biệt).
2. **Lật ảnh**:
   - Lật ngang (`_flip_h`)
   - Lật dọc (`_flip_v`)
3. **Xoay ảnh (Không bị xén/mất chi tiết ở góc)**:
   - Nghiêng 15 độ trái (`_rot_15_l`) và phải (`_rot_15_r`)
   - Nghiêng 30 độ trái (`_rot_30_l`) và phải (`_rot_30_r`)
   - Nghiêng 45 độ trái (`_rot_45_l`) và phải (`_rot_45_r`)

*Lưu ý: Thuật toán tự động tính toán lại kích thước canvas để chứa toàn bộ bức ảnh đã xoay mà không bị cắt mất các góc.*

### Cách chạy

1. Tạo thư mục chứa các ảnh thô gốc của bạn:
   ```bash
   mkdir -p cameraip/train/dataraw_original
   ```
   *Đặt tất cả các ảnh thô chưa gán nhãn vào thư mục này.*

2. Chạy lệnh tăng cường hình ảnh:
   ```bash
   venv/bin/python cameraip/train/augment_images.py --src cameraip/train/dataraw_original --dest cameraip/train/augmented_image
   ```

3. Các ảnh tăng cường mới sẽ được xuất ra thư mục `cameraip/train/augmented_image/`. Bạn chỉ cần upload thư mục này lên CVAT để tiến hành gán nhãn (boxing) bình thường.
