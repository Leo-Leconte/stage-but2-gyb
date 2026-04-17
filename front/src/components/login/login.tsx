import styles from './Login.module.css';
import { useState } from 'react'
import logoGyb from "../../assets/Logo-GYB-1.png";

const Login = ( ) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleUsernameChange(e : any) {
        setUsername(e.target.value);
    }
    function handlePasswordChange(e : any) {
        setPassword(e.target.value);
    }
        async function handleClickedButton(e : any) {
            e.preventDefault(); // Le comportement par défaut d'une page html est de recharger la page et d'envoyer les données dans l'URL, donc il faut enlever cela pour gérer nous même le comportement et afficher sur la page le message sans la recharger.

            let reponseApi = await fetch("http://127.0.0.1:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({nom:username, mot_de_passe:password})
                });
                const content = await reponseApi.json();
                console.log(content);
            reponseApi.ok ? localStorage.setItem("token" ,content.token) : setError(content.message)


        }

    return (
            <div className={styles.globalStyle}>
                <div className={styles.bg}>
                    <img src={logoGyb} alt="Logo de GYB" className={styles.logo} />
                    <form className={styles.form} onSubmit={handleClickedButton}>
                        <h2 className={styles.title}>Connectez-vous</h2>

                        <label className={styles.label} htmlFor="username">Nom d'utilisateur</label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Nom d'utilisateur"
                            id="username"
                            value={username}
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
                    <h3>{error}</h3>
                </div>
            </div>
    );
}

export default Login;