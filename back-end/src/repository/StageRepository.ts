import { Column, Entity, ForeignKey, PrimaryGeneratedColumn } from 'typeorm';

import { Stagiaire } from './StagiaireRepository';
import { Tuteur } from './TuteurRepository';
import { Remuneration } from './RemunerationRepository';

@Entity({ schema: 'gyb_stage', name: 'stage' })
export class Stage {
  @PrimaryGeneratedColumn({ name: 'id_stage' })
  id: number;

  @Column({ type: 'varchar', length: 100, name: 'intitule' })
  intitule: string;

  @Column({ type: 'varchar', length: 100, name: 'description_missions' })
  description_missions: string;

  @Column({ type: 'varchar', length: 100, name: 'developpement_competences' })
  developpement_competences: string;

  @Column({ type: 'varchar', length: 100, name: 'service_accueil' })
  service_accueil: string;

  @Column({
    type: 'enum',
    enum: ['a venir', 'en cours', 'termine'],
    name: 'statut',
  })
  statut: string;

  @Column({ type: 'date', name: 'date_debut' })
  date_debut: string;

  @Column({ type: 'date', name: 'date_fin' })
  date_fin: string;

  @Column({ type: 'int', name: 'id_stagiaire', nullable: true })
  id_stagiaire: number;

  @Column({ type: 'int', name: 'id_tuteur', nullable: true })
  id_tuteur: number;

  @Column({ type: 'int', name: 'id_remuneration', nullable: true })
  id_remuneration: number;
}
