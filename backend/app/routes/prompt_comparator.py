from fastapi import APIRouter

from app.services.prompt_comparator import (
    compare_prompts
)

router = APIRouter()

@router.post("/compare-prompts")
async def compare_prompts_api(
    data: dict
):

    result = compare_prompts(

        data["prompt_a"],

        data["prompt_b"]

    )

    return {

        "success": True,

        "comparison": result

    }