from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# ==========================
# DATABASE
# ==========================

from app.config.db import db


# ==========================
# ROUTERS
# ==========================

from app.routes.auth import router as auth_router

from app.routes.lesson import router as lesson_router

from app.routes.playground import router as playground_router

from app.routes.chat import router as chat_router

from app.routes.challenge import router as challenge_router

from app.routes.conversation import router as conversation_router

from app.routes.prompt_evaluator import router as evaluator_router

from app.routes.prompt_improver import router as improver_router

from app.routes.prompt_feedback import router as feedback_router

from app.routes.prompt_coach import router as prompt_coach_router

from app.routes.prompt_recommender import router as recommender_router

from app.routes.dashboard import router as dashboard_router

from app.routes.challenge_progress import router as challenge_progress_router

from app.routes.challenge_validator import (router as challenge_validator_router)

from app.routes.prompt_submission import (router as prompt_submission_router)

from app.routes.dashboard_v2 import (router as dashboard_v2_router)

from app.routes.achievements import (router as achievements_router)

from app.routes.ai_coach import (router as ai_coach_router)

from app.routes.prompt_trend import (router as prompt_trend_router)

from app.routes.prompt_comparator import (router as prompt_comparator_router)

from app.routes.analytics import (router as analytics_router)

from app.routes.prompt_history import (router as prompt_history_router)

from app.routes.challenge_submission import router as challenge_submission_router


# Module-based routers

from app.routes import prompt_templates
from app.routes import prompt_mentor
from app.routes import challenge_arena
from app.routes import xp
from app.routes import streak


# ==========================
# ENVIRONMENT VARIABLES
# ==========================

load_dotenv()


# ==========================
# FASTAPI APPLICATION
# ==========================

app = FastAPI(
    title="Prompto API",
    description="Backend API for the Prompto Prompt Engineering Learning Platform",
    version="1.0.0"
)


# ==========================
# CORS CONFIGURATION
# ==========================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ==========================
# CORE ROUTERS
# ==========================

app.include_router(auth_router)

app.include_router(lesson_router)

app.include_router(playground_router)

app.include_router(chat_router)

app.include_router(conversation_router)

app.include_router(challenge_router)

app.include_router(challenge_submission_router)


# ==========================
# PROMPT AI ROUTERS
# ==========================

app.include_router(evaluator_router)

app.include_router(improver_router)

app.include_router(feedback_router)

app.include_router(recommender_router)

app.include_router(prompt_coach_router)

app.include_router(prompt_comparator_router)

app.include_router(prompt_history_router)


# ==========================
# TEMPLATE & MENTOR ROUTERS
# ==========================

app.include_router(prompt_templates.router)

app.include_router(prompt_mentor.router)


# ==========================
# CHALLENGE ROUTERS
# ==========================

app.include_router(challenge_arena.router)

app.include_router(challenge_validator_router)

app.include_router(prompt_submission_router)

app.include_router(challenge_progress_router)


# ==========================
# DASHBOARD ROUTERS
# ==========================

app.include_router(dashboard_router)

app.include_router(
    dashboard_v2_router,
    prefix="/dashboard",
    tags=["Dashboard V2"]
)


# ==========================
# GAMIFICATION ROUTERS
# ==========================

app.include_router(xp.router)

app.include_router(streak.router)

app.include_router(achievements_router)


# ==========================
# ANALYTICS ROUTERS
# ==========================

app.include_router(prompt_trend_router)

app.include_router(analytics_router)

app.include_router(ai_coach_router)


# ==========================
# ROOT ENDPOINT
# ==========================

@app.get(
    "/",
    tags=["System"]
)
def root():

    return {
        "success": True,
        "message": "Prompto Backend Running Successfully"
    }


# ==========================
# DATABASE TEST ENDPOINT
# ==========================

@app.get(
    "/test-db",
    tags=["System"]
)
async def test_db():

    return {
        "success": True,
        "message": "MongoDB Connected Successfully"
    }