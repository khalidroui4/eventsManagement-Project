import React, { useState } from "react";
import PageTransition from "../utils/pageTransition";
import { motion } from "framer-motion";
import "../styles/contact.css";
import { useToast } from "../context/ToastContext";
import { API } from "../utils/constants";

function Contact() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Import moved to top

    // ...
    try {
      const response = await fetch(`${API}/contact.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        addToast("Message envoyé avec succès ! 🚀", "success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        addToast(data.error || "Erreur lors de l'envoi", "error");
      }
    } catch (error) {
      addToast("Erreur de connexion au serveur", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="contact-container">

        {/* HEADER */}
        <div className="contact-header">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Une question, un projet ? Nous sommes là pour vous aider.
          </motion.p>
        </div>

        <div className="contact-content">

          {/* INFO SIDE */}
          <motion.div
            className="contact-info-card"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2>Informations</h2>

            <div className="info-item">
              <div className="icon-box">📧</div>
              <div>
                <h4>Email</h4>
                <p>support@egestion.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">📞</div>
              <div>
                <h4>Téléphone</h4>
                <p>+212 6 00 00 00 00</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">📍</div>
              <div>
                <h4>Adresse</h4>
                <p>Technopark, Rabat, Maroc</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">🕒</div>
              <div>
                <h4>Horaires</h4>
                <p>Lun - Ven: 9h - 18h</p>
              </div>
            </div>

          </motion.div>

          {/* FORM SIDE */}
          <motion.div
            className="contact-form-card"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2>Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                />
              </div>

              <div className="form-group">
                <label>Sujet</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Sujet de votre message"
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Ecrivez votre message ici..."
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Envoi en cours..." : "Envoyer le message ✉️"}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}

export default Contact;
