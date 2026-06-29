from pydantic import BaseModel


class QuizSubmission(BaseModel):

    user_email: str

    lesson_id: str

    score: int

    total: int