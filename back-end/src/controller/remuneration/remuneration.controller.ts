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
import { RemunerationService } from '../../service/remuneration/remuneration.service';

@Controller('api/remuneration')
export class RemunerationController {
  constructor(private readonly remunerationService: RemunerationService) {}

  @Get()
  async findAll() {
    try {
      return await this.remunerationService.findAll();
    } catch (error) {
      console.error('Erreur findAll remuneration', error);
    }
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.remunerationService.findById(id);
    } catch (error) {
      console.error('Erreur findById remuneration', error);
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.remunerationService.delete(id);
    } catch (error) {
      console.error('Erreur delete remuneration', error);
    }
  }

  @Post('/create')
  async create(@Body() remuneration: any) {
    try {
      return await this.remunerationService.create(remuneration);
    } catch (error) {
      console.error('Erreur create remuneration', error);
    }
  }

  @Put(':id')
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
