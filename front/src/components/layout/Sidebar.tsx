import styles from "./Sidebar.module.css";

const Sidebar = ({isOpen} : any) => {

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

      </nav>}
      </>
  )
}


export default Sidebar;