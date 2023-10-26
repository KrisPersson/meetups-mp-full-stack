import "./ProfileView.scss";
import Header from "../../components/Header/Header";
import meetupArr from "../../components/Meetups/Meetups";
import { useNavigate } from "react-router-dom";


export default function ProfileView() {
  const navigate = useNavigate();
  const userName = "Kalle";

  function handleClick() { console.log("test"); }
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



  return <div className="view profile-view">
    <Header showHomeBtn={true} showMyPageBtn={false} onClick={handleClick} />
    <section className="profile-container">
      <h1>{userName}s meetups</h1>
      <h2 className="upcoming-passed-text">Kommande</h2>
      <section className="upcoming-events-container">
        {meetupItems}
      </section>
      <h2 className="upcoming-passed-text">Tidigare</h2>
      <section className="passed-events-container">
        {meetupItems}
      </section>
    </section>

  </div>;
}
