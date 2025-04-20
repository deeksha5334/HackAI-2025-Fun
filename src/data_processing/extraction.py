# src/data_processing/extraction.py
import os
import requests
from bs4 import BeautifulSoup
from datasets import load_dataset
import json
import logging


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

def download_huggingface_dataset(dataset_name="grassol/breast-cancer-QAs-llama", output_name=None):
    """
    Download and process a dataset from Hugging Face.
    
    Args:
        dataset_name: Name/path of the dataset on Hugging Face
        output_name: Name for the output file (defaults to dataset name)
        
    Returns:
        Path to the saved JSON file or None if failed
    """
    if output_name is None:
        output_name = dataset_name.split('/')[-1].replace('-', '_').lower()
    
    try:
        logger.info(f"Downloading dataset '{dataset_name}' from Hugging Face...")
        dataset = load_dataset(dataset_name, split="train")
        
        
        if dataset_name == "shanchen/OncQA":
            
            data_list = []
            for i, item in enumerate(dataset):
                if "question" in item and "response" in item:
                    data_list.append({
                        "text": f"Question: {item['question']}\nAnswer: {item['response']}",
                        "source": f"{output_name}_{i}",
                        "question": item["question"],
                        "response": item["response"]
                    })
        else:
           
            data_list = [{"text": item["text"], "source": f"{output_name}_{i}"} 
                         for i, item in enumerate(dataset) if "text" in item]
        
        
        output_path = f"data/raw/{output_name}.json"
        with open(output_path, "w") as f:
            json.dump(data_list, f)
            
        logger.info(f"Successfully downloaded and saved {len(data_list)} items from {dataset_name}")
        return output_path
    except Exception as e:
        logger.error(f"Error downloading Hugging Face dataset: {e}")
        return None

def scrape_breastcancernow_website():
    """Scrape content from the Breast Cancer Now website."""
    url = "https://breastcancernow.org/about-breast-cancer/diagnosis/questions-to-ask-about-your-breast-cancer"
    try:
        logger.info(f"Scraping content from {url}")
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, "html.parser")
        
        
        main_content = soup.find("main") or soup.find("article") or soup.find("div", class_="content")
        
        if not main_content:
            logger.warning("Could not find main content on the page. Saving full HTML.")
            main_content = soup
        
        
        with open("data/raw/breastcancernow_content.html", "w", encoding="utf-8") as f:
            f.write(str(main_content))
        
        
        text_content = main_content.get_text(separator="\n", strip=True)
        with open("data/raw/breastcancernow_content.txt", "w", encoding="utf-8") as f:
            f.write(text_content)
        
        logger.info("Successfully scraped and saved Breast Cancer Now website content")
        return True
    except Exception as e:
        logger.error(f"Error scraping Breast Cancer Now website: {str(e)}")
        return False


def scrape_additional_urls(urls, output_prefix="custom"):
    """Scrape content from additional URLs and add to knowledge base.
    
    Args:
        urls: List of URLs to scrape
        output_prefix: Prefix for output filenames
    
    Returns:
        List of successful URLs
    """
    successful_urls = []
    
    for i, url in enumerate(urls):
        try:
            logger.info(f"Scraping content from {url}")
            response = requests.get(url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, "html.parser")
            
            
            main_content = soup.find("main") or soup.find("article") or soup.find("div", class_="content")
            
            if not main_content:
                logger.warning(f"Could not find main content on {url}. Saving full HTML.")
                main_content = soup
            
        
            filename = f"{output_prefix}_{i}"
            
            
            with open(f"data/raw/{filename}.html", "w", encoding="utf-8") as f:
                f.write(str(main_content))
            
            
            text_content = main_content.get_text(separator="\n", strip=True)
            with open(f"data/raw/{filename}.txt", "w", encoding="utf-8") as f:
                f.write(text_content)
            
            successful_urls.append(url)
            logger.info(f"Successfully scraped and saved content from {url}")
        except Exception as e:
            logger.error(f"Error scraping {url}: {str(e)}")
    
    return successful_urls



def extract_all_data(additional_urls=None):
    """Run all extraction functions.
    
    Args:
        additional_urls: Optional list of additional URLs to scrape
        
    Returns:
        Boolean indicating success
    """
    create_directories()
    huggingface_success = download_huggingface_dataset()
    website_success = scrape_breastcancernow_website()
    
    additional_success = True
    if additional_urls:
        logger.info(f"Scraping {len(additional_urls)} additional URLs")
        successful_urls = scrape_additional_urls(additional_urls)
        additional_success = len(successful_urls) == len(additional_urls)
        
        if successful_urls:
            logger.info(f"Successfully scraped {len(successful_urls)} additional URLs")
        if len(successful_urls) < len(additional_urls):
            logger.warning(f"Failed to scrape {len(additional_urls) - len(successful_urls)} URLs")
    
    if huggingface_success and website_success and additional_success:
        logger.info("All data extraction completed successfully")
        return True
    else:
        logger.warning("Some extraction tasks failed. Check the logs for details.")
        return False
if __name__ == "__main__":
    extract_all_data()