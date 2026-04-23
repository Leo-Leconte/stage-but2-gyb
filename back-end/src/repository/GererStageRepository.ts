import { Column, Entity, ForeignKey, PrimaryGeneratedColumn } from 'typeorm';
import { Collaborateur } from './CollaborateurRepository';
import { Stage } from './StageRepository';

@Entity ({ schema: 'gyb_stage', name: 'gerer_stage' })
export class GererStage {
  @ForeignKey(() => Collaborateur)
  id_collaborateur: number;

  @ForeignKey(() => Stage)
  id_stage: number;
}
