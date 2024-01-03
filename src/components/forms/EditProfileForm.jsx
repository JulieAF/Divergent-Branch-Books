import { useEffect, useState } from "react";
import "./forms.css";
import { editCurrentUser, getCurrentUser } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

export const EditProfileForm = () => {
  const [currentUser, setCurrentUser] = useState({
    profile_image_url: "",
    bio: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser().then((data) => {
      console.log(data);
      setCurrentUser(data);
    });
  }, []);

  const updateCurrentUser = (e) => {
    const copy = { ...currentUser };
    copy[e.target.id] = e.target.value;
    setCurrentUser(copy);
  };

  const handleCancel = () => {
    navigate(`/profile`);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updatedItem = {
      id: currentUser.user.id,
      profile_image_url: currentUser.profile_image_url,
      bio: currentUser.bio,
    };

    editCurrentUser(updatedItem).then(() => {
      navigate(`/profile`);
    });
  };

  return (
    <>
      <main className="form-parent">
        <form className="form-and-header">
          <div className="h1-div">
            <h1>Edit Profile {currentUser.user.id}</h1>
          </div>
          <div className="edit-book-form-container">
            <fieldset className="edit-book-form-fieldset">
              <div className="edit-book-form-field">
                <label>Bio:</label>
                <input
                  className="edit-book-input-field"
                  id="bio"
                  onChange={updateCurrentUser}
                  type="text"
                  placeholder=""
                  value={currentUser.bio}
                  required
                />
              </div>
              <div className="edit-book-form-field">
                <label>Image:</label>
                <input
                  className="edit-book-input-field"
                  id="profile_image_url"
                  onChange={updateCurrentUser}
                  type="text"
                  placeholder=""
                  value={currentUser.profile_image_url}
                  required
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
