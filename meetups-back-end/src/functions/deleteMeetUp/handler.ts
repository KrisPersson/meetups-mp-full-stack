import { middyfy } from '@libs/lambda';
import response from '@libs/api-gateway';
import { APIGatewayEvent } from 'aws-lambda';

const deleteMeetUp = async (event: APIGatewayEvent) => {
  return response.success('deleteMeetUp');
};

export const main = middyfy(deleteMeetUp);
