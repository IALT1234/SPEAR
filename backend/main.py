from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routers import decks, cards, study
from routers.auth_routes import router as auth_router






# create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/health")
def health():
    return {"status": "still ok"}

app.include_router(decks.router)
app.include_router(cards.router)
app.include_router(study.router)

app.include_router(auth_router)

