import { useEffect, useState } from "react";
import "./pages.css";
import { Link, useNavigate } from "react-router-dom";
import { getAllBooks } from "../services/bookServices";
import { getAllGenres } from "../services/genreServices";
import { BookGenreFilter } from "./BookGenreFilter";

function BookList() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("0");
  let [genreFilteredBooks, setGenreFilteredBooks] = useState([]);
  const navigate = useNavigate();

  const getAndSetBooks = () => {
    getAllBooks().then((booksArray) => {
      const filteredBooks = booksArray.filter(
        (book) => new Date(book.created_on) < new Date()
      );

      const sortedBooks = filteredBooks.sort(
        (a, b) => new Date(b.created_on) - new Date(a.created_on)
      );

      setBooks(sortedBooks);
    });
  };

  useEffect(() => {
    getAndSetBooks();
  }, []);

  useEffect(() => {
    getAllGenres().then((genreArray) => {
      setGenres(genreArray);
    });
  }, []);

  useEffect(() => {
    const booksFiltered =
      selectedGenre === "0"
        ? books
        : books.filter((book) => book.genre.id === parseInt(selectedGenre));
    setGenreFilteredBooks(booksFiltered);
  }, [selectedGenre, books]);

  return (
    <>
      <div>
        <button className="btn-div" onClick={() => navigate("/create-book")}>
          Add Book
        </button>
        <BookGenreFilter
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          genres={genres}
        />
        {books && books.length ? (
          genreFilteredBooks.map((book) => (
            <div className="card-item" key={book.id}>
              <Link to={`/bookLists/${book.id}`}>
                <div className="book-details">
                  <div className="book-header">
                    <img
                      src={book.image_url}
                      alt={book.name}
                      width="400px"
                    ></img>
                    <div className="book-title">Title: {book.title}</div>
                    <div className="book-author">Author: {book.author}</div>
                    <div className="book-date">
                      Date: {book.publication_date}
                    </div>
                  </div>
                </div>
              </Link>
              {book?.is_owner ? <div></div> : ""}
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </>
  );
}

export default BookList;
