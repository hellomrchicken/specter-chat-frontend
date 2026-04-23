const API = "https://specter-chat-api.spectercat78.workers.dev";

// ---------------- SIGNUP ----------------
async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    document.getElementById("status").innerText = "Enter username + password";
    return;
  }

  try {
    const res = await fetch(API + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const text = await res.text();
    document.getElementById("status").innerText = text;
  } catch {
    document.getElementById("status").innerText = "Server error";
  }
}
function testSound() {
  dmSound.play()
    .then(() => console.log("sound works"))
    .catch(err => console.error("sound failed:", err));
}
// ---------------- LOGIN ----------------
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    document.getElementById("status").innerText = "Enter username + password";
    return;
  }

  try {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    let data;
    try {
      data = await res.json();
    } catch {
      document.getElementById("status").innerText = "Server error";
      return;
    }

    if (data.success) {
      localStorage.setItem("user", username);
      window.location = "chat.html";
    } else {
      document.getElementById("status").innerText = "Login failed";
    }
  } catch {
    document.getElementById("status").innerText = "Server error";
  }
}
