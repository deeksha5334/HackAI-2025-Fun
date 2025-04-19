# src/data_processing/chunking.py
import json
import logging
from pathlib import Path
import re

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def chunk_text(text, chunk_size=1000, overlap=200):
    """Split text into overlapping chunks of approximately chunk_size characters."""
    if not text:
        return []
    
    # Use sentence boundaries for more natural chunks
    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks = []
    current_chunk = []
    current_size = 0
    
    for sentence in sentences:
        sentence_len = len(sentence)
        
        # If adding this sentence would exceed chunk_size and we already have content,
        # finalize the current chunk and start a new one
        if current_size + sentence_len > chunk_size and current_chunk:
            chunks.append(' '.join(current_chunk))
            
            # Keep some sentences for overlap
            overlap_size = 0
            overlap_chunk = []
            
            # Work backwards through current_chunk to create overlap
            for s in reversed(current_chunk):
                if overlap_size + len(s) <= overlap:
                    overlap_chunk.insert(0, s)
                    overlap_size += len(s) + 1  # +1 for space
                else:
                    break
            
            current_chunk = overlap_chunk
            current_size = overlap_size
        
        current_chunk.append(sentence)
        current_size += sentence_len + 1  # +1 for space
    
    # Add the last chunk if it's not empty
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    
    return chunks

def chunk_huggingface_data():
    """Process Hugging Face data (already in appropriate chunks)."""
    try:
        file_path = "data/processed/huggingface_data.json"
        
        if not Path(file_path).exists():
            logger.error(f"File not found: {file_path}")
            return False
        
        logger.info(f"Processing Hugging Face data from {file_path}")
        
        with open(file_path, "r") as f:
            data = json.load(f)
        
        # For Hugging Face data, each Q&A pair is already a good chunk size
        # Just save with proper metadata
        chunked_data = []
        
        for i, item in enumerate(data):
            chunked_data.append({
                "chunk_id": f"hf_{i}",
                "content": item["content"],
                "source": item["source"],
                "metadata": {
                    "source_type": "huggingface_dataset",
                    "index": i
                }
            })
        
        # Save chunked data
        with open("data/processed/chunked_huggingface_data.json", "w") as f:
            json.dump(chunked_data, f, indent=2)
        
        logger.info(f"Successfully chunked Hugging Face data into {len(chunked_data)} chunks")
        return True
    except Exception as e:
        logger.error(f"Error chunking Hugging Face data: {str(e)}")
        return False

def chunk_website_content():
    """Chunk the website content into smaller pieces."""
    try:
        file_path = "data/processed/website_content.txt"
        
        if not Path(file_path).exists():
            logger.error(f"File not found: {file_path}")
            return False
        
        logger.info(f"Chunking website content from {file_path}")
        
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Split into sections first by headers if possible
        sections = re.split(r'\n(?=[A-Z][^a-z]*:)', content)
        
        chunked_data = []
        chunk_id = 0
        
        for section in sections:
            # Further chunk each section
            chunks = chunk_text(section, chunk_size=1000, overlap=200)
            
            for chunk in chunks:
                chunk_id += 1
                chunked_data.append({
                    "chunk_id": f"web_{chunk_id}",
                    "content": chunk,
                    "source": "breastcancernow_website",
                    "metadata": {
                        "source_type": "website",
                        "index": chunk_id
                    }
                })
        
        # Save chunked data
        with open("data/processed/chunked_website_data.json", "w") as f:
            json.dump(chunked_data, f, indent=2)
        
        logger.info(f"Successfully chunked website content into {len(chunked_data)} chunks")
        return True
    except Exception as e:
        logger.error(f"Error chunking website content: {str(e)}")
        return False

def combine_all_chunks():
    """Combine all chunked data into a single file."""
    try:
        logger.info("Combining all chunked data")
        
        all_chunks = []
        
        # Load Hugging Face chunks
        hf_path = "data/processed/chunked_huggingface_data.json"
        if Path(hf_path).exists():
            with open(hf_path, "r") as f:
                hf_chunks = json.load(f)
                all_chunks.extend(hf_chunks)
        
        # Load website chunks
        web_path = "data/processed/chunked_website_data.json"
        if Path(web_path).exists():
            with open(web_path, "r") as f:
                web_chunks = json.load(f)
                all_chunks.extend(web_chunks)
        
        # Save combined data
        with open("data/processed/all_chunks.json", "w") as f:
            json.dump(all_chunks, f, indent=2)
        
        logger.info(f"Successfully combined all chunks. Total: {len(all_chunks)}")
        return True
    except Exception as e:
        logger.error(f"Error combining chunks: {str(e)}")
        return False

def chunk_all_data():
    """Run all chunking functions."""
    huggingface_success = chunk_huggingface_data()
    website_success = chunk_website_content()
    
    if huggingface_success or website_success:
        combine_success = combine_all_chunks()
        
        if combine_success:
            logger.info("All data chunking and combining completed successfully")
            return True
        else:
            logger.warning("Failed to combine chunks")
            return False
    else:
        logger.warning("All chunking tasks failed. Check the logs for details.")
        return False

if __name__ == "__main__":
    chunk_all_data()