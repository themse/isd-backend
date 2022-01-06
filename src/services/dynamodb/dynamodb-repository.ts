import * as AWS from 'aws-sdk';

import { IBaseRepository } from '@/common/types/base-repository';
import { setupDbConfig } from './setup-db-config';
import {
	PutItem,
	PutItemOutput,
	ScanItem,
	ScanItemOutput,
	GetItem,
	GetItemOutput,
	UpdateItem,
	UpdateItemOutput,
	DeleteItem,
	DeleteItemOutput,
	QueryItem,
	QueryItemOutput,
} from './types';

setupDbConfig();

const documentClient = new AWS.DynamoDB.DocumentClient();

export class DynamoDBRepository implements IBaseRepository {
	create = async (params: PutItem): Promise<PutItemOutput> => {
		try {
			return documentClient.put(params).promise();
		} catch (error) {
			throw new Error(`create-error: ${error}`);
		}
	};

	find = async (params: ScanItem): Promise<ScanItemOutput> => {
		try {
			return documentClient.scan(params).promise();
		} catch (error) {
			throw new Error(`find-error: ${error}`);
		}
	};

	query = async (params: QueryItem): Promise<QueryItemOutput> => {
		try {
			return documentClient.query(params).promise();
		} catch (error) {
			throw new Error(`query-error: ${error}`);
		}
	};

	findOne = async (params: GetItem): Promise<GetItemOutput> => {
		try {
			return documentClient.get(params).promise();
		} catch (error) {
			throw new Error(`findOne-error: ${error}`);
		}
	};

	update = async (params: UpdateItem): Promise<UpdateItemOutput> => {
		try {
			return documentClient.update(params).promise();
		} catch (error) {
			throw new Error(`update-error: ${error}`);
		}
	};

	delete = async (params: DeleteItem): Promise<DeleteItemOutput> => {
		try {
			return documentClient.delete(params).promise();
		} catch (error) {
			throw new Error(`delete-error: ${error}`);
		}
	};
}
