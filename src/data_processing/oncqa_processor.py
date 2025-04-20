# src/data_processing/oncqa_processor.py

"""
Specialized processor for handling the OncQA dataset from Hugging Face.
This module extracts questions and responses from the OncQA dataset.
"""

import os
import json
import logging
from typing import List, Dict, Union, Optional
from datasets import load_dataset

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def extract_oncqa_dataset() -> str:
    """
    Extract and process the OncQA dataset from Hugging Face.
    
    Returns:
        Path to the saved JSON file
    """
    logger.info("Loading OncQA dataset from Hugging Face...")
    
    try:
        # Load the dataset from Hugging Face
        dataset = load_dataset("shanchen/OncQA", split="train")
        
        # Create list to store processed data
        processed_data = []
        
        # Process each item in the dataset
        for i, item in enumerate(dataset):
            try:
                # Extract fields based on actual dataset structure
                # This part may need adjustment based on the actual structure
                if "question" in item and "response" in item:
                    # Standard question-response format
                    processed_item = {
                        "text": f"Question: {item['question']}\nAnswer: {item['response']}",
                        "source": f"oncqa_{i}",
                        "question": item["question"],
                        "response": item["response"]
                    }
                elif "patient_message" in item and "physician_response" in item:
                    # Alternative format with patient messages
                    processed_item = {
                        "text": f"Patient: {item['patient_message']}\nPhysician: {item['physician_response']}",
                        "source": f"oncqa_{i}",
                        "question": item["patient_message"],
                        "response": item["physician_response"]
                    }
                elif "text" in item:
                    # Already formatted as text
                    processed_item = {
                        "text": item["text"],
                        "source": f"oncqa_{i}"
                    }
                else:
                    # Unknown format, try to extract sensible data
                    # Log all available keys for debugging
                    keys = list(item.keys())
                    logger.warning(f"Unknown format in OncQA dataset item {i}, available keys: {keys}")
                    
                    # Try to construct a text field from whatever is available
                    text_parts = []
                    for key, value in item.items():
                        if isinstance(value, str) and value.strip():
                            text_parts.append(f"{key}: {value}")
                    
                    if text_parts:
                        processed_item = {
                            "text": "\n".join(text_parts),
                            "source": f"oncqa_{i}"
                        }
                    else:
                        # Skip this item if no usable text
                        logger.warning(f"Skipping item {i} as no usable text was found")
                        continue
                
                # Add to processed data
                processed_data.append(processed_item)
                
            except Exception as e:
                logger.error(f"Error processing item {i} in OncQA dataset: {e}")
                continue
        
        # Save the processed data
        os.makedirs("data/raw", exist_ok=True)
        output_path = "data/raw/oncqa_dataset.json"
        
        with open(output_path, "w") as f:
            json.dump(processed_data, f)
        
        logger.info(f"Successfully processed {len(processed_data)} items from OncQA dataset")
        return output_path
    
    except Exception as e:
        logger.error(f"Error loading OncQA dataset: {e}")
        return None

def chunk_oncqa_data(input_path: str, max_chunk_size: int = 1000) -> List[Dict[str, str]]:
    """
    Chunk OncQA data to prepare for vector store.
    
    Args:
        input_path: Path to the processed OncQA data
        max_chunk_size: Maximum chunk size in characters
        
    Returns:
        List of chunked data
    """
    logger.info(f"Chunking OncQA data from {input_path}")
    
    # Load the processed data
    with open(input_path, "r") as f:
        data = json.load(f)
    
    chunked_data = []
    
    # Process each item
    for item in data:
        text = item["text"]
        
        # If text is smaller than max chunk size, keep as is
        if len(text) <= max_chunk_size:
            chunked_data.append(item)
        else:
            # Otherwise, split into chunks
            # Try to split at logical boundaries - Q&A format
            if "Question:" in text and "Answer:" in text:
                # Split at question-answer pairs
                parts = text.split("Question:")
                current_chunk = ""
                
                for part in parts:
                    if not part.strip():
                        continue
                        
                    qa_text = "Question:" + part
                    
                    if len(current_chunk) + len(qa_text) <= max_chunk_size:
                        current_chunk += qa_text
                    else:
                        if current_chunk:
                            chunked_data.append({
                                "text": current_chunk,
                                "source": f"{item['source']}_chunk{len(chunked_data) + 1}"
                            })
                        current_chunk = qa_text
                
                if current_chunk:
                    chunked_data.append({
                        "text": current_chunk,
                        "source": f"{item['source']}_chunk{len(chunked_data) + 1}"
                    })
            else:
                # Fall back to simple character-based chunking
                chunks = [text[i:i+max_chunk_size] for i in range(0, len(text), max_chunk_size)]
                
                for i, chunk in enumerate(chunks):
                    chunked_data.append({
                        "text": chunk,
                        "source": f"{item['source']}_chunk{i+1}"
                    })
    
    # Save the chunked data
    os.makedirs("data/processed", exist_ok=True)
    output_path = "data/processed/oncqa_chunks.json"
    
    with open(output_path, "w") as f:
        json.dump(chunked_data, f)
    
    logger.info(f"Created {len(chunked_data)} chunks from OncQA data")
    return chunked_data

if __name__ == "__main__":
    # Test extraction and chunking
    output_path = extract_oncqa_dataset()
    if output_path:
        chunk_oncqa_data(output_path)