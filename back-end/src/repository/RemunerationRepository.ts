import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Remuneration {

    @PrimaryGeneratedColumn()
    id_remuneration: number;

    @Column({ type: 'boolean'})
    est_remuneration: string;

    @Column({ type: 'numeric'})
    montant_remunere: number;


}