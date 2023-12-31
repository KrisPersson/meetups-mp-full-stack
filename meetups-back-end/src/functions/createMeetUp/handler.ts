import { middyfy } from '@/libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import { createRandomMeetups } from '@/utils/fakeMeetups';
import db from '@/libs/db';
import schema from './schema';
import { IMeetupDetail } from '@/types/meetup';

const updateMeetUp: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const meetups: IMeetupDetail[] = createRandomMeetups();

  const request = meetups.map((meetup) => {
    return {
      PutRequest: {
        Item: meetup,
      },
    };
  });
  try {
    await db
      .batchWrite({
        RequestItems: {
          [process.env.TABLE]: request,
        },
      })
      .promise();
    return response.success();
  } catch (error) {
    return response.error(400, error.message);
  }
};

export const main = middyfy(updateMeetUp);
