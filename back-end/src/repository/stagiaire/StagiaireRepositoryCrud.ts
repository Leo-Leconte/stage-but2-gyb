import { InjectRepository } from '@nestjs/typeorm';
import { Stagiaire } from '../StagiaireRepository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class StagiaireRepositoryCrud {

    /**
     *
     * @param stagiaire ; Repository TypeORM pour accéder aux données des stagiaires
     */
    constructor(
        @InjectRepository(Stagiaire)
        private readonly stagiaire: Repository<Stagiaire>,
    ){}

    /**
     * Fonction qui fait le Create du CRUD
     * @param stagiaire ; le stagiaire à ajouter
     */
    async create(stagiaire: Stagiaire) {
        return this.stagiaire.save(stagiaire);
    }

    /**
     * Fonction qui fait la partie 1 du Read du CRUD (tout lire)
     */
    async findAll() {
        return this.stagiaire.find();
    }

    /**
     * Fonction qui fait la partie 2 du Read du CRUD (lire un stagiaire en particulier)
     * @param id ; l'id du stagiaire à voir
     */
    async findById(id: number) {
        const idStagiaire = this.stagiaire.findOne({ where: { id } });
        if (idStagiaire === null || idStagiaire === undefined) {
            return null;
        }
        return idStagiaire;
    }

    /**
     *
     * @param id ; l'id du stagiaire
     * @param stagiaire ; les infos du stagiaire à update
     */
    async update(id: number, stagiaire: Stagiaire)  {
        return this.stagiaire.update(id, stagiaire);
    }

    /**
     * Fonction qui fait le Delete du CRUD
     * @param id ;  l'id du stagiaire à supprimer
     */
    async delete(id: number) {
        return this.stagiaire.delete(id);
    }

}