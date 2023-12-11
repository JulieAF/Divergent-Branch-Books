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

      // Parse the response to get the newly created book's ID
      const createdBook = await response.json();
      const bookId = createdBook.id;

      // Navigate to the detail page of the created book
      navigate(`/bookList/${bookId}`);
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
                placeholder="https://example.com"
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
                maxLength={200}
              />
              Max Characters 200
            </div>
            <fieldset className="fieldset-div">
              <div className="box-input">
                <div>Genre:</div>
                <select
                  className="input"
                  name="genre"
                  onChange={updateGenre}
                  value={book.genre}
                >
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
          </fieldset>
        </div>
        <div className="button-div">
          <button className="cancel-button" onClick={postBook}>
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
