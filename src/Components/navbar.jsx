import "../styles/index.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signIn");
  };

  return (
    <header className="navbar">
      <nav>
        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <Link className="item" to="/">
              <div className="linktext" data-text="page principal">
                Accueil
              </div>
            </Link>
            <Link className="item" to="/about">
              <div className="linktext" data-text="a propos de nous">
                About
              </div>
            </Link>
            <Link className="item" to="/contact">
              <div className="linktext" data-text="contactez-nous">
                Contact
              </div>
            </Link>
            <Link className="item" to="/signUp">
              <div className="linktext" data-text="creer un compte">
                Inscrire
              </div>
            </Link>
            <Link className="item" to="/signIn">
              <div className="linktext" data-text="connecter votre compte">
                Se connecter
              </div>
            </Link>
          </>
        )}

        {/* LOGGED IN */}
        {user && (
          <>
            <Link className="item" to="/profile">
              <div className="linktext" data-text="Bienvenue">
                Bienvenue {user.username}
              </div>
            </Link>

            <Link className="item" to="/events">
              <div className="linktext" data-text="notre evenement">
                Événements
              </div>
            </Link>

            <Link className="item" to="/profile">
              <div className="linktext" data-text="votre profil">
                Profil
              </div>
            </Link>

              <button className="item logout-btn" onClick={handleLogout}>
                Déconnexion
              </button>
            
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
