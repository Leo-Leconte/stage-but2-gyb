import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity ({ schema: 'gyb_stage', name: 'remuneration' })
export class Remuneration {

  @PrimaryGeneratedColumn({name : 'id_remuneration'})
  id_remuneration: number;

  @Column({ type: 'boolean' , name: 'est_remuneration'})
  est_remuneration: string;

  @Column({ type: 'numeric' , name: 'montant_remunere'})
  montant_remunere: number;
}
