from fastapi import APIRouter

from app.services.prompt_history_service import (
    get_prompt_history,
    delete_prompt_history
)

router = APIRouter()


@router.get("/history/{email}")
async def history(email: str):

    data = await get_prompt_history(email)

    return {
        "success": True,
        "history": data
    }


@router.delete("/history/{history_id}")
async def delete_history(history_id: str):

    await delete_prompt_history(history_id)

    return {
        "success": True
    }