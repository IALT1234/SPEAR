const API_BASE = "http://127.0.0.1:8000";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...authHeaders(),
    },
  });

  // if token is invalid or expired, force logout everywhere
  if (res.status === 401) {
    localStorage.removeItem("token");
    throw new Error("401 Unauthorized: Session expired. Please log in again.");
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: email,
      password,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.detail || `Login failed (${res.status})`);
  }

  // store + return token
  localStorage.setItem("token", data.access_token);
  return data.access_token;
}



export async function register(email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.detail || `Register failed (${res.status})`);
  }

  // store and return token
  localStorage.setItem("token", data.access_token);
  return data.access_token;
}




// Decks
export const getDecks = () => request("/decks");
export const createDeck = (title) =>
  request("/decks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

export const updateDeck = (id, title) =>
  request(`/decks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

export const deleteDeck = (id) =>
  request(`/decks/${id}`, { method: "DELETE" });

// Cards
export const getCards = (deckId) => request(`/cards?deck_id=${deckId}`);

export const createCard = (deckId, front, back) =>
  request(`/cards?deck_id=${deckId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ front, back }),
  });

export const updateCard = (cardId, front, back) =>
  request(`/cards/${cardId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ front, back }),
  });

export const deleteCard = (cardId) =>
  request(`/cards/${cardId}`, { method: "DELETE" });

// Study
export const logAnswer = (deckId, cardId, correct) =>
  request("/study/answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deck_id: deckId, card_id: cardId, correct }),
  });

export const getStats = (range) =>
  request(`/study/stats?range=${range}`);
