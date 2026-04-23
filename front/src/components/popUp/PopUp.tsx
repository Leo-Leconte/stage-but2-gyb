import styles from './PopUp.module.css';

type PopUpProps = {
    message : string;
}

/**
 * Composant popUp de notification
 * @param message ; le message à afficher dans la popUp
 */
const PopUp = ({message} : PopUpProps) => {
    return (

        <div className={styles.deco}>{message}</div>
    );
}
export default PopUp;