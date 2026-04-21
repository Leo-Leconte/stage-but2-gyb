import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import TestRedirect from "../components/accueil/Accueil.tsx";

describe('Redirect',() => {
    it("Le bouton se déconnecter du formulaire s'affche", () => {
        render(<MemoryRouter><TestRedirect/></MemoryRouter>)
        screen.getByRole('button', {name: 'Se déconnecter'})
    })
})