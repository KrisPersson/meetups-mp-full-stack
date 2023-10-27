export interface Keys {
  PK: string;
  SK: string;
}

export interface IMeetupDetail extends Keys {
  Title: string;
  Description: string;
  StartTime: string;
  MaxAttendants: number;
  CurrentAttendants: number;
  Category: string;
  Location: string;
  Host: string;
}

export interface IAttendant extends Keys {
  Reviewing: string;
  Rating: number;
}
