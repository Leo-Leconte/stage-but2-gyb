import { useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./StageDetails.module.css";
import { useNavigate } from "react-router";

/**
 * Représente un stage avec ses informations générales.
 */
type StageType = {
    /** Identifiant unique du stage */
    id: number;
    /** Intitulé du stage */
    intitule: string;
    /** Description détaillée des missions confiées au stagiaire */
    description_missions: string;
    /** Compétences visées par le stage */
    developpement_competences: string;
    /** Date de début du stage (format ISO) */
    date_debut: string;
    /** Date de fin du stage (format ISO) */
    date_fin: string;
    /** Service d'accueil du stagiaire */
    service_accueil: string;
    /** Statut actuel du stage (ex : "En cours", "Terminé") */
    statut: string;
    /** Référence vers le stagiaire associé */
    id_stagiaire: number;
    /** Référence vers le tuteur associé */
    id_tuteur: number;
    /** Référence vers la rémunération associée */
    id_remuneration: number;
};

/**
 * Représente un tuteur encadrant un stage.
 */
type TuteurType = {
    /** Identifiant unique du tuteur */
    id_tuteur: number;
    nom: string;
    prenom: string;
    /** Service auquel appartient le tuteur */
    service: string;
    email: string;
};

/**
 * Représente un stagiaire.
 */
type StagiaireType = {
    /** Identifiant unique du stagiaire */
    id_stagiaire: number;
    nom: string;
    prenom: string;
    /** École d'origine du stagiaire */
    ecole: string;
    /** Formation suivie par le stagiaire */
    formation: string;
    email: string;
    telephone: string;
};

/**
 * Représente les informations de rémunération d'un stage.
 */
type RemunerationType = {
    /** Identifiant unique de la rémunération */
    id_remuneration: number;
    /** Indique si le stage est rémunéré */
    est_remunere: boolean;
    /** Montant de la rémunération en euros */
    montant_remunere: number;
};

/**
 * Représente un document lié à un stage.
 */
type DocumentType = {
    /** Identifiant unique du document */
    id: number;
    /** Nom lisible du document */
    nom_doc: string;
    /** Type de document (comme une fiche contact par ex) */
    type_doc: string;
    /** Format du fichier (comme pdf par ex) */
    format: string;
    /** Chemin relatif vers le fichier */
    chemin_stockage: string;
    /** Indique si le document a été rempli en ligne */
    est_rempli_en_ligne: boolean;
    /** Date de dépôt du document */
    date_depot: Date;
    /** Référence vers le stage associé */
    id_stage: number;
    /** Référence vers le collaborateur ayant déposé le document */
    id_collaborateur: number;
};

/**
 * fonction permettant de convertir la date en format "/"
 * @param date ; la date à modifier
 */
const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
};

/**
 * Composant qui affiche les détails d'un stage
 * en utilisant des fetchs pour accéder aux données de l'API
 */
const StagesDetails = () => {

    const navigate = useNavigate();
    const [stage, setStage] = useState<StageType | null>(null);
    const [tuteur, setTuteur] = useState<TuteurType | null>(null);
    const [stagiaire, setStagiaire] = useState<StagiaireType | null>(null);
    const [remuneration, setRemuneration] = useState<RemunerationType | null>(null);
    const [documents, setDocuments] = useState<DocumentType[]>([]);
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
    const [popupOpen, setPopupOpen] = useState(false);

    const { id } = useParams();

    /**
     * Ouvre la popup modale et charge le PDF correspondant au chemin fourni.
     *
     * @param chemin ; Chemin relatif du fichier PDF à afficher
     */
    const openPdf = (chemin: string) => {
        setSelectedPdf(chemin);
        setPopupOpen(true);
    };

    /**
     * Ferme la popup modale et réinitialise le PDF sélectionné.
     */
    const closePdf = () => {
        setPopupOpen(false);
        setSelectedPdf(null);
    };

    /**
     * S'effectue à chaque chargement de la page ou changement d'id dans l'url
     */
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

                if (contentStage.stage && contentStage.stage.id_stagiaire) {
                    const reponseApiStagiaire = await fetch(`http://127.0.0.1:3000/api/stagiaire/${contentStage.stage.id_stagiaire}`, {
                        method: "GET",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    const contentStagiaire = await reponseApiStagiaire.json();
                    setStagiaire(contentStagiaire.stagiaire);
                }

                if (contentStage.stage && contentStage.stage.id_remuneration) {
                    const reponseApiRemuneration = await fetch(`http://127.0.0.1:3000/api/remuneration/${contentStage.stage.id_remuneration}`, {
                        method: "GET",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    const contentRemuneration = await reponseApiRemuneration.json();
                    setRemuneration(contentRemuneration.remuneration);
                }

                if (contentStage.stage) {
                    try {
                        const reponseApiDocument = await fetch(`http://127.0.0.1:3000/api/document/stage/${contentStage.stage.id}`, {
                            method: "GET",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        });
                        const contentDocument = await reponseApiDocument.json();
                        setDocuments(contentDocument.document);
                    } catch (error) {
                        console.log(error);
                    }
                }

            } catch (err) {
                console.error("Erreur fetching:", err);
            }
        }
        fetching();
    }, [id]);

    return (
        <>
            {popupOpen && selectedPdf && (
                <div className={styles.overlay} onClick={closePdf}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <button onClick={closePdf} className={styles.closeBtn}>✕ Fermer</button>
                        </div>
                        <iframe
                            key={selectedPdf}
                            src={selectedPdf}
                            title="Visualiser le PDF"
                            className={styles.pdfFrame}
                        />
                    </div>
                </div>
            )}

            <button className={styles.retour} onClick={() => navigate(-1)}>← Retour</button>

            {stage && (
                <div className={styles.container}>
                    <div className={styles.card}>

                        <div className={styles.titre}>{stage.intitule}</div>
                        <div className={styles.statut}>{stage.statut}</div>

                        <hr className={styles.separateur} />

                        <div className={styles.champ}>
                            <span className={styles.label}>Date de début</span>
                            <span className={styles.valeur}>{formatDate(stage.date_debut)}</span>
                        </div>
                        <div className={styles.champ}>
                            <span className={styles.label}>Date de fin</span>
                            <span className={styles.valeur}>{formatDate(stage.date_fin)}</span>
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

                        <div className={styles.documentSection}>
                            <p className={styles.label}>Documents disponibles :</p>
                            {documents.map((doc) => (
                                <div key={doc.id} className={styles.documentItem}>
                                    <button
                                        onClick={() => openPdf(doc.chemin_stockage)}
                                        className={styles.pdfSelectButton}
                                    >
                                        Voir : {doc.nom_doc || doc.chemin_stockage.split('/').pop()}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <hr className={styles.separateur} />

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

                        <hr className={styles.separateur} />

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

                        <hr className={styles.separateur} />

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

export default StagesDetails;