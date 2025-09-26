
import './App.css'
import Decks_Page from './pages/Decks_Page'

import FlashCard from './components/FlashCard'

function App() {

    const this_deck = [
        {id:1, front : "What is React?", back: "A JavaScript library for building user interfaces."},
        {id:2, front : "What is a component?", back: "A reusable piece of UI in React."},
        {id:3, front : "What is state in React?", back: "An object that determines how a component renders and behaves."},
    ]
    const this_deck2 = [
        {id:1, front : "What is React?", back: "A JavaScript library for building user interfaces."},
        {id:2, front : "What is a component?", back: "A reusable piece of UI in React."},
        {id:3, front : "What is state in React?", back: "An object that determines how a component renders and behaves."},
    ]
    const this_deck3 = [
        {id:1, front : "What is React?", back: "A JavaScript library for building user interfaces."},
        {id:2, front : "What is a component?", back: "A reusable piece of UI in React."},
        {id:3, front : "What is state in React?", back: "An object that determines how a component renders and behaves."},
    ]

  const deck_array_ = [{id:1, this_deck}, {id:2, this_deck2}, {id:3, this_deck3}]


  return (
    <>
      <Decks_Page deck_array = {deck_array_}/>
    </>
  )
}

export default App
