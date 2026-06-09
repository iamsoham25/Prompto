from pydantic import BaseModel

class LearningStreak(BaseModel):
    user_email: str