import { InjectRepository } from '@nestjs/typeorm';
import { Stage } from '../StageRepository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class StageRepositoryCrud {
  constructor(
    @InjectRepository(Stage)
    private readonly stage: Repository<Stage>,
  ) {}

  /**
   * Permet de recuperer tous les stages
   */
  async findAll() {
    return this.stage.find();
  }

  /**
   * Permet de recuperer un stage par son id
   * @param id
   */
  async findById(id: number) {
    const idStage = await this.stage.findOne({ where: { id } });

    if (idStage === null || idStage === undefined) {
      return null;
    }
    return idStage;
  }

  /**
   * Permet de supprimer un stage par son id
   * @param id
   */
  async delete(id: number) {
    return this.stage.delete(id);
  }

  /**
   * Permet de modifier un stage par son id
   * @param id
   * @param stage
   */
  async update(id: number, stage: Stage) {
    return this.stage.update(id, stage);
  }

  /**
   * Permet de creer un stage
   * @param stage
   */
  async create(stage: Stage) {
    return this.stage.save(stage);
  }
}
