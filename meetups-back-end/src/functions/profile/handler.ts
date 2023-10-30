import { middyfy } from '@/libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import checkToken from '@/middleware/authentication';
import schema from './schema';
import MeetupModel from 'src/model/meetup';

const profile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { username } = event;
  const data = {
    upcoming: [],
    past: [],
  };
  try {
    const listOfMeetups = await MeetupModel.getHistory(username);

    for (let index = 0; index < listOfMeetups.length; index++) {
      const { PK } = listOfMeetups[index];
      const list = await MeetupModel.getMeetupsUserAttending(PK);

      const sortedMeetup = MeetupModel.aggregateReviews(list);
      const hasEnded = MeetupModel.hasEnded(sortedMeetup.StartTime);
      if (hasEnded) {
        data.past.push(sortedMeetup);
        continue;
      }
      data.upcoming.push(sortedMeetup);
    }
    return response.success({
      data,
    });
  } catch (error) {
    return response.error(error.StatusCode, error.message);
  }
};

export const main = middyfy(profile).use(checkToken());
