from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# OpenRouter Client
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

# Request Model
class PromptRequest(BaseModel):
    prompt: str

# Generate Route
@router.post("/generate")
async def generate_response(data: PromptRequest):

    try:

        completion = client.chat.completions.create(

            model="openai/gpt-3.5-turbo",

            messages=[
                {
                    "role": "system",
                    "content": "You are an expert AI tutor."
                },
                {
                    "role": "user",
                    "content": data.prompt
                }
            ]

        )

        ai_response = completion.choices[0].message.content

        return {
            "success": True,
            "response": ai_response
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }