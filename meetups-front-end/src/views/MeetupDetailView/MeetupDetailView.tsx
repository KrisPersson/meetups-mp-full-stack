import "./MeetupDetailView.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MeetupFromDb } from "../../types/index";

export default function MeetupDetailView() {
  const location = useLocation();
  const meetup: MeetupFromDb = location.state.meetup;

  const [registered, setRegistered] = useState(false);

  function switchRegisterBtn() {
    registered ? setRegistered(false) : setRegistered(true);
  }
  function clickToRegister() {
    switchRegisterBtn();
    console.log("Test: Du är nu anmäld!");
  }
  function clickToUnregister() {
    switchRegisterBtn();
    console.log("Test: Du är nu avanmäld!");
  }
  function handleClick() {}

  const title = meetup.Title;
  const date = meetup.StartTime;
  const venue = meetup.Location;
  const info = meetup.Description;
  const host = meetup.Host;
  const numberOfAttendees = meetup.CurrentAttendants;
  const maxNumberOfAttendees = meetup.MaxAttendants;
  const reviews = [
    {
      name: "Kalle",
      rating: 5,
      review: "Bästa hundmötet ever!",
    },
    {
      name: "Lisa",
      rating: 4,
      review: "Bra hundmöte!",
    },
    {
      name: "Nisse",
      rating: 3,
      review: "Okej hundmöte!",
    },
    {
      name: "Pelle",
      rating: 2,
      review: "Sämsta hundmötet ever!",
    },
    {
      name: "Sara",
      rating: 1,
      review: "Det är sista gången jag tar min katt Göran på detta event!!",
    },
  ];
  const reviewItems = reviews.map((review, index) => (
    <li key={+index}>
      {" "}
      Namn: {review.name} Betyg: {review.rating} Kommentar: {review.review}
    </li>
  ));

  return (
    <div className="view meetupDetail-view">
      <Header showHomeBtn={true} showMyPageBtn={true} onClick={handleClick} />
      <section className="detail-container">
        <h1>{title}</h1>
        <h2>Datum: {date}</h2>
        <h2>Plats: {venue}</h2>
        <h2>Info: {info}</h2>
        <h2>Arrangör: {host}</h2>
        <h2>
          Anmälda: {numberOfAttendees}/{maxNumberOfAttendees}
        </h2>
        <h2>
          Recensioner: <ul>{reviewItems}</ul>{" "}
        </h2>
      </section>
      {registered ? (
        <Footer
          buttonText="Avregistrera mig!"
          registered={false}
          onClick={clickToUnregister}
        />
      ) : (
        <Footer
          buttonText="Anmäl mig!"
          registered={true}
          onClick={clickToRegister}
        />
      )}
    </div>
  );
}
