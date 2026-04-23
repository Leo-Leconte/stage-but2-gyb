import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from '../../repository/StageRepository';
import { StageController } from '../../controller/stage/stage.controller';
import { StageService } from '../../service/stage/stage.service';
import { StageRepositoryCrud } from '../../repository/stage/StageRpositoryCrud';
@Module({
  imports: [TypeOrmModule.forFeature([Stage])],
  controllers: [StageController],
  providers: [StageService, StageRepositoryCrud],
})
export class StageModule {}
