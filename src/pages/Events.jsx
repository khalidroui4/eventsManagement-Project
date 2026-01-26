import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/eventsSlice";
import { useNavigate } from "react-router-dom";
import "../styles/events.css";
import PageTransition from "../utils/pageTransition";
import EventCard from "../Components/common/EventCard";
import Skeleton from "../Components/common/Skeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function Events() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, loading } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("tous");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (!user) return;
    dispatch(fetchEvents({ role: user.roleU, userId: user.idU }));
  }, [dispatch, user]);

  useEffect(() => {
    let result = events;

    if (search.trim() !== "") {
      const s = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.event_name.toLowerCase().includes(s) ||
          (e.descriptionE && e.descriptionE.toLowerCase().includes(s)) ||
          (e.placeE && e.placeE.toLowerCase().includes(s)),
      );
    }

    if (status !== "tous") {
      result = result.filter((e) => e.etat === status);
    }

    setFilteredEvents(result);
  }, [events, search, status]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
      <div className="events-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Événements disponibles
        </motion.h1>

        <motion.div
          className="filter-box"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="filter-left">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Rechercher un événement..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-right">
            <div className="status-filters">
              {["tous", "ouvert", "complet", "termine"].map((s) => (
                <button
                  key={s}
                  className={`filter-pill ${status === s ? "active" : ""}`}
                  onClick={() => setStatus(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="events-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="event-card-premium"
                style={{
                  height: "auto",
                  minHeight: "220px",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                  }}
                >
                  <Skeleton width="140px" height="26px" />
                  <Skeleton
                    width="70px"
                    height="24px"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <Skeleton
                    width="50%"
                    height="16px"
                    style={{ marginBottom: "10px" }}
                  />
                  <Skeleton width="30%" height="16px" />
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton width="100px" height="20px" />
                  <Skeleton
                    width="90px"
                    height="30px"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
              </div>
            ))
          ) : filteredEvents.length === 0 ? (
            <div className="no-results">
              <p>Aucun événement trouvé pour votre recherche.</p>
              <button
                className="reset-btn"
                onClick={() => {
                  setSearch("");
                  setStatus("tous");
                }}
              >
                Tout afficher
              </button>
            </div>
          ) : (
            filteredEvents.map((e) => (
              <motion.div key={e.idE} variants={itemVariants}>
                <EventCard
                  event={e}
                  onClick={() => navigate(`/events/${e.idE}`)}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}
