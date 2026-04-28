import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { TuteurService } from '../../service/tuteur/tuteur.service';
import { CollaborateurRoleGuard } from '../../Guard/collaborateurRole.guard';


@Controller('api/stagiaire')
export class TuteurController {
    constructor(private readonly TuteurService: TuteurService) {
    }

    @Get()
    @UseGuards(CollaborateurRoleGuard)
    async findAll() {
        try {
            return await this.TuteurService.findAll();
        } catch (error) {
            console.error('Erreur findAll tuteur', error);
        }
    }

    @Get(':id')
    @UseGuards(CollaborateurRoleGuard)
    async findById(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.TuteurService.findByid(id);
        } catch (error) {
            console.error('Erreur findById tuteur', error);
        }
    }
}