import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { BlacklistService } from './blacklist.service';

@Injectable()
export class LogoutService {
  constructor(private readonly blacklistService: BlacklistService) {}

  /**
   * Permet de se deconnecter cote back-end
   *
   * @param authHeader
   */
  async logout(authHeader: string) {
    // Vérifie si le token est fourni
    if (!authHeader) {
      throw new BadRequestException('Un token est requis');
    }

    // Vérifie que le token a bien le bon type
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Pas le bon type pour le token');
    }

    // On le commence à slice(7) car le token commence par "Bearer "
    const token = authHeader.slice(7);

    // Constante pour le secret du JWT, qui doit être défini dans les variables d'environnement
    const secret = process.env.JWT_SECRET;

    // On vérifie que les variables d environnements son bien remplit sinon ont envoi un message d'erreur
    if (!secret) {
      throw new Error('Variables d environnement manquantes');
    }

    // Vérifie si le token est déjà blacklisté
    if (this.blacklistService.has(token)) {
      throw new UnauthorizedException('Utilisateur déjà déconnecté');
    }

    try {
      jwt.verify(token, secret);

      // Ajoute le token à la blacklist
      this.blacklistService.add(token);

      return {
        success: true,
        message: 'Déconnexion réussie',
      };
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // si le token est expiré
        throw new UnauthorizedException('Token déjà expiré');
      }
      // si le token est invalide
      throw new UnauthorizedException('Token invalide');
    }
  }
}
