import { useState } from "react";
import "../css/FlashCard.css";

function FlashCard({ card_front, card_back, newDeck, onAnswer }) {
  const [flipped, setFlipped] = useState(false);

  function cardClicked() {
    setFlipped((f) => !f);
  }

  function handleAnswer(e, isCorrect) {
    e.stopPropagation(); 
    if (typeof onAnswer === "function") onAnswer(isCorrect);
    console.log("answered:", isCorrect);
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

      {/* Answer buttons overlay */}
      <div className="flash-card-answer-bar" onClick={(e) => e.stopPropagation()}> 
        
        <button 
          type="button" 
          className="flash-card-answer-btn wrong" 
          onClick={(e) => handleAnswer(e, false)}
          aria-label="Mark wrong"
          title="Wrong"
        >
          Wrong
        </button>

        <button
          type="button"
          className="flash-card-answer-btn correct"
          onClick={(e) => handleAnswer(e, true)}
          aria-label="Mark correct"
          title="Correct"
        >
          Correct
        </button>


      </div>
    </div>
  );
}

export default FlashCard;
