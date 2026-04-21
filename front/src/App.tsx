import './App.css'
import Login from './components/login/Login.tsx'
import Redirect from './components/testRedirect/TestRedirect.tsx'

import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Login/>} />
              <Route path={"/redirected"} element={<Redirect/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App
