import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, removeEvent } from "../../store/eventsSlice";
import { loadRequests, approveRequest as approveOrganizerRequest, rejectRequest as rejectOrganizerRequest } from "../../store/organizerRequestsSlice";
import EventList from "./EventList";
import DashboardStats from "./DashboardStats";
import { API } from "../../utils/constants";

export default function AdminDashboard() {
    const dispatch = useDispatch();

    const allEvents = useSelector((state) => state.events.events);
    const loading = useSelector((state) => state.events.loading);
    const requests = useSelector((state) => state.requests.requests);

    const [messages, setMessages] = useState([]);

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

    const handleDeleteEvent = (id) => {
        dispatch(removeEvent(id));
    };

    const totalEvents = allEvents ? allEvents.length : 0;
    const activeEvents = allEvents ? allEvents.filter(e => e.etat === 'ouvert').length : 0;
    const totalRequests = requests ? requests.length : 0;

    const stats = [
        { label: "Total Événements", value: totalEvents, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> },
        { label: "Messages Reçus", value: messages.length, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
        { label: "Demandes en attente", value: totalRequests, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
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
                    <div className="messages-grid">
                        {messages.map(msg => (
                            <div key={msg.id} className="message-card-premium">
                                <div className="message-header">
                                    <div className="sender-avatar">
                                        {msg.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="sender-info">
                                        <strong>{msg.name}</strong>
                                        <span className="message-email">{msg.email}</span>
                                    </div>
                                    <small className="message-date">
                                        {new Date(msg.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </small>
                                </div>
                                <div className="message-content">
                                    <h4 className="message-subject">{msg.subject || "(Sans sujet)"}</h4>
                                    <p className="message-body">"{msg.message}"</p>
                                </div>
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
