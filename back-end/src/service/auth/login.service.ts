import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthRepository } from '../../repository/auth/AuthRepository';

@Injectable()
export class LoginService {
    constructor(private readonly authRepository: AuthRepository) {}

    async login(email: string, mot_de_passe: string) {

        if (!email || !mot_de_passe) {
            throw new BadRequestException('Un mot de passe et un email sont requis pour pouvoir vous connecter');
        }

        const collaborateur = await this.authRepository.findByEmail(email);

        if (!collaborateur) {
            throw new UnauthorizedException('Email ou Mot de passe incorrect');
        }

        const ok = await bcrypt.compare(mot_de_passe, collaborateur.mot_de_passe);

        if (!ok) {
            throw new UnauthorizedException('Email ou Mot de passe incorrect');
        }

        return {
            success: true,
            username: collaborateur.nom,
            message: 'Vous etes connecter',
        };
    }
}
