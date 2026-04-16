import styles from './Login.module.css';
import { useState } from 'react'

const Login = ( ) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function UsernameChange(e : any) {
        setUsername(e.target.value);
    }
    function PasswordChange(e : any) {
        setPassword(e.target.value);
    }

    return (
            <div className={styles.bg}>
            <form className={styles.form}>
                <h2 className={styles.title}>Connectez-vous</h2>

                <label className={styles.label} htmlFor="username">Nom d'utilisateur</label>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Nom d'utilisateur"
                    id="username"
                    value={username}
                    onChange={UsernameChange}

                />

                <label className={styles.label} htmlFor="password">Mot de passe</label>
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Mot de passe"
                    id="password"
                    value={password}
                    onChange={PasswordChange}
                />

                <button className={styles.button} type="submit">
                    Se connecter
                </button>
            </form>
        </div>
    );
}


export default Login;