const API = "https://specter-chat-api.spectercat78.workers.dev";

const status = document.getElementById("status");

function getUser() {
  return document.getElementById("username").value.trim();
}

function getPass() {
  return document.getElementById("password").value.trim();
}

function set(msg, ok = false) {
  status.style.color = ok ? "lightgreen" : "red";
  status.innerText = msg;
}

// ================= SIGNUP =================
async function signup() {
  const username = getUser();
  const password = getPass();

  if (!username || !password) return set("Fill in all fields");

  set("Signing up...");

  const res = await fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) set("Account created!", true);
  else set(data.error || "Signup failed");
}

// ================= LOGIN =================
async function login() {
  const username = getUser();
  const password = getPass();

  if (!username || !password) return set("Fill in all fields");

  set("Logging in...");

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("user", username);
    set("Success!", true);

    setTimeout(() => {
      window.location = "chat.html";
    }, 500);
  } else {
    set("Invalid username or password");
  }
}
