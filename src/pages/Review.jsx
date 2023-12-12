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
      <div className="h1">{book.title}</div>
      <Link
        style={{ textDecoration: "none", color: "rgb(79, 17, 146)" }}
        book={book}
        key={book.id}
        to={`/bookList/${book.id}`}
      >
        <div>Go Back to Book</div>
      </Link>
      <div className="content">
        {reviews.length === 0 ? (
          <p>No reviews to display.</p>
        ) : (
          reviews.map((review) => {
            return (
              <div className="card-item" key={review.id}>
                <div>
                  <h3>{review.content}</h3>
                  <h3>Author: {review.alien_user?.user?.username}</h3>
                  <h3>{review.created_on}</h3>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
