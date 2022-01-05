import { pathResolver } from '@/utils/path-resolver';

export default {
  handler: `${pathResolver(__dirname)}/handler.main`,
  description: 'Example handler',
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
        cors: true,
      },
    },
  ],
  memorySize: 512,
  timeout: 6,
};
