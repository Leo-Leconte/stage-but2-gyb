import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ConfigModule } from '@nestjs/config';
import { AuthRepository } from '../../repository/auth/AuthRepository';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
    constructor(private readonly authRepository: AuthRepository) {}

    async login(email: string, mot_de_passe: string) {

        // on verifie que les champs sont bien remplis
        if (!email || !mot_de_passe) {
            throw new BadRequestException('Un mot de passe et un email sont requis pour pouvoir vous connecter');
        }

        // on verifie que l'utilisateur existe
        const collaborateur = await this.authRepository.findByEmail(email);

        if (!collaborateur) {
            throw new UnauthorizedException('Email ou Mot de passe incorrect');
        }


        // on vérifie que le mot de passe est correct
        const ok = await bcrypt.compare(mot_de_passe, collaborateur.mot_de_passe);

        if (!ok) {
            throw new UnauthorizedException('Email ou Mot de passe incorrect ');
        }

        // on verifie que le jwt est bien definit dans les variables d'environnement'
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET est manquant dans les variables d environnement');
        }

        // on cree le token
        const token = jwt.sign(
            { id_collaborateur: collaborateur.id_collaborateur, email: collaborateur.email },
            secret,
            { expiresIn: 3600 }
        );

        // on retourne le token et le type de token
        return {
            success: true,
            data: {
                Token: token,
                "type du token": "bearer",
                "Expire dans (sec)": 60 ,
                nom_utilisateur: collaborateur.nom
            },
            message: "Connexion établie avec succès"
        }
    }
}
