import torch
from PIL import Image
import torchvision.transforms as T

# Tải model bản Small (rất nhanh trên CPU)
model = torch.hub.load('facebookresearch/dinov2', 'dinov2_vits14')
model.to('cpu')
model.eval()

# Chuẩn bị ảnh
transform = T.Compose([
    T.Resize(224),
    T.CenterCrop(224),
    T.ToTensor(),
    T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

img = Image.open("/work/a.i-assistant-chatbot-telegram-serverles/skills/browser/dashboard_result.png").convert('RGB')
input_tensor = transform(img).unsqueeze(0)

# Trích xuất vector embedding (giống như get_word_vector trong FastText)
with torch.no_grad():
    embedding = model(input_tensor)

print(f"Kích thước vector: {embedding}") # Ví dụ: [1, 384]

# import torch
# from transformers import AutoModelForCausalLM, AutoTokenizer
# from PIL import Image
# import faiss
# import numpy as np
# from sentence_transformers import SentenceTransformer

# # 1. Khởi tạo Moondream
# model_id = "vikhyatk/moondream2"
# revision = "2024-03-06"
# model = AutoModelForCausalLM.from_pretrained(
#     model_id, trust_remote_code=True, revision=revision
# )
# tokenizer = AutoTokenizer.from_pretrained(model_id, revision=revision)

# # 2. Khởi tạo model Embedding & FAISS (Giả sử vector size 384 cho all-MiniLM-L6-v2)
# embed_model = SentenceTransformer('all-MiniLM-L6-v2')
# dimension = 384
# index = faiss.IndexFlatL2(dimension)
# metadata_store = [] # Lưu trữ thông tin bổ sung

# def process_and_store_image(image_path, extra_info={}):
#     # Bước A: Moondream phân tích ảnh
#     image = Image.open(image_path)
#     enc_image = model.encode_image(image)
#     description = model.answer_question(enc_image, "Describe this image in detail.", tokenizer)
    
#     print(f"Moondream Caption: {description}")

#     # Bước B: Tạo Embedding từ caption
#     vector = embed_model.encode([description])
    
#     # Bước C: Lưu vào FAISS
#     index.add(np.array(vector).astype('float32'))
    
#     # Lưu metadata để truy vấn ngược lại
#     metadata_store.append({
#         "caption": description,
#         "path": image_path,
#         **extra_info
#     })

# # Demo chạy thử với một ảnh từ Playwright
# process_and_store_image("/work/a.i-assistant-chatbot-telegram-serverles/skills/browser/dashboard_result.png", {"url": "https://example.com"})