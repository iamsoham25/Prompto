from pydantic import BaseModel
from typing import List

class LessonCreate(BaseModel):

    title: str
    description: str
    level: str
    content: str

    quiz_question: str
    quiz_options: List[str]
    quiz_answer: str

    order: int