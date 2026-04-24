import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from '../../repository/StageRepository';
import { StageController } from '../../controller/stage/stage.controller';
import { StageService } from '../../service/stage/stage.service';
import { StageRepositoryCrud } from '../../repository/stage/StageRepositoryCrud';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Stage]), AuthModule],
  controllers: [StageController],
  providers: [StageService, StageRepositoryCrud],
})
export class StageModule {}
