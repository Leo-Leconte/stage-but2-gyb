import { Controller, Headers, Post } from '@nestjs/common';
import { LogoutService } from '../../service/auth/logout.service';

@Controller('api/auth')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Post('logout')
  async logout(@Headers('authorization') authHeader: string) {
    try {
      return this.logoutService.logout(authHeader);
    } catch (error) {
      console.error('Erreur logout:', error);
      throw error;
    }
  }
}
