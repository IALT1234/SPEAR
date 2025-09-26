import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import FlashCard from './components/FlashCard'

function App() {

  return (
    <>
      <FlashCard card_front="What is React?" card_back="A JavaScript library for building user interfaces." />
      <FlashCard card_front="What is a component?" card_back="A reusable piece of UI in React." />

    </>
  )
}

export default App
