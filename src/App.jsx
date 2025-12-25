import React, { useEffect, useState } from "react";
import Decks_Page from "./pages/Decks_Page";
import Current_Deck from "./pages/Current_Deck";
import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";
import Account from "./components/Account";

import {
  getDecks,
  createDeck,
  deleteDeck as apiDeleteDeck,
  getCards,
  createCard,
  deleteCard as apiDeleteCard,
} from "./api";

function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem("token"));

  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState(null);

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [pendingCardDeckId, setPendingCardDeckId] = useState(null);


  const [authMode, setAuthMode] = useState("login"); // "login" or "register"


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
      setAuthed(false);
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
    setAuthed(false);
    setAuthMode("login");
  }


  async function deleteCard(deckId, cardId) {
    await apiDeleteCard(cardId);
    const updated = await getCards(deckId);
    setCards(updated);
    setCurrentIndex(0);
  }

  async function deleteDeck(deckId) {
    await apiDeleteDeck(deckId);
    await refreshDecks();
    if (deckId === selectedDeckId) setSelectedDeckId(null);
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
        onLoggedIn={() => setAuthed(true)}
        onGoToRegister={() => setAuthMode("register")}
      />
    ) : (
      <RegisterPage
        onLoggedIn={() => setAuthed(true)}
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
        if (deckNameOrSentinel === "NEW_DECK" || deckNameOrSentinel === "NEW_CARD") {
          setSelectedDeckId(deckNameOrSentinel);
          return;
        }

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
      deleteDeck={(deckName) => {
        const deck = decks.find((d) => d.title === deckName);
        if (deck) return deleteDeck(deck.id);
      }}
      currentIndex={currentIndex}
      setPendingCardDeck={(deckName) => {
        const deck = decks.find((d) => d.title === deckName);
        setPendingCardDeckId(deck ? deck.id : null);
      }}
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
      Dselected_deck={(nameOrSentinel) => {
        if (nameOrSentinel === "NEW_DECK" || nameOrSentinel === "NEW_CARD") {
          setSelectedDeckId(nameOrSentinel);
          return;
        }
        const deck = decks.find((d) => d.title === nameOrSentinel);
        if (deck) setSelectedDeckId(deck.id);
      }}
      addDeck={addDeck}
      addCard={(deckName, card) => {
        const deck = decks.find((d) => d.title === deckName);
        if (deck) return addCard(deck.id, card);
      }}
      pendingCardDeck={pendingCardDeckId ? (decks.find(d => d.id === pendingCardDeckId)?.title ?? "") : ""}
      setPendingCardDeck={() => {}}
    />
  </>
);
}

export default App;
