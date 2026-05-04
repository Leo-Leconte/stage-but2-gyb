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

@Controller('api/stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  /**
   * @Path {GET} /api/stage
   *
   * Permet de recuperer tous les stages   *
   */
  @Get()
  @UseGuards(CollaborateurRoleGuard)
  async findAll() {
    try {
      return await this.stageService.findAll();
    } catch (error) {
      console.error('Erreur findAll stage', error);
    }
  }

  /**
   * @Path {GET} /api/stage/:id
   *
   * Permet de recuperer le stage par son id
   * @param id
   */
  @Get(':id')
  @UseGuards(CollaborateurRoleGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.stageService.findByid(id);
    } catch (error) {
      console.error('Erreur findById stage', error);
    }
  }

  /**
   * @Path {DELETE} /api/stage/id
   *
   * Supprimer un stage via son id
   * @param id
   */
  @Delete(':id')
  @UseGuards(CollaborateurRoleGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.stageService.delete(id);
    } catch (error) {
      console.error('Erreur delete stage', error);
    }
  }

  /**
   * @Path {POST} /api/stage/create
   *
   * Permet de crée un stage
   * @param stage
   */
  @Post('/create')
  @UseGuards(CollaborateurRoleGuard)
  async create(@Body() stage: CreateStageDto) {
    try {
      return await this.stageService.create(stage);
    } catch (error) {
      console.error('Erreur create stage', error);
    }
  }

  /**
   * @Path {PUT} /api/stage/id
   *
   * Permet de modifier un stage via son id
   * @param id
   * @param stage
   */
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
