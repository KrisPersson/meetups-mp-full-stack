import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

const response = {
  success: (data?: unknown) => {
    const body = {
      success: true,
    };
    if (data) body['data'] = data;
    return {
      statusCode: 200,
      body: JSON.stringify(body),
    };
  },
  error: (statusCode: number, message: string) => {
    return {
      statusCode: statusCode || 500,
      body: JSON.stringify({
        success: false,
        message,
      }),
    };
  },
};

export default response;
