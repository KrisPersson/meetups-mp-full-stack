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