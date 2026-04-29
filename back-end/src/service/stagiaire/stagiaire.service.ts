import { Injectable, NotFoundException } from '@nestjs/common';
import { StagiaireRepositoryCrud } from 'src/repository/stagiaire/StagiaireRepositoryCrud';

@Injectable()
export class StagiaireService {
  constructor(
    private readonly stagiaireRepositoryCrud: StagiaireRepositoryCrud,
  ) {}

  /**
   * Permet de recuperer tous les stagiaires
   */
  async findAll() {
    return this.stagiaireRepositoryCrud.findAll();
  }

  /**
   * Permet de recuperer un stagiaire par son id
   * @param id
   * le if present permet de verifie si le stagiaire existe
   */
  async findByid(id: number) {
    const idS = await this.stagiaireRepositoryCrud.findById(id);

    if (!idS) {
      throw new NotFoundException('stagiaire introuvable');
    }
    return {
      message: `stagiaire ${id} trouvé`,
      stagiaire: idS,
    };
  }

  /**
   * Permet de supprimer un stagiaire par son id
   * @param id
   * le if present permet de verifie si le stagiaire existe
   */

  async delete(id: number) {
    const idS = await this.stagiaireRepositoryCrud.findById(id);

    if (!idS) {
      throw new NotFoundException(`stagiaire introuvable`);
    }

    await this.stagiaireRepositoryCrud.delete(id);

    return {
      message: `Le stagiaire ${id} a été supprimé avec succès `,
    };
  }

  /**
   * Permet de modifier un stagiaire par son id
   * @param id
   * @param stagiaire
   * le if present permet de verifie si le stagiaire existe
   */
  async update(id: number, stagiaire: any) {
    const idS = await this.stagiaireRepositoryCrud.findById(id);

    if (!idS) {
      throw new NotFoundException(`stagiaire introuvable`);
    }

    await this.stagiaireRepositoryCrud.update(id, stagiaire);

    return {
      message: `Le stagiaire ${id} a été mis à jour avec succès`,
    };
  }

  /**
   * Permet de creer un stagiaire
   * @param stagiaire
   */
  async create(stagiaire: any) {
    const Stagiaire = await this.stagiaireRepositoryCrud.create(stagiaire);

    return {
      message: 'stagiaire crée avec succès',
      id: Stagiaire.id,
    };
  }
}
