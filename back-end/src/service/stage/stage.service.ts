import { Injectable } from '@nestjs/common';
import { StageRepositoryCrud } from 'src/repository/stage/StageRpositoryCrud';

@Injectable()
export class StageService {
  constructor(private readonly stageRepositoryCrud: StageRepositoryCrud) {}

  findAll() {
    return this.stageRepositoryCrud.findAll();
  }

  findByid(id: number) {
    return this.stageRepositoryCrud.findById(id);
  }

  delete(id: number) {
    return this.stageRepositoryCrud.delete(id);
  }

  update(id: number, stage: any) {
    return this.stageRepositoryCrud.update(id, stage);
  }

  create(stage: any) {
    return this.stageRepositoryCrud.create(stage);
  }
}
