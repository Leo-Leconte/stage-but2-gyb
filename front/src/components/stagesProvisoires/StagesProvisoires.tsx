import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./StagesProvisoires.module.css";

const StagesProvisoires = () => {
  const [stages, setStages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // dans un useEffect pour que ça fasse le fetch à chaque fois que le page se charge
    async function fetching() {
      const token = localStorage.getItem("access_token"); // Faut récup et envoyer le token vu que la policy a été mise en place mtn :(
      let reponseApi = await fetch("http://127.0.0.1:3000/api/stage", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const content = await reponseApi.json();
      setStages(content);
      console.log(content);
    }
    fetching();
  }, []);

  return (
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
              <button
                className={styles.voir}
                onClick={() => navigate(`/stage/${stage.id}`)}
              >
                Voir en détails
              </button>
              <button
                className={styles.modifier}
                onClick={() => navigate(`/crud/update/stage/${stage.id}`)}
              >
                Modifier
              </button>
              <button className={styles.supprimer}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default StagesProvisoires;
