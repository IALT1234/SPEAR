import { useState } from 'react';

function FlashCard({card_front, card_back}) {
    const [flipped, setFlipped] = useState(false);

    function cardClicked() {
        setFlipped(f => !f);
    }

    return (
        <div className="flash-card">
            <button className={`flash-card-front${flipped ? ' flipped' : ''}`} onClick={cardClicked}>
                {flipped ? card_back : card_front}
            </button>
        </div>
    );
}

export default FlashCard