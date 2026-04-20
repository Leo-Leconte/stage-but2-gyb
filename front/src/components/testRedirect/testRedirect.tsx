import styles from "../login/Login.module.css";
import { useNavigate } from "react-router";


const Redirect= ( ) => {

    const navigate = useNavigate();

    async function handleClickedButton(e : any) {
        e.preventDefault(); // Le comportement par défaut d'une page html est de recharger la page et d'envoyer les données dans l'URL, donc il faut enlever cela pour gérer nous même le comportement et afficher sur la page le message sans la recharger.

        localStorage.removeItem("token");
        navigate('/');
        alert('Vous avez bien été déconnecté.');
    }





    return (
        <>
            <h2 className={styles.h1}>Bravo vous êtes connectés ! Features à venir mais la redirection a fonctionnée donc c'est déjà un bon
            début non? </h2>
            <button className={styles.button} onClick={handleClickedButton}>
                Se déconnecter
            </button>
        </>
    )

}

export default Redirect;