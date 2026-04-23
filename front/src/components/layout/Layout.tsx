import {useState} from "react";
import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";
import { Outlet } from "react-router-dom";


const Layout= ( ) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Sidebar isOpen={isOpen}/>
            <div style={{ marginLeft: isOpen ? '250px' : '0', transition: 'margin 0.3s ease' }}>
                <Header setIsOpen={setIsOpen} isOpen={isOpen}/>
                <Outlet /> {/*Outlet c'est pour afficher le composant enfant de la route */}
            </div>
        </>
    )
}
export default Layout;