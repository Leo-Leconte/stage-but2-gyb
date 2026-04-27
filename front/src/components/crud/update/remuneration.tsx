import { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import styles from "./update.module.css";

function UpdateRemuneration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    est_remunere: "",
    montant_remunere: "",
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

    if (form.est_remunere === "false" && form.montant_remunere !== "0") {
      setErrors({
        err: "Le stagiaire n'est pas remunere",
      });
      return;
    }

    if (form.est_remunere === "true" && form.montant_remunere === "0") {
      setErrors({
        err: "Le stagiaire est rémunéré, veuillez remplir le montant de la rémunération",
      });
    }

    // permet d'envoyer seulement les donnes qui sont remplies et éviter d'envoyer des champs vides et donc de garder les anciennes informations
    const dataToSend = Object.fromEntries(
      // transforme les donnes en objet
      Object.entries(form).filter(([_, value]) => value !== ""), // fait entre les donnes, puis on filtre et on donne au back les donnes qui sont remplies
    );
    const response = await fetch(
      `http://127.0.0.1:3000/api/remuneration/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(dataToSend),
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
        <h2 className={styles.title}>Modifier la rémunération</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Est rémunéré :
            <input
              type="radio"
              name="est_remunere"
              value="true"
              checked={form.est_remunere === "true"}
              onChange={handleChange}
              className={styles.input}
            />{" "}
            Oui
            <input
              type="radio"
              name="est_remunere"
              value="false"
              checked={form.est_remunere === "false"}
              onChange={handleChange}
              className={styles.input}
            />{" "}
            Non
          </label>
          <label className={styles.label}>
            Montant de la rémunération :
            <input
              type="number"
              name="montant_remunere"
              placeholder="Montant de la rémunération"
              value={form.montant_remunere}
              className={styles.input}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className={styles.button}>
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
export default UpdateRemuneration;
