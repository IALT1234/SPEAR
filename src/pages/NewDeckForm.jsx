import { useState } from "react";

function NewDeckForm({ addDeck }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    addDeck({
      id: Date.now(), 
      deck_name: name,
      app_deck_array: [] 
    });

    setName(""); 
  }

  return (
    <form onSubmit={handleSubmit} className="new-deck-form">
      <input
        className="new-deck-form_input"
        type="text"
        placeholder="Enter deck name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Deck</button>
    </form>
  );
}

export default NewDeckForm;
