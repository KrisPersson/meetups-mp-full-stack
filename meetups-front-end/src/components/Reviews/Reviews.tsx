import "./Reviews.scss";
import { useState } from "react";
import { apiSubmitReview } from "../../api/meetups";

export default function Reviews({ meetupId }: { meetupId: string }) {
  const [newReview, setNewReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewing, setReviewing] = useState("");
  //   const [name, setName] = useState("");

  function switchToNewReview() {
    newReview ? setNewReview(false) : setNewReview(true);
  }
  function sendNewReviewToDB() {
    newReview ? setNewReview(false) : setNewReview(true);
    apiSubmitReview(
      localStorage.getItem("userToken") || "",
      meetupId,
      reviewing,
      rating
    );

    //skicka rating, reviewing, name och SK till databasen
  }
  // console.log(rating, reviewing, name);


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
      Namn: {review.name} | Betyg: {review.rating} | Kommentar: {review.review}
    </li>
  ));

  return (
    <div className="view reviews-view">
      <div className="show-old-reviews-area">
        <h2 className="show-old-reviews-area__review-h2">Recensioner:</h2>
        <h3 className="show-old-reviews-area__review-h3">
          <ul className="show-old-reviews-area__review-h3__reviewItems">
            {reviewItems}
          </ul>{" "}
        </h3>
      </div>


      {newReview ? (
        <section className="show-new-review-area">
          <div className="show-new-review-area__rating">
            <button
              className="show-new-review-area__rating__star"
              onClick={() => setRating(1)}
            >
              ★
            </button>
            <button
              className="show-new-review-area__rating__star"
              onClick={() => setRating(2)}
            >
              ★
            </button>
            <button
              className="show-new-review-area__rating__star"
              onClick={() => setRating(3)}
            >
              ★
            </button>
            <button
              className="show-new-review-area__rating__star"
              onClick={() => setRating(4)}
            >
              ★
            </button>
            <button
              className="show-new-review-area__rating__star"
              onClick={() => setRating(5)}
            >
              ★
            </button>
          </div>

          <textarea
            className="reviewing"
            onChange={(e) => setReviewing(e.target.value)}
            placeholder="Skriv din recension här..."
          />
          <button
            className="show-new-review-area__submit"
            onClick={sendNewReviewToDB}
          >
            Skicka recension
          </button>
        </section>
      ) : (
        <section className="show-Reviews-Area">
          <button className="writeReview" onClick={switchToNewReview}>
            Skriv recension
          </button>
        </section>
      )}
    </div>
  );
}
