import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../store/authSlice";
import { fetchParticipations, fetchCreatedEvents } from "../store/profileSlice";
import PageTransition from "../utils/pageTransition";
import { useNavigate } from "react-router-dom";
import { removeCreatedEvent } from "../store/profileSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { participations, createdEvents } = useSelector(
    (state) => state.profile
  );

  const [open, setOpen] = useState(false);
  const [requestMsg, setRequestMsg] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [organizerRequests, setOrganizerRequests] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    gmailU: "",
    location: "Maroc",
  });

  const [newEvent, setNewEvent] = useState({
    event_name: "",
    capaciteE: "",
    dateE: "",
    placeE: "",
    descriptionE: "",
  });

  const [editForm, setEditForm] = useState({
    event_name: "",
    capaciteE: "",
    dateE: "",
    placeE: "",
    descriptionE: "",
  });

  // Sync profile form
  useEffect(() => {
    if (!user) return;
    setForm({
      full_name: user.full_name,
      username: user.username,
      gmailU: user.gmailU,
      location: user.location || "Maroc",
    });
  }, [user]);

  // Load participations and organizer events
  useEffect(() => {
    if (!user) return;

    dispatch(fetchParticipations(user.idU));

    if (user.roleU === "organizer") {
      dispatch(fetchCreatedEvents(user.idU));
    }

    if (user.roleU === "admin") {
      fetch("http://localhost/project_backend/admin.php?action=all_events")
        .then((r) => r.json())
        .then((d) => setAllEvents(Array.isArray(d) ? d : []));

      fetch(
        "http://localhost/project_backend/admin.php?action=organizer_requests"
      )
        .then((r) => r.json())
        .then((d) => setOrganizerRequests(Array.isArray(d) ? d : []));
    }
  }, [user, dispatch]);

  // Fill edit form when selecting event
  useEffect(() => {
    if (editingEvent) {
      setEditForm({
        event_name: editingEvent.event_name,
        capaciteE: editingEvent.capaciteE,
        dateE: editingEvent.dateE,
        placeE: editingEvent.placeE,
        descriptionE: editingEvent.descriptionE,
      });
    }
  }, [editingEvent]);

  if (!user) return <p>Chargement...</p>;

  const today = new Date().toISOString().split("T")[0];
  const currentEvents = participations.filter((e) => e.dateE >= today);
  const pastEvents = participations.filter((e) => e.dateE < today);

  // Profile update
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const data = {
      idU: user.idU,
      full_name: form.full_name,
      username: form.username,
      gmailU: form.gmailU,
      location: form.location,
    };

    const res = await fetch(
      "http://localhost/project_backend/update_profile.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();
    if (result.success) {
      dispatch(setUserProfile(data));
      setOpen(false);
    }
  };

  // Organizer request (for normal users)
  const sendOrganizerRequest = async (e) => {
    e.preventDefault();

    await fetch(
      "http://localhost/project_backend/organizer_requests.php?action=send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.idU,
          message: requestMsg,
        }),
      }
    );

    setRequestMsg("");
  };

  // Add event
  const handleEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    await fetch("http://localhost/project_backend/events.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newEvent,
        creator_id: user.idU,
      }),
    });

    setShowAddModal(false);
    setNewEvent({
      event_name: "",
      capaciteE: "",
      dateE: "",
      placeE: "",
      descriptionE: "",
    });

    dispatch(fetchCreatedEvents(user.idU));
  };

  // Edit event
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();

    await fetch(
      `http://localhost/project_backend/events.php?action=update&id=${editingEvent.idE}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      }
    );

    setShowEditModal(false);
    setEditingEvent(null);
    dispatch(fetchCreatedEvents(user.idU));
  };

  return (
    <PageTransition>
      <div className="profile-container">
        <h2>Bonjour {user.username} dans votre profile</h2>

        {/* PROFILE CARD */}
        <div className="profile-card">
          <button className="edit-btn" onClick={() => setOpen(true)}>
            ✎ modifier
          </button>

          <div className="profile-left">
            <div className="profile-img">
              <img src="user_456283.png" alt="" width={60} height={60} />
            </div>
          </div>

          <div className="profile-right">
            <h2>{user.full_name}</h2>
            <div className="row">
              <strong>Username :</strong>
              <span className="username">@{user.username}</span>
            </div>
            <div className="row">
              <strong>Email :</strong>
              <span>{user.gmailU}</span>
            </div>
            <div className="row">
              <strong>Localisation :</strong>
              <span>{user.location}</span>
            </div>
          </div>
        </div>

        {/* CURRENT EVENTS */}
        <div className="profile-section">
          <h3>Événements en cours de participation</h3>
          {currentEvents.length === 0 ? (
            <p>Aucune participation en cours</p>
          ) : (
            currentEvents.map((e) => (
              <div
                key={e.idE}
                className="event-item clickable"
                onClick={() => navigate(`/events/${e.idE}`)}
              >
                <div className="event-name">{e.event_name}</div>
                <div className="event-info">
                  <span>📅 {e.dateE}</span>
                  <span>📍 {e.placeE}</span>
                  <span>👤 {e.creator}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAST EVENTS */}
        <div className="profile-section">
          <h3>Événements passés</h3>
          {pastEvents.length === 0 ? (
            <p>Aucun événement passé</p>
          ) : (
            pastEvents.map((e) => (
              <div
                key={e.idE}
                className="event-item past clickable"
                onClick={() => navigate(`/events/${e.idE}`)}
              >
                <div className="event-name">{e.event_name}</div>
                <div className="event-info">
                  <span>📅 {e.dateE}</span>
                  <span>📍 {e.placeE}</span>
                  <span>👤 {e.creator}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ORGANIZER SPACE */}
        {user.roleU === "organizer" || user.roleU === "admin" ? (
          <div className="profile-section">
            <div className="section-header">
              <h3>Mes événements créés</h3>
              <button
                className="add-event-btn"
                onClick={() => setShowAddModal(true)}
              >
                + Ajouter un événement
              </button>
            </div>

            {createdEvents.length === 0 ? (
              <p>Vous n'avez encore créé aucun événement</p>
            ) : (
              createdEvents.map((e) => (
                <div key={e.idE} className="event-item organizer">
                  <div className="event-name">{e.event_name}</div>

                  <div className="event-info">
                    <span>📅 {e.dateE}</span>
                    <span>📍 {e.placeE}</span>
                    <span>
                      👥 {e.num_participant}/{e.capaciteE}
                    </span>
                    <span>⚡ {e.etat}</span>
                  </div>

                  <div className="event-actions">
                    <button
                      className="edit-btn-sm"
                      onClick={() => {
                        setEditingEvent(e);
                        setShowEditModal(true);
                      }}
                    >
                      ✎ Modifier
                    </button>
                    <button
                      className="delete-btn-sm"
                      onClick={() => {
                        fetch(
                          "http://localhost/project_backend/events.php?action=delete",
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: e.idE }),
                          }
                        )
                          .then(async (res) => {
                            const text = await res.text(); // read raw response
                            try {
                              return JSON.parse(text); // try to parse JSON
                            } catch {
                              console.error("Invalid JSON from backend:", text);
                              throw new Error("Invalid JSON response");
                            }
                          })
                          .then((data) => {
                            console.log("Delete response:", data);
                            if (data.success) {
                              dispatch(removeCreatedEvent(e.idE));
                            }
                          })
                          .catch((err) => {
                            console.error("Delete failed:", err);
                          });
                      }}
                    >
                      🗑 Supprimer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="profile-section">
            <h3>Demande pour devenir organisateur</h3>
            <form className="organizer-form" onSubmit={sendOrganizerRequest}>
              <textarea
                value={requestMsg}
                onChange={(e) => setRequestMsg(e.target.value)}
                placeholder="Expliquez pourquoi vous voulez devenir organisateur..."
                required
              />
              <button type="submit">Envoyer la demande</button>
            </form>
          </div>
        )}

        {/* EDIT PROFILE MODAL */}
        {open && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Modifier le profil</h2>

              <label>Nom complet</label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
              />

              <label>Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
              />

              <label>Email</label>
              <input
                type="email"
                name="gmailU"
                value={form.gmailU}
                onChange={handleChange}
              />

              <label>Localisation</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
              />

              <div className="modal-actions">
                <button className="cancel" onClick={() => setOpen(false)}>
                  Annuler
                </button>
                <button className="save" onClick={handleSave}>
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADD EVENT MODAL */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Ajouter un événement</h2>
              <form onSubmit={handleAddEvent}>
                <label>Nom</label>
                <input
                  name="event_name"
                  value={newEvent.event_name}
                  onChange={handleEventChange}
                  required
                />

                <label>Capacité</label>
                <input
                  type="number"
                  name="capaciteE"
                  value={newEvent.capaciteE}
                  onChange={handleEventChange}
                  required
                />

                <label>Date</label>
                <input
                  type="date"
                  name="dateE"
                  value={newEvent.dateE}
                  onChange={handleEventChange}
                  required
                />

                <label>Lieu</label>
                <input
                  name="placeE"
                  value={newEvent.placeE}
                  onChange={handleEventChange}
                  required
                />

                <label>Description</label>
                <textarea
                  name="descriptionE"
                  value={newEvent.descriptionE}
                  onChange={handleEventChange}
                  required
                />

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => setShowAddModal(false)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="save">
                    Créer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* EDIT EVENT MODAL */}
        {showEditModal && editingEvent && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Modifier l’événement</h2>
              <form onSubmit={handleEditEvent}>
                <label>Nom</label>
                <input
                  name="event_name"
                  value={editForm.event_name}
                  onChange={handleEditChange}
                  required
                />

                <label>Capacité</label>
                <input
                  type="number"
                  name="capaciteE"
                  value={editForm.capaciteE}
                  onChange={handleEditChange}
                  required
                />

                <label>Date</label>
                <input
                  type="date"
                  name="dateE"
                  value={editForm.dateE}
                  onChange={handleEditChange}
                  required
                />

                <label>Lieu</label>
                <input
                  name="placeE"
                  value={editForm.placeE}
                  onChange={handleEditChange}
                  required
                />

                <label>Description</label>
                <textarea
                  name="descriptionE"
                  value={editForm.descriptionE}
                  onChange={handleEditChange}
                  required
                />

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingEvent(null);
                    }}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="save">
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {user.roleU === "admin" && (
          <>
            {/* ALL EVENTS LIST */}
            <div className="profile-section">
              <h3>Tous les événements du site</h3>

              {allEvents.length === 0 ? (
                <p>Aucun événement</p>
              ) : (
                allEvents.map((e) => (
                  <div key={e.idE} className="event-item organizer">
                    <div className="event-name">{e.event_name}</div>
                    <button
                      className="delete-btn-sm"
                      onClick={() => {
                        fetch(
                          "http://localhost/project_backend/events.php?action=delete",
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: e.idE }),
                          }
                        ).then(() => {
                          setAllEvents(
                            allEvents.filter((ev) => ev.idE !== e.idE)
                          );
                        });
                      }}
                    >
                      🗑 Supprimer
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* ORGANIZER REQUESTS */}
            <div className="profile-section">
              <h3>Demandes pour devenir organisateur</h3>

              {organizerRequests.length === 0 ? (
                <p>Aucune demande</p>
              ) : (
                organizerRequests.map((r) => (
                  <div key={r.user_id} className="event-item">
                    <div>
                      {r.full_name} (@{r.username})
                    </div>

                    <div className="event-actions">
                      <button
                        className="edit-btn-sm"
                        onClick={() => {
                          fetch(
                            "http://localhost/project_backend/admin.php?action=accept",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ user_id: r.user_id }),
                            }
                          ).then(() => {
                            setOrganizerRequests(
                              organizerRequests.filter(
                                (req) => req.user_id !== r.user_id
                              )
                            );
                          });
                        }}
                      >
                        ✔ Accepter
                      </button>

                      <button
                        className="delete-btn-sm"
                        onClick={() => {
                          fetch(
                            "http://localhost/project_backend/admin.php?action=refuse",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ user_id: r.user_id }),
                            }
                          ).then(() => {
                            setOrganizerRequests(
                              organizerRequests.filter(
                                (req) => req.user_id !== r.user_id
                              )
                            );
                          });
                        }}
                      >
                        ✖ Refuser
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </PageTransition>
  );
}
