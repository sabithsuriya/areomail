import { NextResponse } from "next/server";

const VALID_USERS = new Set([
  "k.pilo@911-airliner.com",
  "k.pilo",
  "g.prasanth@911-airliner.com",
  "g.prasanth",
  "guru",
  "s.vp@911-airliner.com",
  "s.vp",
  "r.mighty@911-airliner.com",
  "r.mighty",
  "v.intern@911-airliner.com",
  "v.intern",
  "s.hr@911-airliner.com",
  "s.hr",
  "b.kumaran@911-airliner.com",
  "b.kumaran",
  "k.president@911-airliner.com",
  "all-staff@911-airliner.com",
  "sabith@911-airliner.com",
]);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email") || searchParams.get("user") || "";
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    return NextResponse.json({ error: "Missing 'email' or 'user' parameter" }, { status: 400 });
  }

  if (VALID_USERS.has(cleanEmail)) {
    return new NextResponse(`250 2.1.5 <${cleanEmail}> User exists\n`, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Server": "Postfix/3.6.4 (Ubuntu) ESMTP Postfix",
      },
    });
  } else {
    return new NextResponse(`550 5.1.1 <${cleanEmail}>: Recipient address rejected: User unknown\n`, {
      status: 550,
      headers: {
        "Content-Type": "text/plain",
        "Server": "Postfix/3.6.4 (Ubuntu) ESMTP Postfix",
      },
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = (body.email || body.user || "").trim().toLowerCase();

    if (VALID_USERS.has(email)) {
      return NextResponse.json({
        code: 250,
        status: "OK",
        message: `250 2.1.5 <${email}> User exists`,
        exists: true,
      });
    } else {
      return NextResponse.json({
        code: 550,
        status: "User unknown",
        message: `550 5.1.1 <${email}>: Recipient address rejected: User unknown`,
        exists: false,
      }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
