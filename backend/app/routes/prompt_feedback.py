from fastapi import APIRouter

from app.services.prompt_feedback import (
    generate_feedback
)

router = APIRouter()


@router.post("/prompt-feedback")
async def prompt_feedback_api(
    data: dict
):

    prompt = data.get(
        "prompt",
        ""
    )

    result = generate_feedback(
        prompt
    )

    return {
        "success": True,
        **result
    }