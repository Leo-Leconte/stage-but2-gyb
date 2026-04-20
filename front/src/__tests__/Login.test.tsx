import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from '../components/login/login.tsx'
import userEvent from '@testing-library/user-event'



describe('Login', () => {
    it("Le champ email du formulaire s'affiche", () => {
            render(<MemoryRouter><Login/></MemoryRouter>)
            screen.getByLabelText("Email d'utilisateur")
        })
    it("Le champ mot de passe du formulaire s'affiche", () => {
        render(<MemoryRouter><Login/></MemoryRouter>)
        screen.getByLabelText('Mot de passe')
    })
    it("Le bouton se connecter du formulaire s'affiche", () => {
        render(<MemoryRouter><Login/></MemoryRouter>)
        screen.getByRole('button', { name: 'Se connecter' })
    })
    it('Le champ email est mis à jour en temps réel', async () => {
        render(<MemoryRouter><Login/></MemoryRouter>)
        const user = userEvent.setup()
        const champ = screen.getByLabelText("Email d'utilisateur");
        await user.type(champ, 'ce que je tape');
        expect(champ).toHaveValue('ce que je tape');

    })
    it('Le champ password est mis à jour en temps réel', async () => {
            render(<MemoryRouter><Login/></MemoryRouter>)
            const user = userEvent.setup()
            const champ = screen.getByLabelText("Mot de passe");
            await user.type(champ, 'ce que je tape');
            expect(champ).toHaveValue('ce que je tape');
        })
 })

