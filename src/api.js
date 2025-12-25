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

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }

  // 204 has no body
  if (res.status === 204) return null;
  return res.json();
}

export async function login(email, password) {
  // OAuth2 password flow expects form data: username + password
  const body = new URLSearchParams();
  body.append("username", email);
  body.append("password", password);

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();

  localStorage.setItem("token", data.access_token);
  return data;
}

export async function register(email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Register failed");
  }

  return res.json(); // depending on your backend, this might return a token or a message
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
