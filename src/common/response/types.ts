import type { APIGatewayProxyStructuredResultV2 as ResponseType } from 'aws-lambda';
export type { APIGatewayProxyStructuredResultV2 as ResponseType } from 'aws-lambda';

export type ResponseBodyType = {
  data: any;
  message: string;
  statusMessage?: Status;
};

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  ERROR = 500,
  BAD_REQUEST = 400,
}

export enum Status {
  SUCCESS = 'success',
  ERROR = 'error',
  BAD_REQUEST = 'bad request',
  CREATED = 'created',
}

export const STATUS_MESSAGES = {
  [StatusCode.OK]: Status.SUCCESS,
  [StatusCode.BAD_REQUEST]: Status.BAD_REQUEST,
  [StatusCode.ERROR]: Status.ERROR,
  [StatusCode.CREATED]: Status.CREATED,
};

export const DEFAULT_RESPONSE_HEADERS: ResponseType['headers'] = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export enum ResponseMessage {
  CREATE_LEAD_SUCCESS = 'Lead is successfully created',
  CREATE_LEAD_FAIL = "Lead can't be created",

  GET_LEAD_LIST_SUCCESS = 'A list of leads are successfully retrieved',
  GET_LEAD_LIST_FAIL = "A list of leads can't be retrieved",
  GET_LEAD_NOT_FOUND = 'Leads not found',

  ERROR = 'Unknown error',
  INVALID_REQUEST = 'Invalid Request',
}
