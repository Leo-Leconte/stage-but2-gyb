import { Injectable, NotFoundException } from '@nestjs/common';
import { TuteurRepositoryCrud } from 'src/repository/tuteur/TuteurRepositoryCrud';
import {StagiaireRepositoryCrud} from "../../repository/stagiaire/StagiaireRepositoryCrud";

@Injectable()
export class TuteurService {

    constructor(private readonly tuteurRepositoryCrud: TuteurRepositoryCrud) {}


    /**
     * Permet de recuperer tous les tuteurs
     */
    async findAll() {
        return this.tuteurRepositoryCrud.findAll();
    }

    /**
     * Permet de recuperer un tuteur par son id
     * @param id
     * le if present permet de verifie si le tuteur existe
     */
    async findByid(id: number) {
        const idS = await this.tuteurRepositoryCrud.findById(id);

        if (!idS) {
            throw new NotFoundException('tuteur introuvable');
        }
        return {
            message: `tuteur ${id} trouvé`,
            stagiaire: idS,
        };
    }



}