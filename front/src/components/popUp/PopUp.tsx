import styles from './PopUp.module.css';

type PopUpProps = {
    message : string;
}

const PopUp = ({message} : PopUpProps) => {
    return (

        <div className={styles.deco}>{message}</div>
    );
}
export default PopUp;