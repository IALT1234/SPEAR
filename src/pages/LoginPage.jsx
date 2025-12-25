import React, { useState } from "react";
import { login } from "../api";

export default function LoginPage({ onLoggedIn, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const newToken = await login(email, password); // get token
      onLoggedIn(newToken);                          // pass to App
    } catch (e) {
      setErr(e?.message || "Login failed. Check email/password.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 12, maxWidth: 320 }}
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={loading}
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button type="button" onClick={onGoToRegister} disabled={loading}>
          Need an account? Register
        </button>

        {err && <p style={{ color: "red" }}>{err}</p>}
      </form>
    </div>
  );
}
