import FlashCard from "../components/FlashCard"
import { useEffect } from "react";
import "../css/Current_Deck.css";
import NewDeckForm from "./NewDeckForm";
import NewCardForm from "./NewCardForm";

function Current_Deck({ deck, currentIndex, setCurrentIndex, selectedDeck, Dselected_deck, addDeck, addCard, pendingCardDeck, setPendingCardDeck, mode, setMode }) {
  // if creating a new deck, render the NewDeckForm
  if (mode === "create-deck") {
    return (
      <div className="deck-container">
        <NewDeckForm
          addDeck={async (newDeck) => {
            await addDeck(newDeck);
            Dselected_deck(newDeck.deck_name);
            setMode("view");          
          }}
        />
      </div>
    );
  }

  // if adding a new card, render the NewCardForm
  if (mode === "create-card") {
    return (
      <div className="card-container">
        <NewCardForm
          addCard={async (deckName, card) => {
            await addCard(deckName, card);
            Dselected_deck(deckName);
            setPendingCardDeck('');
            setMode("view");         
          }}
          deckName={pendingCardDeck}
          newDeck={true}
        />
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

