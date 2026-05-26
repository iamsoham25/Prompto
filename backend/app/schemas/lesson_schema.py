from pydantic import BaseModel

class LessonCreate(BaseModel):

    title: str

    description: str

    level: str

    content: str