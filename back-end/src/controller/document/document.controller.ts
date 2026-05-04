import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { DocumentService } from '../../service/document/document.service';
import { CollaborateurRoleGuard } from '../../Guard/collaborateurRole.guard';

@Controller('api/document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  /**
   * @path {GET} /api/document
   *
   * Permet de voir tous les documents
   */
  @Get()
  @UseGuards(CollaborateurRoleGuard)
  async findAll() {
    try {
      return await this.documentService.findAll();
    } catch (error) {
      console.error('Erreur findAll document', error);
    }
  }
  /**
   * @Path {GET} /api/document/:id
   * @param id
   *
   * Permet de voir un document via son id
   */
  @Get(':id')
  @UseGuards(CollaborateurRoleGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.documentService.findByid(id);
    } catch (error) {
      console.error('Erreur findById document', error);
    }
  }

  /**
   * @Path {GET} /api/document/stage/:id_stage
   * Permet de voir tous les documents d'un stage
   *
   * @param id_stage
   */
  @Get('stage/:id_stage')
  @UseGuards(CollaborateurRoleGuard)
  async findByIdStage(@Param('id_stage', ParseIntPipe) id_stage: number) {
    try {
      return await this.documentService.findByIdStage(id_stage);
    } catch (error) {
      console.error('Erreur findByIdStage document', error);
    }
  }
}
