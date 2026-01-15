import { API } from "../utils/constants";

export async function login(email, motdepasse) {
  const res = await fetch(`${API}/authentification.php?action=login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, motdepasse })
  });
  return res.json();
}

export async function registerUser(data) {
  const res = await fetch(`${API}/authentification.php?action=register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

