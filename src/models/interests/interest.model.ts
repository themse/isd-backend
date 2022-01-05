import { InferType } from 'yup';
import { v4 as UUID } from 'uuid';

import { interestSchema } from './interest.schema';
import { UpsertInterestDto, InterestTableInterface } from './types';

export class InterestModel {
  static tableName = process.env.INTERESTS_TABLE;

  static validate({
    id,
    leadId,
    message,
  }): InferType<typeof interestSchema> | never {
    return interestSchema.validateSync({
      id,
      leadId,
      message,
    });
  }

  id: string;
  leadId: string;
  message: string;

  createdAt: number;
  updatedAt: number | null;

  constructor(dto: UpsertInterestDto) {
    this.hydrate(dto);
  }

  getEntityMappings(): InterestTableInterface {
    return {
      id: this.id,
      lead_id: this.leadId,
      message: this.message,

      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  protected hydrate({ leadId, message, id }: UpsertInterestDto) {
    if (this.isUpdate(id)) {
      this.id = id;
      this.updatedAt = new Date().getTime();
    } else {
      this.id = UUID();
      this.createdAt = new Date().getTime();
    }
    this.leadId = leadId;
    this.message = message;
  }

  protected isUpdate(id: string | undefined): boolean {
    return Boolean(id);
  }
}
