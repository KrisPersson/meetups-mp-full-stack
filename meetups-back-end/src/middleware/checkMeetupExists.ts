import response, { CustomAPIGatewayProxyEvent } from '@/libs/api-gateway';
import middy from '@middy/core';
import { APIGatewayProxyResult } from 'aws-lambda';
import MeetupModel from 'src/model/meetup';

const checkMeetupExists = () => {
  const before: middy.MiddlewareFn<
    CustomAPIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (req) => {
    const { meetupId } = req.event.pathParameters;

    try {
      const meetup = await MeetupModel.getMeetup(meetupId);
      if (!meetup) {
        return response.error(400, 'Meetup does not exist');
      }

      req.event.startTime = meetup.StartTime;

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
