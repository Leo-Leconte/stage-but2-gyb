import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
    findOne(email: string,mot_de_passe: string) {
        return {email: email,mot_de_passe: mot_de_passe};
    }
}