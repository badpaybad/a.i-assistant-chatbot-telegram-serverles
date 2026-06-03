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
            nn.Dropout2d(p=0.1), # Spatial Dropout chống quá khớp cục bộ
            
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.PReLU(),
            nn.MaxPool2d(2, 2), # Output: (B, 64, 14, 28)
            nn.Dropout2d(p=0.15),
            
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.PReLU(),
            nn.MaxPool2d(2, 2), # Output: (B, 128, 7, 14)
            nn.Dropout2d(p=0.2),
            
            nn.Conv2d(128, 256, kernel_size=3, padding=1),
            nn.BatchNorm2d(256),
            nn.PReLU(),
            nn.AdaptiveAvgPool2d((1, 1)) # Output: (B, 256, 1, 1)
        )
        self.fc = nn.Linear(256, embedding_dim)
        self.dropout = nn.Dropout(p=0.3) # Dropout sau FC
        self.bn_out = nn.BatchNorm1d(embedding_dim)

    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        x = self.fc(x)
        x = self.dropout(x)
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
            nn.Dropout2d(p=0.1),
            
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.PReLU(),
            nn.MaxPool2d(2, 2), # Output: (B, 64, 14, 14)
            nn.Dropout2d(p=0.15),
            
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.PReLU(),
            nn.AdaptiveAvgPool2d((1, 1)) # Output: (B, 128, 1, 1)
        )
        self.fc = nn.Linear(128, embedding_dim)
        self.dropout = nn.Dropout(p=0.3)
        self.bn_out = nn.BatchNorm1d(embedding_dim)

    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        x = self.fc(x)
        x = self.dropout(x)
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
        self.dropout = nn.Dropout(p=0.4)
        self.bn_out = nn.BatchNorm1d(embedding_dim)

    def forward(self, x):
        x = self.backbone(x)
        x = torch.flatten(x, 1)
        x = self.fc(x)
        x = self.dropout(x)
        return self.bn_out(x)

class GeometricNet(nn.Module):
    """
    Nhánh trích xuất đặc trưng hình học không gian tự chú ý và đặc trưng vùng (Geometric & Regional Correlation Branch).
    Đầu vào: 
        - x_geom: Tọa độ 26 landmarks (B, 26, 2) đã được chuẩn hóa.
        - x_global: Ảnh toàn mặt (B, 3, 112, 112).
    Đầu ra: Vector đặc trưng hình học kết hợp đặc trưng vùng 64 chiều.
    """
    def __init__(self, num_landmarks=26, embedding_dim=64, head_dim=32):
        super(GeometricNet, self).__init__()
        self.num_landmarks = num_landmarks
        self.embedding_dim = embedding_dim
        self.head_dim = head_dim
        
        # Định nghĩa offset grid cho patch 15x15 (diagonal ~20px trên ảnh 112x112)
        # Bán kính 7px, tương đương đường chéo 20px (cạnh ~15px)
        offsets = torch.linspace(-7, 7, 15) * (2.0 / 112.0)
        oy, ox = torch.meshgrid(offsets, offsets, indexing='ij')
        offset_grid = torch.stack([ox, oy], dim=-1) # Shape: (15, 15, 2)
        self.register_buffer("offset_grid", offset_grid.unsqueeze(0).unsqueeze(1)) # Shape: (1, 1, 15, 15, 2)
        
        # Mạng CNN trích xuất đặc trưng từ vùng patch xung quanh từng landmark
        self.patch_conv = nn.Sequential(
            nn.Conv2d(3, 16, kernel_size=3, padding=1),           # Output: (B*26, 16, 15, 15)
            nn.BatchNorm2d(16),
            nn.PReLU(),
            nn.Conv2d(16, 32, kernel_size=3, stride=2, padding=1), # Output: (B*26, 32, 8, 8)
            nn.BatchNorm2d(32),
            nn.PReLU(),
            nn.AdaptiveAvgPool2d((1, 1))                           # Output: (B*26, 32, 1, 1)
        )
        
        # Lớp chiếu tọa độ landmarks sang chiều head_dim để làm Position Embedding
        self.proj_pos = nn.Linear(2, head_dim)
        
        # Các lớp chiếu Query, Key, Value cho cơ chế Self-Attention giữa các landmarks
        # Đầu vào là concatenation của đặc trưng vùng (32-D), Position Embedding (head_dim-D) và Correlation Vector (num_landmarks-D)
        self.proj_q = nn.Linear(32 + head_dim + num_landmarks, head_dim)
        self.proj_k = nn.Linear(32 + head_dim + num_landmarks, head_dim)
        self.proj_v = nn.Linear(32 + head_dim + num_landmarks, head_dim)
        
        # Mạng tuyến tính hợp nhất đặc trưng tương quan cuối cùng
        self.fc = nn.Sequential(
            nn.Linear(num_landmarks * head_dim, 128),
            nn.BatchNorm1d(128),
            nn.PReLU(),
            nn.Dropout(p=0.2),
            nn.Linear(128, embedding_dim),
            nn.BatchNorm1d(embedding_dim)
        )

    def forward(self, x_geom, x_global):
        B = x_geom.size(0)
        
        # 1. Chuyển đổi x_geom từ [0, 1] sang [-1, 1] cho F.grid_sample
        grid_centers = x_geom * 2.0 - 1.0 # (B, 26, 2)
        
        # 2. Xây dựng grid lấy mẫu cho từng patch xung quanh landmark
        # grid_centers: (B, 26, 1, 1, 2)
        # self.offset_grid: (1, 1, 15, 15, 2)
        grid = grid_centers.unsqueeze(2).unsqueeze(3) + self.offset_grid
        
        # Reshape grid để tương thích với F.grid_sample: (B, 26 * 15, 15, 2)
        grid_reshaped = grid.view(B, self.num_landmarks * 15, 15, 2)
        
        # 3. Lấy mẫu patch 15x15 từ ảnh global x_global: (B, 3, 112, 112)
        # sampled_patches: (B, 3, 26 * 15, 15)
        sampled_patches = F.grid_sample(x_global, grid_reshaped, align_corners=False)
        
        # Reshape & Permute về dạng: (B, 26, 3, 15, 15)
        sampled_patches = sampled_patches.view(B, 3, self.num_landmarks, 15, 15).permute(0, 2, 1, 3, 4)
        
        # 4. Trích xuất đặc trưng vùng bằng patch CNN
        # Flatten batch và landmark dims: (B * 26, 3, 15, 15)
        patches_flat = sampled_patches.reshape(B * self.num_landmarks, 3, 15, 15)
        feat_flat = self.patch_conv(patches_flat) # (B * 26, 32, 1, 1)
        sampled_feat = feat_flat.view(B, self.num_landmarks, 32) # (B, 26, 32)
        
        # 5. Tính toán ma trận đặc trưng tương quan (Correlation Matrix) giữa các vùng
        # Chuẩn hóa L2 trước khi nhân dot-product để có Cosine Similarity
        feat_norm = F.normalize(sampled_feat, p=2, dim=-1) # (B, 26, 32)
        corr_matrix = torch.bmm(feat_norm, feat_norm.transpose(1, 2)) # (B, 26, 26)
        
        # 6. Tính toán đặc trưng vị trí hình học (Displacement & IPD Normalization)
        # Mắt trái: index 0 (outer), 1 (inner) -> trung điểm là tâm mắt trái
        # Mắt phải: index 2 (inner), 3 (outer) -> trung điểm là tâm mắt phải
        left_eye = (x_geom[:, 0] + x_geom[:, 1]) / 2.0
        right_eye = (x_geom[:, 2] + x_geom[:, 3]) / 2.0
        eye_mid = (left_eye + right_eye) / 2.0 # (B, 2)
        
        # Tính khoảng cách liên đồng tử (IPD) để chia chuẩn hóa
        ipd = torch.norm(left_eye - right_eye, p=2, dim=1, keepdim=True).clamp(min=1e-6) # (B, 1)
        
        # d_i = (P_i - P_eye_mid) / IPD
        disp = (x_geom - eye_mid.unsqueeze(1)) / ipd.unsqueeze(2) # (B, 26, 2)
        pos_emb = self.proj_pos(disp) # (B, 26, head_dim)
        
        # 7. Kết hợp đặc trưng vùng (32-D), Position Embedding (head_dim-D) và Correlation Vector (26-D)
        # combined_feat: (B, 26, 32 + head_dim + 26)
        combined_feat = torch.cat([sampled_feat, pos_emb, corr_matrix], dim=2)
        
        # 8. Cơ chế Self-Attention tính toán mối tương quan nâng cao giữa tất cả các điểm landmarks
        Q = self.proj_q(combined_feat) # (B, 26, head_dim)
        K = self.proj_k(combined_feat) # (B, 26, head_dim)
        V = self.proj_v(combined_feat) # (B, 26, head_dim)
        
        # Tính toán ma trận tự tương quan giữa tất cả các điểm landmarks
        scores = torch.bmm(Q, K.transpose(1, 2)) / math.sqrt(self.head_dim)
        attn_weights = F.softmax(scores, dim=2) # (B, 26, 26)
        
        # Hợp nhất các Value dựa trên ma trận tự tương quan
        attn_out = torch.bmm(attn_weights, V) # (B, 26, head_dim)
        
        # Biến đổi thành vector dẹt và chiếu về embedding hình học 64 chiều
        attn_flat = attn_out.reshape(B, -1) # (B, 26 * head_dim)
        out = self.fc(attn_flat) # (B, 64)
        return out

class CrossStreamCorrelationAttention(nn.Module):
    """
    Hợp nhất và phân tích tương quan chéo giữa 4 luồng đặc trưng:
    - Global (Toàn mặt)
    - Eye (Mắt)
    - Nose (Mũi)
    - Geom (Hình học & vùng)
    Sử dụng kết hợp mạng CNN 1D để học tương quan cục bộ và Self-Attention để tìm quan hệ tương hỗ.
    """
    def __init__(self, eye_dim=128, nose_dim=64, global_dim=512, geom_dim=64, token_dim=128, num_heads=4):
        super(CrossStreamCorrelationAttention, self).__init__()
        self.token_dim = token_dim
        
        # Chiếu các đặc trưng về cùng số chiều token_dim
        self.proj_eye = nn.Sequential(nn.Linear(eye_dim, token_dim), nn.LayerNorm(token_dim), nn.PReLU())
        self.proj_nose = nn.Sequential(nn.Linear(nose_dim, token_dim), nn.LayerNorm(token_dim), nn.PReLU())
        self.proj_global = nn.Sequential(nn.Linear(global_dim, token_dim), nn.LayerNorm(token_dim), nn.PReLU())
        self.proj_geom = nn.Sequential(nn.Linear(geom_dim, token_dim), nn.LayerNorm(token_dim), nn.PReLU())
        
        # Mạng CNN 1D học tương quan cục bộ giữa các luồng dọc theo chiều đặc trưng (Sequence length = 4)
        # Input shape: (B, token_dim, 4)
        self.conv1d = nn.Sequential(
            nn.Conv1d(token_dim, token_dim, kernel_size=3, padding=1),
            nn.BatchNorm1d(token_dim),
            nn.PReLU(),
            nn.Conv1d(token_dim, token_dim, kernel_size=3, padding=1),
            nn.BatchNorm1d(token_dim),
            nn.PReLU()
        )
        
        # Lớp Multi-Head Self-Attention để tính sự chú ý qua lại chéo giữa các luồng
        self.self_attn = nn.MultiheadAttention(embed_dim=token_dim, num_heads=num_heads, batch_first=True)
        self.layernorm_attn = nn.LayerNorm(token_dim)
        
        # Chiếu đầu ra hợp nhất về embedding_dim = 512
        self.fc_out = nn.Sequential(
            nn.Linear(4 * token_dim, 512),
            nn.BatchNorm1d(512),
            nn.PReLU(),
            nn.Dropout(p=0.3)
        )

    def forward(self, f_global, f_eye, f_nose, f_geom):
        B = f_global.size(0)
        
        # 1. Chiếu các đặc trưng về cùng chiều token_dim
        t_global = self.proj_global(f_global) # (B, token_dim)
        t_eye = self.proj_eye(f_eye)          # (B, token_dim)
        t_nose = self.proj_nose(f_nose)        # (B, token_dim)
        t_geom = self.proj_geom(f_geom)        # (B, token_dim)
        
        # 2. Xếp thành chuỗi 4 tokens: (B, 4, token_dim)
        tokens = torch.stack([t_global, t_eye, t_nose, t_geom], dim=1)
        
        # 3. Áp dụng CNN 1D học tương quan cục bộ (transpose để conv dọc theo sequence length = 4)
        tokens_conv = tokens.transpose(1, 2)
        tokens_conv = self.conv1d(tokens_conv)
        tokens_conv = tokens_conv.transpose(1, 2) # (B, 4, token_dim)
        
        # Kết nối residual
        tokens = tokens + tokens_conv
        
        # 4. Cơ chế Multi-Head Self-Attention giữa các luồng
        attn_out, attn_weights = self.self_attn(tokens, tokens, tokens) # attn_out: (B, 4, token_dim)
        tokens = self.layernorm_attn(tokens + attn_out)
        
        # 5. Phẳng hóa và chiếu về 512-D
        feat_flat = tokens.reshape(B, -1) # (B, 4 * token_dim)
        out = self.fc_out(feat_flat)
        
        # 6. Tính toán trọng số chú ý cho 3 phân vùng (Mắt, Mũi, Toàn mặt) để tương thích ngược
        # attn_weights: (B, 4, 4) biểu thị attention giữa 4 tokens [global, eye, nose, geom]
        w_global = attn_weights[:, :, 0].mean(dim=1)
        w_eye = attn_weights[:, :, 1].mean(dim=1)
        w_nose = attn_weights[:, :, 2].mean(dim=1)
        weights_out = torch.stack([w_eye, w_nose, w_global], dim=1) # Shape: (B, 3)
        
        return out, weights_out

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
        
        # Hợp nhất đa luồng học chéo và tự chú ý giữa 4 đặc trưng (Global, Eye, Nose, Geom) -> 512-D
        self.fusion_module = CrossStreamCorrelationAttention(
            eye_dim=128, 
            nose_dim=64, 
            global_dim=512, 
            geom_dim=64,
            token_dim=128,
            num_heads=4
        )
        
        # Lớp Dropout trước bộ phân lớp để chống overfitting embedding trong quá trình train classification
        self.classifier_dropout = nn.Dropout(p=0.4)
        
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
        
        # 2. Trích xuất đặc trưng hình học đối xứng tự chú ý và đặc trưng vùng
        f_geom = self.geom_branch(x_geom, x_global)
        
        # 3. Phân tích tương quan chéo và tự chú ý qua lại giữa 4 luồng
        f_fused, attention_weights = self.fusion_module(f_global, f_eye, f_nose, f_geom)
        
        # 4. Chuẩn hóa L2 embedding để phục vụ so sánh Cosine trực tiếp
        normalized_embedding = F.normalize(f_fused, p=2, dim=1)
        
        return normalized_embedding, attention_weights

    def forward_training(self, x_global, x_eye, x_nose, x_geom):
        """
        Sử dụng khi huấn luyện để trả về cả embedding chuẩn hóa và điểm logit phân lớp
        """
        emb, weights = self.forward(x_global, x_eye, x_nose, x_geom)
        # Áp dụng dropout vào embedding trước khi đưa vào classifier để tăng khả năng tổng quát hóa
        logits = self.classifier(self.classifier_dropout(emb))
        return emb, logits, weights
