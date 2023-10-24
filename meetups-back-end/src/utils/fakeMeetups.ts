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

const startTimes = [
  'Tue Oct 24 2023 14:39:07 GMT+0200 ',
  'Tue Oct 31 2023 15:32:19 GMT+0200 ',
  'Tue Oct 17 2023 12:32:19 GMT+0200',
  'Mon Oct 23 2023 11:32:19 GMT+0200',
  'Mon Oct 30 2023 10:32:19 GMT+0200',
  'Mon Oct 16 2023 8:32:19 GMT+0200',
  'Sun Oct 22 2023 7:32:19 GMT+0200',
  'Sun Oct 29 2023 10:32:19 GMT+0200',
  'Fre Oct 27 2023 20:32:19 GMT+0200',
  'Fre Oct 20 2023 7:32:19 GMT+0200',
];
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

export const createRandomMeetups = (amount: number = 6) => {
  const meetups = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * titles.length);
    const randomAttendants = Math.floor(Math.random() * 10);
    const meetupId = generateMeetUpId();
    const meetup = {
      PK: meetupId,
      SK: meetupId,
      title: titles[randomIndex],
      description,
      startTime: startTimes[randomIndex],
      maxAttendants: randomAttendants,
      currentAttendants: 0,
      category: categories[randomIndex],
      location: location[randomIndex],
    };

    meetups.push(meetup);
  }
  return meetups;
};
