import casual from 'casual';

import { Response } from './response.class';
import {
  ResponseBodyType,
  StatusCode,
  STATUS_MESSAGES,
  ResponseType,
  DEFAULT_RESPONSE_HEADERS,
} from './types';

const mockResponseWithoutParams: { code: StatusCode; body: ResponseBodyType } =
  {
    body: {
      statusMessage: STATUS_MESSAGES[StatusCode.BAD_REQUEST],
      data: {},
      message: '',
    },
    code: StatusCode.BAD_REQUEST,
  };

const mockResponse: { code: StatusCode; body: ResponseBodyType } = {
  body: {
    statusMessage: STATUS_MESSAGES[StatusCode.OK],
    data: {
      firstName: casual?.first_name,
      lastName: casual.last_name,
    },
    message: casual.sentence,
  },
  code: StatusCode.OK,
};

const mockGeneratedResponse: ResponseType = {
  statusCode: mockResponse.code,
  headers: DEFAULT_RESPONSE_HEADERS,
  body: JSON.stringify(mockResponse.body),
};

describe('Response', () => {
  it('Create response object without parameters', () => {
    const response = new Response();

    expect(response).toEqual(mockResponseWithoutParams);
  });

  it('Create response object with parameters', () => {
    const response = new Response(
      mockResponse.code,
      mockResponse.body.data,
      mockResponse.body.message,
    );

    expect(response).toEqual(mockResponse);
  });

  it('Generate final response', () => {
    const response = new Response(
      mockResponse.code,
      mockResponse.body.data,
      mockResponse.body.message,
    );

    const { body: responseBodyString, ...restResponse } = response.generate();
    const { body: mockResponseBodyString, ...restMockResponse } =
      mockGeneratedResponse;

    const responseBody = JSON.parse(responseBodyString);
    const mockResponseBody = JSON.parse(mockResponseBodyString);

    expect(restResponse).toEqual(restMockResponse);
    expect(mockResponseBody).toEqual(responseBody);
  });
});
