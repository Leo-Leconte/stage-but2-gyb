import { Injectable, NotFoundException } from '@nestjs/common';
import { StageRepositoryCrud } from 'src/repository/stage/StageRepositoryCrud';
import {CreateStageDto} from "../../repository/stage/dto/stage.dto";

@Injectable()
export class StageService {
  constructor(private readonly stageRepositoryCrud: StageRepositoryCrud) {}

  /**
   * Permet de recuperer tous les stages
   */
  async findAll() {
    return this.stageRepositoryCrud.findAll();
  }

  /**
   * Permet de recuperer un stage par son id
   * @param id
   * le if present permet de verifie si le stage existe
   */
  async findByid(id: number) {
    const idS = await this.stageRepositoryCrud.findById(id);

    if (!idS) {
      throw new NotFoundException('Stage introuvable');
    }
    return {
      message: `Stage ${id} trouvé`,
      stage: idS,
    };
  }

  /**
   * Permet de supprimer un stage par son id
   * @param id
   * le if present permet de verifie si le stage existe
   */

  async delete(id: number) {
    const idS = await this.stageRepositoryCrud.findById(id);

    if (!idS) {
      throw new NotFoundException(`Stage introuvable`);
    }

    await this.stageRepositoryCrud.delete(id);

    return {
      message: `Le Stage ${id} a été supprimé avec succès `,
    };
  }

  /**
   * Permet de modifier un stage par son id
   * @param id
   * @param stage
   * le if present permet de verifie si le stage existe
   */
  async update(id: number, stage: CreateStageDto) {
    const idS = await this.stageRepositoryCrud.findById(id);

    if (!idS) {
      throw new NotFoundException(`Stage introuvable`);
    }

    await this.stageRepositoryCrud.update(id, stage);

    return {
      message: `Le Stage ${id} a été mis à jour avec succès`,
    };
  }

  /**
   * Permet de creer un stage
   * @param stage
   */
  async create(stage: CreateStageDto) {
    await this.stageRepositoryCrud.create(stage);

    return {
      message: 'Stage crée avec succès',
    };
  }
}
