import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { StagiaireService } from '../../service/stagiaire/stagiaire.service';

@Controller('api/stagiaire')
export class StageController {
    constructor(private readonly StagiaireService: StagiaireService) {}

    @Get()
    async findAll() {
        try {
            return await this.StagiaireService.findAll();
        } catch (error) {
            console.error('Erreur findAll stagiaire', error);
        }
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.StagiaireService.findByid(id);
        } catch (error) {
            console.error('Erreur findById stagiaire', error);
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.StagiaireService.delete(id);
        } catch (error) {
            console.error('Erreur delete stagiaire', error);
        }
    }

    @Post('/create')
    async create(@Body() stagiaire: any) {
        try {
            return await this.StagiaireService.create(stagiaire);
        } catch (error) {
            console.error('Erreur create stagiaire', error);
        }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() stagiaire: any) {
        try {
            return await this.StagiaireService.update(id, stagiaire);
        } catch (error) {
            console.error('Erreur update stagiaire', error);
        }
    }
}
