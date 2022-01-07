import type { AWS } from '@serverless/typescript';

const functionPath = 'src/functions';

export const functions: AWS['functions'] = {
  createLead: {
    handler: `${functionPath}/leads/create-lead/handler.main`,
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
  },
  findLeads: {
    handler: `${functionPath}/leads/find-leads/handler.main`,
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
  },

  createInterest: {
    handler: `${functionPath}/interests/create-interest/handler.main`,
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
  },
};
