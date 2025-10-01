
import Decks_Page from './pages/Decks_Page'
import Current_Deck from './pages/Current_Deck'
import FlashCard from './components/FlashCard'
import React, { useState, useEffect } from 'react';

function App() {
  const defaultDecks = [
    {
      id: 1,
      deck_name: "REACT",
      app_deck_array: [
        { id: 1, front: "What is React?", back: "A JavaScript library for building UIs." },
        { id: 2, front: "What is a component?", back: "A reusable piece of UI in React." },
        { id: 3, front: "What is state in React?", back: "An object that determines how a component renders and behaves." }
      ]
    },
    {
      id: 2,
      deck_name: "MATH",
      app_deck_array: [
        { id: 1, front: "2 + 2", back: "4" },
        { id: 2, front: "4 x 4", back: "16" },
        { id: 3, front: "20 - 15", back: "5" }
      ]
    },
    {
      id: 3,
      deck_name: "HISTORY",
      app_deck_array: [
        { id: 1, front: "What is NATO?", back: "North Atlantic Treaty Organization" },
        { id: 2, front: "What was the USSR?", back: "Union of Soviet Socialist Republics" },
        { id: 3, front: "What is BRICS?", back: "Brazil, Russia, India, China, South Africa" }
      ]
    }
  ];


  const [selected_deck, setSelectedDeck] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const [all_decks, set_all_decks] = useState(() => {
    const saved = localStorage.getItem("all_decks");
    return saved ? JSON.parse(saved) : defaultDecks;
  });

  useEffect(() => {
    localStorage.setItem("all_decks", JSON.stringify(all_decks));
  }, [all_decks]);

  function addDeck(newDeck) {
    set_all_decks(prev => [...prev, newDeck]);
  }

  function addCard(deckName, card) {
    set_all_decks(prev =>
      prev.map(deck =>
        deck.deck_name === deckName
          ? { ...deck, app_deck_array: [...deck.app_deck_array, card] }
          : deck
      )
    );
  }

  function deleteCard(deckName, cardId) {
    set_all_decks(prev =>
      prev.map(deck =>
        deck.deck_name === deckName
          ? {
              ...deck,
              app_deck_array: deck.app_deck_array.filter(c => c.id !== cardId)
            }
          : deck
      )
    );
  }
  function deleteDeck(deckName) {
    set_all_decks(prev => prev.filter(deck => deck.deck_name !== deckName));

    if (selected_deck === deckName) {
      setSelectedDeck(""); // clear selection if deleted
    }
  }

  const selectedDeckObject = all_decks.find(deck => deck.deck_name === selected_deck);

  return (
    <>
      <Decks_Page
        deck_array={all_decks}
        Dselected_deck={setSelectedDeck}
        selectedDeck={selected_deck}
        addDeck={addDeck}
        addCard={addCard}
        deleteCard={deleteCard}
        deleteDeck={deleteDeck}
        currentIndex={currentIndex}
      />
      <Current_Deck deck={selectedDeckObject} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
    </>
  );
}


export default App
