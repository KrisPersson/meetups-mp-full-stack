import { useNavigate } from 'react-router-dom';
import { MeetupFromDb } from '../../types';

function MeetupItems(props: { meetupArr: MeetupFromDb[] }) {
  const { meetupArr } = props;
  const navigate = useNavigate();

  function seeMeetup(meetup: MeetupFromDb) {
    return function () {
      navigate('/detail/', { state: { meetup: meetup } });
    };
  }

  return (
    <>
      {meetupArr.map((meetup) => {
        return (
          <li
            key={meetup.PK}
            className='meetups'
            onClick={() => seeMeetup(meetup)()}
          >
            <h2 className='meetups__meetupsTitle'>{meetup.Title}</h2>
            <p>
              {meetup.StartTime} | {meetup.Location} | {meetup.Description} |{' '}
              {meetup.Host}
            </p>
          </li>
        );
      })}
    </>
  );
}

export default MeetupItems;
