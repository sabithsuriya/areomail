"use client";

import { useState, useEffect } from "react";

export default function ComposeModal({
  isOpen,
  initialData = {},
  currentSenderEmail,
  onClose,
  onSend,
}) {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTo(initialData.to || "");
      setFrom(initialData.from || currentSenderEmail || "k.pilo@911-airliner.com");
      setCc(initialData.cc || "");
      setSubject(initialData.subject || "");
      setBody(initialData.body || "");
    }
  }, [isOpen, initialData, currentSenderEmail]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const emailPayload = {
      from: from || currentSenderEmail,
      to,
      cc,
      subject: subject || "(No Subject)",
      body: body || "",
      preview: body.replace(/<[^>]*>/g, "").substring(0, 70) || "No preview available",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ", Today",
    };

    try {
      // Send to server API
      await fetch("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });
    } catch (err) {
      console.warn("API delivery fallback to local state:", err);
    }

    onSend(emailPayload);
    setIsSending(false);
    onClose();
  };

  return (
    <div className={`compose-modal ${isOpen ? "open" : ""}`} id="compose-modal">
      <div className="compose-header">
        <h3>New Message</h3>
        <button className="compose-close" onClick={onClose} type="button">
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* V30: From field is editable — allows testing SMTP Open Relay / Spoof Any Sender */}
        <div className="compose-field">
          <label style={{ width: "36px" }}>From</label>
          <input
            type="text"
            placeholder="e.g. b.kumaran@911-airliner.com"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            title="V30: SMTP Relay test — Any sender address accepted"
          />
        </div>

        <div className="compose-field">
          <label>To</label>
          <input
            type="text"
            id="compose-to"
            placeholder="recipient@911-airliner.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>

        <div className="compose-field">
          <label>Cc</label>
          <input
            type="text"
            placeholder="cc@911-airliner.com"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
          />
        </div>

        <div className="compose-field">
          <label>Re</label>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="compose-body">
          <textarea
            placeholder="Write your message here... (HTML & JavaScript tags accepted)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <div className="compose-actions">
          <button type="submit" className="send-btn" disabled={isSending}>
            {isSending ? "Sending..." : "Send ✈️"}
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => alert("Attachments are currently restricted by IT policy")}
          >
            📎 Attach
          </button>
        </div>
      </form>
    </div>
  );
}
