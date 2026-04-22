import { Column, Entity, ForeignKey, PrimaryGeneratedColumn } from 'typeorm';
import { Stage } from './StageRepository';
import { Collaborateur } from './CollaborateurRepository';

@Entity ({ schema: 'gyb_stage', name: 'document' })
export class Document {

  @PrimaryGeneratedColumn({name : 'id_document'})
  id_document: number;

  @Column({ type: 'varchar', length: 255 , name : 'nom_fichier' })
  nom_fichier: string;

  @Column({ type: 'varchar', length: 100 , name : 'type_doc'})
  type_doc: string;

  @Column({ type: 'varchar', length: 4 , name : 'format'})
  format: string;

  @Column({ type: 'varchar', length: 255 , name : 'chemin_stockage'})
  chemin_stockage: string;

  @Column({ type: 'timestamp' , name : 'date_upload'})
  date_upload: Date;

  @ForeignKey(() => Stage)
  id_stage: number;

  @ForeignKey(() => Collaborateur)
  id_collaborateur: number;
}
