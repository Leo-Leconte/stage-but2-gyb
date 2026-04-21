import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Collaborateur {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nom: string;

    @Column({ type: 'varchar', length: 100 })
    prenom: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    service: string;

    @Column({ type: 'varchar' })
    mot_de_passe: string;
}