import React from "react";
import "../../styles/events.css"; // Ensure it uses the events css

export default function EventCard({ event, onClick, actions, isPast }) {
    const isFull = event.capaciteE && event.num_participant >= event.capaciteE;

    // Status Badge Logic
    let statusClass = "status-badge";
    let statusText = "";

    switch (event.etat) {
        case 'ouvert':
            // Double check capacity just in case frontend has newer data than DB trigger
            if (isFull) {
                statusClass += " complet";
                statusText = "Complet";
            } else {
                statusClass += " ouvert";
                statusText = "Ouvert";
            }
            break;
        case 'complet':
            statusClass += " complet";
            statusText = "Complet";
            break;
        case 'annule':
            statusClass += " complet"; // Use red/alert style
            statusText = "Annulé";
            break;
        default: // termine
            statusClass += " ferme";
            statusText = "Terminé";
            break;
    }

    return (
        <div
            className={`event-card-premium ${isPast ? "past" : ""} ${onClick ? "clickable" : ""}`}
            onClick={onClick}
        >
            {/* BADGE TOP RIGHT */}
            <div className={statusClass}>
                {statusText}
            </div>


            {/* HEADER / TITLE */}
            <div className="card-header">
                <h3>{event.event_name}</h3>
                <span className="organizer-label">Par @{event.organizer_name || "Admin"}</span>
            </div>

            {/* BODY / INFO */}
            <div className="card-body">
                <div className="info-row">
                    <span className="icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </span>
                    <span className="text">
                        {new Date(event.dateE).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                </div>
                <div className="info-row">
                    <span className="icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </span>
                    <span className="text">{event.placeE || "Lieu non défini"}</span>
                </div>
                {event.moyenne > 0 && (
                    <div className="info-row">
                        <span className="icon" style={{ color: '#f4c430' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </span>
                        <span className="text" style={{ color: '#f4c430', fontWeight: 'bold' }}>
                            {parseFloat(event.moyenne).toFixed(1)} / 5.0
                        </span>
                    </div>
                )}
            </div>

            {/* FOOTER / STATS */}
            <div className="card-footer">
                <div className="participants-badge">
                    <span className="icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </span>
                    <span>{event.num_participant} / {event.capaciteE}</span>
                </div>

                {actions ? (
                    <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                        {actions}
                    </div>
                ) : (
                    <div className="view-details">
                        Voir détails →
                    </div>
                )}
            </div>

            {/* PROGRESS BAR for capacity */}
            {event.capaciteE > 0 && (
                <div className="capacity-bar">
                    <div
                        className="capacity-fill"
                        style={{ width: `${Math.min((event.num_participant / event.capaciteE) * 100, 100)}%` }}
                    ></div>
                </div>
            )}
        </div>
    );
}
