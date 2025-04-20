# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# Create the Flask application
app = Flask(__name__)
CORS(app)

# Embedded simple RAG system for hackathon purposes
class EnhancedRAGSystem:
    def __init__(self, api_key=None):
        self.api_key = api_key
        print(f"Initialized EnhancedRAGSystem {'with API key' if api_key else 'without API key'}")
    
    def answer_question(self, question):
        """
        Simple mock implementation for the RAG system.
        """
        responses = {
            "side effect": "Managing side effects is crucial for your well-being. Common approaches include staying hydrated, getting adequate rest, maintaining light physical activity as tolerated, and taking medications as prescribed. Always report persistent or severe side effects to your healthcare team immediately.",
            
            "appointment": "At your next appointment, your doctor will likely review your progress, discuss any symptoms, and may order tests to monitor your treatment response. Come prepared with questions written down and consider bringing a support person to help remember information shared during the visit.",
            
            "anxious": "Feeling anxious is a natural response to your diagnosis. Many patients find relief through speaking with mental health professionals who specialize in cancer care, joining support groups, practicing mindfulness techniques, or gentle yoga. Your care team can provide referrals to appropriate resources.",
            
            "support group": "Support groups offer valuable emotional connection with others going through similar experiences. HerHope has partnerships with both in-person and virtual support communities. Would you like me to help you find one that matches your specific needs?",
            
            "treatment": "Your treatment plan is uniquely designed for your specific diagnosis. While I can provide general information about different treatment approaches, your healthcare team is the best source for details about your personal care plan and what to expect."
        }
        
        # Default response
        default_response = "I'm here to support you through every step of your journey. While I aim to provide helpful information, remember that your healthcare team is the best source for medical advice specific to your situation. How else can I assist you today?"
        
        # Check for keywords in the question
        for keyword, response in responses.items():
            if keyword.lower() in question.lower():
                return response
                
        return default_response

# Initialize RAG system once at startup
api_key = os.environ.get("GOOGLE_API_KEY")
rag_system = EnhancedRAGSystem(api_key=api_key)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    
    if not message:
        return jsonify({"message": "No message provided"}), 400
        
    response = rag_system.answer_question(message)
    return jsonify({"message": response})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)