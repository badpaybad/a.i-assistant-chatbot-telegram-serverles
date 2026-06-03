import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision.models as models
import math

class PeriocularNet(nn.Module):
    """
    Nhánh mạng tích chập chuyên trích xuất đặc trưng vùng mắt (Periocular Region).
    Kích thước đầu vào chuẩn hóa: (B, 3, 56, 112) [Height=56, Width=112]
    """
    def __init__(self, embedding_dim=128):
        super(PeriocularNet, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.PReLU(),
            nn.MaxPool2d(2, 2), # Output: (B, 32, 28, 56)
            
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.PReLU(),
            nn.MaxPool2d(2, 2), # Output: (B, 64, 14, 28)
            
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.PReLU(),
            nn.MaxPool2d(2, 2), # Output: (B, 128, 7, 14)
            
            nn.Conv2d(128, 256, kernel_size=3, padding=1),
            nn.BatchNorm2d(256),
            nn.PReLU(),
            nn.AdaptiveAvgPool2d((1, 1)) # Output: (B, 256, 1, 1)
        )
        self.fc = nn.Linear(256, embedding_dim)
        self.bn_out = nn.BatchNorm1d(embedding_dim)

    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        x = self.fc(x)
        return self.bn_out(x)

class NoseNet(nn.Module):
    """
    Nhánh mạng tích chập chuyên trích xuất đặc trưng vùng sống và cánh mũi (Nose Region).
    Kích thước đầu vào chuẩn hóa: (B, 3, 56, 56) [Height=56, Width=56]
    """
    def __init__(self, embedding_dim=64):
        super(NoseNet, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.PReLU(),
            nn.MaxPool2d(2, 2), # Output: (B, 32, 28, 28)
            
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.PReLU(),
            nn.MaxPool2d(2, 2), # Output: (B, 64, 14, 14)
            
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.PReLU(),
            nn.AdaptiveAvgPool2d((1, 1)) # Output: (B, 128, 1, 1)
        )
        self.fc = nn.Linear(128, embedding_dim)
        self.bn_out = nn.BatchNorm1d(embedding_dim)

    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        x = self.fc(x)
        return self.bn_out(x)

class GlobalNet(nn.Module):
    """
    Nhánh mạng trích xuất đặc trưng toàn mặt (Global Face Region) sử dụng Backbone động.
    Kích thước đầu vào chuẩn hóa: (B, 3, 112, 112) [Height=112, Width=112]
    """
    def __init__(self, backbone_name="resnet18", embedding_dim=512, pretrained=False):
        super(GlobalNet, self).__init__()
        self.backbone_name = backbone_name.lower()
        
        if self.backbone_name == "resnet18":
            if pretrained:
                self.backbone = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
            else:
                self.backbone = models.resnet18()
            num_features = self.backbone.fc.in_features
            self.backbone.fc = nn.Identity()
            
        elif self.backbone_name == "resnet50":
            if pretrained:
                self.backbone = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
            else:
                self.backbone = models.resnet50()
            num_features = self.backbone.fc.in_features
            self.backbone.fc = nn.Identity()
            
        elif self.backbone_name == "mobilenet_v3":
            if pretrained:
                self.backbone = models.mobilenet_v3_large(weights=models.MobileNet_V3_Large_Weights.DEFAULT)
            else:
                self.backbone = models.mobilenet_v3_large()
            num_features = self.backbone.classifier[0].in_features
            self.backbone.classifier = nn.Identity()
            
        elif self.backbone_name == "convnext":
            if pretrained:
                self.backbone = models.convnext_tiny(weights=models.ConvNeXt_Tiny_Weights.DEFAULT)
            else:
                self.backbone = models.convnext_tiny()
            num_features = self.backbone.classifier[2].in_features
            self.backbone.classifier = nn.Identity()
            
        else:
            raise ValueError(f"❌ Không hỗ trợ mạng backbone: {backbone_name}")
            
        self.fc = nn.Linear(num_features, embedding_dim)
        self.bn_out = nn.BatchNorm1d(embedding_dim)

    def forward(self, x):
        x = self.backbone(x)
        x = torch.flatten(x, 1)
        x = self.fc(x)
        return self.bn_out(x)

class GeometricNet(nn.Module):
    """
    Nhánh trích xuất đặc trưng hình học không gian tự chú ý (Geometric Self-Attention Branch).
    Đầu vào: Tọa độ 26 landmarks (B, 26, 2) đã được chuẩn hóa.
    Đầu ra: Vector đặc trưng hình học 64 chiều.
    """
    def __init__(self, num_landmarks=26, embedding_dim=64, head_dim=32):
        super(GeometricNet, self).__init__()
        self.num_landmarks = num_landmarks
        self.embedding_dim = embedding_dim
        self.head_dim = head_dim
        
        # Lớp chiếu tọa độ (dx, dy) sang không gian đặc trưng Key/Value
        self.proj_k = nn.Linear(2, head_dim)
        self.proj_v = nn.Linear(2, head_dim)
        
        # Vector truy vấn Query đại diện cho tâm mắt (ở gốc tọa độ [0,0])
        self.query_eye = nn.Parameter(torch.randn(1, head_dim))
        
        # Lớp Linear chiếu đặc trưng hình học tích hợp về kích thước đầu ra
        self.fc = nn.Sequential(
            nn.Linear(head_dim, 64),
            nn.BatchNorm1d(64),
            nn.PReLU(),
            nn.Linear(64, embedding_dim),
            nn.BatchNorm1d(embedding_dim)
        )

    def forward(self, x):
        """
        x: (B, 16, 2) - Tọa độ thô đã chuẩn hóa của 16 landmarks
        """
        B = x.size(0)
        
        # 1. Tính toán tâm mắt làm gốc tọa độ
        # Mắt trái: index 0 (outer), 1 (inner) -> tâm mắt trái là trung điểm
        # Mắt phải: index 2 (inner), 3 (outer) -> tâm mắt phải là trung điểm
        left_eye = (x[:, 0] + x[:, 1]) / 2.0
        right_eye = (x[:, 2] + x[:, 3]) / 2.0
        eye_mid = (left_eye + right_eye) / 2.0 # (B, 2)
        
        # Tính khoảng cách liên đồng tử (IPD) để chia chuẩn hóa
        ipd = torch.norm(left_eye - right_eye, p=2, dim=1, keepdim=True).clamp(min=1e-6) # (B, 1)
        
        # 2. Tính toán dịch chuyển chuẩn hóa (Scale-Invariant Displacement)
        # d_i = (P_i - P_eye_mid) / IPD
        disp = (x - eye_mid.unsqueeze(1)) / ipd.unsqueeze(2) # (B, 16, 2)
        
        # 3. Cơ chế Self-Attention từ tâm mắt
        # Chiếu displacement sang Key và Value
        K = self.proj_k(disp) # (B, 16, head_dim)
        V = self.proj_v(disp) # (B, 16, head_dim)
        
        # Query đại diện cho tâm mắt (origin)
        Q = self.query_eye.unsqueeze(0).expand(B, -1, -1) # (B, 1, head_dim)
        
        # Tính điểm tương quan Attention: Q x K^T
        scores = torch.bmm(Q, K.transpose(1, 2)) / math.sqrt(self.head_dim) # (B, 1, 16)
        attn_weights = F.softmax(scores, dim=2) # (B, 1, 16)
        
        # Hợp nhất các Value theo Attention weights
        attn_out = torch.bmm(attn_weights, V).squeeze(1) # (B, head_dim)
        
        # 4. Chiếu về 64-D embedding hình học
        out = self.fc(attn_out)
        return out

class DynamicAttentionFusion(nn.Module):
    """
    Cơ chế tự động phân bổ trọng số tin cậy (Attention weights) cho từng luồng đặc trưng
    dựa trên ngữ cảnh và trạng thái che khuất của khuôn mặt.
    """
    def __init__(self, eye_dim=128, nose_dim=64, global_dim=512, fused_dim=448):
        super(DynamicAttentionFusion, self).__init__()
        self.total_dim = eye_dim + nose_dim + global_dim
        
        # Mạng sinh trọng số chú ý cho 3 phân vùng (Mắt, Mũi, Toàn mặt)
        self.attention_generator = nn.Sequential(
            nn.Linear(self.total_dim, 128),
            nn.BatchNorm1d(128),
            nn.ReLU(),
            nn.Linear(128, 3),
            nn.Softmax(dim=1)
        )
        
        # Lớp chiếu chiếu đặc trưng hợp nhất về chiều mong muốn (fused_dim, mặc định 448 để nhường 64 cho đặc trưng hình học)
        self.projection = nn.Linear(self.total_dim, fused_dim)
        self.bn_out = nn.BatchNorm1d(fused_dim)

    def forward(self, f_eye, f_nose, f_global):
        # Nối tất cả các đặc trưng ban đầu
        concat_features = torch.cat([f_eye, f_nose, f_global], dim=1)
        
        # Tính toán trọng số tự động (attention weights)
        weights = self.attention_generator(concat_features) # Shape: (B, 3)
        
        w_eye = weights[:, 0].unsqueeze(1)
        w_nose = weights[:, 1].unsqueeze(1)
        w_global = weights[:, 2].unsqueeze(1)
        
        # Áp dụng trọng số thích ứng
        f_eye_weighted = f_eye * w_eye
        f_nose_weighted = f_nose * w_nose
        f_global_weighted = f_global * w_global
        
        # Hợp nhất
        fused = torch.cat([f_eye_weighted, f_nose_weighted, f_global_weighted], dim=1)
        out = self.projection(fused)
        return self.bn_out(out), weights

class CustomPartBasedFaceCNN(nn.Module):
    """
    Hệ thống mạng Custom Face CNN đa phân vùng kết hợp cơ chế Attention thích ứng và đặc trưng hình học đối xứng.
    """
    def __init__(self, num_classes=10, embedding_dim=512, pretrained_global=False, backbone_name="resnet18"):
        super(CustomPartBasedFaceCNN, self).__init__()
        self.eye_branch = PeriocularNet(embedding_dim=128)
        self.nose_branch = NoseNet(embedding_dim=64)
        self.global_branch = GlobalNet(backbone_name=backbone_name, embedding_dim=512, pretrained=pretrained_global)
        
        # Nhánh trích xuất đặc trưng hình học không gian tự chú ý (26 keypoints * 2D = 52 dims) -> 64-D
        self.geom_branch = GeometricNet(num_landmarks=26, embedding_dim=64)
        
        # Hợp nhất ảnh trích xuất về (embedding_dim - 64) = 448 chiều
        self.fusion_module = DynamicAttentionFusion(
            eye_dim=128, 
            nose_dim=64, 
            global_dim=512, 
            fused_dim=embedding_dim - 64
        )
        
        # Đầu phân lớp Linear phục vụ huấn luyện phân loại danh tính
        self.classifier = nn.Linear(embedding_dim, num_classes)

    def forward(self, x_global, x_eye, x_nose, x_geom):
        """
        x_global: (B, 3, 112, 112)
        x_eye: (B, 3, 56, 112)
        x_nose: (B, 3, 56, 56)
        x_geom: (B, 26, 2)
        """
        # 1. Trích xuất đặc trưng song song từ các luồng ảnh
        f_eye = self.eye_branch(x_eye)
        f_nose = self.nose_branch(x_nose)
        f_global = self.global_branch(x_global)
        
        # 2. Trích xuất đặc trưng hình học đối xứng tự chú ý
        f_geom = self.geom_branch(x_geom)
        
        # 3. Hợp nhất thích ứng đặc trưng ảnh
        f_fused_img, attention_weights = self.fusion_module(f_eye, f_nose, f_global)
        
        # 4. Ghép đặc trưng ảnh (448-D) và đặc trưng hình học (64-D) -> 512-D
        f_combined = torch.cat([f_fused_img, f_geom], dim=1)
        
        # 5. Chuẩn hóa L2 embedding để phục vụ so sánh Cosine trực tiếp
        normalized_embedding = F.normalize(f_combined, p=2, dim=1)
        
        return normalized_embedding, attention_weights

    def forward_training(self, x_global, x_eye, x_nose, x_geom):
        """
        Sử dụng khi huấn luyện để trả về cả embedding chuẩn hóa và điểm logit phân lớp
        """
        emb, weights = self.forward(x_global, x_eye, x_nose, x_geom)
        logits = self.classifier(emb)
        return emb, logits, weights
