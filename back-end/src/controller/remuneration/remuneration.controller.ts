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
import { RemunerationService } from '../../service/remuneration/remuneration.service';
import { CollaborateurRoleGuard } from '../../Guard/collaborateurRole.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('api/remuneration')
export class RemunerationController {
  constructor(private readonly remunerationService: RemunerationService) {}

  /**
   * Permet de recuperer tous les stages
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Chercher une rémuneration par son id' })
  @ApiResponse({ status: 200, description: 'Rémuneration trouvée avec succes' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiBody({})
  @Get()
  @UseGuards(CollaborateurRoleGuard)
  async findAll() {
    try {
      return await this.remunerationService.findAll();
    } catch (error) {
      console.error('Erreur findAll remuneration', error);
    }
  }

  /**
   * Permet de recuperer un stage par son id
   * @param id
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Liste des rémunerations' })
  @ApiResponse({
    status: 200,
    description: 'Liste des rémuneration charger avec succes',
  })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiBody({})
  @Get(':id')
  @UseGuards(CollaborateurRoleGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.remunerationService.findById(id);
    } catch (error) {
      console.error('Erreur findById remuneration', error);
    }
  }

  /**
   * Permet de supprimer un stage par son id
   * @param id
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: "Suppression d'une rémuneration" })
  @ApiResponse({
    status: 200,
    description: 'Suppression de la rémuneration avec succes',
  })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiBody({})
  @Delete(':id')
  @UseGuards(CollaborateurRoleGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.remunerationService.delete(id);
    } catch (error) {
      console.error('Erreur delete remuneration', error);
    }
  }

  /**
   * Permet de creer un stage
   * @param remuneration
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creer une rémuneration' })
  @ApiResponse({
    status: 200,
    description: 'Ajout de la rémuneration avec succes',
  })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiBody({})
  @Post('/create')
  @UseGuards(CollaborateurRoleGuard)
  async create(@Body() remuneration: any) {
    try {
      return await this.remunerationService.create(remuneration);
    } catch (error) {
      console.error('Erreur create remuneration', error);
    }
  }

  /**
   * Permet de modifier un stage par son id
   * @param id
   * @param remuneration
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mise a jour de la rémuneration' })
  @ApiResponse({
    status: 200,
    description: 'Mise a jour de la rémuneration avec succes',
  })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiBody({})
  @Put(':id')
  @UseGuards(CollaborateurRoleGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() remuneration: any,
  ) {
    try {
      return await this.remunerationService.update(id, remuneration);
    } catch (error) {
      console.error('Erreur update remuneration', error);
    }
  }
}
