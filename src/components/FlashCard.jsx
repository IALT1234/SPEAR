import { useState } from "react";
import "../css/FlashCard.css";

function FlashCard({ card_front, card_back, newDeck }) {
  const [flipped, setFlipped] = useState(false);

  function cardClicked() {
    setFlipped((f) => !f);
  }
  
  return (
    <>

    {newDeck ? (

      
      <div className="flash-card">
        {card_front}
      </div>

      ) : ( 

      <div className="flash-card" onClick={cardClicked}>
        {flipped ? card_back : card_front}
      </div>
      )
    
    }

    </>


  );
  
  
}

export default FlashCard;
