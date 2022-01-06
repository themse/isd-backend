import { AttributeType, BillingMode, ProjectionType } from '@aws-cdk/aws-dynamodb';

export interface DynamoDBTableInterface {
	Type: 'AWS::DynamoDB::Table';
	Properties: {
		TableName: string;

		KeySchema: KeySchema[];

		AttributeDefinitions: AttributeDefinitions[];

		ProvisionedThroughput: ProvisionedThroughput;

		GlobalSecondaryIndexes?: GlobalSecondaryIndexes[];

		BillingMode?: BillingMode;
	};
}

export enum KeyType {
	HASH = 'HASH',
	RANGE = 'RANGE',
}

type KeySchema = {
	AttributeName: string;
	KeyType: KeyType;
};

type AttributeDefinitions = {
	AttributeName: string;
	AttributeType: AttributeType;
};

type ProvisionedThroughput = {
	ReadCapacityUnits: number | string;
	WriteCapacityUnits: number | string;
};

type GlobalSecondaryIndexes = {
	IndexName: string;
	KeySchema: KeySchema[];
	Projection: {
		NonKeyAttributes?: string[];
		ProjectionType?: ProjectionType;
	};
	ProvisionedThroughput: ProvisionedThroughput;
};
