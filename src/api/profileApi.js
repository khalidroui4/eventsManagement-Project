import { API } from "../utils/constants";

export const updateProfile = async (data) => {
  const res = await fetch(`${API}/update_profile.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getMyParticipations = async (userId) => {
  const res = await fetch(
    `${API}/participations.php?action=list&user_id=${userId}`
  );
  return res.json();
};

export const getMyCreatedEvents = async (userId) => {
  const res = await fetch(
    `${API}/events.php?creator_id=${userId}`
  );
  return res.json();
};
