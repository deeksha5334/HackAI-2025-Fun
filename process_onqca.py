# process_oncqa.py
import json
import os
from datasets import load_dataset

def process_oncqa_dataset():
    print("Loading OncQA dataset from Hugging Face...")
    
    try:
        # Load the dataset
        dataset = load_dataset("shanchen/OncQA", split="train")
        print(f"Loaded dataset with {len(dataset)} items")
        
        # Process each item
        processed_data = []
        for i, item in enumerate(dataset):
            try:
                # Look at the available fields
                keys = list(item.keys())
                print(f"Item {i} has keys: {keys}") if i < 3 else None
                
                # Extract the text
                if "question" in item and "raw_response" in item:
                    text = f"Question: {item['question']}\nAnswer: {item['raw_response']}"
                    processed_item = {
                        "text": text,
                        "source": f"oncqa_{i}",
                        "question": item["question"],
                        "response": item["raw_response"]
                    }
                    processed_data.append(processed_item)
            except Exception as e:
                print(f"Error processing item {i}: {e}")
        
        print(f"Processed {len(processed_data)} items from OncQA dataset")
        
        # Load existing chunks
        existing_chunks_file = "data/processed/all_chunks.json"
        if os.path.exists(existing_chunks_file):
            with open(existing_chunks_file, "r") as f:
                existing_data = json.load(f)
        else:
            existing_data = []
        
        # Add OncQA data to existing chunks
        if isinstance(existing_data, list):
            for item in processed_data:
                existing_data.append(item)
        else:  # It's a dictionary
            existing_data["oncqa"] = processed_data
        
        # Save updated data
        with open(existing_chunks_file, "w") as f:
            json.dump(existing_data, f, indent=2)
        
        print(f"Successfully combined OncQA data with existing chunks in {existing_chunks_file}")
    
    except Exception as e:
        print(f"Error processing OncQA dataset: {e}")
    print(f"Processed {len(processed_data)} out of {len(dataset)} items from OncQA dataset")

if __name__ == "__main__":
    process_oncqa_dataset()