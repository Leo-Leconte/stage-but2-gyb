import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity ({ schema: 'gyb_stage', name: 'stagiaire' })
export class Stagiaire {

  @PrimaryGeneratedColumn({name : 'id_stagiaire'})
  id: number;

  @Column({ type: 'varchar', length: 100 , name : 'nom'})
  nom: string;

  @Column({ type: 'varchar', length: 100 , name : 'prenom'})
  prenom: string;

  @Column({ type: 'varchar', length: 100 , name : 'email'})
  email: string;

  @Column({ type: 'varchar', length: 15 , name : 'telephone'})
  telephone: string;
}
