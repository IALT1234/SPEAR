import FlashCard from "../components/FlashCard"
import Deck from "../components/Deck"


function Decks_Page(deck_array){


    const this_deck = [
        {id:1, front : "What is React?", back: "A JavaScript library for building user interfaces."},
        {id:2, front : "What is a component?", back: "A reusable piece of UI in React."},
        {id:3, front : "What is state in React?", back: "An object that determines how a component renders and behaves."},
    ]


    return ( 
    
        <div className="decks"> 
            <div className="deck-grid">
                <Deck deck_name = "React" cards = {this_deck} />
            </div>
        </div>

    );

}


export default Decks_Page