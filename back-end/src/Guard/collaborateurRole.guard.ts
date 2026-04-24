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

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const decoded = (await this.verifyService.verify(
      request.headers?.authorization,
    )) as any;

    if (decoded.role !== 'collaborateur') {
      throw new UnauthorizedException(
        'Vous ne possédez pas le bon rôle pour effectuer cette action',
      );
    }

    return true;
  }
}
