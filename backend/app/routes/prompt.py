from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class PromptRequest(BaseModel):
    user_email: str
    prompt: str

@router.post("/generate")
async def generate_response(data: PromptRequest):
    user_prompt = data.prompt

    return {
        "success": True,
        "prompt": user_prompt,
        "response": f"AI Response for: {user_prompt}"
    }