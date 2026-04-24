import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router";
const Sidebar = ({isOpen} : any) => {
    const navigate = useNavigate();


    /**
     * Fonction qui déconnecte le collaborateur
     * Supprime le token stocké avec localStorage
     * Le renvoie vers la page de login
     * @param e ; enlève le comportement de la page par défaut
     */

    async function handleClickedButton(e : any) {
        e.preventDefault(); // Le comportement par défaut d'une page html est de recharger la page et d'envoyer les données dans l'URL, donc il faut enlever cela pour gérer nous même le comportement et afficher sur la page le message sans la recharger.

        localStorage.removeItem("access_token");
        localStorage.setItem("deconnected", "true");
        navigate('/');
    }

    /**
     * Fonction qui redirige vers home au clic
     */
    function handleAccueil(){
        navigate('/home');
    }

    /**
     * Fonction qui redirige vers stagiaires au clic
     */
    function handleStagiaires(){
        navigate('/stagiaires');
    }


    /**
     * Fonction qui redirige vers calendrier au clic
     */
    function handleCalendrier(){
        navigate('/calendrier');
    }

    function handleStages(){
        navigate('/stagesProvisoires');
    }


  return (
      <>
      {isOpen &&
      <nav className={styles.nav}>

          <div className={styles.accueil}>
            <a onClick={handleAccueil} title="L'accueil de notre site">
              Accueil
            </a>
          </div>

          <div className={styles.liste}>
            <a onClick={handleStagiaires} title="Liste des stagiaires (vue liste) avec filtres (service, periode, statut, tuteur)">
              Stagiaires
            </a>
          </div>

          <div className={styles.calendrier}>
            <a onClick={handleCalendrier} title="Visualisation des stages sur un calendrier interactif (vue mois / semaine)">
              Calendrier
            </a>
          </div>

          <div className={styles.stages}>
              <a onClick={handleStages} title="Visualisation des stages sous forme de fiches récaps (provisoire car on a pas encore la vue liste)">
                  Stages
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