import { API } from "../utils/constants";

/* GET ALL EVENTS */
export async function getAllEvents() {
  const res = await fetch(`${API}/events.php`);
  return res.json();
}

/* GET ONE EVENT */
export async function getEventById(id) {
  const res = await fetch(`${API}/events.php?id=${id}`);
  return res.json();
}

/* GET EVENTS BY ORGANIZER */
export async function getMyOrganizerEvents(userId) {
  const res = await fetch(`${API}/events.php?creator_id=${userId}`);
  return res.json();
}

/* CREATE EVENT (uses stored procedure Creer_event) */
export async function createEvent(event, user) {
  const res = await fetch(`${API}/events.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: event.event_name,
      dateE: event.dateE,
      capaciteE: event.capaciteE,
      creator_id: user.idU, // Use correct ID property
      placeE: event.placeE, // Add missing place
      descriptionE: event.descriptionE // Add missing description
    })
  });
  return res.json();
}

/* UPDATE EVENT */
export async function updateEvent(id, event) {
  const res = await fetch(`${API}/events.php?action=update&id=${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event)
  });
  return res.json();
}

/* DELETE EVENT */
export async function deleteEvent(eventId) {
  const res = await fetch(`${API}/events.php?action=delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: eventId })
  });
  return res.json();
}

