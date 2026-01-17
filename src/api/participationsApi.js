import { API } from "../utils/constants";

/* =========================
   PARTICIPATE IN EVENT
   ========================= */
export const participateInEvent = async (user_id, event_id) => {
  const res = await fetch(`${API}/participations.php?action=inscrire`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ user_id, event_id })
  });
  return res.json();
};

/* =========================
   CANCEL PARTICIPATION
   ========================= */
export const cancelParticipation = async (user_id, event_id) => {
  const res = await fetch(`${API}/participations.php?action=annuler`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ user_id, event_id })
  });
  return res.json();
};

/* =========================
   CHECK IF USER PARTICIPATES
   ========================= */
export const checkParticipation = async (user_id, event_id) => {
  const res = await fetch(
    `${API}/participations.php?action=check&user_id=${user_id}&event_id=${event_id}`,
    { credentials: "include" }
  );
  return res.json();
};
