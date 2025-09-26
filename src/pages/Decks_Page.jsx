import FlashCard from "../components/FlashCard"
import Deck from "../components/Deck"
import "../css/Decks_Page.css";


function Decks_Page({ deck_array, Dselected_deck, selectedDeck }) {
  return (
    <div className="deck-bar">
      {deck_array.map(deck => (
        <button
          key={deck.id}
          className={`deck-button ${selectedDeck === deck.deck_name ? "active" : ""}`}
          onClick={() => Dselected_deck(deck.deck_name)}
        >
          {deck.deck_name}
        </button>
      ))}
    </div>
  );
}


export default Decks_Page;