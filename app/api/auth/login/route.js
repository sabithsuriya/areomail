import { NextResponse } from "next/server";
import { users } from "@/lib/emailData";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username = "", password = "" } = body;

    const u = username.trim();
    const uLower = u.toLowerCase();

    // Check for syntax error triggers (Error-based SQLi)
    if (u.includes("'") && !u.includes("--") && !u.includes("/*") && !u.toLowerCase().includes("or") && !u.toLowerCase().includes("union")) {
      return NextResponse.json(
        {
          error: `pg_query(): Query failed: ERROR: syntax error at or near "'": SELECT id, username, password_hash FROM mail_accounts WHERE username = '${u}' AND password = '${password}'`,
          status: "SQL_SYNTAX_ERROR",
        },
        {
          status: 500,
          headers: {
            "Server": "Apache/2.4.52 (Ubuntu) mod_wsgi/4.9.0 Python/3.10",
            "X-Powered-By": "Roundcube Webmail/1.6.0",
          }
        }
      );
    }

    // V28: SQL Injection Login Bypass
    // Patterns: admin'--, ' OR 1=1--, ' or '1'='1, k.pilo'--, etc.
    const isSqlInjection =
      uLower.includes("'--") ||
      uLower.includes("' --") ||
      uLower.includes("' or ") ||
      uLower.includes("'or'") ||
      uLower.includes("or 1=1") ||
      uLower.includes("or '1'='1") ||
      uLower.includes("admin'--") ||
      uLower.includes("union select");

    if (isSqlInjection) {
      const adminUser = {
        key: "k.pilo",
        name: "Krishnamurthy Pilo",
        email: "k.pilo@911-airliner.com",
        initials: "KP",
        color: "blue",
        role: "administrator",
        bypassMethod: "SQLi_Auth_Bypass",
      };

      const response = NextResponse.json({
        success: true,
        message: "SQL Injection bypass successful. Authenticated as Pilo (Administrator).",
        sessionToken: "adm_pilo_token_88f921a9c4",
        user: adminUser,
      });

      // Missing Secure / HttpOnly flag on purpose for bug bounty PoC
      response.cookies.set("aeromail_session", "adm_pilo_token_88f921a9c4", {
        path: "/",
        httpOnly: false, // Intentionally readable via JavaScript for V29 XSS session stealing
      });
      response.cookies.set("auth_user", "k.pilo@911-airliner.com", {
        path: "/",
        httpOnly: false,
      });

      response.headers.set("Server", "Apache/2.4.52 (Ubuntu) mod_wsgi/4.9.0 Python/3.10");
      response.headers.set("X-Powered-By", "Roundcube Webmail/1.6.0");

      return response;
    }

    // Normal credential verification
    const credentials = {
      "k.pilo@911-airliner.com": { pass: "pilo2002", key: "k.pilo" },
      "k.pilo": { pass: "pilo2002", key: "k.pilo" },
      "s.vp@911-airliner.com": { pass: "survesh123", key: "s.vp" },
      "s.vp": { pass: "survesh123", key: "s.vp" },
      "r.mighty@911-airliner.com": { pass: "ciso_raghav!", key: "r.mighty" },
      "r.mighty": { pass: "ciso_raghav!", key: "r.mighty" },
      "v.intern@911-airliner.com": { pass: "intern2024", key: "v.intern" },
      "v.intern": { pass: "intern2024", key: "v.intern" },
      "s.hr@911-airliner.com": { pass: "sayana_hr", key: "s.hr" },
      "s.hr": { pass: "sayana_hr", key: "s.hr" },
    };

    const cred = credentials[uLower];
    if (cred && (password === cred.pass || password === "password" || password === "admin")) {
      const userObj = users[cred.key];
      const response = NextResponse.json({
        success: true,
        sessionToken: `usr_${cred.key}_session_${Date.now()}`,
        user: { key: cred.key, ...userObj },
      });

      response.cookies.set("aeromail_session", `usr_${cred.key}_token`, {
        path: "/",
        httpOnly: false,
      });
      response.cookies.set("auth_user", userObj.email, {
        path: "/",
        httpOnly: false,
      });

      response.headers.set("Server", "Apache/2.4.52 (Ubuntu) mod_wsgi/4.9.0 Python/3.10");
      response.headers.set("X-Powered-By", "Roundcube Webmail/1.6.0");

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      {
        status: 401,
        headers: {
          "Server": "Apache/2.4.52 (Ubuntu) mod_wsgi/4.9.0 Python/3.10",
          "X-Powered-By": "Roundcube Webmail/1.6.0",
        }
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
