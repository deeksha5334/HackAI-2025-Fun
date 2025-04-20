# In your retrieval.py or a new file like llm_integration.py
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

class EnhancedRAGSystem:
    def __init__(self):
        # Initialize the vector store
        self.vector_store = VectorStore()
        
        # Initialize the LLM
        self.tokenizer = AutoTokenizer.from_pretrained("your-preferred-model")
        self.model = AutoModelForCausalLM.from_pretrained("your-preferred-model")
        
    def prepare_prompt(self, question, contexts):
        """Format the prompt for the LLM."""
        prompt = f"""Answer the question about breast cancer based on the following information:

Question: {question}

Retrieved Information:
"""
        
        # Add retrieved contexts
        for i, context in enumerate(contexts, 1):
            prompt += f"\nDocument {i}:\n{context['text']}\n"
        
        prompt += "\nBased on the above information, please provide a comprehensive and accurate answer:"
        
        return prompt
    
    def generate_answer(self, prompt):
        """Generate an answer using the LLM."""
        inputs = self.tokenizer(prompt, return_tensors="pt")
        outputs = self.model.generate(
            inputs.input_ids,
            max_length=500,
            temperature=0.7,
            top_p=0.9,
            num_return_sequences=1
        )
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Extract just the generated answer part
        if "Based on the above information, please provide a comprehensive and accurate answer:" in response:
            response = response.split("Based on the above information, please provide a comprehensive and accurate answer:")[1].strip()
        
        return response
    
    def answer_question(self, question):
        """Answer a question using the RAG approach."""
        # Retrieve relevant documents
        relevant_docs = self.vector_store.search(question, k=3)
        
        # Prepare the prompt
        prompt = self.prepare_prompt(question, relevant_docs)
        
        # Generate the answer
        answer = self.generate_answer(prompt)
        
        return answer