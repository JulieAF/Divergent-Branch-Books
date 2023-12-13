import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./forms.css";
import { editReview, getReviewByReviewId } from "../../services/reviewServices";

export const EditReviewForm = () => {
  const { reviewId } = useParams();
  let navigate = useNavigate();
  const [review, setReview] = useState({
    content: "",
    created_on: "new Date()",
  });

  useEffect(() => {
    getReviewByReviewId(reviewId).then((reviewObj) => {
      setReview(reviewObj);
    });
  }, [reviewId]);

  const updateReview = (e) => {
    const copy = { ...review };
    copy[e.target.id] = e.target.value;
    setReview(copy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updatedItem = {
      id: review.id,
      content: review.content,
    };

    editReview(updatedItem).then(() => {
      navigate(-2);
    });
  };

  return (
    <main className="form-parent">
      <form className="form-and-header">
        <div className="h1-div">
          <h1>Edit Review Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset">
            <div className="form-field">
              <label>Content:</label>
              <textarea
                className="textarea-field"
                id="content"
                onChange={updateReview}
                placeholder=""
                value={review.content}
                required
                maxLength={1000}
              />
              Max Characters 1000
            </div>
          </fieldset>
        </div>
        <div className="button-div">
          <button className="cancel-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </main>
  );
};
