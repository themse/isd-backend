import * as AWS from 'aws-sdk';

// Repository types
export type PutItem = AWS.DynamoDB.DocumentClient.PutItemInput;
export type PutItemOutput = AWS.DynamoDB.DocumentClient.PutItemOutput;

export type UpdateItem = AWS.DynamoDB.DocumentClient.UpdateItemInput;
export type UpdateItemOutput = AWS.DynamoDB.DocumentClient.UpdateItemOutput;

export type ScanItem = AWS.DynamoDB.DocumentClient.ScanInput;
export type ScanItemOutput = AWS.DynamoDB.DocumentClient.ScanOutput;

export type QueryItem = AWS.DynamoDB.DocumentClient.QueryInput;
export type QueryItemOutput = AWS.DynamoDB.DocumentClient.QueryOutput;

export type GetItem = AWS.DynamoDB.DocumentClient.GetItemInput;
export type GetItemOutput = AWS.DynamoDB.DocumentClient.GetItemOutput;

export type DeleteItem = AWS.DynamoDB.DocumentClient.DeleteItemInput;
export type DeleteItemOutput = AWS.DynamoDB.DocumentClient.DeleteItemOutput;

export type Item = { [index: string]: string };
