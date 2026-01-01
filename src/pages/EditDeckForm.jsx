import { useState } from "react";
import FlashCard from "../components/FlashCard";
import "../css/NewDeckForm.css"; // reuse same styling

export default function EditDeckForm({ initialName, onSave, onCancel }) {
  const [name, setName] = useState(initialName || "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim());
  }

  return (
    <FlashCard
      card_front={
        <form onSubmit={handleSubmit} className="new-deck-form">
          <input
            className="new-deck-form-section new-deck-form_input"
            type="text"
            placeholder="Deck name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="new-deck-form-section new-deck-form_button" type="submit">
            Save
          </button>

        </form>
      }
      card_back=" "
      newDeck={true}
    />
  );
}
