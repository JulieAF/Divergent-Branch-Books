import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteReview, getReviewByReviewId } from "../services/reviewServices";

export const ReviewDetails = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getReviewByReviewId(reviewId).then(
      (review) => {
        setReview(review);
      },
      [reviewId]
    );
  });

  const handleDelete = (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (confirmDelete) {
      deleteReview(reviewId)
        .then(() => {
          // Filter out the deleted review from the reviews list
          const updatedReviews = review.filter(
            (review) => review.id !== reviewId
          );
          setReview(updatedReviews);
          navigate(-2);
        })
        .catch((error) => {
          // Handle error, if any, during deletion
          console.error("Error deleting review:", error);
        });
    }
  };

  return (
    <>
      <div className="card-item">
        {review ? (
          <>
            <div className="card-header" key={review.id}>
              <div className="card-body">Content: {review.content}</div>
            </div>
          </>
        ) : (
          <p>No review found.</p>
        )}
      </div>
      {review?.is_owner ? (
        <div className="manage-edit-div">
          <div className="manage-reviews-div">
            <button
              onClick={() => navigate(`/review/${review.id}/edit-review`)}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(review.id)}>Delete</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
