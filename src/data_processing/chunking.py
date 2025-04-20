# src/data_processing/chunking.py

"""
Module for chunking text data into smaller, manageable pieces for processing and indexing.
"""

import os
import json
import re
import logging
from typing import List, Dict, Union, Optional, Any

logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def create_chunks(input_data: Union[str, List[Dict[str, Any]]], max_chunk_size: int = 1000) -> List[Dict[str, Any]]:
    """
    Create text chunks from input data.
    
    Args:
        input_data: Path to JSON file or list of dictionaries with text data
        max_chunk_size: Maximum size of each chunk in characters
        
    Returns:
        List of dictionaries with chunked text
    """
    logger.info("Creating chunks from input data")
    

    if isinstance(input_data, str):
        with open(input_data, "r") as f:
            data = json.load(f)
    else:
        data = input_data
    
    chunks = []
    

    for item in data:
        text = item.get("text", "")
        if not text:
            logger.warning(f"Skipping item with no text: {item}")
            continue
        

        metadata = {k: v for k, v in item.items() if k != "text"}
        
  
        if len(text) <= max_chunk_size:
            chunk_item = {"text": text, **metadata}
            chunks.append(chunk_item)
        else:
            
            text_chunks = split_text(text, max_chunk_size)
            
       
            for i, chunk in enumerate(text_chunks):
                chunk_item = {
                    "text": chunk,
                    "chunk_num": i + 1,
                    "total_chunks": len(text_chunks),
                    **metadata
                }
                
               
                if "source" in chunk_item:
                    chunk_item["source"] = f"{chunk_item['source']}_chunk{i+1}"
                
                chunks.append(chunk_item)
    
    logger.info(f"Created {len(chunks)} chunks from {len(data)} input items")
    

    output_path = "data/processed/chunks.json"
    with open(output_path, "w") as f:
        json.dump(chunks, f)
    
    logger.info(f"Saved chunks to {output_path}")
    return chunks

def split_text(text: str, max_chunk_size: int) -> List[str]:
    """
    Split text into chunks of maximum size.
    
    Args:
        text: Text to split
        max_chunk_size: Maximum size of each chunk in characters
        
    Returns:
        List of text chunks
    """
    
    paragraphs = re.split(r'\n\s*\n', text)
    
    chunks = []
    current_chunk = ""
    
    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
            

        if len(current_chunk) + len(para) + 2 > max_chunk_size:

            if len(para) > max_chunk_size:
                
                if current_chunk:
                    chunks.append(current_chunk)
                    current_chunk = ""
                
                
                sentences = re.split(r'(?<=[.!?])\s+', para)
                
                
                for sentence in sentences:
                    if len(sentence) > max_chunk_size:
                        
                        for i in range(0, len(sentence), max_chunk_size):
                            chunks.append(sentence[i:i+max_chunk_size])
                    elif len(current_chunk) + len(sentence) + 1 <= max_chunk_size:
                        if current_chunk:
                            current_chunk += " "
                        current_chunk += sentence
                    else:
                        chunks.append(current_chunk)
                        current_chunk = sentence
            else:
                
                chunks.append(current_chunk)
                current_chunk = para
        else:
            
            if current_chunk:
                current_chunk += "\n\n"
            current_chunk += para
    
    
    if current_chunk:
        chunks.append(current_chunk)
    
    return chunks

def chunk_by_type(input_data: Union[str, List[Dict[str, Any]]], data_type: str = "default") -> List[Dict[str, Any]]:
    """
    Chunk data using type-specific chunking methods.
    
    Args:
        input_data: Path to JSON file or list of dictionaries with text data
        data_type: Type of data to chunk (default, qa, pdf, etc.)
        
    Returns:
        List of dictionaries with chunked text
    """
    logger.info(f"Chunking data with type '{data_type}'")
    
    if data_type == "qa":
        
        return chunk_qa_data(input_data)
    elif data_type == "pdf":
        
        return chunk_pdf_data(input_data)
    else:
        
        return create_chunks(input_data)

def chunk_qa_data(input_data: Union[str, List[Dict[str, Any]]]) -> List[Dict[str, Any]]:
    """
    Chunk question-answer data, keeping questions and answers together.
    
    Args:
        input_data: Path to JSON file or list of dictionaries with QA data
        
    Returns:
        List of dictionaries with chunked QA data
    """
    logger.info("Chunking QA data")
    
   
    if isinstance(input_data, str):
        with open(input_data, "r") as f:
            data = json.load(f)
    else:
        data = input_data
    
    chunks = []
    
    
    for item in data:
        
        text = item.get("text", "")
        
        
        if "Question:" in text and "Answer:" in text:
            
            qa_parts = re.split(r'(Question:.*?)(?=Question:|$)', text, flags=re.DOTALL)
            
            
            qa_parts = [part for part in qa_parts if part.strip()]
            
           
            for i, qa in enumerate(qa_parts):
                chunks.append({
                    "text": qa.strip(),
                    "source": f"{item.get('source', 'qa')}_pair{i+1}",
                    "qa_num": i + 1,
                    "total_qa": len(qa_parts)
                })
        else:
           
            chunks.extend(create_chunks([item]))
    
    logger.info(f"Created {len(chunks)} QA chunks from {len(data)} input items")
    return chunks

def chunk_pdf_data(input_data: Union[str, List[Dict[str, Any]]]) -> List[Dict[str, Any]]:
    """
    Chunk PDF data, trying to respect document structure.
    
    Args:
        input_data: Path to JSON file or list of dictionaries with PDF data
        
    Returns:
        List of dictionaries with chunked PDF data
    """
   
    from .pdf_processor import clean_pdf_text, chunk_pdf_text
    
    logger.info("Chunking PDF data")
    
    
    if isinstance(input_data, str):
        with open(input_data, "r") as f:
            data = json.load(f)
    else:
        data = input_data
    
    chunks = []
    

    for item in data:
        text = item.get("text", "")
        if not text:
            continue
            
        
        cleaned_text = clean_pdf_text(text)
        
        
        text_chunks = chunk_pdf_text(cleaned_text)
        
        
        for i, chunk in enumerate(text_chunks):
            chunk_item = {
                "text": chunk,
                "source": f"{item.get('source', 'pdf')}_chunk{i+1}",
                "page_num": item.get("page_num"),
                "total_pages": item.get("total_pages"),
                "chunk_num": i + 1,
                "total_chunks": len(text_chunks)
            }
            chunks.append(chunk_item)
    
    logger.info(f"Created {len(chunks)} PDF chunks from {len(data)} input items")
    return chunks

if __name__ == "__main__":
    
    import sys
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
        create_chunks(input_file)
    else:
        print("Usage: python chunking.py <input_file>")