import React, { useState } from "react";
import "../styles/sign.css";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../utils/pageTransition";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/authSlice";
import { motion } from "framer-motion";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    nom: "",
    username: "",
    email: "",
    motdepasse: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(form))
      .then((res) => {
        if (!res.error) {
          navigate("/signIn");
        }
      });
  };

  return (
    <PageTransition>
      <div className="auth-page">
        <motion.div
          className="auth-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2>Créer un compte</h2>
          <p className="auth-subtitle">
            Rejoignez la communauté E-gestion dès aujourd'hui !
          </p>

          <form onSubmit={handleRegister}>
            <label>Nom Complet</label>
            <div className="auth-input-group">
              <span className="auth-icon">👤</span>
              <input
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="Votre nom complet"
                required
              />
            </div>

            <label>Nom d'utilisateur</label>
            <div className="auth-input-group">
              <span className="auth-icon">🌐</span>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Choisissez un pseudo"
                required
              />
            </div>

            <label>Email</label>
            <div className="auth-input-group">
              <span className="auth-icon">📧</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
              />
            </div>

            <label>Mot de passe</label>
            <div className="auth-input-group">
              <span className="auth-icon">🔒</span>
              <input
                type="password"
                name="motdepasse"
                value={form.motdepasse}
                onChange={handleChange}
                placeholder="Mot de passe sécurisé"
                required
              />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Création du compte..." : "S'inscrire"}
            </button>
          </form>

          <hr />

          <div className="auth-footer">
            <span>Vous avez déjà un compte ?</span>
            <Link to="/signIn">Connectez-vous</Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

export default Signup;
