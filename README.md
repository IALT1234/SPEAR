# SPEAR

A simple React-based flashcards app where you can select a deck and flip through cards. Meant for users to install and instantly start creating decks with a styled and intuitive UI. 

![SPEAR Image](src/images/firefox_B8CgqbZYwE.gif)


### Features
- Flip cards to see the answer (click on the flashcard).  
- Multiple decks available.  
- Navigate between cards with previous/next arrows.  
- Decks are selectable from a top deck bar.  
- Styled with vanilla CSS to match a card-style learning tool.  

---

### Commands to try the app:

```bash
git clone https://github.com/IALT1234/SPEAR.git
cd SPEAR
npm install
```

Available scripts (see `package.json`):

- `npm run dev` — start Vite dev server
- `npm run build` — build production bundle
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint across the project

## Project structure

Top-level files:

- `index.html` — Vite entry HTML
- `package.json` — project metadata and scripts
- `vite.config.js` — Vite configuration

Main source tree (`src/`):

- `src/main.jsx` — app bootstrap and router (if used)
- `src/App.jsx` — application root
- `src/index.css`, `src/App.css` — global styles

Components:

- `src/components/FlashCard.jsx` — single flashcard (front/back flip)
- `src/components/Deck.jsx` — deck wrapper / deck selector UI

Pages:

- `src/pages/Decks_Page.jsx` — deck selection bar / landing
- `src/pages/Current_Deck.jsx` — shows cards for the selected deck with navigation

CSS modules:

- `src/css/FlashCard.css`, `src/css/Decks_Page.css`, `src/css/Current_Deck.css`

Assets live in `src/assets/`.

## Roadmap

Short term:
- Persist decks to a Firebase database (local storage already handled)
- Import decks from an API
- Hanlde Databases

Medium term:
- Add animated transitions and improved mobile UI
- Study statistics (progress, time spent)

Long term:
- Quiz/trivia modes and deeper customization
- Polish UI functionality and design


## Notes

- This repo uses Vite + React. If something fails to start, ensure dependencies are installed and Node.js is up to date.

---

