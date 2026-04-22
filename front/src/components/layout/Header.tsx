import logoGyb from "../../assets/logo-GYB.png";
import styles from "./Header.module.css"

const Header = () => {
    return (
        <>
            <header className={styles.header}>
                <button className={styles.hamburger}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <img src={logoGyb} alt="logo gyb" className={styles.logoGyb} />
            </header>

        </>
    )
}
export default Header;