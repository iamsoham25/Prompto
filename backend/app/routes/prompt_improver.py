from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

@router.post("/improve-prompt")
async def improve_prompt(data: PromptRequest):

    improved = f"""
Act as an expert professional.

Task:
{data.prompt}

Requirements:
- Give detailed explanation
- Use examples
- Use clear structure
- Add bullet points
- Add real-world applications
"""

    return {
        "success": True,
        "improved_prompt": improved
    }