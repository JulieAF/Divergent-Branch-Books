import { useEffect, useState } from "react";
import { getUserById } from "../services/userServices";
import { useParams } from "react-router-dom";

export const ReviewProfile = () => {
  const [reviewUser, setReviewUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    getUserById(userId).then((userData) => {
      setReviewUser(userData);
    });
  }, [userId]);

  return (
    <>
      <div className="profile" key={reviewUser?.id}>
        <div className="profile-image">
          <img
            src={reviewUser?.profile_image_url}
            alt={reviewUser?.name}
            width="400px"
          ></img>
        </div>
        <div className="profile-header">
          <div className="profile-username">
            Username: {reviewUser?.user?.username}
          </div>
          <div className="profile-bio">{reviewUser?.bio}</div>
        </div>
      </div>
    </>
  );
};
