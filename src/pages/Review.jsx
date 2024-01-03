import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./pages.css";
import { getBookByBookId } from "../services/bookServices";
import { getAllReviews } from "../services/reviewServices";

export const Review = () => {
  const { bookId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [book, setBook] = useState({});

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
              <Link
                style={{
                  textDecoration: "none",
                  color: "aliceblue",
                }}
                book={review}
                key={review.id}
                to={`/review/${review.id}`}
              >
                <div className="card-item" key={review.id}>
                  <div className="review-details">
                    <div>Author: {review.alien_user?.user?.username}</div>
                    <div>{review.created_on}</div>
                  </div>
                  <div className="review-details-body">{review.content}</div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};
