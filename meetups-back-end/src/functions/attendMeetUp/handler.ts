import { middyfy } from '@libs/lambda';
import response from '@libs/api-gateway';
import { APIGatewayEvent } from 'aws-lambda';

const attendMeetUp = async (event: APIGatewayEvent) => {
  return response.success('attendMeetUp');
};

export const main = middyfy(attendMeetUp);
