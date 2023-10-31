import db from '@/libs/db';
import { formatDate } from '@/utils/fakeMeetups';

const MeetupModel = {
  findMeetup: async (meetupId: string) => {
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

  getAllAttendantsOfMeetup: async (meetupId: string) => {
    const { Items } = await db
      .scan({
        TableName: process.env.TABLE,
        FilterExpression: 'PK = :PK AND begins_with(SK, :SK)',
        ExpressionAttributeValues: {
          ':PK': `MEETUP#${meetupId}`,
          ':SK': 'USER#',
        },
      })
      .promise();
    return Items;
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
        },
        UpdateExpression: 'set #current = #current + :quantity',
        ExpressionAttributeValues: {
          ':quantity': quantity,
        },
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
        ConditionExpression: 'attribute_not_exists(SK)',
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
    return StartTime < formatDate(Date.now());
  },

  hasPlace: (CurrentAttendants: number, MaxAttendants: number) => {
    return CurrentAttendants === MaxAttendants;
  },

  getHistory: async (username: string = '') => {
    const data = await db
      .scan({
        TableName: process.env.TABLE,
        FilterExpression: 'begins_with(PK, :PK) AND contains(SK, :SK)',
        ExpressionAttributeValues: {
          ':PK': `MEETUP#`,
          ':SK': username,
        },
      })
      .promise();

    return data.Items;
  },
  getMeetupsUserAttending: async (PK: string = '') => {
    const data = await db
      .scan({
        TableName: process.env.TABLE,
        FilterExpression: 'PK = :PK ',
        ExpressionAttributeValues: {
          ':PK': PK,
        },
      })
      .promise();
    return data.Items;
  },

  aggregateReviews: (meetups: any[]) => {
    const attendants = meetups.filter((item) => {
      return item.SK.includes('USER#');
    });
    const meetup = meetups.find((item) => {
      return item.PK.includes('MEETUP#');
    });

    return {
      ...meetup,
      reviews: attendants,
    };
  },
};

export default MeetupModel;
