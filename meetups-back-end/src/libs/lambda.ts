import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const middyfy = (handler: any) => {
  return middy(handler).use(middyJsonBodyParser());
};
