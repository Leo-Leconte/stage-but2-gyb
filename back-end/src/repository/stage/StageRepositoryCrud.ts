import { InjectRepository } from '@nestjs/typeorm';
import { Stage } from '../StageRepository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {CreateStageDto} from "./dto/stage.dto";

/**
 * stage mais sans le statut histoire de ne pas pouvoir le modifier
 */



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
   * fonction qui permet de calculer le statut
   * @param stage ; le stage à modifier / créer
   * @param statut ; un statut pour avoir assez de params dans la fonction update
   */
  calcStatut(stage:Stage) {
    const now=new Date();
    if(stage.date_fin > now && stage.date_debut > now){
      stage.statut="a venir";
    }
    else{
      if(stage.date_fin > now && stage.date_debut <= now){
        stage.statut="en cours";
      }
      else{
        stage.statut="termine"
      }
    }
  }


  /**
   * Permet de modifier un stage par son id
   * @param id
   * @param stage
   */
  async update(id: number, stageDto: CreateStageDto) {
    const stage= { ...stageDto } as Stage;
    this.calcStatut(stage);
    return await this.stage.update(id, stage);
  }

  /**
   * Permet de creer un stage
   * @param stage
   */
  async create(stageDto: CreateStageDto) {
    const stage = { ...stageDto } as Stage;
    this.calcStatut(stage);
    return this.stage.save(stage);
  }
}
