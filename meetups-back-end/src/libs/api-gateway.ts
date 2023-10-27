import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
export interface CustomAPIGatewayProxyEvent extends APIGatewayProxyEvent {
  username?: string;
}
type ValidatedAPIGatewayProxyEvent<S> = Omit<
  CustomAPIGatewayProxyEvent,
  'body'
> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

const response = {
  success: (data?: any) => {
    const body = {
      success: true,
      ...data,
    };
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
