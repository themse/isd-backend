import { InferType } from 'yup';
import { v4 as UUID } from 'uuid';

import { interestSchema } from './interest.schema';
import { InterestUpsertDto, InterestTableInterface } from './types';
import { BaseModel } from '@/common/types/base-model';

export class InterestModel extends BaseModel {
  static tableName = process.env.INTERESTS_TABLE ?? 'InterestsTable';

  static validate({
    leadId,
    message,
    id = null,
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

  constructor(dto: InterestUpsertDto) {
    super(dto);
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

  protected hydrate({ leadId, message, id }: InterestUpsertDto) {
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
}
