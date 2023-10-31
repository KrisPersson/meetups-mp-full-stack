import { middyfy } from '@/libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import schema from './schema';
import checkToken from '@/middleware/authentication';
import MeetupModel from 'src/model/meetup';

const getMeetUpDetail: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { meetupId } = event.pathParameters;

  const meetup = await MeetupModel.findMeetup(meetupId);
  if (!meetup) {
    return response.error(404, 'Meetup not found');
  }
  const attendants = await MeetupModel.getAllAttendantsOfMeetup(meetupId);
  const users = attendants.map((attendant) =>
    attendant.SK.replace('USER#', '')
  );
  let data = {
    ...meetup,
    Attendants: users,
  };

  return response.success({
    data,
  });
};

export const main = middyfy(getMeetUpDetail).use(checkToken());
