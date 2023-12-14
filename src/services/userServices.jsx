export const getCurrentUser = () => {
  return fetch(`http://localhost:8000/alien_users/currentUser`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
