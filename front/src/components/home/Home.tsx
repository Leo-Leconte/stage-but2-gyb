import styles from "../login/Login.module.css";
import { useNavigate } from "react-router";
import Header from "../layout/Header.tsx";
import Sidebar from "../layout/Sidebar.tsx";
import {useState} from "react";


/**
 * Composant de la page de redirection
 * Permet à un collaborateur de se déconnecter et de renvoyer une notif de deconnection
 * (plus tard de voir le menu principal avec les stages, c'est une page placeholder)
 */

const Home= ( ) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

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

    return (
        <>
            {/*Je savais pas trop si c'est possible de mettre ça dans le CSS alors je l'ai mis ici*/}
            <div style={{ marginLeft: isOpen ? '250px' : '0', transition: 'margin 0.3s ease' }}>
            <Header setIsOpen={setIsOpen} isOpen={isOpen}/>
            <Sidebar isOpen={isOpen}/>
            <button className={styles.button} onClick={handleClickedButton}>
                Se déconnecter
            </button>
            </div>
        </>
    )

}

export default Home;