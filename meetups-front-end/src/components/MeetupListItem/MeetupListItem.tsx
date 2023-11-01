import "./MeetupListItem.scss";
import { MeetupFromDb } from "../../types/index";
import { truncate } from "../../utils/index";

type MeetupFromDbPlusSeeMeetup = MeetupFromDb & {
  seeMeetup: (meetup: MeetupFromDb) => void;
};

export function MeetupListItem(props: MeetupFromDbPlusSeeMeetup) {
  const {
    PK,
    Title,
    StartTime,
    Location,
    Host,
    Description,
    MaxAttendants,
    CurrentAttendants,
    seeMeetup,
  } = props;

  return (
    <section
      key={PK}
      className="meetups"
      onClick={() =>
        seeMeetup({
          PK,
          Title,
          StartTime,
          Location,
          Host,
          Description,
          MaxAttendants,
          CurrentAttendants,
          SK: props.SK,
        })
      }
    >
      <h2 className="meetups__meetupsTitle">{Title}</h2>
      <p>
        {StartTime} | {Location} | {truncate(Description, 40)} | {Host}
      </p>
    </section>
  );
}
