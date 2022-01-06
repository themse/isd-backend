import { ValidationError } from 'yup';

import { InterestService } from '@/models/interests/interest.service';
import { DynamoDBRepository } from '@/services/dynamodb/dynamodb-repository';
import { interestSchema } from '@/models/interests/interest.schema';
import { Response } from '@/common/response/response.class';
import { ApiGatewayHandler } from '@/types/api-gateway';
import { bodyParser } from '@/middlewares/body-parser.middleware';
import { StatusCode, ResponseMessage } from '@/common/response/types';

const createInterest: ApiGatewayHandler<typeof interestSchema> = async (
  event
) => {
  let response: Response;
  const { body: requestData } = event;

  try {
    const repository = new DynamoDBRepository();
    const interestService = new InterestService(repository);

    const result = await interestService.create(requestData);

    if (!result) {
      response = new Response(
        StatusCode.BAD_REQUEST,
        {},
        ResponseMessage.GET_LEAD_NOT_FOUND
      );

      return response.generate();
    }

    response = new Response(
      StatusCode.CREATED,
      result,
      ResponseMessage.CREATE_INTEREST_SUCCESS
    );

    return response.generate();
  } catch (err) {
    console.log(err);

    if (err instanceof ValidationError) {
      response = new Response(StatusCode.BAD_REQUEST, {}, err.message);
    } else {
      response = new Response(
        StatusCode.BAD_REQUEST,
        {},
        `${ResponseMessage.CREATE_INTEREST_FAIL}: ${err}`
      );
    }
  }
  return response.generate();
};

export const main = bodyParser(createInterest);
