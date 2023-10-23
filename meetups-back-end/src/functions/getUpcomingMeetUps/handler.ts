import { middyfy } from '@libs/lambda';
import response from '@libs/api-gateway';
import { APIGatewayEvent } from 'aws-lambda';

const getUpcomingMeetUps = async (event: APIGatewayEvent) => {
  return response.success('getUpcomingMeetUps');
};

export const main = middyfy(getUpcomingMeetUps);
