import { Controller, Get, Headers, UnauthorizedException } from "@nestjs/common";
import {VerifyService} from "../../service/auth/verify.service";

@Controller('api/auth')
export class VerifyController {

    constructor(readonly VerifyService: VerifyService) {}

    /**
     * Permet de verifier le token
     *
     * @path {GET} /api/auth/me
     *
     * Check si le token est valide
     * @param authHeader ; le token
     */

    @Get('me')
    async verify(@Headers('authorization') authHeader: string) {
        try {
            return await this.VerifyService.verify(authHeader);
        } catch (error) {
            console.error('Erreur verify:', error);
            throw error;
        }
    }
}
