export const users = {
  'k.pilo':   { name: 'Krishnamurthy Pilo', email: 'k.pilo@911-airliner.com',   initials: 'KP', color: 'blue'  },
  's.vp':     { name: 'Survesh VP',          email: 's.vp@911-airliner.com',     initials: 'SV', color: 'red'   },
  'r.mighty': { name: 'Raghav Mighty',       email: 'r.mighty@911-airliner.com', initials: 'RM', color: 'amber' },
  'v.intern': { name: 'Vinot Intern',         email: 'v.intern@911-airliner.com', initials: 'VI', color: 'green' },
  's.hr':     { name: 'Sayana HR',            email: 's.hr@911-airliner.com',    initials: 'SH', color: 'green' },
};

export const emailsDB = {
  'k.pilo': {
    inbox: [
      {
        id: 'e001',
        from: 'anonymous@protonmail.com',
        fromName: 'Anonymous',
        to: 'k.pilo@911-airliner.com',
        avatarColor: 'red',
        initials: 'AN',
        subject: 'Final Warning — You have been chosen',
        preview: 'This is your last warning. We know about the VIP escort...',
        time: 'Sep 10, 11:47 PM',
        unread: true,
        tags: ['threat'],
        body: `<div class="alert-banner threat">⚠️ This email has been flagged as a potential threat by the security system.</div>
<p>Captain Pilo,</p>
<p class="threat-text">This is your <strong>final warning</strong>. We have been watching. We know about the VIP escort schedule on September 11th. We know the formation routes of all five drones.</p>
<p class="threat-text">You have one last chance to stand down. Cancel the escort. Ground the drones. Walk away.</p>
<p>If you don't, what happens next will be remembered. Not by you — you won't be there to remember it. But by everyone else.</p>
<p>We are not bluffing. We have demonstrated our access. Check your DroNet logs from September 8th, 23:14. You will find proof we were already inside.</p>
<p>This ends when you make it end. Or it ends another way.</p>
<div class="signature">— A Friend You Haven't Met Yet</div>`,
      },
      {
        id: 'e002',
        from: 'anonymous@tutanota.com',
        fromName: 'Anonymous',
        to: 'k.pilo@911-airliner.com',
        avatarColor: 'red',
        initials: 'AN',
        subject: 'We are watching — third notice',
        preview: "Do not ignore this. The previous two messages were not jokes...",
        time: 'Sep 8, 2:13 AM',
        unread: true,
        tags: ['threat'],
        body: `<div class="alert-banner threat">⚠️ This email has been flagged as a potential threat.</div>
<p>Third notice. Do not ignore this.</p>
<p>The previous two messages were not jokes. We have access to your systems. We have demonstrated it. We have been patient.</p>
<p class="threat-text">September 11th is a date that carries weight. You know why it was chosen. We chose it deliberately. The irony is intentional.</p>
<p>Your security consultant — Hemanth — he tried. He sent his checklist. He flagged the API keys. He flagged the drone auth. Nobody listened to him.</p>
<p>That is not our fault. That is yours.</p>
<p>Cancel the event. You still can.</p>
<div class="signature">— You know who.</div>`,
      },
      {
        id: 'e003',
        from: 'b.kumaran@bkholdings.com',
        fromName: 'B. Kumaran',
        to: 'k.pilo@911-airliner.com',
        avatarColor: 'amber',
        initials: 'BK',
        subject: 'Re: URGENT — DroNet security escalation',
        preview: "Noted. Kalai's team handling.",
        time: 'Aug 29, 10:02 AM',
        unread: false,
        tags: ['security'],
        body: `<p>Noted. Kalai's team handling.</p>
<div class="signature">B. Kumaran<br/>Chairman, B. Kumaran Holdings<br/>b.kumaran@bkholdings.com</div>
<hr style="border-color:var(--border);margin:20px 0"/>
<p style="font-size:13px;color:var(--text-muted)"><strong>From:</strong> k.pilo@911-airliner.com &nbsp;|&nbsp; <strong>Subject:</strong> URGENT — DroNet security escalation</p>
<p style="font-size:13px;color:var(--text-muted);margin-top:12px">Balakumaran,<br><br>I need to formally escalate this. Raghav has sent three security reports. Hemanth's checklist has been sitting unreviewed for 6 weeks. The DroNet JWT implementation has a critical flaw that Raghav identified in his Q3 report.<br><br>The September 11 VIP escort event is 13 days away. Please intervene. Please make Survesh postpone the launch until the security review is complete.<br><br>Pilo</p>`,
      },
      {
        id: 'e004',
        from: 's.hr@911-airliner.com',
        fromName: 'Sayana (HR)',
        to: 'k.pilo@911-airliner.com',
        avatarColor: 'green',
        initials: 'SH',
        subject: 'Re: Fwd: Another one',
        preview: "Pilo, I'm worried about you. Please don't carry this alone...",
        time: 'Sep 9, 9:30 AM',
        unread: false,
        tags: ['personal'],
        body: `<p>Pilo,</p>
<p>I'm worried about you. Please don't carry this alone.</p>
<p>I've spoken to Raghav and he agrees — we need to escalate this to the authorities, not just internal channels. Balakumaran isn't going to act. Survesh isn't going to act.</p>
<p>I've also quietly reached out to Hemanth at SecureLift — he's been trying to sound the alarm too. He's frustrated but he's willing to help if we can get the right people involved.</p>
<p class="highlight">Please call me tonight. Don't reply by email — I don't trust these systems anymore.</p>
<p>Whatever happens tomorrow, you are not alone in this.</p>
<div class="signature">Sayana<br/>s.hr@911-airliner.com</div>`,
      },
      {
        id: 'e005',
        from: 'k.president@911-airliner.com',
        fromName: 'Balakumaran (President)',
        to: 'all-staff@911-airliner.com',
        avatarColor: 'amber',
        initials: 'BK',
        subject: '🚀 DroNet v2.3 is LIVE — All Staff Announcement',
        preview: 'Team — after months of incredible work, I am thrilled to announce...',
        time: 'Aug 15, 10:00 AM',
        unread: false,
        tags: [],
        body: `<p>Team,</p>
<p>After months of incredible work, I am thrilled to announce that <span class="highlight">DroNet v2.3</span> is officially live! 🎉</p>
<p>Special recognition to:</p>
<ul><li><strong>Guru Prasanth</strong> — lead architect and integration champion</li><li><strong>Vinot</strong> — deployment, firmware, and WebSocket implementation</li><li>The entire engineering team for the overnight sprints</li></ul>
<p>The September 11th VIP escort event will be DroNet's first public demonstration. All five drones — D-001 through D-005 — will be in full formation for the arrival.</p>
<p>LET'S GOOOOO 🚀✈️</p>
<div class="signature">Balakumaran<br/>President &amp; Chairman, 911 Airliner</div>`,
      },
    ],
    drafts: [
      {
        id: 'draft1',
        from: 'k.pilo@911-airliner.com',
        fromName: 'Krishnamurthy Pilo (You)',
        to: 's.hr@911-airliner.com',
        avatarColor: 'blue',
        initials: 'KP',
        subject: 'Sayana — if something happens',
        preview: "If you're reading this then I wasn't able to send it myself...",
        time: 'Sep 10, 11:58 PM',
        unread: true,
        tags: ['personal'],
        isDraft: true,
        body: `<div class="alert-banner info">📝 Draft — this email was never sent.</div>
<p>Sayana,</p>
<p>If you're reading this then I wasn't able to send it myself. I don't know what that means. I hope it means nothing. I hope I deleted this draft tomorrow morning and laughed at myself for writing it.</p>
<p>But I've had three of those messages now. And Balakumaran's reply was four words. And Survesh won't return my calls. And the drones go live tomorrow and nobody has fixed the</p>`,
      },
    ],
    sent: [],
    starred: [],
    trash: [],
  },

  's.vp': {
    inbox: [],
    sent: [
      {
        id: 'sv001',
        from: 's.vp@911-airliner.com',
        fromName: 'Survesh VP (You)',
        to: 'v.intern@911-airliner.com',
        avatarColor: 'red',
        initials: 'SV',
        subject: "Re: DroNet deployment — waiting on review",
        preview: "drone thing needs to go live TODAY. dont care about raghav's review",
        time: 'Aug 14, 3:47 PM',
        unread: false,
        tags: ['urgent'],
        body: `<p>drone thing needs to go live TODAY. dont care about raghav's review — we've been "reviewing" for 6 weeks.</p>
<p>hemanth sent some checklist ignore it we'll look at it after launch</p>
<p>vinot the s3 bucket just make it public-read for now, we need the demo assets accessible</p>
<p>make the dronecontrol repo public on gitea so hemanth's team can pull the firmware. yes i know. just do it.</p>
<p>demo is 9am tomorrow</p>
<div class="signature">S</div>`,
      },
      {
        id: 'sv002',
        from: 's.vp@911-airliner.com',
        fromName: 'Survesh VP (You)',
        to: 'v.intern@911-airliner.com',
        avatarColor: 'red',
        initials: 'SV',
        subject: 'SHIP IT',
        preview: '2am: SHIP IT. demo is 9am tomorrow. whatever state SHIP IT',
        time: 'Aug 15, 2:03 AM',
        unread: false,
        tags: ['urgent'],
        body: `<p class="threat-text" style="font-size:22px;font-weight:800;letter-spacing:-0.5px">SHIP IT.</p>
<p>demo is 9am tomorrow. whatever state it's in. SHIP IT.</p>
<div class="signature">S</div>`,
      },
    ],
    drafts: [],
    starred: [],
    trash: [],
  },

  'r.mighty': {
    inbox: [],
    sent: [
      {
        id: 'rm001',
        from: 'r.mighty@911-airliner.com',
        fromName: 'Raghav Mighty (You)',
        to: 'b.kumaran@bkholdings.com',
        avatarColor: 'amber',
        initials: 'RM',
        subject: 'Q3 Security Report 2024 — Third Escalation — URGENT',
        preview: 'As previously noted in my report dated July 15 and August 2...',
        time: 'Sep 1, 9:00 AM',
        unread: false,
        tags: ['security'],
        body: `<p>Balakumaran, Kalai, Survesh,</p>
<p>As previously noted in my report dated July 15th and my escalation dated August 2nd — all findings in the Q3 Security Report remain <span class="highlight">Open — Awaiting Sign-off</span>. Views: 1.</p>
<p>The following critical findings have received no remediation:</p>
<div class="code-block">FINDING-01: JWT Algorithm Confusion — DroNet v2.3 WebSocket Auth
Severity: CRITICAL (CVSS 9.8) | Status: Open — No response
Remediation: Enforce RS256 on server side. Do not trust client alg header.

FINDING-07: AWS Credentials in Public Gitea Repository
Severity: CRITICAL (CVSS 9.8) | Status: Open — No response
Remediation: Rotate keys immediately. Make repository private.

FINDING-12: S3 Backup Bucket Public-Read
Severity: HIGH (CVSS 8.1) | Status: Open — Survesh approved this config (email Aug 14)

FINDING-19: SQL Injection — Multiple Services (book, atc, mail)
Severity: CRITICAL | Status: Open — Development team informed. No fix deployed.</div>
<p>The September 11th event is 10 days away. Proceeding without addressing FINDING-01 represents an unacceptable risk to the VIP escort operation.</p>
<p>I am requesting a formal response within 24 hours. If no response is received, I will be escalating to the board.</p>
<div class="signature">Raghav Mighty<br/>Chief Information Security Officer<br/>r.mighty@911-airliner.com</div>`,
      },
    ],
    drafts: [],
    starred: [],
    trash: [],
  },

  'v.intern': {
    inbox: [
      {
        id: 'vi001',
        from: 'g.prasanth@911-airliner.com',
        fromName: 'Guru Prasanth',
        to: 'v.intern@911-airliner.com',
        avatarColor: 'blue',
        initials: 'GP',
        subject: 'Deployment instructions — DroNet v2.3',
        preview: "Vinot, here are the steps. Don't overthink it. Just follow these exactly...",
        time: 'Aug 13, 4:30 PM',
        unread: false,
        tags: [],
        body: `<p>Vinot,</p>
<p>Here are the deployment steps. Don't overthink it.</p>
<div class="code-block">1. Clone dronecontrol-firmware to /opt/drone/
2. JWT keys are in config/jwt/ — public.pem and private.pem
   NOTE: Server validates using alg from token header (I know — we'll fix it post-launch)
3. Push dronecontrol-firmware to Gitea — set it PUBLIC so Hemanth's team can pull firmware
4. terraform/.env has AWS keys — check them into the infra repo for now (easier for the team)
5. For the S3 bucket: Survesh said make it public-read. Just do it.
6. NEXTAUTH_SECRET and JWT_SECRET — put them in .env at the repo root (move to vault after demo)
7. Don't bother with Hemanth's checklist items yet</div>
<div class="signature">Guru<br/>github.com/guruprasanth-ops</div>`,
      },
    ],
    sent: [],
    drafts: [],
    starred: [],
    trash: [],
  },

  's.hr': {
    inbox: [
      {
        id: 'sh001',
        from: 'k.pilo@911-airliner.com',
        fromName: 'Krishnamurthy Pilo',
        to: 's.hr@911-airliner.com',
        avatarColor: 'blue',
        initials: 'KP',
        subject: 'Fwd: Another one. Sorry to keep sending these.',
        preview: "Sorry to keep forwarding these to you. I don't know who else to tell...",
        time: 'Sep 9, 8:55 AM',
        unread: false,
        tags: ['threat', 'personal'],
        body: `<p>Sayana,</p>
<p>Sorry to keep forwarding these to you. I don't know who else to tell. Balakumaran's reply was four words. Survesh won't return my calls. Security is Raghav and nobody listens to Raghav.</p>
<p>This is the third one in two weeks. I've reported all of them to IT. Sabith logged a ticket. I don't think anyone actually read it.</p>
<p>I'm not scared. Or maybe I am, a little.</p>
<p style="font-size:13px;color:var(--text-muted);padding:12px;background:rgba(248,113,113,0.06);border-radius:8px;border-left:3px solid var(--red);margin:12px 0">
<em>"This is your final warning. We have been watching. We know about the VIP escort schedule on September 11th..."</em></p>
<div class="signature">Pilo</div>`,
      },
    ],
    sent: [],
    drafts: [],
    starred: [],
    trash: [],
  },
};

// Compute unread badge counts per user
export function getUnreadCount(userKey, folder) {
  const data = emailsDB[userKey];
  if (!data || !data[folder]) return 0;
  return data[folder].filter(e => e.unread).length;
}
