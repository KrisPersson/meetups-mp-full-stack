import { middyfy } from '@libs/lambda';

import response from '@libs/api-gateway';
import { APIGatewayEvent } from 'aws-lambda';

const submitReview = async (event: APIGatewayEvent) => {
  return response.success('submitReview');
};

export const main = middyfy(submitReview);
