import { pathResolver } from '@/utils/path-resolver';

export default {
  handler: `${pathResolver(__dirname)}/handler.main`,
  description: 'Find Leads',
  events: [
    {
      http: {
        method: 'get',
        path: 'leads',
        cors: true,
      },
    },
  ],
  memorySize: 512,
  timeout: 6,
};
