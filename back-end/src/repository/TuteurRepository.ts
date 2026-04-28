import { Column, Entity, ForeignKey, PrimaryGeneratedColumn } from 'typeorm';

@Entity ({ schema: 'gyb_stage', name: 'tuteur' })
export class Tuteur {

  @PrimaryGeneratedColumn({name : 'id_tuteur'})
  id: number;

  @Column({ type: 'varchar', length: 100 , name : 'nom'})
  nom: string;

  @Column({ type: 'varchar', length: 100 , name : 'prenom' })
  prenom: string;

  @Column({ type: 'varchar', length: 100 , name : 'service' })
  service: string;

  @Column({ type: 'varchar', length: 100 , name : 'email'})
  email: string;
}
