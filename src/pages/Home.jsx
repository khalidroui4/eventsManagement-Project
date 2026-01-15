import React from "react";
import PageTransition from "../utils/pageTransition";
import "../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const numberlist = [
    { id: 1, num: "237", description: "Total des événements" },
    { id: 2, num: "168", description: "Utilisateur actif" },
    { id: 3, num: "29", description: "Cours via notre site Internet" },
    { id: 4, num: "95%", description: "Satisfaction totale des utilisateurs" },
  ];
  const introliste = [
    { id: 1,
      title: "Découverte facile d'événements",
      description:
        " Parcourez des milliers d'événements adaptés à vos centres d'intérêt et à votre localisation. Trouvez exactement ce que vous cherchez.",
      pic: "party_2982898.png",
    },
    { id: 2,
      title: "Entrez en contact avec des personnes.",
      description:
        " Rencontrez des personnes partageant les mêmes idées, élargissez votre réseau et tissez des liens durables lors d'événements.",
      pic: "group_18992261.png",
    },
    { id: 3,
      title: "Inscription simple",
      description:
        " Inscrivez-vous aux événements en un seul clic. Suivez votre participation et gérez votre emploi du temps sans effort.",
      pic: "right_10025599.png",
    },
    { id: 4,
      title: "Portée mondiale",
      description:
        "Accédez à des événements du monde entier ou concentrez-vous sur votre communauté locale. Options virtuelles et en présentiel disponibles.",
      pic: "placeholder_819865.png",
    },
    { id: 5,
      title: "Notifications intelligentes",
      description:
        "Ne manquez plus aucun événement ! Recevez des rappels et des mises à jour en temps opportun sur les événements qui vous intéressent.",
      pic: "active_1827392.png",
    },
    { id: 6,
      title: "Trending Events",
      description:
        " Restez informé(e) des événements les plus populaires et les plus en vogue dans votre région et dans le monde entier.",
      pic: "trend_8944350.png",
    },];
  return (
    <PageTransition>
      <div className="container">
        <div className="intro1">
          <h1>Découvrez & Participez à des événements exceptionnels</h1>
          <p>
            Rencontrez des personnes partageant les mêmes centres d'intérêt,
            découvrez des événements passionnants et créez des souvenirs
            inoubliables. Votre prochaine aventure commence ici
          </p>
          <button className="btn1-intro1" onClick={() => navigate("/Events")}>
            Explorer les événements
          </button>
          <button className="btn2-intro1" onClick={() => navigate("/signUp")}>
            Commencez avec nous
          </button>
        </div>
        <div className="intro2">
          {numberlist.map((numL, index) => {
            return (
              <span key={index}>
                <p className="num">{numL.num}</p>
                <p className="desc">{numL.description}</p>
              </span>
            );
          })}
        </div>

        <div className="intro3">
          <h3>Pourquoi choisir E-gestion ?</h3>
          <p style={{ fontSize: "15px", color: "rgb(100,100,100)" }}>
            Tout ce dont vous avez besoin pour découvrir, organiser et
            participer à des événements.
          </p>
          <div className="articleContainer">
            {introliste.map((L , index) => {
              return (
                <div className="article" key={index}>
                  <span className="articleIcon">
                    <img src={L.pic} alt="img" height={40} width={40}/>
                  </span>
                  <h4>{L.title}</h4>
                  <p style={{ fontSize: "12px" }}>{L.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="intro4">
          <h3>Prêt à commencer ?</h3>
          <p style={{ fontSize: "15px", color: "rgb(100,100,100)" }}>
            Rejoignez les milliers d'utilisateurs qui découvrent et participent déjà chaque jour à des événements exceptionnels.
          </p>
          <button onClick={()=>navigate("/signUp")}>Créez votre compte</button>
        </div>
      </div>
    </PageTransition>
  );
} 

export default Home;