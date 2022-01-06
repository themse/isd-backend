import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { InferType, AnySchema } from 'yup';

type APIGatewayEvent<T extends AnySchema> = Omit<APIGatewayProxyEventV2, 'body'> & {
	body: InferType<T>;
};

export type ApiGatewayHandler<T extends AnySchema> = Handler<
	APIGatewayEvent<T>,
	APIGatewayProxyResultV2
>;
