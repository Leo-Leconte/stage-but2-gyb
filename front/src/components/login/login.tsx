//import styles from './Login.module.css';
//import { useState } from 'react'


const Login = () => {

    return (
        <>
            <div className="bg">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form>
                <h2>Connectez-vous</h2>

                <label>Nom d'utilisateur</label>
                <input type="text" placeholder="Nom d'utilisateur" id="username"/>

                <label>Mot de passe</label>
                <input type="text" placeholder="Mot de passe" id="password"/>

                <button>Se connecter</button>
            </form>
        </>
    );



}
export default Login;