import { Controller, Headers, Post } from '@nestjs/common';
import { LogoutService } from '../../service/auth/logout.service';

@Controller('api/auth')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Post('logout')
  async logout(@Headers('authorization') authHeader: string) {
    return this.logoutService.logout(authHeader);
  }
}
