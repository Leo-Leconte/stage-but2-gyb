import { useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./StageDetails.module.css";
import { useNavigate } from "react-router";

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

    type TuteurType = {
        id_tuteur: number;
        nom: string;
        prenom: string;
        service: string;
        email: string;
    }

    type StagiaireType = {
        id_stagiaire: number;
        nom: string;
        prenom: string;
        ecole:string;
        formation:string;
        email:string;
        telephone: string;
    }

    type RemunerationType = {
        id_remuneration: number;
        est_remunere:boolean;
        montant_remunere:number;
    }


    const navigate = useNavigate();
    const [stage, setStage] = useState<StageType | null>(null);
    const [tuteur, setTuteur] = useState<TuteurType | null>(null);
    const [stagiaire, setStagiaire] = useState<StagiaireType | null>(null);
    const [remuneration, setRemuneration] = useState<RemunerationType | null>(null);

    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        async function fetching() {
            try {

                const reponseApiStage = await fetch(`http://127.0.0.1:3000/api/stage/${id}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const contentStage = await reponseApiStage.json();
                setStage(contentStage.stage);


                if (contentStage.stage && contentStage.stage.id_tuteur) {
                    const reponseApiTuteur = await fetch(`http://127.0.0.1:3000/api/tuteur/${contentStage.stage.id_tuteur}`, {
                        method: "GET",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    const contentTuteur = await reponseApiTuteur.json();
                    setTuteur(contentTuteur.tuteur);
                }

                if (contentStage.stage && contentStage.stage.id_stagiaire){
                    const reponseApiStagiaire = await fetch(`http://127.0.0.1:3000/api/stagiaire/${contentStage.stage.id_stagiaire}`,{
                        method: "GET",
                        headers:{
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }

                    });
                    const contentStagiaire = await reponseApiStagiaire.json();
                    setStagiaire(contentStagiaire.stagiaire);
                }

                if (contentStage.stage && contentStage.stage.id_remuneration){
                    const reponseApiRemuneration = await fetch(`http://127.0.0.1:3000/api/remuneration/${contentStage.stage.id_remuneration}`,{
                        method: "GET",
                        headers:{
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }

                    });
                    const contentRemuneration = await reponseApiRemuneration.json();
                    setRemuneration(contentRemuneration.remuneration);
                }


            } catch (err) {
                console.error("Erreur fetching:", err);
            }
        }
        fetching();
    });

    return (
        <>
            <button className={styles.retour} onClick={() => navigate(-1)}>← Retour</button>

            {stage && (
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.titre}>{stage.intitule}</div>
                        <div className={styles.statut}>{stage.statut}</div>

                        <hr className={styles.separateur}/>

                        <div className={styles.champ}>
                            <span className={styles.label}>Date de début</span>
                            <span className={styles.valeur}>{stage.date_debut}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Date de fin</span>
                            <span className={styles.valeur}>{stage.date_fin}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Service d'accueil</span>
                            <span className={styles.valeur}>{stage.service_accueil}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Description des missions</span>
                            <span className={styles.valeur}>{stage.description_missions}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Compétences à développer</span>
                            <span className={styles.valeur}>{stage.developpement_competences}</span>
                        </div>

                        <hr className={styles.separateur}/>

                        <div className={styles.champ}>
                            <span className={styles.label}>Stagiaire</span>
                            <span className={styles.valeur}>{stagiaire?.nom} {stagiaire?.prenom}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>École du stagiaire</span>
                            <span className={styles.valeur}>{stagiaire?.ecole}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Formation du stagiaire</span>
                            <span className={styles.valeur}>{stagiaire?.formation}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Email du stagiaire</span>
                            <span className={styles.valeur}>{stagiaire?.email}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Numéro de téléphone du stagiaire</span>
                            <span className={styles.valeur}>{stagiaire?.telephone}</span>
                        </div>

                        <hr className={styles.separateur}/>

                        <div className={styles.champ}>
                            <span className={styles.label}>Tuteur</span>
                            <span className={styles.valeur}>{tuteur?.prenom} {tuteur?.nom}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Service du tuteur</span>
                            <span className={styles.valeur}>{tuteur?.service}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Email du tuteur</span>
                            <span className={styles.valeur}>{tuteur?.email}</span>
                        </div>

                        <hr className={styles.separateur}/>

                        <div className={styles.champ}>
                            <span className={styles.label}>Montant de la rémunération</span>
                            <span className={styles.valeur}>{remuneration?.montant_remunere} €</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StagesProvisoires;