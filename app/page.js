"use client";

import { useState, useEffect, useMemo } from "react";
import LoginPage from "@/components/LoginPage";
import Sidebar from "@/components/Sidebar";
import EmailList from "@/components/EmailList";
import EmailReader from "@/components/EmailReader";
import ComposeModal from "@/components/ComposeModal";
import { emailsDB, users } from "@/lib/emailData";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("k.pilo");
  const [currentFolder, setCurrentFolder] = useState("inbox");
  const [activeFilterTag, setActiveFilterTag] = useState(null);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeInitialData, setComposeInitialData] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Deep clone of emailsDB into local component state to allow mutations (send, delete, read)
  const [emailsState, setEmailsState] = useState(() =>
    JSON.parse(JSON.stringify(emailsDB))
  );

  // Check initial login state from cookies on mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const cookies = document.cookie;
      if (cookies.includes("aeromail_session=")) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleLogin = (user) => {
    if (user && user.key) {
      setCurrentUser(user.key);
    }
    setIsLoggedIn(true);
    triggerToast(`Authenticated as ${user?.name || "Krishnamurthy Pilo"}`);
  };

  const handleLogout = () => {
    document.cookie = "aeromail_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    setSelectedEmailId(null);
    triggerToast("Logged out successfully");
  };

  const handleSelectFolder = (folder) => {
    setCurrentFolder(folder);
    setActiveFilterTag(null);
    setSelectedEmailId(null);
    setSearchQuery("");
  };

  const handleSelectTag = (tag) => {
    setActiveFilterTag(tag);
    setSelectedEmailId(null);
    setSearchQuery("");
  };

  const handleSwitchUser = (userKey) => {
    setCurrentUser(userKey);
    setCurrentFolder("inbox");
    setActiveFilterTag(null);
    setSelectedEmailId(null);
    setSearchQuery("");
    const target = users[userKey];
    triggerToast(`Switched mailbox: ${target?.name || userKey}`);
  };

  // Compute displayed emails list
  const displayedEmails = useMemo(() => {
    const userData = emailsState[currentUser] || {
      inbox: [],
      sent: [],
      drafts: [],
      starred: [],
      trash: [],
    };

    let list = [];

    if (activeFilterTag) {
      // Gather all emails across folders for this tag
      const allFolders = Object.values(userData).flat();
      list = allFolders.filter(
        (e) => e && e.tags && e.tags.includes(activeFilterTag)
      );
    } else {
      list = userData[currentFolder] || [];
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (e) =>
          e.subject?.toLowerCase().includes(q) ||
          e.fromName?.toLowerCase().includes(q) ||
          e.from?.toLowerCase().includes(q) ||
          e.preview?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [emailsState, currentUser, currentFolder, activeFilterTag, searchQuery]);

  // Selected email object
  const selectedEmail = useMemo(() => {
    if (!selectedEmailId) return null;
    return displayedEmails.find((e) => e.id === selectedEmailId) || null;
  }, [displayedEmails, selectedEmailId]);

  const handleSelectEmail = (id) => {
    setSelectedEmailId(id);

    // Mark email as read
    setEmailsState((prev) => {
      const next = { ...prev };
      const userFolders = next[currentUser];
      if (userFolders) {
        Object.keys(userFolders).forEach((f) => {
          userFolders[f] = userFolders[f].map((email) => {
            if (email.id === id) {
              return { ...email, unread: false };
            }
            return email;
          });
        });
      }
      return next;
    });
  };

  const handleToggleStar = (id) => {
    setEmailsState((prev) => {
      const next = { ...prev };
      const userFolders = next[currentUser];
      if (!userFolders) return prev;

      let targetEmail = null;
      Object.keys(userFolders).forEach((f) => {
        const found = userFolders[f].find((e) => e.id === id);
        if (found) targetEmail = found;
      });

      if (!targetEmail) return prev;

      const isStarred = (userFolders.starred || []).some((e) => e.id === id);
      if (isStarred) {
        userFolders.starred = userFolders.starred.filter((e) => e.id !== id);
        triggerToast("Removed from Starred");
      } else {
        if (!userFolders.starred) userFolders.starred = [];
        userFolders.starred.unshift({ ...targetEmail });
        triggerToast("Marked as Starred ★");
      }

      return next;
    });
  };

  const handleDeleteEmail = (id) => {
    setEmailsState((prev) => {
      const next = { ...prev };
      const userFolders = next[currentUser];
      if (!userFolders) return prev;

      let deletedItem = null;
      if (currentFolder !== "trash") {
        userFolders[currentFolder] = (userFolders[currentFolder] || []).filter(
          (e) => {
            if (e.id === id) {
              deletedItem = e;
              return false;
            }
            return true;
          }
        );

        if (deletedItem) {
          if (!userFolders.trash) userFolders.trash = [];
          userFolders.trash.unshift(deletedItem);
          triggerToast("Moved message to Trash 🗑️");
        }
      } else {
        userFolders.trash = userFolders.trash.filter((e) => e.id !== id);
        triggerToast("Permanently deleted message");
      }

      return next;
    });

    setSelectedEmailId(null);
  };

  const handleReply = (email) => {
    setComposeInitialData({
      to: email.from,
      subject: email.subject.startsWith("Re:") ? email.subject : `Re: ${email.subject}`,
      body: `\n\n--- On ${email.time}, ${email.fromName || email.from} wrote: ---\n${email.preview}`,
    });
    setComposeOpen(true);
  };

  const handleForward = (email) => {
    setComposeInitialData({
      to: "",
      subject: email.subject.startsWith("Fwd:") ? email.subject : `Fwd: ${email.subject}`,
      body: `\n\n---------- Forwarded message ---------\nFrom: ${email.fromName || email.from} <${email.from}>\nDate: ${email.time}\nSubject: ${email.subject}\n\n${email.preview}`,
    });
    setComposeOpen(true);
  };

  const handleSendEmail = (newEmail) => {
    setEmailsState((prev) => {
      const next = { ...prev };

      // 1. Add to sender's sent folder
      if (!next[currentUser]) next[currentUser] = { inbox: [], sent: [], drafts: [], starred: [], trash: [] };
      if (!next[currentUser].sent) next[currentUser].sent = [];
      next[currentUser].sent.unshift({
        id: `sent_${Date.now()}`,
        ...newEmail,
        fromName: users[currentUser]?.name || "You",
        initials: users[currentUser]?.initials || "ME",
        avatarColor: users[currentUser]?.color || "blue",
      });

      // 2. Route to recipient if internal (V29/V30)
      const toLower = (newEmail.to || "").toLowerCase();
      let recipientKey = null;
      if (toLower.includes("pilo")) recipientKey = "k.pilo";
      else if (toLower.includes("vp") || toLower.includes("survesh")) recipientKey = "s.vp";
      else if (toLower.includes("mighty") || toLower.includes("raghav")) recipientKey = "r.mighty";
      else if (toLower.includes("intern") || toLower.includes("vinot")) recipientKey = "v.intern";
      else if (toLower.includes("hr") || toLower.includes("sayana")) recipientKey = "s.hr";

      if (recipientKey) {
        if (!next[recipientKey]) next[recipientKey] = { inbox: [], sent: [], drafts: [], starred: [], trash: [] };
        if (!next[recipientKey].inbox) next[recipientKey].inbox = [];
        next[recipientKey].inbox.unshift({
          id: `in_${Date.now()}`,
          ...newEmail,
          unread: true,
          initials: newEmail.from ? newEmail.from.substring(0, 2).toUpperCase() : "EX",
          avatarColor: "red",
        });
      }

      return next;
    });

    triggerToast("Message sent successfully ✈️");
  };

  // Folder display title
  const listTitle = activeFilterTag
    ? activeFilterTag.charAt(0).toUpperCase() + activeFilterTag.slice(1)
    : currentFolder.charAt(0).toUpperCase() + currentFolder.slice(1);

  // Unread badge calculations
  const unreadCount = useMemo(() => {
    const userData = emailsState[currentUser];
    if (!userData || !userData.inbox) return 0;
    return userData.inbox.filter((e) => e.unread).length;
  }, [emailsState, currentUser]);

  const draftsCount = useMemo(() => {
    const userData = emailsState[currentUser];
    if (!userData || !userData.drafts) return 0;
    return userData.drafts.length;
  }, [emailsState, currentUser]);

  const isSelectedStarred = useMemo(() => {
    if (!selectedEmailId) return false;
    const starredList = emailsState[currentUser]?.starred || [];
    return starredList.some((e) => e.id === selectedEmailId);
  }, [emailsState, currentUser, selectedEmailId]);

  return (
    <>
      {!isLoggedIn && <LoginPage onLogin={handleLogin} />}

      <div className={`app-shell ${isLoggedIn ? "visible" : ""}`} id="app">
        <Sidebar
          currentUser={currentUser}
          currentFolder={currentFolder}
          activeFilterTag={activeFilterTag}
          unreadCount={unreadCount}
          draftsCount={draftsCount}
          onSelectFolder={handleSelectFolder}
          onSelectTag={handleSelectTag}
          onSwitchUser={handleSwitchUser}
          onOpenCompose={() => {
            setComposeInitialData({});
            setComposeOpen(true);
          }}
          onLogout={handleLogout}
        />

        <EmailList
          title={listTitle}
          emails={displayedEmails}
          selectedEmailId={selectedEmailId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectEmail={handleSelectEmail}
        />

        <EmailReader
          email={selectedEmail}
          onReply={handleReply}
          onForward={handleForward}
          onDelete={handleDeleteEmail}
          onToggleStar={handleToggleStar}
          isStarred={isSelectedStarred}
        />
      </div>

      <ComposeModal
        isOpen={composeOpen}
        initialData={composeInitialData}
        currentSenderEmail={users[currentUser]?.email}
        onClose={() => setComposeOpen(false)}
        onSend={handleSendEmail}
      />

      <div className={`toast ${showToast ? "visible" : ""}`}>
        {toastMessage}
      </div>
    </>
  );
}
