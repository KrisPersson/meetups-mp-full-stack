import './MeetupDetailView.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Attendant, MeetupDetailWithReviews } from '../../types/index';
import Reviews from '../../components/Reviews/Reviews';
import { APP_URL } from '../../utils';
import { apiGetSpecificMeetup, apiAttendLeaveMeetup } from '../../api/meetups';

export default function MeetupDetailView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [meetupState, setMeetupState] =
    useState<MeetupDetailWithReviews | null>(null);

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
      localStorage.getItem('userToken') || '',
      meetupId
    );
    if (dbMeetup.success) setMeetupState({ ...dbMeetup.data });
    if (
      dbMeetup?.data.Attendants.find((attendant: Attendant) =>
        attendant.SK.includes(localStorage.username)
      )
    )
      setRegistered(true);
  }

  async function clickToRegOrUnreg() {
    const token = localStorage.getItem('userToken') || '';
    if (registered) {
      await apiAttendLeaveMeetup(token, location.state.meetupId, 'leave');
      console.log('Test: Du är nu avanmäld!');
      setRegistered(false);
    } else {
      await apiAttendLeaveMeetup(token, location.state.meetupId, 'attend');
      console.log('Test: Du är nu anmäld!');
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
  const attendants = meetupState?.Attendants;

  return (
    <div className='view meetupDetail-view'>
      <Header showHomeBtn={true} showMyPageBtn={true} />
      <section className='detail-container'>
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
        {date && date < new Date().toISOString() ? (
          <Reviews attendants={attendants || []} meetupId={meetupState.SK} />
        ) : null}
      </section>

      <>
        {date && date < new Date().toISOString() ? null : registered ? (
          <Footer buttonText='Avregistrera mig!' onClick={clickToRegOrUnreg} />
        ) : (
          <Footer
            isFullyBooked={numberOfAttendees === maxNumberOfAttendees}
            buttonText='Anmäl mig!'
            onClick={clickToRegOrUnreg}
          />
        )}
      </>
    </div>
  );
}
