import { Injectable } from '@nestjs/common';
@Injectable()
export class BlacklistService {
  private readonly blacklisted: Set<string> = new Set();

  /**
   * Ajoute le token dans la blacklist
   *
   * @param token
   */
  add(token: string): void {
    this.blacklisted.add(token);
  }

  /**
   * Verifie si le token est dans la blacklist
   *
   * Si le token est dans la blacklist, renvoie true
   * Sinon renvoie false
   * @param token
   */
  has(token: string): boolean {
    return this.blacklisted.has(token);
  }

  /**
   * Supprime le token de la blacklist
   *
   * @param token
   */
  remove(token: string): void {
    this.blacklisted.delete(token);
  }

  /**
   * Vide la blacklist quand on lance l'application'
   */
  clear(): void {
    this.blacklisted.clear();
  }
}
