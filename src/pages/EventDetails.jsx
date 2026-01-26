import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
      `${API}/participations.php?action=check&user_id=${user.idU}&event_id=${id}`,
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
    await fetch(`${API}/participations.php?action=inscrire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.idU,
        event_id: id,
      }),
    });

    setIsParticipating(true);
    dispatch(fetchParticipations(user.idU));
  };

  const cancelParticipation = async () => {
    await fetch(`${API}/participations.php?action=annuler`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.idU,
        event_id: id,
      }),
    });

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
              <Skeleton
                width="100px"
                height="30px"
                style={{ marginBottom: "20px", borderRadius: "20px" }}
              />
              <Skeleton
                width="60%"
                height="50px"
                style={{ marginBottom: "10px" }}
              />
              <Skeleton width="30%" height="20px" />
            </div>
            <div className="event-body">
              <div className="event-info" style={{ flex: 2 }}>
                <Skeleton
                  width="100%"
                  height="150px"
                  style={{ borderRadius: "16px" }}
                />
              </div>
              <div className="event-sidebar" style={{ flex: 1 }}>
                <Skeleton
                  width="100%"
                  height="200px"
                  style={{ borderRadius: "16px" }}
                />
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
              {event.etat === "ouvert" &&
                placesDispo < 5 &&
                placesDispo > 0 && (
                  <span
                    className="etat complet"
                    style={{ background: "#ffefef", color: "#e74c3c" }}
                  >
                    Plus que {placesDispo} places !
                  </span>
                )}
            </div>
            <h1 className="event-title">{event.event_name}</h1>

            <div className="event-organizer-badge-container">
              <span style={{ opacity: 0.8, marginRight: "10px" }}>
                Organisé par
              </span>
              <Link
                to={`/user/${event.creator_id}`}
                className="organizer-badge"
              >
                {event.organizer_image ? (
                  <img
                    src={`http://localhost/project_backend/${event.organizer_image}`}
                    alt={event.organizer_name}
                    className="organizer-badge-img"
                  />
                ) : (
                  <div className="organizer-badge-placeholder">
                    {event.organizer_name
                      ? event.organizer_name[0].toUpperCase()
                      : "?"}
                  </div>
                )}
                <span className="organizer-badge-name">
                  @{event.organizer_name}
                </span>
              </Link>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="event-body">
            {/* LEFT: INFO */}
            <div className="event-info">
              <h3>Détails de l'événement</h3>

              <div className="info-group">
                <div className="info-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="info-text">
                  <h4>Date & Heure</h4>
                  <p>
                    {new Date(event.dateE).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="info-group">
                <div className="info-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="info-text">
                  <h4>Lieu</h4>
                  <p>{event.placeE || "Lieu non spécifié"}</p>
                </div>
              </div>

              <div className="description-box">
                {event.descriptionE ||
                  "Aucune description disponible pour cet événement."}
              </div>

              {Number(event.moyenne) > 0 && (
                <div className="info-group" style={{ marginTop: "20px" }}>
                  <div
                    className="info-icon"
                    style={{
                      color: "#f4c430",
                      borderColor: "#f4c430",
                      background: "rgba(244, 196, 48, 0.1)",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <div className="info-text">
                    <h4>Note moyenne</h4>
                    <p style={{ fontSize: "1.2rem", color: "#f4c430" }}>
                      {parseFloat(event.moyenne).toFixed(1)} / 5.0
                    </p>
                  </div>
                </div>
              )}
            </div>

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
                  <button
                    className="participate-btn"
                    onClick={participate}
                    disabled={event.etat !== "ouvert"}
                  >
                    {event.etat === "ouvert"
                      ? "Je participe !"
                      : "Non disponible"}
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

          <div className="reviews-section">
            {isParticipating && !hasEvaluated && (
              <div className="review-input-box">
                <h3>
                  Voter expérience compte{" "}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </h3>
                <form onSubmit={submitEvaluation}>
                  <div className="rating-select">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        style={{
                          cursor: "pointer",
                          color: (hoverNote || note) >= s ? "#f4c430" : "#ddd",
                          transition: "0.2s",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => setNote(s)}
                        onMouseEnter={() => setHoverNote(s)}
                        onMouseLeave={() => setHoverNote(0)}
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
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
                  <button
                    type="submit"
                    className="participate-btn"
                    style={{ width: "auto", padding: "10px 30px" }}
                  >
                    Envoyer mon avis
                  </button>
                </form>
              </div>
            )}

            <h3>Avis des participants ({evaluations.length})</h3>
            <div className="reviews-list">
              {evaluations.length === 0 ? (
                <p style={{ color: "#888", fontStyle: "italic" }}>
                  Aucun avis pour le moment. Soyez le premier à donner le vôtre
                  !
                </p>
              ) : (
                evaluations.map((e) => (
                  <div key={e.ide} className="review-card">
                    {e.profile_image ? (
                      <Link to={`/user/${e.user_id}`}>
                        <img
                          src={`http://localhost/project_backend/${e.profile_image}`}
                          alt={e.username}
                          className="avatar-placeholder"
                          style={{
                            objectFit: "cover",
                            padding: 0,
                            border: "none",
                            cursor: "pointer",
                          }}
                        />
                      </Link>
                    ) : (
                      <Link
                        to={`/user/${e.user_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="avatar-placeholder"
                          style={{ cursor: "pointer" }}
                        >
                          {e.username[0].toUpperCase()}
                        </div>
                      </Link>
                    )}
                    <div className="review-content">
                      <Link
                        to={`/user/${e.user_id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <strong>{e.username}</strong>
                      </Link>
                      <span className="review-date">
                        {new Date(e.date_eval).toLocaleDateString()}
                      </span>
                      <div className="review-stars">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            style={{
                              color: i < e.note ? "#f4c430" : "#ddd",
                              marginRight: "2px",
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              stroke="none"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          </span>
                        ))}
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
