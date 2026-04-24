import { useNavigate } from "react-router";

const Stagiaires = () => {
  const navigate = useNavigate();
  function handleCreate() {
    navigate("../crud/create/stagiaires");
  }
  return (
    <>
      <h2>Bienvenue sur la page stagiaires </h2>
      <button onClick={handleCreate}>Crée un stagiaire</button>
    </>
  );
};
export default Stagiaires;
