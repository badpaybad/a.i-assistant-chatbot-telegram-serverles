
import faiss
import numpy as np

def debug_delete_logic():
    dimension = 3072
    index = faiss.IndexFlatL2(dimension)
    
    # Add some dummy vectors
    vectors = np.random.random((5, dimension)).astype('float32')
    index.add(vectors)
    print(f"Index ntotal: {index.ntotal}")
    
    # Indices to keep
    indices_to_keep = [0, 2, 4]
    
    print(f"Rebuilding index with indices: {indices_to_keep}")
    new_index = faiss.IndexFlatL2(dimension)
    
    current_vectors = []
    for idx in indices_to_keep:
        try:
            # This is line 125 in dbvectorconnect.py
            vec = index.reconstruct(idx)
            current_vectors.append(vec)
        except AttributeError as e:
            print(f"Error at reconstruct({idx}): {e}")
            return
            
    # This is line 128
    embeddings = np.array(current_vectors).astype('float32')
    print(f"Embeddings shape: {embeddings.shape}")
    
    # This is line 129 - where the IDE reports error
    print("Adding to new index...")
    new_index.add(embeddings)
    print(f"New index ntotal: {new_index.ntotal}")

if __name__ == "__main__":
    debug_delete_logic()
