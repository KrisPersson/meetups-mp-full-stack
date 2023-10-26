import db from '@/libs/db';
import { convertDateToNumber } from '@/utils/fakeMeetups';

const MeetupModel = {
  getMeetup: async (meetupId: string) => {
    const data = await db
      .get({
        TableName: process.env.TABLE,
        Key: {
          PK: 'MEETUP#' + meetupId,
          SK: meetupId,
        },
        ReturnConsumedCapacity: 'NONE',
      })
      .promise();

    return data.Item;
  },

  getAttendant: async (meetupId: string, username: string) => {
    const { Item } = await db
      .get({
        TableName: process.env.TABLE,
        Key: {
          PK: 'MEETUP#' + meetupId,
          SK: 'USER#' + username,
        },
      })
      .promise();
    return Item;
  },

  updateAmountOfAttendant: async (meetupId: string, quantity: number) => {
    return await db
      .update({
        TableName: process.env.TABLE,
        Key: {
          PK: 'MEETUP#' + meetupId,
          SK: meetupId,
        },
        ExpressionAttributeNames: {
          '#current': 'CurrentAttendants',
          '#max': 'MaxAttendants',
        },
        UpdateExpression: 'set #current = #current + :quantity',
        ExpressionAttributeValues: {
          ':quantity': quantity,
        },
        ConditionExpression: '#current < #max ',
      })
      .promise();
  },

  storeAttendantForMeetup: async (meetupId: string, username: string) => {
    await db
      .put({
        TableName: process.env.TABLE,
        Item: {
          PK: 'MEETUP#' + meetupId,
          SK: 'USER#' + username,
        },
      })
      .promise();
  },
  removeAttendant: async (meetupId: string, username: string) => {
    return await db
      .delete({
        TableName: process.env.TABLE,
        Key: {
          PK: 'MEETUP#' + meetupId,
          SK: 'USER#' + username,
        },
        ConditionExpression: 'attribute_exists(SK)',
      })
      .promise();
  },
  hasEnded: (StartTime: string) => {
    const currentTime = convertDateToNumber();
    const startTime = convertDateToNumber(StartTime);
    return currentTime > startTime;
  },
};

export default MeetupModel;
