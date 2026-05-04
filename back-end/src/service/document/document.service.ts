import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepositoryCrud } from 'src/repository/document/DocumentRepositoryCrud';
import { StagiaireRepositoryCrud } from '../../repository/stagiaire/StagiaireRepositoryCrud';

@Injectable()
export class DocumentService {
    constructor(private readonly documentRepositoryCrud: DocumentRepositoryCrud) {}

    /**
     * Permet de recuperer tous les documents
     */
    async findAll() {
        return this.documentRepositoryCrud.findAll();
    }

    /**
     * Permet de recuperer un document par son id
     * @param id
     * le if present permet de verifie si le document existe
     */
    async findByid(id: number) {
        const idS = await this.documentRepositoryCrud.findById(id);

        if (!idS) {
            throw new NotFoundException('document introuvable');
        }
        return {
            message: `document ${id} trouvé`,
            document: idS,
        };
    }

    async findByIdStage(id_stage: number) {

        console.log("Je passe (avant) !");
        const idStages = await this.documentRepositoryCrud.findByIdStage(id_stage);
        console.log("Je passe (après) !");

        if (idStages===null || idStages.length===0) {
            throw new NotFoundException('document associé au stage introuvable');
        }
        return {
            message: `stage ${id_stage}  lié au document trouvé`,
            document: idStages,
        };
    }
}