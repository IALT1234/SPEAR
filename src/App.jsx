
import './App.css'
import Decks_Page from './pages/Decks_Page'
import Current_Deck from './pages/Current_Deck'
import FlashCard from './components/FlashCard'
import React, { useState, useEffect } from 'react';

function App() {

    const [selected_deck, setSelectedDeck] = useState('');



    const this_deck = [
        {id:1, front : "What is React?", back: "A JavaScript library for building user interfaces."},
        {id:2, front : "What is a component?", back: "A reusable piece of UI in React."},
        {id:3, front : "What is state in React?", back: "An object that determines how a component renders and behaves."},
    ]
    const this_deck2 = [
        {id:1, front : "2 + 2", back: "4"},
        {id:2, front : "4 x 4", back: "16"},
        {id:3, front : "20 - 15", back: "15"},
    ]
    const this_deck3 = [
        {id:1, front : "What is NATO", back: "North Atlantic Treaty Organization"},
        {id:2, front : "What is a USSR?", back: "Union of Soviet Socialist Republics"},
        {id:3, front : "What is BRICS", back: "Brazil, Russia, India, China, South Africa."},
    ]

  const deck_array_ = [
    { id: 1, deck_name: "React", app_deck_array: this_deck },
    { id: 2, deck_name: "Math", app_deck_array: this_deck2 },
    { id: 3, deck_name: "History", app_deck_array: this_deck3 },
  ]
  
  const selectedDeckObject = deck_array_.find(deck => deck.deck_name === selected_deck);


  return (
    <>
      <Decks_Page deck_array = {deck_array_} Dselected_deck = {setSelectedDeck}/>
      <Current_Deck deck = {selectedDeckObject}/>
    </>
  )
}

export default App
