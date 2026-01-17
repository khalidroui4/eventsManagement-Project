import React from "react";
import EventCard from "../common/EventCard";
import { useNavigate } from "react-router-dom";
import Skeleton from "../common/Skeleton";

export default function EventList({ title, events, emptyMessage, isPast, renderActions, loading }) {
    const navigate = useNavigate();
    // ...
    return (
        <div className="profile-section">
            <h3>{title}</h3>
            {loading ? (
                <div className="events-grid-small">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="event-card-premium" style={{ height: 'auto', minHeight: '220px', cursor: 'default' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <Skeleton width="120px" height="24px" />
                                <Skeleton width="60px" height="24px" style={{ borderRadius: '20px' }} />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <Skeleton width="60%" height="16px" style={{ marginBottom: '8px' }} />
                                <Skeleton width="40%" height="16px" />
                            </div>
                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Skeleton width="80px" height="20px" />
                                <Skeleton width="40px" height="40px" style={{ borderRadius: '50%' }} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : events.length === 0 ? (
                <p>{emptyMessage}</p>
            ) : (
                <div className="events-grid-small">
                    {events.map((e) => (
                        <EventCard
                            key={e.idE}
                            event={e}
                            isPast={isPast}
                            onClick={() => navigate(`/events/${e.idE}`)}
                            actions={renderActions ? renderActions(e) : null}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
