from fastapi import APIRouter

from app.config.db import db

from app.schemas.template_schema import (
    PromptTemplate
)

router = APIRouter()

templates_collection = db[
    "prompt_templates"
]

@router.post("/prompt-template")
async def create_template(
    template: PromptTemplate
):

    await templates_collection.insert_one(
        template.dict()
    )

    return {
        "success": True
    }

@router.get("/prompt-templates")
async def get_templates():

    templates = []

    async for item in templates_collection.find():

        item["_id"] = str(
            item["_id"]
        )

        templates.append(item)

    return {
        "success": True,
        "templates": templates
    }