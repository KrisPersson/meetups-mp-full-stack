import "./MeetupsView.scss";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import meetupArr from "../../components/Meetups/Meetups";
import { useNavigate } from "react-router-dom";

export default function MeetupsView() {
  const navigate = useNavigate();


  const meetupItems = meetupArr.map((meetup) =>
    <section key={meetup.meetupId} className="meetups" onClick={() => seeMeetup(meetup)()} >
      <h2 className="meetups__meetupsTitle">{meetup.title}</h2>
      <p>{meetup.date} | {meetup.venue} | {meetup.shortInfo} | {meetup.host}</p>
    </section>
  );
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
      navigate("/detail/", { state: { meetup: meetup } })
    }
  }

  function handleClick() {
    console.log("test");

  }


  return <div className="view meetups-view">
    <Header showHomeBtn={false} showMyPageBtn={true} onClick={handleClick} />
    <section className="meetups-container">
      <h1>MeetApp</h1>
      <div className="meetups-container__search-container">
        <Input label="Sök event" htmlFor="search" />
        <button onClick={handleClick}>Hitta event till mig </button>
      </div>
      <section className="show-all-upcoming-meetups-container">
        {meetupItems}
      </section>
    </section>
  </div>;
}
