from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# This allows your React Native app to talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class SubstitutionRequest(BaseModel):
    ingredient: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Baking Buddy API!"}

@app.post("/substitutions")
def get_substitution(request: SubstitutionRequest):
    chat_completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": f"""I am baking and I don't have {request.ingredient}. 
        Give me exactly 3 substitutions in this exact JSON format, no other text:
        {{
            "substitutes": [
                {{
                    "name": "substitute name",
                    "ratio": "1 egg = 1 tbsp ground flax + 3 tbsp water",
                    "description": "short description of when to use it",
                    "best": true
                }},
                {{
                    "name": "substitute name", 
                    "ratio": "ratio here",
                    "description": "short description",
                    "best": false
                }},
                {{
                    "name": "substitute name",
                    "ratio": "ratio here", 
                    "description": "short description",
                    "best": false
                }}
            ]
        }}"""}]
    )
    import json
    raw = chat_completion.choices[0].message.content
    clean = raw.replace("```json", "").replace("```", "").strip()
    return json.loads(clean)