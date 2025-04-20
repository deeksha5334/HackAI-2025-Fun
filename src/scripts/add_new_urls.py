# Create a new file: src/scripts/add_new_urls.py

import os
import sys
import logging
import json

# Add the parent directory to the path so we can import our modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from data_processing.extraction import scrape_additional_urls
from embeddings.vector_store import VectorStore

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def process_new_urls(urls):
    """Process new URLs and add them to the vector store.
    
    Args:
        urls: List of URLs to process
        
    Returns:
        Boolean indicating success
    """
    # Step 1: Scrape the new URLs
    logger.info(f"Scraping {len(urls)} new URLs")
    successful_urls = scrape_additional_urls(urls, output_prefix="new_source")
    
    if not successful_urls:
        logger.error("Failed to scrape any URLs")
        return False
    
    # Step 2: Load the vector store
    logger.info("Loading existing vector store")
    vector_store = VectorStore()
    vector_store.load_vector_store()
    
    # Step 3: Process the newly scraped text files
    new_chunks = []
    for i, url in enumerate(successful_urls):
        filename = f"new_source_{i}.txt"
        filepath = os.path.join("data/raw", filename)
        
        if not os.path.exists(filepath):
            logger.warning(f"File not found: {filepath}")
            continue
        
        # Read the text file
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Create a simple chunk
        chunk = {
            "text": content,
            "source": url,
            "source_type": "web"
        }
        new_chunks.append(chunk)
    
    # Step 4: Create embeddings for the new chunks
    if new_chunks:
        texts = [chunk["text"] for chunk in new_chunks]
        embeddings = vector_store.create_embeddings(texts)
        
        # Add embeddings to chunks
        for i, chunk in enumerate(new_chunks):
            if i < len(embeddings):
                chunk["embedding"] = embeddings[i].tolist()
        
        # Step 5: Append new chunks to vector store
        dataset_name = "new_data"
        vector_store.vectors[dataset_name] = new_chunks
        
        # Save the updated vectors
        vector_path = os.path.join(vector_store.vector_store_dir, f"{dataset_name}_vectors.json")
        with open(vector_path, "w") as f:
            json.dump(new_chunks, f)
        
        logger.info(f"Added {len(new_chunks)} new chunks to vector store")
        return True
    else:
        logger.error("No chunks were created")
        return False

if __name__ == "__main__":
    # Get URLs from command-line arguments or use default ones
    urls = sys.argv[1:] if len(sys.argv) > 1 else [
        "https://breastcancernow.org/about-breast-cancer/life-after-treatment",
        "https://www.nationalbreastcancer.org/breast-cancer-nutrition/"
    ]
    
    process_new_urls(urls)