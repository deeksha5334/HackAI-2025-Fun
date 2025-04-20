# main.py

"""
Main script for running the data processing pipeline.
This script orchestrates the entire data processing workflow.
"""

import argparse
import logging
import os
import sys
from typing import List, Optional

# Import local modules
from src.data_processing.pipeline import process_all_datasets, get_statistics
from src.data_processing.data_registry import list_available_datasets
from src.data_processing.extraction import create_directories
from src.data_processing.pdf_processor import process_and_chunk_pdfs
from src.data_processing.oncqa_processor import extract_oncqa_dataset, chunk_oncqa_data

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    handlers=[
                        logging.FileHandler("processing.log"),
                        logging.StreamHandler(sys.stdout)
                    ])
logger = logging.getLogger(__name__)

def setup_environment():
    """
    Set up the environment for data processing.
    """
    logger.info("Setting up environment...")
    
    # Create necessary directories
    create_directories()
    
    # Additional environment setup can be added here
    
    logger.info("Environment setup complete")

def process_data(datasets: Optional[List[str]] = None, 
                 pdf_dirs: Optional[List[str]] = None,
                 force_reprocess: bool = False):
    """
    Process all specified datasets and PDF directories.
    
    Args:
        datasets: List of datasets to process
        pdf_dirs: List of PDF directories to process
        force_reprocess: Whether to force reprocessing
    """
    logger.info("Starting data processing...")
    
    # Process datasets
    if datasets:
        logger.info(f"Processing datasets: {', '.join(datasets)}")
        results = process_all_datasets(datasets, force_reprocess)
        
        success_count = sum(1 for success in results.values() if success)
        logger.info(f"Successfully processed {success_count}/{len(results)} datasets")
    
    # Process PDF directories
    if pdf_dirs:
        for pdf_dir in pdf_dirs:
            if os.path.isdir(pdf_dir):
                logger.info(f"Processing PDFs in directory: {pdf_dir}")
                try:
                    chunks = process_and_chunk_pdfs(pdf_dir)
                    logger.info(f"Successfully processed {len(chunks)} chunks from PDFs in {pdf_dir}")
                except Exception as e:
                    logger.error(f"Error processing PDFs in {pdf_dir}: {e}")
            else:
                logger.error(f"PDF directory not found: {pdf_dir}")
    
    # Print statistics
    stats = get_statistics()
    logger.info(f"Total datasets: {stats['total_datasets']}")
    logger.info(f"Total chunks: {stats['total_chunks']}")
    
    logger.info("Data processing complete")

def process_oncqa():
    """
    Process the OncQA dataset specifically.
    """
    logger.info("Processing OncQA dataset...")
    
    # Extract the dataset
    output_path = extract_oncqa_dataset()
    if not output_path:
        logger.error("Failed to extract OncQA dataset")
        return
    
    # Chunk the dataset
    chunks = chunk_oncqa_data(output_path)
    logger.info(f"Successfully processed {len(chunks)} chunks from OncQA dataset")
    
    # Add to vector store
    # This would typically call your vector_store module
    # vector_store.store_vectors(chunks, "oncqa")
    
    logger.info("OncQA processing complete")

def main():
    parser = argparse.ArgumentParser(description="Data processing pipeline")
    parser.add_argument("--datasets", nargs="+", help="Datasets to process")
    parser.add_argument("--pdf-dirs", nargs="+", help="Directories containing PDF files")
    parser.add_argument("--oncqa", action="store_true", help="Process OncQA dataset")
    parser.add_argument("--force", action="store_true", help="Force reprocessing")
    parser.add_argument("--list", action="store_true", help="List available datasets")
    
    args = parser.parse_args()
    
    # Set up environment
    setup_environment()
    
    # List available datasets
    if args.list:
        datasets = list_available_datasets()
        print("Available datasets:")
        for name, desc in datasets.items():
            print(f"- {name}: {desc}")
        return
    
    # Process OncQA dataset
    if args.oncqa:
        process_oncqa()
    
    # Process other datasets and PDF directories
    process_data(args.datasets, args.pdf_dirs, args.force)

if __name__ == "__main__":
    main()