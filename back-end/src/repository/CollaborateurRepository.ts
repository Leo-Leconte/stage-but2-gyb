import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'gyb_stage', name: 'collaborateur' }) // permet d acceder au schema de la bd ici gyb_stage avec le nom de la table collaborateur
export class Collaborateur {

  @PrimaryGeneratedColumn({ name: 'id_collaborateur' })
  id_collaborateur: number;

  @Column({ name: 'nom', type: 'varchar', length: 100 })
  nom: string;

  @Column({ name: 'prenom', type: 'varchar', length: 100 })
  prenom: string;

  @Column({ name: 'email', type: 'varchar', length: 100 })
  email: string;

  @Column({ name: 'service', type: 'varchar', length: 100 })
  service: string;

  @Column({ name: 'mot_de_passe', type: 'varchar', length: 100 })
  mot_de_passe: string;
}
