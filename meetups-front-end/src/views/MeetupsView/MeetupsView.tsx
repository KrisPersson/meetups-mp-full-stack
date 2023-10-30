import './MeetupsView.scss';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import { apiGetUpcomingMeetUps } from '../../api/meetups';
// import meetupArr from "../../components/Meetups/Meetups";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MeetupFromDb } from '../../types/index';
import { MeetupListItem } from '../../components/MeetupListItem/MeetupListItem';

export default function MeetupsView() {
  const navigate = useNavigate();
  const [meetupItems, setMeetupItems] = useState<MeetupFromDb[]>([]);
  const [searchedItems, setSearchedItems] = useState<MeetupFromDb[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    fetchMeetups();
  }, []);

  async function fetchMeetups() {
    const token = localStorage.getItem('userToken') || '';
    const dataFromDb = await apiGetUpcomingMeetUps(token);
    setMeetupItems([...dataFromDb.meetups]);
  }

  function seeMeetup(meetup: MeetupFromDb) {
    return function () {
      navigate('/meetups-mp-full-stack/detail/', {
        state: { meetup: meetup },
      });
    };
  }

  function handleClick() {
    console.log('test');
  }

  function handleSearchInputChange(value: string) {
    setSearchInput(value);
    searchMeetups(value);
  }

  function searchMeetups(value: string) {
    const filtered = meetupItems.filter((meetup) => {
      const desc = meetup.Description.toLowerCase();
      const title = meetup.Title.toLowerCase();
      return (
        desc.includes(value.toLowerCase()) ||
        title.includes(value.toLowerCase())
      );
    });
    setSearchedItems([...filtered]);
  }

  const renderedMeetupItems = () => {
    const toBeRendered =
      searchInput.length > 0
        ? [...searchedItems]
        : meetupItems.length > 0
        ? [...meetupItems]
        : [];
    return toBeRendered.map((meetup) => (
      <MeetupListItem
        key={meetup.PK}
        {...meetup}
        seeMeetup={seeMeetup(meetup)}
      />
    ));
  };

  return (
    <div className='view meetups-view'>
      <Header showHomeBtn={false} showMyPageBtn={true} onClick={handleClick} />
      <section className='meetups-container'>
        <h1>MeetApp</h1>
        <div className='meetups-container__search-container'>
          {/* <Input label="Sök event" htmlFor="search" /> */}
          <input
            type='text'
            defaultValue={searchInput}
            placeholder='Search Meetups...'
            onChange={(e) => handleSearchInputChange(e.target?.value)}
          />
          {/* <button onClick={handleClick}>Hitta event till mig </button> */}
        </div>
        <section className='show-all-upcoming-meetups-container'>
          {renderedMeetupItems()}
        </section>
      </section>
    </div>
  );
}
