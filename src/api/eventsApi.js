import { API } from "../utils/constants";

export async function getEventsForUser() {
  const res = await fetch(`${API}/events.php?role=user`);
  return res.json();
}

export async function getMyOrganizerEvents(userId) {
  const res = await fetch(`${API}/events.php?role=organizer&user_id=${userId}`);
  return res.json();
}

export async function getAllEventsAdmin() {
  const res = await fetch(`${API}/events.php?role=admin`);
  return res.json();
}

export async function createEvent(event, user) {
  const res = await fetch(`${API}/events.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...event, user_id: user.id, role: user.role })
  });
  return res.json();
}

export async function deleteEvent(eventId) {
  const res = await fetch(`${API}/events.php?id=${eventId}&role=admin`, {
    method: "DELETE"
  });
  return res.json();
}
