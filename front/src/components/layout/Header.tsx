import logoGyb from "../../assets/logo-GYB.png";
import styles from "./Header.module.css"

const Header = () => {
    return (
        <>
            <button className={styles.hamburger}>☰</button>
            <img src={logoGyb} alt="logo gyb" className={styles.logoGyb}/>

        </>
    )
}
export default Header;