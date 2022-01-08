import { IModel } from './model.interface';

export abstract class BaseModel implements IModel {
  constructor(dto: unknown) {
    this.hydrate(dto);
  }

  abstract getEntityMappings(): unknown;

  protected abstract hydrate(dto: unknown): void;

  protected isUpdate(id: string | undefined): boolean {
    return Boolean(id);
  }
}
