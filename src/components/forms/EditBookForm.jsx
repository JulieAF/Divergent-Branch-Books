import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./forms.css";
import { getBookByBookId, editBook } from "../../services/bookServices";
import { getAllGenres } from "../../services/genreServices";

export const EditBookForm = () => {
  const [genreLabel, setGenreLabel] = useState([]);
  const { bookId } = useParams();
  let navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    page_count: "",
    image_url: "",
    content: "",
    publication_date: "",
    created_on: "new Date()",
    genre: 0,
  });

  useEffect(() => {
    getAllGenres().then((genreArray) => {
      setGenreLabel(genreArray);
    });
  }, []);

  useEffect(() => {
    getBookByBookId(bookId).then((bookObj) => {
      setBook(bookObj);
    });
  }, [bookId]);

  const updateBook = (e) => {
    const copy = { ...book };
    copy[e.target.id] = e.target.value;
    setBook(copy);
  };

  const updateGenre = (e) => {
    const copy = { ...book };
    copy.genre.id = e.target.value;
    setBook(copy);
  };

  const handleCancel = () => {
    navigate(`/book/${bookId}`);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updatedItem = {
      id: book.id,
      title: book.title,
      author: book.author,
      publication_date: book.publication_date,
      page_count: book.page_count,
      image_url: book.image_url,
      content: book.content,
      genre: book.genre.id,
    };

    editBook(updatedItem).then(() => {
      navigate(`/book/${bookId}`);
    });
  };

  return (
    <>
      <main className="form-parent">
        <form className="form-and-header">
          <div className="h1-div">
            <h1>Edit Book</h1>
          </div>
          <div className="edit-book-form-container">
            <fieldset className="edit-book-form-fieldset">
              <div className="edit-book-form-field">
                <label>Title:</label>
                <input
                  className="edit-book-input-field"
                  id="title"
                  onChange={updateBook}
                  type="text"
                  placeholder=""
                  value={book.title}
                  required
                />
              </div>
              <div className="edit-book-form-field">
                <label>Author:</label>
                <input
                  className="edit-book-input-field"
                  id="author"
                  onChange={updateBook}
                  type="text"
                  placeholder=""
                  value={book.author}
                  required
                />
              </div>
              <div className="edit-book-form-field">
                <label>Publication Date:</label>
                <input
                  className="edit-book-input-field"
                  id="publication_date"
                  onChange={updateBook}
                  type="text"
                  placeholder=""
                  value={book.publication_date}
                  required
                />
              </div>
              <div className="edit-book-form-field">
                <label>Page Count:</label>
                <input
                  className="edit-book-input-field"
                  id="page_count"
                  onChange={updateBook}
                  type="text"
                  placeholder=""
                  value={book.page_count}
                  required
                />
              </div>
              <div className="edit-book-form-field">
                <label>Image:</label>
                <input
                  className="edit-book-input-field"
                  id="image_url"
                  onChange={updateBook}
                  type="text"
                  placeholder=""
                  value={book.image_url}
                  required
                />
              </div>
              <fieldset className="fieldset-div">
                <div className="edit-book-input-field">
                  <select
                    className="input"
                    name="genre"
                    onChange={updateGenre}
                    value={book.genre.id}
                  >
                    {/* <option value={0}>Please select a Genre</option> */}
                    {genreLabel.map((typeObj) => {
                      return (
                        <option key={typeObj.id} value={typeObj.id}>
                          {typeObj.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </fieldset>
              <div className="edit-book-form-field">
                <label>Content:</label>
                <textarea
                  className="input-field"
                  id="content"
                  onChange={updateBook}
                  placeholder=""
                  value={book.content}
                  required
                  maxLength={1000}
                />
              </div>
            </fieldset>
          </div>
        </form>
      </main>
      <div className="button-div">
        <button className="submit-button" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </>
  );
};
