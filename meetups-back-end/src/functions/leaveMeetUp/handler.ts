import response from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';

const leaveMeetUp = async (event: APIGatewayEvent) => {
  return response.success();
};

export const main = middyfy(leaveMeetUp);
