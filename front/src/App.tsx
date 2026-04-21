import './App.css'
import Login from './components/login/Login.tsx'
import Accueil from './components/accueil/Accueil.tsx'

import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Login/>} />
              <Route path={"/accueil"} element={<Accueil/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App
