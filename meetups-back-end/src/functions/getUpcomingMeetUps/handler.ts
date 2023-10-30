import { middyfy } from '@/libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import schema from './schema';
import checkToken from '@/middleware/authentication';
import db from '@/libs/db';
import { formatDate } from '@/utils/fakeMeetups';

const getUpcomingMeetUps: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { Items } = await db
    .scan({
      TableName: process.env.TABLE,
      FilterExpression: 'begins_with(PK, :key) AND StartTime > :currentTime',
      ExpressionAttributeValues: {
        ':key': 'MEETUP#',
        ':currentTime': formatDate(Date.now()),
      },
    })
    .promise();
  if (!Items || Items.length === 0)
    return response.success({ message: 'No upcoming meetups' });

  return response.success({
    meetups: Items,
  });
};

export const main = middyfy(getUpcomingMeetUps).use(checkToken());
