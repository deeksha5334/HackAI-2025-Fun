# usage.py
import logging
from src.rag.retrieval import RAGSystem

# Configure logging
logging.basicConfig(level=logging.INFO)

def main():
    # Initialize the free RAG system
    rag_system = RAGSystem()
    
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