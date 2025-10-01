import FlashCard from "../components/FlashCard"
import Deck from "../components/Deck"
import "../css/Decks_Page.css";
import React, { useState, useEffect } from 'react';

import NewDeckForm from "./NewDeckForm";
import NewCardForm from "./NewCardForm";


function Decks_Page(props) {

  const [clicked_add_deck, setclicked_add_deck] = useState(false);
  const [clicked_add_card, setclicked_add_card] = useState(false);
  const [clicked_options, setclicked_options] = useState(false);

  function add_deck_clicked() {
    setclicked_add_deck(!clicked_add_deck);
    setclicked_add_card(false);

  }

  function add_card_clicked() {
    setclicked_add_card(!clicked_add_card);
    setclicked_add_deck(false);

  }


  function options_clicked() {
    setclicked_options(!clicked_options);
    setclicked_add_deck(false);
    setclicked_add_card(false);

  }




  function handleDeleteCard() {
    if (!props.selectedDeck) return;

    const deck = props.deck_array.find(d => d.deck_name === props.selectedDeck);
    if (deck && deck.app_deck_array.length > 0) {
      const currentCard = deck.app_deck_array[props.currentIndex];
      if (currentCard) {
        props.deleteCard(props.selectedDeck, currentCard.id);
      }
    }
  }

  return (
    <div>
      <div className="deck-bar">
        <div className="deck-buttons-wrapper">
          <div className="deck-buttons-container">
            {props.deck_array.map(deck => (
              <div className="deck-button-wrapper" key={deck.id}>
                <button
                  className={`deck-button ${props.Dselected_deck === deck.deck_name ? "active" : ""}`}
                  onClick={() => props.Dselected_deck(deck.deck_name)}
                >
                  {deck.deck_name}
                </button>
                {props.Dselected_deck === deck.deck_name && <div className="active-underline" />}
              </div>
            ))}
          </div>
        </div>


        <div className={`options-area ${clicked_options ? "expanded" : ""}`}>
          {!clicked_options ? (
            <div className="dots-button" onClick={options_clicked}>
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          ) : (
            <>

              <button className="option-button option-create-deck" onClick={add_deck_clicked}>
                CREATE<br />DECK
              </button>

              <button className="option-button option-add-card" onClick={add_card_clicked}>
                ADD<br />CARD
              </button>

              <button className="option-button option-delete-deck" onClick={() => props.deleteDeck(props.selectedDeck)}>
                DELETE<br />DECK
              </button>

              <button className="option-button option-delete-card" onClick={handleDeleteCard}>
                DELETE<br />CARD
              </button>

              <button className="option-button arrow-button option-close" onClick={options_clicked}>
                <span className="arrow">&#8634;</span>
              </button>
            </>
          )}
        </div>

      </div>



      {clicked_add_deck && (
        <div className="form-wrapper">
          <NewDeckForm addDeck={props.addDeck} />
        </div>
      )}

      {clicked_add_card && (
        <div className="form-wrapper">
          <NewCardForm addCard={props.addCard} deckName={props.selectedDeck} />
        </div>
      )}
    </div>
  );

}


export default Decks_Page;