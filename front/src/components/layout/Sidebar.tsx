import styles from "./Sidebar.module.css";

const Sidebar = ({isOpen} : any) => {

  return (
      <>
      {isOpen &&
      <nav>
        <ul>
          <li>
            <a href="#rien" title="L'acueil de notre site">
              Accueil
            </a>
          </li>
          <li>
            <a
                href="#rien"
                title="Liste des stagiaires (vue liste) avec filtres (service, periode, statut, tuteur)"
            >
              Stagiaires
            </a>
          </li>
          <li>
            <a
                href="#rien"
                title="Visualisation des stages sur un calendrier interactif (vue mois / semaine)"
            >
              Calendrier
            </a>
          </li>
        </ul>
      </nav>}
      </>
  )
}


export default Sidebar;