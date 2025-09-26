import FlashCard from "../components/FlashCard"
import { useState } from "react";
import "../css/Current_Deck.css";

function Current_Deck({ deck }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!deck) return <p>Please select a deck</p>;

  const cards = deck.app_deck_array;
  const total = cards.length;

  function nextCard() {
    setCurrentIndex((prev) => (prev + 1) % total); // loop forward
  }

  function prevCard() {
    setCurrentIndex((prev) => (prev - 1 + total) % total); // loop backward
  }

  return (
    <div className="deck-container">
      {/* Left arrow */}
      <div className="nav-button left" onClick={prevCard}></div>

      <FlashCard
        key={cards[currentIndex].id}
        card_front={cards[currentIndex].front}
        card_back={cards[currentIndex].back}
      />

      {/* Right arrow */}
      <div className="nav-button right" onClick={nextCard}></div>
    </div>
  );
}

export default Current_Deck;
