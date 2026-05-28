import os
import sys
import math
import urllib.request

# Cấu hình thiết bị chạy: 'auto', 'cuda', hoặc 'cpu'
# - 'auto': Tự động chọn GPU CUDA nếu có, nếu không dùng CPU
# - 'cpu': Ép buộc chạy bằng CPU (thích hợp máy không có GPU)
# - 'cuda': Ép buộc chạy bằng GPU CUDA
DEVICE_CONFIG = "auto"

# Cố gắng import các thư viện cần thiết một cách an toàn để tránh bị Crash Traceback khi thiếu thư viện
missing_libs = []

try:
    import numpy as np
except ImportError:
    missing_libs.append("numpy")

try:
    from PIL import Image, ImageDraw
except ImportError:
    missing_libs.append("pillow")

try:
    import torch
    import torch.nn as nn
    import torch.nn.functional as F
    from torch.utils.data import DataLoader
    import torchvision
    import torchvision.transforms as transforms
    import torchvision.models as models
except ImportError:
    missing_libs.append("torch")
    missing_libs.append("torchvision")

try:
    import onnx
    import onnxruntime as ort
except ImportError:
    missing_libs.append("onnx")
    missing_libs.append("onnxruntime")

try:
    import cv2
except ImportError:
    cv2 = None  # Sẽ báo lỗi chi tiết khi người dùng thực hiện preprocess ảnh thô

# Kiểm tra nếu thiếu bất kỳ thư viện cốt lõi nào cho quá trình chạy
if len(missing_libs) > 0:
    print("\n" + "="*70)
    print("[-] CẢNH BÁO: HỆ THỐNG THIẾU CÁC THƯ VIỆN BẮT BUỘC ĐỂ CHẠY!")
    print("="*70)
    print(f"Các thư viện bị thiếu: {', '.join(missing_libs)}")
    if cv2 is None:
        print("Mẹo: Thư viện 'opencv-python' cũng đang thiếu.")
    print("\n[*] Vui lòng chạy các lệnh sau để thiết lập môi trường ảo và cài đặt đầy đủ:")
    print("    # 1. Tạo môi trường ảo (venv)")
    print("    python3 -m venv venv")
    print("    ")
    print("    # 2. Kích hoạt môi trường ảo")
    print("    source venv/bin/activate")
    print("    ")
    print("    # 3. Nâng cấp pip và cài đặt toàn bộ thư viện cần thiết")
    print("    pip install --upgrade pip")
    print("    pip install torch torchvision onnx onnxruntime numpy pillow opencv-python mediapipe")
    print("="*70 + "\n")
    sys.exit(1)

# ==========================================
# 1. CẤU HÌNH & KHỞI TẠO
# ==========================================
RAW_DIR = "./dataraw"
DATA_DIR = "./data"
MODEL_OUTPUT_PATH = "./arcface_model.onnx"
EMBEDDING_SIZE = 512
IMAGE_SIZE = (112, 112)
BATCH_SIZE = 8
EPOCHS = 3
LEARNING_RATE = 0.001

# Đường dẫn thư mục tải mô hình pre-trained ArcFace tốt nhất
PRETRAINED_MODEL_DIR = "./arcfacemodels"
PRETRAINED_MODEL_PATH = os.path.join(PRETRAINED_MODEL_DIR, "resnet50_arcface.pth")
# URL tải mô hình ResNet50 ArcFace Pretrained uy tín từ Hugging Face
PRETRAINED_MODEL_URL = "https://huggingface.co/Simon2nd/arcface-resnet50/resolve/main/backbone.pth"

# Cấu hình thiết bị chạy dựa vào biến cấu hình DEVICE_CONFIG
if DEVICE_CONFIG == "auto":
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
elif DEVICE_CONFIG == "cuda":
    device = torch.device("cuda")
else:
    device = torch.device("cpu")
print(f"[+] Thiết bị sử dụng huấn luyện: {device}")

# ==========================================
# 2. THUẬT TOÁN CĂN CHỈNH KHUÔN MẶT ĐỒNG NHẤT
# ==========================================
def align_face_python(image_bgr, eye_left, eye_right):
    """
    Căn chỉnh khuôn mặt 2 điểm mắt (Đồng nhất về mặt toán học với TypeScript và C#).
    Xoay ảnh để mắt nằm ngang, scale khoảng cách mắt về 35.24px và đưa trung điểm về (55.91, 51.60).
    """
    if cv2 is None:
        raise ImportError("[-] Cần cài đặt opencv-python: pip install opencv-python")
        
    cx = (eye_left[0] + eye_right[0]) / 2.0
    cy = (eye_left[1] + eye_right[1]) / 2.0
    dx = eye_right[0] - eye_left[0]
    dy = eye_right[1] - eye_left[1]
    
    current_dist = np.sqrt(dx**2 + dy**2)
    angle_deg = np.degrees(np.arctan2(dy, dx))
    
    # Định dạng mục tiêu chuẩn trên khung 112x112
    target_dist = 35.2372
    tx = 55.9132
    ty = 51.59885
    
    scale = target_dist / current_dist
    
    # Tính toán ma trận biến đổi affine (quay và scale xung quanh tâm mắt hiện tại)
    M = cv2.getRotationMatrix2D((cx, cy), angle_deg, scale)
    
    # Dịch chuyển tâm mắt hiện tại về tâm mắt mục tiêu
    M[0, 2] += (tx - cx)
    M[1, 2] += (ty - cy)
    
    # Warp hình ảnh về kích thước 112x112
    aligned_face = cv2.warpAffine(image_bgr, M, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
    return aligned_face

# ==========================================
# 3. TIỀN XỬ LÝ ẢNH THÔ (dataraw -> data)
# ==========================================
def preprocess_dataraw():
    """
    Đọc ảnh thô từ ./dataraw/, dùng MediaPipe phát hiện khuôn mặt và mắt,
    căn chỉnh chuẩn hóa đồng nhất và lưu vào ./data/ để fine-tune.
    """
    if not os.path.exists(RAW_DIR):
        return False
        
    print(f"[*] Phát hiện thư mục ảnh thô '{RAW_DIR}'. Đang tiến hành cắt & căn chỉnh khuôn mặt tự động...")
    
    if cv2 is None:
        print("\n[-] Lỗi: Cần cài đặt thư viện 'opencv-python' để tiền xử lý ảnh thô!")
        print("[*] Vui lòng chạy lệnh: pip install opencv-python\n")
        sys.exit(1)
        
    try:
        import mediapipe as mp
    except ImportError:
        print("\n[-] Lỗi: Cần cài đặt thư viện 'mediapipe' để chạy nhận diện điểm mốc tự động!")
        print("[*] Vui lòng chạy lệnh: pip install mediapipe\n")
        sys.exit(1)
        
    # Làm sạch thư mục data đích để tránh bị lẫn dữ liệu cũ
    if os.path.exists(DATA_DIR):
        shutil.rmtree(DATA_DIR)
    os.makedirs(DATA_DIR, exist_ok=True)
    
    mp_face_detection = mp.solutions.face_detection
    face_count = 0
    fail_count = 0
    
    with mp_face_detection.FaceDetection(model_selection=1, min_detection_confidence=0.5) as face_detection:
        for identity in os.listdir(RAW_DIR):
            identity_raw_path = os.path.join(RAW_DIR, identity)
            if not os.path.isdir(identity_raw_path):
                continue
                
            identity_aligned_path = os.path.join(DATA_DIR, identity)
            os.makedirs(identity_aligned_path, exist_ok=True)
            
            for file_name in os.listdir(identity_raw_path):
                if not file_name.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                    continue
                    
                img_path = os.path.join(identity_raw_path, file_name)
                image = cv2.imread(img_path)
                if image is None:
                    continue
                    
                h, w, _ = image.shape
                # Chuyển đổi màu sang RGB cho MediaPipe
                results = face_detection.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
                
                if not results.detections:
                    print(f"    [-] Không phát hiện khuôn mặt trong ảnh: {img_path}")
                    fail_count += 1
                    continue
                    
                detection = results.detections[0]
                keypoints = detection.location_data.relative_keypoints
                
                # Tọa độ mắt trái và phải trên ảnh (MediaPipe Keypoint 0 là mắt phải nhân trắc học - nằm bên trái ảnh)
                re_x = int(keypoints[0].x * w)
                re_y = int(keypoints[0].y * h)
                
                le_x = int(keypoints[1].x * w)
                le_y = int(keypoints[1].y * h)
                
                # Căn chỉnh hình học
                aligned = align_face_python(image, (re_x, re_y), (le_x, le_y))
                
                # Lưu tệp tin đã căn chỉnh vào thư mục data
                save_path = os.path.join(identity_aligned_path, f"{os.path.splitext(file_name)[0]}_aligned.png")
                cv2.imwrite(save_path, aligned)
                face_count += 1
                
    print(f"[+] Tiền xử lý hoàn tất! Đã căn chỉnh thành công {face_count} khuôn mặt. Bỏ qua (không có mặt): {fail_count} ảnh.")
    print(f"[+] Dữ liệu đã căn chỉnh sẵn sàng tại thư mục: '{DATA_DIR}'")
    return True

# ==========================================
# 4. KHỞI TẠO MOCK DATASET (Nếu không có dataraw)
# ==========================================
def generate_mock_dataset():
    """Tạo dữ liệu mẫu nhân tạo để đảm bảo code có thể chạy thành công ngay lập tức."""
    if os.path.exists(DATA_DIR) and len(os.listdir(DATA_DIR)) > 0:
        print("[+] Đã phát hiện thư mục dữ liệu 'data/'. Bỏ qua bước tạo dữ liệu mẫu.")
        return

    print("[*] Không tìm thấy dữ liệu huấn luyện. Đang tự động tạo tập dữ liệu mẫu (Mock Dataset)...")
    os.makedirs(DATA_DIR, exist_ok=True)
    
    identities = ["user_jack", "user_rose", "user_tony"]
    colors = [
        (255, 100, 100),  # Red-ish
        (100, 255, 100),  # Green-ish
        (100, 100, 255)   # Blue-ish
    ]
    
    for idx, (name, color) in zip(enumerate(identities), colors):
        identity_path = os.path.join(DATA_DIR, name[1])
        os.makedirs(identity_path, exist_ok=True)
        
        for i in range(5):
            img = Image.new("RGB", (150, 150), color=(240, 240, 240))
            draw = ImageDraw.Draw(img)
            
            offset_x = (i - 2) * 5
            offset_y = (idx - 1) * 5
            draw.ellipse([30 + offset_x, 30 + offset_y, 120 + offset_x, 120 + offset_y], fill=color)
            
            draw.ellipse([50 + offset_x, 55 + offset_y, 60 + offset_x, 65 + offset_y], fill=(255, 255, 255))
            draw.ellipse([90 + offset_x, 55 + offset_y, 100 + offset_x, 65 + offset_y], fill=(255, 255, 255))
            
            draw.arc([55 + offset_x, 80 + offset_y, 95 + offset_x, 100 + offset_y], start=0, end=180, fill=(0, 0, 0), width=3)
            
            img_save_path = os.path.join(identity_path, f"face_{i + 1}.png")
            img.save(img_save_path)
            
    print(f"[+] Đã khởi tạo thành công tập dữ liệu mẫu tại '{DATA_DIR}' với 3 danh tính khác nhau.")

# ==========================================
# 5. TẢI MÔ HÌNH PRETRAINED ARCFACE
# ==========================================
def download_pretrained_weights():
    """Tải trọng số ArcFace tiền huấn luyện (ResNet50) từ HuggingFace về thư mục ./arcfacemodels."""
    if os.path.exists(PRETRAINED_MODEL_PATH):
        print(f"[+] Đã phát hiện mô hình ArcFace pre-trained tại '{PRETRAINED_MODEL_PATH}'.")
        return True

    print(f"[*] Đang tải mô hình ArcFace pre-trained chất lượng cao (ResNet50) về '{PRETRAINED_MODEL_PATH}'...")
    os.makedirs(PRETRAINED_MODEL_DIR, exist_ok=True)
    
    try:
        # Cấu hình Header để tải mượt mà
        opener = urllib.request.build_opener()
        opener.addheaders = [('User-agent', 'Mozilla/5.0')]
        urllib.request.install_opener(opener)
        
        # Tải tệp tin trọng số
        urllib.request.urlretrieve(PRETRAINED_MODEL_URL, PRETRAINED_MODEL_PATH)
        print("[+] Tải mô hình ArcFace pre-trained thành công!")
        return True
    except Exception as e:
        print(f"[-] Không thể tải trực tiếp từ Hugging Face ({e}).")
        print(f"[*] Gợi ý: Hãy tải thủ công file trọng số đặt vào: {PRETRAINED_MODEL_PATH}")
        return False

# ==========================================
# 6. ĐỊNH NGHĨA KIẾN TRÚC MÔ HÌNH
# ==========================================
class ArcMarginProduct(nn.Module):
    """
    Lớp ArcFace Head (Chỉ dùng trong quá trình huấn luyện để tối ưu góc phân lớp).
    """
    def __init__(self, in_features, out_features, s=30.0, m=0.50, easy_margin=False):
        super(ArcMarginProduct, self).__init__()
        self.in_features = in_features
        self.out_features = out_features
        self.s = s
        self.m = m
        self.weight = nn.Parameter(torch.FloatTensor(out_features, in_features))
        nn.init.xavier_uniform_(self.weight)

        self.easy_margin = easy_margin
        self.cos_m = math.cos(m)
        self.sin_m = math.sin(m)
        self.th = math.cos(math.pi - m)
        self.mm = math.sin(math.pi - m) * m

    def forward(self, input, label):
        cosine = F.linear(F.normalize(input), F.normalize(self.weight))
        sine = torch.sqrt(1.0 - torch.pow(cosine, 2)).clamp(0, 1)
        
        phi = cosine * self.cos_m - sine * self.sin_m
        if self.easy_margin:
            phi = torch.where(cosine > 0, phi, cosine)
        else:
            phi = torch.where(cosine > self.th, phi, cosine - self.mm)
            
        one_hot = torch.zeros(cosine.size(), device=input.device)
        one_hot.scatter_(1, label.view(-1, 1).long(), 1)
        
        output = (one_hot * phi) + ((1.0 - one_hot) * cosine)
        output *= self.s
        return output

class ArcFaceResNet50(nn.Module):
    """
    Backbone mạng tích chập ResNet-50 để trích xuất Vector đặc trưng 512 chiều.
    Đây chính là mô hình cốt lõi sẽ được xuất sang ONNX và nạp vào C# .NET.
    """
    def __init__(self, embedding_size=512, pretrained_path=None):
        super(ArcFaceResNet50, self).__init__()
        self.backbone = models.resnet50(weights=None)
        num_features = self.backbone.fc.in_features
        
        self.backbone.fc = nn.Sequential(
            nn.BatchNorm1d(num_features),
            nn.Linear(num_features, embedding_size, bias=False),
            nn.BatchNorm1d(embedding_size)
        )
        
        if pretrained_path and os.path.exists(pretrained_path):
            try:
                state_dict = torch.load(pretrained_path, map_location="cpu")
                filtered_state_dict = {}
                for k, v in state_dict.items():
                    new_key = k.replace("backbone.", "").replace("features.", "")
                    filtered_state_dict[new_key] = v
                
                self.load_state_dict(filtered_state_dict, strict=False)
                print(f"[+] Khởi tạo thành công trọng số ArcFace Pretrained chất lượng cao từ '{pretrained_path}'.")
            except Exception as e:
                print(f"[-] Có lỗi khi nạp trọng số cục bộ ({e}). Sử dụng ImageNet Pretrained thay thế.")
                self._fallback_to_imagenet(embedding_size)
        else:
            self._fallback_to_imagenet(embedding_size)

    def _fallback_to_imagenet(self, embedding_size):
        try:
            resnet = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
            num_features = resnet.fc.in_features
            resnet.fc = nn.Sequential(
                nn.BatchNorm1d(num_features),
                nn.Linear(num_features, embedding_size, bias=False),
                nn.BatchNorm1d(embedding_size)
            )
            self.backbone = resnet
            print("[+] Tải và sử dụng trọng số ImageNet Pretrained ResNet-50 thay thế.")
        except Exception as e:
            print(f"[-] Không thể tải trọng số ImageNet ({e}). Sử dụng Random Weights.")

    def forward(self, x):
        return self.backbone(x)

# ==========================================
# 7. LUỒNG HUẤN LUYỆN CHÍNH (MAIN PROCESS)
# ==========================================
def main():
    # Bước 1: Thực hiện tiền xử lý ./dataraw -> ./data nếu phát hiện dataraw
    is_preprocessed = preprocess_dataraw()
    
    # Nếu không có dataraw, tự động sinh mock dataset trong ./data để luôn chạy mượt mà
    if not is_preprocessed:
        generate_mock_dataset()

    # Bước 2: Tải mô hình ArcFace Pretrained tốt nhất về thư mục cục bộ arfacemodels/
    has_pretrained = download_pretrained_weights()

    # Bước 3: Chuẩn bị Dữ liệu Huấn luyện (Pytorch Data Loader)
    transform = transforms.Compose([
        transforms.Resize(IMAGE_SIZE),
        transforms.ToTensor(),
        transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
    ])

    dataset = torchvision.datasets.ImageFolder(root=DATA_DIR, transform=transform)
    num_classes = len(dataset.classes)
    
    print(f"[+] Số lượng danh tính tìm thấy để Fine-tune: {num_classes}")
    print(f"[+] Danh sách nhãn lớp: {dataset.classes}")
    print(f"[+] Tổng số lượng ảnh huấn luyện: {len(dataset)}")

    if len(dataset) == 0:
        print("[-] Lỗi: Không tìm thấy tệp ảnh nào trong thư mục data!")
        return

    dataloader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=True, drop_last=False)

    # Bước 4: Khởi tạo mạng Backbone ResNet-50 ArcFace và ArcFace Head
    pretrained_path = PRETRAINED_MODEL_PATH if has_pretrained else None
    backbone = ArcFaceResNet50(embedding_size=EMBEDDING_SIZE, pretrained_path=pretrained_path).to(device)
    arcface_head = ArcMarginProduct(in_features=EMBEDDING_SIZE, out_features=num_classes, s=30.0, m=0.50).to(device)

    # Khởi tạo Optimizer (Tối ưu hóa cả Backbone và ArcFace Head)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam([
        {'params': backbone.parameters()},
        {'params': arcface_head.parameters()}
    ], lr=LEARNING_RATE)

    # Bắt đầu vòng lặp huấn luyện Fine-tune
    print(f"\n[*] Bắt đầu huấn luyện Fine-tune trên [{device}]...")
    backbone.train()
    arcface_head.train()
    
    for epoch in range(EPOCHS):
        total_loss = 0.0
        correct = 0
        total = 0
        
        for imgs, labels in dataloader:
            imgs = imgs.to(device)
            labels = labels.to(device)
            
            optimizer.zero_grad()
            
            # 1. Trích xuất embedding 512 chiều từ backbone
            embeddings = backbone(imgs)
            
            # 2. Đưa qua lớp phân lớp ArcFace
            outputs = arcface_head(embeddings, labels)
            
            # 3. Tính toán sai số
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            total_loss += loss.item() * imgs.size(0)
            
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()
            
        epoch_loss = total_loss / len(dataset)
        epoch_acc = 100.0 * correct / total
        print(f"    Epoch [{epoch+1}/{EPOCHS}] - Loss: {epoch_loss:.4f} - Accuracy: {epoch_acc:.2f}%")

    print("[+] Huấn luyện Fine-tune hoàn tất thành công.")

    # ==========================================
    # 8. XUẤT MÔ HÌNH BACKBONE SANG ONNX
    # ==========================================
    print(f"\n[*] Đang tiến hành xuất mô hình Backbone sang định dạng ONNX...")
    backbone.eval()
    
    dummy_input = torch.randn(1, 3, *IMAGE_SIZE, device=device)
    
    torch.onnx.export(
        backbone,
        dummy_input,
        MODEL_OUTPUT_PATH,
        export_params=True,
        opset_version=11,
        do_constant_folding=True,
        input_names=['input'],
        output_names=['output'],
        dynamic_axes={
            'input': {0: 'batch_size'},
            'output': {0: 'batch_size'}
        }
    )
    print(f"[+] Đã xuất file ONNX thành công: {MODEL_OUTPUT_PATH}")

    # ==========================================
    # 9. KIỂM ĐỊNH TỆP TIN ONNX VỪA TẠO
    # ==========================================
    print("\n[*] Đang tự động kiểm định tệp tin ONNX vừa tạo bằng ONNX Runtime...")
    
    onnx_model = onnx.load(MODEL_OUTPUT_PATH)
    onnx.checker.check_model(onnx_model)
    print("[+] Cấu trúc file ONNX hợp lệ!")

    ort_session = ort.InferenceSession(MODEL_OUTPUT_PATH)
    dummy_np = np.random.randn(1, 3, 112, 112).astype(np.float32)
    outputs = ort_session.run(None, {'input': dummy_np})
    embedding_out = outputs[0]
    
    print(f"[+] Output shape kiểm tra: {embedding_out.shape} (Mong đợi: (1, 512))")
    if embedding_out.shape == (1, 512):
        print("\n" + "="*60)
        print(" CHÚC MỪNG: PIPELINE ĐÃ HOÀN THÀNH XUẤT SẮC!")
        print(" File ONNX của bạn đã sẵn sàng nạp và sử dụng trong C# .NET 8.0.")
        print("="*60)
    else:
        print("[-] Kiểm định thất bại! Kích thước đầu ra không chính xác.")

if __name__ == "__main__":
    main()
