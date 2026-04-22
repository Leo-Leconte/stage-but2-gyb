import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../../repository/auth/AuthRepository';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class VerifyService {
    constructor(private readonly authRepository: AuthRepository) {}

    async verify(authHeader: string) {

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET est manquant dans les variables d environnement');
        }
        // verification du token s'il est fourni
        if (!authHeader) {
            throw new BadRequestException('Un token est requis pour pouvoir vous connecter');
        }

        // vérifie le type du token
        if (!authHeader.startsWith("Bearer")) {
            throw new UnauthorizedException('Pas le bon type pour le token');
        }

        const token = authHeader.slice(7);

        // verification du token
        try {
            return jwt.verify(token, secret);

        }catch (err){
            // si le token est expiré
            if (err.name === "TokenExpiredError") {
                throw new UnauthorizedException('Token expiré, reconnectez-vous');
            }
            // si le token est invalide
            throw new UnauthorizedException('Token invalide');
        }
    }
}