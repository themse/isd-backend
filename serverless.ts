import type { AWS } from '@serverless/typescript';

import {
  dynamoDBConfig,
  tableNames,
  tableThroughput,
} from './serverless/resources/dynamodb/config';
import resources from './serverless/resources';
import { functions } from './serverless/functions';
import environment from './serverless/provider/environment';

// serverless config details https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/
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
    environment,
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
        ],
        Resource: [
          { 'Fn::GetAtt': ['LeadsTable', 'Arn'] },
          { 'Fn::GetAtt': ['InterestsTable', 'Arn'] },
        ],
      },
    ],
  },

  functions,
  resources,

  package: { individually: true },
  custom: {
    // variables
    stage: '${opt:stage, self:provider.stage}',

    dynamodb_variables: {
      tables: tableNames,
      throughput: tableThroughput,

      dynamodb_local_stage: 'dev',
      dynamodb_local_endpoint: 'http://localhost:8008',
      dynamodb_local_region: 'localhost',
    },
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
};

module.exports = serverlessConfiguration;
