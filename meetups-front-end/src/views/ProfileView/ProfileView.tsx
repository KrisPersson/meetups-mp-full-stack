import './ProfileView.scss';
import Header from '../../components/Header/Header';
import { MeetupFromDb } from '../../types';
import React from 'react';
import { apiGetUserProfile } from '../../api';
import MeetupItems from './MeetupItems';

type ProfileType = {
  upcoming: MeetupFromDb[];
  past: MeetupFromDb[];
};
export default function ProfileView() {
  const [meetups, setMeetups] = React.useState<ProfileType | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem('userToken') || '';

    apiGetUserProfile(token)
      .then((res) => {
        if (res.success) {
          setMeetups(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='view profile-view'>
      <Header showHomeBtn={true} showMyPageBtn={false} />
      <section className='profile-container'>
        <h1>Meetups</h1>
        <h2 className='upcoming-passed-text'>Kommande</h2>
        {meetups && meetups.upcoming.length !== 0 ? (
          <ul className='upcoming-events-container'>
            <MeetupItems meetupArr={meetups.upcoming} />
          </ul>
        ) : (
          <p>Not found</p>
        )}
        <h2 className='upcoming-passed-text'>Tidigare</h2>

        {meetups && meetups.past.length !== 0 ? (
          <ul className='passed-events-container'>
            <MeetupItems meetupArr={meetups.past} />
          </ul>
        ) : (
          <p>Not found</p>
        )}
      </section>
    </div>
  );
}
