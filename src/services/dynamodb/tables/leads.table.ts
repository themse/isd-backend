import { AttributeType, ProjectionType } from '@aws-cdk/aws-dynamodb';

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
			{ AttributeName: 'email', AttributeType: AttributeType.STRING },
			{ AttributeName: 'phone', AttributeType: AttributeType.STRING },
		],
		ProvisionedThroughput: {
			ReadCapacityUnits: '${self:custom.table_throughput}',
			WriteCapacityUnits: '${self:custom.table_throughput}',
		},
		GlobalSecondaryIndexes: [
			{
				IndexName: 'lead_email_index',
				KeySchema: [{ AttributeName: 'email', KeyType: KeyType.HASH }],
				Projection: {
					ProjectionType: ProjectionType.ALL,
				},
				ProvisionedThroughput: {
					ReadCapacityUnits: '${self:custom.table_throughput}',
					WriteCapacityUnits: '${self:custom.table_throughput}',
				},
			},
			{
				IndexName: 'lead_phone_index',
				KeySchema: [{ AttributeName: 'phone', KeyType: KeyType.HASH }],
				Projection: {
					ProjectionType: ProjectionType.ALL,
				},
				ProvisionedThroughput: {
					ReadCapacityUnits: '${self:custom.table_throughput}',
					WriteCapacityUnits: '${self:custom.table_throughput}',
				},
			},
		],
	},
};
