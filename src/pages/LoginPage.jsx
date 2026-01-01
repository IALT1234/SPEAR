import React, { useState } from "react";
import { login } from "../api";
import "../css/LoginPage.css";

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
      const newToken = await login(email, password);
      onLoggedIn(newToken);
    } catch (e) {
      setErr(e?.message || "Login failed. Check email/password.");
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="login-outer">
    <div className="login-inner">
      <h1 className="login-title">WELCOME TO SPEAR!</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-form-section login-form_input_EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={loading}
        />

        <input
          className="login-form-section login-form_input_PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          disabled={loading}
        />

        <button
          className="login-form-section login-form_input_SUBMIT"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          className="login-form-section login-form_input_REGISTER"
          type="button"
          onClick={onGoToRegister}
          disabled={loading}
        >
          Need an account? Register
        </button>
      </form>

      {err && (
        <p style={{ color: "red", textAlign: "center", marginTop: 12 }}>{err}</p>
      )}
    </div>
  </div>
  );
}
