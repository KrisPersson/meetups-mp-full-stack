import { middyfy } from '@libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api-gateway';
import { createRandomMeetups } from '@utils/fakeMeetups';
import db from '@libs/db';
import schema from './schema';

const updateMeetUp: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const meetups = createRandomMeetups();

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
