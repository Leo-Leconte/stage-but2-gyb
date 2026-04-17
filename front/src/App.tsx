import './App.css'
import Login from '../src/components/login/login.tsx'
import Redirect from '../src/components/testRedirect/testRedirect.tsx'

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
