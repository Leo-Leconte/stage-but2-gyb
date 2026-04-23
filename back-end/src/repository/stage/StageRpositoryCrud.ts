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

  async findAll() {
    return this.stage.find();
  }

  async findById(id: number) {
    const idStage = this.stage.findOne({ where: { id } });

    if (idStage === null || idStage === undefined) {
      return null;
    }
    return idStage;
  }

  async delete(id: number) {
    return this.stage.delete(id);
  }

  async update(id: number, stage: Stage) {
    return this.stage.update(id, stage);
  }

  async create(stage: Stage) {
    return this.stage.save(stage);
  }
}
