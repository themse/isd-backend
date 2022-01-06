import { ValidationError } from 'yup';

import { leadSchema } from '@/models/leads/lead.schema';
import { DynamoDBRepository } from '@/services/dynamodb/dynamodb-repository';
import { ResponseMessage, StatusCode } from '@/common/response/types';
import { Response } from '@/common/response/response.class';
import { ApiGatewayHandler } from '@/types/api-gateway';
import { bodyParser } from '@/middlewares/body-parser.middleware';
import { LeadService } from '@/models/leads/lead.service';

const createLead: ApiGatewayHandler<typeof leadSchema> = async (event) => {
	let response: Response;
	const { body: requestData } = event;

	try {
		const repository = new DynamoDBRepository();
		const leadService = new LeadService(repository);

		const result = await leadService.create(requestData);

		response = new Response(StatusCode.CREATED, result, ResponseMessage.CREATE_LEAD_SUCCESS);

		return response.generate();
	} catch (err) {
		console.log(err);

		if (err instanceof ValidationError) {
			response = new Response(StatusCode.BAD_REQUEST, {}, err.message);
		} else {
			response = new Response(
				StatusCode.BAD_REQUEST,
				{},
				`${ResponseMessage.CREATE_LEAD_FAIL}: ${err}`,
			);
		}
	}
	return response.generate();
};

export const main = bodyParser(createLead);
