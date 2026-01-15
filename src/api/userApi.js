import { API } from "../utils/constants";

export async function updateProfile(userData) {
  const res = await fetch(`${API}/update_profile.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });
  return res.json();
}
