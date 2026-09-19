"use client";

import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("k.pilo@911-airliner.com");
  const [password, setPassword] = useState("pilo2002");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Set simulated session cookie for XSS session hijacking demonstration (V29)
        document.cookie = `aeromail_session=${data.sessionToken || "adm_pilo_token_88f921a9c4"}; path=/; SameSite=Lax`;
        document.cookie = `auth_user=${data.user.email}; path=/; SameSite=Lax`;
        onLogin(data.user);
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (err) {
      // Fallback client-side auth for offline / instant dev testing
      const uLower = username.toLowerCase().trim();
      const isSqlInjection = 
        uLower.includes("'--") || 
        uLower.includes("' or ") || 
        uLower.includes("or 1=1") || 
        uLower.includes("admin'--");

      if (isSqlInjection) {
        document.cookie = `aeromail_session=adm_pilo_token_88f921a9c4; path=/; SameSite=Lax`;
        onLogin({
          key: "k.pilo",
          name: "Krishnamurthy Pilo",
          email: "k.pilo@911-airliner.com",
          initials: "KP",
          color: "blue",
          role: "admin",
        });
        return;
      }

      if (uLower === "k.pilo@911-airliner.com" && password === "pilo2002") {
        document.cookie = `aeromail_session=usr_pilo_session_token; path=/; SameSite=Lax`;
        onLogin({
          key: "k.pilo",
          name: "Krishnamurthy Pilo",
          email: "k.pilo@911-airliner.com",
          initials: "KP",
          color: "blue",
        });
      } else {
        setError("Invalid username or password. (Hint: SQL syntax errors or default credentials)");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page" id="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon">✈️</div>
          <div className="logo-text">
            Aero<span>Mail</span>
          </div>
        </div>
        <h1 className="login-heading">Welcome back</h1>
        <p className="login-sub">Sign in to your 911 Airliner mailbox</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="login-email">Username or Corporate Email</label>
            <input
              id="login-email"
              type="text"
              placeholder="e.g. k.pilo@911-airliner.com or admin'--"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="field">
            <label htmlFor="login-pass">Password</label>
            <input
              id="login-pass"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Sign In →"}
          </button>
        </form>

        <div className="login-footer">
          Forgot password? <a href="#helpdesk">Contact IT Helpdesk</a>
          <br />
          <br />
          911 Airliner Internal System · Roundcube Webmail v1.6.0
          <br />
          <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
            mail.etherence.com · Restricted Access
          </span>
        </div>
      </div>
    </div>
  );
}
