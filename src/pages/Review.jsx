import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./pages.css";
import { getBookByBookId } from "../services/bookServices";
import { deleteReview, getAllReviews } from "../services/reviewServices";
import Delete from "./delete.png";
import Edit from "./edit.png";

export const Review = () => {
  const { bookId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [book, setBook] = useState({});
  const [review, setReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBookByBookId(bookId).then((data) => {
      setBook(data);
    });
  }, [bookId]);

  useEffect(() => {
    getAllReviews().then((data) => {
      const filteredReviews = [
        ...data.filter((review) => review.book.id === parseInt(bookId)),
      ];

      filteredReviews.sort(
        (a, b) => new Date(b.created_on) - new Date(a.created_on)
      );
      setReviews(filteredReviews);
    });
  }, [bookId]);

  const handleDelete = (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (confirmDelete) {
      deleteReview(reviewId, () => {
        // Filter out the deleted review from the reviews list
        const updatedReviews = review.filter(
          (review) => review.id !== reviewId
        );
        setReview(updatedReviews);
      }).catch((error) => {
        // Handle error, if any, during deletion
        console.error("Error deleting review:", error);
      });
    }
  };

  return (
    <>
      <h1 className="title">{book.title}</h1>
      <div className="back-container">
        <Link
          className="back"
          style={{
            textDecoration: "none",
            color: "aqua",
          }}
          book={book}
          key={book.id}
          to={`/book/${book.id}`}
        >
          <div className="back-text">Back to Book</div>
        </Link>
      </div>
      <div className="content">
        {reviews.length === 0 ? (
          <div className="error">No reviews to display.</div>
        ) : (
          reviews.map((review) => {
            return (
              <div className="card-item" key={review.id}>
                <div className="review-details">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "aqua",
                      background: "transparent",
                    }}
                    key={review.id}
                    to={`/review/${review.alien_user?.user.id}`}
                  >
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
                  </Link>
                  <div>{review.created_on}</div>
                </div>
                <div className="review-details-body">{review.content}</div>
                {review?.is_owner ? (
                  <div className="my-review-buttons">
                    <img
                      className="edit-icon"
                      src={Edit}
                      alt="Edit Icon"
                      onClick={() =>
                        navigate(`/review/${review.id}/edit-review`)
                      }
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
            );
          })
        )}
      </div>
    </>
  );
};
