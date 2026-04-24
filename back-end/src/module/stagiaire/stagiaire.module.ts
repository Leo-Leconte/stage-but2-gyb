import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stagiaire } from '../../repository/StagiaireRepository';
import { StagiaireService } from '../../service/stagiaire/stagiaire.service';
import { StagiaireRepositoryCrud } from '../../repository/stagiaire/StagiaireRepositoryCrud';
import { StagiaireController } from '../../controller/stagiaire/stagiaire.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stagiaire]), AuthModule],
  controllers: [StagiaireController],
  providers: [StagiaireService, StagiaireRepositoryCrud],
})
export class StagiaireModule {}
