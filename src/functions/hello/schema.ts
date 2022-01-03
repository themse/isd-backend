import { object, number, string } from 'yup';

export const schema = object({
  name: string().required(),
  age: number().required().integer(),
});
