export const getUserById = (userId) => {
  return fetch(`http://localhost:8000/alien_users/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getCurrentUser = () => {
  return fetch(`http://localhost:8000/alien_users/currentUser`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const editCurrentUser = (updatedUser) => {
  return fetch(`http://localhost:8000/alien_users/currentUser/update`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  }).then((res) => res.json());
};
