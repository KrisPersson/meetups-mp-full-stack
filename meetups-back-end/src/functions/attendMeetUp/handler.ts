import { middyfy } from '@/libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import schema from './schema';
import checkToken from '@/middleware/authentication';
import checkMeetupExists from '@/middleware/checkMeetupExists';
import MeetupModel from 'src/model/meetup';

const attendMeetUp: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { meetupId } = event.pathParameters;
  const { username, startTime } = event;
  const hasEnded = MeetupModel.hasEnded(startTime);
  if (hasEnded) {
    return response.error(400, 'Meetup has ended. Cannot do this action');
  }
  try {
    const isAttended = await MeetupModel.getAttendant(meetupId, username);

    if (isAttended) {
      return response.error(400, 'You already attended this meetup');
    }
    await MeetupModel.updateAmountOfAttendant(meetupId, 1);
    await MeetupModel.storeAttendantForMeetup(meetupId, username);
    return response.success({
      message: 'Attend meetup successfully!',
    });
  } catch (error) {
    if (error.code === 'ConditionalCheckFailedException') {
      return response.error(400, 'Meetup is full');
    }

    return response.error(error.statusCode, error.message);
  }
};

export const main = middyfy(attendMeetUp)
  .use(checkToken())
  .use(checkMeetupExists());
