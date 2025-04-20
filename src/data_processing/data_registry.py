# src/data_processing/dataset_registry.py

"""
Registry of available datasets and their metadata.
This module serves as a central location for dataset configuration.
"""

AVAILABLE_DATASETS = {
    "breast_cancer": {
        "source": "huggingface",
        "id": "grassol/breast-cancer-QAs-llama",
        "description": "Breast cancer Q&A dataset",
        "processor": "extract_standard_qa"
    },
    "oncqa": {
        "source": "huggingface",
        "id": "shanchen/OncQA",
        "description": "Oncology Q&A dataset with physician responses",
        "processor": "extract_oncqa"
    },
    "pdf_collection": {
        "source": "local",
        "id": "pdfs",
        "description": "Collection of PDF documents",
        "processor": "extract_pdf"
    },
    # Each paper needs a unique key
    "paper_clinical": {
        "source": "local",
        "id": "research_papers",
        "description": "Research paper on clinical aspects of breast cancer",
        "processor": "extract_pdf",
        "file_path": "data/raw/research_papers/1-s2.0-S0749208123002310-main.pdf"
    },
    "paper_jmir": {
        "source": "local",
        "id": "research_papers",
        "description": "JMIR paper on breast cancer",
        "processor": "extract_pdf",
        "file_path": "data/raw/research_papers/jmir-2020-7-e17907.pdf"
    },
    "paper_luker": {
        "source": "local",
        "id": "research_papers",
        "description": "Luker paper on information needs of women with breast cancer",
        "processor": "extract_pdf",
        "file_path": "data/raw/research_papers/Journal of Advanced Nursing - July 1995 - Luker - The information needs of women newly diagnosed with breast cancer.pdf"
    },
    "paper_oncology": {
        "source": "local",
        "id": "research_papers",
        "description": "Oncology research on breast cancer",
        "processor": "extract_pdf",
        "file_path": "data/raw/research_papers/s10549-008-0077-3.pdf"
    },
    "paper_communication": {
        "source": "local",
        "id": "research_papers",
        "description": "Paper on breast cancer communication challenges",
        "processor": "extract_pdf",
        "file_path": "data/raw/research_papers/The Breast Journal - 2009 - Parker - Breast Cancer  Unique Communication Challenges and Strategies to Address them.pdf"
    },
     "paper_additional": {
        "source": "local",
        "id": "research_papers",
        "description": "Additional research on breast cancer",
        "processor": "extract_pdf",
        "file_path": "data/raw/research_papers/ZFVJVlJpNm53MkFwREowYjlpMi9NZz09.pdf"
     }
}

# Document processors for different data types
DOCUMENT_PROCESSORS = {
    "extract_standard_qa": {
        "description": "Extracts text from standard Q&A format datasets",
        "fields": ["text"]
    },
    "extract_oncqa": {
        "description": "Extracts questions and responses from OncQA dataset",
        "fields": ["question", "response"]
    },
    "extract_pdf": {
        "description": "Extracts text from PDF documents",
        "fields": ["text"]
    }
}

def list_available_datasets():
    """
    Return a list of available datasets with descriptions.
    
    Returns:
        Dictionary of dataset names and descriptions
    """
    return {name: info["description"] for name, info in AVAILABLE_DATASETS.items()}

def get_dataset_info(dataset_name):
    """
    Get information about a specific dataset.
    
    Args:
        dataset_name: Name of the dataset
        
    Returns:
        Dictionary with dataset information or None if not found
    """
    return AVAILABLE_DATASETS.get(dataset_name, None)

def get_processor_info(processor_name):
    """
    Get information about a specific document processor.
    
    Args:
        processor_name: Name of the processor
        
    Returns:
        Dictionary with processor information or None if not found
    """
    return DOCUMENT_PROCESSORS.get(processor_name, None)