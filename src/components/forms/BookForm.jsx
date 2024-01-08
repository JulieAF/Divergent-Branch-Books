import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllGenres } from "../../services/genreServices";
import "./forms.css";

export const BookForm = () => {
  const [genreLabel, setGenreLabel] = useState([]);
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
  const [titleError, setTitleError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [publicationDateError, setPublicationDateError] = useState(false);
  const [pageCountError, setPageCountError] = useState(false);
  const [imageUrlError, setImageUrlError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [genreError, setGenreError] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    getAllGenres().then((genreArray) => {
      setGenreLabel(genreArray);
    });
  }, []);

  const updateBook = (e) => {
    const copy = { ...book };
    copy[e.target.id] = e.target.value;
    setBook(copy);
  };

  const updateGenre = (e) => {
    const copy = { ...book };
    copy.genre = e.target.value;
    setBook(copy);
  };

  const postBook = async (evt) => {
    evt.preventDefault();
    if (!book.title) {
      setTitleError(true);
      return;
    }

    if (!book.author) {
      setAuthorError(true);
      return;
    }

    if (!book.publication_date) {
      setPublicationDateError(true);
      return;
    }

    if (!book.page_count) {
      setPageCountError(true);
      return;
    }

    if (!book.image_url) {
      setImageUrlError(true);
      return;
    }

    if (!book.content) {
      setContentError(true);
      return;
    }

    if (!book.genre) {
      setGenreError(true);
      return;
    }

    // Rest of the function...

    // Retrieve the token from localStorage
    const authToken = localStorage.getItem("auth_token");

    // Check if the token is present
    if (!authToken) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      // Send a POST request to create a new book
      const response = await fetch("http://localhost:8000/books", {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...book }),
      });

      if (!response.ok) {
        console.error("Error posting book:", response.statusText);
        return;
      }

      // Navigate to the detail page of the created book
      navigate(`/`);
    } catch (error) {
      console.error("Error posting book:", error);
    }
  };

  return (
    <main className="form-parent">
      <form className="form-and-header">
        <div className="h1-div">
          <h1>New Book Form</h1>
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
              {titleError && <p>Please fill out the title field.</p>}
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
              {authorError && <p>Please fill out the author field.</p>}
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
              {publicationDateError && (
                <p>Please fill out the publication date field.</p>
              )}
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
              {pageCountError && <p>Please fill out the page count field.</p>}
            </div>
            <div className="edit-book-form-field">
              <label>Image:</label>
              <input
                className="edit-book-input-field"
                id="image_url"
                onChange={updateBook}
                type="text"
                placeholder="https://example.com"
                value={book.image_url}
                required
              />
              {imageUrlError && <p>Please fill out the image field.</p>}
            </div>
            <fieldset className="fieldset-div">
              <div className="edit-book-input-field">
                <select
                  className="input"
                  name="genre"
                  onChange={updateGenre}
                  value={book.genre}
                  required
                >
                  {genreError && <p>Please select a genre.</p>}
                  <option value={0}>Please select a Genre</option>
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
              {contentError && <p>Please fill out the content field.</p>}
            </div>
          </fieldset>
        </div>
        <div className="button-div">
          <button className="submit-button" onClick={postBook}>
            Add Book
          </button>
          <button className="cancel-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};
