export interface Meetup {
  meetupId: number;
  title: string;
  date: string;
  venue: string;
  shortInfo: string;
  info: string;
  host: string;
  maxNumberOfAttendees?: number;
  numberOfAttendees?: number;
}

export interface MeetupFromDb {
  Title: string;
  Location: string;
  StartTime: string;
  Description: string;
  Host?: string;
  PK: string;
  SK: string;
  MaxAttendants: number;
  CurrentAttendants: number;
  Category?: string;
}

interface Attendant {
  SK: string;
  PK: string;
  rating?: number;
  review?: string;
}

interface MeetupDetailWithReviews extends MeetupFromDb {
  Attendants: Attendant[];
}

export interface UserDetail {
  username: string;
  upcoming: MeetupDetailWithReviews[];
  past: MeetupDetailWithReviews[];
}
