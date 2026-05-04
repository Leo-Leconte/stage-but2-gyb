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

@Controller('api/remuneration')
export class RemunerationController {
  constructor(private readonly remunerationService: RemunerationService) {}

  /**
   * @Path {GET} /api/remuneration
   *
   * Permet de recuperer tous les stages
   */
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
   * @Path {GET} /api/remuneration/id
   *
   * Permet de recuperer un stage par son id
   * @param id
   */
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
   * @Path {Delete} /api/remuneration/id
   *
   * Permet de supprimer un stage par son id
   * @param id
   */
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
   * @Path {POST} /api/remuneration/create
   *
   * Permet de creer un stage
   * @param remuneration
   */
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
   * @Path {POST} /api/remuneration/id
   *
   * Permet de modifier un stage par son id
   * @param id
   * @param remuneration
   */
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
