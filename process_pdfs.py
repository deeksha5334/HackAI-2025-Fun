# process_pdfs.py - Updated version

import os
import json
from PyPDF2 import PdfReader

def process_additional_pdfs():
    """
    Process PDF files in the research_papers directory and add them to existing chunks.
    """
    # Directory with PDFs
    pdf_dir = "data/raw/research_papers"
    
    # Create directories if they don't exist
    os.makedirs(pdf_dir, exist_ok=True)
    os.makedirs("data/processed", exist_ok=True)
    
    print(f"Processing PDFs in directory: {pdf_dir}")
    
    # Extract text from PDF files
    all_pdf_chunks = []
    pdf_files_found = 0
    
    for root, _, files in os.walk(pdf_dir):
        for file in files:
            if file.lower().endswith('.pdf'):
                pdf_files_found += 1
                file_path = os.path.join(root, file)
                print(f"Processing PDF: {file_path}")
                
                # Use PyPDF2 for extraction
                try:
                    reader = PdfReader(file_path)
                    for page_num, page in enumerate(reader.pages):
                        try:
                            text = page.extract_text()
                            if text and text.strip():  # Only add non-empty pages
                                # Add as a chunk
                                all_pdf_chunks.append({
                                    "text": text,
                                    "source": f"{os.path.basename(file_path)}:page{page_num+1}",
                                    "page_num": page_num + 1,
                                    "total_pages": len(reader.pages)
                                })
                        except Exception as e:
                            print(f"Error extracting text from page {page_num+1}: {e}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
    
    print(f"Extracted {len(all_pdf_chunks)} chunks from {pdf_files_found} PDF files")
    
    # Load existing all_chunks.json if it exists
    existing_chunks_file = "data/processed/all_chunks.json"
    
    if os.path.exists(existing_chunks_file):
        try:
            with open(existing_chunks_file, "r") as f:
                existing_data = json.load(f)
            print(f"Loaded existing data from {existing_chunks_file}")
            
            # Check if it's a list or a dictionary
            if isinstance(existing_data, list):
                # It's a list, so append the new chunks
                print("Existing data is a list, appending new chunks")
                for chunk in all_pdf_chunks:
                    existing_data.append(chunk)
                result_data = existing_data
            else:
                # It's a dictionary, add as a new key
                print("Existing data is a dictionary, adding new key")
                existing_data["research_papers"] = all_pdf_chunks
                result_data = existing_data
                
        except Exception as e:
            print(f"Error loading existing chunks: {e}")
            # Start fresh if there was an error
            result_data = {"research_papers": all_pdf_chunks}
    else:
        # No existing file, create a new dictionary
        print("No existing file found, creating new data")
        result_data = {"research_papers": all_pdf_chunks}
    
    # Save the updated chunks
    with open(existing_chunks_file, "w") as f:
        json.dump(result_data, f, indent=2)
    
    if isinstance(result_data, list):
        print(f"Successfully added PDF chunks. Total chunks: {len(result_data)}")
    else:
        print(f"Successfully added PDF chunks. Total datasets: {len(result_data.keys())}")
    
    return existing_chunks_file

if __name__ == "__main__":
    process_additional_pdfs()