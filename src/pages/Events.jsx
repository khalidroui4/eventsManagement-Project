import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/eventsSlice";
import { useNavigate } from "react-router-dom";
import "../styles/events.css";
import PageTransition from "../utils/pageTransition";

export default function Events() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchEvents({ role: "user" }));
  }, [dispatch]);

  return (
    <PageTransition>
      <div className="events-container">
      <h2>Événements disponibles</h2>

      <div className="events-grid">
        {events.map((e) => (
          <div
            key={e.idE}
            className="event-card"
            onClick={() => navigate(`/events/${e.idE}`)}
          >
            <span className={`etat ${e.etat}`}>{e.etat}</span>

            <h3>{e.event_name}</h3>
            <p>📅 {e.dateE}</p>
            <p>👤 {e.creator}</p>
          </div>
        ))}
      </div>
    </div>
    </PageTransition>
    
  );
}
