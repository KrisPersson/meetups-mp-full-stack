import response, { APIGatewayProxyEventWithUsername } from '@/libs/api-gateway';
import { convertDateToNumber } from '@/utils/fakeMeetups';
import middy from '@middy/core';
import { APIGatewayProxyResult } from 'aws-lambda';
import MeetupModel from 'src/model/meetup';

const checkMeetupExists = () => {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEventWithUsername,
    APIGatewayProxyResult
  > = async (req) => {
    const { meetupId } = req.event.pathParameters;

    try {
      const meetup = await MeetupModel.getMeetup(meetupId);
      if (!meetup) {
        return response.error(400, 'Meetup does not exist');
      }
      const currentTime = convertDateToNumber();
      const startTime = convertDateToNumber(meetup.StartTime);
      if (startTime < currentTime) {
        return response.error(400, 'Meetup has ended. Cannot do this action');
      }

      return req.response;
    } catch (error) {
      return response.error(401, error.message);
    }
  };

  return {
    before,
  };
};

export default checkMeetupExists;
