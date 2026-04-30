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
import { StageService } from '../../service/stage/stage.service';
import { CollaborateurRoleGuard } from '../../Guard/collaborateurRole.guard';
import { CreateStageDto } from '../../repository/stage/dto/stage.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('api/stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer tous les stages' })
  @ApiResponse({
    status: 200,
    description: 'Liste des stages récupérée avec succès.',
  })
  @ApiResponse({ status: 403, description: 'Accès refusé.' })
  @Get()
  @UseGuards(CollaborateurRoleGuard)
  async findAll() {
    try {
      return await this.stageService.findAll();
    } catch (error) {
      console.error('Erreur findAll stage', error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Recuperer un stage par son id' })
  @ApiResponse({ status: 200, description: 'Stage récupéré avec succès' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @Get(':id')
  @UseGuards(CollaborateurRoleGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.stageService.findByid(id);
    } catch (error) {
      console.error('Erreur findById stage', error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un stage par son id' })
  @ApiResponse({ status: 200, description: 'Suppression du stage avec succes' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @Delete(':id')
  @UseGuards(CollaborateurRoleGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.stageService.delete(id);
    } catch (error) {
      console.error('Erreur delete stage', error);
    }
  }

  // pour le apibody pas obliger on peut faire la creation direct dans swagger
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creer un stage' })
  @ApiResponse({ status: 200, description: 'Ajout du stage avec succes' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiBody({})
  @Post('/create')
  @UseGuards(CollaborateurRoleGuard)
  async create(@Body() stage: CreateStageDto) {
    try {
      return await this.stageService.create(stage);
    } catch (error) {
      console.error('Erreur create stage', error);
    }
  }

  // pour le apibody pas obliger on peut faire la creation direct dans swagger
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier un stage par son id' })
  @ApiResponse({
    status: 200,
    description: 'Modification du stage avec succes',
  })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiBody({})
  @Put(':id')
  @UseGuards(CollaborateurRoleGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() stage: CreateStageDto,
  ) {
    try {
      return await this.stageService.update(id, stage);
    } catch (error) {
      console.error('Erreur update stage', error);
    }
  }
}
