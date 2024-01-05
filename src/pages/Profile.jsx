import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import Edit from "./edit.png";

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
        <div className="my-profile-button">
          <img
            className="edit-icon"
            src={Edit}
            alt="Edit Icon"
            onClick={() => navigate(`/profile/edit-profile`)}
          />
        </div>
      </div>
    </>
  );
};
