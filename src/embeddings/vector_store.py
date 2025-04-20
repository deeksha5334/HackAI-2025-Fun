# src/embeddings/vector_store.py

import os
import json
import logging
import numpy as np
from typing import List, Dict, Any

# Configure logging
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Try to import sentence-transformer for embeddings
try:
    from sentence_transformers import SentenceTransformer
    HAVE_SENTENCE_TRANSFORMERS = True
except ImportError:
    logger.warning("sentence-transformers package not found. Please install with: pip install sentence-transformers")
    HAVE_SENTENCE_TRANSFORMERS = False

class VectorStore:
    """Class for managing vector embeddings of text chunks."""
    
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        """Initialize the vector store."""
        self.model_name = model_name
        self.vector_store_dir = "data/vector_store"
        self.processed_dir = "data/processed"
        self.vectors = {}  # Dictionary to store loaded vectors
        
        # Ensure directories exist
        os.makedirs(self.vector_store_dir, exist_ok=True)
        
        # Load the model if sentence-transformers is available
        if HAVE_SENTENCE_TRANSFORMERS:
            logger.info(f"Loading embedding model: {model_name}")
            self.model = SentenceTransformer(model_name)
        else:
            self.model = None
            logger.warning("No embedding model available. Vector store will not work properly.")
    
    def load_vector_store(self):
        """Load all available vector data."""
        # First check if we have vector files in the vector store directory
        vector_files = [f for f in os.listdir(self.vector_store_dir) if f.endswith("_vectors.json")]
        
        if vector_files:
            # Load from vector files
            for file in vector_files:
                dataset_name = file.replace("_vectors.json", "")
                self.vectors[dataset_name] = self.load_vectors(dataset_name)
                logger.info(f"Loaded vectors for {dataset_name} with {len(self.vectors[dataset_name])} items")
        else:
            # If no vector files, try to load from all_chunks.json
            all_chunks_path = os.path.join(self.processed_dir, "all_chunks.json")
            if os.path.exists(all_chunks_path):
                logger.info(f"Loading chunks from {all_chunks_path}")
                with open(all_chunks_path, "r") as f:
                    chunks = json.load(f)
                    
                # Process the chunks based on format (list or dict)
                if isinstance(chunks, list):
                    # Create embeddings for the list of chunks
                    texts = [chunk.get("text", "") for chunk in chunks if "text" in chunk]
                    if not texts:
                        # If no text field, try content field 
                        texts = [chunk.get("content", "") for chunk in chunks if "content" in chunk]
                    
                    if texts:
                        embeddings = self.create_embeddings(texts)
                        
                        # Add embeddings to chunks
                        for i, chunk in enumerate(chunks):
                            if i < len(embeddings):
                                chunk["embedding"] = embeddings[i].tolist() if isinstance(embeddings, np.ndarray) else None
                        
                        self.vectors["default"] = chunks
                        logger.info(f"Created and loaded embeddings for {len(texts)} chunks")
                elif isinstance(chunks, dict):
                    # Handle dictionary format
                    for dataset_name, dataset_info in chunks.items():
                        if dataset_name != "_chunks" and isinstance(dataset_info, dict):
                            # Skip metadata entries
                            continue
                            
                        # Process chunks in this dataset
                        dataset_chunks = chunks.get("_chunks", {}).get(dataset_name, [])
                        if dataset_chunks:
                            texts = [chunk.get("text", "") for chunk in dataset_chunks if "text" in chunk]
                            if texts:
                                embeddings = self.create_embeddings(texts)
                                
                                # Add embeddings to chunks
                                for i, chunk in enumerate(dataset_chunks):
                                    if i < len(embeddings):
                                        chunk["embedding"] = embeddings[i].tolist() if isinstance(embeddings, np.ndarray) else None
                                
                                self.vectors[dataset_name] = dataset_chunks
                                logger.info(f"Created and loaded embeddings for {len(texts)} chunks in {dataset_name}")
            else:
                logger.warning("No vectors or chunks found. Search will not work properly.")
    
    def create_embeddings(self, texts: List[str]) -> np.ndarray:
        """Create embeddings for a list of texts."""
        if not self.model:
            logger.error("No embedding model available.")
            # Return dummy embeddings for testing
            return np.zeros((len(texts), 384), dtype=np.float32)
        
        logger.info(f"Creating embeddings for {len(texts)} texts")
        return self.model.encode(texts)
    
    def load_vectors(self, dataset_name: str) -> List[Dict[str, Any]]:
        """Load vector embeddings for a dataset."""
        vector_path = os.path.join(self.vector_store_dir, f"{dataset_name}_vectors.json")
        
        if not os.path.exists(vector_path):
            logger.error(f"Vector store not found for dataset: {dataset_name}")
            return []
        
        logger.info(f"Loading vectors from {vector_path}")
        
        with open(vector_path, "r") as f:
            vector_data = json.load(f)
        
        # Convert embedding lists back to numpy arrays
        for item in vector_data:
            if item.get("embedding"):
                item["embedding"] = np.array(item["embedding"], dtype=np.float32)
        
        logger.info(f"Loaded {len(vector_data)} vectors")
        return vector_data
    
    def search(self, query: str, k: int = 3) -> List[Dict[str, Any]]:
        """Search for most similar chunks to a query."""
        if not self.model:
            logger.error("No embedding model available for search.")
            return []
        
        logger.info(f"Searching for: {query}")
        
        # Create query embedding
        query_embedding = self.model.encode(query)
        
        # Search across all datasets
        all_results = []
        
        for dataset_name, vectors in self.vectors.items():
            # Skip empty datasets
            if not vectors:
                continue
            
            # Calculate similarities
            for item in vectors:
                content = item.get("text", "") or item.get("content", "")
                if not content:
                    continue
                    
                embedding = item.get("embedding")
                if embedding is None:
                    # If no embedding, create one
                    embedding = self.model.encode(content)
                    item["embedding"] = embedding
                
                if isinstance(embedding, list):
                    embedding = np.array(embedding, dtype=np.float32)
                
                # Calculate cosine similarity
                similarity = np.dot(query_embedding, embedding) / (
                    np.linalg.norm(query_embedding) * np.linalg.norm(embedding)
                )
                
                result = {
                    "content": content,
                    "metadata": {k: v for k, v in item.items() if k not in ["text", "content", "embedding"]},
                    "source": item.get("source", dataset_name),
                    "source_type": item.get("source_type", "processed data"),
                    "score": 1.0 - similarity  # Convert to distance (lower is better)
                }
                all_results.append(result)
        
        # Sort all results by score (lower is better)
        all_results.sort(key=lambda x: x["score"])
        
        # Return top k results
        return all_results[:k]