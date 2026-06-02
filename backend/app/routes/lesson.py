from fastapi import APIRouter

from app.config.db import db

from app.schemas.lesson_schema import LessonCreate

from app.models.lesson_completion import LessonCompletion

router = APIRouter()

lessons_collection = db["lessons"]

lesson_completion_collection = db["lesson_completions"]

user_xp_collection = db["user_xp"]

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
            "content": lesson["content"],
            "quiz_question": lesson["quiz_question"],
            "quiz_options": lesson["quiz_options"],
            "quiz_answer": lesson["quiz_answer"]
        })

    return {
        "success": True,
        "lessons": lessons
    }
# Get Single Lesson

from bson import ObjectId

@router.get("/lessons/{lesson_id}")

async def get_lesson(lesson_id: str):

    lesson = await lessons_collection.find_one({
        "_id": ObjectId(lesson_id)
    })

    if not lesson:

        return {
            "success": False,
            "message": "Lesson not found"
        }

    return {
        "success": True,
        "lesson": {
        "id": str(lesson["_id"]),
        "title": lesson["title"],
        "description": lesson["description"],
        "level": lesson["level"],
        "content": lesson["content"],
        "quiz_question": lesson.get("quiz_question"),
        "quiz_options": lesson.get("quiz_options", []),
        "quiz_answer": lesson.get("quiz_answer")
    }
    }

@router.post("/complete-lesson")

async def complete_lesson(
    completion: LessonCompletion
):

    existing = await lesson_completion_collection.find_one({
        "user_email": completion.user_email,
        "lesson_id": completion.lesson_id
    })

    if existing:

        return {
            "success": False,
            "message": "Lesson already completed"
        }

    await lesson_completion_collection.insert_one({
        "user_email": completion.user_email,
        "lesson_id": completion.lesson_id,
        "xp_earned": completion.xp_earned
    })

    xp_record = await user_xp_collection.find_one({
        "user_email": completion.user_email
    })

    if xp_record:

        await user_xp_collection.update_one(
            {
                "user_email": completion.user_email
            },
            {
                "$inc": {
                    "xp": completion.xp_earned
                }
            }
        )

    else:

        await user_xp_collection.insert_one({
            "user_email": completion.user_email,
            "xp": completion.xp_earned
        })

    return {
        "success": True,
        "xp_earned": completion.xp_earned
    }

@router.get("/completed-lessons/{email}")

async def get_completed_lessons(
    email: str
):

    completed = []

    async for lesson in lesson_completion_collection.find(
        {
            "user_email": email
        }
    ):

        completed.append(
            lesson["lesson_id"]
        )

    return {
        "success": True,
        "completed_lessons": completed
    }

@router.get("/lesson-progress/{email}")
async def lesson_progress(email: str):

    print("DEBUG EMAIL:", email)

    total_lessons = await lessons_collection.count_documents({})

    completed_lessons = await lesson_completion_collection.count_documents(
        {
            "user_email": email
        }
    )

    print("DEBUG COMPLETED:", completed_lessons)

    progress = 0

    if total_lessons > 0:
        progress = int(
            (completed_lessons / total_lessons) * 100
        )

    return {
        "success": True,
        "total_lessons": total_lessons,
        "completed_lessons": completed_lessons,
        "progress": progress
    }

@router.get("/next-lesson/{lesson_id}")
async def get_next_lesson(
    lesson_id: str
):

    lessons = []

    async for lesson in lessons_collection.find():
        lessons.append(lesson)

    for index, lesson in enumerate(lessons):

        if str(lesson["_id"]) == lesson_id:

            if index + 1 < len(lessons):

                return {
                    "success": True,
                    "next_lesson_id": str(
                        lessons[index + 1]["_id"]
                    )
                }

    return {
        "success": False,
        "message": "Last lesson"
    }