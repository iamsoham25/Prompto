from pydantic import BaseModel

class PromptTemplate(BaseModel):

    title: str

    category: str

    description: str

    prompt: str

    difficulty: str