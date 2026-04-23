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

  findAll() {
    return this.remuneration.find();
  }

  async findById(id: number) {
    const idR = await this.remuneration.findOne({
      where: { id_remuneration: id },
    });

    if (idR === null || idR === undefined) {
      return null;
    }
    return idR;
  }

  async delete(id: number) {
    return this.remuneration.delete(id);
  }

  async update(id: number, remuneration: Remuneration) {
    return this.remuneration.update(id, remuneration);
  }

  async create(remuneration: Remuneration) {
    return this.remuneration.save(remuneration);
  }
}
