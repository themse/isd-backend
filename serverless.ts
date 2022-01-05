import type { AWS } from '@serverless/typescript';
import {
  dynamoDBConfig,
  tableNames,
  tableThroughput,
} from 'src/services/dynamodb/config';
import { leadsTable, interestsTable } from 'src/services/dynamodb/tables';

import * as functions from '@/functions/index';

const serverlessConfiguration: AWS = {
  service: 'isd-backend',
  frameworkVersion: '2',
  plugins: [
    'serverless-esbuild',
    'serverless-dynamodb-local',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-central-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:*'],
        Resource: '*',
      },
    ],
  },

  functions,

  package: { individually: true },
  custom: {
    // variables
    stage: '${opt:stage, self:provider.stage}',
    ...tableThroughput,
    ...tableNames,

    dynamodb: dynamoDBConfig,

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    ['serverless-offline']: {
      httpPort: 4500,
    },
  },
  resources: {
    Resources: {
      LeadsTable: leadsTable,
      InterestsTable: interestsTable,
    },
  },
};

module.exports = serverlessConfiguration;
