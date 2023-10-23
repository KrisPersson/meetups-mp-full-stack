import { middyfy } from '@libs/lambda';

import response from '@libs/api-gateway';
import { APIGatewayEvent } from 'aws-lambda';

const signup = async (event: APIGatewayEvent) => {
  return response.success('signup');
};

export const main = middyfy(signup);
