import "./App.css";
import Login from "./components/login/Login.tsx";
import Home from "./components/home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import Stagiaires from "./components/stagiaires/Stagiaires.tsx";
import Calendrier from "./components/calendrier/Calendrier.tsx";
import StagesProvisoires from "./components/stagesProvisoires/StagesProvisoires.tsx";
import StageDetails from "./components/crud/read/StageDetails.tsx";
import CreateStage from "./components/crud/create/stage.tsx";
import UpdateStage from "./components/crud/update/stage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />

        <Route path={"/crud/create/stage"} element={<CreateStage />} />

        <Route path={"/crud/update/stage/:id"} element={<UpdateStage />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/stagiaires" element={<Stagiaires />} />
          <Route path="/calendrier" element={<Calendrier />} />
          <Route path="/stagesProvisoires" element={<StagesProvisoires />} />
          <Route path="/stage/:id" element={<StageDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
