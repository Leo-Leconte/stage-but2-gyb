import {
  Controller,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { VerifyService } from '../../service/auth/verify.service';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

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

  @ApiOperation({ summary: 'Verification du token' })
  @ApiBearerAuth()
  @Get('me')
  @ApiResponse({
    status: 200,
    description: 'Token valide',
  })
  @ApiResponse({
    status: 401,
    description: 'Token invalide',
  })
  async verify(@Headers('authorization') authHeader: string) {
    try {
      return await this.VerifyService.verify(authHeader);
    } catch (error) {
      console.error('Erreur verify:', error);
      throw error;
    }
  }
}
