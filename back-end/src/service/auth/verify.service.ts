import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '../../repository/auth/AuthRepository';
import { BlacklistService } from './blacklist.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class VerifyService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly blacklistService: BlacklistService,
  ) {}

  /**
   * Permet de verifier le token JWT de l'utilisateur
   * @param authHeader
   */
  async verify(authHeader: string) {
    // Constante pour la variable d'environnement JWT_SECRET
    const secret = process.env.JWT_SECRET;

    // On vérifie que la variable d environnement est bien définie
    if (!secret) {
      throw new Error('Variables d environnement manquantes');
    }

    // verification du token s'il est fourni
    if (!authHeader) {
      throw new BadRequestException(
        'Un token est requis pour pouvoir vous connecter',
      );
    }

    // vérifie le type du token
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Pas le bon type pour le token');
    }

    // On met slice(7) car le token commence par "Bearer "
    const token = authHeader.slice(7);

    // si le token est black list alors c'est qu'il est deja déconnecté
    if (this.blacklistService.has(token)) {
      throw new UnauthorizedException(
        'Vous avez ete deconnecte, veuillez vous reconnecter',
      );
    }
    // verification du token
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      // si le token est expiré
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expiré, reconnectez-vous');
      }
      // si le token est invalide
      throw new UnauthorizedException('Token invalide');
    }
  }
}
