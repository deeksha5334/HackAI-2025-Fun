# Create a new file called fix_errors.py in your project root
import os
import json
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def create_directories():
    """Create all necessary directories."""
    dirs = [
        "data/raw",
        "data/processed",
        "data/vector_store"
    ]
    for dir_path in dirs:
        os.makedirs(dir_path, exist_ok=True)
        logger.info(f"Created directory: {dir_path}")

def check_and_create_files():
    """Check if crucial files exist, create placeholders if not."""
    # Check for website content
    website_content_path = "data/raw/breastcancernow_content.txt"
    if not os.path.exists(website_content_path):
        logger.warning(f"File not found: {website_content_path}, creating placeholder")
        with open(website_content_path, "w", encoding="utf-8") as f:
            f.write("Placeholder for breast cancer website content. Please run extraction first.")
    
    # Check for Hugging Face data
    hf_data_path = "data/raw/breast_cancer_qa.json"
    if not os.path.exists(hf_data_path):
        logger.warning(f"File not found: {hf_data_path}, creating placeholder")
        with open(hf_data_path, "w") as f:
            json.dump([{"text": "Placeholder data. Please run extraction first."}], f)
    
    # Create processed data placeholders if needed
    processed_hf_path = "data/processed/huggingface_data.json"
    if not os.path.exists(processed_hf_path):
        logger.warning(f"File not found: {processed_hf_path}, creating placeholder")
        with open(processed_hf_path, "w") as f:
            json.dump([{"content": "Placeholder data.", "source": "huggingface_breast_cancer_qa"}], f)
    
    processed_web_path = "data/processed/website_content.txt"
    if not os.path.exists(processed_web_path):
        logger.warning(f"File not found: {processed_web_path}, creating placeholder")
        with open(processed_web_path, "w", encoding="utf-8") as f:
            f.write("Placeholder for processed website content.")
    
    # Create chunked data placeholders if needed
    chunked_hf_path = "data/processed/chunked_huggingface_data.json"
    if not os.path.exists(chunked_hf_path):
        logger.warning(f"File not found: {chunked_hf_path}, creating placeholder")
        with open(chunked_hf_path, "w") as f:
            json.dump([{
                "chunk_id": "hf_0",
                "content": "Placeholder chunked data.",
                "source": "huggingface_breast_cancer_qa",
                "metadata": {
                    "source_type": "huggingface_dataset",
                    "index": 0
                }
            }], f)
    
    chunked_web_path = "data/processed/chunked_website_data.json"
    if not os.path.exists(chunked_web_path):
        logger.warning(f"File not found: {chunked_web_path}, creating placeholder")
        with open(chunked_web_path, "w") as f:
            json.dump([{
                "chunk_id": "web_0",
                "content": "Placeholder chunked website data.",
                "source": "breastcancernow_website",
                "metadata": {
                    "source_type": "website",
                    "index": 0
                }
            }], f)
    
    all_chunks_path = "data/processed/all_chunks.json"
    if not os.path.exists(all_chunks_path):
        logger.warning(f"File not found: {all_chunks_path}, creating placeholder")
        # Combine the placeholder chunked data
        placeholder_chunks = []
        if os.path.exists(chunked_hf_path):
            with open(chunked_hf_path, "r") as f:
                placeholder_chunks.extend(json.load(f))
        if os.path.exists(chunked_web_path):
            with open(chunked_web_path, "r") as f:
                placeholder_chunks.extend(json.load(f))
        
        # If no chunks were loaded, add a placeholder
        if not placeholder_chunks:
            placeholder_chunks = [{
                "chunk_id": "placeholder_0",
                "content": "Placeholder data for testing.",
                "source": "placeholder",
                "metadata": {
                    "source_type": "placeholder",
                    "index": 0
                }
            }]
        
        with open(all_chunks_path, "w") as f:
            json.dump(placeholder_chunks, f, indent=2)

if __name__ == "__main__":
    logger.info("Starting error fix script")
    create_directories()
    check_and_create_files()
    logger.info("Error fix script completed")