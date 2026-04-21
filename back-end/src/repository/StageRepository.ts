import {Column, Entity, ForeignKey, PrimaryGeneratedColumn} from 'typeorm';

import {Stagiaire} from "./StagiaireRepository";
import {Tuteur} from "./TuteurRepository";
import {Remuneration} from "./RemunerationRepository";



@Entity()
export class Stage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    intitule: string;

    @Column({ type: 'varchar', length: 100 })
    description_missions: string;

    @Column({ type: 'varchar', length: 100 })
    developpement_competences: string;

    @Column({ type: 'varchar', length: 100 })
    service_accueil: string;

    @Column({ type: 'enum',enum:['a venir','en cours','termine'] })
    statut: string;

    @Column({ type: 'date' })
    date_debut: string;

    @Column({ type: 'date' })
    date_fin: string;

    @ForeignKey(() => Stagiaire)
    id_stagiaire;

    @ForeignKey(() => Tuteur)
    id_tuteur;

    @ForeignKey(() => Remuneration)
    id_remuneration;
}