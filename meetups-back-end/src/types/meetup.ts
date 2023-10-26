export interface Meetup {
  Title: string;
  Description: string;
  StartTime: string;
  MaxAttendants: number;
  CurrentAttendants: number;
  Category: string;
  Location: string;
  Host: string;
}

export interface IMeetupData extends Meetup {
  PK: string;
  SK: string;
}
