import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import { InferType, AnySchema } from 'yup';

type APIGatewayEvent<T extends AnySchema> = Omit<
  APIGatewayProxyEvent,
  'body'
> & {
  body: InferType<T>;
};

export type ApiGatewayHandler<T extends AnySchema> = Handler<
  APIGatewayEvent<T>,
  APIGatewayProxyResult
>;
