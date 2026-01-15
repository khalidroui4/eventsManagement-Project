import React, { useState } from "react";
import "../styles/sign.css";
import PageTransition from "../utils/pageTransition";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";


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
      .catch(() => {});
  };

  return (
    <PageTransition>
      <form onSubmit={handleLogin} className="auth-page">

<div className="auth-card">
  <h1>Connexion</h1>
  <p className="auth-subtitle">
    Vous avez déjà un compte ? Connectez-vous ici
  </p>

  <label>Email :</label>
  <div className="auth-input-group">
    <span className="auth-icon">📧</span>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="etudiant@universite.ma"
      required
    />
  </div>

  <label>Mot de passe :</label>
  <div className="auth-input-group">
    <span className="auth-icon">🔒</span>
    <input
      type="password"
      value={motdepasse}
      onChange={(e) => setMotdepasse(e.target.value)}
      placeholder="********"
      required
    />
  </div>

  {error && <p className="auth-error">{error}</p>}

  <button className="auth-btn" type="submit" disabled={loading}>
    {loading ? "Connexion..." : "Se connecter"}
  </button>

  <hr />

  <div className="auth-footer">
    <p>Vous n'avez pas de compte ?</p>
    <Link to="/signUp" style={{ color: "green" }}>
      Inscrivez-vous ici
    </Link>
  </div>
</div>

      </form>
    </PageTransition>
  );
}

export default Signin;
