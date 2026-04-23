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

  /**
   * Permet de recuperer tous les stages
   */
  @Get()
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
  @Get(':id')
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
  @Delete(':id')
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
  @Post('/create')
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
