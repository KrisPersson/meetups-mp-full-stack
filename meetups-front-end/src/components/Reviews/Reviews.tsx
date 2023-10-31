import './Reviews.scss';
import { useState, useMemo } from 'react';
import { apiSubmitReview } from '../../api/meetups';
import { Attendant } from '../../types';

export default function Reviews({
  attendants,
  meetupId,
}: {
  attendants: Attendant[];
  meetupId: string;
}) {
  const [newReview, setNewReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewing, setReviewing] = useState('');
  //   const [name, setName] = useState("");

  function switchToNewReview() {
    newReview ? setNewReview(false) : setNewReview(true);
  }
  async function sendNewReviewToDB() {
    newReview ? setNewReview(false) : setNewReview(true);
    const data = await apiSubmitReview(
      localStorage.getItem('userToken') || '',
      meetupId,
      reviewing,
      rating
    );

    if (data.success) {
      console.log('Review submitted!');
      window.location.reload();
    } else {
      console.log('Review failed!');
    }
    //skicka rating, reviewing, name och SK till databasen
  }
  // console.log(rating, reviewing, name);

  const hasReview = () => attendants.some((a) => a.Reviewing && a.Rating);

  const reviewItems = attendants.map((attendant, index) => (
    <>
      {attendant.Reviewing && attendant.Rating ? (
        <li key={+index}>
          {' '}
          Namn: {attendant.SK} | Betyg: {attendant.Rating} | Kommentar:{' '}
          {attendant.Reviewing}
        </li>
      ) : null}
    </>
  ));

  return (
    <div className='view reviews-view'>
      <div className='show-old-reviews-area'>
        <h2 className='show-old-reviews-area__review-h2'>Recensioner:</h2>
        <h3 className='show-old-reviews-area__review-h3'>
          {hasReview() ? (
            <ul className='show-old-reviews-area__review-h3__reviewItems'>
              {reviewItems}
            </ul>
          ) : (
            <p>Inga recensioner än</p>
          )}
        </h3>
      </div>

      {newReview ? (
        <section className='show-new-review-area'>
          <div className='show-new-review-area__rating'>
            <button
              className='show-new-review-area__rating__star'
              onClick={() => setRating(1)}
            >
              ★
            </button>
            <button
              className='show-new-review-area__rating__star'
              onClick={() => setRating(2)}
            >
              ★
            </button>
            <button
              className='show-new-review-area__rating__star'
              onClick={() => setRating(3)}
            >
              ★
            </button>
            <button
              className='show-new-review-area__rating__star'
              onClick={() => setRating(4)}
            >
              ★
            </button>
            <button
              className='show-new-review-area__rating__star'
              onClick={() => setRating(5)}
            >
              ★
            </button>
          </div>

          <textarea
            className='reviewing'
            onChange={(e) => setReviewing(e.target.value)}
            placeholder='Skriv din recension här...'
          />
          <button
            className='show-new-review-area__submit'
            onClick={sendNewReviewToDB}
          >
            Skicka recension
          </button>
        </section>
      ) : (
        <section className='show-Reviews-Area'>
          <button className='writeReview' onClick={switchToNewReview}>
            Skriv recension
          </button>
        </section>
      )}
    </div>
  );
}
