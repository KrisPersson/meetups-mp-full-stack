import { middyfy } from '@libs/lambda';
import response from '@libs/api-gateway';
import { APIGatewayEvent } from 'aws-lambda';

const updateMeetUp = async (event: APIGatewayEvent) => {
  return response.success('updateMeetUp');
};

export const main = middyfy(updateMeetUp);
