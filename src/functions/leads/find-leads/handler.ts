import { LeadModel } from '@/models/leads/lead.model';
import { leadSchema } from '@/models/leads/lead.schema';
import { DynamoDBRepository } from '@/services/dynamodb/dynamodb-repository';
import { ResponseMessage, StatusCode } from '@/common/response/types';
import { Response } from '@/common/response/response.class';
import { ApiGatewayHandler } from '@/types/api-gateway';
import { bodyParser } from '@/middlewares/body-parser.middleware';
import { ScanItem } from '@/services/dynamodb/types';

const findLeads: ApiGatewayHandler<typeof leadSchema> = async (event) => {
  let response: Response;
  // TODO check for scanFilter
  // const { queryStringParameters } = event;

  try {
    const repository = new DynamoDBRepository();
    // TODO add sorting by created_at desc
    const params: ScanItem = {
      TableName: LeadModel.tableName,
    };

    const result = await repository.find(params);

    response = new Response(
      StatusCode.OK,
      result,
      result.Count > 0
        ? ResponseMessage.GET_LEAD_LIST_SUCCESS
        : ResponseMessage.GET_LEAD_NOT_FOUND
    );

    return response.generate();
  } catch (err) {
    console.log(err);
    response = new Response(
      StatusCode.BAD_REQUEST,
      {},
      ResponseMessage.GET_LEAD_LIST_FAIL
    );
  }

  return response.generate();
};

export const main = bodyParser(findLeads);
