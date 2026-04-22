import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from '../../controller/auth/login.controller';
import { LoginService } from '../../service/auth/login.service';
import { Collaborateur } from '../../repository/CollaborateurRepository';
import { AuthRepository } from '../../repository/auth/AuthRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Collaborateur])],
  controllers: [LoginController],
  providers: [LoginService, AuthRepository],
})
export class AuthModule {}
