import { ValidationError } from 'yup';

import { interestSchema } from '@/models/interests/interest.schema';
import { Response } from '@/common/response/response.class';
import { ApiGatewayHandler } from '@/types/api-gateway';
import { bodyParser } from '@/middlewares/body-parser.middleware';
import { StatusCode, ResponseMessage } from '@/common/response/types';
import appContainer from '@/common/di/container';
import { TYPES } from '@/common/di/types';
import { IInterestService } from '@/models/interests/interest.service.interface';

const createInterest: ApiGatewayHandler<typeof interestSchema> = async (
  event,
) => {
  let response: Response;
  const { body: requestData } = event;

  try {
    const interestService = appContainer.get<IInterestService>(
      TYPES.InterestService,
    );

    const result = await interestService.create(requestData);

    if (!result) {
      response = new Response(
        StatusCode.BAD_REQUEST,
        {},
        ResponseMessage.GET_LEAD_NOT_FOUND,
      );

      return response.generate();
    }

    response = new Response(
      StatusCode.CREATED,
      result,
      ResponseMessage.CREATE_INTEREST_SUCCESS,
    );

    return response.generate();
  } catch (err) {
    console.error(err);

    if (err instanceof ValidationError) {
      response = new Response(StatusCode.BAD_REQUEST, {}, err.message);
    } else {
      response = new Response(
        StatusCode.BAD_REQUEST,
        {},
        `${ResponseMessage.CREATE_INTEREST_FAIL}: ${err}`,
      );
    }
  }
  return response.generate();
};

export const main = bodyParser(createInterest);
