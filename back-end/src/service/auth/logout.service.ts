import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LogoutService {
  async logout(authHeader: string) {
    if (!authHeader) {
      throw new BadRequestException('Un token est requis');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Pas le bon type pour le token');
    }

    const token = authHeader.slice(7);

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error(
        'JWT_SECRET est manquant dans les variables d environnement',
      );
    }

    jwt.verify(token, secret);
    return {
      success: true,
      message: 'Deconnexion reussie',
    };
  }
}
