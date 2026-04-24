import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remuneration } from '../../repository/RemunerationRepository';
import { RemunerationController } from '../../controller/remuneration/remuneration.controller';
import { RemunerationService } from '../../service/remuneration/remuneration.service';
import { RemunerationRepositoryCrud } from '../../repository/remuneration/RemunerationRepositoryCrud';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Remuneration]), AuthModule],
  controllers: [RemunerationController],
  providers: [RemunerationService, RemunerationRepositoryCrud],
})
export class RemunerationModule {}
