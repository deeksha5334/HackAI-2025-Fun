Our project can be accessed through this link
https://v0-website-design-overhaul-two.vercel.app/

we have used vercel to deploy our app


# Breast Cancer Q&A RAG System

A Retrieval-Augmented Generation (RAG) system specialized in breast cancer information, developed for a 24-hour hackathon. This system extracts, processes, and retrieves information from multiple datasets to provide accurate answers to breast cancer-related questions.

## Features

- Data extraction from multiple sources:
  - Hugging Face datasets related to breast cancer
  - Web content from breastcancernow.org
- Text processing pipeline:
  - Cleaning and preprocessing of raw data
  - Intelligent chunking for optimal context retrieval
  - Vector embedding generation for semantic search
- Efficient retrieval system:
  - Similarity search
  - Contextual relevance scoring
  - Information retrieval
- Question answering capabilities:
  - Contextual answer generation based on retrieved information
  - Support for both simple and complex queries
  - Source attribution for verified information
  - Used Gemini API

## Project Structure

```
breast-cancer-rag/
├── data/
│   ├── raw/               # Stores raw data from sources
│   ├── processed/         # Stores processed data
│   └── vector_store/      # Stores vector embeddings and FAISS index
├── src/
│   ├── data_processing/   # Code for data extraction and processing
│   │   ├── __init__.py
│   │   ├── extraction.py  # Extracts data from sources
│   │   ├── cleaning.py    # Cleans and preprocesses data
│   │   └── chunking.py    # Segments data into chunks
│   ├── embeddings/        # Code for vector embeddings
│   │   ├── __init__.py
│   │   └── vector_store.py # Creates and manages vector store
│   └── rag/               # RAG system implementation
│       ├── __init__.py
│       ├── retrieval.py   # Retrieves documents and generates responses
│       ├── response_generation.py # Formats responses (optional)
│       └── utils.py       # Utility functions
├── requirements.txt       # Project dependencies
└── usage.py               # Example script to use the RAG system
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/breast-cancer-rag.git
   cd breast-cancer-rag
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

## Data Processing Pipeline

1. Create necessary directories:
   ```
   mkdir -p data/raw data/processed data/vector_store
   ```

2. Extract data from sources:
   ```
   python src/data_processing/extraction.py
   ```

3. Clean and preprocess the data:
   ```
   python src/data_processing/cleaning.py
   ```

4. Chunk the data into segments:
   ```
   python src/data_processing/chunking.py
   ```

5. Create embeddings and index the data:
   ```
   python src/embeddings/vector_store.py
   ```

## Usage

Run the example script to interact with the RAG system:
```
python usage.py
```

This will start an interactive session where you can ask questions about breast cancer.

Example questions:
- "What are the common symptoms of breast cancer?"
- "How is breast cancer diagnosed?"
- "What treatment options are available for breast cancer?"
- "How should I prepare for appointments with my doctor?"

## Adding More Datasets

To add more datasets from Hugging Face:

1. Open `src/data_processing/extraction.py`
2. Update the `dataset_ids` list in the `download_multiple_huggingface_datasets()` function:
   ```python
   dataset_ids = [
       "grasool/breast-cancer-QAs-llama",  # Original dataset
       "your_new_dataset_id",              # New dataset
       # Add more dataset IDs here
   ]
   ```
3. Run the data processing pipeline again

## Technical Implementation

This project uses:
- **Sentence Transformers**: For generating text embeddings
- **Gemini API**: For efficient similarity search
- **BeautifulSoup**: For web scraping
- **Basic text processing**: For the Q&A functionality without requiring an LLM API

For enhanced generation capabilities:
- You can uncomment and use the HuggingFaceRAGSystem class in `src/rag/retrieval.py` to use local LLMs
- Alternatively, you can set up the OpenAI implementation by uncommenting the code and providing an API key

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data sources:
  - [Breast Cancer Now](https://breastcancernow.org)
  - [Hugging Face Datasets](https://huggingface.co/datasets)
- Research papers and resources on RAG systems
[1] A. Ludwigson et al., “Characterizing informational needs and information seeking behavior of patients with breast cancer,” The American Journal of Surgery, vol. 227, pp. 100–105, Jan. 2024. doi:10.1016/j.amjsurg.2023.09.047 
[2] E. Abi Nader et al., “Informational needs of women with breast cancer treated with chemotherapy,” Asian Pacific Journal of Cancer Prevention, vol. 17, no. 4, pp. 1797–1800, Jun. 2016. doi:10.7314/apjcp.2016.17.4.1797 
[3] B. A. Vogel, J. Bengel, and A. W. Helmes, “Information and decision making: Patients’ needs and experiences in the course of breast cancer treatment,” Patient Education and Counseling, vol. 71, no. 1, pp. 79–85, Apr. 2008. doi:10.1016/j.pec.2007.11.023 
[4] M. Rassouli et al., “Communication needs of patients with breast cancer: A qualitative study,” Indian Journal of Palliative Care, vol. 22, no. 4, p. 402, 2016. doi:10.4103/0973-1075.191763 
[5] P. A. Parker, J. Aaron, and W. F. Baile, “Breast cancer: Unique communication challenges and strategies to address them,” The Breast Journal, vol. 15, no. 1, pp. 69–75, Jan. 2009. doi:10.1111/j.1524-4741.2008.00673.x 
[6] L. J. Fallowfield, “Treatment decision-making in breast cancer: The patient–doctor relationship,” Breast Cancer Research and Treatment, vol. 112, no. S1, pp. 5–13, Jun. 2008. doi:10.1007/s10549-008-0077-3 
[7] I. Ablett-Spence, “Information needs of newly diagnosed cancer patients,” European Journal of Cancer, vol. 35, Sep. 1999. doi:10.1016/s0959-8049(99)80495-x 
[8] H. Lu et al., “Information needs of breast cancer patients: Theory-generating meta-synthesis,” Journal of Medical Internet Research, vol. 22, no. 7, Jul. 2020. doi:10.2196/17907 
[9] O. C. E;, “Role of the nurse in patient education and engagement and its importance in Advanced breast cancer,” Seminars in oncology nursing, https://pubmed.ncbi.nlm.nih.gov/38087678/ (accessed Apr. 20, 2025). 
- Open source libraries used in this project
