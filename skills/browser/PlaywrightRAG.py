import os
import pickle
import numpy as np
import fasttext
import faiss
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

# --- CẤU HÌNH ---
MODEL_PATH = "cc.en.300.bin"  # Tải từ fasttext.cc
MODEL_PATH="/work/a.i-assistant-chatbot-telegram-serverles/knowledgebase/fasttext/cc.vi.300.bin"
FAISS_INDEX_PATH = "playwright_docs.index"
METADATA_PATH = "playwright_metadata.pkl"

class PlaywrightRAG:
    def __init__(self):
        print("🚀 Đang khởi tạo hệ thống...")
        self.ft_model = fasttext.load_model(MODEL_PATH)
        self.index = None
        self.documents = []

    def scrape_and_index(self, url="https://playwright.dev/python/docs/api/class-page"):
        """Crawl dữ liệu, tạo embedding và lưu xuống đĩa"""
        print(f"🌐 Đang lấy dữ liệu từ {url}...")
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()
            page.goto(url)
            # Lấy tất cả các section chứa mô tả hàm
            content = page.content()
            browser.close()

        soup = BeautifulSoup(content, 'html.parser')
        # Logic lọc: lấy các đoạn text có ý nghĩa (mô tả hàm/method)
        raw_docs = [s.get_text(separator=' ').strip() for s in soup.find_all(['h3', 'p'])]
        self.documents = [d for d in raw_docs if len(d) > 40] # Lọc nhiễu

        print(f"📦 Đã thu thập {len(self.documents)} đoạn tài liệu.")

        # Tạo Embeddings
        embeddings = np.array([self._get_vector(d) for d in self.documents]).astype('float32')
        
        # Tạo FAISS Index
        dimension = embeddings.shape[1]
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(embeddings)

        # Lưu lại để dùng sau
        faiss.write_index(self.index, FAISS_INDEX_PATH)
        with open(METADATA_PATH, 'wb') as f:
            pickle.dump(self.documents, f)
        print("✅ Đã lưu Index và Metadata thành công!")

    def _get_vector(self, text):
        # Chuẩn hóa text đơn giản trước khi vector hóa
        text = text.replace("\n", " ").lower()
        return self.ft_model.get_sentence_vector(text)

    def load_local(self):
        """Tải index đã có từ máy"""
        if os.path.exists(FAISS_INDEX_PATH) and os.path.exists(METADATA_PATH):
            self.index = faiss.read_index(FAISS_INDEX_PATH)
            with open(METADATA_PATH, 'rb') as f:
                self.documents = pickle.load(f)
            print("📂 Đã tải Index từ bộ nhớ cục bộ.")
            return True
        return False

    def search(self, query, k=3):
        """Tìm kiếm thông tin liên quan"""
        if self.index is None:
            print("❌ Index chưa được khởi tạo!")
            return
        
        query_vec = self._get_vector(query).reshape(1, -1).astype('float32')
        distances, indices = self.index.search(query_vec, k)
        
        print(f"\n🔍 Kết quả tìm kiếm cho: '{query}'")
        for i, idx in enumerate(indices[0]):
            print(f"\n[{i+1}] Khoảng cách: {distances[0][i]:.4f}")
            print(f"Nội dung: {self.documents[idx][:500]}...")

# --- THỰC THI ---
if __name__ == "__main__":
    rag = PlaywrightRAG()
    
    # Nếu chưa có index cục bộ thì mới đi crawl
    if not rag.load_local():
        rag.scrape_and_index()
    
    # Test thử một vài câu hỏi
    rag.search("How to click a button with playwright?")
    rag.search("wait for selector timeout")