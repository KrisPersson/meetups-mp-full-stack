import { middyfy } from '@/libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import schema from './schema';
import checkToken from '@/middleware/authentication';
import db from '@/libs/db';
import { IMeetupData } from '@/types/meetup';
import { convertDateToNumber } from '@/utils/fakeMeetups';

const getUpcomingMeetUps: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { Items } = await db
    .scan({
      TableName: process.env.TABLE,
      FilterExpression: 'begins_with(PK, :key)',
      ExpressionAttributeValues: {
        ':key': 'MEETUP#',
      },
    })
    .promise();
  if (!Items) return response.success({ message: 'No upcoming meetups' });
  const currentTime = convertDateToNumber();
  const upcomingMeetups = Items.filter((item: IMeetupData) => {
    return convertDateToNumber(item.StartTime) >= currentTime;
  });

  return response.success({
    meetups: upcomingMeetups,
  });
};

export const main = middyfy(getUpcomingMeetUps).use(checkToken());
