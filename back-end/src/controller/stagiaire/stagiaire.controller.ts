import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StagiaireService } from '../../service/stagiaire/stagiaire.service';
import { CollaborateurRoleGuard } from '../../Guard/collaborateurRole.guard';

@Controller('api/stagiaire')
export class StagiaireController {
  constructor(private readonly StagiaireService: StagiaireService) {}

  @Get()
  @UseGuards(CollaborateurRoleGuard)
  async findAll() {
    try {
      return await this.StagiaireService.findAll();
    } catch (error) {
      console.error('Erreur findAll stagiaire', error);
    }
  }

  @Get(':id')
  @UseGuards(CollaborateurRoleGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.StagiaireService.findByid(id);
    } catch (error) {
      console.error('Erreur findById stagiaire', error);
    }
  }

  @Delete(':id')
  @UseGuards(CollaborateurRoleGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.StagiaireService.delete(id);
    } catch (error) {
      console.error('Erreur delete stagiaire', error);
    }
  }

  @Post('/create')
  @UseGuards(CollaborateurRoleGuard)
  async create(@Body() stagiaire: any) {
    try {
      return await this.StagiaireService.create(stagiaire);
    } catch (error) {
      console.error('Erreur create stagiaire', error);
    }
  }

  @Put(':id')
  @UseGuards(CollaborateurRoleGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() stagiaire: any) {
    try {
      return await this.StagiaireService.update(id, stagiaire);
    } catch (error) {
      console.error('Erreur update stagiaire', error);
    }
  }
}
