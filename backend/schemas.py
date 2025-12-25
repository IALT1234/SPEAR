from pydantic import BaseModel, EmailStr, Field
from typing import List

#=============================== AUTH =============================
class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


#=============================== DECKS =============================
class DeckCreate(BaseModel):
    title: str


class DeckOut(BaseModel):
    id: int
    title: str

    class Config:
        from_attributes = True


#=============================== CARDS =============================
class CardCreate(BaseModel):
    front: str
    back: str


class CardOut(BaseModel):
    id: int
    front: str
    back: str

    class Config:
        from_attributes = True


class DeckUpdate(BaseModel):
    title: str