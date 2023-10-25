import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import { middyfy } from '@/libs/lambda';
import schema from './schema';
import checkToken from '@/middleware/authentication';
import checkMeetupExists from '@/middleware/checkMeetupExists';
import MeetupModel from 'src/model/meetup';

const leaveMeetUp: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { meetupId } = event.pathParameters;
  const { username } = event;

  try {
    await MeetupModel.removeAttendant(meetupId, username);
    await MeetupModel.updateAmountOfAttendant(meetupId, -1);
    return response.success({
      message: 'Leave meetup successfully!',
    });
  } catch (error) {
    if (error.code === 'ConditionalCheckFailedException') {
      return response.error(400, 'You are not attending this meetup');
    }
    return response.error(error.statusCode, error.message);
  }
};

export const main = middyfy(leaveMeetUp)
  .use(checkToken())
  .use(checkMeetupExists());
