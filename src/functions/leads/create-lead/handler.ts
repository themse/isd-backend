import { ValidationError } from 'yup';

import { LeadModel } from '@/models/leads/lead.model';
import { leadSchema } from '@/models/leads/lead.schema';
import { DynamoDBRepository } from '@/services/dynamodb/dynamodb-repository';
import { StatusCode } from '@/common/response/types';
import { Response } from '@/common/response/response.class';
import { ApiGatewayHandler } from '@/types/api-gateway';
import { bodyParser } from '@/middlewares/body-parser.middleware';

const createLead: ApiGatewayHandler<typeof leadSchema> = async (event) => {
  let response: Response;
  const { body: requestData } = event;

  try {
    const validatedData = LeadModel.validate(requestData);
    const leadModel = new LeadModel(validatedData);

    const data = leadModel.getEntityMappings();
    const params = {
      TableName: LeadModel.tableName,
      Item: data,
    };

    const repository = new DynamoDBRepository();

    await repository.create(params);

    response = new Response(
      200,
      { leadId: leadModel.id },
      `Lead has been created` // TODO
    );

    return response.generate();
  } catch (err) {
    if (err instanceof ValidationError) {
      response = new Response(StatusCode.BAD_REQUEST, {}, err.message);
    } else {
      response = new Response(StatusCode.BAD_REQUEST, {}, err);
    }
  }
  return response.generate();
};

export const main = bodyParser(createLead);
