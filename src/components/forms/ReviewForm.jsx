import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createReviews } from "../../services/reviewServices";

export const ReviewForm = () => {
  const { bookId } = useParams();
  const [review, setReview] = useState({
    book: bookId,
    content: "",
    created_on: new Date(),
  });
  const [contentError, setContentError] = useState(false);
  let navigate = useNavigate();

  const updateReview = (e) => {
    const copy = { ...review };
    copy[e.target.id] = e.target.value;
    setReview(copy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    if (!review.content) {
      setContentError(true);
      return;
    }

    const newReview = {
      book: review.book,
      content: review.content,
      created_on: review.created_on,
    };
    createReviews(newReview).then(() => {
      navigate(`/book/${review.book}/reviews`);
    });
  };

  return (
    <main className="form-parent">
      <form className="form-and-header">
        <div className="h1-div">
          <h1>New Review Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset">
            <div className="form-field">
              <label>New Review:</label>
              <input
                className="input-field"
                id="content"
                onChange={updateReview}
                type="text"
                placeholder="Review here"
                value={review.content}
                required
              />
            </div>
            {contentError && <p>Please fill out the content field.</p>}
          </fieldset>
          <div className="button-div">
            <button className="cancel-button" onClick={handleSave}>
              Submit
            </button>
            <button className="cancel-button" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};
