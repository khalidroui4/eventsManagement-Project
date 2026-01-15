import React from "react";
import PageTransition from "../utils/pageTransition";
import "../styles/contact.css";

function Contact() {
  return (
    <PageTransition>
      <div>
        <div className="contact1">
          <h1>Contactez-nous</h1>
          <p>
            Vous avez une question, une suggestion ou vous avez rencontré un
            problème ? N'hésitez pas à nous contacter. Notre équipe est là pour
            vous aider
          </p>
        </div>
        <div className="contact2">
          <div style={{ width: "60%" }}>
            <article className="info1">
              <h2>Informations de Contact</h2>
              <div style={{ display: "flex" }} className="info">
                <span className="logo">
                  <img src="mail_1324171.png" alt="" width={40} height={40} />
                </span>
                <span className="infoText">
                  <h4>Email</h4>
                  <p>rouibaa.khalid05@gmail.com</p>
                </span>
              </div>
              <div style={{ display: "flex" }} className="info">
                <span className="logo">
                  <img
                    src="phone-call_3779208.png"
                    alt=""
                    width={40}
                    height={40}
                  />
                </span>
                <span className="infoText">
                  <h4>Téléphone</h4>
                  <p>+212690840304</p>
                </span>
              </div>
              <div style={{ display: "flex" }} className="info">
                <span className="logo">
                  <img src="next_15553801.png" alt="" width={40} height={40} />
                </span>
                <span className="infoText">
                  <h4>Horaires d'ouverture</h4>
                  <p>
                    Lundi - Vendredi: 9h00 - 18h00 <br />
                    Samedi: 10h00 - 14h00 <br />
                    Dimanche: Fermé
                  </p>
                </span>
              </div>
            </article>
            <article className="info2">
              <h2>Temps de réponse</h2>
              <p style={{ color: "rgb(100,100,100)", fontSize: "17px" }}>
                Nous nous efforçons de répondre à tous les messages dans un
                délai de 24 à 48 heures ouvrables. Pour les urgences, veuillez
                nous appeler directement.
              </p>
            </article>
          </div>
          <div className="sendinfo">
            <h2>Envoyez-nous un message</h2>
            <form>
              <h4>Nom complet</h4>
              <input type="text" placeholder="Votre nom" id="" />
              <h4>Email</h4>
              <input type="email" placeholder="votre.email@exemple.com" id="" />
              <h4>Sujet</h4>
              <input type="text" placeholder="De quoi il s'agit-il?" id="" />
              <h4>Message</h4>
              <textarea placeholder="Décriver votre question ou probléme en détail..."></textarea>
              <button>
                <img
                  src="direct_1004013.png"
                  alt=""
                  width={20}
                  height={20}
                  style={{ marginTop: "12px", marginRight: "10px" }}
                />
                <p>Envoyer le message</p>
              </button>
            </form>
          </div>
        </div>
        <div className="contact3">
          <h2>Questions Fréquentes</h2>
          <div className="questions">
            <span>
              <h3>Comment créer un événement ?</h3>
              <p>
                Connectez-vous avec un compte administrateur pour accéder au
                tableau de bord et créer des événements.
              </p>
            </span>
            <span>
              <h3>Puis-je annuler ma participation ?</h3>
              <p>
                Oui, vous pouvez annuler votre participation à tout moment
                depuis la page de détails de l'événement.
              </p>
            </span>
            <span>
              <h3>Comment s'inscrire à un événement ?</h3>
              <p>
                Créez un compte, parcourez les événements et cliquez sur
                "Participer" sur la page de détails de l'événement.
              </p>
            </span>
            <span>
              <h3>Signaler un problème technique</h3>
              <p>
                Utilisez le formulaire ci-dessus avec le sujet "Problème
                Technique" pour nous signaler tout bug ou erreur.
              </p>
            </span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Contact;
