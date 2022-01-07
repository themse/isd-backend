import { AttributeType, ProjectionType } from '@aws-cdk/aws-dynamodb';

import { DynamoDBTableInterface, KeyType } from '../dynamodb-table.interface';
import { tableNames, tableThroughput } from '../config';

export const interestsTable: DynamoDBTableInterface = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: tableNames.interests_table,
    KeySchema: [
      { AttributeName: 'id', KeyType: KeyType.HASH },
      { AttributeName: 'lead_id', KeyType: KeyType.RANGE },
    ],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: AttributeType.STRING },
      { AttributeName: 'lead_id', AttributeType: AttributeType.STRING },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: tableThroughput.throughput,
      WriteCapacityUnits: tableThroughput.throughput,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'lead_index',
        KeySchema: [
          {
            AttributeName: 'lead_id',
            KeyType: KeyType.HASH,
          },
        ],
        Projection: {
          ProjectionType: ProjectionType.ALL,
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: tableThroughput.throughput,
          WriteCapacityUnits: tableThroughput.throughput,
        },
      },
    ],
  },
};
