import styles from './Login.module.css';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router";

import logoGyb from "../../assets/logo-GYB.png";
import PopUp from "../popUp/PopUp.tsx";

/**
 * Composant de la page de connexion
 * Permet à un collaborateur de se login via email et password
 */

const Login = ( ) => {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem("deconnected") === "true") {
            setMessage("Vous avez été déconnecté !")
            setTimeout(() => setMessage(""), 3000);
            localStorage.removeItem("deconnected");
        }
    }, [])



        /**
     * Fonction qui récupère l'email tapé en front et qui l'assigne dans l'email
     * @param e ; la valeur du champ email à changer
     */
    function handleUsernameChange(e : any) {
        setemail(e.target.value);
    }

    /**
     * Fonction qui récupère le password tapé en front et qui l'assigne dans password
     * @param e ; la valeur du champ password à changer
     */
    function handlePasswordChange(e : any) {
        setPassword(e.target.value);
    }

    /**
     * Fonction qui regarde si les identifiants sont corrects
     * Qui stockent dans un localstorage le token renvoyé par l'API
     * Et redirige vers une page redirected si c'est correct
     * @param e ; enlève le comportement de la page par défaut
     * @throws Affiche un message d'erreur si les identifiants sont incorrects
     *
     */
        async function handleClickedButton(e : any) {
            e.preventDefault(); // Le comportement par défaut d'une page html est de recharger la page et d'envoyer les données dans l'URL, donc il faut enlever cela pour gérer nous même le comportement et afficher sur la page le message sans la recharger.

            let reponseApi = await fetch("http://127.0.0.1:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email:email, mot_de_passe:password})
                });
                const content = await reponseApi.json();
                console.log(content);

            if(reponseApi.ok){
                localStorage.setItem("token", content.token);
                navigate('/redirected');
            }
            else{
                setError(content.message);
            }
        }

    return (
            <div className={styles.globalStyle}>
                <div className={styles.bg}>
                    <img src={logoGyb} alt="Logo de GYB" className={styles.logo} />
                    <h1 className={styles.h1}>Bienvenue sur GYB</h1>
                    <form className={styles.form} onSubmit={handleClickedButton}>
                        <h2 className={styles.title}>Connectez-vous</h2>

                        <label className={styles.label} htmlFor="email">Email d'utilisateur</label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Email d'utilisateur"
                            id="email"
                            value={email}
                            onChange={handleUsernameChange}

                        />

                        <label className={styles.label} htmlFor="password">Mot de passe</label>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Mot de passe"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />

                        <button className={styles.button} type="submit">
                            Se connecter
                        </button>
                    </form>
                    <h3 className={styles.error}>{error}</h3>
                </div>
                {message && <PopUp message={message} />}
            </div>
    );
}

export default Login;