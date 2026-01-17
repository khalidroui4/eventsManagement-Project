import { API } from "../utils/constants";

export const updateProfile = async (formData) => {
  const res = await fetch(`${API}/update_profile.php`, {
    method: "POST",
    // headers: { "Content-Type": "application/json" }, // Remove this to let browser set boundary for FormData
    body: formData
  });
  return res.json();
};

export const uploadAvatar = async (formData) => {
  const res = await fetch(`${API}/upload_avatar.php`, {
    method: "POST",
    body: formData
  });
  return res.json();
};

/* 🔥 FIX HERE */
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
