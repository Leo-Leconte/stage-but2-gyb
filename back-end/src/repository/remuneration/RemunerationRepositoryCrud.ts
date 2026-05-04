import { InjectRepository } from '@nestjs/typeorm';
import { Remuneration } from '../RemunerationRepository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class RemunerationRepositoryCrud {
  constructor(
    @InjectRepository(Remuneration)
    private readonly remuneration: Repository<Remuneration>,
  ) {}

  /**
   * Permet de recuperer tous les stages
   */
  findAll() {
    return this.remuneration.find();
  }

  /**
   * Permet de recuperer un stage par son id
   *
   * @param id
   */
  async findById(id: number) {
    const idR = await this.remuneration.findOne({
      where: { id_remuneration: id },
    });

    if (idR === null || idR === undefined) {
      return null;
    }
    return idR;
  }

  /**
   * Permet de supprimer un stage par son id
   *
   * @param id
   */
  async delete(id: number) {
    return this.remuneration.delete(id);
  }

  /**
   * Permet de modifier un stage par son id
   *
   * @param id
   * @param remuneration
   */
  async update(id: number, remuneration: Remuneration) {
    return this.remuneration.update(id, remuneration);
  }

  /**
   * Permet de creer un stage
   *
   * @param remuneration
   */
  async create(remuneration: Remuneration) {
    return this.remuneration.save(remuneration);
  }
}
