import {Column, Entity, ForeignKey, PrimaryGeneratedColumn} from 'typeorm';
import {Stage} from "./StageRepository";
import {Collaborateur} from "./CollaborateurRepository";

@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    id_document: number;

    @Column({ type: 'varchar', length: 255 })
    nom_fichier: string;

    @Column({ type: 'varchar', length: 100 })
    type_doc: string;

    @Column({ type: 'varchar', length: 4 })
    format: string;

    @Column({ type: 'varchar', length: 255 })
    chemin_stockage: string;

    @Column({ type: 'timestamp' })
    date_upload: Date;

    @ForeignKey(() => Stage)
    id_stage;

    @ForeignKey(() => Collaborateur)
    id_collaborateur;

}