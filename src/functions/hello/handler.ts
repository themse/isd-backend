import { Response } from '../../common/response/response.class';
import { ApiGatewayHandler } from '@/types/api-gateway';
import { bodyParser } from '@/middlewares/body-parser.middleware';
import { schema } from './schema';

const hello: ApiGatewayHandler<typeof schema> = async (event) => {
  const response = new Response(
    200,
    event.body,
    `Hello ${event.body?.name}, welcome to the exciting Serverless world!`
  );

  return response.generate();
};

export const main = bodyParser(hello);
