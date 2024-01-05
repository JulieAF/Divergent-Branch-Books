import { useEffect, useState } from "react";
import { deleteReview, getAllReviews } from "../services/reviewServices";
import { useNavigate } from "react-router-dom";
import Delete from "./delete.png";
import Edit from "./edit.png";

export const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (confirmDelete) {
      deleteReview(reviewId, () => {
        // Filter out the deleted review from the reviews list
        const updatedReviews = reviews.filter(
          (review) => review.id !== reviewId
        );
        setReviews(updatedReviews);
      }).catch((error) => {
        // Handle error, if any, during deletion
        console.error("Error deleting review:", error);
      });
    }
  };

  return (
    <>
      <div>
        {reviews && reviews.length ? (
          reviews.map((review) => (
            <div className="card-item" key={review.id}>
              <div className="review-list-details">
                <div className="review-header">
                  <div className="review-title">{review.book.title}</div>
                  <div className="review-author-container">
                    <img
                      className="author-image"
                      src={review.alien_user.profile_image_url}
                      alt="profile image"
                      width="35px"
                      height="35px"
                    />
                    <div className="review-author">
                      {review.alien_user.user.username}
                    </div>
                  </div>
                </div>
                <div className="review-content">{review.content}</div>
              </div>
              {review?.is_owner ? (
                <div className="my-review-buttons">
                  <img
                    className="edit-icon"
                    src={Edit}
                    alt="Edit icon"
                    onClick={() => navigate(`/review/${review.id}/edit-review`)}
                  />
                  <img
                    className="delete-icon"
                    src={Delete}
                    alt="Delete Icon"
                    onClick={() => {
                      handleDelete(review.id);
                      navigate(`/`);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </>
  );
};
