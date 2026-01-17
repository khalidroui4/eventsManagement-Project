import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchParticipations } from "../store/profileSlice";
import { addEvaluation, getEvaluationsByEvent } from "../api/evaluationsApi";
import "../styles/eventDetails.css";
import PageTransition from "../utils/pageTransition";
import { API } from "../utils/constants";
import Skeleton from "../Components/common/Skeleton";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [event, setEvent] = useState(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [evaluations, setEvaluations] = useState([]);
  const [note, setNote] = useState(0);
  const [hoverNote, setHoverNote] = useState(0);
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (!user) return;

    fetch(`${API}/events.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data));

    fetch(
      `${API}/participations.php?action=check&user_id=${user.idU}&event_id=${id}`
    )
      .then((res) => res.json())
      .then((data) => setIsParticipating(data.exists === true));

    loadEvaluations();
  }, [id, user]);

  const loadEvaluations = async () => {
    const data = await getEvaluationsByEvent(id);
    setEvaluations(Array.isArray(data) ? data : []);
  };

  const hasEvaluated = evaluations.some((e) => e.user_id === user?.idU);

  const participate = async () => {
    await fetch(
      `${API}/participations.php?action=inscrire`,
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
      `${API}/participations.php?action=annuler`,
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

  const submitEvaluation = async (e) => {
    e.preventDefault();

    await addEvaluation({
      user_id: user.idU,
      event_id: id,
      note,
      comments: comment,
    });

    setNote(0);
    setComment("");
    loadEvaluations();
  };

  if (!user || !event) {
    return (
      <PageTransition>
        <div className="event-details-container">
          <div className="event-details-card">
            <div className="event-header">
              <Skeleton width="100px" height="30px" style={{ marginBottom: '20px', borderRadius: '20px' }} />
              <Skeleton width="60%" height="50px" style={{ marginBottom: '10px' }} />
              <Skeleton width="30%" height="20px" />
            </div>
            <div className="event-body">
              <div className="event-info" style={{ flex: 2 }}>
                <Skeleton width="100%" height="150px" style={{ borderRadius: '16px' }} />
              </div>
              <div className="event-sidebar" style={{ flex: 1 }}>
                <Skeleton width="100%" height="200px" style={{ borderRadius: '16px' }} />
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  const placesDispo = event.capaciteE - event.num_participant;

  return (
    <PageTransition>
      <div className="event-details-container">
        <div className="event-details-card">

          {/* HEADER */}
          <div className="event-header">
            <div className="event-badges">
              <span className={`etat ${event.etat}`}>{event.etat}</span>
              {event.etat === 'ouvert' && placesDispo < 5 && placesDispo > 0 && (
                <span className="etat complet" style={{ background: '#ffefef', color: '#e74c3c' }}>Plus que {placesDispo} places !</span>
              )}
            </div>
            <h1 className="event-title">{event.event_name}</h1>
            <p className="event-organizer">Organisé par <strong>{event.organizer_name}</strong></p>
          </div>

          {/* MAIN CONTENT */}
          <div className="event-body">

            {/* LEFT: INFO */}
            <div className="event-info">
              <h3>Détails de l'événement</h3>

              <div className="info-group">
                <div className="info-icon">📅</div>
                <div className="info-text">
                  <h4>Date & Heure</h4>
                  <p>{new Date(event.dateE).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              <div className="info-group">
                <div className="info-icon">📍</div>
                <div className="info-text">
                  <h4>Lieu</h4>
                  <p>{event.placeE || "Lieu non spécifié"}</p>
                </div>
              </div>

              <div className="description-box">
                {event.descriptionE || "Aucune description disponible pour cet événement."}
              </div>
            </div>

            {/* RIGHT: ACTIONS & SIDEBAR */}
            <div className="event-sidebar">
              <div className="stat-grid">
                <div className="stat-item">
                  <strong>{event.num_participant}</strong>
                  <span>Participants</span>
                </div>
                <div className="stat-item">
                  <strong>{placesDispo}</strong>
                  <span>Restantes</span>
                </div>
                <div className="stat-item">
                  <strong>{event.capaciteE}</strong>
                  <span>Capacité</span>
                </div>
                <div className="stat-item">
                  <strong>{evaluations.length}</strong>
                  <span>Avis</span>
                </div>
              </div>

              <div className="action-buttons">
                {!isParticipating ? (
                  <button className="participate-btn" onClick={participate} disabled={event.etat !== 'ouvert'}>
                    {event.etat === 'ouvert' ? 'Je participe !' : 'Non disponible'}
                  </button>
                ) : (
                  <button className="cancel-btn" onClick={cancelParticipation}>
                    Annuler ma participation
                  </button>
                )}
                <div className="back-btn" onClick={() => navigate(-1)}>
                  ← Retour aux événements
                </div>
              </div>
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <div className="reviews-section">

            {/* FORM */}
            {isParticipating && !hasEvaluated && (
              <div className="review-input-box">
                <h3>Voter expérience compte 💬</h3>
                <form onSubmit={submitEvaluation}>
                  <div className="rating-select">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        style={{ cursor: "pointer", color: (hoverNote || note) >= s ? "#f4c430" : "#ddd", transition: '0.2s' }}
                        onClick={() => setNote(s)}
                        onMouseEnter={() => setHoverNote(s)}
                        onMouseLeave={() => setHoverNote(0)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <textarea
                    className="review-textarea"
                    placeholder="Qu'avez-vous pensé de cet événement ?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                  <button type="submit" className="participate-btn" style={{ width: 'auto', padding: '10px 30px' }}>
                    Envoyer mon avis
                  </button>
                </form>
              </div>
            )}

            <h3>Avis des participants ({evaluations.length})</h3>
            <div className="reviews-list">
              {evaluations.length === 0 ? (
                <p style={{ color: '#888', fontStyle: 'italic' }}>Aucun avis pour le moment. Soyez le premier à donner le vôtre !</p>
              ) : (
                evaluations.map((e) => (
                  <div key={e.ide} className="review-card">
                    {e.profile_image ? (
                      <img
                        src={`http://localhost/project_backend/${e.profile_image}`}
                        alt={e.username}
                        className="avatar-placeholder" // Keep same class for size/shape
                        style={{ objectFit: 'cover', padding: 0, border: 'none' }}
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {e.username[0].toUpperCase()}
                      </div>
                    )}
                    <div className="review-content">
                      <strong>{e.username}</strong>
                      <span className="review-date">{new Date(e.date_eval).toLocaleDateString()}</span>
                      <div className="review-stars">
                        {'★'.repeat(e.note)}{'☆'.repeat(5 - e.note)}
                      </div>
                      <p className="review-text">{e.comments}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
