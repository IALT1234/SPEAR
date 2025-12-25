from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Deck, User
from schemas import DeckCreate, DeckOut, DeckUpdate
from dependencies import get_current_user

router = APIRouter(prefix="/decks", tags=["decks"])


@router.get("", response_model=list[DeckOut])
def list_decks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(Deck).filter(Deck.user_id == current_user.id).all()


@router.post("", response_model=DeckOut)
def create_deck(
    payload: DeckCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deck = Deck(user_id=current_user.id, title=payload.title)
    db.add(deck)
    db.commit()
    db.refresh(deck)
    return deck



@router.put("/{deck_id}", response_model=DeckOut)
def update_deck(
    deck_id: int,
    payload: DeckUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deck = (
        db.query(Deck)
        .filter(Deck.id == deck_id, Deck.user_id == current_user.id)
        .first()
    )
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")

    deck.title = payload.title
    db.commit()
    db.refresh(deck)
    return deck


@router.delete("/{deck_id}", status_code=204)
def delete_deck(
    deck_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deck = (
        db.query(Deck)
        .filter(Deck.id == deck_id, Deck.user_id == current_user.id)
        .first()
    )
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")

    db.delete(deck)
    db.commit()
    return
