from fastapi import APIRouter
from app.schemas.user_schema import UserSignup, UserLogin
from app.config.db import db
from app.utils.hash import hash_password, verify_password
from app.utils.jwt import create_access_token

router = APIRouter()

users_collection = db["users"]

@router.post("/signup")
async def signup(user: UserSignup):

    existing_user = await users_collection.find_one({
        "email": user.email
    })

    if existing_user:
        return {
            "success": False,
            "message": "User already exists"
        }

    hashed_password = hash_password(user.password)

    user_data = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    }

    await users_collection.insert_one(user_data)

    return {
        "success": True,
        "message": "User created successfully"
    }

@router.post("/login")
async def login(user: UserLogin):

    existing_user = await users_collection.find_one({
        "email": user.email
    })

    if not existing_user:
        return {
            "success": False,
            "message": "User not found"
        }

    valid_password = verify_password(
        user.password,
        existing_user["password"]
    )

    if not valid_password:
        return {
            "success": False,
            "message": "Invalid password"
        }

    token = create_access_token({
        "user_id": str(existing_user["_id"]),
        "email": existing_user["email"]
    })

    return {
    "success": True,
    "token": token,
    "email": existing_user["email"],
    "username": existing_user["username"]
   }
