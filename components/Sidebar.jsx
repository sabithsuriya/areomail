"use client";

import { users } from "@/lib/emailData";

export default function Sidebar({
  currentUser,
  currentFolder,
  activeFilterTag,
  unreadCount,
  draftsCount,
  onSelectFolder,
  onSelectTag,
  onSwitchUser,
  onOpenCompose,
  onLogout,
}) {
  const userInfo = users[currentUser] || {
    name: "User",
    email: `${currentUser}@911-airliner.com`,
    initials: currentUser.substring(0, 2).toUpperCase(),
    color: "blue",
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="s-icon">✈️</div>
          <div className="s-name">
            Aero<span>Mail</span>
          </div>
        </div>
        <button className="compose-btn" onClick={onOpenCompose}>
          ✏️ &nbsp;Compose
        </button>
      </div>

      <nav className="sidebar-nav scroller">
        <div className="nav-section">
          <div className="nav-label">Mailbox</div>
          <div
            className={`nav-item ${
              currentFolder === "inbox" && !activeFilterTag ? "active" : ""
            }`}
            onClick={() => onSelectFolder("inbox")}
          >
            <span className="nav-icon">📥</span>
            <span className="nav-name">Inbox</span>
            {unreadCount > 0 && (
              <span className="nav-badge" id="badge-inbox">
                {unreadCount}
              </span>
            )}
          </div>
          <div
            className={`nav-item ${
              currentFolder === "starred" && !activeFilterTag ? "active" : ""
            }`}
            onClick={() => onSelectFolder("starred")}
          >
            <span className="nav-icon">⭐</span>
            <span className="nav-name">Starred</span>
          </div>
          <div
            className={`nav-item ${
              currentFolder === "sent" && !activeFilterTag ? "active" : ""
            }`}
            onClick={() => onSelectFolder("sent")}
          >
            <span className="nav-icon">📤</span>
            <span className="nav-name">Sent</span>
          </div>
          <div
            className={`nav-item ${
              currentFolder === "drafts" && !activeFilterTag ? "active" : ""
            }`}
            onClick={() => onSelectFolder("drafts")}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-name">Drafts</span>
            {draftsCount > 0 && (
              <span className="nav-badge red">{draftsCount}</span>
            )}
          </div>
          <div
            className={`nav-item ${
              currentFolder === "trash" && !activeFilterTag ? "active" : ""
            }`}
            onClick={() => onSelectFolder("trash")}
          >
            <span className="nav-icon">🗑️</span>
            <span className="nav-name">Trash</span>
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-label">Labels</div>
          <div
            className={`nav-item ${activeFilterTag === "threat" ? "active" : ""}`}
            onClick={() => onSelectTag("threat")}
          >
            <span className="nav-icon">⚠️</span>
            <span className="nav-name">Threats</span>
          </div>
          <div
            className={`nav-item ${activeFilterTag === "security" ? "active" : ""}`}
            onClick={() => onSelectTag("security")}
          >
            <span className="nav-icon">🔒</span>
            <span className="nav-name">Security</span>
          </div>
          <div
            className={`nav-item ${activeFilterTag === "urgent" ? "active" : ""}`}
            onClick={() => onSelectTag("urgent")}
          >
            <span className="nav-icon">🔴</span>
            <span className="nav-name">Urgent</span>
          </div>
          <div
            className={`nav-item ${activeFilterTag === "personal" ? "active" : ""}`}
            onClick={() => onSelectTag("personal")}
          >
            <span className="nav-icon">🌱</span>
            <span className="nav-name">Personal</span>
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-label">Admin — All Inboxes</div>
          <div
            className={`nav-item ${currentUser === "k.pilo" ? "active" : ""}`}
            onClick={() => onSwitchUser("k.pilo")}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-name">k.pilo (Pilo)</span>
          </div>
          <div
            className={`nav-item ${currentUser === "s.vp" ? "active" : ""}`}
            onClick={() => onSwitchUser("s.vp")}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-name">s.vp (Survesh)</span>
          </div>
          <div
            className={`nav-item ${currentUser === "r.mighty" ? "active" : ""}`}
            onClick={() => onSwitchUser("r.mighty")}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-name">r.mighty (Raghav)</span>
          </div>
          <div
            className={`nav-item ${currentUser === "v.intern" ? "active" : ""}`}
            onClick={() => onSwitchUser("v.intern")}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-name">v.intern (Vinot)</span>
          </div>
          <div
            className={`nav-item ${currentUser === "s.hr" ? "active" : ""}`}
            onClick={() => onSwitchUser("s.hr")}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-name">s.hr (Sayana)</span>
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div
          className="user-pill"
          title="Click to sign out or switch identity"
          onClick={onLogout}
        >
          <div className={`user-avatar ${userInfo.color || "blue"}`}>
            {userInfo.initials}
          </div>
          <div className="user-info" style={{ flex: 1 }}>
            <div className="u-name">{userInfo.name}</div>
            <div className="u-email">{userInfo.email}</div>
          </div>
          <span
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              cursor: "pointer",
            }}
            title="Sign out"
          >
            🚪
          </span>
        </div>
      </div>
    </aside>
  );
}
