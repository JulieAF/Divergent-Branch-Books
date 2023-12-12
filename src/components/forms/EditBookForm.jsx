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
    navigate(`/bookList/${bookId}`);
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
      navigate(`/bookList/${bookId}`);
    });
  };

  return (
    <main className="form-parent">
      <form className="form-and-header">
        <div className="h1-div">
          <h1>Edit Book Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset">
            <div className="form-field">
              <label>Title:</label>
              <input
                className="input-field"
                id="title"
                onChange={updateBook}
                type="text"
                placeholder=""
                value={book.title}
                required
              />
            </div>
            <div className="form-field">
              <label>Author:</label>
              <input
                className="input-field"
                id="author"
                onChange={updateBook}
                type="text"
                placeholder=""
                value={book.author}
                required
              />
            </div>
            <div className="form-field">
              <label>Publication Date:</label>
              <input
                className="input-field"
                id="publication_date"
                onChange={updateBook}
                type="text"
                placeholder=""
                value={book.publication_date}
                required
              />
            </div>
            <div className="form-field">
              <label>Page Count:</label>
              <input
                className="input-field"
                id="page_count"
                onChange={updateBook}
                type="text"
                placeholder=""
                value={book.page_count}
                required
              />
            </div>
            <div className="form-field">
              <label>Image:</label>
              <input
                className="input-field"
                id="image_url"
                onChange={updateBook}
                type="text"
                placeholder=""
                value={book.image_url}
                required
              />
            </div>
            <div className="form-field">
              <label>Content:</label>
              <textarea
                className="textarea-field"
                id="content"
                onChange={updateBook}
                placeholder=""
                value={book.content}
                required
                maxLength={1000}
              />
              Max Characters 1000
            </div>
            <fieldset className="fieldset-div">
              <div className="box-input">
                <div>Genre:</div>
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
          </fieldset>
        </div>
        <div className="button-div">
          <button className="cancel-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};
