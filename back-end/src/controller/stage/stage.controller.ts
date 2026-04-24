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

@Controller('api/stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Get()
  @UseGuards(CollaborateurRoleGuard)
  async findAll() {
    try {
      return await this.stageService.findAll();
    } catch (error) {
      console.error('Erreur findAll stage', error);
    }
  }

  @Get(':id')
  @UseGuards(CollaborateurRoleGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.stageService.findByid(id);
    } catch (error) {
      console.error('Erreur findById stage', error);
    }
  }

  @Delete(':id')
  @UseGuards(CollaborateurRoleGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.stageService.delete(id);
    } catch (error) {
      console.error('Erreur delete stage', error);
    }
  }

  @Post('/create')
  @UseGuards(CollaborateurRoleGuard)
  async create(@Body() stage: any) {
    try {
      return await this.stageService.create(stage);
    } catch (error) {
      console.error('Erreur create stage', error);
    }
  }

  @Put(':id')
  @UseGuards(CollaborateurRoleGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() stage: any) {
    try {
      return await this.stageService.update(id, stage);
    } catch (error) {
      console.error('Erreur update stage', error);
    }
  }
}
