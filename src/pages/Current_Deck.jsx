import FlashCard from "../components/FlashCard"
import { useEffect } from "react";
import "../css/Current_Deck.css";
import NewDeckForm from "./NewDeckForm";
import NewCardForm from "./NewCardForm";

function Current_Deck({ deck, currentIndex, setCurrentIndex, selectedDeck, Dselected_deck, addDeck, addCard, pendingCardDeck, setPendingCardDeck }) {
  // if creating a new deck, render the NewDeckForm
  if (selectedDeck === 'NEW_DECK') {
    return (
      <div className="deck-container">
        <NewDeckForm addDeck={(newDeck) => { addDeck(newDeck); Dselected_deck(newDeck.deck_name); }} />
      </div>
    );
  }

  // if adding a new card, render the NewCardForm
  if (selectedDeck === 'NEW_CARD') {
    return (
      <div className="card-container">
        <NewCardForm addCard={(deckName, card) => {
          addCard(deckName, card);
          // after adding the card, select the deck and clear pending
          Dselected_deck(deckName);
          setPendingCardDeck('');
        }} deckName={pendingCardDeck} newDeck={true} />
      </div>
    );
  }

  if (!deck) return <p>Please select a deck</p>;

  const cards = deck.app_deck_array ?? [];
  const total = cards.length;

  useEffect(() => {
    if (currentIndex >= total && total > 0) {
      setCurrentIndex(total - 1);
    }
  }, [total, currentIndex, setCurrentIndex]);

  if (total < 1) return <p>This deck has no cards yet. Add some!</p>;

  function nextCard() {
    setCurrentIndex((prev) => (prev + 1) % total);
  }

  function prevCard() {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }
  const safeIndex = Math.min(currentIndex, total - 1);

  return (
    <div className="deck-container">
      <div className="nav-button left" onClick={prevCard}></div>

      <FlashCard
        key={cards[safeIndex].id}
        card_front={cards[safeIndex].front}
        card_back={cards[safeIndex].back}
      />

      <div className="nav-button right" onClick={nextCard}></div>
    </div>
  );
}

export default Current_Deck;

