import { useParams } from "react-router";
import {useEffect, useState} from "react";
import styles from "./StageDetails.module.css"
import { useNavigate } from "react-router";

//import {Route} from "react-router-dom";

const StagesProvisoires = () => {

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

    const navigate = useNavigate();

    const [stage, setStage] = useState<StageType | null>(null); // Je l'initialse de type StageType ou null je trouve ça plus pro qu'un any

    const { id } = useParams(); // Il faut le même nom que dans App sinon c'est undefined somewhy


    useEffect(() =>{ // dans un useEffect pour que ça fasse le fetch à chaque fois que le page se charge
        async function fetching(){

            const token=localStorage.getItem("access_token"); // Faut récup et envoyer le token vu que la policy a été mise en place mtn :(
            let reponseApi = await fetch(`http://127.0.0.1:3000/api/stage/${id}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const content = await reponseApi.json();
            setStage(content.stage);
            console.log(content.stage);
        }
        fetching();
    },[])



    return (
        <>
            <button className={styles.retour} onClick={() => navigate(-1)}>← Retour</button>

            {stage && (

                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.titre}>{stage?.intitule}</div>
                        <div className={styles.statut}>{stage?.statut}</div>
                        <hr className={styles.separateur}/>
                        <div className={styles.champ}>
                            <span className={styles.label}>Date de début</span>
                            <span className={styles.valeur}>{stage?.date_debut}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Date de fin</span>
                            <span className={styles.valeur}>{stage?.date_fin}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Service d'accueil</span>
                            <span className={styles.valeur}>{stage?.service_accueil}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Description des missions</span>
                            <span className={styles.valeur}>{stage?.description_missions}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Compétences à développer</span>
                            <span className={styles.valeur}>{stage?.developpement_competences}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>ID Stagiaire</span>
                            <span className={styles.valeur}>{stage?.id_stagiaire}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>ID Tuteur</span>
                            <span className={styles.valeur}>{stage?.id_tuteur}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>ID Rémunération</span>
                            <span className={styles.valeur}>{stage?.id_remuneration}</span>
                        </div>
                    </div>
                </div>
            )
            }





        </>
    );
};
export default StagesProvisoires;
