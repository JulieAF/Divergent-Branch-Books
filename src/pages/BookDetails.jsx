import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookByBookId } from "../services/bookServices";

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
            <div className="card-header" key={book.id}>
              <img src={book.image_url} alt={book.name} width="400px"></img>
              <div className="card-title">Title: {book.title}</div>
              <div className="card-author">Author: {book.author}</div>
            </div>
            <div className="card-body">Content: {book.content}</div>
            <div className="card-footer">
              <div className="cat-main">
                <div className="card-genres-header">Genre:</div>
                <div className="genre-label">{book.genre.label}</div>
              </div>
              <div className="card-page_count">
                <ul className="card-page_count-header">
                  Page Count: {book.page_count}{" "}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <p>No book found.</p>
        )}
      </div>
      {book?.is_owner ? (
        <div className="manage-edit-div">
          <div className="manage-books-div">
            <button onClick={() => navigate(`/book/${book.id}/edit-book`)}>
              Edit
            </button>
          </div>
          <div className="comment-buttons">
            <button
              className="delete-button"
              onClick={() => {
                handleDelete(book.id);
                navigate("/");
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
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
