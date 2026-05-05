import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./ListeStages.module.css";
import PopUp from "../popUp/PopUp.tsx";

type StageType = {
  id: number;
  intitule: string;
  description_missions: string;
  developpement_competences: string;
  date_debut: string;
  date_fin: string;
  service_accueil: string;
  statut: string;
  id_stagiaire: number;
  id_tuteur: number;
  id_remuneration: number;
};

type TuteurType = {
  id_tuteur: number;
  nom: string;
  prenom: string;
  service: string;
  email: string;
};

type StagiaireType = {
  id_stagiaire: number;
  nom: string;
  prenom: string;
  ecole: string;
  formation: string;
  email: string;
  telephone: string;
};

/**
 * fonction permettant de convertir la date en format "/"
 * @param date ; la date à modifier
 */
const formatDate = (date: string): string => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

/**
 * Composant qui affiche la liste de tous les stages
 * avec une preview globale des infos
 */
const ListeStages = () => {
  const [stages, setStages] = useState<StageType[]>([]);
  const [message, setMessage] = useState("");
  const [tuteurs, setTuteurs] = useState<TuteurType[]>([]);
  const [stagiaires, setStagiaires] = useState<StagiaireType[]>([]);

  const navigate = useNavigate();

  /**
   * Permet d'afficher tous les stages, mais en une seule fois a chaque reload de la page
   */
  useEffect(() => {
    // dans un useEffect pour que ça fasse le fetch à chaque fois que la page se charge

    async function fetching() {
      const token = localStorage.getItem("access_token"); // Faut récup et envoyer le token vu que la policy a été mise en place mtn :(
      let reponseApi = await fetch("http://127.0.0.1:3000/api/stage", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const content = await reponseApi.json();
      setStages(content);
      console.log(content);

      const reponseApiTuteur = await fetch(`http://127.0.0.1:3000/api/tuteur`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const contentTuteur = await reponseApiTuteur.json();
      setTuteurs(contentTuteur);

      const reponseApiStagiaire = await fetch(
        `http://127.0.0.1:3000/api/stagiaire`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const contentStagiaire = await reponseApiStagiaire.json();
      setStagiaires(contentStagiaire);
    }

    fetching();
  }, []); // le [] c'est pour lui dire de le faire qu'une fois et pas de boucler à l'infini

  /**
   * Fonction qui permet de supprimer un stage
   * @param id
   */

  async function deleteStage(id: number) {
    const confirmation = window.confirm(
      "êtes-vous sûr de vouloir supprimer ce stage ?",
    );
    if (!confirmation) return;
    const token = localStorage.getItem("access_token");
    await fetch(`http://127.0.0.1:3000/api/stage/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setStages(stages.filter((s) => s.id !== id));
    setMessage("Le stage a bien été supprimé");
    setTimeout(() => setMessage(""), 3000);
  }

  /**
   * Permet de rediriger vers la page de création d'un stage au clic du bouton
   */
  function handleCreate() {
    navigate("../crud/create/stage");
  }

  return (
    <>
      <div className={styles.header}>
        <h2>Bienvenue sur la page d'accueil !</h2>
        <h3>
          Ici créez, visualisez, modifiez, et supprimez vos stages à loisir !
        </h3>
        <button className={styles.creer} onClick={handleCreate}>
          + Créer un stage
        </button>
      </div>

      {message && <PopUp message={message} />}
      <div className={styles.grille}>
        {stages.map((stage: any) => {
          const tuteur = tuteurs?.find((t: any) => t.id === stage.id_tuteur);
          const stagiaire = stagiaires?.find(
            (s: any) => s.id === stage.id_stagiaire,
          );

          return (
            <div key={stage.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.intitule}>{stage.intitule}</h3>
                <span className={styles.statut}>{stage.statut}</span>
              </div>
              <div className={styles.cardBody}>
                <p>{stage.description_missions}</p>
                <p>
                  <strong>Service :</strong> {stage.service_accueil}
                </p>
                <p>
                  <strong>Stagiaire :</strong>{" "}
                  {stagiaire
                    ? `${stagiaire.prenom} ${stagiaire.nom}`
                    : `ID ${stage.id_stagiaire} introuvable`}
                </p>
                <p>
                  <strong>Tuteur :</strong>{" "}
                  {tuteur
                    ? `${tuteur.prenom} ${tuteur.nom}`
                    : `ID ${stage.id_tuteur} introuvable`}
                </p>
                <p>
                  <strong>Début :</strong> {formatDate(stage.date_debut)}
                </p>
                <p>
                  <strong>Fin :</strong> {formatDate(stage.date_fin)}
                </p>
              </div>
              <div className={styles.cardFooter}>
                <button
                  className={styles.voir}
                  onClick={() => navigate(`/stage/${stage.id}`)}
                >
                  Voir en détails
                </button>
                <button
                  className={styles.modifier}
                  onClick={() => navigate(`/crud/update/stage/${stage.id}`)}
                >
                  Modifier
                </button>
                <button
                  className={styles.supprimer}
                  onClick={() => deleteStage(stage.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListeStages;
