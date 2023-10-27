import { middyfy } from '@/libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import schema from './schema';
import checkToken from '@/middleware/authentication';
import MeetupModel from 'src/model/meetup';

const attendMeetUp: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { meetupId } = event.pathParameters;
  const { username } = event;
  const meetup = await MeetupModel.findMeetup(meetupId);
  if (!meetup) {
    return response.error(400, 'Meetup does not exist');
  }
  // const hasEnded = MeetupModel.hasEnded(meetup.StartTime);
  // if (hasEnded) {
  //   return response.error(400, 'Meetup has ended. Cannot do this action');
  // }

  const isFull = MeetupModel.meetUpFull(
    meetup.CurrentAttendants,
    meetup.MaxAttendants
  );
  if (isFull) {
    return response.error(400, 'Meetup is full');
  }
  try {
    await MeetupModel.storeAttendantForMeetup(meetupId, username);
    await MeetupModel.updateAmountOfAttendant(meetupId, 1);
    return response.success({
      message: 'Attend meetup successfully!',
    });
  } catch (error) {
    if (error.code === 'ConditionalCheckFailedException') {
      return response.error(400, 'You are already attending this meetup');
    }

    return response.error(error.statusCode, error.message);
  }
};

export const main = middyfy(attendMeetUp).use(checkToken());
