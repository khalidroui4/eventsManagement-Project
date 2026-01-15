import React, { useState } from "react";
import "../styles/sign.css";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../utils/pageTransition";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

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
    console.log("Register clicked:", form);

    dispatch(register(form))
    dispatch(register(form))
  .then(() => {
    console.log("Register success");
    navigate("/signIn");
  })
  .catch((err) => {
    console.log("Register failed", err);
  });

  };

  return (
    <PageTransition>
      <form onSubmit={handleRegister} className="auth-page">

        <div className="auth-card">
  <h2>Inscription</h2>
  <p className="auth-subtitle">
    Remplissez vos informations pour créer un compte
  </p>

  <label>Nom Complet :</label>
  <div className="auth-input-group">
    <span className="auth-icon">👤</span>
    <input
      type="text"
      name="nom"
      value={form.nom}
      onChange={handleChange}
      placeholder="votre nom complet ici"
      required
    />
  </div>

  <label>Username :</label>
  <div className="auth-input-group">
    <span className="auth-icon">🌐</span>
    <input
      type="text"
      name="username"
      value={form.username}
      onChange={handleChange}
      placeholder="choisir votre username"
      required
    />
  </div>

  <label>Email :</label>
  <div className="auth-input-group">
    <span className="auth-icon">📧</span>
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="entrer votre email"
      required
    />
  </div>

  <label>Mot de passe :</label>
  <div className="auth-input-group">
    <span className="auth-icon">🔒</span>
    <input
      type="password"
      name="motdepasse"
      value={form.motdepasse}
      onChange={handleChange}
      placeholder="*************************"
      required
    />
  </div>

  <button className="auth-btn" type="submit" disabled={loading}>
    {loading ? "Création..." : "S'inscrire"}
  </button>

  <hr />

  <div className="auth-footer">
    <p>Vous avez déjà un compte ?</p>
    <Link to="/signIn" style={{ color: "green" }}>
      Connectez-vous ici
    </Link>
  </div>
</div>

      </form>
    </PageTransition>
  );
}

export default Signup;
