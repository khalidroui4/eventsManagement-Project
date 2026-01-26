import { API } from "../utils/constants";

export async function updateProfile(userData) {
  const res = await fetch(`${API}/update_profile.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(userData)
  });
  return res.json();
}

export async function getPublicUser(id) {
  const res = await fetch(`${API}/get_public_user.php?id=${id}`, { credentials: "include" });
  return res.json();
}
