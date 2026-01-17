import React, { useState } from "react";
import "../styles/sign.css";
import PageTransition from "../utils/pageTransition";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { motion } from "framer-motion";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, motdepasse }))
      .unwrap()
      .then(() => {
        navigate("/Events");
      })
      .catch(() => { });
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
          <h1>Connexion</h1>
          <p className="auth-subtitle">
            Ravis de vous revoir ! Accédez à votre compte.
          </p>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <div className="auth-input-group">
              <span className="auth-icon">📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: etudiant@email.com"
                required
              />
            </div>

            <label>Mot de passe</label>
            <div className="auth-input-group">
              <span className="auth-icon">🔒</span>
              <input
                type="password"
                value={motdepasse}
                onChange={(e) => setMotdepasse(e.target.value)}
                placeholder="Votre mot de passe"
                required
              />
            </div>

            {error && (
              <motion.div
                className="auth-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ⚠️ {error}
              </motion.div>
            )}

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          <hr />

          <div className="auth-footer">
            <span>Vous n'avez pas de compte ?</span>
            <Link to="/signUp">Créer un compte</Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

export default Signin;
