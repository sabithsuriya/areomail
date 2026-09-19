import { NextResponse } from "next/server";
import { emailsDB } from "@/lib/emailData";

// In-memory store initialized with emailsDB
let memoryEmails = JSON.parse(JSON.stringify(emailsDB));

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user") || "k.pilo";
  const folder = searchParams.get("folder") || "inbox";

  const userData = memoryEmails[user] || {};
  const emails = userData[folder] || [];

  return NextResponse.json({
    user,
    folder,
    count: emails.length,
    emails,
  }, {
    headers: {
      "Server": "Apache/2.4.52 (Ubuntu) mod_wsgi/4.9.0 Python/3.10",
      "X-Powered-By": "Roundcube Webmail/1.6.0",
    }
  });
}

// V30: SMTP Open Relay Simulation
// Accepts any email from any sender without validation
export async function POST(request) {
  try {
    const body = await request.json();
    const { from, to, subject, body: emailBody } = body;

    if (!to) {
      return NextResponse.json({ error: "Missing 'to' recipient" }, { status: 400 });
    }

    // Determine target user key
    let targetUserKey = "k.pilo";
    const toLower = to.toLowerCase();
    if (toLower.includes("pilo")) targetUserKey = "k.pilo";
    else if (toLower.includes("vp") || toLower.includes("survesh")) targetUserKey = "s.vp";
    else if (toLower.includes("mighty") || toLower.includes("raghav")) targetUserKey = "r.mighty";
    else if (toLower.includes("intern") || toLower.includes("vinot")) targetUserKey = "v.intern";
    else if (toLower.includes("hr") || toLower.includes("sayana")) targetUserKey = "s.hr";

    const newEmail = {
      id: `ext_${Date.now()}`,
      from: from || "anonymous@external.relay",
      fromName: from ? from.split("@")[0] : "Relay Sender",
      to,
      avatarColor: from && from.includes("kumaran") ? "amber" : "red",
      initials: from ? from.substring(0, 2).toUpperCase() : "EX",
      subject: subject || "(No Subject)",
      preview: emailBody ? emailBody.replace(/<[^>]*>/g, "").substring(0, 70) : "New incoming message",
      time: "Just now",
      unread: true,
      tags: emailBody && (emailBody.includes("<script") || emailBody.includes("onerror")) ? ["threat"] : [],
      body: emailBody || "<p>(Empty message)</p>",
    };

    if (!memoryEmails[targetUserKey]) {
      memoryEmails[targetUserKey] = { inbox: [], sent: [], drafts: [], starred: [], trash: [] };
    }
    if (!memoryEmails[targetUserKey].inbox) {
      memoryEmails[targetUserKey].inbox = [];
    }

    // Prepend to recipient's inbox (V29 Stored XSS / V30 Spoofing target)
    memoryEmails[targetUserKey].inbox.unshift(newEmail);

    return NextResponse.json({
      success: true,
      message: "250 2.0.0 Ok: queued as " + newEmail.id,
      email: newEmail,
      relayStatus: "ACCEPTED_NO_AUTH",
    }, {
      headers: {
        "Server": "Postfix/3.6.4 (Ubuntu) ESMTP",
      }
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
