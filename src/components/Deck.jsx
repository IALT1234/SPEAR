import { useState } from "react";
import FlashCard from "./FlashCard";

function Deck({ deck_name, cards = [] }) {

    
    const [selected, setSelected] = useState(false);

    function deckSelected() {
        setSelected(f => true);
    }

    

    return ( 
        <div className="deck">


        <button className={`deck${selected ? ' flipped' : ''}`} onClick={deckSelected}>
            
            {selected ? 
                
                <div className="deck"> 
                    <div className="cards-grid">
                        {cards.map((card) => (
                            <FlashCard card_front={card.front} card_back={card.back} key={card.id} />
                        ))}
                    </div>
                </div>
                    
            : deck_name
            
            }

        </button>

        </div>

    );

}


export default Deck