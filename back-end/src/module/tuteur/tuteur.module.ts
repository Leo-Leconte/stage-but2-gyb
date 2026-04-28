import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tuteur } from '../../repository/TuteurRepository';
import { TuteurService } from '../../service/tuteur/tuteur.service';
import { TuteurRepositoryCrud } from '../../repository/tuteur/TuteurRepositoryCrud';
import { TuteurController } from '../../controller/tuteur/tuteur.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Tuteur]), AuthModule],
    controllers: [TuteurController],
    providers: [TuteurService, TuteurRepositoryCrud],
})
export class TuteurModule {}
