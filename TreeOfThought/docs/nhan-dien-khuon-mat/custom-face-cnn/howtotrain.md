# Hướng dẫn Huấn luyện Mạng Custom Part-Based Face CNN (howtotrain.md)

Tài liệu này hướng dẫn chi tiết quy trình chuẩn bị dữ liệu, cấu hình tham số, thực thi huấn luyện và xác minh mô hình nhận diện khuôn mặt đa phân vùng kết hợp cơ chế tự chú ý hình học.

---

## 📂 1. Chuẩn bị Dữ liệu Huấn luyện (Dataset Setup)

Trước khi chạy huấn luyện, bạn cần đặt dữ liệu ảnh thô vào thư mục `dataraw`.

### Cấu trúc Thư mục:
Mỗi đối tượng danh tính (Identity) phải có một thư mục con riêng biệt trong `dataraw`. Tên thư mục con chính là User ID/Mã danh tính của người đó.
```text
dataraw/
├── user_001/
│   ├── frontal.jpg
│   ├── left_angle.jpg
│   └── right_angle.jpg
├── user_002/
│   ├── card_photo.png
│   └── selfie.png
└── ...
```

### Yêu cầu Số lượng Ảnh:
* **Mỗi danh tính:** Tối thiểu nên có từ **15 - 30 ảnh** với các biểu cảm, góc nghiêng đầu (đặc biệt góc nghiêng dưới 45 độ), điều kiện chiếu sáng và các trường hợp che khuất khác nhau (đeo khẩu trang, đeo kính).
* **Quy mô tập huấn luyện:** Nên có tối thiểu từ **100 người trở lên** để mô hình đạt độ ổn định cao, tránh bị Overfitting.

---

## ⚡ 2. Thực thi Huấn luyện (Running the Training Script)

Script [train.py](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/nhan-dien-khuon-mat/custom-face-cnn/train.py) đảm nhiệm toàn bộ quy trình:
1. **Tiền xử lý & Căn chỉnh (Alignment):** Sử dụng MediaPipe FaceLandmarker để định vị 26 điểm mốc cốt lõi, xoay align ảnh về $112 \times 112$, cắt các vùng Mắt, Mũi và lưu tọa độ vector lệch chuẩn hóa vào thư mục `data_processed/`.
2. **Huấn luyện mô hình:** Train đồng thời các nhánh CNN song song và nhánh hình học `GeometricNet`.
3. **Đánh giá & Lưu Checkpoint:** Tự động kiểm định trên tập Validation và lưu mô hình tối ưu nhất.
4. **Xuất mô hình ONNX:** Tự động tạo file mô hình ONNX đa cổng đầu vào.

### Lệnh chạy mặc định:
Kích hoạt môi trường Python ảo và chạy lệnh:
```bash
/work/a.i-assistant-chatbot-telegram-serverles/venv/bin/python train.py
```

### Các tham số tùy biến (CLI Arguments):
| Tham số | Ý nghĩa | Giá trị mặc định | Khuyên dùng |
|---|---|---|---|
| `--epochs` | Số lượng vòng lặp huấn luyện | `200` | `40 - 60` |
| `--batch_size` | Kích thước batch huấn luyện | `32` | `16` hoặc `32` |
| `--lr` | Tốc độ học (Learning Rate) | `0.0002` | `0.0002` |
| `--device` | Thiết bị tính toán (`cpu`, `cuda`, `hip`) | `cpu` | `cuda` (nếu có GPU Nvidia) |
| `--backbone` | Backbone trích xuất ảnh toàn mặt | `resnet18` | `resnet18` (Nhẹ - Khuyên dùng) hoặc `resnet50` (Chính xác cao) |
| `--no_pretrained_global` | Tắt việc nạp trọng số ImageNet cho Backbone | *Bật mặc định* | Giữ nguyên để tăng tốc hội tụ |
| `--l1_lambda` | Hệ số phạt chuẩn hóa L1 | `1e-5` | `1e-5` (Chống overfitting) |

*Ví dụ chạy trên GPU với ResNet18 trong 50 Epochs:*
```bash
/work/a.i-assistant-chatbot-telegram-serverles/venv/bin/python train.py --epochs 50 --batch_size 32 --device cuda --backbone resnet18
```

---

## 🛡️ 3. Kiểm soát Quá tải (Overfitting Prevention)

> [!IMPORTANT]
> Mô hình sử dụng mạng tích chập kết cấu sâu kết hợp MLP hình học nên có khả năng ghi nhớ dữ liệu tập train rất nhanh (Overfitting). 

Để đối phó với điều này, hệ thống đã tích hợp sẵn:
* **Best Loss Checkpoint Saver:** Hệ thống liên tục theo dõi giá trị **Validation Loss**. Checkpoint chỉ được ghi đè vào file `checkpoint_best.pth` nếu loss trên tập validation thực sự giảm.
* **Dừng Sớm & Xuất ONNX (Graceful Early Stopping):** Khi người dùng dừng thủ công (nhấn Ctrl+C trong terminal hoặc click nút "Dừng Train" trên Flask Dashboard), hệ thống sẽ bắt tín hiệu dừng, nạp checkpoint tốt nhất (`checkpoint_best.pth`) và tự động xuất ra file `custom_face_cnn.onnx` trước khi đóng tiến trình. Điều này giúp tận dụng mô hình tối ưu nhất mà không cần đợi chạy hết số lượng Epoch.
* **Hình học & Ánh sáng Augmentation:** Tự động áp dụng lật ngang; xoay ngẫu nhiên; vẽ giả lập khẩu trang, kính cận; thay đổi độ sáng và tương phản (tạo ra các ảnh `_bright` và `_dark` offline) để tăng độ phong phú cho tập dữ liệu.
* **Regularization & Dropout:** Tích hợp Spatial Dropout (0.1 -> 0.2), FC Dropout (0.3 -> 0.4), và phạt chuẩn hóa L1 vào tổng loss.

---

## 🔍 4. Xác minh sau Huấn luyện (Verification)

Sau khi huấn luyện hoàn tất, tệp `custom_face_cnn.onnx` sẽ được tạo ra tại thư mục hiện tại.

### Kiểm tra so khớp offline bằng FAISS:
Xóa file lưu trữ vector cũ và chạy script test để tái tạo cơ sở dữ liệu mẫu từ các ảnh trong `dataraw` để so khớp:
```bash
rm -f faiss_faces.index user_ids.txt
/work/a.i-assistant-chatbot-telegram-serverles/venv/bin/python inference.py
```
Nếu màn hình thông báo:
`🎉 KHỚP THÀNH CÔNG! Đã nhận diện được User ID: '...' | Độ tương đồng Cosine: 0.8...`
Nghĩa là quá trình huấn luyện và cấu hình tham số ONNX đã thành công 100%.

### Chạy camera kiểm thử thời gian thực:
Nhấn chạy script camera test để mở webcam và hiển thị HUD thông số attention weights:
```bash
/work/a.i-assistant-chatbot-telegram-serverles/venv/bin/python camera_test.py
```
*(Nhấn phím `q` trên màn hình camera hiển thị để thoát).*
