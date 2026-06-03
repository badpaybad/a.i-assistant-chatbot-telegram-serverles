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
    Nhánh trích xuất đặc trưng hình học không gian tự chú ý và đặc trưng vùng (Geometric & Regional Backbone Branch).
    Đầu vào: 
        - x_geom: Tọa độ 26 landmarks (B, 26, 2) đã được chuẩn hóa.
        - x_global: Ảnh toàn mặt (B, 3, 112, 112).
        - f_global: Đặc trưng toàn cảnh (B, 512).
    Đầu ra: Vector đặc trưng hình học kết hợp tự chú ý 512 chiều và ma trận chú ý (attention weights).
    """
    def __init__(self, backbone_name="resnet18", num_landmarks=26, token_dim=128, pretrained=False):
        super(GeometricNet, self).__init__()
        self.backbone_name = backbone_name.lower()
        self.num_landmarks = num_landmarks
        self.token_dim = token_dim
        
        # Định nghĩa offset grid cho patch 21x21 (diagonal ~30px trên ảnh 112x112)
        # Bán kính 10px, tương đương đường chéo 30px (cạnh ~21px)
        offsets = torch.linspace(-10, 10, 21) * (2.0 / 112.0)
        oy, ox = torch.meshgrid(offsets, offsets, indexing='ij')
        offset_grid = torch.stack([ox, oy], dim=-1) # Shape: (21, 21, 2)
        self.register_buffer("offset_grid", offset_grid.unsqueeze(0).unsqueeze(1)) # Shape: (1, 1, 21, 21, 2)
        
        # Mạng backbone trích xuất đặc trưng từ vùng patch xung quanh từng landmark
        self.patch_backbone = GlobalNet(backbone_name=backbone_name, embedding_dim=token_dim, pretrained=pretrained)
        
        # Lớp chiếu tọa độ landmarks sang chiều token_dim để làm Position Embedding
        self.proj_pos = nn.Linear(2, token_dim)
        
        # Lớp chiếu đặc trưng toàn cảnh f_global sang chiều token_dim
        self.proj_global = nn.Sequential(
            nn.Linear(512, token_dim),
            nn.LayerNorm(token_dim),
            nn.PReLU()
        )
        
        # Learned position embedding cho global token
        self.global_pos_emb = nn.Parameter(torch.zeros(1, 1, token_dim))
        
        # Lớp Multihead Self-Attention
        self.self_attn = nn.MultiheadAttention(embed_dim=token_dim, num_heads=4, batch_first=True)
        self.layernorm_attn = nn.LayerNorm(token_dim)
        
        # MLP chiếu đầu ra tự chú ý (27 tokens * token_dim) về embedding 512 chiều
        self.fc_out = nn.Sequential(
            nn.Linear(27 * token_dim, 512),
            nn.BatchNorm1d(512),
            nn.PReLU(),
            nn.Dropout(p=0.3)
        )

    def forward(self, x_geom, x_global, f_global):
        B = x_geom.size(0)
        
        # 1. Chuyển đổi x_geom từ [0, 1] sang [-1, 1] cho F.grid_sample
        grid_centers = x_geom * 2.0 - 1.0 # (B, 26, 2)
        
        # 2. Xây dựng grid lấy mẫu cho từng patch xung quanh landmark
        # grid_centers: (B, 26, 1, 1, 2)
        # self.offset_grid: (1, 1, 21, 21, 2)
        grid = grid_centers.unsqueeze(2).unsqueeze(3) + self.offset_grid
        
        # Reshape grid để tương thích với F.grid_sample: (B, 26 * 21, 21, 2)
        grid_reshaped = grid.view(B, self.num_landmarks * 21, 21, 2)
        
        # 3. Lấy mẫu patch 21x21 từ ảnh toàn mặt x_global
        sampled_patches = F.grid_sample(x_global, grid_reshaped, align_corners=False)
        
        # Reshape & Permute về dạng: (B, 26, 3, 21, 21)
        sampled_patches = sampled_patches.view(B, 3, self.num_landmarks, 21, 21).permute(0, 2, 1, 3, 4)
        
        # Flatten batch và landmark dims: (B * 26, 3, 21, 21)
        patches_flat = sampled_patches.reshape(B * self.num_landmarks, 3, 21, 21)
        
        # 4. Đặc biệt với ConvNeXt: Nội suy từ 21x21 lên 56x56 để tránh lỗi kích thước trong PyTorch
        if self.backbone_name == "convnext":
            patches_flat = F.interpolate(patches_flat, size=(56, 56), mode="bilinear", align_corners=False)
            
        # 5. Trích xuất đặc trưng vùng bằng patch backbone
        feat_flat = self.patch_backbone(patches_flat) # (B * 26, token_dim)
        sampled_feat = feat_flat.view(B, self.num_landmarks, self.token_dim) # (B, 26, token_dim)
        
        # 6. Tính toán đặc trưng vị trí hình học (Displacement & IPD Normalization)
        left_eye = (x_geom[:, 0] + x_geom[:, 1]) / 2.0
        right_eye = (x_geom[:, 2] + x_geom[:, 3]) / 2.0
        eye_mid = (left_eye + right_eye) / 2.0
        
        ipd = torch.norm(left_eye - right_eye, p=2, dim=1, keepdim=True).clamp(min=1e-6)
        disp = (x_geom - eye_mid.unsqueeze(1)) / ipd.unsqueeze(2) # (B, 26, 2)
        pos_emb = self.proj_pos(disp) # (B, 26, token_dim)
        
        # Cộng position embedding vào các đặc trưng vùng
        sampled_feat = sampled_feat + pos_emb
        
        # 7. Chiếu đặc trưng toàn cảnh f_global về token_dim
        t_global = self.proj_global(f_global) # (B, token_dim)
        t_global_with_pos = t_global.unsqueeze(1) + self.global_pos_emb
        
        # 8. Xếp thành chuỗi 27 tokens: (B, 27, token_dim)
        tokens = torch.cat([t_global_with_pos, sampled_feat], dim=1)
        
        # 9. Thực thi Multi-Head Self-Attention
        attn_out, attn_weights = self.self_attn(tokens, tokens, tokens) # attn_out: (B, 27, token_dim), attn_weights: (B, 27, 27)
        tokens = self.layernorm_attn(tokens + attn_out)
        
        # 10. Phẳng hóa và chiếu về 512-D
        feat_flat = tokens.reshape(B, -1) # (B, 27 * token_dim)
        out = self.fc_out(feat_flat)
        
        return out, attn_weights

class CrossStreamCorrelationAttention(nn.Module):
    """
    Giữ lớp này để tránh lỗi import nếu có, mặc dù không dùng đến trong mô hình mới.
    """
    def __init__(self, eye_dim=128, nose_dim=64, global_dim=512, geom_dim=64, token_dim=128, num_heads=4):
        super(CrossStreamCorrelationAttention, self).__init__()
        self.dummy = nn.Linear(1, 1)

    def forward(self, f_global, f_eye, f_nose, f_geom):
        return f_global, torch.zeros(f_global.size(0), 3, device=f_global.device)

class CustomPartBasedFaceCNN(nn.Module):
    """
    Hệ thống mạng Custom Face CNN kết hợp GlobalNet và GeometricNet (Backbone Patch + 27-Token Attention).
    """
    def __init__(self, num_classes=10, embedding_dim=512, pretrained_global=False, backbone_name="resnet18"):
        super(CustomPartBasedFaceCNN, self).__init__()
        # Mạng trích xuất đặc trưng toàn mặt
        self.global_branch = GlobalNet(backbone_name=backbone_name, embedding_dim=512, pretrained=pretrained_global)
        
        # Nhánh GeometricNet (chứa patch backbone và self-attention)
        self.geom_branch = GeometricNet(
            backbone_name=backbone_name,
            num_landmarks=26,
            token_dim=128,
            pretrained=pretrained_global
        )
        
        # Lớp Dropout trước bộ phân lớp để chống overfitting
        self.classifier_dropout = nn.Dropout(p=0.4)
        
        # Đầu phân lớp Linear phục vụ huấn luyện phân loại danh tính
        self.classifier = nn.Linear(embedding_dim, num_classes)

    def forward(self, x_global, x_eye, x_nose, x_geom):
        """
        x_global: (B, 3, 112, 112)
        x_eye: (B, 3, 56, 112) [Không sử dụng, giữ để tương thích ngược]
        x_nose: (B, 3, 56, 56) [Không sử dụng, giữ để tương thích ngược]
        x_geom: (B, 26, 2)
        """
        # 1. Trích xuất đặc trưng toàn mặt
        f_global = self.global_branch(x_global)
        
        # 2. Trích xuất đặc trưng vùng kết hợp Self-Attention 27 tokens
        f_fused, attn_weights = self.geom_branch(x_geom, x_global, f_global)
        
        # 3. Dummy computation để giữ kết nối cho x_eye và x_nose trong đồ thị ONNX
        dummy_val = x_eye.sum() * 0.0 + x_nose.sum() * 0.0
        
        # 4. Chuẩn hóa L2 embedding phục vụ so sánh Cosine trực tiếp
        normalized_embedding = F.normalize(f_fused + dummy_val, p=2, dim=1)
        
        # 5. Tính toán trọng số chú ý tương thích ngược (B, 3) từ attn_weights (B, 27, 27)
        # index 0: global, indices 1-26: landmarks
        w_global = attn_weights[:, :, 0].mean(dim=1)
        w_eye = attn_weights[:, :, 1:11].mean(dim=(1, 2))
        w_nose = attn_weights[:, :, 15:19].mean(dim=(1, 2))
        
        # Ghép thành vector trọng số 3 chiều
        weights_out = torch.stack([w_eye, w_nose, w_global], dim=1)
        weights_out = F.softmax(weights_out, dim=1)
        
        return normalized_embedding, weights_out

    def forward_training(self, x_global, x_eye, x_nose, x_geom):
        """
        Sử dụng khi huấn luyện để trả về cả embedding chuẩn hóa và điểm logit phân lớp
        """
        emb, weights = self.forward(x_global, x_eye, x_nose, x_geom)
        # Áp dụng dropout vào embedding trước khi đưa vào classifier để tăng khả năng tổng quát hóa
        logits = self.classifier(self.classifier_dropout(emb))
        return emb, logits, weights
