import { Column, Entity, ForeignKey, PrimaryGeneratedColumn } from 'typeorm';
import { Stage } from './StageRepository';
import { Collaborateur } from './CollaborateurRepository';

@Entity ({ schema: 'gyb_stage', name: 'document' })
export class Document {

  @PrimaryGeneratedColumn({name : 'id_document'})
  id: number;

  @Column({ type: 'varchar', length: 255 , name : 'nom_fichier' })
  nom_fichier: string;

  @Column({ type: 'varchar', length: 100 , name : 'type_doc'})
  type_doc: string;

  @Column({ type: 'varchar', length: 4 , name : 'format'})
  format: string;

  @Column({ type: 'varchar', length: 255 , name : 'chemin_stockage'})
  chemin_stockage: string;

  @Column({ type: 'timestamp' , name : 'date_depot'})
  date_depot: Date;

  @Column({ type: 'int', name: 'id_stage', nullable: true })
  id_stage: number;

  @Column({ type: 'int', name: 'id_collaborateur', nullable: true })
  id_collaborateur: number;

  @Column({ type: 'int', name: 'id_document', nullable: true })
  id_document: number;
}


