import { InjectRepository } from '@nestjs/typeorm';
import { Collaborateur } from '../CollaborateurRepository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Collaborateur)
    private readonly collaborateur: Repository<Collaborateur>,
  ) {}

  /**
   * Permet de recuperer un collaborateur par son email
   *
   * @param email
   */
  findByEmail(email: string) {
    return this.collaborateur.findOne({ where: { email } });
  }
}
