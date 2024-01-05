import { useEffect, useState } from "react";
import { getUserById } from "../services/userServices";
import { useNavigate, useParams } from "react-router-dom";
import Edit from "./edit.png";

export const ReviewProfile = () => {
  const [reviewUser, setReviewUser] = useState({});
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    getUserById(userId).then((userData) => {
      const profileObj = userData[0];
      setReviewUser(profileObj);
    });
  }, [userId]);

  return (
    <>
      <div className="profile" key={reviewUser.id}>
        <div className="profile-image">
          <img
            src={reviewUser.profile_image_url}
            alt={reviewUser.name}
            width="400px"
          ></img>
        </div>
        <div className="profile-header">
          <div className="profile-username">
            Username: {reviewUser?.user?.username}
          </div>
          <div className="profile-bio">{reviewUser.bio}</div>
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
