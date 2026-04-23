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
import { StageService } from '../../service/stage/stage.service';

@Controller('api/stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Get()
  async findAll() {
    try {
      return await this.stageService.findAll();
    } catch (error) {
      console.error('Erreur findAll stage', error);
    }
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.stageService.findByid(id);
    } catch (error) {
      console.error('Erreur findById stage', error);
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.stageService.delete(id);
    } catch (error) {
      console.error('Erreur delete stage', error);
    }
  }

  @Post('/create')
  async create(@Body() stage: any) {
    try {
      return await this.stageService.create(stage);
    } catch (error) {
      console.error('Erreur create stage', error);
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() stage: any) {
    try {
      return await this.stageService.update(id, stage);
    } catch (error) {
      console.error('Erreur update stage', error);
    }
  }
}
