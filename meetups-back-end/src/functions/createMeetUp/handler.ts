import { middyfy } from '@libs/lambda';
import response from '@libs/api-gateway';
import { APIGatewayEvent } from 'aws-lambda';
import { createRandomMeetups } from '@utils/fakeMeetups';
import db from '@libs/db';

const updateMeetUp = async (event: APIGatewayEvent) => {
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
