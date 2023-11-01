import "./MeetupListItem.scss";
import { MeetupFromDb } from "../../types/index";
import { truncate } from "../../utils/index";

type MeetupFromDbPlusSeeMeetup = MeetupFromDb & {
  seeMeetup: (meetup: MeetupFromDb) => void;
};

export function MeetupListItem(props: MeetupFromDbPlusSeeMeetup) {
  const { PK, SK, Title, StartTime, Location, Host, Description, seeMeetup } =
    props;

  return (
    <section key={PK} className="meetups" onClick={() => seeMeetup(SK)}>
      <h2 className="meetups__meetupsTitle">{Title}</h2>
      <p>
        {StartTime} | {Location} | {truncate(Description, 40)} | {Host}
      </p>
    </section>
  );
}
