import { pathResolver } from '@/utils/path-resolver';

export default {
	handler: `${pathResolver(__dirname)}/handler.main`,
	description: 'Create Interest',
	events: [
		{
			http: {
				method: 'post',
				path: 'interest',
				cors: true,
			},
		},
	],
	memorySize: 512,
	timeout: 6,
};
