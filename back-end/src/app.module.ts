import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborateur } from './repository/CollaborateurRepository';
import { Stage } from './repository/StageRepository';
import { AuthModule } from './module/auth/auth.module';
import { StageModule } from './module/stage/stage.module';

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
      entities: [Collaborateur, Stage],
      synchronize: false,
      logging: false,
    }),
    AuthModule,
    StageModule,
  ],
})
export class AppModule {}
