# src/embeddings/vector_store.py
import json
import logging
from pathlib import Path
import os
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class VectorStore:
    def __init__(self, model_name="all-MiniLM-L6-v2"):
        """Initialize the vector store with a free SentenceTransformer model."""
        self.model_name = model_name
        self.model = None
        self.faiss_index = None
        self.documents = []
        
        # Directory for saving the vector store
        self.save_dir = "data/vector_store"
        os.makedirs(self.save_dir, exist_ok=True)
    
    def load_model(self):
        """Load the embedding model."""
        try:
            logger.info(f"Loading embedding model: {self.model_name}")
            self.model = SentenceTransformer(self.model_name)
            logger.info("Embedding model loaded successfully")
            return True
        except Exception as e:
            logger.error(f"Error loading embedding model: {str(e)}")
            return False
    
    def load_documents(self, file_path="data/processed/all_chunks.json"):
        """Load documents from the processed chunks file."""
        try:
            logger.info(f"Loading documents from {file_path}")
            
            if not Path(file_path).exists():
                logger.error(f"File not found: {file_path}")
                return False
            
            with open(file_path, "r") as f:
                self.documents = json.load(f)
            
            logger.info(f"Loaded {len(self.documents)} documents")
            return True
        except Exception as e:
            logger.error(f"Error loading documents: {str(e)}")
            return False
    
    def create_embeddings(self):
        """Create embeddings for all documents using SentenceTransformer."""
        if not self.model:
            success = self.load_model()
            if not success:
                return False
        
        if not self.documents:
            success = self.load_documents()
            if not success:
                return False
        
        try:
            logger.info("Creating embeddings for documents")
            
            # Extract text content from documents
            texts = [doc["content"] for doc in self.documents]
            
            # Generate embeddings
            embeddings = self.model.encode(texts, show_progress_bar=True)
            
            # Save embeddings
            embeddings_file = os.path.join(self.save_dir, "embeddings.npy")
            np.save(embeddings_file, embeddings)
            
            # Save documents with their IDs
            documents_file = os.path.join(self.save_dir, "documents.json")
            with open(documents_file, "w") as f:
                json.dump(self.documents, f, indent=2)
            
            logger.info(f"Created and saved embeddings for {len(texts)} documents")
            
            # Create FAISS index
            self.create_faiss_index(embeddings)
            
            return True
        except Exception as e:
            logger.error(f"Error creating embeddings: {str(e)}")
            return False
    
    def create_faiss_index(self, embeddings):
        """Create a FAISS index from the embeddings."""
        try:
            logger.info("Creating FAISS index")
            
            # Get dimensionality of embeddings
            dimension = embeddings.shape[1]
            
            # Create FAISS index
            self.faiss_index = faiss.IndexFlatL2(dimension)
            self.faiss_index.add(embeddings)
            
            # Save FAISS index
            index_file = os.path.join(self.save_dir, "faiss_index.bin")
            faiss.write_index(self.faiss_index, index_file)
            
            logger.info("FAISS index created and saved successfully")
            return True
        except Exception as e:
            logger.error(f"Error creating FAISS index: {str(e)}")
            return False
    
    def load_vector_store(self):
        """Load the vector store from files."""
        try:
            logger.info("Loading vector store from files")
            
            # Load embedding model
            success = self.load_model()
            if not success:
                return False
            
            # Load documents
            documents_file = os.path.join(self.save_dir, "documents.json")
            if not Path(documents_file).exists():
                logger.error(f"Documents file not found: {documents_file}")
                return False
            
            with open(documents_file, "r") as f:
                self.documents = json.load(f)
            
            # Load FAISS index
            index_file = os.path.join(self.save_dir, "faiss_index.bin")
            if not Path(index_file).exists():
                logger.error(f"FAISS index file not found: {index_file}")
                return False
            
            self.faiss_index = faiss.read_index(index_file)
            
            logger.info(f"Vector store loaded successfully with {len(self.documents)} documents")
            return True
        except Exception as e:
            logger.error(f"Error loading vector store: {str(e)}")
            return False
    
    def search(self, query, k=5):
        """Search for the top k most similar documents to the query."""
        if not self.model or not self.faiss_index:
            success = self.load_vector_store()
            if not success:
                return []
        
        try:
            logger.info(f"Searching for: {query}")
            
            # Generate embedding for the query
            query_embedding = self.model.encode([query])[0].reshape(1, -1)
            
            # Search FAISS index
            distances, indices = self.faiss_index.search(query_embedding, k)
            
            # Get the corresponding documents
            results = []
            for i, idx in enumerate(indices[0]):
                if idx < len(self.documents):
                    doc = self.documents[idx]
                    results.append({
                        "content": doc["content"],
                        "source": doc["source"],
                        "metadata": doc["metadata"],
                        "score": float(distances[0][i])
                    })
            
            logger.info(f"Found {len(results)} results")
            return results
        except Exception as e:
            logger.error(f"Error searching vector store: {str(e)}")
            return []

def process_and_index_data():
    """Main function to process and index all data."""
    try:
        logger.info("Starting data processing and indexing")
        
        # Create vector store
        vector_store = VectorStore()
        
        # Load documents
        success = vector_store.load_documents()
        if not success:
            logger.error("Failed to load documents")
            return False
        
        # Create embeddings and index
        success = vector_store.create_embeddings()
        if not success:
            logger.error("Failed to create embeddings")
            return False
        
        logger.info("Data processing and indexing completed successfully")
        return True
    except Exception as e:
        logger.error(f"Error in data processing and indexing: {str(e)}")
        return False

if __name__ == "__main__":
    process_and_index_data()