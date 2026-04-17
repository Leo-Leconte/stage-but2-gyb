import styles from './Login.module.css';
import { useState } from 'react'
import logoGyb from "../../assets/Logo-GYB-1.png";

const Login = ( ) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(''); // Je l'ai pas nommé explicitement mb, c'est ce qui s'affiche à l'écran quand le bouton est pressé.

    function handleUsernameChange(e : any) {
        setUsername(e.target.value);
    }
    function handlePasswordChange(e : any) {
        setPassword(e.target.value);
    }
    function handleClickedButton(e : any) {
        e.preventDefault(); // Le comportement par défaut d'une page html est de recharger la page et d'envoyer les données dans l'URL, donc il faut enlever cela pour gérer nous même le comportement et afficher sur la page le message sans la recharger.
        setResult(
            "Le formulaire a bien été soumis ennvoyé avec l'utilisateur suivant : " + username
        );
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
                        <h3>{result}</h3>
                </div>
            </div>
    );
}

export default Login;