import { useState } from "react";
import FlashCard from "../components/FlashCard";

function NewCardForm({ addCard, deckName, newDeck }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!front.trim()) return;

    addCard(deckName, {
      id: Date.now(),
      front,
      back,
    });

    setFront("");
    setBack("");
  }

  return (
    <FlashCard card_front=

    {
    <form onSubmit={handleSubmit} className="new-card-form">
      <input
        type="text"
        placeholder="Front"
        value={front}
        onChange={(e) => setFront(e.target.value)}
      />
      <input
        type="text"
        placeholder="Back"
        value={back}
        onChange={(e) => setBack(e.target.value)}
      />
      <button type="submit">Add Card</button>
    </form>
    }

    card_back=" "

    newDeck={true}
    ></FlashCard>
  );
}

export default NewCardForm;
