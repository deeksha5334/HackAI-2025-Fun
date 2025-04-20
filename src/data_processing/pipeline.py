# src/data_processing/pipeline.py

"""
Main pipeline for processing datasets through the entire extraction, cleaning, chunking, 
and vector storage pipeline.
"""

import os
import json
import logging
from typing import List, Dict, Union, Optional

# Import from local modules
from . import extraction
from . import cleaning
from . import chunking
# from . import vector_store
from .data_registry import get_dataset_info, list_available_datasets


# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def load_all_chunks():
    """
    Load all existing chunks from the all_chunks.json file.
    
    Returns:
        Dictionary containing all processed chunks
    """
    all_chunks_path = "data/processed/all_chunks.json"
    if os.path.exists(all_chunks_path):
        with open(all_chunks_path, "r") as f:
            return json.load(f)
    return {}

def save_all_chunks(chunks):
    """
    Save all chunks to the all_chunks.json file.
    
    Args:
        chunks: Dictionary of all processed chunks
    """
    all_chunks_path = "data/processed/all_chunks.json"
    os.makedirs(os.path.dirname(all_chunks_path), exist_ok=True)
    with open(all_chunks_path, "w") as f:
        json.dump(chunks, f, indent=2)
    logger.info(f"Saved all chunks to {all_chunks_path}")

def add_to_existing_chunks(new_chunks, dataset_name):
    """
    Add new chunks to existing all_chunks.json file.
    
    Args:
        new_chunks: List of dictionaries containing new chunks
        dataset_name: Name of the dataset to add
        
    Returns:
        Path to the updated chunks file
    """
    # Load existing chunks
    existing_chunks = load_all_chunks()
    
    # Add new chunks
    if isinstance(existing_chunks, list):
        # If it's a list, append all items
        for chunk in new_chunks:
            # Add dataset name to the chunk metadata if not already present
            if 'metadata' not in chunk:
                chunk['metadata'] = {}
            chunk['metadata']['dataset'] = dataset_name
            existing_chunks.append(chunk)
    else:
        # If it's a dictionary, add as a new key
        # This may need adjustment based on your exact data structure
        existing_chunks[dataset_name] = new_chunks
    
    # Save updated chunks
    all_chunks_path = "data/processed/all_chunks.json"
    with open(all_chunks_path, "w") as f:
        json.dump(existing_chunks, f, indent=2)
    
    logger.info(f"Saved all chunks to {all_chunks_path}")
    return all_chunks_path
def process_dataset(dataset_name: str, force_reprocess: bool = False):
    """
    Process a single dataset through the extraction, cleaning, chunking, and vector storage pipeline.
    
    Args:
        dataset_name: Name of the dataset to process
        force_reprocess: Whether to reprocess even if already processed
        
    Returns:
        Boolean indicating success or failure
    """
    # Get dataset information
    dataset_info = get_dataset_info(dataset_name)
    if not dataset_info:
        logger.error(f"Dataset {dataset_name} not found in registry")
        return False
    
    # Check if already processed
    all_chunks = load_all_chunks()
    if dataset_name in all_chunks and not force_reprocess:
        logger.info(f"Dataset {dataset_name} already processed, skipping")
        return True
    
    try:
        # Extract the dataset
        if dataset_info["source"] == "huggingface":
            raw_path = extraction.process_dataset(dataset_name)
        elif dataset_info["source"] == "local" and dataset_info["id"] == "pdfs":
            # For PDF processing, we need to specify the directory
            pdf_dir = input("Enter the path to the PDF directory: ")
            raw_path = extraction.process_dataset(pdf_dir=pdf_dir)
        else:
            logger.error(f"Unsupported dataset source: {dataset_info['source']}")
            return False
        
        if not raw_path or not os.path.exists(raw_path):
            logger.error(f"Failed to extract dataset {dataset_name}")
            return False
        
        # Clean the dataset
        cleaned_data = cleaning.clean_dataset(raw_path)
        
        # Chunk the dataset
        chunks = chunking.create_chunks(cleaned_data)
        
        # Store in vector store
        vector_store.store_vectors(chunks, dataset_name)
        
        # Update all_chunks with new data
        all_chunks[dataset_name] = {
            "source": dataset_info["source"],
            "chunk_count": len(chunks),
            "processed": True,
            "metadata": {
                "description": dataset_info["description"],
                "id": dataset_info["id"]
            }
        }
        
        # Save the updated all_chunks
        save_all_chunks(all_chunks)
        
        logger.info(f"Successfully processed dataset {dataset_name}")
        return True
        
    except Exception as e:
        logger.error(f"Error processing dataset {dataset_name}: {e}")
        return False

def process_all_datasets(datasets: Optional[List[str]] = None, force_reprocess: bool = False):
    """
    Process multiple datasets through the entire pipeline.
    
    Args:
        datasets: List of dataset names to process (None = all available)
        force_reprocess: Whether to reprocess datasets even if already processed
        
    Returns:
        Dictionary of results for each dataset
    """
    # Create necessary directories
    extraction.create_directories()
    
    # Determine which datasets to process
    available_datasets = list_available_datasets()
    if datasets is None:
        datasets = list(available_datasets.keys())
    
    results = {}
    
    # Process each dataset
    for dataset_name in datasets:
        if dataset_name not in available_datasets:
            logger.warning(f"Dataset {dataset_name} not found, skipping")
            results[dataset_name] = False
            continue
        
        # Process the dataset
        success = process_dataset(dataset_name, force_reprocess)
        results[dataset_name] = success
    
    # Return results
    return results

def get_statistics():
    """
    Get statistics about all processed datasets.
    
    Returns:
        Dictionary of statistics
    """
    all_chunks = load_all_chunks()
    
    # Check if all_chunks is a dictionary or a list
    if isinstance(all_chunks, dict):
        # For dictionary format
        stats = {
            "total_datasets": len(all_chunks),
            "total_chunks": sum(dataset.get("chunk_count", 0) for dataset in all_chunks.values() if isinstance(dataset, dict)),
            "datasets": all_chunks
        }
    else:
        # For list format or other unexpected formats
        stats = {
            "total_datasets": 1,  # Assuming it's one dataset
            "total_chunks": len(all_chunks) if isinstance(all_chunks, list) else 0,
            "datasets": {"unknown": {"chunk_count": len(all_chunks) if isinstance(all_chunks, list) else 0, "source": "unknown"}}
        }
    
    return stats

def load_all_chunks():
    """
    Load all existing chunks from the all_chunks.json file.
    
    Returns:
        Dictionary containing all processed chunks
    """
    all_chunks_path = "data/processed/all_chunks.json"
    if os.path.exists(all_chunks_path):
        with open(all_chunks_path, "r") as f:
            result = json.load(f)
            print(f"Type of loaded data: {type(result)}")
            return result
    return {}

if __name__ == "__main__":
    # Example usage when running this module directly
    datasets_to_process = ["breast_cancer", "oncqa"]
    results = process_all_datasets(datasets_to_process)
    
    # Print results
    for dataset_name, success in results.items():
        status = "Succeeded" if success else "Failed"
        print(f"Processing dataset {dataset_name}: {status}")
    
    # Print statistics
    stats = get_statistics()
    print(f"Processed {stats['total_datasets']} datasets with {stats['total_chunks']} total chunks")