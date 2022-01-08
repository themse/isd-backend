import { leadSchema } from '@/models/leads/lead.schema';
import { ResponseMessage, StatusCode } from '@/common/response/types';
import { Response } from '@/common/response/response.class';
import { ApiGatewayHandler } from '@/types/api-gateway';
import { bodyParser } from '@/middlewares/body-parser.middleware';
import appContainer from '@/common/di/container';
import { TYPES } from '@/common/di/types';
import { ILeadService } from '@/models/leads/lead.service.interface';

const findLeads: ApiGatewayHandler<typeof leadSchema> = async () => {
  let response: Response;

  try {
    const leadService = appContainer.get<ILeadService>(TYPES.LeadService);

    const result = await leadService.find();

    response = new Response(
      StatusCode.OK,
      result,
      result.length === 0
        ? ResponseMessage.GET_LEAD_NOT_FOUND
        : ResponseMessage.GET_LEAD_LIST_SUCCESS,
    );

    return response.generate();
  } catch (err) {
    console.error(err);
    response = new Response(
      StatusCode.BAD_REQUEST,
      {},
      `${ResponseMessage.GET_LEAD_LIST_FAIL}: ${err}`,
    );
  }

  return response.generate();
};

export const main = bodyParser(findLeads);
