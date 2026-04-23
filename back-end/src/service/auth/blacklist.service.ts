import { Injectable } from '@nestjs/common';
@Injectable()
export class BlacklistService {
  private readonly blacklisted: Set<string> = new Set();

  add(token: string): void {
    this.blacklisted.add(token);
  }

  has(token: string): boolean {
    return this.blacklisted.has(token);
  }

  remove(token: string): void {
    this.blacklisted.delete(token);
  }

  clear(): void {
    this.blacklisted.clear();
  }
}
