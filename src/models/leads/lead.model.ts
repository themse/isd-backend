import { v4 as UUID } from 'uuid';
import { InferType } from 'yup';

import { leadSchema } from './lead.schema';
import { LeadTableInterface, UpsertLeadDto } from './types';

export class LeadModel {
  static tableName = 'isd-backend-leads-table-dev'; // TODO get from env

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
    this.hydrate(dto);
  }

  hydrate({ email, phone, firstName, lastName, id }: UpsertLeadDto) {
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

  protected isUpdate(id: string | undefined): boolean {
    return Boolean(id);
  }
}
