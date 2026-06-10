from fastapi import APIRouter

from app.services.prompt_improver import (
    improve_prompt
)

router = APIRouter()


@router.post("/improve-prompt")
async def improve_prompt_api(
    data: dict
):

    prompt = data.get(
        "prompt",
        ""
    )

    result = improve_prompt(
        prompt
    )

    return {
        "success": True,
        **result
    }