import { API } from "../utils/constants";

export const sendOrganizerRequest = async (user_id, message) => {
  const res = await fetch(`${API}/organizer_requests.php?action=send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ user_id, message })
  });
  return res.json();
};

export const fetchOrganizerRequests = async () => {
  const res = await fetch(`${API}/admin.php?action=organizer_requests`, { credentials: "include" });
  return res.json();
};

export const approveOrganizerRequest = async (user_id) => {
  const res = await fetch(`${API}/admin.php?action=accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ user_id })
  });
  return res.json();
};

export const rejectOrganizerRequest = async (user_id) => {
  const res = await fetch(`${API}/admin.php?action=refuse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ user_id })
  });
  return res.json();
};
