import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'gyb_stage', name: 'remuneration' })
export class Remuneration {
  @PrimaryGeneratedColumn({ name: 'id_remuneration' })
  id_remuneration: number;

  @Column({ type: 'boolean', name: 'est_remunere' })
  est_remunere: boolean;

  @Column({ type: 'numeric', name: 'montant_remunere', nullable: true })
  montant_remunere: number | null; // le montant de la remuneration est optionnel il peut etre null comme il peut etre remunere
}
