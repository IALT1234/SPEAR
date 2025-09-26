import FlashCard from "../components/FlashCard"
import Deck from "../components/Deck"

function Current_Deck({ deck }) {
  if (!deck) return <p>Please select a deck</p>;

  return (
    <>
      <Deck deck_name={deck.deck_name} cards={deck.app_deck_array} />
    </>
  );
}

export default Current_Deck