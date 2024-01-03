import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/userServices";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  return (
    <>
      <div className="profile" key={currentUser.id}>
        <div className="profile-image">
          <img
            src={currentUser.profile_image_url}
            alt={currentUser.name}
            width="400px"
          ></img>
        </div>
        <div className="profile-header">
          <div className="profile-username">
            Username: {currentUser?.user?.username}
          </div>
          <div className="profile-bio">{currentUser.bio}</div>
        </div>
      </div>
      <div className="my-profile-button">
        <button
          className="edit-button"
          onClick={() => navigate(`/profile/edit-profile`)}
        >
          Edit
        </button>
      </div>
    </>
  );
};
