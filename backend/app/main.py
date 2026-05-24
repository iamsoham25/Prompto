from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

import requests
import os

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
print(OPENROUTER_API_KEY)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def root():
    return {
        "message": "Prompto Backend Running Successfully"
    }

@app.post("/generate")
async def generate_response(data: PromptRequest):

    user_prompt = data.prompt

    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",

        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },

        json={
            "model": "openai/gpt-3.5-turbo",

            "messages": [
                {
                    "role": "user",
                    "content": user_prompt
                }
            ]
        }
    )

    result = response.json()

    print(result)

    if "choices" not in result:
        return {
        "success": False,
        "error": result
    }

    ai_response = result["choices"][0]["message"]["content"]

    return {
    "success": True,
    "response": ai_response
    }