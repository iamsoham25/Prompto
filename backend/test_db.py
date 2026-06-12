from app.config.db import db
import asyncio

async def test():

    collections = await db.list_collection_names()

    print(collections)

asyncio.run(test())