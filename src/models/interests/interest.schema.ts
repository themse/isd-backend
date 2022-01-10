import { object, string } from 'yup';

export const interestSchema = object({
  id: string().nullable(),
  leadId: string().required(),
  message: string().required(),
});
