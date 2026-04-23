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
  findAll() {
    return this.remunerationService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.remunerationService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.remunerationService.delete(id);
  }

  @Post('/create')
  create(@Body() remuneration: any) {
    return this.remunerationService.create(remuneration);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() remuneration: any) {
    return this.remunerationService.update(id, remuneration);
  }
}
