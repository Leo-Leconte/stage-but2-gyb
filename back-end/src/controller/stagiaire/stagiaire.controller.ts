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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('api/stagiaire')
export class StagiaireController {
  constructor(private readonly StagiaireService: StagiaireService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer tous les stagiaires' })
  @ApiResponse({
    status: 200,
    description: 'Recuperation des stagiaires avec succes',
  })
  @ApiResponse({
    status: 401,
    description: 'Accès refusé',
  })
  @Get()
  @UseGuards(CollaborateurRoleGuard)
  async findAll() {
    try {
      return await this.StagiaireService.findAll();
    } catch (error) {
      console.error('Erreur findAll stagiaire', error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Recuperer un stagiaire par son id' })
  @ApiResponse({ status: 200, description: 'Stagiaire récupéré avec succès' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @Get(':id')
  @UseGuards(CollaborateurRoleGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.StagiaireService.findByid(id);
    } catch (error) {
      console.error('Erreur findById stagiaire', error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un stagiaire par son id' })
  @ApiResponse({
    status: 200,
    description: 'Suppression du stagiaire avec succes',
  })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @Delete(':id')
  @UseGuards(CollaborateurRoleGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.StagiaireService.delete(id);
    } catch (error) {
      console.error('Erreur delete stagiaire', error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creer un stagiaire' })
  @ApiResponse({ status: 200, description: 'Ajout du stagiaire avec succes' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiBody({})
  @Post('/create')
  @UseGuards(CollaborateurRoleGuard)
  async create(@Body() stagiaire: any) {
    try {
      return await this.StagiaireService.create(stagiaire);
    } catch (error) {
      console.error('Erreur create stagiaire', error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mise à jour du stagiaire' })
  @ApiResponse({ status: 200, description: 'Ajout du stagiaire avec succes' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiBody({})
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
