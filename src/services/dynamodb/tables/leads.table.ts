import { AttributeType } from '@aws-cdk/aws-dynamodb';

import { DynamoDBTableInterface, KeyType } from '../dynamodb-table.interface';

export const leadsTable: DynamoDBTableInterface = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: '${self:custom.leads_table}',
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: KeyType.HASH,
      },
    ],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: AttributeType.STRING },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: '${self:custom.table_throughput}',
      WriteCapacityUnits: '${self:custom.table_throughput}',
    },
  },
};
