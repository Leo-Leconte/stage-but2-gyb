import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../../repository/DocumentRepository';
import { DocumentService } from '../../service/document/document.service';
import { DocumentRepositoryCrud } from '../../repository/document/DocumentRepositoryCrud';
import { DocumentController } from '../../controller/document/document.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Document]), AuthModule],
    controllers: [DocumentController],
    providers: [DocumentService, DocumentRepositoryCrud],
})
export class DocumentModule {}