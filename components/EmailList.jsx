"use client";

export default function EmailList({
  title,
  emails,
  selectedEmailId,
  searchQuery,
  onSearchChange,
  onSelectEmail,
}) {
  return (
    <section className="email-list">
      <div className="list-header">
        <h2 id="folder-title">{title}</h2>
        <span className="list-meta" id="email-count">
          {emails.length} {emails.length === 1 ? "message" : "messages"}
        </span>
      </div>

      <div className="search-bar">
        <input
          type="search"
          placeholder="Search mail..."
          id="search-input"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="email-items scroller" id="email-items">
        {emails.length === 0 ? (
          <div className="empty-state" style={{ marginTop: "60px" }}>
            <div className="es-icon">📭</div>
            <h3>Empty folder</h3>
            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              No messages found here
            </p>
          </div>
        ) : (
          emails.map((email) => {
            const isSelected = selectedEmailId === email.id;
            return (
              <div
                key={email.id}
                className={`email-item ${email.unread ? "unread" : ""} ${
                  isSelected ? "active" : ""
                }`}
                id={`item-${email.id}`}
                onClick={() => onSelectEmail(email.id)}
              >
                <div className="ei-row1">
                  <span className="ei-from">{email.fromName || email.from}</span>
                  <span className="ei-time">{email.time}</span>
                </div>
                <div className="ei-subject">
                  {email.isDraft && "📝 "}
                  {email.subject}
                </div>
                <div className="ei-preview">{email.preview}</div>
                {email.tags && email.tags.length > 0 && (
                  <div className="ei-tags">
                    {email.tags.map((tag) => (
                      <span key={tag} className={`tag ${tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
