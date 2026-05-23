from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def root():
    return {"message": "Prompto Backend Running Successfully"}

@app.post("/generate")
async def generate_response(data: PromptRequest):
    
    user_prompt = data.prompt

    # Fake AI Response (Real AI later)
    ai_response = f"AI Response for: {user_prompt}"

    return {
        "success": True,
        "response": ai_response
    }