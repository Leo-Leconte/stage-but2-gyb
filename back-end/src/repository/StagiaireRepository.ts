import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stagiaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nom: string;

  @Column({ type: 'varchar', length: 100 })
  prenom: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  telephone: string;
}
