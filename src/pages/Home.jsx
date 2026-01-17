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
    categories: 0, // We might not have categories in DB yet, kept as 0 or remove
    satisfaction: 100
  });

  React.useEffect(() => {
    // Import moved to top

    // ... inside component
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
      icon: "🔍",
    },
    {
      id: 2,
      title: "Réseautage",
      description: "Rencontrez des passionnés et élargissez votre réseau pro.",
      icon: "🤝",
    },
    {
      id: 3,
      title: "Inscription rapide",
      description: "Réservez votre place en un clic et gérez votre agenda.",
      icon: "⚡",
    },
    {
      id: 4,
      title: "Portée mondiale",
      description: "Accédez à des événements locaux et internationaux.",
      icon: "🌍",
    },
    {
      id: 5,
      title: "Rappels Intelligents",
      description: "Ne manquez jamais un événement grâce aux notifications.",
      icon: "🔔",
    },
    {
      id: 6,
      title: "Tendances",
      description: "Suivez les événements les plus populaires du moment.",
      icon: "🔥",
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