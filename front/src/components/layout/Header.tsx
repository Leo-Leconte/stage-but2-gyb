import logoGyb from "../../assets/logo-GYB.png";
import styles from "./Header.module.css"
import { useNavigate } from "react-router";

const Header = ({isOpen, setIsOpen} : any) => {

    const navigate = useNavigate();
    function handleLogo(){
        navigate("/home");
    }

    return (
        <>
            <header className={styles.header}>
                <button className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={() => setIsOpen((prev: any) => !prev)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <img src={logoGyb} alt="logo gyb" className={styles.logoGyb} onClick={handleLogo}/>
            </header>

        </>
    )
}
export default Header;