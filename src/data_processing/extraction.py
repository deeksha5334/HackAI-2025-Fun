# src/data_processing/extraction.py
import os
import requests
from bs4 import BeautifulSoup
from datasets import load_dataset
import json
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def create_directories():
    """Create necessary directories if they don't exist."""
    dirs = [
        "data/raw",
        "data/processed"
    ]
    for dir_path in dirs:
        os.makedirs(dir_path, exist_ok=True)
        logger.info(f"Created directory: {dir_path}")

def download_huggingface_dataset():
    """Download the breast cancer QA dataset from Hugging Face."""
    try:
        logger.info("Downloading dataset from Hugging Face...")
        dataset = load_dataset("grasool/breast-cancer-QAs-llama")
        
        # Convert to a serializable format (list of dictionaries)
        data_list = [{"text": item["text"]} for item in dataset["train"]]
        
        # Save as JSON for easier processing
        with open("data/raw/breast_cancer_qa.json", "w") as f:
            json.dump(data_list, f)
        
        logger.info("Successfully downloaded and saved Hugging Face dataset")
        return True
    except Exception as e:
        logger.error(f"Error downloading Hugging Face dataset: {str(e)}")
        return False

def scrape_breastcancernow_website():
    """Scrape content from the Breast Cancer Now website."""
    url = "https://breastcancernow.org/about-breast-cancer/diagnosis/questions-to-ask-about-your-breast-cancer"
    try:
        logger.info(f"Scraping content from {url}")
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, "html.parser")
        
        # Extract main content (adjust selectors based on actual website structure)
        main_content = soup.find("main") or soup.find("article") or soup.find("div", class_="content")
        
        if not main_content:
            logger.warning("Could not find main content on the page. Saving full HTML.")
            main_content = soup
        
        # Save raw HTML
        with open("data/raw/breastcancernow_content.html", "w", encoding="utf-8") as f:
            f.write(str(main_content))
        
        # Extract text and save
        text_content = main_content.get_text(separator="\n", strip=True)
        with open("data/raw/breastcancernow_content.txt", "w", encoding="utf-8") as f:
            f.write(text_content)
        
        logger.info("Successfully scraped and saved Breast Cancer Now website content")
        return True
    except Exception as e:
        logger.error(f"Error scraping Breast Cancer Now website: {str(e)}")
        return False

def extract_all_data():
    """Run all extraction functions."""
    create_directories()
    huggingface_success = download_huggingface_dataset()
    website_success = scrape_breastcancernow_website()
    
    if huggingface_success and website_success:
        logger.info("All data extraction completed successfully")
        return True
    else:
        logger.warning("Some extraction tasks failed. Check the logs for details.")
        return False

if __name__ == "__main__":
    extract_all_data()