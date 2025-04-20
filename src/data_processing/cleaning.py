# src/data_processing/cleaning.py
import re
import json
import logging
from pathlib import Path


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def clean_text(text):
    """Basic text cleaning function."""
    # Remove multiple newlines
    text = re.sub(r'\n+', '\n', text)
    # Remove multiple spaces
    text = re.sub(r'\s+', ' ', text)
    # Remove special characters that might not be useful - FIXED regex
    text = re.sub(r'[^\w\s.,?!:;\'\"-]', ' ', text)
    # Standardize quotes
    text = re.sub(r'[""]', '"', text)
    # Standardize apostrophes
    text = re.sub(r'['']', "'", text)
    # Standardize whitespace
    text = text.strip()
    
    return text

def process_huggingface_dataset():
    """Clean and process the Hugging Face dataset."""
    try:
        file_path = "data/raw/breast_cancer_qa.json"
        
        if not Path(file_path).exists():
            logger.error(f"File not found: {file_path}")
            return False
        
        logger.info(f"Processing Hugging Face dataset from {file_path}")
        
        with open(file_path, "r") as f:
            data = json.load(f)
        
        processed_data = []
        
        for item in data:
            # Extract question and answer
            if isinstance(item, dict) and "text" in item:
                text = item["text"]
                
                # Clean the text
                cleaned_text = clean_text(text)
                
                # Add to processed data
                processed_data.append({
                    "content": cleaned_text,
                    "source": "huggingface_breast_cancer_qa"
                })
        
        # Save processed data
        with open("data/processed/huggingface_data.json", "w") as f:
            json.dump(processed_data, f, indent=2)
        
        logger.info(f"Successfully processed Hugging Face dataset. Processed {len(processed_data)} items.")
        return True
    except Exception as e:
        logger.error(f"Error processing Hugging Face dataset: {str(e)}")
        return False

def process_website_content():
    """Clean and process the scraped website content."""
    try:
        file_path = "data/raw/breastcancernow_content.txt"
        
        if not Path(file_path).exists():
            logger.error(f"File not found: {file_path}")
            return False
        
        logger.info(f"Processing website content from {file_path}")
        
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Clean the content
        cleaned_content = clean_text(content)
        
        # Remove any navigation elements, footers
        lines = cleaned_content.split('\n')
        filtered_lines = []
        
        for line in lines:
            # Skip very short lines and common navigation text
            if len(line.strip()) < 3:
                continue
            if any(nav in line.lower() for nav in ["home", "contact us", "about us", "cookie", "privacy policy"]):
                continue
            filtered_lines.append(line)
        
        cleaned_content = '\n'.join(filtered_lines)
        
        # Save as a single document
        with open("data/processed/website_content.txt", "w", encoding="utf-8") as f:
            f.write(cleaned_content)
        
        logger.info("Successfully processed website content")
        return True
    except Exception as e:
        logger.error(f"Error processing website content: {str(e)}")
        return False

def clean_all_data():
    """Run all cleaning functions."""
    huggingface_success = process_huggingface_dataset()
    website_success = process_website_content()
    
    if huggingface_success and website_success:
        logger.info("All data cleaning completed successfully")
        return True
    else:
        logger.warning("Some cleaning tasks failed. Check the logs for details.")
        return False

if __name__ == "__main__":
    clean_all_data()

