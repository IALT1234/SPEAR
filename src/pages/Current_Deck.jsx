import FlashCard from "../components/FlashCard";
import { useEffect, useRef, useState } from "react";
import "../css/Current_Deck.css";

import NewDeckForm from "./NewDeckForm";
import NewCardForm from "./NewCardForm";
import EditDeckForm from "./EditDeckForm";
import EditCardForm from "./EditCardForm";

function Current_Deck({
  deck,
  currentIndex,
  setCurrentIndex,
  selectedDeck,
  Dselected_deck,
  addDeck,
  addCard,
  pendingCardDeck,
  setPendingCardDeck,
  mode,
  setMode,
  updateDeckName,
  updateCardText,
}) {
  // ----------------------------
  // Slide animation state (for deck changes)
  // ----------------------------
  const [renderDeck, setRenderDeck] = useState(deck);
  const [animState, setAnimState] = useState("in"); // "in" | "out"
  const prevDeckIdRef = useRef(deck?.id);

  // If deck changes while in view mode, animate old out, then swap + animate in
  useEffect(() => {
    // Only animate when we're viewing cards (not forms)
    if (mode !== "view") {
      setRenderDeck(deck);
      prevDeckIdRef.current = deck?.id;
      setAnimState("in");
      return;
    }

    const nextId = deck?.id;
    const prevId = prevDeckIdRef.current;

    // initial or no change
    if (nextId === prevId) {
      setRenderDeck(deck);
      return;
    }

    // animate old deck out
    setAnimState("out");

    const t = setTimeout(() => {
      // swap deck after out animation finishes
      setRenderDeck(deck);
      prevDeckIdRef.current = nextId;

      // animate new deck in
      setAnimState("in");
    }, 250); // MUST match CSS duration

    return () => clearTimeout(t);
  }, [deck, mode]);

  // Keep index in range for the deck being rendered (important during animation)
  const renderCards = renderDeck?.app_deck_array ?? [];
  const renderTotal = renderCards.length;

  useEffect(() => {
    if (renderTotal > 0 && currentIndex >= renderTotal) {
      setCurrentIndex(renderTotal - 1);
    }
  }, [renderTotal, currentIndex, setCurrentIndex]);

  // ----------------------------
  // Mode-based UI (no early returns)
  // ----------------------------
  let content = null;

  if (mode === "create-deck") {
    content = (
      <div className="deck-container">
        <NewDeckForm
          addDeck={async (newDeck) => {
            await addDeck(newDeck);
            Dselected_deck(newDeck.deck_name);
            setMode("view");
          }}
        />
      </div>
    );
  } else if (mode === "create-card") {
    content = (
      <div className="card-container">
        <NewCardForm
          addCard={async (deckName, card) => {
            await addCard(deckName, card);
            Dselected_deck(deckName);
            setPendingCardDeck("");
            setMode("view");
          }}
          deckName={pendingCardDeck}
          newDeck={true}
        />
      </div>
    );
  } else if (mode === "edit-deck") {
    content = (
      <div className="deck-container">
        <EditDeckForm
          initialName={deck?.deck_name || ""}
          onSave={async (newName) => {
            await updateDeckName(deck.id, newName);
            setMode("view");
          }}
          onCancel={() => setMode("view")}
        />
      </div>
    );
  } else if (mode === "edit-card") {
    const cards = deck?.app_deck_array ?? [];
    const current = cards[currentIndex];

    content = !current ? (
      <p>No card to edit.</p>
    ) : (
      <div className="card-container">
        <EditCardForm
          initialFront={current.front}
          initialBack={current.back}
          onSave={async ({ front, back }) => {
            await updateCardText(current.id, front, back);
            setMode("view");
          }}
          onCancel={() => setMode("view")}
        />
      </div>
    );
  } else {
    // VIEW MODE
    if (!renderDeck) {
      content = <p>Please select a deck</p>;
    } else if (renderTotal < 1) {
      content = <p>This deck has no cards yet. Add some!</p>;
    } else {
      function nextCard() {
        setCurrentIndex((prev) => (prev + 1) % renderTotal);
      }

      function prevCard() {
        setCurrentIndex((prev) => (prev - 1 + renderTotal) % renderTotal);
      }

      const safeIndex = Math.min(currentIndex, renderTotal - 1);

      content = (
        <div className="deck-container">
          <div className="nav-button left" onClick={prevCard}></div>
            <div className="deck-slide-viewport">
                <div className={`deck-slide ${animState === "out" ? "slide-out" : "slide-in"}`}>
                  <FlashCard
                    key={renderCards[safeIndex].id}
                    card_front={renderCards[safeIndex].front}
                    card_back={renderCards[safeIndex].back}
                  />
                </div>
            </div>

          <div className="nav-button right" onClick={nextCard}></div>
        </div>
      );
    }
  }

  return <>{content}</>;
}

export default Current_Deck;

