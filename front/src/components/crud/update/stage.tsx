import { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import styles from "./update.module.css";

function UpdateStage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    intitule: "",
    description_missions: "",
    developpement_competences: "",
    date_debut: "",
    date_fin: "",
    service_accueil: "",
    id_stagiaire: "",
    id_tuteur: "",
    id_remuneration: "",
  });

  const { id } = useParams();
  const [errors, setErrors] = useState({ err: "" });
  const [success, setSuccess] = useState({ succes: "" });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (form.date_debut === "" && form.date_fin !== "") {
      setErrors({
        err: "La date de début doit être remplie si la date de fin est remplie",
      });
      return;
    }
    if (form.date_fin === "" && form.date_debut !== "") {
      setErrors({
        err: "La date de fin doit etre remplie si la date de debut est remplie",
      });
      return;
    }
    // permet d'envoyer seulement les donnes qui sont remplies et éviter d'envoyer des champs vides et donc de garder les anciennes informations
    const dataToSend = Object.fromEntries(
      // transforme les donnes en objet
      Object.entries(form).filter(([_, value]) => value !== ""), // fait entre les donnes, puis on filtre et on donne au back les donnes qui sont remplies
    );
    const response = await fetch(`http://127.0.0.1:3000/api/stage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(dataToSend),
    });
    const reussit = await response.json();
    if (response.ok) {
      setSuccess({ succes: reussit.message });
      setTimeout(() => navigate("/stagiaires"), 1500);
    } else {
      setErrors({ err: reussit.message });
    }
  }

  return (
    <div className={styles.globalStyle}>
      <div className={styles.bg}>
        <h2 className={styles.titre}>Modifier un stage</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Intitule</label>
          <input
            type="text"
            name="intitule"
            placeholder="Intitulé du stage"
            value={form.intitule}
            className={styles.input}
            onChange={handleChange}
          />
          <label className={styles.label}>Description des missions</label>

          <input
            type="text"
            name="description_missions"
            placeholder="Description des missions"
            value={form.description_missions}
            className={styles.input}
            onChange={handleChange}
          />
          <label className={styles.label}>Développement des compétences</label>

          <input
            type="text"
            name="developpement_competences"
            placeholder="Développement des compétences"
            value={form.developpement_competences}
            className={styles.input}
            onChange={handleChange}
          />
          <label className={styles.label}>Date de debut</label>

          <input
            type="date"
            name="date_debut"
            placeholder="Date de début"
            value={form.date_debut}
            className={styles.input}
            onChange={handleChange}
          />
          <label className={styles.label}>Date de fin</label>

          <input
            type="date"
            name="date_fin"
            placeholder="Date de fin"
            value={form.date_fin}
            className={styles.input}
            onChange={handleChange}
          />
          <label className={styles.label}>Service d'accueill</label>

          <input
            type="text"
            name="service_accueil"
            placeholder="Service d'accueil"
            value={form.service_accueil}
            className={styles.input}
            onChange={handleChange}
          />
          <label className={styles.label}>Le stagiaire</label>

          <input
            type="number"
            name="id_stagiaire"
            placeholder="ID du stagiaire"
            value={form.id_stagiaire}
            className={styles.input}
            onChange={handleChange}
          />
          <label className={styles.label}>Le tuteur</label>
          <input
            type="number"
            name="id_tuteur"
            placeholder="ID du tuteur"
            value={form.id_tuteur}
            className={styles.input}
            onChange={handleChange}
          />
          <label className={styles.label}>La rémunération</label>
          <input
            type="number"
            name="id_remuneration"
            placeholder="ID de la rémunération"
            value={form.id_remuneration}
            className={styles.input}
            onChange={handleChange}
          />
          <button className={styles.button} type="submit">
            Modifier
          </button>
        </form>
        {errors.err && <div className={styles.error}>{errors.err}</div>}
        {success.succes && (
          <div className={styles.success}>{success.succes}</div>
        )}
      </div>
    </div>
  );
}
export default UpdateStage;
