import * as AWS from 'aws-sdk';

import { StatusCode } from '@/common/response/types';
import { Response } from '@/common/response/response.class';
import { initDb } from './init';
import {
  PutItem,
  PutItemOutput,
  ScanItem,
  ScanOutput,
  GetItem,
  GetItemOutput,
  UpdateItem,
  UpdateItemOutput,
  DeleteItem,
  DeleteItemOutput,
} from './types';

// aws database configuration
initDb();

const documentClient = new AWS.DynamoDB.DocumentClient();

export class DynamoDBRepository {
  create = async (params: PutItem): Promise<PutItemOutput> => {
    try {
      return await documentClient.put(params).promise();
    } catch (error) {
      throw new Response(StatusCode.ERROR, {}, `create-error: ${error}`);
    }
  };

  find = async (params: ScanItem): Promise<ScanOutput> => {
    try {
      return documentClient.scan(params).promise();
    } catch (error) {
      throw new Response(StatusCode.ERROR, {}, `find-error: ${error}`);
    }
  };

  findOne = async (params: GetItem): Promise<GetItemOutput> => {
    try {
      return documentClient.get(params).promise();
    } catch (error) {
      throw new Response(StatusCode.ERROR, {}, `findOne-error: ${error}`);
    }
  };

  update = async (params: UpdateItem): Promise<UpdateItemOutput> => {
    try {
      return documentClient.update(params).promise();
    } catch (error) {
      throw new Response(StatusCode.ERROR, {}, `update-error: ${error}`);
    }
  };

  delete = async (params: DeleteItem): Promise<DeleteItemOutput> => {
    try {
      return await documentClient.delete(params).promise();
    } catch (error) {
      throw new Response(StatusCode.ERROR, {}, `delete-error: ${error}`);
    }
  };
}
