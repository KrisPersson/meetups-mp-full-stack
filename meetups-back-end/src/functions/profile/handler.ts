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
    const history = await MeetupModel.getHistory(username);
    if (history.length > 0) {
      const meetupIdArray = history.map((item) => {
        return item.PK.split('#')[1];
      });
      const meetups = await MeetupModel.getMultipleMeetups(meetupIdArray);

      for (let index = 0; index < meetups.length; index++) {
        // const sortedMeetup = MeetupModel.aggregateReviews(list);
        const hasEnded = MeetupModel.hasEnded(meetups[index].StartTime);
        if (hasEnded) {
          data.past.push(meetups[index]);
          continue;
        }
        data.upcoming.push(meetups[index]);
      }
    }
    return response.success({
      username: username,
      data,
    });
  } catch (error) {
    return response.error(error.StatusCode, error.message);
  }
};

export const main = middyfy(profile).use(checkToken());
