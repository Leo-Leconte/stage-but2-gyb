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
  findAll() {
    return this.stageService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.stageService.findByid(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.stageService.delete(id);
  }

  @Post('/create')
  create(@Body() stage: any) {
    return this.stageService.create(stage);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() stage: any) {
    return this.stageService.update(id, stage);
  }
}
