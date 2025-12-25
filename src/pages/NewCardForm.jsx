import { useState } from "react";
import FlashCard from "../components/FlashCard";
import "../css/NewCardForm.css";

function NewCardForm({ addCard, deckName, newDeck }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!front.trim()) return;

    addCard(deckName, { front, back });

    setFront("");
    setBack("");
  }

  return (
    <FlashCard card_front=

    {
    <form onSubmit={handleSubmit} className="new-card-form">
      <input
        className="new-card-form-section new-card-form_input_FRONT"
        type="text"
        placeholder="Front"
        value={front}
        onChange={(e) => setFront(e.target.value)}
      />
      <input
        className="new-card-form-section new-card-form_input_BACK"
        type="text"
        placeholder="Back"
        value={back}
        onChange={(e) => setBack(e.target.value)}
      />
      <button className = "new-card-form-section new-card-form_input_ADD" type="submit">Add Card</button>
    </form>
    }

    card_back=" "

    newDeck={true}
    ></FlashCard>
  );
}

export default NewCardForm;
