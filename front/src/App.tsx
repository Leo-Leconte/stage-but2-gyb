import './App.css'
import Login from './components/login/Login.tsx'
import Home from './components/home/Home.tsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import Stagiaires from "./components/stagiaires/Stagiaires.tsx";
import Calendrier from "./components/calendrier/Calendrier.tsx";
import StagesProvisoires from "./components/stagesProvisoires/StagesProvisoires.tsx"


function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Login/>} />
              <Route element={<Layout/>}>
                  <Route path="/home" element={<Home/>} />
                  <Route path="/stagiaires" element={<Stagiaires/>} />
                  <Route path="/calendrier" element={<Calendrier/>} />
                  <Route path="stagesProvisoires" element={<StagesProvisoires/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App
