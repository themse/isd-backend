import type { APIGatewayProxyStructuredResultV2 as ResponseType } from 'aws-lambda';
export type { APIGatewayProxyStructuredResultV2 as ResponseType } from 'aws-lambda';

export type ResponseBodyType = {
  data: any;
  message: string;
  statusMessage?: Status;
};

export enum StatusCode {
  OK = 200,
  ERROR = 500,
  BAD_REQUEST = 400,
}

export enum Status {
  SUCCESS = 'success',
  ERROR = 'error',
  BAD_REQUEST = 'bad request',
}

export const STATUS_MESSAGES = {
  [StatusCode.OK]: Status.SUCCESS,
  [StatusCode.BAD_REQUEST]: Status.BAD_REQUEST,
  [StatusCode.ERROR]: Status.ERROR,
};

export const DEFAULT_RESPONSE_HEADERS: ResponseType['headers'] = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};
