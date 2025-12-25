import React, { useState } from "react";
import { register } from "../api";

export default function RegisterPage({ onLoggedIn, onGoToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    try {
      const newToken = await register(email, password); // token returned
      onLoggedIn(newToken);                             // pass to App
    } catch (e) {
      setErr(e?.message || "Register failed. Email may already exist or password too short.");
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Create account</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 320 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 8)" type="password" />
        <button type="submit">Register</button>

        <button type="button" onClick={onGoToLogin}>
          Already have an account? Login
        </button>

        {err && <p style={{ color: "red" }}>{err}</p>}
      </form>
    </div>
  );
}
