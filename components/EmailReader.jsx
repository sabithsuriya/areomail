"use client";

import { useEffect, useRef } from "react";

export default function EmailReader({
  email,
  onReply,
  onForward,
  onDelete,
  onToggleStar,
  isStarred,
}) {
  const contentRef = useRef(null);

  // V29: Vulnerability Simulation — Ensure inline <script> tags execute
  // in addition to standard <img>/<iframe>/<svg> onload/onerror event handlers
  useEffect(() => {
    if (!email || !contentRef.current) return;

    // Find any script elements in the rendered email body
    const scripts = contentRef.current.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }, [email]);

  if (!email) {
    return (
      <main className="email-reader">
        <div className="reader-toolbar">
          <button className="toolbar-btn" disabled style={{ opacity: 0.5 }}>
            ↩️ Reply
          </button>
          <button className="toolbar-btn" disabled style={{ opacity: 0.5 }}>
            ↪️ Forward
          </button>
          <button className="toolbar-btn" disabled style={{ opacity: 0.5 }}>
            ⭐ Star
          </button>
          <div className="spacer"></div>
          <button
            className="toolbar-btn danger"
            disabled
            style={{ opacity: 0.5 }}
          >
            🗑️ Delete
          </button>
        </div>
        <div className="reader-body scroller" id="reader-body">
          <div className="empty-state">
            <div className="es-icon">📭</div>
            <h3>No email selected</h3>
            <p>Select an email from the list to read it</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="email-reader">
      <div className="reader-toolbar">
        <button className="toolbar-btn" onClick={() => onReply(email)}>
          ↩️ Reply
        </button>
        <button className="toolbar-btn" onClick={() => onForward(email)}>
          ↪️ Forward
        </button>
        <button className="toolbar-btn" onClick={() => onToggleStar(email.id)}>
          {isStarred ? "★ Starred" : "⭐ Star"}
        </button>
        <div className="spacer"></div>
        <button
          className="toolbar-btn danger"
          onClick={() => onDelete(email.id)}
        >
          🗑️ Delete
        </button>
      </div>

      <div className="reader-body scroller" id="reader-body">
        <h1 className="email-subject-line">
          {email.isDraft ? "📝 [Draft] " : ""}
          {email.subject}
        </h1>

        <div className="email-meta-card">
          <div className={`meta-avatar ${email.avatarColor || "blue"}`}>
            {email.initials || "EM"}
          </div>
          <div className="meta-info">
            <div className="meta-name">{email.fromName || email.from}</div>
            <div className="meta-email">{email.from}</div>
            <div className="meta-row">
              <div className="meta-field">
                To: <span>{email.to}</span>
              </div>
              <div className="meta-field">
                Date: <span>{email.time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* V29: Intentionally unescaped HTML to allow Stored XSS demonstration */}
        <div
          ref={contentRef}
          className="email-content"
          dangerouslySetInnerHTML={{ __html: email.body }}
        />
      </div>
    </main>
  );
}
