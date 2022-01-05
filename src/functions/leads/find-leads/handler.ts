import { InterestModel } from '@/models/interests/interest.model';
import { LeadModel } from '@/models/leads/lead.model';
import { leadSchema } from '@/models/leads/lead.schema';
import { DynamoDBRepository } from '@/services/dynamodb/dynamodb-repository';
import { ResponseMessage, StatusCode } from '@/common/response/types';
import { Response } from '@/common/response/response.class';
import { ApiGatewayHandler } from '@/types/api-gateway';
import { bodyParser } from '@/middlewares/body-parser.middleware';
import { QueryItem, ScanItem } from '@/services/dynamodb/types';

const findLeads: ApiGatewayHandler<typeof leadSchema> = async (event) => {
  let response: Response;
  // TODO check for scanFilter
  // const { queryStringParameters } = event;

  try {
    const repository = new DynamoDBRepository();
    const leadParams: ScanItem = {
      TableName: LeadModel.tableName,
    };

    const leadsData = await repository.find(leadParams);

    if (leadsData.Count === 0) {
      response = new Response(
        StatusCode.OK,
        leadsData,
        ResponseMessage.GET_LEAD_NOT_FOUND
      );
    }

    let result = {};

    for (const leadItem of leadsData.Items) {
      const interestsParam: QueryItem = {
        TableName: InterestModel.tableName,
        IndexName: 'lead_index',
        KeyConditionExpression: 'lead_id = :v_lead_id',
        ExpressionAttributeValues: {
          ':v_lead_id': leadItem.id,
        },
        Limit: 15,
      };

      const interestsData = await repository.query(interestsParam);
      result[leadItem.id] = {
        ...leadItem,
        interests: interestsData?.Items,
      };
    }

    response = new Response(
      StatusCode.OK,
      Object.values(result),
      ResponseMessage.GET_LEAD_LIST_SUCCESS
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
