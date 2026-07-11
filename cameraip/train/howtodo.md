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
> 5. **Tăng cường dữ liệu bằng Zoom-Crop (Zoom-Crop Augmentation)**: Khi bật `--zoom-crop` (mặc định bật), script sẽ tự động duyệt qua tất cả các bounding box trong tập train. Với mỗi bounding box, nó sẽ tự động crop vùng ảnh xung quanh hộp đó cộng thêm 25% lề (padding) mở rộng ở mỗi bên. Script cũng tự động tính toán và cập nhật lại tọa độ chuẩn hóa cho tất cả các nhãn nằm trong vùng crop này (chỉ giữ lại các vật thể có phần diện tích còn lại trong vùng crop > 30%). Việc này giúp tạo thêm nhiều ảnh cận cảnh giả lập tự động, nâng cao đáng kể độ chính xác nhận diện của mô hình đối với các vật thể nhỏ/xa.

### Các tham số CLI của `prepare_data.py`:
- `--src`: Đường dẫn tới thư mục chứa dữ liệu thô (mặc định: `dataraw`).
- `--dest`: Đường dẫn tới thư mục lưu kết quả chuẩn bị dữ liệu (mặc định: `data`).
- `--split`: Tỷ lệ phân chia tập train (mặc định: `0.8`).
- `--seed`: Seed ngẫu nhiên để đảm bảo việc phân tách dữ liệu giống nhau giữa các lần chạy (mặc định: `42`).
- `--zoom-crop` / `--no-zoom-crop`: Bật/Tắt tính năng tự động crop phóng to các vùng nhãn để tăng cường tập train (mặc định: bật).


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

## 5b. Huấn Luyện Tối Ưu Vật Thể Nhỏ & Kiến Trúc P2 (`train_yolo_tiny.py`)

Để giải quyết bài toán nhận diện những vật thể rất nhỏ trên màn hình điện thoại (icon button, link text, share, like, comment, droplist, chữ, số...) từ ảnh toàn cảnh crop 720px*720px, chúng tôi cung cấp script chuyên dụng `train_yolo_tiny.py` kế thừa từ `train_yolo.py`.

### 5b.1. Thách thức vật thể nhỏ & Giải pháp

1. **Vấn đề giảm độ phân giải (Stride)**:
   Mô hình YOLOv8/YOLO11 tiêu chuẩn thực hiện dự đoán ở các tầng đặc trưng P3 (stride 8), P4 (stride 16), P5 (stride 32). Với ảnh đầu vào 640x640:
   - Tại đầu ra P3 (stride 8), bản đồ đặc trưng có kích thước $80 \times 80$. Một icon 12x12px trên màn hình điện thoại khi đưa qua đây chỉ còn tương đương $1.5 \times 1.5$ pixel trên feature map $\rightarrow$ Dễ dàng bị bỏ sót hoặc gộp vào nền.
2. **Giải pháp kiến trúc Stride-4 (P2 Head)**:
   Bằng cách thêm một đầu nhận diện thứ tư ở tầng **P2 (Stride 4)**, bản đồ đặc trưng đầu ra tại P2 có độ phân giải cao lên tới **$160 \times 160$** (gấp 4 lần so với P3).
   - Icon 12x12px sẽ giữ lại kích thước $3 \times 3$ pixel trên feature map, giúp bảo toàn cấu trúc hình dáng, chi tiết nhỏ và vị trí biên.
   - **Tự động sinh cấu hình YAML**: Khi truyền thêm tham số `--p2`, script sẽ tự động sinh file cấu hình YAML tạm phù hợp với cả **YOLOv8** (e.g. `yolov8m-p2.yaml`) và **YOLO11** (e.g. `yolo11m-p2.yaml`) theo đúng scale của mô hình được chọn. Tiếp đó, phần backbone sẽ tự động nạp trọng số pre-trained tiêu chuẩn từ weights (`.pt`) để thực hiện Transfer Learning.

### 5b.2. Các siêu tham số tối ưu gán sẵn (Default Overrides)

Script `train_yolo_tiny.py` tích hợp sẵn các cấu hình tối ưu để chuyên fine-tune vật thể nhỏ:
- **`--freeze 10`**: Đóng băng 10 tầng backbone đầu tiên. Giúp giữ nguyên các bộ lọc trích xuất đặc trưng cơ bản đã học từ COCO, tránh bị nhiễu do tập dữ liệu nhỏ phá hỏng.
- **`--optimizer AdamW` & `--lr0 0.001`**: Sử dụng thuật toán tối ưu hóa AdamW và tốc độ học khởi đầu nhỏ hơn để quá trình fine-tune diễn ra êm, tránh mất mát thông tin.
- **`--mosaic 0.5`**: Giảm tỉ lệ mosaic xuống 0.5 (tiêu chuẩn là 1.0). Nếu mosaic quá cao, ảnh sẽ bị ghép nhỏ thêm 50% nữa khiến các icon nhỏ vốn có biến mất hoàn toàn.
- **`--cls 1.5`**: Tăng trọng số loss phân loại (classification loss weight) từ 0.5 lên 1.5 giúp mô hình học phân biệt cực tốt giữa các icon tương đối giống nhau (like vs share vs comment).

### 5b.3. Hướng dẫn huấn luyện bằng CLI

Bạn có thể chạy trực tiếp bằng dòng lệnh:

```bash
# Huấn luyện mô hình YOLO11 Medium với đầu P2 Stride-4 chuyên dụng trên GPU NVIDIA
venv/bin/python cameraip/train/train_yolo_tiny.py --data cameraip/train/data/dataset.yaml --model yolo11m.pt --epochs 80 --batch 8 --device cuda --p2

# Huấn luyện mô hình YOLOv8 Medium với đầu P2 Stride-4 chuyên dụng trên GPU NVIDIA
venv/bin/python cameraip/train/train_yolo_tiny.py --data cameraip/train/data/dataset.yaml --model yolov8m.pt --epochs 80 --batch 8 --device cuda --p2

# Chạy trên GPU AMD Radeon 780M (APU)
venv/bin/python cameraip/train/train_yolo_tiny.py --data cameraip/train/data/dataset.yaml --model yolo11m.pt --epochs 80 --batch 4 --device amd --p2
```

### 5b.4. Huấn luyện qua Web Dashboard UI

1. Mở Web UI tại `http://localhost:5000`.
2. Tại mục **Training Mode**, chọn **Tiny Object (Specialized)**.
3. Panel **Tiny Object Settings** sẽ xuất hiện cho phép bạn bật/tắt **Enable P2 Stride-4 Head**, điều chỉnh số lớp Freeze, Optimizer, Learning Rate và các trọng số Loss trực quan.
4. Bấm **Start Train** để bắt đầu và giám sát trực tiếp. Kết quả ONNX được xuất ra sẽ tự động lưu vào thư mục `runs/detect/train/weights/best.onnx` để tích hợp vào app detect.

### 5b.5. Kịch bản thực tế (Ví dụ nhận diện icon trên màn hình điện thoại)

Khi camera giám sát chụp toàn cảnh lớp học/phòng làm việc và bạn cắt ra (crop) một vùng kích thước **720px × 720px** chứa chiếc điện thoại. Lúc này, các icon trên màn hình điện thoại (like, share, comment, link text, input) chỉ có kích thước khoảng **10px đến 15px**, rất nhỏ và dễ bị mất dấu. Quy trình thực hiện từ gán nhãn đến huấn luyện như sau:

1. **Gán nhãn (Labeling) trên CVAT**:
   - Cắt các vùng ảnh 720x720px chứa điện thoại và tải lên CVAT.
   - Tiến hành gán nhãn (boxing) cực kỳ tỉ mỉ và sát viền các icon (`like`, `share`, `comment`, `input_text`, `button`,...). Không vẽ khung quá rộng để tránh gộp nhiều nhiễu nền.
   - Xuất dữ liệu dưới định dạng **YOLO 1.1** vào thư mục `dataraw`.

2. **Chuẩn bị dữ liệu với Zoom-Crop**:
   Chạy script chuẩn bị dữ liệu:
   ```bash
   venv/bin/python cameraip/train/prepare_data.py --src cameraip/train/dataraw --dest cameraip/train/data --zoom-crop
   ```
   *Lưu ý: Tính năng `--zoom-crop` (mặc định bật) sẽ tự động cắt cận cảnh các vùng gán nhãn và tạo thêm ảnh giả lập phóng to giúp mô hình học các chi tiết nhỏ tốt hơn.*

3. **Huấn luyện mô hình P2 (Stride-4)**:
   Mở dashboard hoặc chạy CLI với cờ `--p2` và imgsz `704` hoặc `768` (để tránh việc đối tượng bị giảm độ phân giải):
   ```bash
   venv/bin/python cameraip/train/train_yolo_tiny.py --data cameraip/train/data/dataset.yaml --model yolo11m.pt --epochs 100 --batch 8 --p2 --imgsz 704 --device cuda
   ```
   *Mô hình sẽ tự động cấu hình đầu nhận diện P2 Stride-4 (độ phân giải bản đồ đặc trưng đạt 176x176) giúp giữ nguyên đặc trưng của các icon 10-15px khi ảnh bị đưa vào mô hình.*

4. **Chạy nhận diện (Inference)**:
   Sau khi hoàn tất, sử dụng file ONNX đã xuất để detect trực tiếp trên ảnh 720x720px:
   ```bash
   venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "path/to/phone_crop_720.jpg" --output cameraip/train/output_detect.jpg --conf 0.25
   ```
   *Hệ thống sẽ chạy nhận diện đen trắng (grayscale) và vẽ bounding box có màu trực tiếp lên ảnh crop màu gốc của bạn.*

---

## 5c. Giám Sát và Đánh Giá Kết Quả Với YOLO Training Dashboard

Chúng tôi cung cấp một Dashboard đồ thị hóa kết quả huấn luyện từ tệp `results.csv` tại thư mục `cameraip/train/train_dashboard/index.html`. Dashboard này giúp bạn phân tích trực quan tiến trình train và đưa ra các khuyến nghị tối ưu hóa tham số học máy tự động bằng tiếng Việt.

### 5c.1. Các Tính Năng Chính
- **Vẽ Đồ Thị Trực Quan:** Biểu diễn các đường Loss (Box Loss, Cls Loss, DFL Loss) của cả tập Train và Val, đường mAP (mAP50, mAP50-95), đồ thị Precision/Recall và Tốc độ học (Learning Rate).
- **Bộ Phân Tích Chuyên Gia (Advisor Engine):** Tự động phát hiện các trạng thái huấn luyện:
  - **Quá khớp (Overfitting):** Khi Val Loss tăng ngược trở lại ở cuối nhưng Train Loss vẫn liên tục giảm. Khuyên bạn tăng `--freeze`, giảm `--epochs` hoặc thêm Data Augmentation.
  - **Chưa hội tụ (Underfitting):** Khi đường Loss cả hai tập vẫn đang dốc xuống ổn định. Khuyên bạn tăng `--epochs` hoặc điều chỉnh lại learning rate.
  - **Lỗi Tốc độ học (Learning Rate Issue):** Khi mô hình không hội tụ hoặc mAP xấp xỉ bằng 0. Khuyên bạn giảm `--lr0` hoặc đổi Optimizer.
  - **Tư vấn nhận diện vật thể nhỏ:** Khuyến nghị các bộ siêu tham số chuyên dụng như `--p2`, `--mosaic 0.5`, `--cls 1.5` và tăng `--imgsz`.
- **Xem Dữ Liệu Dạng Bảng:** Xem đầy đủ thông tin thô của từng epoch thuận tiện.

### 5c.2. Hướng Dẫn Sử Dụng

#### Cách 1: Chạy qua Local Web Server (Khuyên dùng để tự động cập nhật)
Chạy server HTTP Python tại thư mục gốc của dự án:
```bash
python3 -m http.server 8000
```
Sau đó mở trình duyệt và truy cập:
[http://localhost:8000/cameraip/train/train_dashboard/](http://localhost:8000/cameraip/train/train_dashboard/)

*Ở chế độ này, Dashboard sẽ tự động tìm kiếm tệp `results.csv` trong thư mục chạy thử nghiệm của YOLO và tự động cập nhật biểu đồ sau mỗi 5 giây.*

#### Cách 2: Mở tệp trực tiếp và Kéo & Thả (Drag & Drop)
Nếu mở trực tiếp tệp `index.html` trong trình duyệt qua giao thức `file://` (bằng cách nhấp đúp vào file), lỗi bảo mật CORS sẽ chặn việc đọc file tự động. Lúc này:
1. Nhấp đúp mở [index.html](file:///work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/train_dashboard/index.html).
2. Kéo tệp `results.csv` từ thư mục chạy của bạn (ví dụ: `cameraip/train/runs/detect/train_tiny/results.csv`) thả vào vùng chỉ định trên màn hình, hoặc click nút **"Chọn kết quả (CSV)"** để tải thủ công.

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

---

## 10. Hướng Dẫn Cấu Hình Và Huấn Luyện Với GPU AMD (ROCm - Hỗ trợ Radeon 780M / gfx1103)

Dự án đã hỗ trợ huấn luyện trên GPU AMD (ví dụ: Radeon™ 780M Graphics, RX 6000/7000 series) trên môi trường Linux thông qua nền tảng AMD ROCm.

### 10.1. Yêu Cầu Hệ Thống & Cài Đặt Driver

Để GPU AMD được nhận diện bởi PyTorch, bạn cần cài đặt driver AMDGPU và bộ thư viện ROCm trên Linux.
1. **Kiểm tra phần cứng**: Đảm bảo hệ thống nhận diện được GPU AMD:
   ```bash
   lspci | grep -i vga
   ```
2. **Cài đặt Driver và ROCm**: Làm theo hướng dẫn chính thức của AMD để cài đặt driver và ROCm (khuyên dùng ROCm 6.2 hoặc mới hơn).
3. **Cấp quyền truy cập GPU**: Thêm tài khoản user hiện tại vào các nhóm `video` và `render` để có quyền truy cập trực tiếp vào card đồ họa:
   ```bash
   sudo usermod -a -G video,render $USER
   ```
   *Lưu ý: Bạn cần đăng xuất và đăng nhập lại hoặc restart máy để thay đổi nhóm có hiệu lực.*

### 10.2. Cấu Hình PyTorch Hỗ Trợ ROCm Cho Radeon 780M (gfx1103)

Mặc định, PyTorch cài đặt từ `pip` thông thường chỉ hỗ trợ CPU và NVIDIA CUDA. Để dùng GPU AMD, bạn có hai phương án cài đặt:

#### Phương án A: Cài đặt bản PyTorch chính thức (Nhẹ nhàng nhất)
Cài đặt bản PyTorch ROCm chính thức từ PyTorch:
```bash
# 1. Kích hoạt môi trường ảo
source venv/bin/activate

# 2. Gỡ cài đặt PyTorch phiên bản cũ
pip uninstall -y torch torchvision torchaudio

# 3. Cài đặt PyTorch với ROCm 6.2
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.2
```
*Lưu ý: PyTorch ROCm build chính thức không có sẵn nhân chạy cho `gfx1103` (Radeon 780M). Script `train_yolo.py` mặc định sẽ chuyển hướng an toàn sang **CPU training** để tránh GPU Hang. Bạn cần thêm tham số `--force-gpu` nếu muốn chạy trực tiếp.*

#### Phương án B: Cài đặt PyTorch hỗ trợ dòng GPU Consumer (Độ ổn định GPU cao nhất)
Cài đặt gói PyTorch Nightly hỗ trợ kiến trúc `gfx110X` (bao gồm `gfx1102` và `gfx1103`) từ kho lưu trữ của AMD:
```bash
# 1. Kích hoạt môi trường ảo
source venv/bin/activate

# 2. Gỡ cài đặt PyTorch phiên bản cũ
pip uninstall -y torch torchvision torchaudio

# 3. Cài đặt lại thư viện ROCm và PyTorch build cho gfx110X
pip install --index-url https://repo.amd.com/rocm/whl/gfx110X-all/ "rocm[libraries,devel]"
python -m pip install --index-url https://rocm.nightlies.amd.com/v2/gfx110X-all/ --pre torch torchaudio torchvision
```

### 10.3. Tự Động Cấu Hình Biến Môi Trường Tránh Crash Trên iGPU

Các dòng card đồ họa tích hợp như **Radeon 780M Graphics** chia sẻ RAM hệ thống và không nằm trong danh sách hỗ trợ chính thức cho tính toán máy chủ. Script `train_yolo.py` đã được tích hợp cơ chế **tự động thiết lập cấu hình ổn định** khi phát hiện GPU AMD:

1. `HSA_OVERRIDE_GFX_VERSION=11.0.0`: Ép nhận diện card tương thích `gfx1100`.
2. `HIPBLASLT_WORKSPACE_SIZE=0`: Khắc phục lỗi `HSA_STATUS_ERROR_INVALID_ISA` trong các lớp attention của YOLO.
3. `HSA_ENABLE_SDMA=0`: Vô hiệu hóa SDMA để tránh lỗi `Memory access fault` trên kiến trúc bộ nhớ chia sẻ của APU.
4. `PYTORCH_HIP_ALLOC_CONF=garbage_collection_threshold:0.8,max_split_size_mb:256`: Tối ưu hóa phân mảnh bộ nhớ.

### 10.4. Kiểm Tra Trạng Thái Nhận Diện GPU AMD

Chạy lệnh sau để xác nhận PyTorch nhận diện GPU AMD thành công:

```bash
venv/bin/python -c "import torch; print('ROCm Available:', torch.cuda.is_available()); print('Device Name:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'None')"
```

### 10.5. Cách Chạy Huấn Luyện

* **Qua Giao Diện Web Dashboard**:
  Mở `http://localhost:5000`, tại mục **Device**, chọn **AMD GPU (ROCm)** hoặc **Auto Detect**.
* **Chạy Qua Dòng Lệnh (CLI)**:
  * **Chạy an toàn (mặc định chuyển CPU nếu dùng PyTorch chuẩn để tránh GPU Hang):**
    ```bash
    venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26n.pt --epochs 80 --batch 2 --device amd
    ```
  * **Ép chạy trên GPU Radeon 780M (Bắt buộc khi dùng PyTorch Nightly/Source):**
    ```bash
    venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26n.pt --epochs 80 --batch 2 --device amd --force-gpu
    ```

---

## 11. Hướng Dẫn Cấu Hình Và Huấn Luyện Với GPU NVIDIA (GeForce RTX 3060 / 3060 Ti / Các Dòng RTX Khác)

Dự án hỗ trợ hoàn hảo việc huấn luyện trên các dòng GPU NVIDIA (ví dụ: GeForce RTX 3060, RTX 3060 Ti, hoặc cao hơn) để tăng tốc độ huấn luyện mô hình YOLO gấp nhiều lần so với CPU.

### 11.1. Yêu Cầu Hệ Thống & Kiểm Tra Cài Đặt Driver

Để GPU NVIDIA hoạt động với PyTorch, hệ thống của bạn cần cài đặt driver NVIDIA và CUDA Toolkit phù hợp:
1. **Kiểm tra driver card đồ họa**: Đảm bảo driver NVIDIA đã được cài đặt và hoạt động bình thường:
   ```bash
   nvidia-smi
   ```
2. **Kiểm tra tính tương thích của CUDA**: Lệnh trên sẽ hiển thị phiên bản CUDA tối đa được hỗ trợ bởi Driver (ví dụ: `CUDA Version: 13.0` hoặc `12.x`).

### 11.2. Cài Đặt PyTorch Hỗ Trợ CUDA

Trong môi trường ảo `venv` của dự án, cài đặt phiên bản PyTorch tương thích với CUDA của hệ thống:
```bash
# 1. Kích hoạt môi trường ảo
source venv/bin/activate

# 2. Cài đặt lại PyTorch với CUDA build (mặc định PyTorch cài từ pip thường tự nhận diện CUDA)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

### 11.3. Cấu Hình Tối Ưu Hóa Bộ Nhớ Tránh Lỗi Tràn VRAM (OOM)

Các dòng card đồ họa consumer như **RTX 3060** (12GB VRAM) hoặc **RTX 3060 Ti** (8GB VRAM) có thể gặp lỗi tràn bộ nhớ `torch.OutOfMemoryError` nếu huấn luyện với batch size lớn, kích thước ảnh lớn (e.g. 960px) hoặc khi bật tính năng multi-scale training.

Để giải quyết vấn đề này, hãy cấu hình biến môi trường kiểm soát phân mảnh bộ nhớ:
```bash
export PYTORCH_CUDA_ALLOC_CONF=garbage_collection_threshold:0.8,max_split_size_mb:512
```

*Lưu ý: Script `train_yolo.py` đã tích hợp cơ chế **tự động phát hiện GPU NVIDIA** trên Linux. Nếu phát hiện card NVIDIA và chưa cấu hình biến môi trường này, script sẽ tự động thiết lập `PYTORCH_CUDA_ALLOC_CONF=garbage_collection_threshold:0.8,max_split_size_mb:512` giúp tối ưu hóa bộ nhớ đồ họa ngay lập tức.*

### 11.4. Kiểm Tra Nhận Diện GPU NVIDIA CUDA

Chạy lệnh sau để xác nhận PyTorch nhận diện GPU NVIDIA thành công:
```bash
venv/bin/python -c "import torch; print('CUDA Available:', torch.cuda.is_available()); print('Device Name:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'None')"
```

### 11.5. Cách Chạy Huấn Luyện

* **Qua Giao Diện Web Dashboard**:
  Mở `http://localhost:5000` trên trình duyệt. Tại mục **Device**, chọn **NVIDIA GPU (CUDA)** hoặc **Auto Detect**. Hệ thống sẽ tự động dùng GPU RTX 3060 để chạy.
* **Qua Dòng Lệnh (CLI)**:
  Sử dụng tham số `--device cuda` hoặc chỉ định cụ thể GPU index (ví dụ `--device 0`):
  ```bash
  venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolov8m.pt --epochs 50 --batch 8 --device cuda
  ```

### 11.6. Khuyến Nghị Hiệu Năng Cho RTX 3060 / 3060 Ti
- **Batch Size**: 
  - Với ảnh kích thước `640x640` và mô hình `yolov8m.pt` (Medium), bạn có thể thiết lập `--batch 8` hoặc `--batch 16`.
  - Với ảnh kích thước `960x960` để nhận diện vật thể nhỏ tốt hơn, khuyến nghị dùng `--batch 4` hoặc `--batch 8` để tránh tràn VRAM.
- **AMP (Automatic Mixed Precision)**: 
  - GPU NVIDIA hỗ trợ rất tốt chế độ AMP (Mixed Precision FP16). Hãy luôn giữ bật AMP (`--amp`, mặc định tự bật) để tăng tốc độ huấn luyện lên ~2x và tiết kiệm 50% bộ nhớ đồ họa.
