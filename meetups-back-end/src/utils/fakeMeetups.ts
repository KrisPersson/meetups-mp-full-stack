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
    const randomNumber = Math.floor(Math.random() * 10);
    const meetupId = generateMeetUpId();
    const startTime = createStartTime(
      i % 2 === 0 ? randomNumber : -Math.abs(randomNumber)
    );
    const meetup: IMeetupDetail = {
      PK: 'MEETUP#' + meetupId,
      SK: meetupId,
      Title: titles[randomNumber],
      Description: description,
      StartTime: startTime,
      MaxAttendants: randomNumber,
      CurrentAttendants: 0,
      Category: categories[randomNumber],
      Location: location[randomNumber],
      Host: names[randomNumber],
    };

    meetups.push(meetup);
  }
  return meetups;
};

function createStartTime(randomExtraDays: number) {
  let date = new Date();

  date.setDate(date.getDate() + randomExtraDays);

  return formatDate(date);
}

export function formatDate(date: Date) {
  return date.toLocaleString(undefined, {
    timeZone: 'Europe/Stockholm',
    hour12: false,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function convertDateToNumber(date: Date | string = new Date()) {
  return new Date(date).getTime();
}
