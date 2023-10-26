import "./MeetupsView.scss";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import { apiGetUpcomingMeetUps } from "../../api/meetups";
// import meetupArr from "../../components/Meetups/Meetups";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MeetupsView() {
  const navigate = useNavigate();
  const [meetupItems, setMeetupItems] = useState<Meetup[]>([]);

  useEffect(() => {
    fetchMeetups();
  });

  async function fetchMeetups() {
    const dataFromDb = await apiGetUpcomingMeetUps(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imphbm5lIiwiaWF0IjoxNjk4MzIwNjk3LCJleHAiOjE2OTg0MDcwOTd9.WmapCLhVEiZRflztpZL0NhXIEXhb4o93YlxnbqeLY6A" ||
        ""
    );
    setMeetupItems([...dataFromDb.meetups]);
  }

  function truncate(str: string, n: number) {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  }

  const renderedMeetupItems =
    meetupItems.length > 0
      ? meetupItems.map((meetup) => (
          <section
            key={meetup.PK}
            className="meetups"
            onClick={() => seeMeetup(meetup)()}
          >
            <h2 className="meetups__meetupsTitle">{meetup.Title}</h2>
            <p>
              {meetup.StartTime} | {meetup.Location} |{" "}
              {truncate(meetup.Description, 40)} | {meetup.host}
            </p>
          </section>
        ))
      : [];

  type Meetup = {
    meetupId: number;
    title: string;
    date: string;
    venue: string;
    shortInfo: string;
    host: string;
  };

  function seeMeetup(meetup: Meetup) {
    return function () {
      navigate("/detail/", { state: { meetup: meetup } });
    };
  }

  function handleClick() {
    console.log("test");
  }

  return (
    <div className="view meetups-view">
      <Header showHomeBtn={false} showMyPageBtn={true} onClick={handleClick} />
      <section className="meetups-container">
        <h1>MeetApp</h1>
        <div className="meetups-container__search-container">
          <Input label="Sök event" htmlFor="search" />
          <button onClick={handleClick}>Hitta event till mig </button>
        </div>
        <section className="show-all-upcoming-meetups-container">
          {renderedMeetupItems}
        </section>
      </section>
    </div>
  );
}
