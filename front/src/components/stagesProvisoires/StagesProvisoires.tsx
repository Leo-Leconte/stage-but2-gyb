import { useState, useEffect } from 'react'
import {useNavigate} from "react-router";
import styles from './StagesProvisoires.module.css'
import PopUp from "../popUp/PopUp.tsx";

type StageType = {
    id: number;
    intitule: string;
    description_missions: string;
    developpement_competences: string;
    date_debut: string;
    date_fin: string;
    service_accueil: string;
    statut: string;
    id_stagiaire: number;
    id_tuteur: number;
    id_remuneration: number;
}

const StagesProvisoires = () => {
    const [stages, setStages] = useState<StageType[]>([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => { // dans un useEffect pour que ça fasse le fetch à chaque fois que la page se charge
        async function fetching(){
            const token = localStorage.getItem("access_token"); // Faut récup et envoyer le token vu que la policy a été mise en place mtn :(
            let reponseApi = await fetch("http://127.0.0.1:3000/api/stage", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const content = await reponseApi.json();
            setStages(content);
            console.log(content);
        }
        fetching();
    }, [])

    async function deleteStage(id: number) {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce stage ?");
        if (!confirmation) return;
        const token = localStorage.getItem("access_token");
        await fetch(`http://127.0.0.1:3000/api/stage/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        setStages(stages.filter((s) => s.id !== id));
        setMessage("Le stage a bien été supprimé");
        setTimeout(() => setMessage(""), 3000);
    }

    return (
        <>
            {message && <PopUp message={message} />}
            <div className={styles.grille}>
                {stages.map((stage: any) => (
                    <div key={stage.id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.intitule}>{stage.intitule}</h3>
                            <span className={styles.statut}>{stage.statut}</span>
                        </div>
                        <div className={styles.cardBody}>
                            <p>{stage.description_missions}</p>
                            <p><strong>Service :</strong> {stage.service_accueil}</p>
                            <p><strong>Début :</strong> {stage.date_debut}</p>
                            <p><strong>Fin :</strong> {stage.date_fin}</p>
                        </div>
                        <div className={styles.cardFooter}>
                            <button className={styles.voir} onClick={() => navigate(`/stage/${stage.id}`)}>
                                Voir en détails
                            </button>
                            <button className={styles.modifier} onClick={() => navigate(`/crud/update/stage/${stage.id}`)}>
                                Modifier
                            </button>
                            <button className={styles.supprimer} onClick={() => deleteStage(stage.id)}>
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default StagesProvisoires;