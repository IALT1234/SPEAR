import React, { useEffect, useState } from "react";
import Decks_Page from "./pages/Decks_Page";
import Current_Deck from "./pages/Current_Deck";
import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";
import Account from "./components/Account";

import {
  getDecks,
  createDeck,
  updateDeck,          
  deleteDeck as apiDeleteDeck,
  getCards,
  createCard,
  updateCard,          
  deleteCard as apiDeleteCard,
} from "./api";

function App() {

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const authed = !!token;

  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState(null);

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [pendingCardDeckId, setPendingCardDeckId] = useState(null);


  const [authMode, setAuthMode] = useState("login"); // "login" or "register"

  const [mode, setMode] = useState("view");

  // load decks after login
  async function refreshDecks() {
    const data = await getDecks();
    setDecks(data);
    if (data.length > 0 && selectedDeckId == null) {
      setSelectedDeckId(data[0].id);
    }
  }

  // load decks when authed
  useEffect(() => {
    if (!authed) return;
    refreshDecks().catch(() => {
      // token might be invalid
      localStorage.removeItem("token");
      setToken("");
    });
  }, [authed]);

  // load cards when selection changes
  useEffect(() => {
    if (!authed) return;

    if (typeof selectedDeckId !== "number") {
      setCards([]);
      return;
    }

    getCards(selectedDeckId).then(setCards);
    setCurrentIndex(0);
  }, [authed, selectedDeckId]);


  useEffect(() => {
    // if token is removed (401 in api.js), reset app state
    if (!authed) {
      setDecks([]);
      setCards([]);
      setSelectedDeckId(null);
      setCurrentIndex(0);
      setPendingCardDeckId(null);
      setMode("view");
      setAuthMode("login");
    }
  }, [authed]);



  // callbacks used by your existing UI

  async function addDeck(newDeckLike) {
    // your NewDeckForm passes { deck_name: ... }
    const title = newDeckLike.deck_name;
    const created = await createDeck(title);
    await refreshDecks();
    setSelectedDeckId(created.id);
  }

  async function addCard(deckId, card) {
    // your NewCardForm passes { front, back }
    await createCard(deckId, card.front, card.back);
    const updated = await getCards(deckId);
    setCards(updated);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
    setAuthMode("login");
  }


  async function deleteCard(deckId, cardId) {
    await apiDeleteCard(cardId);
    const updated = await getCards(deckId);
    setCards(updated);
    setCurrentIndex(0);
  }


  async function deleteCurrentCard() {
    if (typeof selectedDeckId !== "number") return;
    const current = cards[currentIndex];
    if (!current) return;

    await apiDeleteCard(current.id);

    const updated = await getCards(selectedDeckId);
    setCards(updated);

    // keep index in range
    setCurrentIndex((prev) => {
      const nextMax = Math.max(updated.length - 1, 0);
      return Math.min(prev, nextMax);
    });
  }



  async function deleteDeck(deckId) {
    await apiDeleteDeck(deckId);
    await refreshDecks();
    if (deckId === selectedDeckId) setSelectedDeckId(null);
  }



  async function updateDeckName(deckId, newTitle) {
    await updateDeck(deckId, newTitle);
    await refreshDecks();
  }

  async function updateCardText(cardId, front, back) {
    await updateCard(cardId, front, back);
    if (typeof selectedDeckId === "number") {
      const updated = await getCards(selectedDeckId);
      setCards(updated);
    }
  }





  // Convert backend decks to the shape your Decks_Page expects
  const deck_array_for_ui = decks.map((d) => ({
    id: d.id,
    deck_name: d.title, // UI expects deck_name
    // We won't store app_deck_array here anymore
  }));

  const selectedDeckObject = decks.find((d) => d.id === selectedDeckId);
  const deck_for_current = selectedDeckObject
    ? {
        id: selectedDeckObject.id,
        deck_name: selectedDeckObject.title,
        app_deck_array: cards, // Current_Deck expects this structure
      }
    : null;

  if (!authed) {
    return authMode === "login" ? (
      <LoginPage
        onLoggedIn={(newToken) => {
          setToken(newToken);
        }}
        onGoToRegister={() => setAuthMode("register")}
      />
    ) : (
      <RegisterPage
        onLoggedIn={(newToken) => {
          localStorage.setItem("token", newToken);
          setToken(newToken);
        }}
        onGoToLogin={() => setAuthMode("login")}
      />
    );
  }

  return (
    <>
    <Account onLogout={handleLogout} />

    <Decks_Page
      deck_array={deck_array_for_ui}
      Dselected_deck={(deckNameOrSentinel) => {
        // support your sentinel logic:


        // otherwise map deck name -> deck id
        const deck = decks.find((d) => d.title === deckNameOrSentinel);
        if (deck) setSelectedDeckId(deck.id);
      }}
      selectedDeck={
        typeof selectedDeckId === "string"
          ? selectedDeckId
          : (selectedDeckObject ? selectedDeckObject.title : "")
      }
      addDeck={addDeck}
      addCard={(deckName, card) => {
        const deck = decks.find((d) => d.title === deckName);
        if (deck) return addCard(deck.id, card);
      }}
      deleteCard={(deckName, cardId) => {
        const deck = decks.find((d) => d.title === deckName);
        if (deck) return deleteCard(deck.id, cardId);
      }}

      deleteCurrentCard={deleteCurrentCard}
      cardsCount={cards.length}

      deleteDeck={(deckName) => {
        const deck = decks.find((d) => d.title === deckName);
        if (deck) return deleteDeck(deck.id);
      }}
      currentIndex={currentIndex}
      setPendingCardDeck={(deckName) => {
        const deck = decks.find((d) => d.title === deckName);
        setPendingCardDeckId(deck ? deck.id : null);
      }}

      setMode={setMode}

    />

    <Current_Deck
      deck={deck_for_current}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      selectedDeck={
        typeof selectedDeckId === "string"
          ? selectedDeckId
          : (selectedDeckObject ? selectedDeckObject.title : "")
      }

      Dselected_deck={(name) => {
        const deck = decks.find((d) => d.title === name);
        if (deck) setSelectedDeckId(deck.id);
      }}

      
      addDeck={addDeck}
      addCard={(deckName, card) => {
        const deck = decks.find((d) => d.title === deckName);
        if (deck) return addCard(deck.id, card);
      }}
      pendingCardDeck={pendingCardDeckId ? (decks.find(d => d.id === pendingCardDeckId)?.title ?? "") : ""}
      setPendingCardDeck={() => {}}

      mode={mode}
      setMode={setMode}


      updateDeckName={updateDeckName}
      updateCardText={updateCardText}
    />
  </>
);
}

export default App;
