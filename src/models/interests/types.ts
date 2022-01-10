import { InferType } from 'yup';

import { InterestModel } from './interest.model';
import { interestSchema } from './interest.schema';

export interface InterestTableInterface {
  id: string;
  lead_id: string;
  message: string;

  created_at: number;
  updated_at: number;
}

export type InterestEntity = Omit<
  Pick<InterestModel, keyof InterestModel>,
  'getEntityMappings'
>;

export type InterestCreateDto = Omit<InferType<typeof interestSchema>, 'id'>;

export type InterestUpsertDto = {
  leadId: string;
  message: string;

  id: string | undefined; // update | create
};
