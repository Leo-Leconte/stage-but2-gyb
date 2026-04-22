import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from '../../service/auth/login.service';

@Controller('api/auth')
export class LoginController {

  constructor(private readonly loginService: LoginService) {}

  /**
   * Connexion d'un collaborateur.'
   *
   * @name Post
   * @path {POST} /api/auth/login
   *
   * Valide les identifiants du collaborateur et renvoie un token d'authentification si les identifiants sont valides
   *
   * @param body Corps de la requete contenant les identifiants.
   * @param body.email Adresse email du collaborateur.
   * @param body.mot_de_passe Mot de passe saisi par le collaborateur.
   */

  @Post('login')
  async login(@Body() body: { email: string; mot_de_passe: string }) {
    try {
      return await this.loginService.login(body.email, body.mot_de_passe);
    } catch (error) {
      console.error('Erreur login:', error);
      throw error;
    }
  }

}
