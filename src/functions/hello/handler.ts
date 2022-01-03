import { ApiGatewayHandler } from '@/types/api-gateway';
import { bodyParser } from '@/middlewares/body-parser.middleware';
import { schema } from './schema';

const hello: ApiGatewayHandler<typeof schema> = async (event) => {
  return {
    statusCode: 200,
    message: `Hello ${event.body?.name}, welcome to the exciting Serverless world!`,
    body: JSON.stringify(event),
  };
};

export const main = bodyParser(hello);
