import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./create.module.css";

function CreateStage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    // stage
    intitule: "",
    description_missions: "",
    developpement_competences: "",
    date_debut: "",
    date_fin: "",
    service_accueil: "",
    id_tuteur: "",
    //stagiaire
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    // remuneration
    est_remunere: "",
    montant_remunere: "",
  });
  const { id } = useParams();

  const [errors, setErrors] = useState({ err: "" });
  const [success, setSuccess] = useState({ succes: "" });
  const [tuteurs, setTuteurs] = useState<any[]>([]);

  useEffect(() => {
    const fetchTuteur = async () => {
      const response = await fetch("http://127.0.0.1:3000/api/tuteur/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      setTuteurs(data);
    };
    fetchTuteur();
  }, [id]);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: any) {
    const telRegex = /^[0-9]{10}$/; // permet de verifie si le numero de telephone est de 10 chiffres est surtout contient que des chiffres
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // permet de verifier si l'email est valide'
    e.preventDefault();
    // champ vide interdit
    if (
      // stagiaire
      form.nom === "" ||
      form.prenom === "" ||
      form.email === "" ||
      form.telephone === "" ||
      // stage
      form.id_tuteur === "" ||
      form.intitule === "" ||
      form.description_missions === "" ||
      form.developpement_competences === "" ||
      form.date_debut === "" ||
      form.date_fin === "" ||
      form.service_accueil === "" ||
      // remuneration
      form.est_remunere === "" ||
      form.montant_remunere === ""
    ) {
      setErrors({ err: "Tous les champs doivent être remplis" });
      return;
    }

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

    if (form.date_debut === "" && form.date_fin !== "") {
      setErrors({
        err: "La date de début doit être remplie si la date de fin est remplie ",
      });
      return;
    }

    if (form.date_fin === "" && form.date_debut !== "") {
      setErrors({
        err: "La date de fin doit etre remplie si la date de debut est remplie",
      });
      return;
    }

    if (
      form.date_debut !== "" &&
      form.date_fin !== "" &&
      form.date_fin <= form.date_debut
    ) {
      setErrors({
        err: "La date de fin ne peut pas etre inferieure a la date de debut",
      });
      return;
    }

    // on sépare les donnes pour les envoyer en différentes requêtes afin de pas avoir de problème
    const stageData: any = {};
    const stagiaireData: any = {};
    const remunerationData: any = {};

    // Stage, on récupère les donnes du stage et on les met sans stageData, si le champ est vide on le met pas pour pas écraser les donnes deja existante
    if (form.intitule) stageData.intitule = form.intitule;
    if (form.description_missions)
      stageData.description_missions = form.description_missions;
    if (form.developpement_competences)
      stageData.developpement_competences = form.developpement_competences;
    if (form.date_debut) stageData.date_debut = form.date_debut;
    if (form.date_fin) stageData.date_fin = form.date_fin;
    if (form.service_accueil) stageData.service_accueil = form.service_accueil;
    if (form.id_tuteur) stageData.id_tuteur = parseInt(form.id_tuteur);

    // stagiaire, on récupère les donnes du stagiaire et on les met dans stagiaireData, si le champ est vide, on ne le met pas pour pas écraser les donnes deja existante
    if (form.nom) stagiaireData.nom = form.nom;
    if (form.prenom) stagiaireData.prenom = form.prenom;
    if (form.email) stagiaireData.email = form.email;
    if (form.telephone) stagiaireData.telephone = form.telephone;

    // remuneration, on récupère les donnes de la remuneration et on les met dans remunerationData, si le champ est vide, on ne le met pas pour pas écraser les donnes deja existante
    if (form.est_remunere)
      remunerationData.est_remunere = form.est_remunere === "true";
    if (form.montant_remunere)
      remunerationData.montant_remunere = parseFloat(form.montant_remunere);

    // On crée une constante header pour éviter la redondance
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    if (Object.keys(stageData).length > 0) {
      const response = await fetch(`http://127.0.0.1:3000/api/stage/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(stageData),
      });
      const reussit = await response.json();
      if (response.ok) {
        setSuccess({ succes: reussit.message });
        setTimeout(() => navigate("/stagesProvisoires"), 1500);
      } else {
        setErrors({ err: reussit.message });
      }
    }
    if (Object.keys(stagiaireData).length > 0) {
      const response = await fetch(
        `http://127.0.0.1:3000/api/stagiaire/create`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(stagiaireData),
        },
      );
      const reussit = await response.json();
      if (response.ok) {
        setSuccess({ succes: reussit.message });
        setTimeout(() => navigate("/stagesProvisoires"), 1500);
      } else {
        setErrors({ err: reussit.message });
      }
    }
    if (Object.keys(remunerationData).length > 0) {
      const response = await fetch(
        `http://127.0.0.1:3000/api/remuneration/create`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(remunerationData),
        },
      );
      const reussit = await response.json();
      if (response.ok) {
        setSuccess({ succes: reussit.message });
        setTimeout(() => navigate("/stagesProvisoires"), 1500);
      } else {
        setErrors({ err: reussit.message });
      }
    }
  }

  return (
    <div className={styles.globalStyle}>
      <div className={styles.bg}>
        <button className={styles.retour} onClick={() => navigate(-1)}>
          ← Retour
        </button>
        <h2 className={styles.titre}>Cree un stage</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.soustitle}>Informations du stage</h3>
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
          <label className={styles.label}>Service d'accueille</label>
          <input
            type="text"
            name="service_accueil"
            placeholder="Service d'accueil"
            value={form.service_accueil}
            className={styles.input}
            onChange={handleChange}
          />
          <label className={styles.label}>Tuteur</label>
          <select
            name="id_tuteur"
            onChange={handleChange}
            className={styles.select}
          >
            <option value="" className={styles.select}>
              -- Choisir un tuteur --
            </option>
            {tuteurs.map((tuteur) => (
              <option key={tuteur.id_tuteur} value={tuteur.id_tuteur}>
                {tuteur.nom} {tuteur.prenom}
              </option>
            ))}
          </select>
          <h3 className={styles.soustitle}>Informations du stagiaire</h3>

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
          <h3 className={styles.soustitle}>Informations de la remuneration</h3>

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
export default CreateStage;
