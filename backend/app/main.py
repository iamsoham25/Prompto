from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from app.config.db import db
from app.routes.auth import router as auth_router
from app.routes.lesson import router as lesson_router
from app.routes.playground import router as playground_router
from app.routes.chat import router as chat_router
from app.routes.challenge import router as challenge_router
from app.routes.conversation import router as conversation_router
from app.routes.prompt_evaluator import (router as evaluator_router)
from app.routes.prompt_improver import (router as improver_router)
from app.routes.prompt_feedback import (router as feedback_router)
from app.routes.prompt_coach import (router as coach_router)
from app.routes.prompt_recommender import (router as recommender_router)
from app.routes.challenge_validator import (router as challenge_router)
from app.routes.dashboard import (router as dashboard_router)
from app.routes import prompt_comparator
from app.routes import prompt_templates

import requests
import os


load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(lesson_router)
app.include_router(playground_router)
app.include_router(chat_router)
app.include_router(challenge_router)
app.include_router(conversation_router)
app.include_router(evaluator_router)
app.include_router(improver_router)
app.include_router(feedback_router)
app.include_router(coach_router)
app.include_router(recommender_router)
app.include_router(challenge_router)
app.include_router(dashboard_router)
app.include_router(prompt_comparator.router)
app.include_router(prompt_templates.router)

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def root():
    return {
        "message": "Prompto Backend Running Successfully"
    }

@app.get("/test-db")
async def test_db():
    return {
        "message": "MongoDB Connected Successfully"
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