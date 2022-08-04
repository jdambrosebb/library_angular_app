from fastapi import FastAPI
import uvicorn
from sqlmodel import SQLModel
from fastapi.middleware.cors import CORSMiddleware
from db import engine
from router import book_router, author_router

app = FastAPI(title="Book Server")
app.include_router(book_router.router)
app.include_router(author_router.router)

origins = [
    "http://localhost:8000",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    """Creates database"""
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    uvicorn.run("book_server:app", reload=True)
