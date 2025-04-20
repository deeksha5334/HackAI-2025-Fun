# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from src.rag.retrieval import RAGSystem
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class EnhancedRAGSystem(RAGSystem):
    def __init__(self, model_name="google/flan-t5-base"):
        # Initialize the base RAG system
        super().__init__()
        logger.info(f"Initializing enhanced RAG system with LLM: {model_name}")
        
        # Initialize the LLM components
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
        
        # Force CPU usage to avoid MPS compatibility issues
        self.device = "cpu"
        self.model.to(self.device)
        logger.info(f"Using device: {self.device}")
    
    # ... [rest of the EnhancedRAGSystem implementation] ...

# Initialize the RAG system
rag_system = EnhancedRAGSystem()
logger.info("RAG system initialized and ready to serve requests")

@app.route('/api/query', methods=['POST'])
def query():
    data = request.json
    if not data or 'question' not in data:
        return jsonify({'error': 'No question provided'}), 400
    
    question = data['question']
    logger.info(f"Received question: {question}")
    
    # Get answer from RAG system
    answer = rag_system.answer_question(question)
    
    return jsonify({
        'question': question,
        'answer': answer
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)