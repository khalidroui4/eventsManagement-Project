import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, removeEvent } from "../../store/eventsSlice";
import { loadRequests, approveRequest as approveOrganizerRequest, rejectRequest as rejectOrganizerRequest } from "../../store/organizerRequestsSlice";
import EventList from "./EventList";
import DashboardStats from "./DashboardStats";
import { API } from "../../utils/constants";

export default function AdminDashboard() {
    const dispatch = useDispatch();

    // Use generic selectors if possible, or assume state structure
    const allEvents = useSelector((state) => state.events.events);
    const loading = useSelector((state) => state.events.loading);
    const requests = useSelector((state) => state.requests.requests);

    const [messages, setMessages] = React.useState([]);

    useEffect(() => {
        dispatch(fetchEvents());
        dispatch(loadRequests());
        loadMessages();
    }, [dispatch]);


    const loadMessages = async () => {
        try {
            const res = await fetch(`${API}/contact.php`);
            const data = await res.json();
            if (Array.isArray(data)) setMessages(data);
        } catch (error) {
            console.error("Error loading messages", error);
        }
    };

    const handleDeleteEvent = async (id) => {
        await dispatch(removeEvent(id));
    };

    const totalEvents = allEvents ? allEvents.length : 0;
    const activeEvents = allEvents ? allEvents.filter(e => e.etat === 'ouvert').length : 0;
    const totalRequests = requests ? requests.length : 0;

    const stats = [
        { label: "Total Événements", value: totalEvents, icon: "🌍" },
        { label: "Messages Reçus", value: messages.length, icon: "💬" },
        { label: "Demandes en attente", value: totalRequests, icon: "📩" },
    ];

    return (
        <>
            <div className="profile-section">
                <h3>Tableau de bord Administrateur</h3>
                <DashboardStats stats={stats} />
            </div>

            {/* MESSAGES SECTION */}
            <div className="profile-section">
                <h3>Messages des utilisateurs</h3>
                {messages.length === 0 ? (
                    <p style={{ fontStyle: 'italic', color: '#777' }}>Aucun message reçu.</p>
                ) : (
                    <div className="messages-list">
                        {messages.map(msg => (
                            <div key={msg.id} className="message-card">
                                <div className="message-header">
                                    <strong>{msg.name}</strong>
                                    <span className="message-email">{msg.email}</span>
                                    <small className="message-date">{new Date(msg.created_at).toLocaleDateString()}</small>
                                </div>
                                <div className="message-subject">{msg.subject || "(Pas de sujet)"}</div>
                                <p className="message-body">{msg.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ALL EVENTS */}
            <EventList
                title="Tous les événements du site"
                events={allEvents || []}
                emptyMessage="Aucun événement"
                loading={loading}
                renderActions={(e) => (
                    <button className="delete-btn-sm" onClick={(ev) => { ev.stopPropagation(); handleDeleteEvent(e.idE); }}>
                        🗑 Supprimer
                    </button>
                )}
            />

            {/* ORGANIZER REQUESTS */}
            <div className="profile-section">
                <h3>Demandes pour devenir organisateur</h3>
                {(!requests || requests.length === 0) ? (
                    <p>Aucune demande</p>
                ) : (
                    requests.map((r) => (
                        <div key={r.user_id} className="event-item">
                            <div>
                                {r.full_name} (@{r.username})
                            </div>

                            <div className="event-actions">
                                <button
                                    className="edit-btn-sm"
                                    onClick={() => dispatch(approveOrganizerRequest(r.user_id))}
                                >
                                    ✔ Accepter
                                </button>

                                <button
                                    className="delete-btn-sm"
                                    onClick={() => dispatch(rejectOrganizerRequest(r.user_id))}
                                >
                                    ✖ Refuser
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
