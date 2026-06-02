from pydantic import BaseModel

class LessonCompletion(BaseModel):
    user_email: str
    lesson_id: str
    xp_earned: int