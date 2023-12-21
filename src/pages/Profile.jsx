import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/userServices";

export const Profile = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getCurrentUser().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  return (
    <div className="card-header" key={currentUser.id}>
      <div className="card-body">
        Username: {currentUser?.user?.username}
        <img
          src={currentUser.profile_image_url}
          alt={currentUser.name}
          width="400px"
        ></img>
        Content: {currentUser.bio}
      </div>
    </div>
  );
};
