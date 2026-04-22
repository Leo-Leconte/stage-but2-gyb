import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from '../../controller/auth/login.controller';
import { LoginService } from '../../service/auth/login.service';
import { Collaborateur } from '../../repository/CollaborateurRepository';
import { AuthRepository } from '../../repository/auth/AuthRepository';
import { VerifyService } from '../../service/auth/verify.service';
import { VerifyController} from "../../controller/auth/verify.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Collaborateur])],
  controllers: [LoginController , VerifyController],
  providers: [LoginService, VerifyService,AuthRepository],
})
export class AuthModule {}
