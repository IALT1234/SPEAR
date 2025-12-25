import React, { useState } from "react";
import { login } from "../api";

export default function LoginPage({ onLoggedIn, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      onLoggedIn();
    } catch {
      setErr("Login failed. Check email/password.");
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 320 }}>

        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Login</button>



        <button type="button" onClick={onGoToRegister}>
          Need an account? Register
        </button>


        {err && <p style={{ color: "red" }}>{err}</p>}
      </form>
    </div>
  );
}
