import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookByBookId } from "../services/bookServices";
import Delete from "./delete.png";
import Edit from "./edit.png";

export const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBookByBookId(bookId).then((book) => {
      setBook(book);
    });
  }, [bookId]);

  const handleDelete = (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      deleteBook(bookId, () => {
        // Filter out the deleted book from the books list
        const updatedBook = book.filter((book) => book.id !== bookId);
        setBook(updatedBook);
      }).catch((error) => {
        // Handle error, if any, during deletion
        console.error("Error deleting book:", error);
      });
    }
  };

  return (
    <>
      <div className="card-item">
        {book ? (
          <>
            <div className="book-details-header" key={book.id}>
              <div className="book-details-image">
                <img src={book.image_url} alt={book.name} width="400px"></img>
              </div>
              <div className="book-details-info">
                <div className="book-details-title">{book.title}</div>
                <div className="book-details-author">by {book.author}</div>
                <div className="book-details-sub-info">
                  <div className="book-details-genre">{book.genre.label}</div>
                  <div className="book-details-date">
                    {book.publication_date}
                  </div>
                </div>
              </div>
              {book?.is_owner ? (
                <div className="book-details-footer">
                  <div className="my-review-buttons">
                    <img
                      className="edit-icon"
                      src={Edit}
                      alt="Edit Icon"
                      onClick={() => navigate(`/book/${book.id}/edit-book`)}
                    />
                    <img
                      className="delete-icon"
                      src={Delete}
                      alt="Delete Icon"
                      onClick={() => {
                        handleDelete(book.id);
                        navigate("/");
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="book-details-body">{book.content}</div>
            <div className="book-details-footer">
              <div className="book-details-page_count">
                <ul>Page Count: {book.page_count} </ul>
              </div>
            </div>
          </>
        ) : (
          <p>No book found.</p>
        )}
      </div>
      <div className="review-buttons" key={`/book/${bookId}/reviews`}>
        <button
          className="view-review-button"
          onClick={() => navigate(`/book/${bookId}/reviews`)}
        >
          View Reviews
        </button>
        <button
          className="add-review-button"
          onClick={() => navigate(`/create-review/${bookId}`)}
        >
          Add New Review
        </button>
      </div>
    </>
  );
};
