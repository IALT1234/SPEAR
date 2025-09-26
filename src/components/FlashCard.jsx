import { useState } from "react";
import "../css/FlashCard.css";

function FlashCard({ card_front, card_back }) {
  const [flipped, setFlipped] = useState(false);

  function cardClicked() {
    setFlipped((f) => !f);
  }

  return (
    <div className="flash-card" onClick={cardClicked}>
      {flipped ? card_back : card_front}
    </div>
  );
}

export default FlashCard;
