import React from "react";
import PageTransition from "../utils/pageTransition";
import "../styles/about.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function About() {
  const navigate = useNavigate();

  const features = [
    { title: "Découverte ", desc: "Trouvez des événements par catégorie ou lieu.", icon: "🌍" },
    { title: "Inscription", desc: "Participez en un clic et gérez vos tickets.", icon: "🎫" },
    { title: "Gestion", desc: "Créez et administrez vos propres événements.", icon: "⚙️" },
    { title: "Notifications", desc: "Soyez alerté des mises à jour importantes.", icon: "🔔" },
  ];

  const steps = [
    { id: 1, title: "Créez un compte", desc: "Inscrivez-vous gratuitement en 30 secondes." },
    { id: 2, title: "Explorez", desc: "Parcourez notre catalogue d'événements variés." },
    { id: 3, title: "Participez", desc: "Rejoignez la communauté et profitez !" },
  ];

  return (
    <PageTransition>
      <div className="about-container">

        {/* HERO */}
        <div className="about-hero">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            A propos d'<span className="highlight">E-Gestion</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            La solution moderne pour connecter les passionnés et les organisateurs.
          </motion.p>
        </div>

        {/* MISSION & VISION */}
        <div className="mission-section">
          <motion.div
            className="mission-card"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3>🚀 Notre Mission</h3>
            <p>Simplifier l'organisation événementielle pour la rendre accessible, rapide et sécurisée pour tous.</p>
          </motion.div>
          <motion.div
            className="mission-card"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3>👁️ Notre Vision</h3>
            <p>Devenir la référence mondiale des plateformes communautaires d'événements.</p>
          </motion.div>
        </div>

        {/* FEATURES */}
        <div className="features-section">
          <h2>Pourquoi nous choisir ?</h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="feature-box"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="f-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* STEPS */}
        <div className="steps-section">
          <h2>Comment ça marche ?</h2>
          <div className="steps-container">
            {steps.map((s, i) => (
              <div key={s.id} className="step-item">
                <div className="step-circle">{s.id}</div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <h2>Prêt à commencer l'aventure ?</h2>
          <div className="cta-btn-group">
            <button className="cta-primary" onClick={() => navigate("/signUp")}>Créer un compte</button>
            <button className="cta-secondary" onClick={() => navigate("/events")}>Voir les événements</button>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}

export default About;
