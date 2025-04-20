# usage.py
import logging
import os
import google.generativeai as genai
from src.rag.retrieval import RAGSystem
from src.embeddings.vector_store import VectorStore

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EnhancedRAGSystem(RAGSystem):
    def __init__(self, api_key=None):
        """
        Initialize the enhanced RAG system with Gemini integration.
        
        Args:
            api_key: Your Google API key (optional if set as environment variable)
        """
        # Initialize the base RAG system
        super().__init__()
        
        # Configure Gemini API
        if api_key:
            genai.configure(api_key=api_key)
        else:
            # Try to get from environment variable
            api_key = os.environ.get("GOOGLE_API_KEY")
            if not api_key:
                raise ValueError("No API key provided. Set the GOOGLE_API_KEY environment variable or pass it directly.")
            genai.configure(api_key=api_key)
        
        # Get available models first to verify
        try:
            models = genai.list_models()
            model_names = [model.name for model in models]
            logger.info(f"Available models: {model_names}")
            
            # Select a suitable model - prioritize newer models
            # Try different model types in order of preference
            preferred_models = [
                'models/gemini-1.5-pro',
                'models/gemini-1.5-flash',
                'models/gemini-1.5-pro-latest',
                'models/gemini-1.5-flash-latest',
                'models/gemini-2.0-pro',
                'models/gemini-pro'
            ]
            
            selected_model = None
            for preferred in preferred_models:
                for available in model_names:
                    if preferred in available:
                        selected_model = available
                        break
                if selected_model:
                    break
            
            # If no preferred models found, try any model with "gemini" in the name
            if not selected_model:
                for model in model_names:
                    if 'gemini' in model.lower() and ('pro' in model.lower() or 'flash' in model.lower()):
                        selected_model = model
                        break
            
            if not selected_model:
                # As a last resort, use any model with "gemini" in name
                for model in model_names:
                    if 'gemini' in model.lower():
                        selected_model = model
                        break
            
            if not selected_model:
                raise ValueError(f"No suitable Gemini model found among available models: {model_names}")
            
            # Initialize the model
            self.model = genai.GenerativeModel(selected_model)
            logger.info(f"Initialized enhanced RAG system with model: {selected_model}")
        except Exception as e:
            logger.error(f"Error initializing Gemini: {e}")
            raise
    
    def prepare_prompt(self, query, contexts):
    
        prompt = """You are a compassionate oncology nurse who is helping a breast cancer patient. 
        The patient is likely anxious and worried about their condition. Be warm, empathetic, and reassuring.
        Provide factual information in a caring way. Acknowledge their concerns. Avoid clinical coldness.
        Use simple language while remaining accurate. Focus on what may help them practically and emotionally.
        
        Answer the patient's question based on the following information:
        
        Patient question: {0}
        
        Retrieved Information:
        """.format(query)
        
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
        
        prompt += """\n
        
        Remember to:
        1. Speak as a supportive nurse who understands breast cancer concerns
        2. Be reassuring while remaining factual
        3. Acknowledge emotional aspects of their question
        4. Provide clear, practical guidance when possible
        5. Use a warm, conversational tone
        
        If the information doesn't address their question, acknowledge this with empathy and suggest what they might do next.
        """
        return prompt

    def generate_answer(self, prompt):
        """Generate an answer using Gemini."""
        try:
            # Configure generation parameters
            generation_config = {
                "temperature": 0.7,
                "top_p": 0.9,
                "top_k": 40,
                "max_output_tokens": 1024,
            }
            
            # Generate response
            response = self.model.generate_content(
                prompt,
                generation_config=generation_config
            )
            
            # Check if response has text attribute
            if hasattr(response, 'text'):
                return response.text
            elif isinstance(response, dict) and 'candidates' in response:
                # Some versions of the API return differently structured responses
                return response['candidates'][0]['content']['parts'][0]['text']
            else:
                # Fallback for other response structures
                logger.warning(f"Unexpected response structure: {type(response)}")
                return str(response)
                
        except Exception as e:
            logger.error(f"Error generating answer with Gemini: {e}")
            return f"I encountered an error while generating an answer: {str(e)}. Please try again or check your API key and configuration."
    
    def answer_question(self, query):
        """Generate an answer to a question using the RAG approach."""
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
        
        # Generate answer using Gemini
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
    # First check for API key in environment
    api_key = os.environ.get("GOOGLE_API_KEY")
    
    if not api_key:
        # Prompt for API key if not in environment
        import getpass
        print("Google API key not found in environment variable GOOGLE_API_KEY")
        api_key = getpass.getpass("Please enter your Google API key: ")
    
    try:
        rag_system = EnhancedRAGSystem(api_key=api_key)
        
        # Ask a question
        query = "How can I be fit after breast cancer?"
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
    except Exception as e:
        print(f"\nError initializing or running the RAG system: {e}")
        print("\nPlease ensure you have:")
        print("1. A valid Google AI API key (from https://makersuite.google.com/)")
        print("2. The google-generativeai package installed (pip install google-generativeai)")
        print("3. Access to the Gemini model in your region/account")
        print("\nAvailable models from your API key:")
        try:
            models = genai.list_models()
            for model in models:
                print(f"- {model.name}")
        except Exception as model_e:
            print(f"Could not list models: {model_e}")

if __name__ == "__main__":
    main()