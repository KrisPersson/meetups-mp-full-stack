import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import { middyfy } from '@/libs/lambda';
import schema from './schema';
import checkToken from '@/middleware/authentication';
import MeetupModel from 'src/model/meetup';
import validation from '@/middleware/validation';
import { meetupIdSchema } from '@/utils/validationSchema';

const leaveMeetUp: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { meetupId } = event.body;
  const { username } = event;
  const meetup = await MeetupModel.findMeetup(meetupId);
  if (!meetup) {
    return response.error(404, 'Meetup does not exist');
  }
  const hasEnded = MeetupModel.hasEnded(meetup.StartTime);
  if (hasEnded) {
    return response.error(400, 'Meetup has ended. Cannot do this action');
  }

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
  .use(validation(meetupIdSchema));
