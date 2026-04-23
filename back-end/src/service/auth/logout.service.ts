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

  async logout(authHeader: string) {
    if (!authHeader) {
      throw new BadRequestException('Un token est requis');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Pas le bon type pour le token');
    }

    const token = authHeader.slice(7); // car bearer commence a 7

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error(
        'JWT_SECRET est manquant dans les variables d environnement',
      );
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
      throw new UnauthorizedException('Token invalide'); // si le token est invalide
    }
  }
}
