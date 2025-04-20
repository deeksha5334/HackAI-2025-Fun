# usage.py
import logging
import os
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from src.rag.retrieval import RAGSystem
from src.embeddings.vector_store import VectorStore

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EnhancedRAGSystem(RAGSystem):
    def __init__(self, model_name="google/flan-t5-base"):
        """
        Initialize the enhanced RAG system with LLM integration.
        
        Args:
            model_name: The HuggingFace model to use for answer generation
        """
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
    
    def prepare_prompt(self, query, contexts):
        """
        Format the prompt for the LLM with retrieved contexts.
        
        Args:
            query: The user's question
            contexts: The retrieved document chunks
            
        Returns:
            A formatted prompt string
        """
        prompt = f"Answer the question about breast cancer based on the following information:\n\nQuestion: {query}\n\nRetrieved Information:\n"
        
        # Add retrieved contexts
        for i, doc in enumerate(contexts, 1):
            # Try to extract the document content
            if isinstance(doc, dict):
                # Extract document content
                content = None
                for key in ['text', 'content', 'chunk', 'document']:
                    if key in doc and doc[key]:
                        content = doc[key]
                        break
                
                if not content and len(doc) > 0:
                    # If we still don't have content, use the first value
                    first_key = list(doc.keys())[0]
                    content = doc[first_key]
                
                prompt += f"\nDocument {i}:\n{str(content)}\n"
                
                # Try to extract source information
                source = None
                if 'metadata' in doc and isinstance(doc['metadata'], dict):
                    source = doc['metadata'].get('source')
                elif 'source' in doc:
                    source = doc['source']
                    
                if source:
                    prompt += f"Source: {source}\n"
            else:
                # If the document is not a dictionary, use it directly
                prompt += f"\nDocument {i}:\n{str(doc)}\n"
        
        prompt += "\nProvide a clear, helpful answer based on the information above. If the information doesn't directly address the question, acknowledge this."
        return prompt
    
    def generate_answer(self, prompt):
        """
        Generate an answer using the LLM.
        
        Args:
            prompt: The formatted prompt
            
        Returns:
            The generated answer
        """
        inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True, max_length=1024).to(self.device)
        
        outputs = self.model.generate(
            inputs.input_ids,
            max_length=256,
            num_beams=4,
            temperature=0.7,
            top_p=0.9,
            do_sample=True
        )
        
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return response
    
    def answer_question(self, query):
        """
        Generate an answer to a question using the RAG approach.
        
        Args:
            query: The user's question
            
        Returns:
            A generated answer
        """
        # Get the existing search method
        contexts = self.vector_store.search(query, k=5)
        
        if not contexts:
            return "I couldn't find any relevant information to answer your question about breast cancer."
        
        # Log the structure of the first document for debugging
        if contexts and len(contexts) > 0:
            logger.info(f"First document structure: {type(contexts[0])}")
            if isinstance(contexts[0], dict):
                logger.info(f"Document keys: {contexts[0].keys()}")
        
        # Prepare the prompt with the retrieved contexts
        prompt = self.prepare_prompt(query, contexts)
        
        # Generate answer using the LLM
        answer = self.generate_answer(prompt)
        
        # Format the response with source citations
        sources = []
        for doc in contexts:
            # Extract source information based on your document structure
            source = None
            if isinstance(doc, dict):
                if 'metadata' in doc and isinstance(doc['metadata'], dict) and 'source' in doc['metadata']:
                    source = doc['metadata']['source']
                elif 'source' in doc:
                    source = doc['source']
            
            if source and source not in sources:
                sources.append(source)
        
        response = f"{answer}\n\n"
        if sources:
            response += "This information comes from: " + ", ".join(sources) + ".\n\n"
        
        response += f"I found {len(contexts)} relevant documents. You can ask for more specific information if needed."
        
        return response

def main():
    # Initialize the enhanced RAG system
    rag_system = EnhancedRAGSystem()
    
    # Ask a question
    query = "What are the common symptoms of breast cancer?"
    print(f"\nQuestion: {query}")
    
    # Get the answer
    answer = rag_system.answer_question(query)
    
    # Print the answer
    print("\nAnswer:")
    print(answer)
    
    # Interactive mode
    print("\n\nEntering interactive mode. Type 'quit' to exit.")
    while True:
        query = input("\nAsk a question about breast cancer: ")
        if query.lower() in ["quit", "exit", "q"]:
            break
        answer = rag_system.answer_question(query)
        print("\nAnswer:")
        print(answer)

if __name__ == "__main__":
    main()