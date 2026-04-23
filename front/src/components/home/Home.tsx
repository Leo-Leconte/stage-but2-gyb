import Header from "../layout/Header.tsx";
import Sidebar from "../layout/Sidebar.tsx";
import {useState} from "react";


/**
 * Composant de la page de redirection
 * Permet à un collaborateur de se déconnecter et de renvoyer une notif de deconnection
 * (plus tard de voir le menu principal avec les stages, c'est une page placeholder)
 */

const Home= ( ) => {
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Fonction qui déconnecte le collaborateur
     * Supprime le token stocké avec localStorage
     * Le renvoie vers la page de login
     * @param e ; enlève le comportement de la page par défaut
     */

    return (
        <>
            <Sidebar isOpen={isOpen}/>
            <div style={{ marginLeft: isOpen ? '250px' : '0', transition: 'margin 0.3s ease' }}>
                <Header setIsOpen={setIsOpen} isOpen={isOpen}/>
            </div>
        </>
    )

}

export default Home;