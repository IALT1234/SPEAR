from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
import httpx

from dependencies import get_current_user
from models import User

router = APIRouter(prefix="/study", tags=["study"])

# C# URL 
CSHARP_BASE = "http://127.0.0.1:5055"


class AnswerEvent(BaseModel):
    deck_id: int
    card_id: int
    correct: bool


@router.post("/answer")
async def log_answer(payload: AnswerEvent, current_user: User = Depends(get_current_user)):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{CSHARP_BASE}/study/answer",
                json={
                    "userId": current_user.id,
                    "deckId": payload.deck_id,
                    "cardId": payload.card_id,
                    "isCorrect": payload.correct,
                },
                timeout=5.0,
            )
            response.raise_for_status()
            return response.json()
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"C# service is unavailable: {str(e)}",
        )
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"C# service error: {e.response.text}",
        )


@router.get("/stats")
async def get_stats(
    range: str = Query(..., description="Time range: daily, weekly, or monthly"),
    current_user: User = Depends(get_current_user),
):
    if range not in ["daily", "weekly", "monthly"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid range. Use: daily, weekly, or monthly",
        )

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{CSHARP_BASE}/study/stats",
                params={"range": range, "userId": current_user.id},
                timeout=5.0,
            )
            response.raise_for_status()
            return response.json()
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"C# service is unavailable: {str(e)}",
        )
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"C# service error: {e.response.text}",
        )
