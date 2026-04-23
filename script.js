const API = "https://specter-chat-api.spectercat78.workers.dev"; 
// Use your real Worker URL here

// ---------------- SIGNUP ----------------
async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  document.getElementById("status").innerText = await res.text();
}

// ---------------- LOGIN ----------------
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("user", username);
    window.location = "chat.html";
  } else {
    document.getElementById("status").innerText = "Login failed";
  }
}

// ---------------- SEND MESSAGE ----------------
async function sendMessage() {
  const username = localStorage.getItem("user");
  const text = document.getElementById("msg").value;

  await fetch(API + "/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, text })
  });

  loadMessages();
}

// ---------------- LOAD MESSAGES ----------------
async function loadMessages() {
  const box = document.getElementById("messages");

  // If we're not on chat.html, stop.
  if (!box) return;

  const res = await fetch(API + "/messages");
  const msgs = await res.json();

  box.innerHTML = msgs
    .map(m => `<p><b>${m.username}:</b> ${m.text}</p>`)
    .join("");
}

// ---------------- AUTO REFRESH ONLY ON chat.html ----------------
if (window.location.pathname.includes("chat.html")) {
  setInterval(loadMessages, 2000);
  loadMessages();
}
