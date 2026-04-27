import "./App.css";
import Login from "./components/login/Login.tsx";
import Home from "./components/home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import Stagiaires from "./components/stagiaires/Stagiaires.tsx";
import Calendrier from "./components/calendrier/Calendrier.tsx";
import StagesProvisoires from "./components/stagesProvisoires/StagesProvisoires.tsx";
import StageDetails from "./components/stageDetails/StageDetails.tsx";
import CreateNewStagiaires from "./components/crud/create/stagiaires.tsx";
import CreateNewStage from "./components/crud/create/stage.tsx";
import CreateRemuneration from "./components/crud/create/remuneration.tsx";
import UpdateStagiaires from "./components/crud/update/stagiaires.tsx";
import UpdateStage from "./components/crud/update/stage.tsx";
import UpdateRemuneration from "./components/crud/update/remuneration.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route
          path={"/crud/create/stagiaires"}
          element={<CreateNewStagiaires />}
        />
        <Route path={"/crud/create/stage"} element={<CreateNewStage />} />
        <Route
          path={"/crud/create/remuneration"}
          element={<CreateRemuneration />}
        />
        <Route
          path={"/crud/update/stagiaires/:id"}
          element={<UpdateStagiaires />}
        />
        <Route path={"/crud/update/stage/:id"} element={<UpdateStage />} />
        <Route
          path={"/crud/update/remuneration/:id"}
          element={<UpdateRemuneration />}
        />
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
