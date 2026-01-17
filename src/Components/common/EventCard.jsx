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
                    <span className="icon">📅</span>
                    <span className="text">
                        {new Date(event.dateE).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                </div>
                <div className="info-row">
                    <span className="icon">📍</span>
                    <span className="text">{event.placeE || "Lieu non défini"}</span>
                </div>
            </div>

            {/* FOOTER / STATS */}
            <div className="card-footer">
                <div className="participants-badge">
                    <span className="icon">👥</span>
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
