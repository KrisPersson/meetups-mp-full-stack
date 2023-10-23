import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent } from 'aws-lambda';
export interface APIGatewayProxyEventWithUser extends APIGatewayProxyEvent {
  user: string;
}

export const middyfy = (handler: any) => {
  return middy(handler).use(middyJsonBodyParser());
};
