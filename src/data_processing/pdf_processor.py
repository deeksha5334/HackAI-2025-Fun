# src/data_processing/pdf_processor.py

"""
Module for processing PDF files, extracting text, and handling various PDF formats.
This module provides functions for processing individual PDFs, directories of PDFs,
and converting PDFs to a format compatible with the rest of the pipeline.
"""

import os
import json
import logging
from typing import List, Dict, Union, Tuple, Optional
import re

# Import PDF processing libraries
from PyPDF2 import PdfReader
import fitz  # PyMuPDF


logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def extract_text_with_pymupdf(file_path: str) -> List[Dict[str, str]]:
    """
    Extract text from a PDF file using PyMuPDF (fitz).
    
    Args:
        file_path: Path to the PDF file
        
    Returns:
        List of dictionaries with text content
    """
    data_list = []
    doc = fitz.open(file_path)
    
    # Get the total number of pages for logging
    total_pages = len(doc)
    logger.info(f"Processing {total_pages} pages from {file_path} with PyMuPDF")
    
    for page_num in range(total_pages):
        page = doc.load_page(page_num)
        
        
        try:
            blocks = page.get_text("blocks")
            if blocks:
               
                text = "\n\n".join([b[4] for b in blocks])
            else:
              
                text = page.get_text()
        except Exception:
            
            text = page.get_text()
            
        if text.strip():  # Only add non-empty pages
            data_list.append({
                "text": text,
                "source": f"{os.path.basename(file_path)}:page{page_num+1}",
                "page_num": page_num + 1,
                "total_pages": total_pages
            })
    
    return data_list

def extract_text_with_pypdf2(file_path: str) -> List[Dict[str, str]]:
    """
    Extract text from a PDF file using PyPDF2.
    
    Args:
        file_path: Path to the PDF file
        
    Returns:
        List of dictionaries with text content
    """
    data_list = []
    reader = PdfReader(file_path)
    
    # Get the total number of pages for logging
    total_pages = len(reader.pages)
    logger.info(f"Processing {total_pages} pages from {file_path} with PyPDF2")
    
    for page_num, page in enumerate(reader.pages):
        text = page.extract_text()
        if text.strip():  # Only add non-empty pages
            data_list.append({
                "text": text,
                "source": f"{os.path.basename(file_path)}:page{page_num+1}",
                "page_num": page_num + 1,
                "total_pages": total_pages
            })
    
    return data_list

def process_pdf_file(file_path: str) -> List[Dict[str, str]]:
    """
    Extract text from a PDF file using multiple methods for robustness.
    
    Args:
        file_path: Path to the PDF file
        
    Returns:
        List of dictionaries with text content
    """
    logger.info(f"Processing PDF file: {file_path}")
    
    data_list = []
    try:
        
        data_list = extract_text_with_pymupdf(file_path)
    except Exception as e:
       
        logger.warning(f"PyMuPDF extraction failed for {file_path}: {e}")
        try:
            data_list = extract_text_with_pypdf2(file_path)
        except Exception as e2:
            logger.error(f"PyPDF2 extraction also failed for {file_path}: {e2}")
            
    if not data_list:
        logger.warning(f"No text extracted from {file_path}")
    else:
        logger.info(f"Successfully extracted {len(data_list)} pages from {file_path}")
            
    return data_list

def process_pdf_directory(directory_path: str) -> str:
    """
    Process all PDF files in a directory and save as JSON.
    
    Args:
        directory_path: Path to directory containing PDF files
        
    Returns:
        Path to the saved JSON file
    """
    logger.info(f"Processing PDFs in directory: {directory_path}")
    
    
    os.makedirs("data/raw", exist_ok=True)
    
    all_data = []
    pdf_files_found = 0
    
   
    for root, _, files in os.walk(directory_path):
        for file in files:
            if file.lower().endswith('.pdf'):
                pdf_files_found += 1
                file_path = os.path.join(root, file)
                pdf_data = process_pdf_file(file_path)
                all_data.extend(pdf_data)
    
  
    output_path = "data/raw/pdf_extracts.json"
    with open(output_path, "w") as f:
        json.dump(all_data, f)
    
    logger.info(f"Processed {pdf_files_found} PDF files with {len(all_data)} pages and saved to {output_path}")
    return output_path

def clean_pdf_text(text: str) -> str:
    """
    Clean and normalize PDF text.
    
    Args:
        text: Raw text extracted from PDF
        
    Returns:
        Cleaned text
    """
    
    text = re.sub(r'\s+', ' ', text)
    
 
    text = text.replace('- ', '')  
    
    
    text = re.sub(r'\(cid:\d+\)', '', text)
    
   
    text = re.sub(r'(?:Page \d+ of \d+)|(?:\d+/\d+)', '', text)
    
    return text.strip()

def chunk_pdf_text(text: str, max_chunk_size: int = 1000) -> List[str]:
    """
    Split PDF text into manageable chunks.
    
    Args:
        text: Cleaned PDF text
        max_chunk_size: Maximum size of each chunk in characters
        
    Returns:
        List of text chunks
    """
   
    paragraphs = text.split('\n\n')
    
    chunks = []
    current_chunk = ""
    
    for para in paragraphs:
 
        if len(para) > max_chunk_size:
            sentences = re.split(r'(?<=[.!?])\s+', para)
            for sentence in sentences:
                if len(current_chunk) + len(sentence) <= max_chunk_size:
                    current_chunk += sentence + " "
                else:
                    if current_chunk:
                        chunks.append(current_chunk.strip())
                    current_chunk = sentence + " "
 
        elif len(current_chunk) + len(para) <= max_chunk_size:
            current_chunk += para + "\n\n"

        else:
            if current_chunk:
                chunks.append(current_chunk.strip())
            current_chunk = para + "\n\n"
    

    if current_chunk:
        chunks.append(current_chunk.strip())
    
    return chunks

def process_and_chunk_pdfs(directory_path: str, max_chunk_size: int = 1000) -> List[Dict[str, str]]:
    """
    Process PDFs in a directory, clean the text, and split into chunks.
    
    Args:
        directory_path: Path to directory containing PDF files
        max_chunk_size: Maximum size of each chunk in characters
        
    Returns:
        List of dictionaries with chunked text
    """
    # Process PDF files
    pdf_path = process_pdf_directory(directory_path)
    
    # Load the extracted text
    with open(pdf_path, "r") as f:
        pdf_data = json.load(f)
    
    # Clean and chunk the text
    chunked_data = []
    
    for item in pdf_data:
        # Clean the text
        cleaned_text = clean_pdf_text(item["text"])
        
        # Split into chunks
        chunks = chunk_pdf_text(cleaned_text, max_chunk_size)
        
        # Create chunk items
        for i, chunk in enumerate(chunks):
            chunked_data.append({
                "text": chunk,
                "source": f"{item['source']}_chunk{i+1}",
                "page_num": item.get("page_num"),
                "total_pages": item.get("total_pages"),
                "chunk_num": i + 1,
                "total_chunks": len(chunks)
            })
    
    # Save chunked data
    output_path = "data/processed/pdf_chunks.json"
    with open(output_path, "w") as f:
        json.dump(chunked_data, f)
    
    logger.info(f"Created {len(chunked_data)} chunks from PDF text and saved to {output_path}")
    return chunked_data