import React, { useState } from "react";
import { register } from "../api";
import "../css/LoginPage.css"; // Reuse the same styles!

export default function RegisterPage({ onLoggedIn, onGoToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    try {
      const newToken = await register(email, password);
      onLoggedIn(newToken);
    } catch (e) {
      setErr(
        e?.message ||
          "Register failed. Email may already exist or password too short."
      );
    }
  }

  return (
    <div className="login-outer">
      <div className="login-inner">
        <h1 className="login-title">CREATE YOUR SPEAR ACCOUNT</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-form-section login-form_input_EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="login-form-section login-form_input_PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 8)"
            type="password"
          />
          <button
            className="login-form-section login-form_input_SUBMIT"
            type="submit"
          >
            Register
          </button>

          <button
            className="login-form-section login-form_input_REGISTER"
            type="button"
            onClick={onGoToLogin}
          >
            Already have an account? Login
          </button>
        </form>

        {err && (
          <p style={{ color: "red", textAlign: "center", marginTop: 12 }}>
            {err}
          </p>
        )}
      </div>
    </div>
  );
}
