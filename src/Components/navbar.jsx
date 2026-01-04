import "../index.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <header class="navbar" style={{boxShadow:"0px 0px 8px black"}}  >
      <nav>
        <Link class="item" to="/">
          <div data-text="Main page" class="linktext">
            Accueil
          </div>
        </Link>
        <Link class="item" to="/about">
          <div data-text="à propos de l'application" class="linktext">
            About
          </div>
        </Link>
        <Link class="item" to="/contact">
          <div data-text="Contactez nous" class="linktext">
            Contact
          </div>
        </Link>
        <Link class="item" to="/signUp">
          <div data-text="inscrire avec nous" class="linktext">
            inscrire
          </div>
        </Link>
        <Link class="item" to="/signIn">
          <div data-text="connectez a votre compte" class="linktext">
            Se connecter
          </div>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
