import { object, string } from 'yup';

export const leadSchema = object({
  id: string(),
  email: string().email().required(),
  phone: string().required(),
  firstName: string().required(),
  lastName: string().required(),
});
