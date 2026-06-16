from fastapi import APIRouter

router = APIRouter()

@router.post("/prompt/submit")
async def submit_prompt():

    return {
        "success": True
    }