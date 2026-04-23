import { Controller, Headers, Post } from '@nestjs/common';
import { LogoutService } from '../../service/auth/logout.service';

@Controller('api/auth')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  /**
   * Permet de se deconnecter
   *
   * @path {POST} /api/auth/logout
   * @param authHeader
   *
   * @param authHeader ; le token
   * @returns un message de confirmation
   */

  @Post('logout')
  async logout(@Headers('authorization') authHeader: string) {
    try {
      return await this.logoutService.logout(authHeader);
    } catch (error) {
      console.error('Erreur logout:', error);
      throw error;
    }
  }
}
