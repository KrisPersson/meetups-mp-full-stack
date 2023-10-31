import { middyfy } from '@/libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import schema from './schema';
import checkToken from '@/middleware/authentication';
import db from '@/libs/db';
import { formatDate } from '@/utils/fakeMeetups';
import MeetupModel from 'src/model/meetup';

const getMeetUpDetail: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { meetupId } = event.pathParameters;

  const meetup = await MeetupModel.findMeetup(meetupId);
  const attendants = await MeetupModel.getAllAttendantsOfMeetup(meetupId);
  const users = attendants.map((attendant) =>
    attendant.SK.replace('USER#', '')
  );
  let data = {
    ...meetup,
    attendants: users,
  };

  return response.success({
    data: data,
  });
};

export const main = middyfy(getMeetUpDetail).use(checkToken());
