from fastapi import APIRouter

from app.config.db import db

from app.schemas.lesson_schema import LessonCreate

router = APIRouter()

lessons_collection = db["lessons"]

# Create Lesson
@router.post("/lessons")

async def create_lesson(lesson: LessonCreate):

    lesson_data = lesson.dict()

    await lessons_collection.insert_one(lesson_data)

    return {
        "success": True,
        "message": "Lesson created successfully"
    }

# Get All Lessons
@router.get("/lessons")

async def get_lessons():

    lessons = []

    async for lesson in lessons_collection.find():

        lessons.append({
            "id": str(lesson["_id"]),
            "title": lesson["title"],
            "description": lesson["description"],
            "level": lesson["level"],
            "content": lesson["content"]
        })

    return {
        "success": True,
        "lessons": lessons
    }