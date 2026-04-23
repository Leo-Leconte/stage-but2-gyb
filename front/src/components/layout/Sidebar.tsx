import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router";
const Sidebar = ({isOpen} : any) => {
    const navigate = useNavigate();

    async function handleClickedButton(e : any) {
        e.preventDefault(); // Le comportement par défaut d'une page html est de recharger la page et d'envoyer les données dans l'URL, donc il faut enlever cela pour gérer nous même le comportement et afficher sur la page le message sans la recharger.

        localStorage.removeItem("access_token");
        localStorage.setItem("deconnected", "true");
        navigate('/');
    }

  return (
      <>
      {isOpen &&
      <nav className={styles.nav}>

          <div className={styles.accueil}>
            <a href="#rien" title="L'acueil de notre site">
              Accueil
            </a>
          </div>

          <div className={styles.liste}>
            <a href="#rien" title="Liste des stagiaires (vue liste) avec filtres (service, periode, statut, tuteur)">
              Stagiaires
            </a>
          </div>

          <div className={styles.calendrier}>
            <a href="#rien" title="Visualisation des stages sur un calendrier interactif (vue mois / semaine)">
              Calendrier
            </a>
          </div>

          <div className={styles.deconnexion}>
          <button onClick={handleClickedButton}>
              Se déconnecter
          </button>
          </div>

      </nav>}
      </>
  )
}


export default Sidebar;