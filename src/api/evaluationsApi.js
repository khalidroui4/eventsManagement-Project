import { API } from "../utils/constants";

export const addEvaluation = async (data) => {
  const res = await fetch(`${API}/evaluations.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getEvaluationsByEvent = async (eventId) => {
  const res = await fetch(`${API}/evaluations.php?event_id=${eventId}`, { credentials: "include" });
  return res.json();
};

export const deleteEvaluation = async (id) => {
  const res = await fetch(`${API}/evaluations.php?id=${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  return res.json();
};
