import "./MeetupDetailView.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";


export default function MeetupDetailView() {

  function clickRegister() { }
  function handleClick() { }
  const title = "Hundar utan öron";
  const date = "2021-09-01";
  const venue = "Hundparken";
  const info = "Vi träffas och pratar om hundar utan öron lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const host = "Brukshundsklbben";
  const numberOfAttendees = 5;
  const maxNumberOfAttendees = 10;
  return <div className="view meetupDetail-view">
    <Header showHomeBtn={true} showMyPageBtn={true} onClick={handleClick} />
    <section className="detail-container">
      <h1>{title}</h1>
      <h2>Datum: {date}</h2>
      <h2>Plats: {venue}</h2>
      <h2>Info: {info}</h2>
      <h2>Arrangör: {host}</h2>
      <h2>Anmälda: {numberOfAttendees}/{maxNumberOfAttendees}</h2>
    </section>
    <Footer buttonText="Anmäl mig!" type="detail-unannounced-view" onClick={clickRegister} />


  </div>;
}
