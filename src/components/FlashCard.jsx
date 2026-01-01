import { useState } from "react";
import "../css/FlashCard.css";

function FlashCard({ card_front, card_back, newDeck }) {
  const [flipped, setFlipped] = useState(false);

  function cardClicked() {
    setFlipped((f) => !f);
  }

  if (newDeck) {
    return <div className="flash-card">{card_front}</div>;
  }

  return (
    <div className="flash-card" onClick={cardClicked}>
      <div className={`flash-card-inner ${flipped ? "is-flipped" : ""}`}>
        <div className="flash-card-face flash-card-front">{card_front}</div>
        <div className="flash-card-face flash-card-back">{card_back}</div>
      </div>
    </div>
  );
}

export default FlashCard;
