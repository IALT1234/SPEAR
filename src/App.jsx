
import './App.css'
import Decks_Page from './pages/Decks_Page'
import Current_Deck from './pages/Current_Deck'
import FlashCard from './components/FlashCard'

function App() {

    const this_deck = [
        {id:1, front : "What is React?", back: "A JavaScript library for building user interfaces."},
        {id:2, front : "What is a component?", back: "A reusable piece of UI in React."},
        {id:3, front : "What is state in React?", back: "An object that determines how a component renders and behaves."},
    ]
    const this_deck2 = [
        {id:1, front : "2 + 2", back: "4"},
        {id:2, front : "4 x 4", back: "16"},
        {id:3, front : "20 - 15", back: "5"},
    ]
    const this_deck3 = [
        {id:1, front : "What is OTAN", back: "Organization of the North Atlantic Treaty"},
        {id:2, front : "What is a USSR?", back: "Union of Soviet Socialist Republics"},
        {id:3, front : "What is BRICS", back: "Brazil, Russia, India, China, South Africa."},
    ]

  const deck_array_ = [
    { id: 1, deck_name: "React", app_deck_array: this_deck },
    { id: 2, deck_name: "Math", app_deck_array: this_deck2 },
    { id: 3, deck_name: "History", app_deck_array: this_deck3 },
  ]


  return (
    <>
      <Decks_Page deck_array = {deck_array_}/>
      <Current_Deck />
    </>
  )
}

export default App
