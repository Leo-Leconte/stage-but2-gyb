import styles from "../login/Login.module.css";
import { useNavigate } from "react-router";
import Header from "../layout/Header.tsx";

/**
 * Composant de la page de redirection
 * Permet à un collaborateur de se déconnecter et de renvoyer une notif de deconnection
 * (plus tard de voir le menu principal avec les stages, c'est une page placeholder)
 */

const Home= ( ) => {
    const navigate = useNavigate();

    /**
     * Fonction qui déconnecte le collaborateur
     * Supprime le token stocké avec localStorage
     * Le renvoie vers la page de login
     * @param e ; enlève le comportement de la page par défaut
     */
    async function handleClickedButton(e : any) {
        e.preventDefault(); // Le comportement par défaut d'une page html est de recharger la page et d'envoyer les données dans l'URL, donc il faut enlever cela pour gérer nous même le comportement et afficher sur la page le message sans la recharger.

        localStorage.removeItem("token");
        localStorage.setItem("deconnected", "true");
        navigate('/');
    }

    return (
        <>
            <Header/>
            <h2 className={styles.h1}>Bravo vous êtes connectés ! Features à venir mais la redirection a fonctionnée donc c'est déjà un bon
            début non? </h2>
            <button className={styles.button} onClick={handleClickedButton}>
                Se déconnecter
            </button>
        </>
    )

}

export default Home;