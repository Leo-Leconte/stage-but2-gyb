import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RemunerationRepositoryCrud } from 'src/repository/remuneration/RemunerationRepositoryCrud';

@Injectable()
export class RemunerationService {
  constructor(
    private readonly remunerationRepositoryCrud: RemunerationRepositoryCrud,
  ) {}

  async findAll() {
    return this.remunerationRepositoryCrud.findAll();
  }

  async findById(id: number) {
    const idR = await this.remunerationRepositoryCrud.findById(id);

    if (!idR) {
      throw new NotFoundException(`Remuneration introuvable`);
    }
    return {
      message: `Rémuneration ${id} trouvée`,
      remuneration: idR,
    };
  }

  async delete(id: number) {
    const idR = await this.remunerationRepositoryCrud.findById(id);

    if (!idR) {
      throw new NotFoundException(`Remuneration introuvable`);
    }

    try {
      await this.remunerationRepositoryCrud.delete(id);
      return {
        message: `Rémuneration ${id} supprimée avec succès`,
      };
    } catch (error) {
      throw new ConflictException(
        `Impossible de supprimer : la rémunération ${id} est utilisée par un stage`,
      );
    }
  }

  async update(id: number, remuneration: any) {
    const idR = await this.remunerationRepositoryCrud.findById(id);

    if (!idR) {
      throw new NotFoundException(`Remuneration introuvable`);
    }

    await this.remunerationRepositoryCrud.update(id, remuneration);

    return {
      message: `Mise a jour de la rémuneration n°${id} avec succès`,
    };
  }

  async create(remuneration: any) {
    if (!remuneration.est_remunere && remuneration.montant_remunere > 0) {
      throw new BadRequestException(
        'Un stage non rémunéré ne peut pas avoir un montant',
      );
    }

    if (!remuneration.est_remunere) {
      remuneration.montant_remunere = null;
    }

    await this.remunerationRepositoryCrud.create(remuneration);

    return {
      message: 'Rémuneration crée avec succès',
    };
  }
}
