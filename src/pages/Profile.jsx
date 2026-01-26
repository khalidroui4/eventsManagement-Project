import { useEffect } from "react";
import "../styles/profile.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticipations, fetchCreatedEvents } from "../store/profileSlice";
import PageTransition from "../utils/pageTransition";
import ProfileHeader from "../Components/profile/ProfileHeader";
import EventList from "../Components/profile/EventList";
import OrganizerDashboard from "../Components/profile/OrganizerDashboard";
import AdminDashboard from "../Components/profile/AdminDashboard";
import OrganizerRequestSection from "../Components/profile/OrganizerRequestSection";
import { motion } from "framer-motion";
import Skeleton from "../Components/common/Skeleton";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { participations, createdEvents, loading } = useSelector(
    (state) => state.profile,
  );

  useEffect(() => {
    if (!user) return;
    dispatch(fetchParticipations(user.idU));
    if (user.roleU === "organizer" || user.roleU === "admin") {
      dispatch(fetchCreatedEvents(user.idU));
    }
  }, [user, dispatch]);

  if (!user) {
    return (
      <PageTransition>
        <div className="profile-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "50px",
            }}
          >
            <Skeleton
              width="300px"
              height="40px"
              style={{ marginBottom: "40px" }}
            />
            <div
              className="profile-card"
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Skeleton
                width="130px"
                height="130px"
                style={{ borderRadius: "50%" }}
              />
              <div style={{ flex: 1, marginLeft: "40px" }}>
                <Skeleton
                  width="200px"
                  height="30px"
                  style={{ marginBottom: "20px" }}
                />
                <Skeleton
                  width="80%"
                  height="20px"
                  style={{ marginBottom: "10px" }}
                />
                <Skeleton
                  width="60%"
                  height="20px"
                  style={{ marginBottom: "10px" }}
                />
              </div>
            </div>
          </div>
          <div>
            <Skeleton
              width="250px"
              height="30px"
              style={{ marginBottom: "30px" }}
            />
            <div className="events-grid-small">
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  width="100%"
                  height="200px"
                  style={{ borderRadius: "16px" }}
                />
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const currentEvents = participations.filter((e) => e.dateE >= today);
  const pastEvents = participations.filter((e) => e.dateE < today);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
      <motion.div
        className="profile-container"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 variants={itemVariants}>
          Bonjour, {user.username} 👋
        </motion.h1>

        <motion.div variants={itemVariants}>
          <ProfileHeader user={user} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <EventList
            title="Événements en cours de participation"
            events={currentEvents}
            emptyMessage="Aucune participation en cours"
            loading={loading}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <EventList
            title="Événements passés"
            events={pastEvents}
            emptyMessage="Aucun événement passé"
            isPast={true}
            loading={loading}
          />
        </motion.div>

        {user.roleU === "organizer" && (
          <motion.div variants={itemVariants}>
            <OrganizerDashboard
              createdEvents={createdEvents}
              user={user}
              loading={loading}
            />
          </motion.div>
        )}

        {user.roleU === "admin" && (
          <>
            <motion.div variants={itemVariants}>
              <OrganizerDashboard
                createdEvents={createdEvents}
                user={user}
                loading={loading}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <AdminDashboard />
            </motion.div>
          </>
        )}

        {user.roleU !== "organizer" && user.roleU !== "admin" && (
          <motion.div variants={itemVariants}>
            <OrganizerRequestSection user={user} />
          </motion.div>
        )}
      </motion.div>
    </PageTransition>
  );
}
