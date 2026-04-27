import { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import styles from "./update.module.css";

function UpdateStagiaires() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
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

    const telRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Les champs peuvent être vides, mais s'ils sont remplis alors, on vérifie les conditions suivantes
    if (form.email && emailRegex.test(form.email) === false) {
      setErrors({
        err: "Email invalide",
      });
      return;
    }

    if (form.telephone && telRegex.test(form.telephone) === false) {
      setErrors({
        err: "Numero de telphone invalide",
      });
      return;
    }

    // permet d'envoyer seulement les donnes qui sont remplies et éviter d'envoyer des champs vides et donc de garder les anciennes informations
    const dataToSend = Object.fromEntries(
      Object.entries(form).filter(([_, value]) => value !== ""),
    );

    const response = await fetch(`http://127.0.0.1:3000/api/stagiaire/${id}`, {
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
        <h2 className={styles.title}>Modifie un stagiaire</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Nom</label>
          <input
            className={styles.input}
            type="text"
            name="nom"
            placeholder="Nom"
            value={form.nom}
            onChange={handleChange as any}
          />
          <label className={styles.label}>Prénom</label>
          <input
            className={styles.input}
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={form.prenom}
            onChange={handleChange}
          />
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <label className={styles.label}>Téléphone</label>
          <input
            className={styles.input}
            type="text"
            name="telephone"
            placeholder="Téléphone"
            value={form.telephone}
            onChange={handleChange}
          />
          <button className={styles.button} type="submit">
            Enregistrer
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
export default UpdateStagiaires;
