import {Column, Entity, ForeignKey, PrimaryGeneratedColumn} from 'typeorm';
import {Collaborateur} from "./CollaborateurRepository";
import {Stage} from "./StageRepository";
@Entity()
export class GererStage {

    @ForeignKey(() => Collaborateur)
    id_collaborateur;

    @ForeignKey(() => Stage)
    id_stage;
}