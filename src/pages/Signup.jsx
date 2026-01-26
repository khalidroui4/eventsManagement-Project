import { useState } from "react";
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
    motdepasse: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(form)).then((res) => {
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
              <span className="auth-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
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
              <span className="auth-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </span>
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
              <span className="auth-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
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
              <span className="auth-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
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
