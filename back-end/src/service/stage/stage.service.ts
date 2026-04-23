import { Injectable, NotFoundException } from '@nestjs/common';
import { StageRepositoryCrud } from 'src/repository/stage/StageRepositoryCrud';

@Injectable()
export class StageService {
  constructor(private readonly stageRepositoryCrud: StageRepositoryCrud) {}

  async findAll() {
    return this.stageRepositoryCrud.findAll();
  }

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

  async update(id: number, stage: any) {
    const idS = await this.stageRepositoryCrud.findById(id);

    if (!idS) {
      throw new NotFoundException(`Stage introuvable`);
    }

    await this.stageRepositoryCrud.update(id, stage);

    return {
      message: `Le Stage ${id} a été mis à jour avec succès`,
    };
  }

  async create(stage: any) {
    await this.stageRepositoryCrud.create(stage);

    return {
      message: 'Stage crée avec succès',
    };
  }
}
