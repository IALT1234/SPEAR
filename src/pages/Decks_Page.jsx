import FlashCard from "../components/FlashCard"
import Deck from "../components/Deck"


function Decks_Page({ deck_array, Dselected_deck }) {




    return (
        <select onChange={(e) => Dselected_deck(e.target.value)} defaultValue="">
        <option value="" disabled>Select a Deck</option>
        {deck_array.map(deck => (
            <option key={deck.id} value={deck.deck_name}>
            {deck.deck_name}
            </option>
        ))}
        </select>
    );
}

export default Decks_Page