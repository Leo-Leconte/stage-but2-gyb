import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from '../../service/auth/login.service';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

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
  @ApiOperation({ summary: "Connexion d'un collaborateur" })
  @ApiBody({
    schema: {
      type: 'object',
      description: 'Corps de la requete contenant les identifiants.',
      properties: {
        email: { type: 'string', example: 'nom@gyb.fr' },
        mot_de_passe: { type: 'string', example: '1' },
      },
    },
  })
  @Post('login')
  @ApiOperation({ summary: "Connexion d'un collaborateur" })
  @ApiResponse({
    status: 201,
    description: "Connexion réussie, token d'authentification renvoyé.",
  })
  @ApiResponse({ status: 401, description: 'Identifiants invalides.' })
  async login(@Body() body: { email: string; mot_de_passe: string }) {
    try {
      return await this.loginService.login(body.email, body.mot_de_passe);
    } catch (error) {
      console.error('Erreur login:', error);
      throw error;
    }
  }
}
