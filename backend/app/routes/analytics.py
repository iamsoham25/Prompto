from fastapi import APIRouter
from app.config.db import db
from bson import ObjectId

router = APIRouter()

lessons_collection = db["lessons"]
lesson_completion_collection = db["lesson_completions"]
quiz_result_collection = db["quiz_results"]
user_xp_collection = db["user_xp"]
streak_collection = db["user_learning_streak"]


@router.get("/lesson-analytics/{email}")
async def lesson_analytics(email: str):

    # ==========================
    # LESSON PROGRESS
    # ==========================

    total_lessons = await lessons_collection.count_documents({})

    completed_lessons = await lesson_completion_collection.count_documents(
        {
            "user_email": email
        }
    )

    remaining_lessons = max(
        total_lessons - completed_lessons,
        0
    )

    progress = 0

    if total_lessons > 0:
        progress = round(
            (completed_lessons / total_lessons) * 100
        )

    # ==========================
    # QUIZ ANALYTICS
    # ==========================

    quiz_scores = []

    async for quiz in quiz_result_collection.find(
        {
            "user_email": email
        }
    ):

        quiz_scores.append(
            quiz.get("percentage", 0)
        )

    total_quiz_attempts = len(quiz_scores)

    average_quiz_score = 0

    best_quiz_score = 0

    if quiz_scores:

        average_quiz_score = round(
            sum(quiz_scores) / len(quiz_scores),
            2
        )

        best_quiz_score = max(
            quiz_scores
        )

    # ==========================
    # USER XP
    # ==========================

    xp_doc = await user_xp_collection.find_one(
        {
            "user_email": email
        }
    )

    xp = 0

    if xp_doc:

        xp = xp_doc.get(
            "xp",
            0
        )

    # ==========================
    # USER LEVEL
    # ==========================

    if xp < 500:

        level = "Beginner"

    elif xp < 1500:

        level = "Intermediate"

    elif xp < 3000:

        level = "Advanced"

    elif xp < 5000:

        level = "Expert"

    else:

        level = "Master"

    # ==========================
    # STREAK
    # ==========================

    streak_doc = await streak_collection.find_one(
        {
            "user_email": email
        }
    )

    learning_streak = 0

    if streak_doc:

        learning_streak = streak_doc.get(
            "current_streak",
            0
        )

    # ==========================
    # NEXT LESSON
    # ==========================

    completed_ids = []

    async for lesson in lesson_completion_collection.find(
        {
            "user_email": email
        }
    ):

        completed_ids.append(
            lesson["lesson_id"]
        )

    recommended_lesson = None

    async for lesson in lessons_collection.find().sort(
        "order",
        1
    ):

        if str(lesson["_id"]) not in completed_ids:

            recommended_lesson = {

                "id": str(
                    lesson["_id"]
                ),

                "title": lesson["title"]

            }

            break

    # ==========================
    # ESTIMATED TIME
    # ==========================

    minutes_left = remaining_lessons * 15

    hours = minutes_left // 60

    minutes = minutes_left % 60

    if hours > 0:

        estimated_completion = f"{hours} hr {minutes} mins"

    else:

        estimated_completion = f"{minutes} mins"

    # ==========================
    # RESPONSE
    # ==========================

    return {

        "success": True,

        "completed_lessons": completed_lessons,

        "remaining_lessons": remaining_lessons,

        "overall_progress": progress,

        "average_quiz_score": average_quiz_score,

        "best_quiz_score": best_quiz_score,

        "total_quiz_attempts": total_quiz_attempts,

        "xp": xp,

        "level": level,

        "streak": learning_streak,

        "estimated_completion": estimated_completion,

        "recommended_lesson": recommended_lesson

    }