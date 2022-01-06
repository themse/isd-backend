import { LeadService } from '@/models/leads/lead.service';
import { leadSchema } from '@/models/leads/lead.schema';
import { DynamoDBRepository } from '@/services/dynamodb/dynamodb-repository';
import { ResponseMessage, StatusCode } from '@/common/response/types';
import { Response } from '@/common/response/response.class';
import { ApiGatewayHandler } from '@/types/api-gateway';
import { bodyParser } from '@/middlewares/body-parser.middleware';

const findLeads: ApiGatewayHandler<typeof leadSchema> = async () => {
  let response: Response;

  try {
    const repository = new DynamoDBRepository();
    const leadService = new LeadService(repository);

    const result = await leadService.find();

    response = new Response(
      StatusCode.OK,
      result,
      result.length === 0
        ? ResponseMessage.GET_LEAD_NOT_FOUND
        : ResponseMessage.GET_LEAD_LIST_SUCCESS
    );

    return response.generate();
  } catch (err) {
    console.log(err);
    response = new Response(
      StatusCode.BAD_REQUEST,
      {},
      `${ResponseMessage.GET_LEAD_LIST_FAIL}: ${err}`
    );
  }

  return response.generate();
};

export const main = bodyParser(findLeads);
