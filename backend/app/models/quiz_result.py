from pydantic import BaseModel
from datetime import datetime


class QuizResult(BaseModel):

    user_email: str

    lesson_id: str

    score: int

    total: int

    percentage: float

    xp_earned: int

    completed_at: datetime = datetime.utcnow()