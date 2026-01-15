import React from "react";
import PageTransition from "../utils/pageTransition";
import "../styles/about.css";
import { div } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  const Fonctionnalitéslist = [
    {
      id: 1,
      title: "Découverte d'Événements",
      description:
        "Parcourez facilement une large sélection d'événements. Trouvez des événements par catégorie, localisation, date ou type d'activité.",
      pic: "search_10025332.png",
    },
    {
      id: 2,
      title: "Inscription Rapide",
      description:
        "Participez aux événements en un clic. Gérez vos inscriptions et suivez tous vos événements depuis votre profil personnel.",
      pic: "right_10025599.png",
    },
    {
      id: 3,
      title: "Gestion Complète",
      description:
        "Pour les organisateurs : créez, modifiez et gérez vos événements avec un tableau de bord administrateur intuitif et complet.",
      pic: "party_2982898.png",
    },
    {
      id: 4,
      title: "Notifications",
      description:
        "Recevez des rappels pour vos événements à venir et restez informé des mises à jour importantes.",
      pic: "active_1827392.png",
    },
  ];
  const howtolist = [
    {
      id: 1,
      title: "Créez un Compte",
      description:
        "Inscrivez-vous gratuitement en quelques secondes. Remplissez vos informations de base pour créer votre profil personnel.",
      pic: "round_61496.png",
    },
    {
      id: 2,
      title: "Explorez les Événements",
      description:
        "Naviguez dans notre catalogue d'événements. Utilisez les filtres pour trouver exactement ce qui vous intéresse - par date, lieu ou catégorie.",
      pic: "number-2_11830810.png",
    },
    {
      id: 3,
      title: "Participez aux Événements",
      description:
        "Cliquez sur un événement pour voir les détails complets (description, lieu, horaires, nombre de participants). Cliquez sur 'Participer' pour vous inscrire.",
      pic: "three_8921673.png",
    },
    {
      id: 4,
      title: "Gérez Votre Profil",
      description:
        "Accédez à votre profil pour voir vos statistiques, gérer vos participations et modifier vos informations personnelles.",
      pic: "four_6657092.png",
    },
  ];
  return (
    <PageTransition>
      <div>
        <div className="about1">
          <h1>A Propos d'E-gestion</h1>
          <p className="desc-about1">
            Une plateforme moderne pour simplifier la gestion et la
            participation aux événements.
          </p>
          <div class="about-cards">
            <div class="about-card">
              <h3>Notre mission</h3>
              <p>
                Faciliter l’organisation et la participation aux événements
                grâce à une plateforme simple, rapide et accessible à tous.
              </p>
            </div>

            <div class="about-card">
              <h3>Notre vision</h3>
              <p>
                Devenir une référence dans la gestion d’événements en ligne avec
                une solution moderne, sécurisée et efficace.
              </p>
            </div>
          </div>
        </div>
        <div className="about2">
          <h2>Qu'est-ce qu'E-gestion ?</h2>
          <p>
            E-gestion est une solution tout-en-un pour la gestion d’événements.
          </p>
          <p>
            Elle permet de connecter les organisateurs et les participants dans
            un environnement sécurisé et efficace, en simplifiant chaque étape :
            de la création de l’événement jusqu’à la participation.
          </p>
        </div>
        <div className="about3">
          <h2 style={{ textAlign: "center" }}>Fonctionnalités Principales</h2>
          <div className="container3">
            {Fonctionnalitéslist.map((l, index) => {
              return (
                <div key={index} className="articleF">
                  <img src={l.pic} alt="img" width={35} height={35} />
                  <h4>{l.title}</h4>
                  <p style={{ fontSize: "15px", color: "rgb(100,100,100)" }}>
                    {l.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="about4">
          <h2>Comment Utiliser E-gestion ?</h2>
          {howtolist.map((l, index) => {
            return (
              <div key={index} className="container4">
                <span>
                  <img
                    src={l.pic}
                    alt=""
                    width={35}
                    height={35}
                    style={{ marginTop: "20px", marginRight: "15px" }}
                  />
                </span>
                <span>
                  <h3>{l.title}</h3>
                  <p style={{ fontSize: "15px", color: "rgb(100,100,100)" }}>
                    {l.description}
                  </p>
                </span>
              </div>
            );
          })}
        </div>
        <div className="about5">
          <h2 style={{ textAlign: "center", marginTop: "10px" }}>
            Qui Utilise E-gestion ?
          </h2>
          <div className="container5">
            <div className="content5">
              <span style={{ display: "flex" }}>
                <img
                  src="user_456283.png"
                  alt="img"
                  width={25}
                  height={25}
                  style={{ marginTop: "15px", marginRight: "10px" }}
                />
                <h3>Participants</h3>
              </span>
              <span>
                <p>Les utilisateurs réguliers peuvent :</p>
                <ul>
                  <li>Parcourir tous les événements disponibles</li>
                  <li>S'inscrire et participer aux événements</li>
                  <li>Annuler leurs participations si nécessaire</li>
                  <li>Voir la liste des événements auxquels ils participent</li>
                  <li>Recevoir des notifications et rappels</li>
                  <li>Gérer leur profil personnel</li>
                </ul>
              </span>
            </div>
            <div className="content5">
              <span style={{ display: "flex" }}>
                <img
                  src="technology_10048069.png"
                  alt="img"
                  width={35}
                  height={35}
                  style={{ marginTop: "15px", marginRight: "10px" }}
                />
                <h3>Organisateurs</h3>
              </span>
              <span>
                <p>Les Organisateurs peuvent :</p>
                <ul>
                  <li>Créer leurs propres événements</li>
                  <li>Modifier et mettre à jour leurs événements</li>
                  <li>Gérer les participants de leurs événements</li>
                  <li>Voir les statistiques de participation</li>
                  <li>
                    Participer aux événements créés par d’autres organisateurs
                  </li>
                  <li>érer leur espace d’organisation</li>
                </ul>
              </span>
            </div>
            <div className="content5">
              <span style={{ display: "flex" }}>
                <img
                  src="setting_7542190.png"
                  alt="img"
                  width={30}
                  height={30}
                  style={{ marginTop: "15px", marginRight: "10px" }}
                />
                <h3>Administrateurs</h3>
              </span>
              <span>
                <p>Les Administrateurs peuvent :</p>
                <ul>
                  <li>Voir tous les événements de la plateforme</li>
                  <li>Savoir qui a créé chaque événement et quand</li>
                  <li>
                    Supprimer les événements qui ne respectent pas les règles
                  </li>
                  <li>Gérer les utilisateurs et leurs rôles</li>
                  <li>Superviser l’activité globale de la plateforme</li>
                  <li>Assurer la qualité et la sécurité du contenu</li>
                </ul>
              </span>
            </div>
          </div>
          <div className="about6">
            <h2>Notre Engagement</h2>
            <div className="container6">
              <div className="content6">
                <img src="bolt_10024241.png" alt="img" width={40} height={40} />
                <h3>Simple & Rapide</h3>
                <p>
                  Interface intuitive et processus simplifié pour une expérience
                  utilisateur optimale
                </p>
              </div>
              <div className="content6">
                <img
                  src="brand-protection_11088796.png"
                  alt="img"
                  width={40}
                  height={40}
                />
                <h3>Sécurisé</h3>
                <p>
                  Vos données sont protégées et votre vie privée est notre
                  priorité
                </p>
              </div>
              <div className="content6">
                <img
                  src="active_1827392.png"
                  alt="img"
                  width={40}
                  height={40}
                />
                <h3>Communauté Active</h3>
                <p>
                  Rejoignez une communauté grandissante de passionnés
                  d'événements
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <h2>Prêt à Commencer ?</h2>
          <p style={{ fontSize: "15px", color: "rgb(100,100,100)" }}>
            Rejoignez EventHub aujourd'hui et découvrez un monde d'événements
            passionnants
          </p>
          <button className="btn1" onClick={() => navigate("/signUp")}>
            S'inscrire Gratuitement
          </button>
          <button className="btn2" onClick={() => navigate("/Events")}>
            Explorer les Événements
          </button>
        </div>
      </div>
    </PageTransition>
  );
}

export default About;
