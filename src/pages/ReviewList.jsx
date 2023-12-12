import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllReviews } from "../services/reviewServices";

export const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  const getAndSetReviews = () => {
    getAllReviews().then((reviewsArray) => {
      const filteredReviews = reviewsArray.filter(
        (reviews) => new Date(reviews.created_on) < new Date()
      );

      const sortedReviews = filteredReviews.sort(
        (a, b) => new Date(b.created_on) - new Date(a.created_on)
      );

      setReviews(sortedReviews);
    });
  };

  useEffect(() => {
    getAndSetReviews();
  }, []);

  return (
    <>
      <div>
        {reviews && reviews.length ? (
          reviews.map((review) => (
            <div className="card-item" key={review.id}>
              <Link to={`/reviewLists/${review.id}`}>
                <div className="review-details">
                  <div className="review-header">
                    <div className="review-title">{review.book.title}</div>
                    <div className="review-author">
                      {review.alien_user.user.username}
                    </div>
                    <div className="review-content">{review.content}</div>
                  </div>
                </div>
              </Link>
              {review?.is_owner ? <div></div> : ""}
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </>
  );
};