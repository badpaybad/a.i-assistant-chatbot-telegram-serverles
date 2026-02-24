import os
import pickle
import numpy as np
import faiss
from google import genai
from config import GEMINI_APIKEY

class LocalVectorDB:
    def __init__(self, db_name):
        self.db_name = db_name
        self.db_path = f"data/vector_db/{db_name}"
        self.index_file = f"{self.db_path}/index.faiss"
        self.metadata_file = f"{self.db_path}/metadata.pkl"
        self.client = genai.Client(api_key=GEMINI_APIKEY)
        self.embedding_model = "models/gemini-embedding-001"
        self.dimension = 3072  # Dimension for gemini-embedding-001
        
        if not os.path.exists("data"):
            os.makedirs("data")
        if not os.path.exists("data/vector_db"):
            os.makedirs("data/vector_db")
        if not os.path.exists(self.db_path):
            os.makedirs(self.db_path)
            
        if os.path.exists(self.index_file):
            self.index = faiss.read_index(self.index_file)
            with open(self.metadata_file, "rb") as f:
                self.metadata = pickle.load(f)
        else:
            self.index = faiss.IndexFlatL2(self.dimension)
            self.metadata = []

    def get_embedding(self, text):
        print(f"DEBUG: Getting embedding for: {text[:50]}...")
        response = self.client.models.embed_content(
            model=self.embedding_model,
            contents=[text]
        )
        print("DEBUG: Embedding received.")
        return np.array(response.embeddings[0].values).astype('float32')

    def add_text(self, text, extra_metadata=None):
        if not text.strip():
            return
        
        embedding = self.get_embedding(text)
        embedding = np.expand_dims(embedding, axis=0)
        
        self.index.add(embedding)
        self.metadata.append({
            "text": text,
            "extra": extra_metadata or {}
        })
        self._save()

    def add_texts(self, texts, extra_metadatas=None):
        if not texts:
            return
        
        print(f"DEBUG: Batch embedding {len(texts)} texts...")
        # Batch embedding for efficiency
        response = self.client.models.embed_content(
            model=self.embedding_model,
            contents=texts
        )
        print("DEBUG: Batch embeddings received.")
        embeddings = np.array([e.values for e in response.embeddings]).astype('float32')
        
        self.index.add(embeddings)
        for i, text in enumerate(texts):
            meta = {}
            if extra_metadatas and i < len(extra_metadatas):
                meta = extra_metadatas[i]
            self.metadata.append({
                "text": text,
                "extra": meta
            })
        self._save()

    def search(self, query, top_k=5):
        if self.index.ntotal == 0:
            return []
            
        query_embedding = self.get_embedding(query)
        query_embedding = np.expand_dims(query_embedding, axis=0)
        
        distances, indices = self.index.search(query_embedding, top_k)
        
        results = []
        for i, idx in enumerate(indices[0]):
            if idx != -1 and idx < len(self.metadata):
                results.append({
                    "text": self.metadata[idx]["text"],
                    "metadata": self.metadata[idx]["extra"],
                    "distance": float(distances[0][i])
                })
        return results

    def delete_texts(self, texts_to_delete):
        if not texts_to_delete:
            return
        
        if isinstance(texts_to_delete, str):
            texts_to_delete = [texts_to_delete]
            
        print(f"DEBUG: Deleting {len(texts_to_delete)} texts...")
        
        # Filter metadata and keep only non-matching entries
        new_metadata = []
        indices_to_keep = []
        
        for i, meta in enumerate(self.metadata):
            if meta["text"] not in texts_to_delete:
                new_metadata.append(meta)
                indices_to_keep.append(i)
        
        if len(new_metadata) == len(self.metadata):
            print("DEBUG: No matching texts found for deletion.")
            return

        if new_metadata:
            # Rebuild index with remaining vectors
            print(f"DEBUG: Rebuilding index with {len(new_metadata)} entries...")
            
            # Extract current vectors from existing index
            current_vectors = []
            for idx in indices_to_keep:
                vec = self.index.reconstruct(idx)
                current_vectors.append(vec)
            
            # Ensure the array is float32 and contiguous for FAISS
            embeddings = np.array(current_vectors).astype('float32')
            embeddings = np.ascontiguousarray(embeddings)
            
            new_index = faiss.IndexFlatL2(self.dimension)
            new_index.add(embeddings)
            self.index = new_index
        else:
            # If nothing left, just reset to empty index
            self.index = faiss.IndexFlatL2(self.dimension)
            
        self.metadata = new_metadata
        self._save()
        print("DEBUG: Deletion complete.")

    def _save(self):
        print(f"DEBUG: Saving index to {self.index_file}...")
        faiss.write_index(self.index, self.index_file)
        print(f"DEBUG: Saving metadata to {self.metadata_file}...")
        with open(self.metadata_file, "wb") as f:
            pickle.dump(self.metadata, f)
        print("DEBUG: Save complete.")

    @staticmethod
    def chunk_text(text, chunk_size=1000, overlap=200):
        chunks = []
        start = 0
        while start < len(text):
            end = start + chunk_size
            chunks.append(text[start:end])
            start += chunk_size - overlap
        return chunks
