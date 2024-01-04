export const getCurrentUser = () => {
  return fetch(`http://localhost:8000/alien_users/currentUser`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const editCurrentUser = () => {
  return fetch(`http://localhost:8000/alien_users/currentUser/update`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
