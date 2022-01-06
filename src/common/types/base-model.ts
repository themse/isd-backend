export abstract class BaseModel {
  constructor(dto: unknown) {
    this.hydrate(dto);
  }

  abstract getEntityMappings(): unknown;

  protected abstract hydrate(dto: unknown): void;

  protected isUpdate(id: string | undefined): boolean {
    return Boolean(id);
  }
}
