import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchParticipations, fetchCreatedEvents } from "../store/profileSlice";
import { getPublicUser } from "../api/userApi";
import PageTransition from "../utils/pageTransition";
import EventList from "../Components/profile/EventList";
import Skeleton from "../Components/common/Skeleton";
import { motion } from "framer-motion";
import "../styles/profile.css";

export default function PublicProfile() {
    const { id } = useParams(); // This is the user ID from the URL
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);

    // Local state for the profile being viewed
    const [profileUser, setProfileUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [error, setError] = useState(null);

    // Use redux slice for events but we might need to be careful not to overwrite "my" profile data
    // if we visit our own profile. However, fetchParticipations takes an ID, so it updates the store.
    // Ideally we should separate stores or clear it, but for now we reuse existing slice logic
    // knowing it might refresh the main profile view data too (which is acceptable or even desirable).
    const { participations, createdEvents, loading: loadingEvents } = useSelector((state) => state.profile);

    useEffect(() => {
        async function loadData() {
            setLoadingUser(true);
            setError(null);
            try {
                // 1. Fetch User Details
                const res = await getPublicUser(id);
                if (res.success) {
                    setProfileUser(res.user);

                    // 2. Fetch Their Events
                    dispatch(fetchParticipations(id));
                    if (res.user.roleU === "organizer" || res.user.roleU === "admin") {
                        dispatch(fetchCreatedEvents(id));
                    }
                } else {
                    // User not found
                    console.error("User fetch error:", res);
                    setError(res.error || "Utilisateur introuvable");
                }
            } catch (err) {
                console.error("Network error:", err);
                setError("Erreur de connexion. Veuillez réessayer.");
            } finally {
                setLoadingUser(false);
            }
        }

        // Redirect to own profile if clicking self
        if (currentUser && currentUser.idU == id) {
            navigate("/profile");
            return;
        }

        loadData();
    }, [id, currentUser, dispatch, navigate]);


    if (error) {
        return (
            <div className="profile-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div className="profile-card" style={{ flexDirection: 'column', textAlign: 'center', maxWidth: '500px' }}>
                    <h2 style={{ marginBottom: '15px' }}>Oups ! 😕</h2>
                    <p style={{ marginBottom: '20px', color: '#ff6b6b' }}>{error}</p>
                    <button className="participate-btn" onClick={() => navigate('/events')}>
                        Retour aux événements
                    </button>
                </div>
            </div>
        );
    }

    if (loadingUser || !profileUser) {
        return (
            <div className="profile-container">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '50px 0' }}>
                    <Skeleton width="120px" height="120px" style={{ borderRadius: '50%', marginBottom: '20px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    <Skeleton width="200px" height="30px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    <p style={{ marginTop: '20px', color: '#fff' }}>Chargement du profil...</p>
                </div>
            </div>
        );
    }

    const today = new Date().toISOString().split("T")[0];
    const currentEvents = participations.filter((e) => e.dateE >= today);
    const pastEvents = participations.filter((e) => e.dateE < today);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="profile-container">
            {/* PUBLIC HEADER */}
            <div className="profile-header-card">
                <div className="profile-left">
                    <div className="profile-img">
                        {profileUser.profile_image ? (
                            <img src={`http://localhost/project_backend/${profileUser.profile_image}`} alt={profileUser.username} />
                        ) : (
                            <span style={{ fontSize: '4rem', color: '#132e2e', fontWeight: 'bold' }}>
                                {profileUser.username[0].toUpperCase()}
                            </span>
                        )}
                    </div>
                </div>

                <div className="profile-right">
                    <h2>{profileUser.full_name}</h2>
                    <div className="row">
                        <strong>Username :</strong>
                        <span className="username">@{profileUser.username}</span>
                    </div>
                    {profileUser.gmailU && (
                        <div className="row">
                            <strong>Email :</strong>
                            <span>{profileUser.gmailU}</span>
                        </div>
                    )}
                    {profileUser.location && (
                        <div className="row">
                            <strong>Localisation :</strong>
                            <span>{profileUser.location}</span>
                        </div>
                    )}
                    <div className="row">
                        <strong>Rôle :</strong>
                        <span className="profile-role-badge" style={{ background: 'rgba(79, 172, 254, 0.15)', color: '#4facfe', padding: '2px 10px', borderRadius: '10px', fontSize: '0.9rem' }}>
                            {profileUser.roleU}
                        </span>
                    </div>
                </div>
            </div>

            {/* ORGANIZER SECTION */}
            {(profileUser.roleU === "organizer" || profileUser.roleU === "admin") && (
                <div>
                    <EventList
                        title={`Événements créés par ${profileUser.username}`}
                        events={createdEvents}
                        emptyMessage="Aucun événement créé"
                        loading={loadingEvents}
                    />
                </div>
            )}

            {/* PARTICIPATION SECTION */}
            <div>
                <EventList
                    title="Participation aux événements à venir"
                    events={currentEvents}
                    emptyMessage="Aucune participation en cours"
                    loading={loadingEvents}
                />
            </div>

            <div>
                <EventList
                    title="Historique des événements"
                    events={pastEvents}
                    emptyMessage="Aucun historique"
                    isPast={true}
                    loading={loadingEvents}
                />
            </div>

        </div>
    );
}
