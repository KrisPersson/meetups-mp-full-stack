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

  const meetup = await MeetupModel.findMeetup(meetupId);
  if (!meetup) {
    return response.error(400, 'Meetup does not exist');
  }
  const hasEnded = MeetupModel.hasEnded(meetup.StartTime);
  if (!hasEnded) {
    return response.error(400, 'Meetup has not ended. Cannot do this action');
  }

  try {
    await db
      .update({
        TableName: process.env.TABLE,
        Key: {
          PK: `MEETUP#${meetupId}`,
          SK: `USER#${event.username}`,
        },
        UpdateExpression: 'set #reviewing = :reviewing, #rating = :rating',
        ExpressionAttributeNames: {
          '#reviewing': 'Reviewing',
          '#rating': 'Rating',
        },
        ExpressionAttributeValues: {
          ':reviewing': reviewing,
          ':rating': rating,
        },
        ConditionExpression: 'attribute_exists(SK)',
      })
      .promise();
    return response.success({
      message: 'Submit review successfully!',
    });
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
