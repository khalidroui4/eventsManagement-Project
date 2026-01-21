import { API } from "../utils/constants";

export async function getAllEvents() {
  const res = await fetch(`${API}/events.php`, { credentials: "include" });
  return res.json();
}

export async function getEventById(id) {
  const res = await fetch(`${API}/events.php?id=${id}`, { credentials: "include" });
  return res.json();
}

export async function getMyOrganizerEvents(userId) {
  const res = await fetch(`${API}/events.php?creator_id=${userId}`, { credentials: "include" });
  return res.json();
}
export async function createEvent(event, user) {
  const res = await fetch(`${API}/events.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      event_name: event.event_name,
      dateE: event.dateE,
      capaciteE: event.capaciteE,
      creator_id: user.idU, 
      placeE: event.placeE, 
      descriptionE: event.descriptionE 
    })
  });
  return res.json();
}

export async function updateEvent(id, event) {
  const res = await fetch(`${API}/events.php?action=update&id=${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(event)
  });
  return res.json();
}

export async function deleteEvent(eventId) {
  const res = await fetch(`${API}/events.php?action=delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id: eventId })
  });
  return res.json();
}

