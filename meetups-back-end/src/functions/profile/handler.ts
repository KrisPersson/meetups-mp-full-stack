import { middyfy } from '@libs/lambda';
import response from '@libs/api-gateway';
import { APIGatewayEvent } from 'aws-lambda';

const profile = async (event: APIGatewayEvent) => {
  return response.success('profile');
};

export const main = middyfy(profile);
