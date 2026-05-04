import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { VerifyService } from '../service/auth/verify.service';

@Injectable()
export class CollaborateurRoleGuard implements CanActivate {
  constructor(private readonly verifyService: VerifyService) {}

  /**
   * Permet de verifier si l'utilisateur est un collaborateur
   *
   * @param context
   * @return Renvoi un true s'il a le bon role sinon renvoi un false avec un message d'erreur
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Vérification du token et récupération des informations décodées
    const decoded = (await this.verifyService.verify(
      request.headers?.authorization,
    )) as any;

    // Vérification du rôle de l'utilisateur grâce à l'information précédente
    if (decoded.role !== 'collaborateur') {
      throw new UnauthorizedException(
        'Vous ne possédez pas le bon rôle pour effectuer cette action',
      );
    }

    return true;
  }
}
