import React from "react";
import PageTransition from "../utils/pageTransition";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { API } from "../utils/constants";

function Home() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [stats, setStats] = React.useState({
    events: 0,
    users: 0,
    categories: 0,
    satisfaction: 100
  });

  React.useEffect(() => {


    fetch(`${API}/stats.php`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  const numberlist = [
    { id: 1, num: stats.events, description: "Événements créés", suffix: "" },
    { id: 2, num: stats.users, description: "Utilisateurs inscrits", suffix: "" },
    { id: 3, num: stats.participations, description: "Participations confirmées", suffix: "+" },
    { id: 4, num: stats.satisfaction, description: "Satisfaction moyenne", suffix: "%" },
  ];

  const introliste = [
    {
      id: 1,
      title: "Découverte facile",
      description: "Des milliers d'événements adaptés à vos goûts et localisation.",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
    },
    {
      id: 2,
      title: "Réseautage",
      description: "Rencontrez des passionnés et élargissez votre réseau pro.",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    },
    {
      id: 3,
      title: "Inscription rapide",
      description: "Réservez votre place en un clic et gérez votre agenda.",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
    },
    {
      id: 4,
      title: "Portée mondiale",
      description: "Accédez à des événements locaux et internationaux.",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
    },
    {
      id: 5,
      title: "Rappels Intelligents",
      description: "Ne manquez jamais un événement grâce aux notifications.",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    },
    {
      id: 6,
      title: "Tendances",
      description: "Suivez les événements les plus populaires du moment.",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.312-3.406-3-5-3 5.4-1 6.5-1 10.5h0z"></path><path d="M12 2v2"></path><path d="M15.5 14.5A2.5 2.5 0 0 0 18 12c0-1.38-.5-2-1-3-1.072-2.143-2.312-3.406-3-5-3 5.4-1 6.5-1 10.5h0z"></path></svg>,
    },
  ];

  return (
    <PageTransition>
      <div className="home-container">
        {/* HERO SECTION */}
        <div className="hero-section">
          <div className="hero-background"></div>
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Vivez des moments <br />
              <span className="highlight-text">Inoubliables</span>
            </h1>
            <p className="hero-subtitle">
              La plateforme ultime pour créer, découvrir et partager des événements exceptionnels.
              Rejoignez une communauté passionnée dès aujourd'hui.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate("/events")}>
                Explorer les événements
              </button>
              <button className="btn-secondary" onClick={() => navigate("/signUp")}>
                Rejoindre la communauté
              </button>
            </div>
          </motion.div>
        </div>

        {/* STATS SECTION */}
        <div className="stats-section">
          {numberlist.map((item, index) => (
            <motion.div
              className="stat-card"
              key={item.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h2 className="stat-num">{item.num}<span className="stat-suffix">{item.suffix}</span></h2>
              <p className="stat-desc">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* FEATURES SECTION */}
        <div className="features-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3>Pourquoi choisir E-Gestion ?</h3>
            <p>Une suite complète d'outils pour vos événements.</p>
          </motion.div>

          <div className="features-grid">
            {introliste.map((item, index) => (
              <motion.div
                className="feature-card"
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              >
                <div className="feature-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="cta-section">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h3>Prêt à lancer votre prochain événement ?</h3>
            <p>Rejoignez des milliers d'organisateurs qui nous font confiance.</p>
            <button className="btn-cta" onClick={() => navigate("/signUp")}>Créer un compte gratuitement</button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Home;