import { API } from "../utils/constants";

export const updateProfile = async (formData) => {
  const res = await fetch(`${API}/update_profile.php`, {
    method: "POST",

    credentials: "include",
    body: formData
  });
  return res.json();
};

export const uploadAvatar = async (formData) => {
  const res = await fetch(`${API}/upload_avatar.php`, {
    method: "POST",
    credentials: "include",
    body: formData
  });
  return res.json();
};

export const getMyParticipations = async (userId) => {
  const res = await fetch(
    `${API}/participations.php?action=list&user_id=${userId}`,
    { credentials: "include" }
  );
  return res.json();
};

export const getMyCreatedEvents = async (userId) => {
  const res = await fetch(
    `${API}/events.php?creator_id=${userId}`,
    { credentials: "include" }
  );
  return res.json();
};
