import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborateur } from './repository/CollaborateurRepository';
import { Stage } from './repository/StageRepository';
import { Stagiaire } from './repository/StagiaireRepository';

import { AuthModule } from './module/auth/auth.module';
import { StageModule } from './module/stage/stage.module';
import { StagiaireModule } from './module/stagiaire/stagiaire.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Collaborateur, Stage, Stagiaire],
      synchronize: false,
      logging: false,
    }),
    AuthModule,
    StageModule,
    StagiaireModule
  ],
})
export class AppModule {}
