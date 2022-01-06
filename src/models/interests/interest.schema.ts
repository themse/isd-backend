import { object, string } from 'yup';

export const interestSchema = object({
	id: string(),
	leadId: string().required(),
	message: string().required(),
});
