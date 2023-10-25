import { middyfy } from '@/libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import schema from './schema';

const attendMeetUp: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  return response.success();
};

export const main = middyfy(attendMeetUp);
