import { InferType } from 'yup';

import { LeadModel } from './lead.model';
import { leadSchema } from './lead.schema';

export interface LeadTableInterface {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;

  created_at: number;
  updated_at: number;
}

export type LeadEntity = Omit<
  Pick<LeadModel, keyof LeadModel>,
  'getEntityMappings'
>;

export type LeadCreateDto = Omit<InferType<typeof leadSchema>, 'id'>;

export type LeadUpsertDto = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;

  id: string | undefined; // update | create
};
