import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./create.module.css";

function CreateNewStagiaires() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
  });

  const [errors, setErrors] = useState({ err: "" });

  const [success, setSuccess] = useState({ succes: "" });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  async function handleSubmit(e: any) {
    const telRegex = /^[0-9]{10}$/; // permet de verifie si le numero de telephone est de 10 chiffres est surtout contient que des chiffres
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // permet de verifier si l'email est valide'
    e.preventDefault();
    if (
      form.nom === "" ||
      form.prenom === "" ||
      form.email === "" ||
      form.telephone === ""
    ) {
      setErrors({
        err: "Toutes les cases doive être remplis pour être enregistre",
      });
      return;
    }
    if (telRegex.test(form.telephone) === false) {
      setErrors({
        err: "Numero de telphone invalide",
      });
      return;
    }
    if (emailRegex.test(form.email) === false) {
      setErrors({
        err: "Email invalide",
      });
      return;
    }

    const response = await fetch("http://127.0.0.1:3000/api/stagiaire/create", {
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
        <h2 className={styles.title}>Créer un stagiaire</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Nom</label>
          <input
            className={styles.input}
            type="text"
            name="nom"
            placeholder="Nom"
            value={form.nom}
            onChange={handleChange}
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
          {errors.err && <p className={styles.error}>{errors.err}</p>}
          {success.succes && <p className={styles.success}>{success.succes}</p>}
        </form>
      </div>
    </div>
  );
}
export default CreateNewStagiaires;
