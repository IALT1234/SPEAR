import { useState } from "react";

function NewCardForm({ addCard, deckName }) {
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
  );
}

export default NewCardForm;
