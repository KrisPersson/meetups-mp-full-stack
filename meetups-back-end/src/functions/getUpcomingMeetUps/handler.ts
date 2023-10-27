import { middyfy } from '@/libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import schema from './schema';
import checkToken from '@/middleware/authentication';
import db from '@/libs/db';
import { IMeetupDetail } from '@/types/meetup';
import MeetupModel from 'src/model/meetup';

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
  if (!Items || Items.length === 0)
    return response.success({ message: 'No upcoming meetups' });

  const upcomingMeetups = Items.filter((item: IMeetupDetail) => {
    return (
      !MeetupModel.hasEnded(item.StartTime) && !item.SK.startsWith('USER#')
    );
  });

  return response.success({
    meetups: upcomingMeetups,
  });
};

export const main = middyfy(getUpcomingMeetUps).use(checkToken());
