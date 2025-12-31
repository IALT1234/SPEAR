import { useState } from "react";
import FlashCard from "../components/FlashCard";
import "../css/NewCardForm.css"; // reuse same styling

export default function EditCardForm({ initialFront, initialBack, onSave, onCancel }) {
  const [front, setFront] = useState(initialFront || "");
  const [back, setBack] = useState(initialBack || "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!front.trim()) return;
    onSave({ front: front.trim(), back });
  }

  return (
    <FlashCard
      card_front={
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

          <button className="new-card-form-section new-card-form_input_ADD" type="submit">
            Save
          </button>

        </form>
      }
      card_back=" "
      newDeck={true}
    />
  );
}
