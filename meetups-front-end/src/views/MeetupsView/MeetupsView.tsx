import './MeetupsView.scss';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import { apiGetUpcomingMeetUps } from '../../api/meetups';
// import meetupArr from "../../components/Meetups/Meetups";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { truncate } from '../../utils/index';
import { MeetupFromDb } from '../../types/index';

export default function MeetupsView() {
  const navigate = useNavigate();
  const [meetupItems, setMeetupItems] = useState<MeetupFromDb[]>([]);

  useEffect(() => {
    fetchMeetups();
  }, []);

  async function fetchMeetups() {
    const token = localStorage.getItem('userToken') || '';
    const dataFromDb = await apiGetUpcomingMeetUps(token);
    setMeetupItems([...dataFromDb.meetups]);
  }

  const renderedMeetupItems =
    meetupItems.length > 0
      ? meetupItems.map((meetup) => (
          <section
            key={meetup.PK}
            className='meetups'
            onClick={() => seeMeetup(meetup)()}
          >
            <h2 className='meetups__meetupsTitle'>{meetup.Title}</h2>
            <p>
              {meetup.StartTime} | {meetup.Location} |{' '}
              {truncate(meetup.Description, 40)} | {meetup.Host}
            </p>
          </section>
        ))
      : [];

  function seeMeetup(meetup: MeetupFromDb) {
    return function () {
      navigate('/detail/', { state: { meetup: meetup } });
    };
  }

  function handleClick() {
    console.log('test');
  }

  return (
    <div className='view meetups-view'>
      <Header showHomeBtn={false} showMyPageBtn={true} onClick={handleClick} />
      <section className='meetups-container'>
        <h1>MeetApp</h1>
        <div className='meetups-container__search-container'>
          <Input label='Sök event' htmlFor='search' />
          <button onClick={handleClick}>Hitta event till mig </button>
        </div>
        <section className='show-all-upcoming-meetups-container'>
          {renderedMeetupItems}
        </section>
      </section>
    </div>
  );
}
