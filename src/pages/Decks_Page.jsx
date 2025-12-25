import FlashCard from "../components/FlashCard"
import Deck from "../components/Deck"
import "../css/Decks_Page.css";
import React, { useState, useEffect, useRef } from 'react'
import NewDeckForm from "./NewDeckForm";
import NewCardForm from "./NewCardForm";

function Decks_Page(props) {

  const [clicked_add_deck, setclicked_add_deck] = useState(false);
  const [clicked_add_card, setclicked_add_card] = useState(false);
  const [clicked_options, setclicked_options] = useState(false);
  const [clicked_delete_deck, setclicked_delete_deck] = useState(false);
  const [clicked_delete_card, setclicked_delete_card] = useState(false);

  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleWheel = (e) => {
      if (e.deltaY === 0) return // only respond to vertical scroll
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }

    el.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      el.removeEventListener('wheel', handleWheel)
    }
  }, [])

  function add_deck_clicked() {
    setclicked_add_deck(!clicked_add_deck);
    setclicked_add_card(false);

  }




  function options_clicked() {
    setclicked_options(!clicked_options);
    setclicked_add_deck(false);
    setclicked_add_card(false);

  }

  function delete_deck_clicked() {
    setclicked_delete_deck(!clicked_delete_deck);
    setclicked_add_deck(false);
    setclicked_add_card(false);
    setclicked_delete_card(false);
  }
  
  function delete_card_clicked() {
    setclicked_delete_card(!clicked_delete_card);
    setclicked_add_deck(false);
    setclicked_add_card(false);
    setclicked_delete_deck(false);
  }

  function handleDeleteCard() {
    if (!props.selectedDeck) return;
    if (!props.cardsCount || props.cardsCount < 1) return;
    props.deleteCurrentCard();
  }

  return (
    <div>
      <div className="deck-bar">
        <div className="deck-buttons-wrapper" ref={scrollRef}>
          <div className="deck-buttons-container">
            {props.deck_array.map(deck => (
              <div className="deck-button-wrapper" key={deck.id}>
                <button
                  className={`deck-button ${props.selectedDeck === deck.deck_name ? "active" : ""}`}
                  onClick={() => {
                    props.setMode("view");
                    props.Dselected_deck(deck.deck_name);
                    setclicked_delete_deck(false);
                    setclicked_delete_card(false);
                  }}
                >
                  {deck.deck_name}
                </button>
                {props.selectedDeck === deck.deck_name && <div className="active-underline" />}
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

              <button className="option-button option-create-deck" onClick={() => {
                add_deck_clicked();
                // name so the Current_Deck component can render the NewDeckForm inside a FlashCard
                props.setMode("create-deck");
                setclicked_delete_deck(false);
                setclicked_delete_card(false);


              }}
              >
                CREATE<br />DECK
              </button>

              <button className="option-button option-add-card" onClick={() => {
                props.setMode("create-card");
                props.setPendingCardDeck(props.selectedDeck);

                setclicked_delete_deck(false);
                setclicked_delete_card(false);
              }}>
                ADD<br />CARD
              </button>

              {!clicked_delete_deck ? (
                <button className="option-button option-delete-deck" onClick={() => delete_deck_clicked()


                  
                }>
                  DELETE<br />DECK
                </button>) :

                (

                  <div className="confirm-delete-deck">
                    <button className="option-button confirm-delete-deck-button" onClick={
                      () => {props.deleteDeck(props.selectedDeck)
                            delete_deck_clicked();}
                      
                      }>CONFIRM DELETE</button>
                    <button className="option-button cancel-delete-deck-button" onClick={delete_deck_clicked}>CANCEL</button>
                  </div>
                )


              }

              {!clicked_delete_card ? (              
              <button className="option-button option-delete-card" onClick={delete_card_clicked}>
                DELETE<br />CARD
              </button>
              ) : (

                <div className="confirm-delete-card">

                  <button className="option-button confirm-delete-card-button" onClick={
                    () => {handleDeleteCard();
                          delete_card_clicked();}
                    }>CONFIRM DELETE</button>
                  <button className="option-button cancel-delete-card-button" onClick={delete_card_clicked}>CANCEL</button>
                </div>
              )

              }



              <button className="option-button arrow-button option-close" onClick = { () =>  {
              
                    options_clicked()
                    setclicked_delete_deck(false);
                    setclicked_delete_card(false);}}
              >
                <span className="arrow">&#8634;</span>
              </button>
            </>
          )}
        </div>

      </div>

    </div>
  );

}


export default Decks_Page;