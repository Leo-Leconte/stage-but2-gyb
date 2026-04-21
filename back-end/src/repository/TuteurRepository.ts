import {Column, Entity, ForeignKey, PrimaryGeneratedColumn} from 'typeorm';
@Entity()
export class Tuteur {
    @PrimaryGeneratedColumn()
    id_tuteur: number;

    @Column({ type: 'varchar', length: 100 })
    nom: string;

    @Column({ type: 'varchar', length: 100 })
    prenom: string;

    @Column({ type: 'varchar', length: 100 })
    service: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;
}