import { useState } from 'react';

function FlashCard({card_front, card_back}) {

    // State to track if the card is flipped or not
    const [flipped, setFlipped] = useState(false);

    function cardClicked() {
        setFlipped(f => !f);
    }

    return (
        <div className="flash-card">
            {/* This button uses the flipped boolean to show a side of the flashcard */}
            <button className={`flash-card-front${flipped ? ' flipped' : ''}`} onClick={cardClicked}>
                {flipped ? card_back : card_front}
            </button>
        </div>
    );
}

export default FlashCard