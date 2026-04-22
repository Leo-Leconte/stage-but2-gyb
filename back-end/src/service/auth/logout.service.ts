import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LogoutService {
  private blacklistedTokens: Set<string> = new Set(); // stocke le token pour la blacklist

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
    if (this.blacklistedTokens.has(token)) {
      throw new UnauthorizedException('Utilisateur déjà déconnecté');
    }

    try {
      jwt.verify(token, secret);

      // Ajoute le token à la blacklist
      this.blacklistedTokens.add(token);

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
