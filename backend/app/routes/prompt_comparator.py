from fastapi import APIRouter

from app.services.prompt_comparator import compare_prompts

router = APIRouter(tags=["Prompt Comparator"])


@router.post("/compare-prompts")
async def compare_prompt_api(data: dict):

    prompt_a = data.get("prompt_a", "")
    prompt_b = data.get("prompt_b", "")

    result = compare_prompts(
        prompt_a,
        prompt_b
    )

    return {
        "success": True,
        "comparison": result
    }