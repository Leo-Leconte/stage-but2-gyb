import { useNavigate } from "react-router";

const Stagiaires = () => {
  const navigate = useNavigate();
  function handleCreate() {
    navigate("../crud/create/stagiaires");
  }
  function handleCreate2() {
    navigate("../crud/create/stage");
  }
  function handleCreate3() {
    navigate("../crud/create/remuneration");
  }
  return (
    <>
      <h2>Bienvenue sur la page stagiaires </h2>
      <button onClick={handleCreate}>Crée un stagiaire</button>
      <button onClick={handleCreate2}>Crée un stage</button>
      <button onClick={handleCreate3}>Crée une rémunération</button>
    </>
  );
};
export default Stagiaires;
