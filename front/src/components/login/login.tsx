import styles from './Login.module.css';
// import { useState } from 'react'

const Login = () => {
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
                />

                <label className={styles.label} htmlFor="password">Mot de passe</label>
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Mot de passe"
                    id="password"
                />

                <button className={styles.button} type="submit">
                    Se connecter
                </button>
            </form>
        </div>
    );
}

export default Login;