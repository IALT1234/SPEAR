from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Card, Deck, User
from schemas import CardCreate, CardOut, CardUpdate
from dependencies import get_current_user


router = APIRouter(prefix="/cards", tags=["cards"])


@router.get("", response_model=list[CardOut])
def list_cards(
    deck_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deck = db.query(Deck).filter(Deck.id == deck_id, Deck.user_id == current_user.id).first()
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")

    return db.query(Card).filter(Card.deck_id == deck_id).all()


@router.post("", response_model=CardOut)
def create_card(
    deck_id: int,
    payload: CardCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deck = db.query(Deck).filter(Deck.id == deck_id, Deck.user_id == current_user.id).first()
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")

    card = Card(deck_id=deck_id, front=payload.front, back=payload.back)
    db.add(card)
    db.commit()
    db.refresh(card)
    return card


@router.put("/{card_id}", response_model=CardOut)
def update_card(
    card_id: int,
    payload: CardUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    card = (
        db.query(Card)
        .join(Deck)
        .filter(
            Card.id == card_id,
            Deck.user_id == current_user.id
        )
        .first()
    )

    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    card.front = payload.front
    card.back = payload.back
    db.commit()
    db.refresh(card)
    return card


@router.delete("/{card_id}", status_code=204)
def delete_card(
    card_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    card = (
        db.query(Card)
        .join(Deck)
        .filter(
            Card.id == card_id,
            Deck.user_id == current_user.id
        )
        .first()
    )

    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    db.delete(card)
    db.commit()
    return
