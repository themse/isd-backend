import { pathResolver } from '@/utils/path-resolver';

export default {
	handler: `${pathResolver(__dirname)}/handler.main`,
	description: 'Create Lead',
	events: [
		{
			http: {
				method: 'post',
				path: 'lead',
				cors: true,
			},
		},
	],
	memorySize: 512,
	timeout: 6,
};
