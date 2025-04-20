import google.generativeai as genai

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
            genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))
        
        # Initialize the model
        self.model = genai.GenerativeModel('gemini-pro')
        logger.info("Initialized enhanced RAG system with Gemini Pro")
    
    def generate_answer(self, prompt):
        """
        Generate an answer using Gemini.
        
        Args:
            prompt: The formatted prompt
            
        Returns:
            The generated answer
        """
        response = self.model.generate_content(prompt)
        return response.text