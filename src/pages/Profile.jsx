import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/userServices";

export const Profile = () => {
  const [user, setUser] = useState([]);

  const getAndSetUser = () => {
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
    });
  };

  useEffect(() => {
    getAndSetUser();
  }, []);

  return (
    <div>
      {user && user.length ? (
        user.map((alien_user, index) => (
          <div className="card-item" key={index}>
            <div className="alien_user-details">
              <div className="alien_user-header">
                <img
                  src={alien_user.profile_image_url}
                  alt={alien_user.name}
                  width="400px"
                ></img>
                <div className="alien_user-title">
                  {alien_user.user.username}
                </div>
                <div className="alien_user-title">{alien_user.bio}</div>
              </div>
            </div>
            {alien_user?.is_owner ? (
              <div className="manage-tags-div">
                <button>Edit</button>
              </div>
            ) : (
              ""
            )}
          </div>
        ))
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
};
