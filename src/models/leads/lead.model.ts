import { v4 as UUID } from 'uuid';
import { InferType } from 'yup';

import { BaseModel } from '@/common/types/base-model';
import { leadSchema } from './lead.schema';
import { LeadTableInterface, UpsertLeadDto } from './types';

export class LeadModel extends BaseModel {
  static tableName = process.env.LEADS_TABLE;

  static validate({
    id,
    email,
    phone,
    firstName,
    lastName,
  }): InferType<typeof leadSchema> | never {
    return leadSchema.validateSync({
      id,
      email,
      phone,
      firstName,
      lastName,
    });
  }

  id: string;

  email: string;
  phone: string;
  firstName: string;
  lastName: string;

  createdAt: number;
  updatedAt: number | null;

  constructor(dto: UpsertLeadDto) {
    super(dto);
  }

  getEntityMappings(): LeadTableInterface {
    return {
      id: this.id,
      email: this.email,
      phone: this.phone,
      first_name: this.firstName,
      last_name: this.lastName,

      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  protected hydrate({ email, phone, firstName, lastName, id }: UpsertLeadDto) {
    if (this.isUpdate(id)) {
      this.id = id;
      this.updatedAt = new Date().getTime();
    } else {
      this.id = UUID();
      this.createdAt = new Date().getTime();
    }
    this.email = email;
    this.phone = phone;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
