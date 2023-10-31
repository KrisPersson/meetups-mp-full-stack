import "./MeetupDetailView.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MeetupFromDb } from "../../types/index";
import Reviews from "../../components/Reviews/Reviews";
import { APP_URL } from "../../utils";
import { apiGetSpecificMeetup, apiAttendLeaveMeetup } from "../../api/meetups";

export default function MeetupDetailView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [meetupState, setMeetupState] = useState<MeetupFromDb | null>(null);
  // console.log(location.state);

  useEffect(() => {
    if (!location.state) {
      navigate(APP_URL);
    }
  }, [location]);

  useEffect(() => {
    fetchSpecificMeetup(location.state.meetupId || null);
  }, [registered]);

  async function fetchSpecificMeetup(meetupId: string) {
    const dbMeetup = await apiGetSpecificMeetup(
      localStorage.getItem("userToken") || "",
      meetupId
    );
    if (dbMeetup.success) setMeetupState({ ...dbMeetup.data });
    if (dbMeetup?.data.Attendants?.includes(localStorage.username))
      setRegistered(true);
  }

  async function clickToRegOrUnreg() {
    if (registered) {
      await apiAttendLeaveMeetup(
        localStorage.getItem("userToken") || "",
        location.state.meetupId,
        "leave"
      );
      console.log("Test: Du är nu avanmäld!");
      setRegistered(false);
    } else {
      await apiAttendLeaveMeetup(
        localStorage.getItem("userToken") || "",
        location.state.meetupId,
        "attend"
      );
      console.log("Test: Du är nu anmäld!");
      setRegistered(true);
    }
  }

  const title = meetupState?.Title;
  const date = meetupState?.StartTime;
  const venue = meetupState?.Location;
  const info = meetupState?.Description;
  const host = meetupState?.Host;
  const numberOfAttendees = meetupState?.CurrentAttendants;
  const maxNumberOfAttendees = meetupState?.MaxAttendants;
  // const reviews = [
  //   {
  //     name: 'Kalle',
  //     rating: 5,
  //     review: 'Bästa hundmötet ever!',
  //   },
  //   {
  //     name: 'Lisa',
  //     rating: 4,
  //     review: 'Bra hundmöte!',
  //   },
  //   {
  //     name: 'Nisse',
  //     rating: 3,
  //     review: 'Okej hundmöte!',
  //   },
  //   {
  //     name: 'Pelle',
  //     rating: 2,
  //     review: 'Sämsta hundmötet ever!',
  //   },
  //   {
  //     name: 'Sara',
  //     rating: 1,
  //     review: 'Det är sista gången jag tar min katt Göran på detta event!!',
  //   },
  // ];
  // const reviewItems = reviews.map((review, index) => (
  //   <li key={+index}>
  //     {' '}
  //     Namn: {review.name} Betyg: {review.rating} Kommentar: {review.review}
  //   </li>
  // ));

  return (
    <div className="view meetupDetail-view">
      <Header showHomeBtn={true} showMyPageBtn={true} onClick={null} />
      <section className="detail-container">
        <h1>{title}</h1>
        <h2>Datum: {date}</h2>
        <h2>Plats: {venue}</h2>
        <h2>Info: {info}</h2>
        <h2>Arrangör: {host}</h2>
        <h2>
          Anmälda: {numberOfAttendees}/{maxNumberOfAttendees}
        </h2>
        {/* <h2>
          Recensioner: <ul>{reviewItems}</ul>{' '}
        </h2> */}
        <Reviews />
      </section>
      {registered ? (
        <Footer buttonText="Avregistrera mig!" onClick={clickToRegOrUnreg} />
      ) : (
        <Footer
          isFullyBooked={numberOfAttendees === maxNumberOfAttendees}
          buttonText="Anmäl mig!"
          onClick={clickToRegOrUnreg}
        />
      )}
    </div>
  );
}
