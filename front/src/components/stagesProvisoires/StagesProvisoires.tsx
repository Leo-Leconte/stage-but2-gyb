import { useState, useEffect } from 'react'
import {useNavigate} from "react-router";
import styles from './StagesProvisoires.module.css'

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

    const [stages,setStages] = useState<StageType[]>([]);

    const navigate = useNavigate();

    useEffect(() =>{ // dans un useEffect pour que ça fasse le fetch à chaque fois que le page se charge
        async function fetching(){

            const token=localStorage.getItem("access_token"); // Faut récup et envoyer le token vu que la policy a été mise en place mtn :(
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
    },[])

    async function deleteStage(id:number){
        const token=localStorage.getItem("access_token");
        let reponseApi = await fetch(`http://127.0.0.1:3000/api/stage/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const content = await reponseApi.json();
        setStages(stages.filter((s) => s.id !== id));
        console.log(content);
        navigate(`/stagesProvisoires`);
    }


        return(
            <table>
                <thead>
                <tr>
                    <th>Intitulé</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>

                {stages.map((stage: any) => (
                    <tr key={stage.id}>
                        <td>{stage.intitule}</td>
                        <td>{stage.statut}</td>
                        <td>
                            <button className={styles.voir} onClick={() => navigate(`/stage/${stage.id}`)}>
                                Voir en détails
                            </button>
                            <button className={styles.modifier}>Modifier</button>
                            <button className={styles.supprimer} onClick={ () => deleteStage(stage.id)} >Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            );


};
export default StagesProvisoires;
