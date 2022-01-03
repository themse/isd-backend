import { pathResolver } from '@/utils/path-resolver';

export default {
  handler: `${pathResolver(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
      },
    },
  ],
};
