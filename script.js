const API = "https://specter-chat-api.spectercat78.workers.dev";

// ================= HELPERS =================
function getUsername() {
  return document.getElementById("username").value.trim();
}

function getPassword() {
  return document.getElementById("password").value.trim();
}

function setStatus(msg, good = false) {
  const el = document.getElementById("status");
  el.style.color = good ? "#66ff66" : "#ff6666";
  el.innerText = msg;
}

// ================= SIGNUP =================
async function signup() {
  const username = getUsername();
  const password = getPassword();

  if (!username || !password) {
    setStatus("Enter username & password");
    return;
  }

  setStatus("Creating account...");

  try {
    const res = await fetch(API + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    console.log("SIGNUP STATUS:", res.status);

    const text = await res.text();
    console.log("SIGNUP RAW:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      setStatus("Bad server response");
      return;
    }

    if (data.success) {
      setStatus("Account created! You can log in.", true);
    } else {
      setStatus(data.error || "Signup failed");
    }

  } catch (err) {
    console.error(err);
    setStatus("Network error");
  }
}

// ================= LOGIN =================
async function login() {
  const username = getUsername();
  const password = getPassword();

  if (!username || !password) {
    setStatus("Enter username & password");
    return;
  }

  setStatus("Logging in...");

  try {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    console.log("LOGIN STATUS:", res.status);

    const text = await res.text();
    console.log("LOGIN RAW:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      setStatus("Server returned invalid JSON");
      return;
    }

    console.log("LOGIN PARSED:", data);

    if (data.success) {
      setStatus("Success! Redirecting...", true);
      localStorage.setItem("user", username);

      setTimeout(() => {
        window.location = "chat.html";
      }, 500);
    } else {
      setStatus("Invalid username or password");
    }

  } catch (err) {
    console.error(err);
    setStatus("Network error");
  }
}
