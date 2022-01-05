import { ValidationError } from 'yup';

import { GetItem, PutItem } from '@/services/dynamodb/types';
import { DynamoDBRepository } from '@/services/dynamodb/dynamodb-repository';
import { InterestModel } from '@/models/interests/interest.model';
import { LeadModel } from '@/models/leads/lead.model';

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

    const validatedData = InterestModel.validate(requestData);

    const leadParam: GetItem = {
      TableName: LeadModel.tableName,
      Key: {
        id: validatedData.leadId,
      },
    };
    const lead = await repository.findOne(leadParam);
    if (Object.keys(lead).length === 0) {
      response = new Response(
        StatusCode.BAD_REQUEST,
        {},
        ResponseMessage.GET_LEAD_NOT_FOUND
      );

      return response.generate();
    }

    const interestModel = new InterestModel(validatedData);
    const data = interestModel.getEntityMappings();

    const interestParam: PutItem = {
      TableName: InterestModel.tableName,
      Item: data,
    };

    await repository.create(interestParam);

    response = new Response(
      StatusCode.CREATED,
      { interestId: interestModel.id },
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
        ResponseMessage.CREATE_INTEREST_FAIL
      );
    }
  }
  return response.generate();
};

export const main = bodyParser(createInterest);
