export const getCurrentUser = () => {
  return fetch(`http://localhost:8000/alien_users/currentUser`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const editCurrentUser = (currentUser) => {
  if (currentUser && currentUser.user && currentUser.user.id) {
    return fetch(
      `http://localhost:8000/alien_users/${currentUser.user.id}/update/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentUser.user.id,
          profile_image_url: currentUser.profile_image_url,
          bio: currentUser.bio,
        }),
      }
    ).then((res) => res.json());
  } else {
    // Handle the case where currentUser or its properties are undefined
    console.error("Error: currentUser or currentUser.user.id is undefined");
    return Promise.reject(
      "Error: currentUser or currentUser.user.id is undefined"
    );
  }
};
