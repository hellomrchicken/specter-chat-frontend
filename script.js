const API = "https://specter-chat-api.spectercat78.workers.dev";

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

async function loadMessages() {
  const res = await fetch(API + "/messages");
  const msgs = await res.json();

  document.getElementById("messages").innerHTML =
    msgs.map(m => `<p><b>${m.username}:</b> ${m.text}</p>`).join("");
}

setInterval(loadMessages, 2000);
