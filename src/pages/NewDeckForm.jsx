import { useState } from "react";
import FlashCard from "../components/FlashCard";
import "../css/NewDeckForm.css";


function NewDeckForm({ addDeck }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    addDeck({
      deck_name: name,
    });

    setName(""); 
  }

  return (

    <FlashCard card_front=

    {
    <form onSubmit={handleSubmit} className="new-deck-form">
      <input
        className="new-deck-form-section new-deck-form_input"
        type="text"
        placeholder="Enter deck name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className = "new-deck-form-section new-deck-form_button" type="submit">Add Deck</button>
    </form>
    
  }  
    
  card_back=" "

  newDeck={true}
  />
  );
}

export default NewDeckForm;
