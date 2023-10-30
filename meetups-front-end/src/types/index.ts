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