export interface IBaseRepository {
  create(params: unknown): Promise<unknown>;
  find(params: unknown): Promise<unknown>;
  query(params: unknown): Promise<unknown>;
  findOne(params: unknown): Promise<unknown>;
  update(params: unknown): Promise<unknown>;
  delete(params: unknown): Promise<unknown>;
}
