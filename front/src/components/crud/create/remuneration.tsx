import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./create.module.css";

function CreateRemuneration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    est_remunere: "",
    montant_remunere: "",
  });

  const [errors, setErrors] = useState({ err: "" });
  const [success, setSuccess] = useState({ succes: "" });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    // un stagiaire n'est pas forcément remunere alors, on vérifie le montant de la remuneration soit 0, mais s'il y a un montant > 0 alors qu'on la mit à false mettre message d'erreur
    if (form.est_remunere === "false" && form.montant_remunere !== "0") {
      setErrors({
        err: "Le stagiaire n'est pas remunere",
      });
      return;
    }

    // s'il met vrai, mais n'a pas rempli le montant de la remuneration alors, on affiche un message d'erreur et on ne peut pas enregistrer
    if (form.est_remunere === "true" && form.montant_remunere === "0") {
      setErrors({
        err: "Le stagiaire est rémunéré, veuillez remplir le montant de la rémunération",
      });
      return;
    }

    // s'il met vrai et n'a pas rempli le montant alors, on affiche un message d'erreur
    if (form.est_remunere == "true" && form.montant_remunere === "") {
      setErrors({
        err: "Il faut remplir le montant de la rémuneration",
      });
      return;
    }

    const response = await fetch(
      "http://localhost:3000/api/remuneration/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(form),
      },
    );
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
        <h2 className={styles.title}>Créer une rémunération</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Est rémunéré :
            <input
              type="radio"
              name="est_remunere"
              value="true"
              checked={form.est_remunere === "true"}
              onChange={handleChange}
            />{" "}
            Oui
            <input
              type="radio"
              name="est_remunere"
              value="false"
              checked={form.est_remunere === "false"}
              onChange={handleChange}
            />{" "}
            Non
          </label>
          <label className={styles.label}>
            Montant de la rémunération :
            <input
              className={styles.input}
              type="number"
              name="montant_remunere"
              placeholder={"Montant de la rémunération"}
              value={form.montant_remunere}
              onChange={handleChange}
            />
          </label>
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
export default CreateRemuneration;
