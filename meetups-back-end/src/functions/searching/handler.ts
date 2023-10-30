import { middyfy } from '@/libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import checkToken from '@/middleware/authentication';
import schema from './schema';
import db from '@/libs/db';
import { formatDate } from '@/utils/fakeMeetups';
import { IMeetupDetail } from '@/types/meetup';

const searching: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { searchText } = event.body;

  if (!searchText || !event.body.hasOwnProperty('searchText')) {
    return response.error(400, 'Missing searchText');
  }

  try {
    const { Items } = await db
      .scan({
        TableName: process.env.TABLE,
        FilterExpression: 'StartTime > :currentTime',
        ExpressionAttributeValues: {
          ':currentTime': formatDate(Date.now()),
        },
      })
      .promise();
    const meetups = Items.filter((meetup: IMeetupDetail) => {
      return meetup.Title.match(new RegExp(searchText, 'i'));
    });

    return response.success({
      data: meetups,
    });
  } catch (error) {
    return response.error(error.StatusCode, error.message);
  }
};

export const main = middyfy(searching).use(checkToken());
