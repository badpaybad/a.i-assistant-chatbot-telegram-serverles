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

class ContourNet(nn.Module):
    """
    Nhánh mạng tích chập chuyên trích xuất đặc trưng từ ảnh viền khuôn mặt (Face Contour/Silhouette).
    Kích thước đầu vào chuẩn hóa: (B, 3, 112, 112) [Height=112, Width=112]
    """
    def __init__(self, embedding_dim=128):
        super(ContourNet, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.PReLU(),
            nn.MaxPool2d(2, 2), # Output: (B, 32, 56, 56)
            nn.Dropout2d(p=0.1),
            
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.PReLU(),
            nn.MaxPool2d(2, 2), # Output: (B, 64, 28, 28)
            nn.Dropout2d(p=0.15),
            
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.PReLU(),
            nn.MaxPool2d(2, 2), # Output: (B, 128, 14, 14)
            nn.Dropout2d(p=0.2),
            
            nn.Conv2d(128, 256, kernel_size=3, padding=1),
            nn.BatchNorm2d(256),
            nn.PReLU(),
            nn.AdaptiveAvgPool2d((1, 1)) # Output: (B, 256, 1, 1)
        )
        self.fc = nn.Linear(256, embedding_dim)
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

class PatchFeatureNet(nn.Module):
    """
    CNN nhẹ chuyên biệt trích xuất đặc trưng từ ảnh patch 21x21 xung quanh landmark.
    Đầu vào: (N, 3, 21, 21)
    Đầu ra: (N, token_dim)
    """
    def __init__(self, token_dim=128):
        super(PatchFeatureNet, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),   # -> (N, 32, 21, 21)
            nn.BatchNorm2d(32),
            nn.PReLU(),
            nn.MaxPool2d(2, 2),                           # -> (N, 32, 10, 10)
            nn.Dropout2d(p=0.05),
            
            nn.Conv2d(32, 64, kernel_size=3, padding=1),  # -> (N, 64, 10, 10)
            nn.BatchNorm2d(64),
            nn.PReLU(),
            nn.MaxPool2d(2, 2),                           # -> (N, 64, 5, 5)
            nn.Dropout2d(p=0.1),
            
            nn.Conv2d(64, 128, kernel_size=3, padding=1), # -> (N, 128, 5, 5)
            nn.BatchNorm2d(128),
            nn.PReLU(),
            nn.AdaptiveAvgPool2d((1, 1))                  # -> (N, 128, 1, 1)
        )
        self.fc = nn.Sequential(
            nn.Linear(128, token_dim),
            nn.BatchNorm1d(token_dim),
            nn.PReLU(),
            nn.Dropout(p=0.1)
        )

    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        x = self.fc(x)
        return x

class GeometricNet(nn.Module):
    """
    Nhánh trích xuất đặc trưng hình học không gian tự chú ý và đặc trưng vùng (Geometric & Regional Backbone Branch).
    Đầu vào: 
        - x_geom: Tọa độ landmarks (B, num_landmarks, 2) đã được chuẩn hóa.
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
        offsets = torch.linspace(-10, 10, 21) * (2.0 / 112.0)
        oy, ox = torch.meshgrid(offsets, offsets, indexing='ij')
        offset_grid = torch.stack([ox, oy], dim=-1) # Shape: (21, 21, 2)
        self.register_buffer("offset_grid", offset_grid.unsqueeze(0).unsqueeze(1)) # Shape: (1, 1, 21, 21, 2)
        
        # Mạng backbone nhẹ trích xuất đặc trưng từ vùng patch xung quanh từng landmark
        self.patch_backbone = PatchFeatureNet(token_dim=token_dim)
        
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
        
        # Nếu sử dụng >=37 landmarks, ta kích hoạt ContourNet để trích xuất viền mặt khép kín
        if num_landmarks >= 37:
            self.contour_branch = ContourNet(embedding_dim=token_dim)
            self.contour_pos_emb = nn.Parameter(torch.zeros(1, 1, token_dim))
            # 26 keypoint tokens + 1 eye_mid token + 1 global token + 1 contour token = 29 tokens
            num_tokens = 29
        else:
            num_tokens = num_landmarks + 2
            
        # Lớp Multihead Self-Attention cục bộ giữa các local keypoint tokens
        self.self_attn_local = nn.MultiheadAttention(embed_dim=token_dim, num_heads=4, batch_first=True)
        self.layernorm_attn_local = nn.LayerNorm(token_dim)
        
        # Lớp Multihead Self-Attention toàn cục
        self.self_attn_global = nn.MultiheadAttention(embed_dim=token_dim, num_heads=4, batch_first=True)
        self.layernorm_attn_global = nn.LayerNorm(token_dim)
        
        # MLP chiếu đầu ra tự chú ý toàn cục về embedding 512 chiều
        self.fc_out = nn.Sequential(
            nn.Linear(num_tokens * token_dim, 512),
            nn.BatchNorm1d(512),
            nn.PReLU(),
            nn.Dropout(p=0.3)
        )

    def forward(self, x_geom, x_global, f_global):
        B = x_geom.size(0)
        device = x_geom.device
        
        if self.num_landmarks >= 37:
            # 1. Tính toán tọa độ trung điểm 2 mắt (từ 4 landmark đầu của mắt)
            left_eye = (x_geom[:, 0] + x_geom[:, 1]) / 2.0
            right_eye = (x_geom[:, 2] + x_geom[:, 3]) / 2.0
            eye_mid = (left_eye + right_eye) / 2.0 # (B, 2)
            
            # Chỉ lấy 26 keypoints đầu tiên làm local tokens
            x_geom_keys = x_geom[:, :26, :]
            x_geom_extended = torch.cat([eye_mid.unsqueeze(1), x_geom_keys], dim=1) # (B, 27, 2)
            
            # Crop 27 local patches và lấy mẫu
            grid_centers = x_geom_extended * 2.0 - 1.0
            grid = grid_centers.unsqueeze(2).unsqueeze(3) + self.offset_grid
            grid_reshaped = grid.view(B, 27 * 21, 21, 2)
            sampled_patches = F.grid_sample(x_global, grid_reshaped, align_corners=False)
            sampled_patches = sampled_patches.view(B, 3, 27, 21, 21).permute(0, 2, 1, 3, 4)
            
            patches_flat = sampled_patches.reshape(B * 27, 3, 21, 21)
            sampled_feat = self.patch_backbone(patches_flat)
            sampled_feat = sampled_feat.view(B, 27, self.token_dim)
            
            # Tính position embedding
            ipd = torch.norm(left_eye - right_eye, p=2, dim=1, keepdim=True).clamp(min=1e-6)
            disp = (x_geom_extended - eye_mid.unsqueeze(1)) / ipd.unsqueeze(2)
            pos_emb = self.proj_pos(disp)
            sampled_feat = sampled_feat + pos_emb
            
            # 2. Xây dựng contour image bằng masking các landmark đường bao (chỉ số 26-36)
            coords = x_geom[:, 26:, :] * 112.0 # Shape: (B, 11, 2)
            
            grid_y, grid_x = torch.meshgrid(
                torch.arange(112, device=device),
                torch.arange(112, device=device),
                indexing='ij'
            )
            grid_px = torch.stack([grid_x, grid_y], dim=-1).float() # (112, 112, 2)
            grid_px = grid_px.unsqueeze(0).unsqueeze(0) # (1, 1, 112, 112, 2)
            
            coords_expanded = coords.unsqueeze(2).unsqueeze(2) # (B, 11, 1, 1, 2)
            diff = torch.abs(grid_px - coords_expanded) # (B, 11, 112, 112, 2)
            
            # Hình vuông 21x21 (đường chéo ~30px)
            in_square = (diff[..., 0] <= 10) & (diff[..., 1] <= 10)
            mask = in_square.any(dim=1).float().unsqueeze(1) # (B, 1, 112, 112)
            
            contour_image = x_global * mask
            contour_token = self.contour_branch(contour_image) # (B, token_dim)
            contour_token_with_pos = contour_token.unsqueeze(1) + self.contour_pos_emb # (B, 1, token_dim)
            
            # 3. Thực thi Local Self-Attention giữa các vùng đã lấy đặc trưng với nhau:
            # Gồm 1 contour token và 27 keypoint/eye_mid tokens với nhau
            sampled_feat_with_contour = torch.cat([contour_token_with_pos, sampled_feat], dim=1) # (B, 28, token_dim)
            local_attn_out, local_attn_weights = self.self_attn_local(
                sampled_feat_with_contour, sampled_feat_with_contour, sampled_feat_with_contour
            )
            local_tokens = self.layernorm_attn_local(sampled_feat_with_contour + local_attn_out) # (B, 28, token_dim)
            
            # 4. Chiếu đặc trưng toàn cảnh f_global về token_dim
            t_global = self.proj_global(f_global)
            t_global_with_pos = t_global.unsqueeze(1) + self.global_pos_emb # (B, 1, token_dim)
            
            # Xếp chuỗi tokens: global token (0) kết hợp với các local tokens đã chú ý (1-28)
            tokens_all = torch.cat([t_global_with_pos, local_tokens], dim=1) # (B, 29, token_dim)
            
        else:
            # Tương thích ngược với legacy checkpoints
            left_eye = (x_geom[:, 0] + x_geom[:, 1]) / 2.0
            right_eye = (x_geom[:, 2] + x_geom[:, 3]) / 2.0
            eye_mid = (left_eye + right_eye) / 2.0
            
            x_geom_extended = torch.cat([eye_mid.unsqueeze(1), x_geom], dim=1) # (B, num_landmarks + 1, 2)
            L = self.num_landmarks + 1
            
            grid_centers = x_geom_extended * 2.0 - 1.0
            grid = grid_centers.unsqueeze(2).unsqueeze(3) + self.offset_grid
            grid_reshaped = grid.view(B, L * 21, 21, 2)
            sampled_patches = F.grid_sample(x_global, grid_reshaped, align_corners=False)
            sampled_patches = sampled_patches.view(B, 3, L, 21, 21).permute(0, 2, 1, 3, 4)
            
            patches_flat = sampled_patches.reshape(B * L, 3, 21, 21)
            sampled_feat = self.patch_backbone(patches_flat)
            sampled_feat = sampled_feat.view(B, L, self.token_dim)
            
            ipd = torch.norm(left_eye - right_eye, p=2, dim=1, keepdim=True).clamp(min=1e-6)
            disp = (x_geom_extended - eye_mid.unsqueeze(1)) / ipd.unsqueeze(2)
            pos_emb = self.proj_pos(disp)
            sampled_feat = sampled_feat + pos_emb
            
            local_attn_out, local_attn_weights = self.self_attn_local(sampled_feat, sampled_feat, sampled_feat)
            local_tokens = self.layernorm_attn_local(sampled_feat + local_attn_out)
            
            t_global = self.proj_global(f_global)
            t_global_with_pos = t_global.unsqueeze(1) + self.global_pos_emb
            
            tokens_all = torch.cat([t_global_with_pos, local_tokens], dim=1) # (B, num_landmarks + 2, token_dim)
            
        # Global Attention
        global_attn_out, global_attn_weights = self.self_attn_global(tokens_all, tokens_all, tokens_all)
        tokens_all = self.layernorm_attn_global(tokens_all + global_attn_out)
        
        # MLP chiếu về 512-D
        feat_flat = tokens_all.reshape(B, -1)
        out = self.fc_out(feat_flat)
        
        return out, global_attn_weights

class CrossStreamCorrelationAttention(nn.Module):
    """
    Giữ lớp này để tránh lỗi import nếu có, mặc dù không dùng đến trong mô hình mới.
    """
    def __init__(self, eye_dim=128, nose_dim=64, global_dim=512, geom_dim=64, token_dim=128, num_heads=4):
        super(CrossStreamCorrelationAttention, self).__init__()
        self.dummy = nn.Linear(1, 1)

    def forward(self, f_global, f_eye, f_nose, f_geom):
        return f_global, torch.zeros(f_global.size(0), 3, device=f_global.device)

class SubCenterArcMarginProduct(nn.Module):
    """
    Sub-center ArcFace (Additive Angular Margin Loss) classifier head.
    Ref: https://arxiv.org/abs/2004.04989
    If k = 1, it degrades to standard ArcFace.
    """
    def __init__(self, in_features, out_features, s=30.0, m=0.50, k=3, easy_margin=False):
        super(SubCenterArcMarginProduct, self).__init__()
        self.in_features = in_features
        self.out_features = out_features
        self.s = s
        self.m = m
        self.k = k
        self.easy_margin = easy_margin
        
        # Trọng số có kích thước (out_features * k, in_features)
        self.weight = nn.Parameter(torch.FloatTensor(out_features * k, in_features))
        nn.init.xavier_uniform_(self.weight)
        
        self.cos_m = math.cos(m)
        self.sin_m = math.sin(m)
        self.th = math.cos(math.pi - m)
        self.mm = math.sin(math.pi - m) * m

    def forward(self, input, label):
        # input: (B, in_features)
        # weight: (out_features * k, in_features)
        # cosine: (B, out_features * k)
        cosine = F.linear(F.normalize(input), F.normalize(self.weight))
        
        # Nếu k > 1, lấy similarity lớn nhất trong số các sub-centers của từng lớp
        if self.k > 1:
            cosine = cosine.view(-1, self.out_features, self.k)
            cosine, _ = torch.max(cosine, dim=2)
            
        # Tính sine = sqrt(1 - cos^2)
        # Clamp để tránh lỗi NaN khi giá trị xấp xỉ 1.0
        sine = torch.sqrt((1.0 - torch.pow(cosine, 2)).clamp(1e-7, 1.0))
        phi = cosine * self.cos_m - sine * self.sin_m
        
        if self.easy_margin:
            phi = torch.where(cosine > 0, phi, cosine)
        else:
            phi = torch.where(cosine > self.th, phi, cosine - self.mm)
            
        # One-hot encoding cho nhãn mục tiêu
        one_hot = torch.zeros(cosine.size(), device=input.device)
        one_hot.scatter_(1, label.view(-1, 1).long(), 1)
        
        # Chỉ áp dụng margin cộng thêm cho lớp mục tiêu (target class)
        output = (one_hot * phi) + ((1.0 - one_hot) * cosine)
        output *= self.s
        return output

class CustomPartBasedFaceCNN(nn.Module):
    """
    Hệ thống mạng Custom Face CNN kết hợp GlobalNet và GeometricNet (Backbone Patch + 28-Token Hierarchical Attention).
    """
    def __init__(self, num_classes=10, embedding_dim=512, pretrained_global=False, backbone_name="resnet18", s=30.0, m=0.50, k=3, dropout=0.4, num_landmarks=37):
        super(CustomPartBasedFaceCNN, self).__init__()
        # Mạng trích xuất đặc trưng toàn mặt
        self.global_branch = GlobalNet(backbone_name=backbone_name, embedding_dim=512, pretrained=pretrained_global)
        
        # Nhánh GeometricNet (chứa patch backbone và self-attention)
        self.geom_branch = GeometricNet(
            backbone_name=backbone_name,
            num_landmarks=num_landmarks,
            token_dim=128,
            pretrained=pretrained_global
        )
        
        # Lớp Dropout trước bộ phân lớp để chống overfitting
        self.classifier_dropout = nn.Dropout(p=dropout)
        
        # Đầu phân lớp Sub-center ArcFace phục vụ huấn luyện phân loại danh tính
        self.classifier = SubCenterArcMarginProduct(embedding_dim, num_classes, s=s, m=m, k=k)

    def forward(self, x_global, x_eye, x_nose, x_geom):
        """
        x_global: (B, 3, 112, 112)
        x_eye: (B, 3, 56, 112) [Không sử dụng, giữ để tương thích ngược]
        x_nose: (B, 3, 56, 56) [Không sử dụng, giữ để tương thích ngược]
        x_geom: (B, 26, 2)
        """
        # 1. Trích xuất đặc trưng toàn mặt
        f_global = self.global_branch(x_global)
        
        # 2. Trích xuất đặc trưng vùng kết hợp Self-Attention 28 tokens
        f_fused, attn_weights = self.geom_branch(x_geom, x_global, f_global)
        
        # 3. Dummy computation để giữ kết nối cho x_eye và x_nose trong đồ thị ONNX
        dummy_val = x_eye.sum() * 0.0 + x_nose.sum() * 0.0
        
        # 4. Chuẩn hóa L2 embedding phục vụ so sánh Cosine trực tiếp
        normalized_embedding = F.normalize(f_fused + dummy_val, p=2, dim=1)
        
        # 5. Tính toán trọng số chú ý tương thích ngược (B, 3) từ attn_weights
        if self.geom_branch.num_landmarks >= 37:
            # tokens_all: index 0 = global, index 1 = contour, index 2 = eye_mid, indices 3-28 = 26 landmarks
            w_global = attn_weights[:, :, 0].mean(dim=1)
            # Vùng mắt (landmarks 0-9) tương ứng với indices 3-12
            w_eye = attn_weights[:, :, 3:13].mean(dim=(1, 2))
            # Vùng mũi (landmarks 14-17) tương ứng với indices 17-20
            w_nose = attn_weights[:, :, 17:21].mean(dim=(1, 2))
        else:
            # tokens_all: index 0 = global, index 1 = eye_mid, indices 2-27 = 26 landmarks
            w_global = attn_weights[:, :, 0].mean(dim=1)
            # Vùng mắt (landmarks 0-9) tương ứng với indices 2-11
            w_eye = attn_weights[:, :, 2:12].mean(dim=(1, 2))
            # Vùng mũi (landmarks 14-17) tương ứng với indices 16-19
            w_nose = attn_weights[:, :, 16:20].mean(dim=(1, 2))
        
        # Ghép thành vector trọng số 3 chiều
        weights_out = torch.stack([w_eye, w_nose, w_global], dim=1)
        weights_out = F.softmax(weights_out, dim=1)
        
        return normalized_embedding, weights_out

    def forward_training(self, x_global, x_eye, x_nose, x_geom, labels):
        """
        Sử dụng khi huấn luyện để trả về cả embedding chuẩn hóa và điểm logit phân lớp
        """
        emb, weights = self.forward(x_global, x_eye, x_nose, x_geom)
        # Áp dụng dropout vào embedding trước khi đưa vào classifier để tăng khả năng tổng quát hóa
        logits = self.classifier(self.classifier_dropout(emb), labels)
        return emb, logits, weights
