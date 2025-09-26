SPEAR

A simple React-based flashcards app where you can select a deck and flip through cards.
Features
  Flip cards to see the answer (click on the flashcard).
  Multiple decks available (React, Math, History)
  Navigate between cards with previous/next arrows (carousel loop).
  Decks are selectable from a top deck bar.
  Styled with vanilla CSS to match a card-style learning tool.

Commands to try the app:

  git clone https://github.com/IALT1234/SPEAR.git
  cd SPEAR
  npm install
  npm run dev

Project Structure
  src/
  │── components/
  │   ├── FlashCard.jsx     # Single flashcard (front/back flip)
  │   ├── Deck.jsx          # Deck wrapper (not always needed, but expandable)
  │
  │── pages/
  │   ├── Decks_Page.jsx    # Top deck selector bar
  │   ├── Current_Deck.jsx  # Shows selected deck cards with navigation
  │
  │── App.jsx               # Main entry point
  │── App.css               # Global styles


Future features:
  Short-term:
    Create decks
    Store decks in database (maybe Firebase)
    Customize Decks
  Medium-term:
    Include decks from API 
    Add dynamic animations
  Long-term:
    Add statistics function:
      Progress
      Time
    Customize each deck
    Add a trivia mode 
      If this clashes with the simplicity of Spear I might use the base code of this app to create a different one
    


      
    
    
  
