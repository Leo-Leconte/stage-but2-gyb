import { InjectRepository } from '@nestjs/typeorm';
import { Document } from '../DocumentRepository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentRepositoryCrud {
    /**
     *
     * @param document ; Repository TypeORM pour accéder aux données des documents
     */
    constructor(
        @InjectRepository(Document)
        private readonly document: Repository<Document>,
    ){}

    /**
     * Fonction qui fait la partie 1 du Read du CRUD (tout lire)
     */
    async findAll() {
        return this.document.find();
    }

    /**
     * Fonction qui fait la partie 2 du Read du CRUD (lire un document en particulier)
     * @param id ; l'id du document à voir
     */
    async findById(id: number) {
        const idDocument = await this.document.findOne({ where: { id } });
        if (idDocument === null || idDocument === undefined) {
            return null;
        }
        return idDocument;
    }





}
