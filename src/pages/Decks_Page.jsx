import FlashCard from "../components/FlashCard"
import Deck from "../components/Deck"


function Decks_Page({deck_array}){


    return ( 
    
        <div className="decks"> 

            {deck_array.map((deck_array) => (
                <Deck deck_name={deck_array.deck_name} cards={deck_array.app_deck_array} key={deck_array.id} />
            ))}
        </div>

    );
}

export default Decks_Page