import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./create.module.css";

function CreateStage() {
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

  const [errors, setErrors] = useState({ err: "" });
  const [success, setSuccess] = useState({ succes: "" });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (
      form.intitule === "" ||
      form.description_missions === "" ||
      form.developpement_competences === "" ||
      form.date_debut === "" ||
      form.date_fin === "" ||
      form.service_accueil === "" ||
      form.id_stagiaire === "" ||
      form.id_tuteur === "" ||
      form.id_remuneration === ""
    ) {
      setErrors({ err: "Toutes les cases doivent être remplies" });
      return;
    }

    if (form.date_fin <= form.date_debut) {
      setErrors({
        err: "La date de fin doit être supérieure à la date de début",
      });
      return;
    }

    const response = await fetch("http://127.0.0.1:3000/api/stage/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(form),
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
        <h2 className={styles.title}>Ajouter un stage</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Intitulé</label>
          <input
            className={styles.input}
            type="text"
            name="intitule"
            placeholder="Intitulé du stage"
            value={form.intitule}
            onChange={handleChange}
          />
          <label className={styles.label}>Description des missions</label>
          <input
            className={styles.input}
            type="text"
            name="description_missions"
            placeholder="Description des missions"
            value={form.description_missions}
            onChange={handleChange}
          />
          <label className={styles.label}>Développement des compétences</label>
          <input
            className={styles.input}
            type="text"
            name="developpement_competences"
            placeholder="Développement des compétences"
            value={form.developpement_competences}
            onChange={handleChange}
          />
          <label className={styles.label}>Date de début</label>
          <input
            className={styles.input}
            type="date"
            name="date_debut"
            value={form.date_debut}
            onChange={handleChange}
          />
          <label className={styles.label}>Date de fin</label>
          <input
            className={styles.input}
            type="date"
            name="date_fin"
            value={form.date_fin}
            onChange={handleChange}
          />
          <label className={styles.label}>Service d'accueil</label>
          <input
            className={styles.input}
            type="text"
            name="service_accueil"
            placeholder="Service d'accueil"
            value={form.service_accueil}
            onChange={handleChange}
          />
          <label className={styles.label}>ID du stagiaire</label>
          <input
            className={styles.input}
            type="number"
            name="id_stagiaire"
            placeholder="ID du stagiaire"
            value={form.id_stagiaire}
            onChange={handleChange}
          />
          <label className={styles.label}>ID du tuteur</label>
          <input
            className={styles.input}
            type="number"
            name="id_tuteur"
            placeholder="ID du tuteur"
            value={form.id_tuteur}
            onChange={handleChange}
          />
          <label className={styles.label}>ID de la rémunération</label>
          <input
            className={styles.input}
            type="number"
            name="id_remuneration"
            placeholder="ID de la rémunération"
            value={form.id_remuneration}
            onChange={handleChange}
          />
          <button className={styles.button} type="submit">
            Ajouter
          </button>
          {errors.err && <p className={styles.error}>{errors.err}</p>}
          {success.succes && <p className={styles.success}>{success.succes}</p>}
        </form>
      </div>
    </div>
  );
}
export default CreateStage;
