from fastapi import APIRouter

from app.services.prompt_mentor import (
    get_mentor_response
)

router = APIRouter()

@router.post("/ai-mentor")
async def ai_mentor(
    data: dict
):

    question = data.get(
        "question",
        ""
    )

    result = get_mentor_response(
        question
    )

    return {
        "success": True,
        "response": result
    }