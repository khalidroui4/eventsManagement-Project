import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchParticipations } from "../store/profileSlice";
import "../styles/events.css";
import PageTransition from "../utils/pageTransition";
import { useNavigate } from "react-router-dom";


export default function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [isParticipating, setIsParticipating] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Load event details
    fetch(`http://localhost/project_backend/events.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error("Event error:", err));

    // Check if user already participates
    fetch(
      `http://localhost/project_backend/participations.php?action=check&user_id=${user.idU}&event_id=${id}`
    )
      .then((res) => res.json())
      .then((data) => setIsParticipating(data.exists === true))
      .catch((err) => console.error("Participation check error:", err));
  }, [id, user]);

  const participate = async () => {
    await fetch(
      "http://localhost/project_backend/participations.php?action=inscrire",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.idU,
          event_id: id,
        }),
      }
    );

    setIsParticipating(true);
    dispatch(fetchParticipations(user.idU));
  };

  const cancelParticipation = async () => {
    await fetch(
      "http://localhost/project_backend/participations.php?action=annuler",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.idU,
          event_id: id,
        }),
      }
    );

    setIsParticipating(false);
    dispatch(fetchParticipations(user.idU));
  };

  // 🔥 Protect rendering
  if (!user || !event) return <p>Chargement...</p>;

  return (
    <PageTransition>
      <div className="event-details-container">
        <div className="event-details-card">
          <span className={`etat ${event.etat}`}>{event.etat}</span>

          <h2>{event.event_name}</h2>

          <p>
            <strong>Date :</strong> {event.dateE}
          </p>
          <p>
            <strong>Lieu :</strong> {event.placeE}
          </p>
          <p>
            <strong>Organisateur :</strong> {event.creator}
          </p>
          <p>
            <strong>Capacité :</strong> {event.capaciteE}
          </p>

          <p className="description">{event.descriptionE}</p>

          {!isParticipating ? (
            <button className="participate-btn" onClick={participate}>
              Participer
            </button>
          ) : (
            <button className="cancel-btn" onClick={cancelParticipation}>
              Annuler la participation
            </button>
          )}
          <button style={{marginLeft:"20px"}}
  className="participate-btn"
  onClick={() => navigate(-1)}
>
  ← Retour
</button>

        </div>
      </div>
    </PageTransition>
  );
}
