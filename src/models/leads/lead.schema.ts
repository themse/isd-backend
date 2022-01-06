import { object, string } from 'yup';

import { phoneRegExp } from '@/utils/phone-regex-rule';

export const leadSchema = object({
	id: string(),
	email: string().email().required(),
	phone: string().matches(phoneRegExp, "Phone number's not valid").required(),
	firstName: string().required(),
	lastName: string().required(),
});
