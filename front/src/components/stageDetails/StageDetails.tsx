import { useParams } from "react-router";
import {useEffect, useState} from "react";

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

    //<Route path="http://localhost:5173/stage/:postId" element=<Post/> />;
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
            <h2>Bienvenue sur la page des détails du stage </h2>

            {stage && (

                <div>
                    <div>date de début de stage : {stage.date_debut}</div>
                    <div>date de fin de stage : {stage.date_fin}</div>
                    <div>service d'accueil : {stage.service_accueil}</div>
                    <div>statut : {stage.statut}</div>
                    <div>id du stagiaire : {stage.id_stagiaire}</div>
                    <div>id du tuteur : {stage.id_tuteur}</div>
                    <div>id de rémunération : {stage.id_remuneration}</div>
                    <p>================</p>
                </div>
            )
            }





        </>
    );
};
export default StagesProvisoires;
