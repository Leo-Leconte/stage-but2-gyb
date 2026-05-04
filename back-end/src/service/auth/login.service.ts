import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthRepository } from '../../repository/auth/AuthRepository';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
  constructor(private readonly authRepository: AuthRepository) {}

  /**
   * Permet de se connecter en vérifiant que les champs sont bien remplis,
   * l'utilisateur existe,
   * le mot de passe est correct et en créant un token jwt pour l'utilisateur afin d'avoir une securite maximale
   * @param email
   * @param mot_de_passe
   */
  async login(email: string, mot_de_passe: string) {
    // on vérifie que les champs sont bien remplis
    if (!email || !mot_de_passe) {
      throw new BadRequestException(
        'Un mot de passe et un email sont requis pour pouvoir vous connecter',
      );
    }

    // on vérifie que l'utilisateur existe
    const collaborateur = await this.authRepository.findByEmail(email);

    // si le collaborateur n'existe pas ou que son email est incorrect alors, on renvoie un message d'erreur
    if (!collaborateur) {
      throw new UnauthorizedException('Email ou Mot de passe incorrect');
    }

    // on vérifie que le mot de passe est correct
    const ok = await bcrypt.compare(mot_de_passe, collaborateur.mot_de_passe);

    // si le mot de passe est incorrect alors, on renvoie un message d'erreur
    if (!ok) {
      throw new UnauthorizedException('Email ou Mot de passe incorrect ');
    }

    // on vérifie que le jwt est bien défini dans les variables d'environnement'
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('Variables d environnement manquantes');
    }

    // on cree le token
    const token = jwt.sign(
      {
        id_collaborateur: collaborateur.id_collaborateur,
        email: collaborateur.email,
        role: 'collaborateur',
      },
      secret,
      // 3H
      { expiresIn: 10800 },
    );

    // on retourne le token
    return {
      access_token: token,
    };
  }
}
