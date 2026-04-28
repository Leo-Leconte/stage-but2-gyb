import { InjectRepository } from '@nestjs/typeorm';
import { Tuteur } from '../TuteurRepository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class TuteurRepositoryCrud {
    /**
     *
     * @param tuteur ; Repository TypeORM pour accéder aux données des tuteurs
     */
    constructor(
        @InjectRepository(Tuteur)
        private readonly tuteur: Repository<Tuteur>,
    ){}

    /**
     * Fonction qui fait la partie 1 du Read du CRUD (tout lire)
     */
    async findAll() {
        return this.tuteur.find();
    }

    /**
     * Fonction qui fait la partie 2 du Read du CRUD (lire un tuteur en particulier)
     * @param id ; l'id du tuteur à voir
     */
    async findById(id: number) {
        const idTuteur = await this.tuteur.findOne({ where: { id } });
        if (idTuteur === null || idTuteur === undefined) {
            return null;
        }
        return idTuteur;
    }





}
