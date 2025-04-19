# src/rag/retrieval.py
import logging
import sys
sys.path.append(".")  # Add root directory to path
from src.embeddings.vector_store import VectorStore

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class RAGSystem:
    def __init__(self):
        """Initialize the RAG system with a local vector store."""
        self.vector_store = VectorStore()
        
        # Load vector store
        self.vector_store.load_vector_store()
    
    def retrieve(self, query, k=3):
        """Retrieve the top k most relevant documents for the query."""
        return self.vector_store.search(query, k=k)
    
    def format_answer(self, query, context_docs):
        """Format an answer based on the retrieval without using an LLM."""
        try:
            if not context_docs:
                return "I couldn't find any relevant information to answer your question."
            
            # Sort documents by score (lowest distance = most relevant)
            sorted_docs = sorted(context_docs, key=lambda x: x.get("score", float('inf')))
            
            # Build a simple answer using the most relevant document
            top_doc = sorted_docs[0]
            
            # Get source information
            source_type = top_doc.get("metadata", {}).get("source_type", "unknown")
            source = top_doc.get("source", "unknown source")
            
            # Create a simple response
            answer = (
                f"Based on the information I found about breast cancer:\n\n"
                f"{top_doc['content']}\n\n"
                f"This information comes from {source_type} source: {source}."
            )
            
            # If we have multiple relevant documents, add a note
            if len(sorted_docs) > 1:
                answer += f"\n\nI found {len(sorted_docs)} relevant documents. You can ask for more specific information if needed."
            
            return answer
        except Exception as e:
            logger.error(f"Error formatting answer: {str(e)}")
            return f"I'm sorry, there was an error generating an answer: {str(e)}"
    
    def answer_question(self, query, k=3):
        """Full RAG pipeline: retrieve and format answer."""
        try:
            # Retrieve relevant documents
            docs = self.retrieve(query, k=k)
            
            if not docs:
                return "I couldn't find any relevant information to answer your question."
            
            # Format answer from retrieved documents
            answer = self.format_answer(query, docs)
            
            return answer
        except Exception as e:
            logger.error(f"Error in RAG pipeline: {str(e)}")
            return f"I'm sorry, there was an error processing your question: {str(e)}"

# Optional: For a more sophisticated approach, you can use a local Hugging Face model
# This requires more RAM but is free
"""
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

class HuggingFaceRAGSystem(RAGSystem):
    def __init__(self, model_name="facebook/blenderbot-400M-distill"):
        super().__init__()
        self.model_name = model_name
        self.tokenizer = None
        self.model = None
        self.generator = None
        
    def load_model(self):
        try:
            logger.info(f"Loading LLM model: {self.model_name}")
            
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            self.model = AutoModelForCausalLM.from_pretrained(self.model_name)
            self.generator = pipeline("text-generation", model=self.model, tokenizer=self.tokenizer)
            
            logger.info("LLM model loaded successfully")
            return True
        except Exception as e:
            logger.error(f"Error loading LLM model: {str(e)}")
            return False
    
    def format_prompt(self, query, context_docs):
        # Format context
        context = "\n\n".join([doc["content"] for doc in context_docs])
        
        prompt = f"Context information about breast cancer:\n{context}\n\nBased on this information, answer the question: {query}"
        return prompt
    
    def generate(self, prompt, max_length=512):
        if not self.generator:
            success = self.load_model()
            if not success:
                return self.format_answer(prompt, [{"content": prompt}])
        
        try:
            response = self.generator(prompt, max_length=max_length, num_return_sequences=1)[0]["generated_text"]
            return response
        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            # Fall back to simpler approach
            return self.format_answer(prompt, [{"content": prompt}])
    
    def answer_question(self, query, k=3):
        # Retrieve relevant documents
        docs = self.retrieve(query, k=k)
        
        if not docs:
            return "I couldn't find any relevant information to answer your question."
        
        # Format prompt
        prompt = self.format_prompt(query, docs)
        
        # Generate response
        response = self.generate(prompt)
        
        return response
"""