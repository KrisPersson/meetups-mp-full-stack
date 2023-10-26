import { middyfy } from '@/libs/lambda';

import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import schema from './schema';
import checkToken from '@/middleware/authentication';
import db from '@/libs/db';
import validation from '@/middleware/validation';
import { reviewSchema } from '@/utils/validationSchema';
import MeetupModel from 'src/model/meetup';

const submitReview: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { reviewing, rating, meetupId } = event.body;

  const { username, startTime } = event;
  const hasEnded = MeetupModel.hasEnded(startTime);
  if (!hasEnded) {
    return response.error(400, 'Meetup has not ended. Cannot do this action');
  }

  let point: number = 1;
  if (rating) {
    point = rating;
  }

  try {
    await db
      .update({
        TableName: process.env.TABLE,
        Key: {
          PK: `MEETUP#${meetupId}`,
          SK: `USER#${username}`,
        },
        UpdateExpression: 'set #reviewing = :reviewing, #rating = :rating',
        ExpressionAttributeNames: {
          '#reviewing': 'Reviewing',
          '#rating': 'Rating',
        },
        ExpressionAttributeValues: {
          ':reviewing': reviewing,
          ':rating': point,
        },
        ConditionExpression: 'attribute_exists(SK)',
      })
      .promise();
    return response.success();
  } catch (error) {
    if (error.code === 'ConditionalCheckFailedException') {
      return response.error(400, 'You are not attending this meetup');
    }
    return response.error(error.statusCode, error.message);
  }
};

export const main = middyfy(submitReview)
  .use(validation(reviewSchema))
  .use(checkToken());
