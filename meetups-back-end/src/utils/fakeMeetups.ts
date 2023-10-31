import { IMeetupDetail } from '@/types/meetup';
import { generateMeetUpId } from './functions';

const titles = [
  'Charming Apple',
  'Platform as a Service',
  'Beastly The Dark Knight',
  'Hilarious Belarus',
  'Frantic Manila',
  'Impressive Chevrolet Silverado',
  'Sensational Shrek',
  'Smart Fox',
  'Smart Bitcoin',
  'Wonderful North Macedonia',
];

const description =
  'Everyone has a lot on their plates. It’s important to define how long the meeting will be and how much time you’ll spend on each agenda item—and stick 👏🏽 to 👏🏽 it.';

const location = [
  'Event centers',
  'Eateries and coffee shops',
  'Resorts',
  'Cruise ships',
  'Islands',
  'Ranches',
  'Hotels',
  'Bookstores',
  'Public libraries',
  'The Internet',
];
const categories = [
  'Problem-solving meetings',
  'Planning meetings',
  'Decision-making meetings',
  'Status Update',
  'Team building',
  'Brainstorming',
  'Informal meetings',
  'Formal meetings',
  'Information sharing',
  'Magic Poopers meeting',
];
const names = [
  'Mark',
  'Kristofer',
  'James',
  'Robert',
  'Michael',
  'William',
  'David',
  'Richard',
  'Charles',
  'Pablo',
];

export const createRandomMeetups = (amount: number = 6) => {
  const meetups = [];

  for (let i = 0; i < amount; i++) {
    const randomExtraDays = generateRandomNumber();
    const meetupId = generateMeetUpId();
    const startTime = createStartTime(
      i % 2 === 0 ? randomExtraDays : -Math.abs(randomExtraDays)
    );
    const meetup: IMeetupDetail = {
      PK: 'MEETUP#' + meetupId,
      SK: meetupId,
      Title: titles[generateRandomNumber()],
      Description: description,
      StartTime: startTime,
      MaxAttendants: generateRandomNumber(),
      CurrentAttendants: 0,
      Category: categories[generateRandomNumber()],
      Location: location[generateRandomNumber()],
      Host: names[generateRandomNumber()],
    };

    meetups.push(meetup);
  }
  return meetups;
};

function generateRandomNumber() {
  return Math.ceil(Math.random() * 10);
}

function createStartTime(randomExtraDays: number) {
  let date = new Date();

  date.setDate(date.getDate() + randomExtraDays);

  return formatDate(date.getTime());
}

export function formatDate(date: number) {
  const timezoneOffSet = new Date().getTimezoneOffset() * 60000; //offset in milliseconds

  const localISOTime = new Date(date - timezoneOffSet)
    .toISOString()
    .slice(0, -8);
  return localISOTime;
}
