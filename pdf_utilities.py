# pdf_utilities.py

import os
import json
from PyPDF2 import PdfReader

def process_additional_pdfs(pdf_dir, output_filename="additional_pdf_chunks.json"):
    """
    Process PDF files in a directory and add them to the system without losing existing chunks.
    
    Args:
        pdf_dir: Directory containing PDF files
        output_filename: Name for the output JSON file
    
    Returns:
        Path to the saved JSON file
    """
    # Create necessary directories
    os.makedirs("data/raw", exist_ok=True)
    os.makedirs("data/processed", exist_ok=True)
    
    print(f"Processing PDFs in directory: {pdf_dir}")
    
    # Extract text from PDF files
    all_chunks = []
    for root, _, files in os.walk(pdf_dir):
        for file in files:
            if file.lower().endswith('.pdf'):
                file_path = os.path.join(root, file)
                print(f"Processing PDF: {file_path}")
                
                # Use PyPDF2 for extraction
                try:
                    reader = PdfReader(file_path)
                    for page_num, page in enumerate(reader.pages):
                        text = page.extract_text()
                        if text and text.strip():  # Only add non-empty pages
                            # Add as a chunk
                            all_chunks.append({
                                "text": text,
                                "source": f"{os.path.basename(file_path)}:page{page_num+1}",
                                "page_num": page_num + 1,
                                "total_pages": len(reader.pages)
                            })
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
    
    print(f"Extracted {len(all_chunks)} chunks from PDFs")
    
    # Load existing all_chunks.json if it exists
    existing_chunks_file = "data/processed/all_chunks.json"
    existing_chunks = {}
    
    if os.path.exists(existing_chunks_file):
        try:
            with open(existing_chunks_file, "r") as f:
                existing_chunks = json.load(f)
            print(f"Loaded {len(existing_chunks)} existing datasets")
        except Exception as e:
            print(f"Error loading existing chunks: {e}")
    
    # Add the new chunks
    existing_chunks["additional_pdfs"] = all_chunks
    
    # Save the updated chunks
    with open(existing_chunks_file, "w") as f:
        json.dump(existing_chunks, f, indent=2)
    
    print(f"Successfully added {len(all_chunks)} chunks to {existing_chunks_file}")
    return existing_chunks_file

# Example usage
if __name__ == "__main__":
    pdf_directory = "data/raw/research_papers"
    process_additional_pdfs(pdf_directory)